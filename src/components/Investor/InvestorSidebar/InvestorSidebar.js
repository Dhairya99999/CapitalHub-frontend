import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import ArrowLeft from "../../../Images/investorsidebar/ArrowLeft.svg";
import ArrowRight from "../../../Images/investorsidebar/ArrowRight.svg";
import { IoSettingsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { PiSparkleLight, PiFloppyDiskBackLight } from "react-icons/pi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoExitOutline } from "react-icons/io5";
import PlusIcon from "../../../Images/investorIcon/Plus.svg";
import { BsLink45Deg, BsChevronDown, BsChevronUp } from "react-icons/bs";
import "react-pro-sidebar/dist/css/styles.css";
import "./investorsidebar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogOutPopUp from "../../PopUp/LogOutPopUp/LogOutPopUp";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/features/user/userSlice";
import CommunitiesIcon from "../ChatComponents/CommunitiesIcon";
import ModalBsLauncher from "../../PopUp/ModalBS/ModalBsLauncher/ModalBsLauncher";
import { IoCompassOutline } from "react-icons/io5";
import { HiOutlineDocumentText, HiOutlineUserPlus } from "react-icons/hi2";
import { clearAllChatsData } from "../../../Store/features/chat/chatSlice";
import { FiHelpCircle } from "react-icons/fi";
import Batch from "../../Batch";
import BatchImag from "../../../Images/tick-mark.png"
import OnboardingSwitch from "../InvestorNavbar/OnboardingSwitch/OnboardingSwitch"


// Startup Sidebar
const InvestorSidebar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const isMobileView = useSelector((state) => state.design.isMobileView);

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isCommunityDetailOpen, setIsCommunityDetailOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Methods
  const menuIconClick = () => {
    setSidebarCollapsed(true);
  };

  const handleLogout = () => {
    // Step 3: Show the logout popup
    setShowLogoutPopup(true);
  };

  const handleLogoutLogic = () => {
    dispatch(logout());
    dispatch(clearAllChatsData());
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  function handleMyCommunityClick() {
    navigate("/chats?isCommunityOpen=true");
    if (isMobileView) setSidebarCollapsed(true);
  }

  const handleLinkClick = () => {
    if (isMobileView) setSidebarCollapsed(true);
  };

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      if (deltaX < -50) {
        setSidebarCollapsed(false); // Expand the sidebar
      } else if (deltaX > 50) {
        setSidebarCollapsed(true); // Collapse the sidebar
      }
      setTouchStartX(null);
      setTouchEndX(null);
    }
  };


  return (
    <div
      className={`startup_sidebar ${sidebarCollapsed ? "collapsed" : ""}`}
      onMouseLeave={() => {
        if (!isMobileView) {
          setSidebarCollapsed(true);
          setIsCommunityDetailOpen(false);
        }
      }}
      onMouseEnter={() => {
        if (!isMobileView) {
          setSidebarCollapsed(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`close-menu ${
          !sidebarCollapsed && "close-btn-collapsed"
        } d-none`}
        onClick={menuIconClick}
      >
        {sidebarCollapsed ? (
          <img className="close-menu-right" src={ArrowRight} alt="right icon" />
        ) : (
          <img className="close-menu-left" src={ArrowLeft} alt="right icon" />
        )}
      </div>
      <div id="header">
        <ProSidebar collapsed={sidebarCollapsed}>
          <SidebarHeader>
            <div className="logotext">
              {sidebarCollapsed ? (
                <Link to={"/profile"} onClick={handleLinkClick}>
                  <img
                    className="rounded-circle"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    src={loggedInUser.profilePicture}
                    alt="User profile"
                  />
                </Link>
              ) : (
                <>
                <div
                  style={{
                    position: 'relative',
                    width: '100px', // Set a width for the div
                    height: '100px', // Set a height for the div
                    borderRadius: '50%',
                    zIndex: 0,
                    overflow: 'hidden', // Ensure content does not overflow
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: loggedInUser.isSubscribed
                        ? '4px solid transparent' // Set border width here
                        : 'none',
                      background: loggedInUser.isSubscribed
                        ? 'linear-gradient(180deg, #B68C3C 0%, #F4DD71 100%)'
                        : 'none',
                      zIndex: -1, // Place this behind the main content
                    }}
                  />
                  {" "}
                    <Link to={"/profile"} onClick={handleLinkClick}>
                      <img
                        className="rounded-circle"
                        style={{
                          width: "98px",
                          height: "98px",
                          objectFit: "cover",
                        }}
                        src={loggedInUser.profilePicture}
                        alt="Profile"
                      />
                    </Link>
                </div>

                  

                  <h3
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: loggedInUser?.isSubscribed
                        ? 'linear-gradient(180deg, #B68C3C 0%, #F4DD71 100%)'
                        : 'none', // No background gradient if not subscribed
                      WebkitBackgroundClip: loggedInUser?.isSubscribed ? 'text' : 'initial', // Apply gradient text effect only if subscribed
                      WebkitTextFillColor: loggedInUser?.isSubscribed ? 'transparent' : 'var(--d-l-grey)', // Text color for subscribed vs non-subscribed
                      color: loggedInUser?.isSubscribed ? 'transparent' : 'var(--d-l-grey)', // Fallback color for non-subscribed
                    }}
                  >
                    {loggedInUser?.firstName} {loggedInUser?.lastName}
                    {loggedInUser.isSubscribed && <img
              src={BatchImag}
              style={{
                width: "1.2rem",
                height: "1.2rem",
                objectFit: "contain",
                marginLeft: "0.5rem", // Optional: adds space between the name and the icon
              }}
              alt="Batch Icon"
            />}
                  </h3>



                  <h4>{loggedInUser?.userName}</h4>
                </>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="round">
              <MenuItem>
                <Link
                  to="home?showPopup=true"
                  id="sidebar_createAPost"
                  onClick={handleLinkClick}
                >
                  {sidebarCollapsed ? (
                    <button className="plus_btn">
                      <img src={PlusIcon} alt="Plus icon" />
                    </button>
                  ) : (
                    <button className="create_post px-3">
                      <span className="ms-0">Create a post</span>
                      <img src={PlusIcon} alt="Plus icon" />
                    </button>
                  )}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/home")}
                className="active-item"
              >
                <Link to="/home" onClick={handleLinkClick}>
                  <GoHome size={25} />
                  {!sidebarCollapsed && <span>Home</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/company-profile")}
                className="active-item"
              >
                <Link
                  to="/company-profile"
                  id="sidebar_companyProfile"
                  onClick={handleLinkClick}
                >
                  <HiOutlineOfficeBuilding size={25} />
                  {!sidebarCollapsed && <span>Company</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/explore")}
                className="active-item"
              >
                <Link
                  to="/explore"
                  id="sidebar_explore"
                  onClick={handleLinkClick}
                >
                  <IoCompassOutline size={25} />
                  {!sidebarCollapsed && <span>Explore</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/onelink")}
                className="active-item"
              >
                <Link
                  to="/onelink"
                  id="sidebar_oneLink"
                  onClick={handleLinkClick}
                >
                  <BsLink45Deg size={25} />
                  {!sidebarCollapsed && <span>OneLink</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/chats")}
                className="active-item"
              >
                <div
                  className="sidebar__community d-flex gap-4"
                  id="sidebar_community"
                >
                  <div onClick={handleLinkClick}>
                    <CommunitiesIcon
                      width="20px"
                      height="20px"
                      color={`${
                        isCommunityDetailOpen ? "#fd5901" : "var(--d-l-grey)"
                      }`}
                      className="me-1"
                    />
                  </div>
                  {!sidebarCollapsed && (
                    <details className="">
                      <summary
                        className="d-flex align-items-center gap-2"
                        onClick={() =>
                          setIsCommunityDetailOpen(!isCommunityDetailOpen)
                        }
                      >
                        Community
                        {isCommunityDetailOpen ? (
                          <BsChevronUp />
                        ) : (
                          <BsChevronDown />
                        )}
                      </summary>
                      <div className="d-flex flex-column gap-2">
                        <ModalBsLauncher
                          id="AddNewCommunity"
                          className="sidebar__community__btn m-0"
                        >
                          <p className="m-0">Create a Community</p>
                        </ModalBsLauncher>
                        <button
                          className="sidebar__community__btn shadow-none"
                          onClick={handleMyCommunityClick}
                        >
                          My Community
                        </button>
                      </div>
                    </details>
                  )}
                </div>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/documentation")}
                className="active-item"
              >
                <Link
                  to="/documentation"
                  id="sidebar_documentation"
                  onClick={handleLinkClick}
                >
                  <HiOutlineDocumentText size={25} />
                  {!sidebarCollapsed && <span>Documentation</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/savePost")}
                className="active-item"
              >
                <Link
                  to="/savePost"
                  id="sidebar_savedPosts"
                  onClick={handleLinkClick}
                >
                  <PiFloppyDiskBackLight size={25} />
                  {!sidebarCollapsed && <span>Saved posts</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/connection")}
                className="active-item"
              >
                <Link
                  to="/connection"
                  id="sidebar_connections"
                  onClick={handleLinkClick}
                >
                  <HiOutlineUserPlus size={25} />
                  {!sidebarCollapsed && <span>Connections</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/help")}
                className="active-item"
              >
                <Link to="/help" onClick={handleLinkClick}>
                  <FiHelpCircle size={25} />
                  {!sidebarCollapsed && <span>Help</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/settings")}
                className="active-item"
              >
                <Link to="/settings" onClick={handleLinkClick}>
                  <IoSettingsOutline size={25} />
                  {!sidebarCollapsed && <span>Settings</span>}
                </Link>
              </MenuItem>

              <MenuItem className="active-item">
                <Link to="/" onClick={handleLinkClick}>
                  <PiSparkleLight size={25} />
                  {!sidebarCollapsed && <span>Learn More</span>}
                </Link>
              </MenuItem>

            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="round">
            <MenuItem>
                <div className="d-flex justify-content-center align-items-center mobile-onboarding">
                  {!sidebarCollapsed && <OnboardingSwitch/>}
                </div>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <div className="d-flex justify-content-center align-items-center">
                  <IoExitOutline size={25} />
                  {!sidebarCollapsed && <span>Log out</span>}
                </div>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
      {showLogoutPopup && (
        <LogOutPopUp
          setShowLogoutPopup={setShowLogoutPopup}
          handleLogoutLogic={handleLogoutLogic}
          showLogoutPopup
        />
      )}
    </div>
  );
};

export default InvestorSidebar;