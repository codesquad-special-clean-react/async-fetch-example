import { URL } from '../constants.js';
import Api from '../api/index.js';

const initialState = {
  data: [],
  currentUser: 1,
};

export default class QnAModel {
  _api = new Api({ timeout: 500 });
  _subscribers = [];
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

  getNewQuestion({ title, question }) {
    const id = this.generateNextQuestionId(this.state.data);
    const userId = this.state.currentUser;

    return { id, userId, title, question };
  }

  async addQuestion(questionData) {
    const newQuestion = this.getNewQuestion(questionData);

    await this._api.post(this._URL.questions, newQuestion);

    this.setState((prev) => ({
      data: [...prev.data, newQuestion],
    }));
  }

  async addAnswer(answerData) {
    console.log(answerData);

    const userId = this.state.currentUser;
    const newComment = { userId, ...answerData };

    await this._api.post(this._URL.answers, newComment);

    await new Promise((res, rej) => setTimeout(() => res(), 2000));

    this.setState((prev) => ({
      ...prev,
      data: prev.data.map((q) => {
        if (q.id === newComment.questionId) {
          q.matchedComments = [...q.matchedComments, newComment];
        }
        return q;
      }),
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

  generateNextQuestionId(array) {
    // better to be uuid or so
    return Math.max(...array.map((el) => el.id)) + 1;
  }
}
