import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import logoLight from "./assets/logoLightHeader.svg";
import style from "./hdr.module.scss"
import searchIcon from "./assets/search.svg"
import plus from "./assets/plus.svg"
import wallet from "./assets/wallet.svg"
import uk from "./assets/uk.svg"
import chinese from "./assets/chinese.svg"
import sun from "./assets/sun.svg"
import moon from "./assets/moon.svg"
import connectWalletIcon from "./assets/connectWalletIcon.png"
import okxIcon from "./assets/okxIcon.png"
import coinbaseIcon from "./assets/coinbaseIcon.png"
import metamaskIcon from "./assets/metamaskIcon.png"
import mintIcon from "./assets/mintIcon.svg"


import walletLoaderCnt from "./assets/walletLoader.png"
import walletLoader from "./assets/loaderCircle.png"
import walletTick from "./assets/walletTick.png"
import { DropdownMenu, DropdownToggle, Input, InputGroup, UncontrolledDropdown, Modal } from "reactstrap";

import ethIcon from '../../assets/images/header/ethCoin.png';
import ethIconLight from './assets/ethIcon_light.svg';
import bnbIcon from '../../assets/images/header/bnbCoin.png';
import bnbIconLight from './assets/bnbIcon_light.svg';
import shopcard from '../../assets/images/header/shoppingCart.png';
import profileImg from '../../assets/images/header/userProfileImg.png';

import profileDDImg1 from '../../assets/images/header/profileDDImg1.svg';
import profileDDImg2 from '../../assets/images/header/profileDDImg2.svg';
import profileDDImg3 from '../../assets/images/header/profileDDImg3.svg';
import profileDDImg4 from '../../assets/images/header/profileDDImg4.svg';
import profileDDImg5 from '../../assets/images/header/profileDDImg5.svg';
import deGods from '../../assets/images/itemIcons/deGods.png';
import aiPfpClub from '../../assets/images/itemIcons/aiPfpClub.png';
import asuki from '../../assets/images/itemIcons/asuki.png';
import asuki1 from '../../assets/images/itemIcons/asuki1.png';
import frens from '../../assets/images/itemIcons/frens.png';
import ownerImg1 from '../../assets/images/collection/ownerImg1.png';
import ownerImg2 from '../../assets/images/collection/ownerImg2.png';
import ownerImg3 from '../../assets/images/collection/ownerImg3.png';
import ownerImg4 from '../../assets/images/collection/ownerImg4.png';
import yellowTick from '../../assets/images/collection/yellow-tick_20px.svg';
import ItemimgSm1 from '../../assets/images/collection/Itemimg-sm1.png';
import ItemimgSm2 from '../../assets/images/collection/Itemimg-sm2.png';
import ItemimgSm3 from '../../assets/images/collection/Itemimg-sm3.png';
import ItemimgSm4 from '../../assets/images/collection/Itemimg-sm4.png';

import { useEffect, useState } from "react";
import Web3 from 'web3';
import AddCart from "../cart/addCart";

