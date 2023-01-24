import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios';
import Header from '../components/headerForm';
import modules from './userInfo.module.css';


import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function userInfo() {

  return (
    <div>
      <Header />
      <fieldset className={modules.fieldset}>
        <legend className={modules.legend}>아이디</legend>
        {window.localStorage.getItem("username")}
        
      </fieldset>
    </div>
  );
}