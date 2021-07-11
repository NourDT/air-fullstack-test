import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import { addBooking } from "../apis/bookings";

export const SweetAlertFire = ({
  dateSelection,
  details,
  slot,
  setShowDates = () => {},
}) => {
  const MySwal = withReactContent(Swal);
  const bookingDate = moment(dateSelection).format("MM/DD/YYYY");

  MySwal.fire({
    title: <p>Are you sure you want to confirm booking?</p>,
    html: `
        <p>Duration: ${details.duration} minutes</p>
        <p>Booking Time: ${slot}</p>
        <p>Date: ${bookingDate}</p>    
`,
    input: "text",
    inputPlaceholder: "Enter Username...",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
    showCancelButton: true,
    confirmButtonText: `Confirm`,
    preConfirm: (userName) => {
      let data = {
        userName,
        userID: details.uuid,
        bookingDate: moment(dateSelection).format("M/DD/YYYY"),
        bookingTime: slot,
      };
      return addBooking(data)
        .then(() => {
          setShowDates();
          MySwal.fire(
            "Thank You!",
            "Your Booking has been confirmed!",
            "success"
          );
        })
        .catch((err) => {
          MySwal.showValidationMessage(
            `Booking failed: couldn't confirm your booking at the moment! Please Try again later`
          );
        });
    },
    allowOutsideClick: () => !MySwal.isLoading(),
    backdrop: true,
  });
};
