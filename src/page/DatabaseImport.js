// src/page/DatabaseImport.js
import React, { useState } from "react";
import axios from "axios";
import "./DatabaseImport.css";

const DatabaseImport = () => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(""); // 新增状态用于保存文件路径

  const handleDatabaseImport = async () => {
    if (!filePath) {
      alert("请先上传文件");
      return;
    }
    try {
      const response = await axios.post(
        "https://barcodebackend.vercel.app/api/import-barcodes",
        { filePath } // 将文件路径作为请求体传递
      );
      console.log("Database import successful:", response.data);
      alert("Database import successful");
    } catch (error) {
      console.error("Error importing database:", error);
      alert("Error importing database");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("请选择文件");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("https://barcodebackend.vercel.app/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("文件上传成功: " + data.message);
        setFilePath(data.filePath); // 将文件路径保存到状态中
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("文件上传失败");
      });
  };

  return (
    <div className="database-import-container">
      <h2 className="page-title">文件上传与数据库导入</h2>

      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>上传文件</button>
      </div>
      <div className="import">
        <button onClick={handleDatabaseImport}>导入数据库</button>
      </div>
    </div>
  );
};

export default DatabaseImport;
