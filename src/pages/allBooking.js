import React, { useEffect, useState } from "react";
import { allBookings } from "../apis/bookings";
import BookingCard from "../components/bookingCard";
import Footer from "../components/footer";
import MyLoader from "../components/loader";
import "../styles/pages/allBooking.scss";
function AllBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    allBookings()
      .then((response) => {
        setBookings(response?.data?.bookings);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loader-div">
        <MyLoader />
      </div>
    );
  }
  return (
    <div className="all-booking-div">
      <div>
        <h1 className="heading">All Bookings</h1>
        <div className="all-booking">
          {bookings.length ? (
            bookings?.map((booking, index) => {
              const { userName, bookingDate, bookingTime, userID, ID } =
                booking;
              return (
                <div key={`booking ${index}`} className="booking-card-div">
                  <BookingCard
                    userName={userName}
                    bookingDate={bookingDate}
                    bookingTime={bookingTime}
                    userID={userID}
                    ID={ID}
                  />
                </div>
              );
            })
          ) : (
            <div>
              <h3>No Bookings</h3>
            </div>
          )}
        </div>
      </div>
      <Footer to="/">Go to booking</Footer>
    </div>
  );
}

export default AllBooking;
