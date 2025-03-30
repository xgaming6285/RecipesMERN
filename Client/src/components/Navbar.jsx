import  { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/App_Context";
import { motion } from "framer-motion";
import { FiHome, FiPlusCircle, FiUser, FiLogOut, FiLogIn, FiUserPlus, FiBookmark } from "react-icons/fi";

const Navbar = () => {
  const { isAuthenticated, logOut } = useContext(AppContext);
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <>
      <motion.div 
        className="nav"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to={"/"}
          className="nav-brand"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.span
            animate={{ scale: isHovering ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiHome className="me-2" />
            MERN Recipe
          </motion.span>
        </Link>
        <div className="nav-links">
          {isAuthenticated && (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={"/add"} className="btn btn-info mx-2">
                  <FiPlusCircle className="me-1" /> Add Recipe
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={"/profile"} className="btn btn-warning mx-2">
                  <FiUser className="me-1" /> Profile
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="btn btn-danger mx-2" onClick={logOut}>
                  <FiLogOut className="me-1" /> LogOut
                </div>
              </motion.div>
            </>
          )}
          {!isAuthenticated && (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={"/login"} className="btn btn-primary mx-2">
                  <FiLogIn className="me-1" /> Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={"/register"} className="btn btn-warning mx-2">
                  <FiUserPlus className="me-1" /> Register
                </Link>
              </motion.div>
            </>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={"/saved"} className="btn btn-light mx-2">
              <FiBookmark className="me-1" /> Saved
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
