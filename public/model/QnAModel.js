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
    const id = this.generateNextId(this.state.data);
    const userId = this.state.currentUser;

    return { id, userId, title, question };
  }

  async addQuestion(questionData) {
    const newQuestion = this.getNewQuestion(questionData);

    await this._api.post(this._URL.questions, newQuestion);

    this.setState((prev) => ({
      ...prev,
      data: [...prev.data, newQuestion],
    }));
  }

  async addAnswer(answerData) {
    const targetQuestion = this.state.data.find(
      (question) => question.id === answerData.questionId
    );

    const id = this.generateNextId(targetQuestion.matchedComments || []);
    const userId = this.state.currentUser;
    const newComment = { id, userId, ...answerData };

    await this._api.post(this._URL.answers, newComment);

    await this.wait(1200);

    this.setState((prev) => ({
      ...prev,
      data: this.getAddedData(prev.data, newComment),
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
      const targetQuestion = data.find(
        (question) => question.id === answer.questionId
      );
      if (!targetQuestion) return data;

      targetQuestion.matchedComments = targetQuestion.matchedComments
        ? [...targetQuestion.matchedComments, answer]
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

  publish = () => {
    this._subscribers.forEach((cb) => cb());
  };

  generateNextId(array) {
    // better to be uuid or so
    return Math.max(...array.map((el) => el.id)) + 1;
  }

  wait(ms) {
    return new Promise((res, rej) => {
      console.log('loading....');
      setTimeout(() => res(console.log('done!')), ms);
    });
  }

  getAddedData(data, newComment) {
    return data.map((question) =>
      question.id !== newComment.questionId
        ? question
        : {
            ...question,
            matchedComments: question.matchedComments
              ? [...question.matchedComments, newComment]
              : [newComment],
          }
    );
  }
}
