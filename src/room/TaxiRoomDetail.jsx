import React from "react";

function TaxiRoomDetail(){
    return(
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h4> <span class="badge badge-info badge-pill"></span></h4>
                </div>
                <div className="col-md-6 text-right">
                    <a className="btn btn-info btn-sm" href="/chat/room">채팅방 나가기</a>
                </div>
            </div>
        </div>
    )
}

export default TaxiRoomDetail;