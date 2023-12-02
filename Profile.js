import React, { useEffect, useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Modal, UncontrolledPopover, PopoverBody, UncontrolledTooltip } from 'reactstrap';
import angleDown from "../../assets/images/angleDown.svg";
import aiPfpClub from '../../assets/images/itemIcons/aiPfpClub.png';
import IconModal from '../../assets/images/IconModal.png';
import walletLoaderCnt from "../../assets/images/walletLoader.png";
import yellowTick from "../../assets/images/collection/yellow-tick_20px.svg";
import copyIcon from '../../assets/images/copyIcon.svg';
import logoImg from '../../assets/images/logoImg.png';
import coverImg from '../../assets/images/coverImg.png';
import Pencil from '../../assets/images/Pencil.svg';
import twitter from '../../assets/images/twitterNew.svg';
import instagram from '../../assets/images/instagram.svg';
import globe from '../../assets/images/globe.svg';
import infoIcon from '../../assets/images/infoIcon.svg';
import facebook from '../../assets/images/facebook.svg';
import twitterNew from '../../assets/images/twitterNew.svg';
import telegram from '../../assets/images/telegram-plane.svg';
import checkIcon from '../../assets/images/toast/checkIcon.svg';
//import '../MyCollection/myCollection.scss';
import '../../assets/scss/mycollecion_mint.scss';
import './Settings.scss';
import * as Yup from 'yup';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetProfileDetailsMutation,  useProfileUpdateMutation } from '../../store/ProfileEndpoint';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = Yup.object().shape({

  profileImg: Yup.mixed(),
  coverImg: Yup.mixed(),
  userName: Yup.string()
    .required('User Name is required')
    .min(3, 'Please Enter Valid Name')
    .matches(/[A-Za-z]+/, 'User Name should contain only letters')
    .trim(),

  Bio: Yup.string()
    .required('Bio is required'),
  userEmail: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid Email address')
    .trim(),
  website: Yup.string().required('Website is required')
    .matches(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm, 'Entered URL in correct format')
    .trim(),


})


