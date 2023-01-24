import axios from "axios";
import { useState,useEffect,useRef } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import SockJS from 'sockjs-client'
import Stomp from "stompjs";


function TaxiRoomDetail(props){
    const[message,setMessage]=useState('')
    const[roomId,setRoomId]=useState('')
    const[sender,setSender]=useState('')
    let [messageList,setMessageList]=useState([{
        
    }]);
    let num=0
    const no = useRef(1)

    const onChange = (e)=>setMessage(e.target.value);
    

    const sendMessage=()=>{
        ws.send("/app/chat/message",{},JSON.stringify({type:'TALK',message:message,roomId:roomId,sender:sender}))
        setMessage('')
    }

    

    const created=()=>{
        setRoomId(localStorage.getItem('roomId'));
        setSender(localStorage.getItem('sender'));
    }

    

    const recvMessage=(recv)=>{
        setMessageList((prev)=>{
                return[
                    {
                        id:no.current++,
                        inMessage:recv.message,
                        sender:recv.sender
                    },
                    ...prev
                ]
            }
               
        )
    }
    
 
    let navigate = useNavigate();
    
    let sock = new SockJS("http://localhost:8080/ws/chat");
    let ws = Stomp.over(sock);

   
    useEffect(()=>{
        created()
        ws.connect({},()=>{
            ws.subscribe("/topic/chat/room/"+roomId,(response)=>{
                const recv = JSON.parse(response.body);
                recvMessage(recv);
                console.log(recv)
            });
            ws.send("/app/chat/message", {}, JSON.stringify({type:'ENTER', roomId:roomId, sender:sender}));    
        }) 
    },[sender])

    const a=()=>{
        console.log(messageList)
    }
    return(
        <div className="container">
            
            <script src="/webjars/sockjs-client/1.5.1/sockjs.min.js"></script>
            <script src="/webjars/stomp-websocket/2.3.4/stomp.min.js"></script> 
            <div className="row">
                <div className="col-md-6">
                    <h4><span className="badge badge-info badge-pill"></span></h4>
                </div>
                <div className="col-md-6 text-right">
                    <button className="btn btn-info btn-sm" onClick={() => navigate(-1) } >채팅방 나가기</button>
                </div>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text">내용</label>
                </div>
                <input type="text" className="form-control" value={message} onChange={onChange}/>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={sendMessage}>보내기</button>
                </div>
            </div>
            <ul className="list-group">
                {messageList.map((item,idx)=>{return item.sender==item.inMessage?<li className="list-group-item" key={item.key}>{item.sender}-입장</li>:<li className="list-group-item" key={item.key}>{item.sender}-{item.inMessage}</li>})}
            </ul>
        </div>
    )
}

export default TaxiRoomDetail;