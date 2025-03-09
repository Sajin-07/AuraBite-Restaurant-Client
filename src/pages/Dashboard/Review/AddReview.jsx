import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddReview = () => {
  const axiosSecure = useAxiosSecure(); 
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    details: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    const reviewData = {
      name: formData.name.trim(),
      rating,
      details: formData.details.trim()
    };

    try {
      const res = await axiosSecure.post('https://aura-bite-server.vercel.app/reviews', reviewData);
      console.log("Review Submitted:", res.data);
      // alert("Review submitted successfully!");
      toast.success("Review Added");
      setFormData({ name: '', details: '' });
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Write a Review
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              required
              name="name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Rating Stars */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-4">
              Rating
            </label>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      className="hidden"
                    />
                    <FaStar
                      className="cursor-pointer text-4xl transition-colors duration-200"
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Review Details */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Review Details
            </label>
            <textarea
              required
              name="details"
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200"
              placeholder="Share your experience..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Submit Review
          </button>
        </form>
      </div>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </div>
  );
};

export default AddReview;
