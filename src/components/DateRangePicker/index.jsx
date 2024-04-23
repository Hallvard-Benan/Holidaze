import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./style.css";

const Calendar = ({ onChange, disabledDates }) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 0),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = addDays(today, 1);

    // Check if today is included in disabledDates
    if (disabledDates.includes(today.toISOString().split("T")[0])) {
      let nextAvailableDate = tomorrow;
      while (
        disabledDates.includes(nextAvailableDate.toISOString().split("T")[0])
      ) {
        nextAvailableDate = addDays(nextAvailableDate, 1);
      }
      setState([
        {
          startDate: nextAvailableDate,
          endDate: addDays(nextAvailableDate, 1),
          key: "selection",
        },
      ]);
    }
  }, [disabledDates]);

  // Determine the number of months based on screen width
  const getMonthsToShow = () => {
    return window.innerWidth < 720 ? 1 : 2;
  };

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);

    setState([selection]);
  };

  useEffect(() => {
    const handleResize = () => {
      setState((prev) => {
        return [
          {
            ...prev[0],
            startDate: subDays(new Date(), 0),
            endDate: addDays(new Date(), 0),
          },
        ];
      });
    };
    setState([
      {
        startDate: subDays(new Date(), 0),
        endDate: addDays(new Date(), 0),
        key: "selection",
      },
    ]);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DateRangePicker
      weekStartsOn={1}
      onChange={handleOnChange}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={getMonthsToShow()}
      ranges={state}
      editableDateInputs
      disabledDates={disabledDates}
      direction="horizontal"
    />
  );
};

Calendar.propTypes = {
  onChange: PropTypes.func,
  disabledDates: PropTypes.array,
};

export default Calendar;
