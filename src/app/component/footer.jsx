import Image from 'next/image';
import React from 'react';
import "./footer.component.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="contain">
        <div className="col">
          <h1>Company</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Products</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Accounts</h1>
          <ul>
            <li>About</li>
            <li>Mission</li>
            <li>Services</li>
            <li>Social</li>
            <li>Get in touch</li>
          </ul>
        </div>
        <div className="col">
          <h1>Resources</h1>
          <ul>
            <li>Webmail</li>
            <li>Redeem code</li>
            <li>WHOIS lookup</li>
            <li>Site map</li>
            <li>Web templates</li>
            <li>Email templates</li>
          </ul>
        </div>
        <div className="col">
          <h1>Support</h1>
          <ul>
            <li>Contact us</li>
            <li>Web chat</li>
            <li>Open ticket</li>
          </ul>
        </div>
        <div className="col social">
          <h1>Social</h1>
          <ul>
            <li>
              <Image src="https://svgshare.com/i/5fq.svg" width="32" height="32" alt="social icon" />
            </li>
            <li>
              <Image src="https://svgshare.com/i/5eA.svg" width="32" height="32" alt="social icon" />
            </li>
            <li>
              <Image src="https://svgshare.com/i/5f_.svg" width="32" height="32" alt="social icon" />
            </li>
          </ul>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  );
};

export default Footer;
