import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect,useRef } from "react";
import axios from "axios"

function Taxi() {
    
    const [roomName,setRoomName]=useState("");
    let [ItemList,setItemList]=useState([{
        id:1
    }]);
    const no = useRef(1)

    const AddList=()=>{
        if(roomName===""){
            null
        }
        else{
            setItemList((prev)=>{
                console.log(ItemList.length)
                return[
                    {   
                        id : no.current++,
                        roomName:roomName,
                    },
                    ...prev,
                ]
            });
        }
    }
    
    const onChange = (e)=>setRoomName(e.target.value);
    const onKeyPress =(e)=>{
        if(e.key=="Enter"){
            createRoom()
        }
    }
    const findAllroom=()=>{
        axios.get('/chat/rooms').then((response) => { ItemList = response.data; });
    }
    const createRoom=(e)=>{
        
        if(roomName===""){
            alert("방 제목을 입력해주세요")
        }
        else{
            var params = new URLSearchParams();
            params.append("name",roomName);
            axios.post("http://localhost:8080"+'/chat/room', params)
            .then((response)=>{
                alert(response.data.roomName+"방 개설에 성공하였습니다.")
                setRoomName("")
                findAllroom()
            })
            .catch(
                (response)=>{
                    console.log(response)
                    alert("채팅방 개설에 실패하였습니다.");
                }
            )
        }
    }

    const onclickHandler = (name) => alert(`hi`);

    const enterRoom=(e)=>{
        var sender = prompt('대화명을 입력해 주세요.');
        if(sender !== "") {
            localStorage.setItem('wschat.sender',sender);
            localStorage.setItem('wschat.roomId',roomId);
            location.href="/chat/room/enter/"+roomId;
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
                    <button className="btn btn-primary" type="button" onClick={()=>{createRoom(),AddList()}}>채팅방 개설</button>
                </div>
            </div>
            <ul className="list-group">
                {ItemList.map((item,idx)=>{return item.id==1?null:<li key={item.id} className="list-group-item list-group-item-action" >{item.roomName}<span className="badge badge-info badge-pill" onClick={()=>{enterRoom(),onclickHandler("heeyeon")}}> {item.userCount}</span></li>})} 
            </ul>
        </div>
    )
}

export default Taxi;