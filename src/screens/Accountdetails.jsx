import React from "react";
import "../styles/accountdetails.css";

const Accountdetails = () => {
  const buttonNames = [
    {
      id: 1,
      backgroundColor: "#FF0000",
      image: "https://login.biznesstag.com/assets/website.png",
      url: "https://example.com/page1",
      title: "Website",
    },
    {
      id: 2,
      backgroundColor: "#fd7e14",
      image: "https://login.biznesstag.com/assets/save%20contact.png",
      url: "https://example.com/page1",
      title: "Add Contact",
    },
    {
      id: 3,
      backgroundColor: "#008037",
      image: "https://login.biznesstag.com/assets/payment.png",
      url: "https://example.com/page1",
      title: "Payment",
    },
    {
      id: 4,
      backgroundColor: "#edce53",
      image: "	https://login.biznesstag.com/assets/offers.png",
      url: "https://example.com/page1",
      title: "Offers",
    },
    {
      id: 5,
      backgroundColor: "#7ED957",
      image: "	https://login.biznesstag.com/assets/whatsapp.png",
      url: "https://example.com/page1",
      title: "Whatsapp",
    },
    {
      id: 6,
      backgroundColor: "#5271FF",
      image: "https://login.biznesstag.com/assets/location.png",
      url: "https://example.com/page1",
      title: "Location",
    },
    {
      id: 7,
      backgroundColor: "#00C2CB",
      image: "	https://login.biznesstag.com/assets/about%20us.png",
      url: "https://example.com/page1",
      title: "About us",
    },
    {
      id: 8,
      backgroundColor: "#004AAD",
      image: "	https://login.biznesstag.com/assets/catlogue%20product.png",
      url: "https://example.com/page1",
      title: "Catalogue",
    },
    {
      id: 9,
      backgroundColor: "#000000",
      image: "https://login.biznesstag.com/assets/more.png",
      url: "https://example.com/page1",
      title: "More",
    },
    {
      id: 10,
      backgroundColor: "#3b5999",
      image: "	https://login.biznesstag.com/assets/facebook.png ",
      url: "https://example.com/page1",
      title: "Facebook",
    },
    {
      id: 11,
      backgroundColor: "#6a3398",
      image: "https://login.biznesstag.com/assets/instagram.png ",
      url: "https://example.com/page1",
      title: "Instagram",
    },
    {
      id: 12,
      backgroundColor: "#0072b1",
      image: "https://login.biznesstag.com/assets/linkdin.png ",
      url: "https://example.com/page1",
      title: "LinkedIn",
    },
    {
      id: 13,
      backgroundColor: "#00c2cb",
      image: "https://login.biznesstag.com/assets/tweeter.png ",
      url: "https://example.com/page1",
      title: "Twitter",
    },
    {
      id: 14,
      backgroundColor: "#fe0000",
      image: "https://login.biznesstag.com/assets/youtube.png ",
      url: "https://example.com/page1",
      title: "Youtube",
    },
    {
      id: 15,
      backgroundColor: "#EDCE53",
      image: "	https://login.biznesstag.com/assets/snapchats.png",
      url: "https://example.com/page1",
      title: "Snapchat",
    },
    {
      id: 16,
      backgroundColor: "#c8222c",
      image: "https://login.biznesstag.com/assets/pinit.png ",
      url: "https://example.com/page1",
      title: "Pinterest",
    },
    {
      id: 17,
      backgroundColor: "#FF914D",
      image: "	https://login.biznesstag.com/assets/uploaddoc.png ",
      url: "https://example.com/page1",
      title: "Document",
    },
    {
      id: 18,
      backgroundColor: "#008037",
      image: "	https://login.biznesstag.com/assets/link_upload.png ",
      url: "https://example.com/page1",
      title: "Link",
    },
  ];

  const btnicones = [
    {
      id: 1,
      icon: "https://login.biznesstag.com/assets/call.png",
      url: "https://example.com/page1",
      title: "Call",
    },
    {
      id: 2,
      icon: "https://login.biznesstag.com/assets/sms.png",
      url: "https://example.com/page1",
      title: "SMS",
    },
    {
      id: 3,
      icon: "https://login.biznesstag.com/assets/email.png",
      url: "https://example.com/page1",
      title: "Mail",
    },
    {
      id: 4,
      icon: "https://login.biznesstag.com/assets/share.png",
      url: "https://example.com/page1",
      title: "Share",
    },
  ];

  return (
    <div className="account-box">
      <div className="userPic">
        <h1>L</h1>
      </div>
      <div className="useNa">
        <h3>kaikotech</h3>
        <p>
          <span className="open">Open </span> 09:30 AM TO 06:00 PM
          <br />
          Information Technology
        </p>
      </div>
      <div className="btnAccountContainer">
        {btnicones.map((i) => (
          <a
            key={i.id}
            href={i.url}
            target="_blank"
            rel="noopener noreferrer"
            className="a-btn"
          >
            <button className="btnAccount">
              <img src={i.icon} alt="icon" className="btnimg" />
            </button>
            <div className="btnTitle">{i.title}</div>
          </a>
        ))}
      </div>
      {/* <div className="buttonmainContainer"> */}
      <div className="buttonsContainer">
        {buttonNames.map((button) => (
          <a
            key={button.id}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="button"
              style={{ backgroundColor: button.backgroundColor }}
            >
              <img src={button.image} className="buttonImage" />
            </button>
            <span className="buttonTitle">{button.title}</span>
          </a>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Accountdetails;
