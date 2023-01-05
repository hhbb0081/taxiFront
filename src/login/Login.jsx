import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './components/headerForm';
import styles from'./login.module.css'

import { Link } from "react-router-dom";

export default function Login() {
  axios.defaults.withCredentials = true;

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [idpwOk, setIdPwOk] = useState(false);

  useEffect(() => {

  },[id])

  useEffect(() => {
    if (idValid && pwValid) {
      setIdPwOk(false);
      return;
    }
    else {
      setIdPwOk(true);
    }
  }, [idValid, pwValid])

  const signIn = (e) => {
    e.preventDefault();

    // axios(
    //   {
    //     url: '/member',
    //     method: 'post',
    //     data: {
    //       ID: id,
    //       PW: password
    //     },
    //     baseURL: 'api',
    //   }
    // ).then(function (response) {
    //   console.log(response.data)
    // })

    fetch('http://localhost:8080/users/findId', {
      method: 'POST',
      body: JSON.stringify({
        ID: id,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res);
        //로그인 성공
        if (res.message === 'SUCCESS') {
          window.localStorage.setItem('token', res.access_token);
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      });
  };
  

  return (
    <div>
      {/* <div id="header">
          <div id="logo">
            <img src={logo} alt="택시 사진" />
          </div>
          <div id="title">TAXI</div>
      </div> */}
      <Header/>

      <div className={styles.main_wrapper}>
        <div className={styles.join}><Link to="/Join">회원가입</Link></div>
        <div className={styles.form_wrapper}>
          <form>
            <div id="id-wrapper">
              <input 
                type="text" 
                name="id" 
                placeholder="아이디"
                className={styles.id}
              />
                
            </div>
            
            <br/>

            <div id="pw-wrapper">
              <input 
                type="password" 
                name="password" 
                placeholder="비밀번호"
                className={styles.pw}
              />
            </div>
            <br/>
            <div id="btn">
              <button className={styles.login_btn}>로그인</button></div>

            <div className="_wrapper">
              <span className={styles.chk_wrapper}>
                <input
                  type="checkbox"
                  name="login_man"
                  className={styles.login_man}
                  placeholder="로그인 유지"
                />로그인 유지
              </span>
              <span className={styles.idpw_find}>
                <Link to="/Find">아이디 | 비밀번호 찾기</Link>
              </span>
            </div>
          </form>
          <div className={styles.other_login}>
            <a href="#"><div className={styles.google}>구글 로그인</div></a>
            <div className={styles.facebook} ><a href="#">페이스북 로그인</a> </div>
            <div className={styles.naver} ><a href="#">네이버 로그인</a> </div>
            <div className={styles.kakao} ><a href="#">카카오 로그인</a> </div>
          </div>
          </div>
      </div>
    </div>

  )
}