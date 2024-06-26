import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "./style.css";
import { useEffect, useState } from "react";

const Calendar = ({ disabledDates, state, handleOnChange }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isSmallScreen = windowWidth < 1060;
  const numMonths = isSmallScreen ? 1 : 2;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const today = new Date();
  return (
    <DateRangePicker
      minDate={today}
      weekStartsOn={1}
      onChange={handleOnChange}
      months={numMonths}
      ranges={state}
      editableDateInputs
      disabledDates={disabledDates}
      direction="horizontal"
    />
  );
};

Calendar.propTypes = {
  onChange: PropTypes.func,
  state: PropTypes.array,
  handleOnChange: PropTypes.func,
  disabledDates: PropTypes.array,
};

export default Calendar;
