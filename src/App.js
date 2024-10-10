// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BarcodeScanner from "./page/BarcodeScanner";
import DatabaseImport from "./page/DatabaseImport";
import Modal from "./page/Modal";
import "./App.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 控制模态框显示状态
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 控制登录状态

  const handleFileDatabaseClick = (e) => {
    e.preventDefault(); // 阻止默认的跳转行为
    setIsModalOpen(true); // 打开模态框
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // 设置为已登录状态
  };

  return (
    <Router>
      {/* Banner 组件 */}
      <div className="banner">
        <div className="logo">
          <p>赛特斯公司</p>
        </div>
        <div className="title">
          <h1>条形码查询系统工具</h1>
        </div>
        <div className="nav">
          <div className="barcode">
            <Link to="/barcodetest">条形码验证</Link>
          </div>
          <div className="filedatabase">
            <Link to="#" onClick={handleFileDatabaseClick}>
              文件上传与数据库导入
            </Link>
          </div>
        </div>
      </div>

      {/* 显示模态框 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // 关闭模态框
        onLogin={handleLoginSuccess} // 登录成功后的回调
      />

      {/* 内容区域 */}
      <div className="content">
        <Routes>
          <Route path="/barcodetest" element={<BarcodeScanner />} />
          {/* 只有登录成功后才能访问 DatabaseImport 页面 */}
          {isAuthenticated && (
            <Route path="/databasefile" element={<DatabaseImport />} />
          )}
          {/* 默认重定向到 /barcodetest */}
          <Route path="*" element={<Link to="/barcodetest" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
