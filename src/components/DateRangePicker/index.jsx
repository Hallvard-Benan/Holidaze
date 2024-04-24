import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./style.css";

const Calendar = ({ disabledDates, state, handleOnChange }) => {
  // Determine the number of months based on screen width

  return (
    <DateRangePicker
      weekStartsOn={1}
      onChange={handleOnChange}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
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
