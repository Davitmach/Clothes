import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./questions.scss";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPaperPlane,
  faReply,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import GetData from "../../../hook/getData/getData";
import axios from "axios";
import { SetDataWithQueryClient } from "../../../hook/setData/setData";

function Questions() {
  const Id = localStorage.getItem("id");
  const Name = localStorage.getItem(`${Id}name`);
  const Logged = localStorage.getItem('logged');
  const { id } = useParams();
  const InputRef = useRef();
  const AnswerInputRef = useRef();
  const [answer, setAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const Navigate = useNavigate();
  const GetQuestions = async (id) => {
    const { data } = await axios.get(
      `http://clothes/product/getQuestions.php?id=${id}`
    );
    return data;
  };
  const { data: questData } = GetData(() => GetQuestions(id), "getQuestions");

  const SetQuestions = async (info) => {
    return await axios.post("http://clothes/product/setQuestion.php", info, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  const {
    mutate,
    data: setQuestionData,
    isSuccess,
    error,
  } = SetDataWithQueryClient(SetQuestions, "SetQuestion", "GetProduct");

  const HandleSetQuestions = () => {
    if (InputRef.current.value !== "") {
      mutate({
        userId: Id,
        userName: Name,
        productId: id,
        question: InputRef.current.value,
      });
    }
  };

  useEffect(() => {
    console.log(setQuestionData);
  }, [setQuestionData]);

  const DeleteQuestions = (data) => {
    mutate({
      status: "delete",
      productId: data.productId,
      questionId: data.id,
      userId: data.userId,
    });
  };

  const HandleAnswer = (data) => {
    setAnswer(true);
    setCurrentQuestion(data);
  };

  const SubmitAnswer = () => {
    if(!Logged) {
        Navigate('/login',{replace:true})
    }
    if(!Name && Logged) {
        Navigate('/user/setMyInfo',{replace:true})
    }
    if (AnswerInputRef.current.value !== "" && currentQuestion && Name && Logged) {
      mutate({
        status: "answer",
        productId: currentQuestion.productId,
        questionId: currentQuestion.id,
        questionUserId: currentQuestion.userId,
        userId: Id,
        answer: AnswerInputRef.current.value,
        name: currentQuestion.userName,
        answerName:Name
      });
      setAnswer(false);
      setCurrentQuestion(null);
    } else {
      
    }
  };

  return (
    <div className="Questions_box">
      <div className="Questions" style={questData?.length < 4 ? {height:'auto'} : {height:'350px'}}>
        {questData?.map((e) => (
          <div className="Question" key={e.id}>
           {e.answer ? (<div className="All">
            <div className="Name">
            <div className="Name_box">{e.userName}</div>
            <div className="Question_box">{e.question}</div>
           </div>
           <div className="Answer">{e.answer}</div>
           </div>) : ( <div className="Name_box">{e.userName}</div>)}
           
          
            <div className="Main_box">
              <div ><span>{e.answer ? ('Reply By ' +  e.answerUserName) : (e.question)}</span></div>
              <div className="Time">{e.time.split(".")[0]}</div>
            </div>
            {Id === e.userId ? (
              <div className="Delete_box">
                <FontAwesomeIcon
                  onClick={() => DeleteQuestions(e)}
                  icon={faXmark}
                />
              </div>
            ) : (
              ""
            )}
            {Id !== e.userId ? (
              <div className="Reply_box" onClick={() => {
                const inputBox = document.querySelector('.Input_box');

// Получаем позицию элемента относительно видимой области
const rect = inputBox.getBoundingClientRect();

// Прокручиваем страницу, учитывая 50 пикселей
window.scrollTo({
    top: rect.top + window.scrollY - 50, // Вычитаем 50 пикселей
    behavior: 'smooth'
});
                HandleAnswer(e)}
              
              }>
                <FontAwesomeIcon icon={faReply} />
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      {answer ? (
        <div className="Answer_box">
          <div className="Message">
            <input
              ref={AnswerInputRef}
              type="text"
              placeholder="Type your answer here..."
            />
          </div>
          <div className="Close_box">
            <FontAwesomeIcon onClick={() => setAnswer(false)} icon={faXmark} />
            <button onClick={SubmitAnswer}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="Input_box">
        <input ref={InputRef} type="text" placeholder="Ask a question..." />
        <FontAwesomeIcon onClick={HandleSetQuestions} icon={faPaperPlane} />
      </div>
    </div>
  );
}

export default Questions;
