import React, { useState } from 'react';
//import style from './myCollection.scss';
import Binance from '../../assets/images/Binance.svg';
import Eth from '../../assets/images/Eth.svg';
import Polygon from '../../assets/images/Polygon.svg';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown } from 'reactstrap';
import classnames from 'classnames';
import MyCollectionData from './MyCollectionData';
//import './myCollection.scss';
import '../../assets/scss/mycollecion_mint.scss';




export const ChooseCollection = () => {

    return (
      <>
        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center justify-content-center chooseBlckCnt">
            <button className="backIcon"><i className="fas fa-angle-left"></i></button>
            <h3 className="collectionSecHeading text-center">Choose Blockchain</h3>
            <p className="collectionSecSubHeading text-center">Choose the most suitable blockchain for your needs.</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-4">
            <div className="chsBlckChnCnt">
              <div className="d-flex flex-column justify-content-center align-items-center content">
                <img src={Binance} className="mb-2" />
                <h3>Binance</h3>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="chsBlckChnCnt">
              <div className="d-flex flex-column justify-content-center align-items-center content">
                <img src={Eth} className="mb-2" />
                <h3>Ethereum</h3>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="chsBlckChnCnt">
              <div className="d-flex flex-column justify-content-center align-items-center content">
                <img src={Polygon} className="mb-2" />
                <h3>Polygon</h3>
              </div>
            </div>
          </div>
        </div>

      </>
    );
};

export default ChooseCollection;