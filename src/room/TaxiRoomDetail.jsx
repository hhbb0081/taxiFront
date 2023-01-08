import React from "react";
import { useNavigate } from 'react-router-dom';


function TaxiRoomDetail(){
    let navigate = useNavigate();
    return(
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h4> <span class="badge badge-info badge-pill"></span></h4>
                </div>
                <div className="col-md-6 text-right">
                    <button className="btn btn-info btn-sm" onClick={() => navigate(-1) } >채팅방 나가기</button>
                </div>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text">내용</label>
                </div>
                <input type="text" className="form-control" v-model="message"/>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">보내기</button>
                </div>
            </div>
        </div>
    )
}

export default TaxiRoomDetail;