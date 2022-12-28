import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from "react";
import axios from "axios"

function App1() {
    
    const [roomName,setRoomName]=useState("");
    const [ItemList,setItemList]=useState([]);
    
    const onChange = (e)=>setRoomName(e.target.value);
    const onKeyPress =(e)=>{
        if(e.key=="Enter"){
            createRoom()
        }
    }
    const findAllroom=()=>{
        axios.get('/chat/rooms').then(response => { ItemList = response.data; });
    }
    const createRoom=()=>{
        
        if(roomName===""){
            alert("방 제목을 입력해주세요")
        }
        else{
            var params = new URLSearchParams();
                    params.append("name",roomName);
                    axios.post("http://localhost:8080"+'/chat/room', params)
            .then((response)=>{
                alert(response.roomName+"방 개설에 성공하였습니다.")
                roomName="";
                findAllroom()
            })
            .catch(
                (response)=>{
                    alert("채팅방 개설에 실패하였습니다.");
                }
            )
        }
    }



    return (
        <div className="container" id="app">
            <div className="row">
                <div className="col-md-12">
                    <h3>채팅방 리스트</h3>
                </div>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text">방제목</label>
                </div>
                <input type="text" className="form-control"  value={roomName} onChange={onChange} onKeyDown={onKeyPress} />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={createRoom}>채팅방 개설</button>
                </div>
            </div>
        <ul className="list-group">
            {ItemList.map((item,idx)=>{return <li key={idx}>{item.name}</li>})}
        </ul>
        </div>
    )
}

export default App1;