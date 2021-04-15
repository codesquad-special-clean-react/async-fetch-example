import { URL } from '../constants.js';
import Api from '../api/index.js';

const initialState = {
  data: [],
  currentUser: 1,
};

export default class QnAModel {
  _api = new Api({ timeout: 500 });
  _subscribers = [];
  _utils = Utils;
  _URL = URL;

  state = initialState;

  constructor() {
    this.publish = this.publish.bind(this);
    this.init();
  }

  async init() {
    await this.processDataToState();
    this.publish();
  }

  async processDataToState() {
    this.fetchData()
      .then(this.mapAnswersToQuestions)
      .then((data) => this.setState({ ...this.state, data }));
  }

  processFormToQuestion($form) {
    const setIdentifiers = ({ title, question }) => {
      const id = this._utils.generateNextQuestionId(this.state.data);
      const userId = this.state.currentUser;
      return { id, userId, title, question };
    };

    const pipeline = this._utils.pipe(
      (arg) => new FormData(arg),
      Object.fromEntries,
      setIdentifiers
    );

    return pipeline($form);
  }

  async addNewQuestion($form) {
    const newQuestion = this.processFormToQuestion($form);

    await this._api.post(this._URL.questions, newQuestion);

    this.setState((prev) => ({
      ...prev,
      data: [...prev.data, newQuestion],
    }));
  }

  async fetchData() {
    const questions = await this.fetchQuestion();
    const answers = await this.fetchAnswers();
    return { questions, answers };
  }

  async fetchQuestion() {
    return await this._api.get(this._URL.questions);
  }

  async fetchAnswers() {
    return await this._api.get(this._URL.answers);
  }

  mapAnswersToQuestions({ answers, questions }) {
    return answers.reduce((data, answer) => {
      const target = data.find((question) => question.id === answer.questionId);
      target.matchedComments = target.matchedComments
        ? [...target.matchedComments, answer]
        : [answer];
      return data;
    }, questions);
  }

  setState(newState) {
    console.warn('model set!');
    if (typeof newState === 'function') this.state = newState(this.state);
    else this.state = { ...this.state, ...newState };
    this.publish();
  }

  subscribe = (listener) => {
    this._subscribers.push(listener);
    return () =>
      (this._subscribers = this._subscribers.filter(
        (callback) => callback === fn
      ));
  };

  publish() {
    this._subscribers.forEach((cb) => cb());
  }
}

/**
 * @namespace QnAUtils utility functions
 */
const Utils = {
  /**
   * @deprecated
   */
  reduceArrayObject(array, key) {
    return array.reduce((result, item) => {
      const objectKey = item[key];
      return {
        ...result,
        [objectKey]: result[objectKey] ? [...result[objectKey], item] : [item],
      };
    }, {});
  },
  /**
   * @description simple implementaion of pipe function, receives multiple functions and execute consecutively
   */
  pipe(...functions) {
    return (arg) => functions.reduce((result, func) => func(result), arg);
  },

  generateNextQuestionId(array) {
    // better to be uuid or so
    return Math.max(...array.map((el) => el.id)) + 1;
  },
};
