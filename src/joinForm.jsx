import React, { useState, useEffect } from 'react';
import Header from './components/headerForm';
import axios from 'axios';



export default function Join() {

  // const err_style = {display: }
  const [style, setStyle] = useState({ display: 'none' })
  // const [borderStyle, setBorderStyle] = useState({ border: '1px solid black'})

  //유효성 검사
  const [idOK, setIdOK] = useState(true)
  const [PWOK, setPWOK] = useState(true)
  const [ChkOK, setChkOK] = useState(true)
  const [NameOK, setNameOK] = useState(true)
  const [SexOK, setSexOK] = useState(true)
  const [NicknameOK, setNicknameOK] = useState(true)
  const [MobileOK, setMobileOK] = useState(true)
  const [BirthOK, setBirthOK] = useState(true)
  const [EmailOK, setEmailOK] = useState(true)
  const [UnivOK, setUnivOK] = useState(true)

  //기본 정보
  const [errMsg, setErrMsg] = useState('필수 정보입니다.')
  const [ID, setID] = useState('');
  const [PW, setPW] = useState('');
  const [Chk_PW, setChk_PW] = useState('');
  const [Name, setName] = useState('');
  const [Sex, setSex] = useState('');
  const [Nickname, setNickname] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Birth, setBirth] = useState('');
  const [Email, setEmail] = useState('');
  const [Univ, setUniv] = useState('');

  const [UnivNum, setUnivNum] = useState('1');


  //오류메시지 상태 저장
  const [idMsg, setIdMsg] = useState('')
  const [PWMsg, setPWMsg] = useState('')
  const [ChkMsg, setChkMsg] = useState('')
  const [NameMsg, setNameMsg] = useState('')
  const [SexMsg, setSexMsg] = useState('')
  const [NicknameMsg, setNicknameMsg] = useState('')
  const [MobileMsg, setMobileMsg] = useState('')
  const [BirthMsg, setBirthMsg] = useState('')
  const [EmailMsg, setEmailMsg] = useState('')
  const [UnivMsg, setUnivMsg] = useState('')

  useEffect(() => {
    if (PW !== undefined &&
      Chk_PW !== undefined &&
      PW === Chk_PW) {
      setErrMsg('필수 정보입니다.')
    }
    else {
      setErrMsg('비밀번호가 일치하지 않습니다.');
    }
  }, [PW, Chk_PW])

  //아이디
  useEffect(() => {
    var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (ID === '') {
      setIdMsg('필수 정보입니다.');
      setIdOK(true);
    }
    else if (!regExp.test(ID)) {
      setIdMsg('영문자로 시작하는 영문자 또는 숫자 6~20자여야 합니다.');
      setIdOK(true);
    }
    else {
      setIdOK(false);
    }
  }, [ID]);

  //비밀번호
  useEffect(() => {
    var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (PW === '') {
      setPWMsg('필수 정보입니다.');
      setPWOK(true);
    }
    else if (!regExp.test(PW)) {
      setPWMsg('8~16의 영문, 숫자, 특수 문자가 최소 한 자씩 포함되어야 합니다.');
      setPWOK(true);
    }
    else {
      setPWOK(false);
    }
  }, [PW]);

  //비밀번호 확인
  useEffect(() => {
    if (Chk_PW === '') {
      setChkMsg('필수 정보입니다.');
      setChkOK(true);
    }
    else if (PW !== Chk_PW) {
      setChkMsg('비밀번호가 일치하지 않습니다.');
      setChkOK(true);
    }
    else {
      setChkOK(false);
    }
  }, [Chk_PW]);

   //이름
  useEffect(() => {
    if (Name === '') {
      setNameMsg('필수 정보입니다.');
      setNameOK(true);
    }
    else {
      setNameOK(false);
    }
  }, [Name]);

   //이름
  useEffect(() => {
    if (Sex === '') {
      setSexMsg('필수 정보입니다.');
      setSexOK(true);
    }
    else {
      setSexOK(false);
    }
  }, [Sex]);

  //닉네임
  useEffect(() => {
    var regExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
    if (Nickname === '') {
      setNicknameMsg('필수 정보입니다.');
      setNicknameOK(true);
    }
    else if (!regExp.test(Nickname)) {
      setNicknameMsg('2~10자의 한글, 영문, 숫자만 가능합니다.');
      setNicknameOK(true);
    }
    else {
      setNicknameOK(false);
    }
  }, [Nickname]);

  //전화번호
  useEffect(() => {
    var regExp = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}/;
    if (Mobile === '') {
      setMobileMsg('필수 정보입니다.');
      setMobileOK(true);
    }
    else if (!regExp.test(Mobile)) {
      setMobileMsg("'010-1234-5678'의 형식으로 입력해주세요.");
      setMobileOK(true);
    }
    else {
      setMobileOK(false);
    }
  }, [Mobile]);

  //생년월일
  useEffect(() => {
    if (Birth === '') {
      setBirthMsg('필수 정보입니다.');
      setBirthOK(true);
    }
    else {
      setBirthOK(false);
    }
  }, [Birth]);

  //이메일
  useEffect(() => {
    if (Email === '') {
      setEmailMsg('필수 정보입니다.');
      setEmailOK(true);
    }
    else {
      setEmailOK(false);
    }
  }, [Email]);


  //대학교
  useEffect(() => {
    if (Univ === '') {
      setUnivMsg('필수 정보입니다.');
      setUnivOK(true);
    }
    else if (Univ.search('대학교') === -1) {
      setUnivMsg("'대학교'를 입력해주세요.");
      setUnivOK(true);
    }
    else {
      setUnivOK(false);
    }
  }, [Univ]);

  // const emailSlt = document.getElementById('emailSelect');
  // var sendData = JSON.stringify({
  //   "ID": ID,
  //   "PW": PW,
  //   "Chk_PW": Chk_PW,
  //   "Name": Name,
  //   "Sex": Sex,
  //   "Nickname": Nickname,
  //   "Mobile": Mobile,
  //   "Birth": Birth,
  //   "Email": Email,
  //   "Univ": Univ,
  // })

  //회원가입 버튼 누른 후 정보 보냄
  function postInfo(e) {
    //제대로 작성되지 않은 정보가 있다면 보내지지 않게 함
    if (idOK === true || PWOK === true || ChkOK === true || NameOK === true || NicknameOK === true || SexOK === true || MobileOK === true || BirthOK === true || EmailOK === true || UnivOK === true) {
      e.preventDefault();
      alert('정보를 확인하세요');
      return;
    }
    e.preventDefault();
    axios
      .post("http://localhost:8080/joinContent", {
        ID: ID,
        PW: PW,
        Chk_PW: Chk_PW,
        Name: Name,
        Sex: Name,
        Nickname: Nickname,
        Mobile: Mobile,
        Birth: Birth,
        Email: Email,
        Univ: Univ,
      }).then((res) => {
        alert("회원가입 성공");
        console.log(res.data);
      })
      .catch(function (err) {
        alert("error는 " + err);
      });
    alert("끝");
  }
    
  var sendNick = JSON.stringify({
    "Nickname": Nickname,
  })

  function nickSearch() {
    axios
      .post('/user', {
        data: sendNick,
        headers: {'Content-type': 'application/json'}
      })
      .then(response => {
        alert(response.data);
      })
      .catch(function () {
        alert("실패");
      })
    console.log('아이디 중복 확인을 완료했습니다.');
  }

  
  function univSelect(e) {
    setUnivNum(e.target.id);
    setUniv(e.target.innerText);
  }

  return (

    <div id="wrapper">
      <Header />

      <div id="form-wrapper">
        <form action ="/joinForm" method="POST">

          
          <div id="form-content">
            <div className="id">
              아이디 <br />
              <input
                type="text"
                id="ID"
                name="id"
                placeholder="UserId"
                defaultValue={ID || ""}
                onChange={(e) => setID(e.target.value)}
              /><br />
            </div>
            <div
              id="empty_err"
              style={{visibility: idOK ? 'visible' : 'hidden'}}
            >{idMsg}</div>
          </div>

          <div id="form-content">
            <div className="pw">
              비밀번호 <br />
              <input
                type="password"
                id="PW"
                name="password"
                placeholder="Password"
                defaultValue={PW || ""}
                onChange={(e) => setPW(e.target.value)}
              /><br />
            </div>
            <div
              id="empty_err"
              style={{visibility: PWOK ? 'visible' : 'hidden'}}
            >{PWMsg}</div>
          </div>

          <div id="form-content">
            <div className="chk_pw">
              비밀번호 확인<br />
              <input
                type="password"
                id="chk_PW"
                name="password"
                placeholder="Password"
                defaultValue={Chk_PW || ""}
                onChange={(e) => setChk_PW(e.target.value)}
              /><br />
            </div>
            <div
              id="empty_err"
              style={{visibility: ChkOK ? 'visible' : 'hidden'}}
            >{ChkMsg}</div>
          </div>

          <div id="form-content">
            <div className="name">
              이름 <br />
              <input
                type="text"
                id="NAME"
                name="name"
                placeholder="Username"
                defaultValue={Name || ""}
                onChange={(e) => setName(e.target.value)}
              /><br />
            </div>
            <div
              id="empty_err"
              style={{visibility: NameOK ? 'visible' : 'hidden'}}
            >{NameMsg}</div>
          </div>

          <div id="form-content">
            <div className="sex">
          
              <div className="male">
                <input
                  type="radio"
                  id="male"
                  name="sex"
                  defaultValue="male"
                  onChange={(e) => setSex('male')}
                />
                <label htmlFor="male">남자</label><br />
              </div>
          
              <div className="female">
                <input
                  type="radio"
                  id="female"
                  name="sex"
                  defaultValue="female"
                  onChange={(e) => setSex('female')}
                />
                <label htmlFor="female">여자</label><br />
              </div>
              
            </div>
            <div
              id="sex_err"
              style={{visibility: SexOK ? 'visible' : 'hidden'}}
            >{SexMsg}</div>
          </div>

          <div id="form-content">
            닉네임 <br />
            <div className="nickName">
              
              <input
                type="text"
                id="NICKNAME"
                name="nickName"
                placeholder="UserNickName"
                defaultValue={Nickname || ""}
                onChange={(e) => setNickname(e.target.value)}
              />
              <a
                className="nickname_search"
                onClick={nickSearch}
              >닉네임 중복 확인</a>
              <br />
            </div>
            <div
              id="empty_err"
              style={{visibility: NicknameOK ? 'visible' : 'hidden'}}
            >{NicknameMsg }</div>
          </div>

          

          <div id="form-content">
            <div className="mobile">
              핸드폰 번호 <br />
              <input
                type="tel"
                id="MOBILE"
                name="mobile"
                placeholder="Phone-Number"
                defaultValue={Mobile || ""}
                onChange={(e) => setMobile(e.target.value)}
              /><br />
            </div>
            <div
              id="empty_err"
              style={{visibility: MobileOK ? 'visible' : 'hidden'}}
            >{ MobileMsg}</div>
          </div>

          <div id="form-content">
            <div className="birth">
              생년월일<br />
              <input
                type="date"
                id="BIRTH"
                name="birthday"
                defaultValue={Birth || ""}
                onChange={(e) => setBirth(e.target.value)}
              /><br />
            </div>
            <div
              id="empty_err"
              style={{visibility: BirthOK ? 'visible' : 'hidden'}}
            >{BirthMsg }</div>
          </div>

          <div id="form-content">
            이메일 <br/>
            <div className="email">
              <input
                type="text"
                id="EMAIL"
                name="email"
                placeholder="Email"
                defaultValue={Email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                id='emailSelect'
                value={UnivNum}
              >
                <option className="emailOp" value="1" onClick={(e) => setUnivNum(e.target.value)}>@dankook.ac.kr</option>
                <option className="emailOp" value="2" onClick={(e) => setUnivNum(e.target.value)}>@catholic.ac.kr</option>
                <option className="emailOp" value="3" onClick={(e) => setUnivNum(e.target.value)}>@kacheon.ac.kr</option>
                <option className="emailOp" value="4" onClick={(e) => setUnivNum(e.target.value)}>@snu.ac.kr</option>
              </select>
              <br />
            </div>
            <div
              id="empty_err"
              style={{visibility: EmailOK ? 'visible' : 'hidden'}}
            >필수 정보입니다.</div>
          </div>

          <div id="form-content">
            <div className="univ_wrapper">
            대학교 <br/>
            <div className="univ">
                <input
                  type="text"
                  id="univ_out"
                  name="university"
                  placeholder="Ex) 단국대학교"
                  defaultValue={Univ || ""}
                /><br />
                <a
                  href="#pop_info"
                  className="univ_search"
                  onClick={
                    e => setStyle({ display: 'block' })}
                >대학교 찾기</a>
            </div>
              <div
                id="empty_err"
                style={{visibility: UnivOK ? 'visible' : 'hidden'}}
              >{ UnivMsg}</div>
            </div>
          </div>

          <div id="pop_info" className="pop_wrap" style={style}>
            <div className="pop_inner">
              <input
                type="text"
                id="univ_input"
                name="univ_find"
                placeholder="찾으시는 대학교를 입력해주세요."
                
              />
              <ul>
                <li><a name="univ_content" id="1" onClick={univSelect}>단국대학교</a></li>
                <li><a name="univ_content" id="2" onClick={univSelect}>가톨릭대학교</a></li>
                <li><a name="univ_content" id="3" onClick={univSelect}>가천대학교</a></li>
                <li><a name="univ_content" id="4" onClick={univSelect}>서울대학교</a></li>
              </ul>
              
              <button
                type="button"
                className="btn_close"
                onClick={e => {
                setStyle({display: 'none'})
              }}>닫기</button>
            </div>
          </div>


          <button
            id="joinbtn"
            type="submit"
            formMethod="post"
            onClick={postInfo}
          >회원가입</button>
        </form>
        </div>
    </div>
  )
}