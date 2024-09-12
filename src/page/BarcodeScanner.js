/* global wx */
import React, { useState, useEffect } from "react";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState(""); // 用于存储输入的条形码

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

  // 手动输入条形码后，点击按钮进行验证
  const handleBarcodeInputSubmit = () => {
    if (barcode) {
      // 发送条形码到后端进行验证
      fetch(
        "https://016f-2407-7000-90bb-d00-11d0-4f96-678e-e031.ngrok-free.app/api/validate-barcode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ barcode }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          alert("验证结果: " + data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("请输入条形码");
    }
  };

  const handleScan = () => {
    wx.ready(() => {
      wx.scanQRCode({
        needResult: 1, // 扫描后直接返回结果
        scanType: ["barCode"], // 只扫描条形码
        success: (res) => {
          const result = res.resultStr; // 扫描结果
          // 发送到后端进行验证
          fetch(
            "https://016f-2407-7000-90bb-d00-11d0-4f96-678e-e031.ngrok-free.app/api/validate-barcode",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ barcode: result }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              alert("验证结果: " + data.message);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        },
      });
    });
  };

  return (
    <div>
      <h1>条形码验证系统</h1>

      {/* 输入条形码 */}
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="请输入条形码"
      />
      <button onClick={handleBarcodeInputSubmit}>提交条形码</button>

      <br />
      <br />

      {/* 微信扫码功能 */}
      <button onClick={handleScan}>点击扫码识别</button>
    </div>
  );
};

export default BarcodeScanner;
