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
        </div>
    )
}

export default TaxiRoomDetail;