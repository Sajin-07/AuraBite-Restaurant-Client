import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    axiosSecure.get("/reservation").then((res) => {
      setReservations(res.data);
      const dateCounts = res.data.reduce((acc, res) => {
        const dateKey = new Date(res.date).toDateString();
        acc[dateKey] = (acc[dateKey] || 0) + 1;
        return acc;
      }, {});
      setMarkedDates(dateCounts);
    });
  }, [axiosSecure]);

  const handleStatusUpdate = async (id, status) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${status} this reservation?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B91C1C',
      cancelButtonColor: '#1E40AF',
      confirmButtonText: `Yes, ${status} it!`
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/reservation/${id}`, { status });
      setReservations((prev) => prev.map(res => res._id === id ? { ...res, status } : res));
      Swal.fire(
        'Updated!',
        `Reservation has been ${status}.`,
        'success'
      );
    }
  };

  const filteredReservations = reservations.filter(
    (res) => new Date(res.date).toDateString() === selectedDate.toDateString()
  );

  const totalGuests = filteredReservations.reduce((acc, res) => acc + res.guests, 0);
  const totalReservations = filteredReservations.length;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-amber-50">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Reservation Manager</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="bg-amber-100 p-4 rounded-lg shadow-md flex-1">
            <p className="text-lg font-semibold text-amber-800">Total Reservations</p>
            <p className="text-3xl text-amber-600 font-bold">{totalReservations}</p>
          </div>
          <div className="bg-amber-100 p-4 rounded-lg shadow-md flex-1">
            <p className="text-lg font-semibold text-amber-800">Total Guests</p>
            <p className="text-3xl text-amber-600 font-bold">{totalGuests}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          {/* <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="bg-white rounded-lg shadow-lg p-4 border-2 border-amber-200"
            tileClassName={({ date }) =>
              markedDates[date.toDateString()] 
                ? "bg-red-500 text-white rounded-full hover:bg-red-600 !important" 
                : "hover:bg-amber-100 rounded-full"
            }
          /> */}
          <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="restaurant-calendar"
              tileContent={({ date }) =>
                markedDates[date.toDateString()] ? (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></div>
                ) : null
              }
              tileClassName={({ date }) =>
                markedDates[date.toDateString()] 
                  ? "relative bg-amber-50 hover:bg-amber-100" 
                  : "hover:bg-amber-50"
              }
            />

        </div>

        <div className="lg:w-2/3">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            Reservations for {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <div className="grid gap-4">
            {filteredReservations.length > 0 ? (
              filteredReservations.map((res) => (
                <div key={res._id} className="p-4 bg-white rounded-lg shadow-md border-l-4 border-amber-400 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="font-semibold text-amber-800">Guest Name:</p>
                      <p className="text-amber-600">{res.name}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-800">Reservation Time:</p>
                      <p className="text-amber-600">{res.time}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-800">Party Size:</p>
                      <p className="text-amber-600">{res.guests} people</p>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-800">Contact Email:</p>
                      <p className="text-amber-600 break-all">{res.email}</p>
                    </div>
                  </div>
                  {res.request && (
                    <div className="mt-2">
                      <p className="font-semibold text-amber-800">Special Requests:</p>
                      <p className="text-amber-600 italic">"{res.request}"</p>
                    </div>
                  )}
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      res.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      res.status === 'denied' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Status: {res.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(res._id, "confirmed")}
                        disabled={res.status === "confirmed" || res.status === "denied"}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          res.status === "confirmed" || res.status === "denied" 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(res._id, "denied")}
                        disabled={res.status === "confirmed" || res.status === "denied"}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          res.status === "confirmed" || res.status === "denied" 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-amber-100 rounded-lg text-amber-800 text-center">
                No reservations for this date
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;




//main
// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import Swal from "sweetalert2";

// const ManageBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [reservations, setReservations] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [markedDates, setMarkedDates] = useState({});

//   useEffect(() => {
//     axiosSecure.get("/reservation").then((res) => {
//       setReservations(res.data);
//       const dateCounts = res.data.reduce((acc, res) => {
//         const dateKey = new Date(res.date).toDateString();
//         acc[dateKey] = (acc[dateKey] || 0) + 1;
//         return acc;
//       }, {});
//       setMarkedDates(dateCounts);
//     });
//   }, [axiosSecure]);

//   const handleStatusUpdate = async (id, status) => {
//     await axiosSecure.patch(`/reservation/${id}`, { status });
//     setReservations((prev) => prev.map(res => res._id === id ? { ...res, status } : res));
//   };

//   const filteredReservations = reservations.filter(
//     (res) => new Date(res.date).toDateString() === selectedDate.toDateString()
//   );

//   const totalGuests = filteredReservations.reduce((acc, res) => acc + res.guests, 0);
//   const totalReservations = filteredReservations.length;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-amber-700">Manage Bookings</h2>
//       <p className="text-lg">Total Reservations: {totalReservations}</p>
//       <p className="text-lg">Total Guests: {totalGuests}</p>

//       <div className="flex gap-6 mt-6">
//         <Calendar
//           onChange={setSelectedDate}
//           value={selectedDate}
//           tileClassName={({ date }) =>
//             markedDates[date.toDateString()] ? "bg-yellow-300 text-black rounded-full" : ""
//           }
//         />

//         <div className="flex-1">
//           <h3 className="text-xl font-bold mt-4">
//             Reservations for {selectedDate.toDateString()}:
//           </h3>
//           <div className="grid gap-4 mt-4">
//             {filteredReservations.length > 0 ? (
//               filteredReservations.map((res) => (
//                 <div key={res._id} className="p-4 border rounded-lg shadow-md bg-white">
//                   <p><strong>Name:</strong> {res.name}</p>
//                   <p><strong>Time:</strong> {res.time}</p>
//                   <p><strong>Guests:</strong> {res.guests}</p>
//                   <p><strong>Request:</strong> {res.request || "None"}</p>
//                   <p><strong>Email:</strong> {res.email}</p>
//                   <p className={`font-bold ${res.status === 'confirmed' ? 'text-green-500' : res.status === 'denied' ? 'text-red-500' : 'text-yellow-500'}`}>
//                     Status: {res.status}
//                   </p>
//                   <div className="flex gap-2 mt-2">
//                     <button
//                       onClick={() => handleStatusUpdate(res._id, "confirmed")}
//                       className={`px-4 py-2 rounded-lg ${res.status === "confirmed" || res.status === "denied" ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-green-500 text-white'}`}
//                       disabled={res.status === "confirmed" || res.status === "denied"}
//                     >
//                       Confirm
//                     </button>
//                     <button
//                       onClick={() => handleStatusUpdate(res._id, "denied")}
//                       className={`px-4 py-2 rounded-lg ${res.status === "confirmed" || res.status === "denied" ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-red-500 text-white'}`}
//                       disabled={res.status === "confirmed" || res.status === "denied"}
//                     >
//                       Deny
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No reservations for this date.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageBookings;

























