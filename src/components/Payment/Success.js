import React, { useEffect, useState } from "react";
import background from "../images/image3_resized.jpg";
import PlayAudio from "../PlayAudio";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);
  const [data, setSetData] = useState(null);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (data.receiptURL) {
        const link = document.createElement("a");
        link.href = data.bufferImage;
        link.download =
          data.receiptName || `${params.get("session_id")}_receipt.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        navigate(`/?#liveamount`);
      } else {
        console.error("No image URL found in the response");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReceipt = async () => {
    try {
      const response = await fetch(
        `https://api.yaavaay.com/requestRecieptasPng/${params.get("session_id")}`,
        { method: "GET", redirect: "follow" }
      );
      const dataRes = await response.json();
      if (dataRes?.receiptURL) {
        setSetData(dataRes);
      } else {
        setTimeout(() => !data?.receiptURL && window.location.reload(), 5000);
      }
    } catch (error) {
      console.error("error:", error);
      setTimeout(() => window.location.reload(), 5000);
    }
  };

  useEffect(() => {
    getReceipt();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <PlayAudio />

      {/* --- Text oben --- */}
      <p
        style={{
          color: "white",
          marginTop: 30,
          fontWeight: "bold",
          fontFamily: '"Tahoma", sans-serif',
        }}
      >
        Your payment has been processed.
      </p>
      <p
        style={{
          color: "white",
          marginBottom: "10px",
          fontWeight: "bold",
          fontFamily: '"Tahoma", sans-serif',
        }}
      >
        Copy of receipt sent to your email.
      </p>

      {/* --- Receipt + Download --- */}
      {data?.receiptURL ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <img
            src={data.receiptURL}
            alt="Receipt"
            style={{
              display: "block",
              objectFit: "contain",
              width: "88%",        // etwas größer als vorher
              maxWidth: "520px",   // perfekt für Desktop
              height: "auto",
              boxShadow: "0 0 12px rgba(0,0,0,0.6)",
            }}
          />

          <a
            href="#"
            onClick={handleDownload}
            style={{
              letterSpacing: "0px",
              color: "#03a5fc",
              display: "inline-block",
              fontWeight: "bold",
              textDecoration: "none",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "6px",
            }}
          >
            Download
          </a>
        </div>
      ) : (
<div
  className="success-loading-div"
  style={{
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "1.4",
  }}
>
  <p className="success-Loadign-first">Please wait a moment</p>
  <p className="success-Loadign-first">Your receipt is loading . . .</p>
</div>
      )}
    </div>
  );
}

export default Success;
