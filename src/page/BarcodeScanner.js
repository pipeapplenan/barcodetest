/* global wx */
import React, { useState, useEffect, useRef } from "react";
import "./BarcodeSanner.css";

const BarcodeScanner = () => {
  const [customerId, setCustomerId] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const poNumberRef = useRef(null);
  const itemCodeRef = useRef(null);
  const serialNumberRef = useRef(null);

  useEffect(() => {
    // 引入微信JS-SDK
    const loadWeChatSDK = () => {
      const script = document.createElement("script");
      script.src = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        wx.config({
          appId: "你的AppID",
          timestamp: "时间戳",
          nonceStr: "随机字符串",
          signature: "签名",
          jsApiList: ["scanQRCode"],
        });
      };
    };
    loadWeChatSDK();
  }, []);

  const handleCustomerIdChange = (e) => {
    setCustomerId(e.target.value);
    if (e.target.value.length === 2) {
      poNumberRef.current.focus();
    }
  };

  const handlePoNumberChange = (e) => {
    setPoNumber(e.target.value);
    if (e.target.value.length === 4) {
      itemCodeRef.current.focus();
    }
  };

  const handleItemCodeChange = (e) => {
    setItemCode(e.target.value);
    if (e.target.value.length === 8) {
      serialNumberRef.current.focus();
    }
  };

  const handleSerialNumberChange = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleBarcodeInputSubmit = () => {
    if (customerId && poNumber && itemCode && serialNumber) {
      fetch("https://barcodebackend.vercel.app/api/validate-barcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          poNumber,
          itemCode,
          serialNumber,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("验证结果: " + data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("请填写所有字段");
    }
  };

  return (
    <div className="container">
      <h1>条形码验证系统</h1>
      <div className="inputs">
        <input
          type="text"
          value={customerId}
          onChange={handleCustomerIdChange}
          placeholder="客户ID"
          style={{ width: "60px" }} // 2位长度
          maxLength={2}
        />
        <input
          type="text"
          value={poNumber}
          onChange={handlePoNumberChange}
          placeholder="PO编号"
          style={{ width: "80px" }} // 4位长度
          maxLength={4}
          ref={poNumberRef}
        />
        <input
          type="text"
          value={itemCode}
          onChange={handleItemCodeChange}
          placeholder="物品代码"
          style={{ width: "120px" }} // 8位长度
          maxLength={8}
          ref={itemCodeRef}
        />
        <input
          type="text"
          value={serialNumber}
          onChange={handleSerialNumberChange}
          placeholder="序列号"
          style={{ width: "80px" }} // 4位长度
          maxLength={4}
          ref={serialNumberRef}
        />
      </div>
      <button onClick={handleBarcodeInputSubmit}>提交条形码</button>
    </div>
  );
};

export default BarcodeScanner;
