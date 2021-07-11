import React from 'react'
import "../styles/components/bookingCard.scss"
function BookingCard({userName,bookingDate,bookingTime,userID,ID}) {
    return (
        <div className="booking-card">
            <div>
                <h5>
                    {userID}
                </h5>
                <h3>
                    {userName}
                </h3>
            </div>
            <div>
                <h5>
                {ID}
                </h5>
                <h4>{bookingDate}</h4>
                <h4>{bookingTime}</h4>
              
            </div>
        </div>
    )
}

export default BookingCard
