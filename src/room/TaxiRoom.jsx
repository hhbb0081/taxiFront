import React,{useState,useRef,useEffect} from "react";
import styles from './TaxiRoom.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios"
import {Link } from "react-router-dom";



function TaxiRoom(){
    const [roomName,setRoomName]=useState("");
    const [list,setList]=useState([]);
    let [ItemList,setItemList]=useState([{
        id:0
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

    useEffect(()=>{
        findAllroom()
    },[])
      
    const findAllroom=()=>{
        axios.get('/chat/rooms')
        .then((response) => { 
            setList(response.data); 
            console.log(list)
        })
        .catch(
            (response)=>{
                console.log("실패")
            }
        )
        

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

    const a=()=>{
        console.log(ItemList)
    }


    const enterRoom=(e)=>{
        var sender = prompt('대화명을 입력해 주세요.');
        if(sender !== "") {
            localStorage.setItem('sender',sender);
            localStorage.setItem('roomId',ItemList);
        }
        console.log(e.key)
    }
    return(
        <>
            <div id={styles.title}>
                <img id={styles.taxiImage} src="taxi-image.png"></img>
                <h2>택시합승</h2>
            </div>
            <div id={styles.wrapper}>
                <div id={styles.inform}>
                    <div id={styles.my}>
                        <img id={styles.profile} src="bus.png"></img>
                        <h5 id={styles.nick}>굿보이</h5>
                        <h5 id={styles.college}>가천대</h5>
                        <button id={styles.button1}>내정보</button><button id={styles.button2}>로그아웃</button>
                    </div>
                </div>
                <div id={styles.makeRoom}>
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
                        {list.map((item,idx)=>{return item.id==0?null:<Link to={"/TaxiRoomDetail/"+item.roomName}><li onClick={()=>{enterRoom()}} key={item.roomId} className="list-group-item list-group-item-action" id={styles.list}>방 제목 : {item.roomName}<span className="badge badge-info badge-pill"> {item.userCount}</span></li></Link>})} 
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TaxiRoom;