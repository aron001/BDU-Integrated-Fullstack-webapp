import React, { useRef, useState } from "react";
import "./AnswerBox.css";
import UpvoteWhite from "../../img/upvoteWhite.png";
import UpvoteBlack from "../../img/upvoteBlack.png";
import downvoteBlack from "../../img/downvoteBlack.png";
import downvoteWhite from "../../img/downvoteWhite.png";

import { useDispatch, useSelector } from "react-redux";
import { voteAnswer } from "../../api/QARequests";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import menuIcon from "../../img/menu.png";
import { updateAnswer } from "../../actions/QAActions";


const Answer = ({ answer, viewAnsClicked}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  //const [voteCounter, setVoteCounter] = useState(0)
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [upvoted, setUpvoted] = useState(answer?.upVotes.includes(user._id));
  const [downvoted, setDownvoted] = useState(answer?.downVotes.includes(user._id));

  const [upvoteAmount, setUpvoteAmount] = useState(answer?.upVotes.length);
  const [downvoteAmount, setDownvoteAmount] = useState(answer?.downVotes.length);

  const [postOption, setPostOption] = useState(false);
  const [delModalOpened, setDelModalOpened] = useState(false);
  const [updateAnsClicked, setUpdateAnsClicked] = useState(false);

  const [editableAnsText, setEditableAnsText] = useState(answer?.answerText);
  const dispatch = useDispatch()
  const ansValue = useRef();

  function editAnswer() {
    answer.answerText = ansValue.current.value;
    
    try {
      dispatch(updateAnswer(answer._id, answer))
    } catch (error) {
      console.log(error);
    }
  }

  const handleVote = async(voteStatus) => {
    const ansId = answer._id;
    const data = {
      userId: user._id,
      voteStatus: voteStatus,
    };
    await voteAnswer(ansId, data);
  };

  const handleUpVote = () => {
    const voteStatus = "up";
    handleVote(voteStatus);
    setUpvoted((prev) => !prev);
    if (downvoted) {
      setDownvoted((prev) => !prev);
      setDownvoteAmount((prev) => prev - 1);
    }
    upvoted
      ? setUpvoteAmount((prev) => prev - 1)
      : setUpvoteAmount((prev) => prev + 1);
  };

  const handleDownVote = () => {
    const voteStatus = "down";
    handleVote(voteStatus);
    setDownvoted((prev) => !prev);
    if (upvoted) {
      setUpvoted((prev) => !prev);
      setUpvoteAmount((prev) => prev - 1);
    }
    downvoted
      ? setDownvoteAmount((prev) => prev - 1)
      : setDownvoteAmount((prev) => prev + 1);
  };

  return (
    <div
      style={{ display: viewAnsClicked ? "flex" : "none" }}
      className="eachAnswer"
    >
      <div className="detail">
        <div>
          <img
          src={
            publicFolder + answer?.answerOwnerData[0].profilePicture
              ? publicFolder + answer?.answerOwnerData[0].profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="Profile"
          className="followerImage"
          style={{ width: "40px", height: "40px" }}
        />
        <div className="name" style={{ fontSize: "0.9rem" }}>
        <Link
              to={`/profile/${answer?.answerOwnerData[0]._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
            <span title="click to go to user profile">@{answer?.answerOwnerData[0].username}</span>  
          </Link>
        </div>
        </div>
        {user?._id === answer.userId && (
          
          <div>
            <img
              src={menuIcon}
              alt=""
              title={postOption? "hide options" : "show options"}
              style={{ cursor: "pointer", height: "1.5rem", width: "1.5rem" }}
              onClick={() => setPostOption((postOption) => !postOption)}
            />

          <div style={{display: postOption? "flex" : "none", gap:".5rem"}}>
          <button  className="button" onClick={()=> setUpdateAnsClicked(true)}>
              Edit
            </button>
            <button style={{background: "red"}}  className="button" onClick={() => setDelModalOpened(true)}>
              delete
            </button>
          </div>
          <DeleteModal location={"answer"} delModalOpened={delModalOpened} setDelModalOpened={setDelModalOpened} data={answer} user={user}/>
        </div>
      )}
      </div>
      <hr style={{ width: "100%", border: "0.1px solid 01ef" }} />
      <div className="answerBody">
        <div className="voteButtons">
          <div>
            <img
              src={upvoted ? UpvoteBlack : UpvoteWhite}
              alt=""
              title="Very helpful !"
              style={{ cursor: "pointer", height: "1.5rem", width: "2rem" }}
              onClick={() => handleUpVote()}
            />
          </div>
          <div className="voteCounter">{upvoteAmount - downvoteAmount}</div>
          <div>
            <img
              src={downvoted ? downvoteBlack : downvoteWhite}
              alt=""
              title="Not helpful !"
              style={{ cursor: "pointer", height: "1.5rem", width: "2rem" }}
              onClick={() => handleDownVote()}
            />
          </div>
        </div>
        <div className="answerText">
          <div>{answer?.answerText}</div>
        </div>
      </div>

      <div
        style={{ display: updateAnsClicked ? "flex" : "none", marginTop: "1rem" }}
        className="giveAnswer"
      >
        <div className="answerTextArea">
          <textarea
            ref={ansValue}
            style={{
              height: "10rem",
              width: "30rem",
              padding: ".5rem",
              borderRadius: "1rem",
            }}
            required
            type="text"
            className="answerInput"
            name="Answer"
            placeholder="your answer"
            value={editableAnsText}
            onChange={(e)=>setEditableAnsText(e.value)}
          />
        </div>
        <div className="answerSubmit">
          <button
            onClick={() => editAnswer()}
            style={{ marginLeft: "27rem", marginTop: "1rem", padding: ".3rem" }}
          >
            update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answer;
