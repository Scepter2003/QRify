import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import Modal from "react-modal";
import { findByLabelText } from "@testing-library/react";
function Qrcode() {
  const [option, setOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [buttonSize, setButtonSize] = useState(2.5);
  const qrCodeRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [downloadType, setDownloadType] = useState("default");
  const [customWidth, setCustomWidth] = useState(300);

  const handleOptionChange = (tab) => {
    setOption(tab);
    setQrCode("");
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGenerateQrCode = async () => {
    if (option === "link") {
      const isValidUrl = /^https?:\/\//.test(inputValue);
      if (!isValidUrl) {
        alert(
          'Please enter a valid URL starting with "http://" or "https://."'
        );
        return;
      }
    }

    try {
      const qrCodeImage = await QRCode.toDataURL(inputValue);
      setQrCode(qrCodeImage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadQrCode = () => {
    setModalIsOpen(true);
  };

  const handleDownload = () => {
    if (downloadType === "default") {
      const link = document.createElement("a");
      link.href = qrCode;
      link.download = "qr-code.png";
      link.click();
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = customWidth;
      canvas.height = customWidth;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = qrCode;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, customWidth, customWidth);
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "custon-qr-code.png";
        link.click();
      };
    }
    setModalIsOpen(false);
  };
  const handleCancelDownload = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      style={{
        alignContent: "center",
        alignItems: "center",
        wordWrap: "break-word",
      }}
    >
      <h1
        style={{
          alignContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "2% 10% 0 10%",
          fontSize: "2em",
          fontFamily: "san-serif",
        }}
      >
        Unlock the Power of QR Codes,{" "}
        <font style={{ color: "#5877d5" }}>Effortlessly!!!</font>
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
          fontFamily: "san-serif",
          fontSize: "1.3em",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            borderBottom: "1px solid #ccc",
          }}
        >
          <li
            style={{
              padding: "6%",
              cursor: "pointer",
              textAlign: "center",
              backgroundColor: option === "text" ? "#94ccc6" : "transparent",
            }}
            onClick={() => handleOptionChange("text")}
          >
            Convert text to QR code
          </li>
          <li
            style={{
              padding: "3%",
              cursor: "pointer",
              textAlign: "center",
              backgroundColor: option === "link" ? "#94ccc6" : "transparent",
            }}
            onClick={() => handleOptionChange("link")}
          >
            Convert link to QR code
          </li>
        </ul>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {option && (
          <div>
            <p
              style={{
                margin: "0",
                padding: "6%",
                textAlign: "center",
                fontFamily: "san-serif",
                fontSize: "1.2em",
              }}
            >
              <br />
              Enter {option === "link" ? "URL" : "Text"}:
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter here..."
              style={{ display: "flex", height: "2em", fontSize: "1em" }}
            />
            <br />
            <button
              onClick={handleGenerateQrCode}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 12% 0 12%",
                height: `${buttonSize}em`,
                width: `${buttonSize + 7}em`,
                fontSize: "1em",
                backgroundColor: "#1976d2",
                boxShadow: "0px 10px 10px -6px rgba(0, 0, 0, 0.5)",
                borderRadius: "5px",
                border: "0",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseDown={() => {
                setButtonSize(buttonSize - 0.2);
              }}
              onMouseUp={() => {
                setButtonSize(buttonSize + 0.2);
              }}
            >
              Generate QR code
            </button>
          </div>
        )}
      </div>
      <div style={{display:"flex", alignItems:"center", justifyItems:"center", justifyContent:"center", width:"100%", marginTop:"2em"}}>
        {qrCode && (
          <div style={{ margin:"auto"}}>
            <img
              src={qrCode}
              alt="QR Code"
              style={{ display:"block", padding:"0 9%", paddingBottom:"8%"}}
            />
            <button
              onClick={handleDownloadQrCode}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "auto",
                height: `${buttonSize}em`,
                width: `${buttonSize + 7}em`,
                fontSize: "1em",
                backgroundColor: "mediumseagreen",
                boxShadow: "0px 10px 10px -6px rgba(0, 0, 0, 0.5)",
                borderRadius: "5px",
                border: "0",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                paddingTop:"1%"
              }}
              onMouseDown={() => {
                setButtonSize(buttonSize - 0.2);
              }}
              onMouseUp={() => {
                setButtonSize(buttonSize + 0.2);
              }}
            >
              Download QR code
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "0",
            border: "none",
            padding: "0px 30px",
            maxWidth: "500px",
            width: "60%",
            height:"fit-content",
            borderRadius:"5px",
            paddingBottom:"15px"
          },
        }}>

    <div className="form-check" style={{margin:"1em 1em 0em 1em", fontSize:"1.1em"}}>
      <div>
      <input
        className="form-check-input"
        type="radio"
        name="downloadType"
        id="defaultDownload"
        value="default"
        checked={downloadType === "default"}
        onChange={() => setDownloadType("default")}
      />
      <label className="form-check-label" htmlFor="defaultDownload" style={{paddingRight:"10%"}}>
        Default (300x300 pixels)
      </label>
      </div>
      <div>
      <input
        className="form-check-input"
        type="radio"
        name="downloadType"
        id="customDownload"
        value="custom"
        checked={downloadType === "custom"}
        onChange={() => setDownloadType("custom")}
      />
      <label className="form-check-label" htmlFor="customDownload">
        Custom ( Enter values in pixels )
      </label>
      </div>
      {downloadType === "custom" && (
        <div style={{display:"flex", alignItems:"center", justifyItems:"center", justifyContent:"center", width:"100%", marginTop:"1em"}}>
          <input
          placeholder="Width"
            type="number"
            id="customWidth"
            name="customWidth"
            min="1"
            max="1000"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            style={{width:"20%", height:"20%", fontSize:"90%", minWidth:"53px", margin:"auto"}}
          />
          <input
          placeholder="Height"
            type="number"
            id="customHeight"
            name="customHeight"
            min="1"
            max="1000"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            style={{width:"20%", height:"20%", fontSize:"90%", minWidth:"53px", margin:"auto"}}
          />
        </div>
      )}
    </div><div style={{display:"flex", alignItems:"center", justifyItems:"center", justifyContent:"center", width:"100%", marginTop:"2em"}}>
      
    <button
      type="button"
      className="btn btn-secondary"
      onClick={handleCancelDownload}
      style={{width:"20%", height:"2em", fontSize:"1em", minWidth:"53px", margin:"auto",backgroundColor: "#1976d2",
      boxShadow: "0px 10px 10px -6px rgba(0, 0, 0, 0.65)",
      borderRadius: "5px",
      border: "0",
      color: "white",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out"}}
    >
      Close
    </button>

    <button type="button" className="btn btn-primary" onClick={handleDownload} style={{width:"35%", height:"2em", backgroundColor:"mediumseagreen",fontSize:"100%", minWidth:"85px", margin:"auto",boxShadow: "0px 10px 10px -6px rgba(0, 0, 0, 0.65)",
      borderRadius: "5px",
      border: "0",
      color: "white",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",}}>
      Download
    </button>
   
    </div>
</Modal>
    </div>
  );
}

export default Qrcode;
