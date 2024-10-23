// src/components/Modal.js
import React, { useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom"; // 正确导入 useNavigate

const Modal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 需要在函数组件内部调用

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      onLogin(); // 登录成功
      onClose(); //
      navigate("/databasefile"); // 登录成功后跳转到 /databasefile 页面
    } else {
      alert("用户名或密码错误！");
    }
  };

  if (!isOpen) return null; // 如果模态框未打开，则不渲染

  return (
    <div className="modal">
      <div className="section login">
        <button
          onClick={() => onClose(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <h2>身份验证</h2>
        <div className="login-content">
          <div className="left-section">
            <div className="input">
              <input
                type="text"
                placeholder="用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                type="submit"
                value="登录"
                id="btn"
                onClick={handleLogin}
              />
              <input
                type="button"
                value="取消"
                id="cancel-btn"
                onClick={onClose} // 点击取消时关闭模态框
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
