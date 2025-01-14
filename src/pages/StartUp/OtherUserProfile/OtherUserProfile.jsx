import connection from "../../../Images/StartUp/icons/connection-user.png";
import messageIcon from "../../../Images/StartUp/icons/message.svg";
import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import "./OtherUserProfile.scss";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getUserAndStartUpByUserIdAPI,
  sentConnectionRequest,
} from "../../../Service/user";
import CompanyDetailsCard from "../../../components/Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
import FeaturedPostsContainer from "../../../components/Investor/InvestorGlobalCards/MilestoneCard/FeaturedPostsContainer";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import AfterSuccessPopup from "../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";

import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setPageTitle } from "../../../Store/features/design/designSlice";
import SubcriptionPop from "../../../components/PopUp/SubscriptionPopUp/SubcriptionPop";
import BatchImag from "../../../Images/tick-mark.png";

function OtherUserProfile() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [popPayOpen, setPopPayOpen] = useState(false);
  const [connectionSent, setConnectionSent] = useState(false);
  const theme = useSelector(selectTheme);
  const { userId } = useParams();
  const navigate = useNavigate(); // Import and use useNavigate

  useEffect(() => {
    window.title = "User Profile | The Capital Hub";
    dispatch(setPageTitle("User Profile"));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserAndStartUpByUserIdAPI(userId)
      .then(({ data }) => setUserData(data))
      .catch((error) => console.error(error.message));
  }, [userId, connectionSent]);

  const handleConnect = (userId) => {
    if (canSendRequest()) {
      sentConnectionRequest(loggedInUser._id, userId)
        .then(({ data }) => {
          if (data?.message === "Connection Request Sent") {
            setConnectionSent(true);
            setTimeout(() => {
              setConnectionSent(false);
            }, 2500);
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("User not subscribed");
      setPopPayOpen(true);
    }
  };

  const handleMessageButtonClick = () => {
    if (canSendRequest()) {
      console.log('Opening chat...');
      // Add your chat opening logic here
      navigate(`/chats?userId=${userData?._id}`);
    } else {
      console.log('User not subscribed');
      setPopPayOpen(true);
    }
  };

  const canSendRequest = () => {
    const trialPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const currentDate = new Date();
    const trialEndDate = new Date(new Date(loggedInUser?.trialStartDate).getTime() + trialPeriod);

    return loggedInUser?.isSubscribed || (loggedInUser?.trialStartDate && currentDate < trialEndDate);
  };

  return (
    <>
      <MaxWidthWrapper>
        <section className="other_user_profile mx-lg-4 mx-xl-0">
          <SmallProfileCard className="mt-lg-2 mt-xl-0" text="User Details" />
          {userData ? (
            <>
              <div className="row profile rounded-4 border shadow-sm">
                <div className="short_details d-flex flex-column flex-md-row align-items-center justify-content-between">
                  <div className="d-flex flex-column w-100 flex-md-row align-items-center justify-content-between ">
                    <img
                      src={userData.profilePicture}
                      width={100}
                      height={100}
                      alt="profileimage"
                      className="rounded-circle"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="flex-grow-1 left_profile_text mt-2 mt-md-0 me-auto me-md-0 ms-md-4">
                      <h3 className="typography h3">
                        {userData?.firstName} {userData?.lastName}
                        {userData.isSubscribed && <img
                      src={BatchImag}
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        objectFit: "contain",
                      }}
                      alt="Batch Icon"
                    />}
                      </h3>
                      <span className="small_typo">
                        {userData?.designation || "Founder & CEO of The Capital Hub"}
                      </span>
                      <br />
                      <span className="small_typo">
                        {userData?.location || "Bangalore , India"}
                      </span>
                    </div>
                  </div>
                  {/* uncomment below when you want to show message and request button  */}
                  {/* {loggedInUser._id !== userData?._id && (
                    <div className="buttons d-flex gap-2 flex-row align-items-md-center">
                      <button
                        onClick={handleMessageButtonClick}
                        className="message btn rounded-pill px-3 py-2"
                      >
                        <img src={messageIcon} width={20} alt="message user" />
                        <span>Message</span>
                      </button>
                      {userData?.connections?.includes(loggedInUser._id) ? (
                        <button className="connection-status  btn rounded-pill px-3 py-2">
                          <span>Connected</span>
                        </button>
                      ) : userData?.connectionsReceived?.includes(
                          loggedInUser._id
                        ) ? (
                        <button className=" connection-status d-flex btn rounded-pill px-3 py-2">
                          <img src={connection} width={20} alt="message user" />
                          <span>Pending</span>
                        </button>
                      ) : (
                        <button className="connection-status d-flex  btn rounded-pill px-3 py-2" onClick={() => handleConnect(userData?._id)}>
                          <img src={connection} width={20} alt="message user" />
                          <span>
                            Connect
                          </span>
                        </button>
                      )}
                    </div>
                  )} */}
                </div>
                <div className="details">
                  <div className="single_details row row-cols-1 row-cols-md-2 ">
                    {userData?.startUp?.company || userData?.investor?.companyName ? (
                      <>
                        <span className="col-md-3 label fw-bold">Current Company</span>
                        <span className="col-md-9 value">
                          {userData?.startUp?.company || userData?.investor?.companyName}
                        </span>
                      </>
                    ) : null}
                  </div>

                  <div className="single_details row row-cols-1 row-cols-md-2 ">
                    {userData?.designation ? (
                      <>
                        <span className="col-md-3 label fw-bold">Designation</span>
                        <span className="col-md-9 value">{userData?.designation}</span>
                      </>
                    ) : null}
                  </div>

                  <div className="single_details row row-cols-1 row-cols-md-2 ">
                    {userData?.education ? (
                      <>
                        <span className="col-md-3 label fw-bold">Education</span>
                        <span className="col-md-9 value">{userData?.education}</span>
                      </>
                    ) : null}
                  </div>

                  <div className="single_details row row-cols-1 row-cols-md-2 ">
                    {userData?.experience ? (
                      <>
                        <span className="col-md-3 label fw-bold">Experience</span>
                        <span className="col-md-9 value">{userData?.experience}</span>
                      </>
                    ) : null}
                  </div>
                </div>

              </div>
              <div className="row row-cols-auto row-cols-lg-2 g-0 gx-md-4 two_column_wrapper mb-4">
                <div className="left_container p-0 pe-md-auto d-flex flex-column gap-3 col-12 col-lg-8">
                  
                  {userData?.bio ? (
                    <div className="bio rounded-4 border shadow-sm profile_container">
                      <h4 className="h4">Bio</h4>
                      <div className="single_education">
                        <h6 className="h6">{userData?.bio}</h6>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <div className="featured_post border rounded-4 shadow-sm d-flex flex-column gap-3 p-4">
                    <div className="d-flex justify-content-between">
                      <h4>Featured Posts</h4>
                    </div>
                    <FeaturedPostsContainer userId={userId} />
                  </div> */}
                  <div className="company_details_container shadow-sm rounded-4">
                    <CompanyDetailsCard
                      className="company_details rounded-4 border profile_container"
                      userDetails={userData}
                      theme="startup"
                    />
                  </div>
                </div>
                <div className="right_container p-0">
                  <RecommendationCard />
                  <NewsCorner />
                </div>
              </div>
            </>
          ) : (
            <h4
              className="h4 w-100 my-5 text-center"
              style={{ minHeight: "90vh" }}
            >
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </h4>
          )}
          {connectionSent && (
            <AfterSuccessPopup
              withoutOkButton
              onClose={() => setConnectionSent(!connectionSent)}
              successText="Connection Sent Successfully"
            />
          )}
        </section>
      </MaxWidthWrapper>
      {popPayOpen && <SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen}/>}
    </>
  );
}

export default OtherUserProfile;
