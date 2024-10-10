// src/page/DatabaseImport.js
import React, { useState } from "react";
import axios from "axios";
import "./DatabaseImport.css";

const DatabaseImport = () => {
  const [file, setFile] = useState(null);

  const handleDatabaseImport = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/import-barcodes"
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

    fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("文件上传成功: " + data.message);
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
