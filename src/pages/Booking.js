import React, { useEffect, useRef, useState } from "react";
import MyCalendar from "../components/calendar";
import MyCard from "../components/card";
import "../styles/pages/booking.scss";
import { uniqueNamesGenerator, names, colors } from "unique-names-generator";
import { v4 as uuidv4 } from "uuid";
import Slots from "../components/slots";
import { slotsGenerator } from "../util/booking.util";
import Footer from "../components/footer";
import { getBookingByDate } from "../apis/bookings";
import { SweetAlertFire } from "../lib/sweetAlert";


function Booking() {
  const config = {
    dictionaries: [names, colors],
    length: 2,
  };
  const configRef = useRef();
  configRef.current = config;
  const defaultSlots = slotsGenerator(13, 16);
  const [dateSelection, setDateSelection] = useState(undefined);
  const [showDates, setShowDates] = useState(false);
  const [details, setDetails] = useState({ uuid: "", name: "", duration: 0 });
  const [loading, setLoading] = useState(false);
  let dateBookingRef = useRef();

  const [slots, setSlots] = useState(defaultSlots);

  useEffect(() => {
    setDetails({
      uuid: uuidv4(),
      name: uniqueNamesGenerator(configRef.current),
      duration: 30,
    });
  }, []);

  const getBookingFunc = () => {
    if (dateSelection) {
      setLoading(true);
      setSlots(defaultSlots);
      getBookingByDate(dateSelection)
        .then(({ data }) => {
          setSlots((previousData) => {
            let preData = [...previousData];
            preData = preData.filter((time) => {
              return !data?.some((item) => item?.bookingTime === time);
            });
            return preData;
          });
        })
        .catch((err) => console.log("response", err))
        .finally(() => setLoading(false));
    }
  };

  dateBookingRef.current = getBookingFunc;

  useEffect(() => {
    dateBookingRef.current();
  }, [dateSelection]);

  const handleClick = (slot) => {
    SweetAlertFire({ dateSelection, slot, details, setShowDates });
    setDateSelection(undefined);
    setShowDates(false);
  };
  return (
    <>
      <div className="booking-parent">
        <div className="booking">
          <MyCard
            name={details.name}
            booking={details.uuid}
            duration={details.duration}
            setShowDates={setShowDates}
            showDates={showDates}
            dateSelection={dateSelection}
          />
          {showDates && (
            <MyCalendar value={dateSelection} onChange={setDateSelection} />
          )}
          {dateSelection ? (
            <Slots
              slots={slots}
              handleClick={handleClick}
              date={dateSelection}
              loading={loading}
            />
          ) : null}
        </div>
      </div>
      <Footer to="/Bookings">Go to All Bookings</Footer>
    </>
  );
}

export default Booking;
