import React,{useState,useRef} from "react";
import './TaxiRoom.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios"
import {BrowserRouter,Routes,Route,Link } from "react-router-dom";
import TaxiRoomDetail from "./TaxiRoomDetail";



function TaxiRoom(){
    const [roomName,setRoomName]=useState("");
    let [ItemList,setItemList]=useState([{
        id:1
    }]);
    const no = useRef(1)

    const AddList=()=>{
        if(roomName===""){
            return null
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


    const enterRoom=(e)=>{
        var sender = prompt('대화명을 입력해 주세요.');
        var room = ItemList[ItemList.length-2].roomName
        console.log(ItemList[ItemList.length-2].roomName)
        var k = k
        if(sender !== "") {
            localStorage.setItem('wschat.sender',sender);
            localStorage.setItem('wschat.roomId',room);
            document.location.href="http://localhost:8080/chat/room/enter/"+room;
        }
        console.log("click")
    }
    return(
        <>
            
            <div id="title">
                <img id="taxiImage" src="taxi-image.png"></img>
                <h2>택시합승</h2>
            </div>
            <div id="wrapper">
                <div id="inform">
                    <div id="my">
                        <img id="profile" src="bus.png"></img>
                        <h5 id="nick">굿보이</h5>
                        <h5 id="college">가천대</h5>
                        <button id="button1">내정보</button><button id="button2">로그아웃</button>
                    </div>
                </div>
                <div id="makeRoom">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <label className="input-group-text">방제목</label>
                        </div>
                        <input type="text" className="form-control"  value={roomName} onChange={onChange} onKeyDown={onKeyPress} />
                        <div >
                            <button className="btn btn-primary" type="button" onClick={()=>(createRoom(),AddList())}>채팅방 개설</button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {ItemList.map((item,idx)=>{return item.id==1?null:<li onClick={()=>{enterRoom()}} key={item.id} className="list-group-item list-group-item-action" id="list">방 제목 : {item.roomName}<span className="badge badge-info badge-pill"> {item.userCount}</span></li>})} 
                    </ul>
                    <Link to="/TaxiRoomDetail">asfd</Link>
                </div>
            </div>
        </>
    )
}

export default TaxiRoom;