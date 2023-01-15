import React from 'react';
import { SHOP_NAME } from '../../utils/constants';

const Footer = () => (
  <footer className="pt-5">
    {/* <div className="custom-container mb-5 pb-5 pt-5">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4">
          <p className="font-family-secondary font-size-display1 mb-4">
            Follow us
          </p>
          <div className="d-flex font-color-medium mb-5 pb-3 pb-md-0 mb-md-0">
            <div className="pr-5">
              <a
                href="https://twitter.com/styonr"
                className="mb-3 d-block font-color-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com/styonr/"
                className="d-block font-color-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <p className="font-family-secondary font-size-display1 mb-3">
            Newsletter
          </p>
          <div className="position-relative">
            <input
              className="borderbottom border-color-gray400 h-48 w-100 px-3"
              placeholder="email address"
            />
            <button className="bg-transparent position-absolute right-0 top-50 translateY--50 pr-2 h-48">
              <img src="/icon/arrow-long-right.svg" className="w-24" alt="Arrow icon"/>
            </button>
          </div>
        </div>
      </div>
    </div> */}
    <div className="pt-md-5">
      <div className="bg-transparent">
        <div className="custom-container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="py-4">
            <a
              href="https://commercejs.com/"
              className="text-primary-500 text-base font-bold text-uppercase text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              &copy; {new Date().getFullYear()} {SHOP_NAME}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
