import React, { useState, useEffect } from 'react';
import Header from './components/headerForm';
import axios from 'axios';
import styles from './find.module.css';

export default function Find() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  //400에러남 ㅜㅜ
  async function postInfo(e) {
    try {
      e.preventDefault();
      const response = await axios
        .get("http://localhost:8080/users/findId", {
          method: "patch",
          body: {
            name: name,
            email: email,
          }
        }, { "Content-Type": 'application/json' });
      alert("아이디 찾기 성공");
      console.log(response.data);
    } catch(err) {
          alert("error는 " + err);
    }
    alert("끝");
  }

  return (
    <div>
      <Header />
      <div className={styles.main_wrapper}>
        <h1>아이디 찾기</h1>
        <div >
          <form className={styles.form_wrapper} action ="/findId" method="GET">
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
            <button
              className={styles.btn}
              onClick={postInfo}
            >아이디 찾기</button>
          </form>
        </div>
      </div>
    </div>
  )
}