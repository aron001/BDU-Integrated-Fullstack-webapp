import React, { useEffect, useState } from 'react'
import "./DiscussionBox.css"
import QuestionBox from '../QuestionBox/QuestionBox'
import AskModal from '../AskModal/AskModal'
import { getAllAnswers, getAllQuestions } from "../../actions/QAActions";
import { useDispatch, useSelector } from 'react-redux';

const DiscussionBox = ({category}) => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  let { questions, answers, loading } = useSelector((state) => state.qaReducer);

  useEffect(() => {
    const fetchQuestions = ()=>{
      dispatch(getAllQuestions());
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    dispatch(getAllAnswers());
  }, []);

if(category && category.category !== "ALL QUESTIONS"){
  questions = questions.filter((question)=> question.category===category.category)
}
  return (
    <>
      <div className="DiscussionBox-container">
        {category ? (
          <>
            {/* discussion-header */}
            <div className="discussion-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {category?.category}
                    </span>
                  </div>
                </div>
                <div className='askButton'>
                { (category.category !== "ALL QUESTIONS") && 
                <button onClick={()=>setModalOpened(true)}
                 style={{padding:".4rem", borderRadius: "12px", cursor: "pointer"}}>
                  Ask Question
                  </button>}
                <AskModal location = {"new"} modalOpened={modalOpened} setModalOpened={setModalOpened} category={category}/>
                </div>
              </div>
              <hr
                style={{
                  width: "99%",
                  border: "0.1px solid #ececec",
                }}
              />
            </div>
          </>
        ) : (
          <span className="discussionbox-empty-message">
            Tap on a Category to filter discussion...
          </span>
        )}
        <div className="discussion-body">
          {loading ? "Fetching Questions..." :
            questions?.map((question, id)=>(
               <QuestionBox question={question} answers={answers} key={id}/>
            ))
          }  
        </div>
      </div>
    </>
  )
}

export default DiscussionBox