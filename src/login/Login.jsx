import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
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
    if (idValid && pwValid) {
      setIdPwOk(false);
      return;
    }
    else {
      setIdPwOk(true);
    }
  }, [idValid, pwValid])


    async function postInfo(e) {
    try {
      e.preventDefault();
      axios.get("http://localhost:8080/login")
      .then((response)=>{
        console.log(response)
        console.log(response.data)
      })
      .catch(
        (error)=>{
          console.log(error)
        }
      )
      const response = await axios
        .get("http://localhost:8080/login", {
          params: {
            userId: id,
            password: password,
          },
        });
      alert("회원가입 성공!");
      console.log(response.data);
        
    } catch (error) {
      console.log(error);
    }
    alert("끝");
  }

    
  

  return (
    <div>
      
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
              <button className={styles.login_btn} onClick={postInfo}>로그인</button></div>

            <div className="_wrapper">
              <span className={styles.chk_wrapper}>
                <input
                  id='login_main'
                  type="checkbox"
                  name="login_man"
                  className={styles.login_man}
                  placeholder="로그인 유지"
                />
                <label
                  htmlFor="login_main"
                >로그인 유지</label>
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