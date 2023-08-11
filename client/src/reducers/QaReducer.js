const qaReducer = (
  state = {
    questions: null,
    answers: null,
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    // belongs to AskModal.jsx.jsx
    case "QUESTION_CREATE_START":
      return { ...state, error: false};
    case "QUESTION_CREATE_SUCCESS":
      return {
        ...state,
        questions: [action.data, ...state.questions],
        error: false,
      };
    case "QUESTION_CREATE_FAIL":
      return { ...state, error: true };

    // belongs to AnswerBox.jsx.jsx
    case "ANSWER_CREATE_START":
      return { ...state, error: false};
    case "ANSWER_CREATE_SUCCESS":
      return {
        ...state,
        answers: [action.data, ...state.answers],
        error: false,
      };
    case "ANSWER_CREATE_FAIL":
      return { ...state, error: true };

    // belongs to DiscussioBox.jsx
    case "QUESTION_FETCH_START":
      return { ...state, loading: true, error: false };
    case "QUESTION_FETCH_SUCCESS":
      return { ...state, questions: action.data, loading: false, error: false };
    case "QUESTION_FETCH_FAIL":
      return { ...state, loading: false, error: true };
    // belongs to AnswerBox.jsx
    case "ANSWER_FETCH_START":
      return { ...state, loading: true, error: false };
    case "ANSWER_FETCH_SUCCESS":
      return { ...state, answers: action.data, loading: false, error: false };
    case "ANSWER_FETCH_FAIL":
      return { ...state, loading: false, error: true };

    // belongs to  QuestionBox.jsx
    case "QUESTION_UPDATE_START":
      return { ...state, error: false, loading: true };
    case "QUESTION_UPDATE_SUCCESS":
      const questions = [...state.questions];
      const questionIndex = questions.findIndex(
        (question) => question._id === action.data._id
      );
      questions[questionIndex] = action.data;
      return { ...state, questions, loading: false };
    case "QUESTION_UPDATE_FAIL":
      return { ...state, loading: false, error: true };

    // belongs to  AnswerBox.jsx
    case "ANSWER_UPDATE_START":
      return { ...state, error: false, loading: true };
    case "ANSWER_UPDATE_SUCCESS":
      const answers = [...state.answers];
      const answerIndex = answers.findIndex(
        (answer) => answer._id === action.data._id
      );
      answers[answerIndex] = action.data;
      return { ...state, answers, loading: false };
    case "ANSWER_UPDATE_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default qaReducer;
