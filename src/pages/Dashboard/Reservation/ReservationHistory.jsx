import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const ReservationHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axiosSecure.get("/reservation").then((res) => {
    //   setReservations(res.data.filter(r => r.name === user?.displayName));
      setReservations(res.data.filter(r => r.email === user?.email));
    });
  }, [axiosSecure, user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-amber-700">My Reservations</h2>
      <div className="grid gap-4 mt-4">
        {reservations.map((res) => (
          <div key={res._id} className="p-4 border rounded-lg shadow-md bg-white">
            <p><strong>Date:</strong> {new Date(res.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {res.time}</p>
            <p><strong>Guests:</strong> {res.guests}</p>
            <p><strong>Request:</strong> {res.request || "None"}</p>
            <p className={`font-bold ${res.status === 'confirmed' ? 'text-green-500' : res.status === 'denied' ? 'text-red-500' : 'text-yellow-500'}`}>
              Status: {res.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationHistory;