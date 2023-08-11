import { Modal, Textarea, useMantineTheme } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion, updateQuestion } from "../../actions/QAActions";
import './AskModal.css'
export default function AskModal({ location, data, modalOpened, setModalOpened, category }) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
const title = useRef()
const question = useRef()
const { user } = useSelector((state) => state.authReducer.authData);

const [currentTitle, setCurrentTitle] = useState();
const [currentQuestionText, setCurrentQuestionText] = useState()

useEffect(()=>{
  function setPlaceHolder() {
  setCurrentTitle(data?.title)
  setCurrentQuestionText(data?.questionText)
  }
  setPlaceHolder()
},[data])
 // const handleChange = (e) => {
    //setFormData({ ...formData, [e.target.name]: e.target.value });
 // };

// form submission
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const newQuestion = {
      title : title.current.value,
      questionText : question.current.value,
      category: category?.category,
      userId : user._id
    }
    try {
     location === "new" && dispatch(createQuestion(newQuestion));
     location === "update" && dispatch(updateQuestion(data._id, newQuestion))
      setModalOpened(false)
      resetQuestionForm();
    } catch(error) {
      console.log("error from submitting question",error);
    }
  }

  const resetQuestionForm = () => {
    title.current.value = "";
    question.current.value = ""
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="100%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="askForm" onSubmit={handleSubmit}>
        <h3>Put your Question below...</h3>
        <div className="formInputs">
          <div className = 'AskInput' >
            <input
             value={currentTitle}
             ref={title}
              
              type="text"
              className="askInput"
              name="title"
              placeholder="Title for your question"
              required
              onChange={(e)=>setCurrentTitle(()=>e.value)}

            />
          </div>
          <div className='textAreaA'>
            <textarea
              value={currentQuestionText}
              ref={question}
              type="text"
              className="textArea"
              name="question"
              placeholder="your question"
              required
              onChange={(e)=>setCurrentQuestionText(()=>e.value)}

              
            />
          </div>
          <button
            
            className="button askButton"
            type="submit"
          >
           {location === "new" ? "Share Question" : location === "update" ? "update" : ""} 
          </button>
        </div>
      </form>
    </Modal>
  );
}
