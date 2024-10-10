/* global wx */
import React, { useState, useEffect } from "react";
import "./BarcodeScanner.css";
import axios from "axios";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [file, setFile] = useState(null);
  const handleBarcodeInputChange = (e) => {
    setBarcode(e.target.value);
  };

  const handleBarcodeInputSubmit = () => {
    // 条形码格式：前2位是customerId，接着4位poNumber，接着8位itemCode，最后4位serialNumber
    if (barcode.length === 18) {
      const customerId = barcode.slice(0, 2); // 前2位
      const poNumber = barcode.slice(2, 6); // 中间4位
      const itemCode = barcode.slice(6, 14); // 接着8位
      const serialNumber = barcode.slice(14); // 最后4位

      // 打印拆分后的值，方便调试
      console.log("Customer ID:", customerId);
      console.log("PO Number:", poNumber);
      console.log("Item Code:", itemCode);
      console.log("Serial Number:", serialNumber);

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
      alert("请输入有效的条形码，长度应为18位");
    }
  };

  // const handleDatabaseImport = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/import-barcodes"
  //     );
  //     console.log("Database import successful:", response.data);
  //     alert("Database import successful");
  //   } catch (error) {
  //     console.error("Error importing database:", error);
  //     alert("Error importing database");
  //   }
  // };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleFileUpload = () => {
  //   if (!file) {
  //     alert("请选择文件");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   fetch("http://localhost:3000/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       alert("文件上传成功: " + data.message);
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading file:", error);
  //       alert("文件上传失败");
  //     });
  // };

  return (
    <div className="container">
      <h1>条形码验证系统</h1>

      {/* 单一输入框，用于输入完整的条形码 */}
      <input
        type="text"
        value={barcode}
        onChange={handleBarcodeInputChange}
        placeholder="请输入完整18位的条形码"
        style={{ width: "300px", height: "50px" }}
        maxLength={18} // 限制为18位
      />

      <br />
      <button onClick={handleBarcodeInputSubmit}>提交条形码</button>
    </div>
  );
};

export default BarcodeScanner;

// import React, { useState, useEffect, useRef } from "react";
// import "./BarcodeSanner.css";

// const BarcodeScanner = () => {
//   const [customerId, setCustomerId] = useState("");
//   const [poNumber, setPoNumber] = useState("");
//   const [itemCode, setItemCode] = useState("");
//   const [serialNumber, setSerialNumber] = useState("");

//   const poNumberRef = useRef(null);
//   const itemCodeRef = useRef(null);
//   const serialNumberRef = useRef(null);

//   useEffect(() => {
//     // 引入微信JS-SDK
//     const loadWeChatSDK = () => {
//       const script = document.createElement("script");
//       script.src = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
//       script.async = true;
//       document.body.appendChild(script);

//       script.onload = () => {
//         wx.config({
//           appId: "你的AppID",
//           timestamp: "时间戳",
//           nonceStr: "随机字符串",
//           signature: "签名",
//           jsApiList: ["scanQRCode"],
//         });
//       };
//     };
//     loadWeChatSDK();
//   }, []);

//   const handleCustomerIdChange = (e) => {
//     setCustomerId(e.target.value);
//     if (e.target.value.length === 2) {
//       poNumberRef.current.focus();
//     }
//   };

//   const handlePoNumberChange = (e) => {
//     setPoNumber(e.target.value);
//     if (e.target.value.length === 4) {
//       itemCodeRef.current.focus();
//     }
//   };

//   const handleItemCodeChange = (e) => {
//     setItemCode(e.target.value);
//     if (e.target.value.length === 8) {
//       serialNumberRef.current.focus();
//     }
//   };

//   const handleSerialNumberChange = (e) => {
//     setSerialNumber(e.target.value);
//   };

//   const handleBarcodeInputSubmit = () => {
//     if (customerId && poNumber && itemCode && serialNumber) {
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
//     <div className="container">
//       <h1>条形码验证系统</h1>
//       <div className="inputs">
//         <input
//           type="text"
//           value={customerId}
//           onChange={handleCustomerIdChange}
//           placeholder="客户ID"
//           style={{ width: "60px" }} // 2位长度
//           maxLength={2}
//         />
//         <input
//           type="text"
//           value={poNumber}
//           onChange={handlePoNumberChange}
//           placeholder="PO编号"
//           style={{ width: "80px" }} // 4位长度
//           maxLength={4}
//           ref={poNumberRef}
//         />
//         <input
//           type="text"
//           value={itemCode}
//           onChange={handleItemCodeChange}
//           placeholder="物品代码"
//           style={{ width: "120px" }} // 8位长度
//           maxLength={8}
//           ref={itemCodeRef}
//         />
//         <input
//           type="text"
//           value={serialNumber}
//           onChange={handleSerialNumberChange}
//           placeholder="序列号"
//           style={{ width: "80px" }} // 4位长度
//           maxLength={4}
//           ref={serialNumberRef}
//         />
//       </div>
//       <button onClick={handleBarcodeInputSubmit}>提交条形码</button>
//     </div>
//   );
// };

// export default BarcodeScanner;
