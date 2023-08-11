import * as QaApi from "../api/QARequests";

export const createQuestion = (newQuestion) => async (dispatch) => {
  dispatch({ type: "QUESTION_CREATE_START" });
  try {
    const createdQuestion = await QaApi.createQuestion(newQuestion);
    dispatch({ type: "QUESTION_CREATE_SUCCESS", data: createdQuestion.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "QUESTION_CREATE_FAIL" });
  }
};

export const createAnswer = (questionId, newAnswer) => async (dispatch) => {
  dispatch({ type: "ANSWER_CREATE_START" });
  try {
    const createdAnswer = await QaApi.createAnswer(questionId, newAnswer);
    dispatch({ type: "ANSWER_CREATE_SUCCESS", data: createdAnswer.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ANSWER_CREATE_FAIL" });
  }
};

export const getAllQuestions = () => async (dispatch) => {
  dispatch({ type: "QUESTION_FETCH_START" });
  try {
    const { data } = await QaApi.getAllQuestions();
    dispatch({ type: "QUESTION_FETCH_SUCCESS", data:data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "QUESTION_FETCH_FAIL" });
  }
};

export const getAllAnswers = () => async(dispatch) => {
  dispatch({ type: "ANSWER_FETCH_START" });
  try {
    const { data } = await QaApi.getAllAnswers();
    dispatch({ type: "ANSWER_FETCH_SUCCESS", data:data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ANSWER_FETCH_FAIL" });
  }
};

export const updateQuestion = (qId,data) => async (dispatch) => {
  dispatch({ type: "QUESTION_UPDATE_START" });
  try {
    const updatedQuestion = await QaApi.updateQuestion(qId,data);
    dispatch({ type: "QUESTION_UPDATE_SUCCESS", data: updatedQuestion.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "QUESTION_UPDATE_FAIL" });
  }
};

export const updateAnswer = (ansId,data) => async (dispatch) => {
  dispatch({ type: "ANSWER_UPDATE_START" });
  try {
    const updatedAnswer = await QaApi.updateAnswer(ansId,data);
    dispatch({ type: "ANSWER_UPDATE_SUCCESS", data: updatedAnswer.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ANSWER_UPDATE_FAIL" });
  }
};
