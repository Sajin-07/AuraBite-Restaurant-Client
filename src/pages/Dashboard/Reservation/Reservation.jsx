import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import img1 from "../../../assets/home/reservation.jpg";

const Reservation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    date: "",
    time: "Lunch",
    guests: "",
    request: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = user?.displayName;
    const email = user?.email;
    const date = formData.date;
    const time = formData.time;
    const guests = formData.guests;
    const request = formData.request;
    const reserveInfo = { name,email, date, time, guests, request };
    // console.log(reserveInfo);

    const response = await axiosSecure.post("/reservation", reserveInfo);
    if (response.data._id) {
      console.log(response.data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reservation Request success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setFormData({
      name: user?.displayName || "",
      email:user?.email,
      date: "",
      time: "",
      guests: "",
      request: "",
    });
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-[url('/restaurant-bg.jpg')] bg-cover bg-center p-4">
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="bg-white bg-opacity-90 p-6 md:p-10 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-700 mb-4">
          Reserve Your Table
        </h2>
        <p className="text-gray-700 mb-6">
          Book a spot for a memorable dining experience!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={user?.displayName || "sjs"}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 text-white bg-gray-800"
            required
            readOnly
          />
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 text-white bg-gray-800"
            required
            name="email"
            value={user?.email || ""}
            readOnly
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            required
          />
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            required
          />
          <textarea
            name="request"
            // type = "text"
            placeholder="Special Requests (optional)"
            value={formData.request}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition duration-300"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
