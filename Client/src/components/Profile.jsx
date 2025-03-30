import { useContext, useState } from 'react'
import { AppContext } from '../context/App_Context'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Profile = () => {
  const navigate = useNavigate();
  const { user, userRecipe } = useContext(AppContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Auth': localStorage.getItem('token')
        },
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete recipe');
      }
      
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      
      // Refresh page after 1.5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Error deleting recipe", {
        theme: "dark",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container text-center my-3">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome, {user.name}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {user.gmail}
        </motion.h2>
      </div>

      <div className="container">
        <motion.h3 
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your Recipes
        </motion.h3>
        <motion.div 
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {userRecipe?.length > 0 ? (
            userRecipe.map((data) => (
              <motion.div 
                key={data._id} 
                className="col-md-3 col-sm-6 mb-4"
                variants={itemVariants}
              >
                <div className="card h-100">
                  <div className="card-img-container p-3">
                    <img
                      src={data.imgurl}
                      className="card-img-top"
                      alt={data.title}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{data.title}</h5>
                    <div className="mt-auto d-flex justify-content-between">
                      <motion.button 
                        className="btn btn-primary btn-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(data._id)}
                        disabled={isDeleting}
                      >
                        <FiEdit2 className="me-1" /> Edit
                      </motion.button>
                      <motion.button
                        className="btn btn-danger btn-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(data._id)}
                        disabled={isDeleting}
                      >
                        <FiTrash2 className="me-1" /> Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No recipes found. Start creating your recipes!</p>
              <button 
                className="btn btn-warning"
                onClick={() => navigate('/add')}
              >
                Add Recipe
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Profile