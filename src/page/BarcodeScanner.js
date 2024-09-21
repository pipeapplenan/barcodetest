/* global wx */

import React, { useState, useEffect, useRef } from "react";

const BarcodeScanner = () => {
  // 用于存储用户输入的各个字段
  const [customerId, setCustomerId] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  // 定义输入框的引用
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
        // 微信JS-SDK 配置
        wx.config({
          appId: "你的AppID", // 从微信公众平台获取
          timestamp: "时间戳", // 后端生成的时间戳
          nonceStr: "随机字符串", // 后端生成的随机字符串
          signature: "签名", // 使用jsapi_ticket生成的签名
          jsApiList: ["scanQRCode"], // 需要使用的JS接口列表
        });
      };
    };
    loadWeChatSDK();
  }, []);

  // 处理输入并在达到限制时跳到下一个输入框
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

  // 提交按钮点击时处理输入
  const handleBarcodeInputSubmit = () => {
    if (customerId && poNumber && itemCode && serialNumber) {
      // 发送条形码数据到后端进行验证
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
    <div>
      <h1>条形码验证系统</h1>

      {/* 横向排列的输入框 */}
      <div style={{ display: "flex", gap: "10px" }}>
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
          ref={poNumberRef} // 引用第二个输入框
        />
        <input
          type="text"
          value={itemCode}
          onChange={handleItemCodeChange}
          placeholder="物品代码"
          style={{ width: "120px" }} // 8位长度
          maxLength={8}
          ref={itemCodeRef} // 引用第三个输入框
        />
        <input
          type="text"
          value={serialNumber}
          onChange={handleSerialNumberChange}
          placeholder="序列号"
          style={{ width: "80px" }} // 4位长度
          maxLength={4}
          ref={serialNumberRef} // 引用第四个输入框
        />
      </div>

      <br />
      <button onClick={handleBarcodeInputSubmit}>提交条形码</button>

      <br />
      <br />
    </div>
  );
};

export default BarcodeScanner;

// import React, { useState, useEffect } from "react";

// const BarcodeScanner = () => {
//   // 用于存储用户输入的各个字段
//   const [customerId, setCustomerId] = useState("");
//   const [poNumber, setPoNumber] = useState("");
//   const [itemCode, setItemCode] = useState("");
//   const [serialNumber, setSerialNumber] = useState("");

//   useEffect(() => {
//     // 引入微信JS-SDK
//     const loadWeChatSDK = () => {
//       const script = document.createElement("script");
//       script.src = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
//       script.async = true;
//       document.body.appendChild(script);

//       script.onload = () => {
//         // 微信JS-SDK 配置
//         wx.config({
//           appId: "你的AppID", // 从微信公众平台获取
//           timestamp: "时间戳", // 后端生成的时间戳
//           nonceStr: "随机字符串", // 后端生成的随机字符串
//           signature: "签名", // 使用jsapi_ticket生成的签名
//           jsApiList: ["scanQRCode"], // 需要使用的JS接口列表
//         });
//       };
//     };
//     loadWeChatSDK();
//   }, []);

//   // 提交按钮点击时处理输入
//   const handleBarcodeInputSubmit = () => {
//     if (customerId && poNumber && itemCode && serialNumber) {
//       // 发送条形码数据到后端进行验证
//       fetch("https://barcodebackend.vercel.app/api/validate-barcode", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           customerId,
//           poNumber,
//           itemCode,
//           serialNumber,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           alert("验证结果: " + data.message);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     } else {
//       alert("请填写所有字段");
//     }
//   };

//   return (
//     <div>
//       <h1>条形码验证系统</h1>

//       {/* 横向排列的输入框 */}
//       <div style={{ display: "flex", gap: "10px" }}>
//         <input
//           type="text"
//           value={customerId}
//           onChange={(e) => setCustomerId(e.target.value)}
//           placeholder="客户ID"
//           style={{ width: "120px" }}
//         />
//         <input
//           type="text"
//           value={poNumber}
//           onChange={(e) => setPoNumber(e.target.value)}
//           placeholder="PO编号"
//           style={{ width: "120px" }}
//         />
//         <input
//           type="text"
//           value={itemCode}
//           onChange={(e) => setItemCode(e.target.value)}
//           placeholder="物品代码"
//           style={{ width: "120px" }}
//         />
//         <input
//           type="text"
//           value={serialNumber}
//           onChange={(e) => setSerialNumber(e.target.value)}
//           placeholder="序列号"
//           style={{ width: "120px" }}
//         />
//       </div>

//       <br />
//       <button onClick={handleBarcodeInputSubmit}>提交条形码</button>

//       <br />
//       <br />
//     </div>
//   );
// };

// export default BarcodeScanner;