export const SettingsProfile = () => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);

  const loggedUserId = localStorage.getItem('accounts')

  const [userProfileUpdate] = useProfileUpdateMutation()
  // const [userProfileDetails] = useGetProfileDetailsMutation()


  const [profileImg, setProfileImg] = useState()
  const [coverImg, setCoverImg] = useState()
  const [userName, setUserName] = useState(null)
  const [Bio, setBio] = useState(null)
  const [useremail, setUseremail] = useState(null)
  const [website, setWebsite] = useState(null)

  const [c1, setC1] = useState(null)
  const [c2, setC2] = useState(null)
  console.log("TCL: SettingsProfile -> ", c1 ? URL.createObjectURL(c1) : "oxbfhdfd")


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



  useEffect(() => {
    if (!getValues('userName')) {
      setError('userName', "Please enter user name")
    }
  }, [getValues('userName')])


  const onSubmit = async () => {


    // FIXME: validation on hook form...
    if (!getValues('userName')) {
      setError('userName', "Please enter user name")
      setError('Bio')
      return
    }

    const formData = new FormData();
    formData.append('address', localStorage.getItem('accounts'));
    formData.append('userName', getValues('userName'));
    formData.append('bio', getValues('Bio'));
    formData.append('userEmail', getValues('userEmail'));
    formData.append('website', getValues('website'));
    formData.append('profileImg', getValues('profileImg'));
    formData.append('coverImg', getValues('coverImg'));


    for (var p of formData) {
      let name = p[0];
      let value = p[1];

      console.log(name, value)
    }
      try{
      const profileUpdateReponse = await userProfileUpdate(formData)

      console.log(profileUpdateReponse)
      if (profileUpdateReponse.success) {
          toast.success('Profile created', {
              position: toast.POSITION.TOP_CENTER
          })
          
      }else
      toast.error('profile created failed', {
          position: toast.POSITION.TOP_CENTER
      })
  } catch (error) {

      
      console.error('Error updating item:', error);
      
  }


  }


  const CheckTick = () => {
    return (
      <>
        <svg className="ml-auto" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.1953 0.46875C10.3125 0.351562 10.5 0.351562 10.5938 0.46875L11.2734 1.125C11.3672 1.24219 11.3672 1.42969 11.2734 1.52344L4.24219 8.55469C4.125 8.67188 3.96094 8.67188 3.84375 8.55469L0.703125 5.4375C0.609375 5.32031 0.609375 5.13281 0.703125 5.03906L1.38281 4.35938C1.47656 4.26562 1.66406 4.26562 1.78125 4.35938L4.03125 6.63281L10.1953 0.46875Z" fill="#55f764" />
        </svg>
      </>
    )
  }



  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <h3 className="settingsHeading mb-0">Profile</h3>
        <button className="btn gradientBtn ml-auto" type='submit' onClick={() => onSubmit()}>Save</button>
      </div>
      <div className="createCollectionCard mb-3">
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <div className="walletCnt d-flex align-items-center flex-wrap mb-3">
            <h3>92fwr424...0394</h3>
            <span className="walletLabel successLabel ml-auto">Wallet Connected</span>
            <a href=""><img src={copyIcon} className="ml-2" /></a>
          </div>
          <div className='form-row'>
            <div className="col-12 mb-3 d-flex align-items-center flex-wrap">
              <div className="imgContainer mr-4">
                <span className="formLabel">Logo Image</span>
                <div className="d-flex align-items-center flex-wrap">
                  <div className="imgCnt">
                    <img className="logoImg" 
                    src={c2 ? URL.createObjectURL(c2) : coverImg}
                    />
                    <div className="justify-content-center align-items-center editIcon">
                      <input
                        type="file"
                        id="profileImg"
                        name="profileImg"
                        style={{ position: "absolute", opacity: "0", width: "100%" }}
                        role="button"
                        onChange={(e) => handleFileChange(e, setC2, 'profileImg')}
                      />
                      <label role="button" htmlFor="kycSelfieImg">
                        <img src={Pencil} alt="Edit Icon" />
                      </label>


                    </div>
                    {/* <div className="d-flex flex-column align-items-center"> */}
                    {/* <p>PNG,GIF,JPEG.</p> */}
                    {/* <p className="fs-12 greyTxt text-center">Max 100mb.</p> */}
                    {/* <div className="chooseFileBtn mt-2"> */}
                    {/* <input type="file" id="chooseBtn" /> */}
                    {/* <label for="chooseBtn">Choose File</label> */}
                    {/* </div> */}
                    {/* </div> */}
                  </div>

                </div>
              </div>

              <div className="coverContainer">
                <span className="formLabel">KYC Selfie with ID Proof</span>
                <div className="coverCnt d-flex flex-column">
                  <img className="coverImg"
                    src={c1 ? URL.createObjectURL(c1) : coverImg}
                    alt="KYC Selfie with ID Proof" />
                  <div className="justify-content-center align-items-center editIcon">
                    <input
                      type="file"
                      id="coverImg"
                      name="coverImg"
                      style={{ position: "absolute", opacity: "0", width: "100%" }}
                      role="button"
                      onChange={(e) => handleFileChange(e, setC1, 'coverImg')}
                    />
                    <label role="button" htmlFor="kycSelfieImg">
                      <img src={Pencil} alt="Edit Icon" />
                    </label>
                  </div>
                </div>
              </div>


              {/* <div className="coverContainer">
                      <span className="formLabel">Cover Image</span>
                      <div className="coverCnt d-flex flex-column">
                        <img className="coverImg" src={coverImg} />
                        <div className="justify-content-center align-items-center editIcon">
                          <a href="#"><img src={Pencil} /></a>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <p>PNG, GIF, WEBP, MP4 or MP3.</p>
                          <p className="fs-12 greyTxt">Max 100mb. At least 1400*360 pixels.</p>
                          <div className="chooseFileBtn mt-2">
                            <input type="file" id="chooseBtn" />
                            <label for="chooseBtn">Choose File</label>
                          </div>
                        </div>
                      </div>
                    </div> */}
            </div>
            <div className="col-12 mb-3">
              <div className="d-flex align-items-center flex-wrap">
                <span className="formLabel">User Name</span>
                <label className="text-danger errLabel ml-auto">{errors.userName?.message}</label>
              </div>
              <Controller
                control={control}
                name='userName'
                render={({ field }) => (
                  <input {...field} type="text" placeholder="Enter Name" className="form-control" />
                )}
              />
            </div>

            <div className="col-12 mb-3">
              <span className="formLabel">Bio</span>
              <label className="text-danger errLabel ml-auto">{errors.Bio?.message}</label>
              <Controller
                control={control}
                name='Bio'
                render={({ field }) => (
                  <textarea {...field} className="form-control" placeholder="Type Bio"></textarea>
                )}
              />
            </div>


            <div className="col-12 mb-3">
              <div className="d-flex align-items-center flex-wrap">
                <span className="formLabel">Email Address</span>
                <label className="text-danger errLabel ml-auto">{errors.userEmail?.message}</label>
              </div>
              <div className="input-group verified">
                <Controller
                  control={control}
                  name='userEmail'
                  render={({ field }) => (
                    <input {...field} type="text" placeholder="Enter Email" className="form-control" />
                  )}
                />
                <div className="input-group-append">
                  {/* <div className="input-group-text"><img src={checkIcon} /></div> */}
                  <div className="input-group-text errLabel" onClick={toggle1}>Verify<i className="fas fa-chevron-right ml-2"></i></div>
                </div>
              </div>
            </div>

          </div>
          <hr className="w-100" />
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center flex-wrap">
                <span className="formLabel">Social Media</span>
              </div>
              <div className="d-flex urlFieldCnt flex-wrap align-items-center mb-2">
                <div className="socilaMediaIconCnt mr-2"><img src={twitter} /></div>
                <span className="formLabel mb-0">Twitter</span>
                {/* <button className="btn ylwOlnBtn ml-auto">Connect</button> */}
                <div className="d-flex align-items-center connectTickCnt ml-auto">
                  <span className="text-success mr-2">Connected</span>
                  <img src={checkIcon} />
                  <div className="socilaMediaIconCnt ml-3" id="disconnect">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.03125 5L10.9062 8.875C11 8.96875 11 9.125 10.9062 9.25L10.2188 9.9375C10.0938 10.0312 9.9375 10.0312 9.84375 9.9375L9.1875 9.28125L6 6.0625L2.125 9.9375C2.03125 10.0312 1.875 10.0312 1.75 9.9375L1.0625 9.25C0.96875 9.125 0.96875 8.96875 1.0625 8.875L4.9375 5L1.0625 1.15625C0.96875 1.0625 0.96875 0.90625 1.0625 0.78125L1.75 0.09375C1.875 0 2.03125 0 2.125 0.09375L6 3.96875L9.84375 0.09375C9.9375 0 10.0938 0 10.2188 0.09375L10.9062 0.78125C11 0.90625 11 1.0625 10.9062 1.15625L10.25 1.8125L7.03125 5Z" fill="white" />
                    </svg>
                  </div>
                  <UncontrolledPopover trigger="legacy" placement="bottom" target="disconnect" className="verifyPopOver">
                    <PopoverBody>
                      <div className="pointer">
                        Disconnect
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>
                </div>
              </div>
              <div className="d-flex urlFieldCnt flex-wrap align-items-center">
                <div className="socilaMediaIconCnt mr-2"><img src={instagram} /></div>
                <span className="formLabel mb-0">Instagram</span>
                <button className="btn ylwOlnBtn ml-auto">Connect</button>
                {/* <div className="d-flex align-items-center connectTickCnt ml-auto">
                        <span className="text-success mr-2">Connected</span>
                        <img src={checkIcon} />
                        <div className="socilaMediaIconCnt ml-3">
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.03125 5L10.9062 8.875C11 8.96875 11 9.125 10.9062 9.25L10.2188 9.9375C10.0938 10.0312 9.9375 10.0312 9.84375 9.9375L9.1875 9.28125L6 6.0625L2.125 9.9375C2.03125 10.0312 1.875 10.0312 1.75 9.9375L1.0625 9.25C0.96875 9.125 0.96875 8.96875 1.0625 8.875L4.9375 5L1.0625 1.15625C0.96875 1.0625 0.96875 0.90625 1.0625 0.78125L1.75 0.09375C1.875 0 2.03125 0 2.125 0.09375L6 3.96875L9.84375 0.09375C9.9375 0 10.0938 0 10.2188 0.09375L10.9062 0.78125C11 0.90625 11 1.0625 10.9062 1.15625L10.25 1.8125L7.03125 5Z" fill="white"/>
                          </svg>
                        </div>
                      </div> */}
              </div>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="d-flex align-items-center flex-wrap">
                <span className="formLabel">Website</span>
                <label className="text-danger errLabel ml-auto">{errors.website?.message}</label>
              </div>
              <div className="d-flex urlFieldCnt">
                <div className="socilaMediaIconCnt mr-2"><img src={globe} /></div>
                <Controller
                  control={control}
                  name='website'
                  render={({ field }) => (
                    <input {...field} type="text" className="form-control" placeholder="Enter URL" />
                  )}
                />
              </div>
              <hr />
            </div>

            <div className="col-12 mb-3">
              <div className="d-flex align-items-center flex-wrap">
                <span className="formLabel mb-0">Verification</span>
                <div className="dark-primary ml-auto">
                  Requirements <img src={infoIcon} id="popoverLegacy" />
                </div>
                <UncontrolledPopover trigger="legacy" placement="bottom" target="popoverLegacy" className="verifyPopOver">
                  <PopoverBody>
                    <div>
                      <label className="custCheck">Proile Image.
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div>
                      <label className="custCheck">User Name.
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div>
                      <label className="custCheck">Verified email.
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div>
                      <label className="custCheck">Connected Twitter account.
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </PopoverBody>
                </UncontrolledPopover>
                {/* <div className="getVerified ml-auto">Get Verified</div> */}
                {/* <div className="d-flex align-items-center ml-auto fs-14">
                      Verified <img src={yellowTick} id="popoverLegacy" />
                    </div> */}
              </div>
            </div>
            <hr className="w-100" />
            <div className="col-12 mb-3">
              <div className="d-flex align-items-center flex-wrap">
                <span className="formLabel mb-0">My Referral</span>
                <div className="dark-primary ml-auto">
                  <img src={infoIcon} id="tooltip1" />
                </div>
                <UncontrolledTooltip placement="top" target="tooltip1" className="tooltipCnt red-tooltip">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim.
                </UncontrolledTooltip>
                {/* <div className="getVerified">Get Verified</div> */}
              </div>
              <p className="greyTxt">Copy and send your unique referral link to refer people to WARRIOR and get the reward!</p>
            </div>
            <div className="col-12 mb-3 urlFieldCnt">
              <div className="input-group mb-2 copyCnt">
                <input type="text" className="form-control" value="warrior.com/referrallink_the56wg" />
                <div className="input-group-append">
                  <div className="input-group-text"><a href=""><img src={copyIcon} /></a></div>
                </div>
              </div>

            </div>
            <div className="col-12 mb-3 d-flex align-items-center flex-wrap">
              <p className="greyTxt">Or share referral link with your network:</p>
              <div className="ml-auto">
                <a href="" className="mx-1 socialicon"><img src={facebook} /></a>
                <a href="" className="mx-1 socialicon"><img src={twitterNew} /></a>
                <a href="" className="mx-1 socialicon"><img src={telegram} /></a>
              </div>
            </div>
          </div>
        </form>
      </div>


      {/* <Modal isOpen={modal} toggle={toggle} centered="true" className="curMdl createScsMdl" backdropClassName="selCurBp">
            <div className="createContent">
              <button className="btn closeBtn" onClick={toggle}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.46875 6L10.8438 9.375C11.0312 9.5625 11.0312 9.90625 10.8438 10.0938L10.0625 10.875C9.875 11.0625 9.53125 11.0625 9.34375 10.875L6 7.5L2.625 10.875C2.4375 11.0625 2.09375 11.0625 1.90625 10.875L1.125 10.0938C0.9375 9.90625 0.9375 9.5625 1.125 9.375L4.5 6L1.125 2.65625C0.9375 2.46875 0.9375 2.125 1.125 1.9375L1.90625 1.15625C2.09375 0.96875 2.4375 0.96875 2.625 1.15625L6 4.53125L9.34375 1.15625C9.53125 0.96875 9.875 0.96875 10.0625 1.15625L10.8438 1.9375C11.0312 2.125 11.0312 2.46875 10.8438 2.65625L7.46875 6Z" fill="#595F6A" />
                </svg>
              </button>
              <div className="w-100">
                <div className="d-flex justify-content-center">
                  <svg className='mb12px' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="12" fill="#00B976"/>
                    <path d="M25.5938 14.625C25.75 14.4688 26 14.4688 26.125 14.625L27.0312 15.5C27.1562 15.6562 27.1562 15.9062 27.0312 16.0312L17.6562 25.4062C17.5 25.5625 17.2812 25.5625 17.125 25.4062L12.9375 21.25C12.8125 21.0938 12.8125 20.8438 12.9375 20.7188L13.8438 19.8125C13.9688 19.6875 14.2188 19.6875 14.375 19.8125L17.375 22.8438L25.5938 14.625Z" fill="white"/>
                  </svg>
                </div>
                <h3 className="walletHeading my-2">Email Verified</h3>
                <h3 className="walletSubHeading mb-3">Your email address was successfully verified.</h3>
                <button type="button" className="btn btn-block gradientBtn">My Profile</button>
              </div>

              <div className="w-100">
                <div className="d-flex justify-content-center">
                  <img src={IconModal} />
                </div>
                <h3 className="walletHeading my-2">Oops!</h3>
                <h3 className="walletSubHeading mb-1">Email verification link expired.</h3>
                <h3 className="walletSubHeading mb-3">Don’t worry, we can send the link again.</h3>
                <button type="button" className="btn btn-block gradientBtn">Resend Verification Link</button>
              </div>              
            </div>            
         </Modal> */}

      <Modal isOpen={modal1} toggle={toggle1} centered="true" className="curMdl createScsMdl" backdropClassName="selCurBp">
        <div className="createContent">
          <button className="btn closeBtn" onClick={toggle}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.46875 6L10.8438 9.375C11.0312 9.5625 11.0312 9.90625 10.8438 10.0938L10.0625 10.875C9.875 11.0625 9.53125 11.0625 9.34375 10.875L6 7.5L2.625 10.875C2.4375 11.0625 2.09375 11.0625 1.90625 10.875L1.125 10.0938C0.9375 9.90625 0.9375 9.5625 1.125 9.375L4.5 6L1.125 2.65625C0.9375 2.46875 0.9375 2.125 1.125 1.9375L1.90625 1.15625C2.09375 0.96875 2.4375 0.96875 2.625 1.15625L6 4.53125L9.34375 1.15625C9.53125 0.96875 9.875 0.96875 10.0625 1.15625L10.8438 1.9375C11.0312 2.125 11.0312 2.46875 10.8438 2.65625L7.46875 6Z" fill="#595F6A" />
            </svg>
          </button>

          <div className="w-100">
            <div className="d-flex justify-content-center">
              <img src={IconModal} />
            </div>
            <h3 className="walletHeading my-2">Are you sure?</h3>
            <h3 className="walletSubHeading mb-3 ">You are about to leave this page. All unsaved changes will be lost. Are you sure?</h3>
            <button type="button" className="btn btn-block gradientBtn mb-2">Continue Editing</button>
            <button type="button" className="btn btn-block darkBtn">Discard Changes</button>
          </div>
          <ToastContainer/>
        </div>
      </Modal>

    </>
  );
};

export default SettingsProfile;