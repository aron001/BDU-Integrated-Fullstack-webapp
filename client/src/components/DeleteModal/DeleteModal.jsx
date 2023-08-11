import { Modal, useMantineTheme } from "@mantine/core";
import { deletePost } from "../../api/PostsRequests";
import { deleteAdvert } from "../../api/AdvertRequests";
import { deleteLostAndFound } from "../../api/LostAndFoundRequests";
import { deleteAnswer, deleteQuestion } from "../../api/QARequests";


export default function DeleteModal({location, delModalOpened, setDelModalOpened, data, user}){
    const theme = useMantineTheme();

    const handleDelete = async ()=>{
     if(location === "post") handlePostDelete();
     if(location === "advert") handleAdvertDelete();
     if(location === "lostFound") handleLostFoundDelete();
     if(location === "question") handleQuestionDelete();
     if(location === "answer") handleAnswerDelete();
    }

    const handleAnswerDelete = async () => {
      const ansId = data._id;
      const userId = data.userId;
      await deleteAnswer(ansId, userId);
    }

    const handleQuestionDelete = async () => {
      const qId = data._id;
      const userId = data.userId;
      await deleteQuestion(qId, userId);
    }
    
    const handleLostFoundDelete = async () => {
      const lfId = data._id;
      const userId = data.userId;
      await deleteLostAndFound(lfId, userId);
    }

    const handleAdvertDelete = async () => {
        const adId = data._id;
        const userId = data.userId;
        await deleteAdvert(adId, userId);
    }
    const handlePostDelete = async () => {
        const postId = data._id;
        const userId = user._id;
        await deletePost(postId, userId);
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
        size="18rem"
        opened={delModalOpened}
        onClose={() => setDelModalOpened(false)}
      >
  <form className="askForm">
  <h3>Are you sure to delete ?</h3>
        <div className="delYesOrNo">
         <button onClick={()=>handleDelete()} style={{padding:".3rem .7rem", borderRadius:".5rem", marginRight:"1rem", cursor:"pointer"}}>Yes</button>
         <button onClick={()=>setDelModalOpened(false)} style={{padding:".3rem .7rem", borderRadius:".5rem", cursor:"pointer"}}>cancel</button>
        </div>
  </form>
      </Modal>
    )
  }