const Header = (props) => {

   const [web3, setWeb3] = useState(null);
   const [accounts, setAccounts] = useState([]);


   const [mbMenu, setMbMenu] = useState(false);
   const [themeClr, setThemeClr] = useState(false);

   const menuToggle = () => {
      setMbMenu(!mbMenu);
   }
   const [scroll, setScroll] = useState(false);


   const themeChangeClick = () => {
      setThemeClr(!themeClr);
   }

   const [modal, setModal] = useState(false);


   const [modalCart, setModalCart] = useState(false);

   useEffect(() => {
      const web3FromStorage = localStorage.getItem('web3');
      const accountsFromStorage = localStorage.getItem('accounts');

      if (web3FromStorage && accountsFromStorage) {
         // If wallet information is present in local storage, set the state
         setWeb3(true);
         setAccounts(JSON.parse(accountsFromStorage));
      }

      document.body.classList.toggle('light-mode', themeClr);
      window.addEventListener('scroll', () => {
         setScroll(window.scrollY > 50);
      });
   }, [themeClr]);

   //  useEffect(() => {
   //    const initWeb3 = async () => {
   //       // Check if MetaMask is installed
   //       if (window.ethereum) {
   //         try {
   //           // Request account access
   //           const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

   //           // Create a new instance of Web3
   //           const newWeb3 = new Web3(window.ethereum);
   //           setWeb3(newWeb3);

   //           // Get the list of accounts
   //           setAccounts(accounts);

   //           // Save wallet information to local storage
   //           localStorage.setItem('web3', true);
   //           localStorage.setItem('accounts', JSON.stringify(accounts));
   //         } catch (error) {
   //           console.error('Error connecting to MetaMask:', error);
   //         }
   //       } else {
   //         console.error('MetaMask not detected!');
   //       }
   //     };

   //    initWeb3();
   //  }, []); // Run once when the component mounts

   const toggle = () => setModal(!modal);

   const connectWallet = async () => {
      try {

         if(!window.ethereum) return alert('Please install metamask extention.')         
         // Request account access
         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

         // Update the list of accounts
         setAccounts(accounts);

         // Save wallet information to local storage
         localStorage.setItem('web3', true);
         localStorage.setItem('accounts', JSON.stringify(accounts));

         setWeb3(true);
         await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: "0x13881",
              },
            ],
          });

         // toggle(); // Close the modal after connecting
      } catch (error) {
         console.error('Error connecting to MetaMask:', error.message);
      }
   };

   const disconnectWallet = () => {
      // Remove wallet information from local storage
      localStorage.removeItem('web3');
      localStorage.removeItem('accounts');

      // Clear the state
      setWeb3(false);
      setAccounts([]);

      // Optionally, close the modal or perform any other cleanup
      // toggle();
   };




   return (
      <>
         <header className={`${scroll ? 'headerWhite' : ''} ${style.hdr}`}>
            <div className="container">
               <div className={`row align-items-center ${style.hdrR}`}>
                  <div className="col-auto">
                     <Link to="/" className={style.logo}>
                        <img className={`${themeClr ? 'd-none' : ''}`} src={logo} alt="logo" width={120} />
                        <img className={`${themeClr ? '' : 'd-none'}`} src={logoLight} alt="logo" width={120} />
                     </Link>
                  </div>
                  <div className="col">

                     <div className={`${style.hdrRt} ${mbMenu ? style.show : ""}`}>
                        <div className="row align-items-center">
                           <div className={`col-lg ${style.srhCol}`}>
                              <InputGroup className={style.hdrSrh}>
                                 <button className="btn" type="button">
                                    <img src={searchIcon} alt="search" />
                                 </button>
                                 <Input type="search" placeholder="Search items, collections and accounts..." />
                              </InputGroup>
                              {/* <div className={style.filterSubmenu}>
                                 <span className={style.heading}>Recent</span>
                                 <div className={style.filterRow}>
                                    <img src={deGods} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>DeGods <img src={yellowTick} className="ml-1" /></h3>
                                       <p>100,000 items</p>
                                    </div>
                                    <p className="ml-auto">6.942 ETH</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={aiPfpClub} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Azuki <img src={yellowTick} className="ml-1" /></h3>
                                       <p>100,000 items</p>
                                    </div>
                                    <p className="ml-auto">6.942 ETH</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={asuki} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Azuki Elemental</h3>
                                       <p>100,000 items</p>
                                    </div>
                                    <p className="ml-auto">6.942 ETH</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={asuki1} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Azuka <img src={yellowTick} className="ml-1" /></h3>
                                       <p>100,000 items</p>
                                    </div>
                                    <p className="ml-auto">6.942 ETH</p>
                                 </div>
                                 <hr className="w-100" />

                                 <span className={style.heading}>Accounts</span>
                                 <div className={style.filterRow}>
                                    <img src={ownerImg1} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Mike</h3>
                                    </div>
                                    <p className="ml-auto">712 Items</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={ownerImg2} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>William</h3>
                                    </div>
                                    <p className="ml-auto">712 Items</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={ownerImg3} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Any</h3>
                                    </div>
                                    <p className="ml-auto">712 Items</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={ownerImg4} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Kate</h3>
                                    </div>
                                    <p className="ml-auto">712 Items</p>
                                 </div>
                                 
                                 <hr className="w-100" />
                                 <span className={style.heading}>Items</span>
                                 <div className={style.filterRow}>
                                    <img src={ItemimgSm1} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Lazur</h3>
                                       <p>DeGods</p>
                                    </div>
                                    <p className="ml-auto">Rarity 15</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={ItemimgSm2} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Lazur</h3>
                                       <p>DeGods</p>
                                    </div>
                                    <p className="ml-auto">Rarity 15</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={ItemimgSm3} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Lazur</h3>
                                       <p>DeGods</p>
                                    </div>
                                    <p className="ml-auto">Rarity 15</p>
                                 </div>
                                 <div className={style.filterRow}>
                                    <img src={ItemimgSm4} className={style.logo} />
                                    <div className="d-flex flex-column">
                                       <h3>Azuki</h3>
                                       <p>DeGods</p>
                                    </div>
                                    <p className="ml-auto">Rarity 15</p>
                                 </div>
                              </div> */}
                           </div>
                           <div className="col-xl-auto mx-auto">
                              <div className={style.hdrMenu}>
                                 <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                       Stats
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                       <div className={style.menuLs}>
                                          <Link to="/">
                                             Ranking
                                          </Link>
                                          <Link to="/">
                                             Activity
                                          </Link>
                                       </div>
                                    </DropdownMenu>
                                 </UncontrolledDropdown>

                                 <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                       Explore
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                       <div className={style.menuLs}>
                                          <Link to="/">
                                             All NFTs
                                          </Link>
                                          <Link to="/">
                                             Art
                                          </Link>
                                          <Link to="/">
                                             Collectibles
                                          </Link>
                                          <Link to="/">
                                             Music
                                          </Link>
                                          <Link to="/">
                                             Photography
                                          </Link>
                                          <Link to="/">
                                             Sports
                                          </Link>
                                       </div>
                                    </DropdownMenu>
                                 </UncontrolledDropdown>

                                 <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                       Bridge
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                       <div className={style.menuLs}>
                                          <Link to="/">
                                             History
                                          </Link>
                                       </div>
                                    </DropdownMenu>
                                 </UncontrolledDropdown>
                              </div>
                           </div>
                           <div className="col-lg-auto">
                              <div className={style.hdrRtInr}>
                                 <Link to="/" className={style.hdrMnt}>
                                    <img src={mintIcon} alt="mintIcon" width={20} height={20} />
                                    <span>Mint</span>
                                 </Link>

                                 {
                                    web3 ?
                                       <button
                                          className={`btn ${style.btnCntWal}`}
                                          type="button"
                                          onClick={disconnectWallet}  // Toggle modal for connection, disconnect if already connected
                                       >
                                          <img src={connectWalletIcon} alt="wallet" width={20} height={20} />
                                          <span>{'Disconnect'}</span>
                                       </button>
                                       :
                                       <button
                                          className={`btn ${style.btnCntWal}`}
                                          type="button"
                                          onClick={toggle}  // Toggle modal for connection, disconnect if already connected
                                       >
                                          <img src={connectWalletIcon} alt="wallet" width={20} height={20} />
                                          <span>{'Connect Wallet'}</span>
                                       </button>


                                 }


                                 <div className="d-none d-inline-block">
                                    <div className={`d-inline-block ${style.balanceShow}`}>
                                       <div className="dflex">
                                          <span>0.00
                                             <img className={`pl-2 ${themeClr ? 'd-none' : ''}`} src={ethIcon} alt="ethIcon" />
                                             <img className={`pl-2 ${themeClr ? '' : 'd-none'}`} src={ethIconLight} alt="ethIcon" />
                                          </span>
                                          <span className="verticalborder"></span>
                                          <span>0.00
                                             <img className={`pl-2 ${themeClr ? 'd-none' : ''}`} src={bnbIcon} alt="bnbIcon" />
                                             <img className={`pl-2 ${themeClr ? '' : 'd-none'}`} src={bnbIconLight} alt="bnbIcon" />
                                          </span>
                                       </div>
                                    </div>
                                    <UncontrolledDropdown className={`d-inline-block mx-3 ${style.lngDd}`}>
                                       <DropdownToggle className={style.profileImg}>
                                          <img src={profileImg} alt="profileImg" width={40} height={40} />
                                       </DropdownToggle>
                                       <DropdownMenu right>
                                          <div className={style.ddHead}>
                                             <img src={profileImg} alt="profileImg" className="mr-2" width={40} height={40} />
                                             <div className="d-flex flex-column">
                                                <h3>Anna Williams <img src={yellowTick} className="ml-1" /></h3>
                                                <p className="text-success">Wallet Connect</p>
                                             </div>
                                          </div>
                                          <div className={style.lngMenuLs}>
                                             <Link to="/">
                                                <img src={profileDDImg1} alt="profileDDImg1" />
                                                <span>Profile</span>
                                             </Link>
                                             <Link to="/">
                                                <img src={profileDDImg2} alt="profileDDImg2" />
                                                <span>Watchlist</span>
                                             </Link>
                                             <Link to="/">
                                                <img src={profileDDImg3} alt="profileDDImg3" />
                                                <span>My Collections</span>
                                             </Link>
                                             <Link to="/">
                                                <img src={profileDDImg4} alt="profileDDImg4" />
                                                <span>Settings</span>
                                             </Link>
                                             <Link to="/">
                                                <img src={profileDDImg5} alt="profileDDImg5" />
                                                <span>Logout</span>
                                             </Link>

                                          </div>
                                       </DropdownMenu>
                                    </UncontrolledDropdown>

                                    <button className={`btn ${style.shcardnoti}`} type="button" onClick={() => setModalCart(true)} >
                                       <img src={shopcard} alt="shopcard" width={19} height={16} />
                                       <span className="badgecount">1</span>
                                    </button>
                                 </div>

                                 <UncontrolledDropdown className={style.lngDd}>
                                    <DropdownToggle caret>
                                       <img src={uk} alt="united kingdom" width={16} height={16} />
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                       <div className={style.lngMenuLs}>
                                          <Link to="/">
                                             <img src={uk} alt="united kingdom" className={style.flagIcon} width={16} height={16} />
                                             <span>English</span>
                                          </Link>
                                          <Link to="/">
                                             <img src={chinese} alt="Chinese (Traditional)" className={style.flagIcon} width={16} height={16} />
                                             <span>Chinese (Traditional)</span>
                                          </Link>
                                          <Link to="/">
                                             <img src={chinese} alt="Chinese (Simplified)" className={style.flagIcon} width={16} height={16} />
                                             <span>Chinese (Simplified)</span>
                                          </Link>
                                       </div>
                                    </DropdownMenu>
                                 </UncontrolledDropdown>

                                 {/* <button className={`btn ${style.thTg}`} type="button" onClick={themeChangeClick}>
                                    {!themeClr? <img src={sun} alt="sun" width={20} height={20} /> : <img src={moon} alt="moon" width={20} height={20} />}
                                 </button> */}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className={`d-xl-none ${style.hdrRtTg}`}>
                        <div className={`${style.smClose} ${mbMenu ? style.active : ""}`} onClick={menuToggle}>
                           <svg id={style.closeicon} viewBox="0 0 800 600">
                              <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id={style.top}></path>
                              <path d="M300,320 L460,320" id={style.middle}></path>
                              <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id={style.bottom} transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
                           </svg>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>

         <Modal isOpen={modal} toggle={toggle} centered="true" className="curMdl lgMdl" backdropClassName="selCurBp">
            <div className="selCrHd">
               <button className="btn">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M7.46875 6L10.8438 9.375C11.0312 9.5625 11.0312 9.90625 10.8438 10.0938L10.0625 10.875C9.875 11.0625 9.53125 11.0625 9.34375 10.875L6 7.5L2.625 10.875C2.4375 11.0625 2.09375 11.0625 1.90625 10.875L1.125 10.0938C0.9375 9.90625 0.9375 9.5625 1.125 9.375L4.5 6L1.125 2.65625C0.9375 2.46875 0.9375 2.125 1.125 1.9375L1.90625 1.15625C2.09375 0.96875 2.4375 0.96875 2.625 1.15625L6 4.53125L9.34375 1.15625C9.53125 0.96875 9.875 0.96875 10.0625 1.15625L10.8438 1.9375C11.0312 2.125 11.0312 2.46875 10.8438 2.65625L7.46875 6Z" fill="#595F6A" />
                  </svg>
               </button>
               <img src={connectWalletIcon} />
               <button className="btn" onClick={toggle}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M7.46875 6L10.8438 9.375C11.0312 9.5625 11.0312 9.90625 10.8438 10.0938L10.0625 10.875C9.875 11.0625 9.53125 11.0625 9.34375 10.875L6 7.5L2.625 10.875C2.4375 11.0625 2.09375 11.0625 1.90625 10.875L1.125 10.0938C0.9375 9.90625 0.9375 9.5625 1.125 9.375L4.5 6L1.125 2.65625C0.9375 2.46875 0.9375 2.125 1.125 1.9375L1.90625 1.15625C2.09375 0.96875 2.4375 0.96875 2.625 1.15625L6 4.53125L9.34375 1.15625C9.53125 0.96875 9.875 0.96875 10.0625 1.15625L10.8438 1.9375C11.0312 2.125 11.0312 2.46875 10.8438 2.65625L7.46875 6Z" fill="#595F6A" />
                  </svg>
               </button>
            </div>
            <h3 className="walletHeading">Connect Wallet</h3>
            <p className="walletSubHeading">Choose how you want yo connect. There are several wallet providers.</p>
            <div className="d-flex flex-wrap mt-3">
               <div className="walletIconCnt" onClick={connectWallet}>
                  <img src={metamaskIcon} />
                  <h3 className="heading">Meta Mask</h3>
               </div>
               <div className="walletIconCnt">
                  <img src={okxIcon} />
                  <h3 className="heading">OKX</h3>
               </div>
               <div className="walletIconCnt">
                  <img src={coinbaseIcon} />
                  <h3 className="heading">Coinbase</h3>
               </div>
            </div>
            {/* <div className="d-flex justify-content-center align-items-center loaderCont">
               <img src={walletLoaderCnt} />
               <div className="loaderAnimCnt">
                  <img src={walletLoader} className="loaderAnimation" />
               </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
               <img src={walletTick} />
            </div> */}
         </Modal>

         {/* <AddCart openmodalStatus={modalCart}/> */}
         <AddCart modalshow={modalCart} modalclose={() => setModalCart(false)} />
      </>
   );
}
export default Header;
