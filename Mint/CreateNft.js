import React, { useEffect, useState } from 'react';
import alertDanger from '../../assets/images/alertDanger.svg';
import aiPfpClub from '../../assets/images/itemIcons/aiPfpClub.png';
import IconModal from '../../assets/images/IconModal.png';
import walletLoaderCnt from "../../assets/images/walletLoader.png";
import walletLoader from "../../assets/images/loaderCircle.png";
import angleDown from "../../assets/images/angleDown.svg";
import coverImg from '../../assets/images/coverImg.png';
import Pencil from '../../assets/images/Pencil.svg';
import plus from '../../assets/images/plus.svg';
import userImage from '../../assets/images/collection/userImage.png';
import deGods from '../../assets/images/itemIcons/deGods.png';
import tick from '../../assets/images/collection/yellow-tick_20px.svg';
import mintBanner from '../../assets/images/mintBanner.png';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown, Modal } from 'reactstrap';
import classnames from 'classnames';
//import './mint.scss';
import * as Yup from 'yup';
import { toast, ToastContainer} from 'react-toastify';
import { useForm } from 'react-hook-form';
import '../../assets/scss/mycollecion_mint.scss';
import { useCollectionListMutation } from '../../store/Endpoints';
import {useCreateNFTMutation} from '../../store/Endpoints';
import { useTokencreateMutation } from '../../store/Endpoints';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({

  uploadfile: Yup.mixed(),
  nftName: Yup.string()
    .required('User Name is required')
    .min(3, 'Please Enter Valid Name')
    .matches(/[A-Za-z]+/, 'User Name should contain only letters')
    .trim(),
    supply: Yup.string()
    .required('Bio is required'),
    description: Yup.string(),
    link: Yup.string().required('Website is required')
    .matches(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm, 'Entered URL in correct format')
    .trim(),


})


