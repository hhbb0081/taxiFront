import React, { useState, useEffect } from 'react';
import Header from '../components/headerForm';
import axios from 'axios';
import styles from './find.module.css';

export default function Find() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  var par = {"name": name, "email": email}
  //400에러남 ㅜㅜ
  function postInfo(e) {
      e.preventDefault();
    axios
      .get("http://localhost:8080/users/findId")
      //   {
      //   data: JSON.stringify(par),
      // }, { "Content-Type": "application/json; charset=utf-8" }
      .then(function (response) {
        alert("아이디 찾기 성공");
        console.log(response.data);
      }).catch(function (error) {
        alert("error는 " + error);
        console.log(error);
      }).then(function () {
        alert("끝");
      });
    }

  return (
    <div>
      <Header />
      <div className={styles.main_wrapper}>
        <h1>아이디 찾기</h1>
        <div >
          <form onSubmit={postInfo} className={styles.form_wrapper} action ="/find" method="GET">
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="UserEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/> */}
            <button
              className={styles.btn}
              type="submit"
            >아이디 찾기</button>
          </form>
        </div>
      </div>
    </div>
  )
}