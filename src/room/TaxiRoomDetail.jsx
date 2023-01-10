import axios from "axios";
import { useState,useEffect,useRef } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import SockJS from 'socketjs-client'
import Stomp from 'stompjs'

function TaxiRoomDetail(props){
    const[message,setMessage]=useState('')
    const[roomId,setRoomId]=useState('')
    const[sender,setSender]=useState('')
    const[room,setRoom]=useState({})
    const onChange = (e)=>setMessage(e.target.value);
    

    const sendMessage=()=>{
        ws.send("http://localhost:8080/app/chat/message",{},JSON.stringify({type:'TALK',message:message,roomId:roomId,sender:sender}))
        setMessage('')
    }

    const findRoom=()=>{
        axios.get("/chat/room/"+roomId)
        .then((response) => { 
            setRoom(response.data); 
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const created=()=>{
        setRoomId(localStorage.getItem('roomId'));
        setSender(localStorage.getItem('sender'));
        findRoom()
    }

    useEffect(()=>{
        created()
    },[])
    

    useEffect(()=>{
        ws.connect({},()=>{
            ws.subscribe("http://localhost:8080/topic/chat/room"+roomId,function(message){
                const recv=JSON.parse(message.body)
            })
            ws.send("http://localhost:8080/app/chat/message",{},JSON.stringify({type:'ENTER',roomId:roomId,sender:sender}));
        })
    },[])

    var sock = new SockJS("http://localhost:8080/ws/chat");
    var ws = Stomp.over(sock);
    var reconnect = 0;
    let navigate = useNavigate();
    return(
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h4>{room.name}<span class="badge badge-info badge-pill"></span></h4>
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
        </div>
    )
}

export default TaxiRoomDetail;