export const ChooseCollection = () => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);



  const [uploadfile, setUploadfile] = useState(null);
  const [nftName, setNftName] = useState('');
  const [supply, setSupply] = useState('');  
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
 
  const [c1, setC1] = useState(null)

  const { register, handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    formState: { errors }, reset } = useForm({
      resolver: yupResolver(validationSchema),
      mode: 'onChange',
    });

    const handleFileChange = (e, setter, tag) => {
      setter(e.target.files[0])
      setValue(tag, e.target.files[0])
  
    }

    const onSubmit = async () => {

       // FIXME: validation on hook form...
    if (!getValues('nftName')) {
      setError('userName', "Please enter user name")
      setError('Bio')
      return
    }

    const formData = new FormData();
    formData.append('address', localStorage.getItem('accounts'));
    formData.append('uploadfile', getValues('uploadfile'));
    formData.append('nftName', getValues('nftName'));
    formData.append('supply', getValues('supply'));
    formData.append('description', getValues('description'));
    formData.append('link', getValues('link'));
  


    for (var p of formData) {
      let name = p[0];
      let value = p[1];

      console.log(name, value)
    }
      try{
      // const NftcreateResponse = await userNftcreate(formData)

      // console.log(NftcreateResponse)
      // if (NftcreateResponse.success) {
      //     toast.success('Profile created', {
      //         position: toast.POSITION.TOP_CENTER
      //     })
          
      // }else
      // toast.error('profile created failed', {
      //     position: toast.POSITION.TOP_CENTER
      // })
  } catch (error) {

      
      console.error('Error updating item:', error);
      
  }


  }

  const [collectionList, { isError, isLoading, isSuccess, data }] = useCollectionListMutation()
  

  const getList = async () => {

    let addr = JSON.parse(localStorage.getItem('accounts'))

    if (!addr) {
      return
    }

    let result = await collectionList({
      address: addr
    }).unwrap();
    console.log('result', result)
  }

  useEffect(() => {
    getList()
  }, [])


  // if(isLoading){
  //   return (
  //     <h1> Loading </h1>
  //   )
  // }

  // const[createNFT,{isError, isLoading, isSuccess,data}] = useCreateNFTMutation()
  
  return (
    <>
      <div className="row">
        <div className="col-lg-2 mb-3">
          <button className="backIcon"><i className="fas fa-angle-left"></i></button>
        </div>
        <div className="col-lg-3 mb-3">
          <h3 className="collectionSecHeading text-left">Create Item</h3>
          <h3 className="collectionSecSubHeading text-left">Once your NFT minted, you will no longer able to edit it.</h3>
        </div>
        <div className="col-lg-6">
          <div className="createCollectionCard mb-3">
            <form>
              <div className="walletCnt mb-3">
                <h3>92fwr424...0394</h3>
                <span className="walletLabel successLabel ml-auto">Wallet Connected</span>
              </div>
              <hr />
              <div className="form-row">
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="formLabel mr-2">Collection</span>
                    <UncontrolledDropdown className="ml-auto collectionDD">
                      <DropdownToggle caret className="d-flex align-items-center">
                        Select Collection
                        <img src={angleDown} className="ml-auto" />
                      </DropdownToggle>
                      <DropdownMenu>

                        <DropdownItem tag="a">
                          <div className="d-flex align-items-center createCollectionrow">
                            <div className="addIconCnt mr-2"><img src={plus} className="plusIcon" /></div>
                            Create Collection
                          </div>
                        </DropdownItem>

                        {
                          data?.data?.map(({collectionName , collectionUrl , _id}) => (
                            <>
                              <DropdownItem tag="a"  key={_id}>
                                <div className="d-flex align-items-center">
                                  <img src={userImage} className="mr-2" height="40" />
                                  <div className="d-flex flex-column">
                                    <h3>{collectionName} <img src={tick} className="ml-1" /></h3>
                                    <p>CODE-248298</p>
                                  </div>
                                </div>
                              </DropdownItem>
                            </>
                          ))
                        }

                        <DropdownItem tag="a">
                          <div className="d-flex align-items-center">
                            <img src={deGods} className="mr-2" height="40" />
                            <div className="d-flex flex-column">
                              <h3>De Gods</h3>
                              <p>CODE-248298</p>
                            </div>
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <hr />
                </div>
                <div className="col-12 mb-4">
                  <span className="formLabel">Upload File</span>
                  <div className="coverCnt d-flex flex-column">
                    <img className="coverImg" src={mintBanner} />
                    <div className="justify-content-center align-items-center editIcon">
                      <div className="editUplCnt">
                        <label for="editUplCnt"><img src={Pencil} /></label>
                        <input type="file" id="editUplCnt" />
                      </div>
                    </div>
                    {/* <div className="d-flex flex-column align-items-center">
                        <p>PNG, GIF, WEBP, MP4 or MP3.</p>
                        <p className="fs-12 greyTxt">Max 100mb. At least 1400*360 pixels.</p>
                        <div className="chooseFileBtn mt-2">
                          <input type="file" id="chooseBtn" />
                          <label for="chooseBtn">Choose File</label>
                        </div>
                      </div> */}
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="formLabel">Name</span>
                    {/* <label className="text-danger errLabel ml-auto">This collection name already exist</label> */}
                  </div>
                  <input type="text" placeholder="Name your NFT" className="form-control" />
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="formLabel">Supply</span>
                  </div>
                  <input type="text" placeholder="Supply" className="form-control" />
                </div>

                <div className="col-12 mb-3">
                  <span className="formLabel">Description (Optional)</span>
                  <textarea className="form-control" placeholder="Enter Description"></textarea>
                  <hr />
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="formLabel">External Link</span>
                  </div>
                  <input type="text" placeholder="Enter Link Here" className="form-control" />
                  <hr />
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="formLabel">Traits</span>
                  </div>
                  <div className="d-flex urlFieldCnt traitsCnt mb-2">
                    <div class="input-group mb-2">
                      <input type="text" class="form-control" value="Air" />
                      <div class="input-group-append">
                        <div class="input-group-text">Aura</div>
                      </div>
                    </div>
                    <div className="socilaMediaIconCnt ml-2"><img src={Pencil} /></div>
                    <div className="socilaMediaIconCnt ml-2">-</div>
                  </div>
                  <div className="d-flex urlFieldCnt traitsCnt mb-3">
                    <div class="input-group mb-2">
                      <input type="text" class="form-control" value="Tree" />
                      <div class="input-group-append">
                        <div class="input-group-text">Item</div>
                      </div>
                    </div>
                    <div className="socilaMediaIconCnt ml-2"><img src={Pencil} /></div>
                    <div className="socilaMediaIconCnt ml-2">-</div>
                  </div>
                  <div className="d-flex align-items-center cursor" onClick={toggle1}>
                    <div className="addIconCnt mr-2"><img src={plus} /></div>
                    <a href="">Add Trait</a>
                  </div>
                  <hr />
                </div>
                <div className="col-12 mb-3">
                  <div className="freezeCnt">
                    <div>
                      <span className="formLabel">Freeze Metadata</span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                    </div>
                    <div className="ml-auto">
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 mb-3">
                    <div className="alert alert-danger">
                      <img src={alertDanger} className="mr-2" />Please, fill the missing fields.
                    </div>
                  </div> */}

                <div className="col-12 mb-3">
                  <button type="button" className="btn btn-block gradientBtn" onClick={toggle}>Create Item</button>
                </div>
              </div>
            </form>
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
          <h3 className="walletHeading my-3">Item Minted Successfully</h3>
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

      <Modal isOpen={modal1} toggle={toggle1} centered="true" className="curMdl createScsMdl" backdropClassName="selCurBp">
        <div className="createContent">
          <button className="btn closeBtn" onClick={toggle1}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.46875 6L10.8438 9.375C11.0312 9.5625 11.0312 9.90625 10.8438 10.0938L10.0625 10.875C9.875 11.0625 9.53125 11.0625 9.34375 10.875L6 7.5L2.625 10.875C2.4375 11.0625 2.09375 11.0625 1.90625 10.875L1.125 10.0938C0.9375 9.90625 0.9375 9.5625 1.125 9.375L4.5 6L1.125 2.65625C0.9375 2.46875 0.9375 2.125 1.125 1.9375L1.90625 1.15625C2.09375 0.96875 2.4375 0.96875 2.625 1.15625L6 4.53125L9.34375 1.15625C9.53125 0.96875 9.875 0.96875 10.0625 1.15625L10.8438 1.9375C11.0312 2.125 11.0312 2.46875 10.8438 2.65625L7.46875 6Z" fill="#595F6A" />
            </svg>
          </button>
          <div className="d-flex justify-content-center">
            <img src={aiPfpClub} />
          </div>
          <h3 className="walletHeading my-3">Add Trait</h3>
          <form>
            <div className="row">
              <div className="col-12 mb-3">
                <div className="d-flex align-items-center flex-wrap">
                  <span className="formLabel mb-2">Type</span>
                </div>
                <input type="text" placeholder="Enter Type" className="form-control" />
              </div>
              <div className="col-12 mb-3">
                <div className="d-flex align-items-center flex-wrap">
                  <span className="formLabel mb-2">Name</span>
                </div>
                <input type="text" placeholder="Enter Name" className="form-control" />
              </div>
            </div>
          </form>
          <button type="button" className="btn btn-block gradientBtn">Add Trait</button>
        </div>
      </Modal>

    </>
  );
};

export default ChooseCollection;