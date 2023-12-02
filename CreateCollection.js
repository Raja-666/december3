import React, { useState } from 'react';
import alertDanger from '../../assets/images/alertDanger.svg';
import aiPfpClub from '../../assets/images/itemIcons/aiPfpClub.png';
import IconModal from '../../assets/images/IconModal.png';
import walletLoaderCnt from "../../assets/images/walletLoader.png";
import walletLoader from "../../assets/images/loaderCircle.png";
import angleDown from "../../assets/images/angleDown.svg";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown, Modal, UncontrolledCollapse } from 'reactstrap';
import classnames from 'classnames';
import MyCollectionData from './MyCollectionData';
//import './myCollection.scss';
import '../../assets/scss/mycollecion_mint.scss';
import { useNftCreateMutation } from "../../store/Endpoints";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CreateCollection = () => {

  const [modal, setModal] = useState(false);
  const [logo, setLogo] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [description, setDescription] = useState('');
  const [collectionUrl, setCollectionUrl] = useState('');

  const toggle = () => setModal(!modal);

  const handleFileChange = (event) => {
    setLogo(event.target.files[0]);
  };

  console.log('filesfilesfiles', logo)

  const handleCreateCollectionOld = async function onSubmit(data) {
  }
  const [nftCreate , {isError,isLoading,isSuccess}] = useNftCreateMutation()
  const handleCreateCollection = async function onSubmit(data) {
    try {

      if (!logo || !collectionName || !collectionUrl) {
        toast.error('Please fill in all the required fields.');
        return;
      }

      // const imageFile = data.logo[0];

      // console.log('imageFile', imageFile)
      // Prepare form data
      const formData = new FormData();
      formData.append('logo', logo);
      formData.append('collectionName',collectionName);
      formData.append('description',description);
      formData.append('collectionUrl',collectionUrl);
      formData.append('address',JSON.parse(localStorage.getItem('accounts')));

      for(const val of formData.values()){
        console.log('Values-',val)
      }

      // Make API request to the backend
      // const response = await axios.post('http://localhost:5000/createCollection', formData);

      //     // Handle success
      //     toggle(); // Show success modal
      //   } catch (error) {
      //     // Handle error
      //   }
      // };
      // console.log(formData);
      let result = await nftCreate(formData).unwrap();
      console.log('result', result)

      if (result.success) {
        setModal(true);
        setCollectionName('');
        setCollectionUrl('');
        setDescription('');
        setLogo();
        toast.success('Collection created successfully!');
      } else {
        if (result.message) {
          toast.error(result.message);
        } else {
          toast.error('Something went wrong.');
        }

        // Handle specific error for duplicate image
        if (result.message.includes("Duplicate Image")) {
          setLogo(null); // Clear the selected image
        }
      }
    } catch (error) {
      console.error('Error adding Nft:', error);
      toast.error('Same CollectionName already Exist:', error);
    }
  };


  return (
    <>
      <div className="row">
        <div className="col-lg-2 mb-3">
          <button className="backIcon"><i className="fas fa-angle-left"></i></button>
        </div>
        <div className="col-lg-3 mb-3">
          <h3 className="collectionSecHeading text-left">Create Blockchain</h3>
        </div>
        <div className="col-lg-6">
          <div className="createCollectionCard mb-3">
            <form>
              <div className="walletCnt mb-3">
                <h3>92fwr424...0394</h3>
                <span className="walletLabel successLabel ml-auto">Wallet Connected</span>
              </div>
              <div className="form-row">
                <div className="col-12 mb-4">
                  <span className="formLabel">Logo Image</span>
                  <div className="d-flex align-items-center flex-wrap">
                    <div className="imgCnt mr-4">
                      <img className="logoImg" src={logo ? URL.createObjectURL(logo) : ''} alt="Logo Preview" />
                    </div>
                    <div className="d-flex flex-column">
                      <p>PNG, GIF, JPEG.</p>
                      <p className="fs-12 greyTxt">Max 100mb. At least 300*300 pixels.</p>
                      <div className="chooseFileBtn mt-2">
                        <input type="file" name="logo" id="chooseBtn" onChange={handleFileChange} />
                        <label htmlFor="chooseBtn">Choose File</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="formLabel">Collection Name</span>
                    {/* <label className="text-danger errLabel ml-auto">This collection name already exist</label> */}
                  </div>
                  <input type="text" value={collectionName} placeholder="Name your collection" className="form-control" onChange={(e) => setCollectionName(e.target.value) } />
                </div>

                <div className="col-12 mb-3">
                  <span className="formLabel">Description (Optional)</span>
                  <textarea className="form-control" value={description} placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>

                <div className="col-12 mb-3 urlFieldCnt">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="formLabel">Collection URL</span>
                    {/* <label className="text-danger errLabel ml-auto">This URL already exists</label> */}
                  </div>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">wornft.com/</div>
                    </div>
                    <input type="text" value={collectionUrl} class="form-control" placeholder="Enter URL" onChange={(e) => setCollectionUrl(e.target.value)} />
                  </div>
                </div>
                {/* <div className="col-12 mb-3">
                    <div className="alert alert-danger">
                      <img src={alertDanger} className="mr-2" />Please, fill the missing fields.
                    </div>
                  </div> */}

                <div className="col-12 mb-3">
                  <button type="button" className="btn btn-block gradientBtn" onClick={handleCreateCollection}>
                    Create Collection
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="collapseCnt px-0">
            <div className="collapseHead d-flex align-items-center" id="collapse">
              <h3 className="collapseHeading">Advanced Settings</h3>
              <img src={angleDown} className="ml-auto collapseArrow" />
            </div>
            <UncontrolledCollapse toggler="#collapse" className="collapseBody">
              <p className="fs-16 mb-1">Customize your contract type</p>
              <p className="fs-14"><a href="#">Learn more</a> about each contract type.</p>
              <div className="collapseCard">
                <h3>Proxy contract</h3>
                <p>Recommended for most creators. This type of contract is cheaper to deploy but will require that wallets who mint, transfer, and sell items from this collection pay additional gas fees.</p>
                <p>Estimated cost to deploy contract: $3.37</p>
              </div>
              <div className="collapseCard">
                <h3>Standard contract</h3>
                <p>Recommended for advanced creators. This type of contract is more expensive to deploy but minting, transfers, and sale interactions will require less extra gas fees.</p>
                <p>Estimated cost to deploy contract: $42.1</p>
              </div>
            </UncontrolledCollapse>
          </div>
        </div>
      </div>


      <Modal isOpen={modal} toggle={toggle} centered="true" className="curMdl createScsMdl" backdropClassName="selCurBp">
        <div className="createContent">
          <button className="btn closeBtn" onClick={toggle}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.46875 6L10.8438 9.375C11.0312 9.5625 11.0312 9.90625 10.8438 10.0938L10.0625 10.875C9.875 11.0625 9.53125 11.0625 9.34375 10.875L6 7.5L2.625 10.875C2.4375 11.0625 2.09375 11.0625 1.90625 10.875L1.125 10.0938C0.9375 9.90625 0.9375 9.5625 1.125 9.375L4.5 6L1.125 2.65625C0.9375 2.46875 0.9375 2.125 1.125 1.9375L1.90625 1.15625C2.09375 0.96875 2.4375 0.96875 2.625 1.15625L6 4.53125L9.34375 1.15625C9.53125 0.96875 9.875 0.96875 10.0625 1.15625L10.8438 1.9375C11.0312 2.125 11.0312 2.46875 10.8438 2.65625L7.46875 6Z" fill="#595F6A" />
            </svg>
          </button>
          <div className="d-flex justify-content-center">
            <img src={aiPfpClub} />
          </div>
          <h3 className="walletHeading my-3">Collection Created <br />Successfully</h3>
          <button type="button" className="btn btn-block gradientBtn">View Collection</button>
        </div>
        {/* <div className="createContent">
              <button className="btn closeBtn" onClick={toggle}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.46875 6L10.8438 9.375C11.0312 9.5625 11.0312 9.90625 10.8438 10.0938L10.0625 10.875C9.875 11.0625 9.53125 11.0625 9.34375 10.875L6 7.5L2.625 10.875C2.4375 11.0625 2.09375 11.0625 1.90625 10.875L1.125 10.0938C0.9375 9.90625 0.9375 9.5625 1.125 9.375L4.5 6L1.125 2.65625C0.9375 2.46875 0.9375 2.125 1.125 1.9375L1.90625 1.15625C2.09375 0.96875 2.4375 0.96875 2.625 1.15625L6 4.53125L9.34375 1.15625C9.53125 0.96875 9.875 0.96875 10.0625 1.15625L10.8438 1.9375C11.0312 2.125 11.0312 2.46875 10.8438 2.65625L7.46875 6Z" fill="#595F6A" />
                </svg>
              </button>
              <div className="d-flex justify-content-center">
                <img src={IconModal} />
              </div>
              <h3 className="walletHeading my-3">Something went wrong</h3>
              <button type="button" className="btn btn-block darkBtn">Okay</button>
            </div> */}

        {/* <div>
              <h3 className="walletHeading my-3">Loading</h3>
              <h3 className="walletSubHeading">To continue send transaction with your wallet.</h3>
              <div className="d-flex justify-content-center align-items-center loaderCont">
                <img src={walletLoaderCnt} />
                <div className="loaderAnimCnt">
                    <img src={walletLoader} className="loaderAnimation" />
                </div>
              </div>
            </div> */}
      </Modal>
    <ToastContainer/>
    </>
  );
};

export default CreateCollection;