import { useState, useEffect } from "react";

function CountdownTimer({ endsAt, longFormat, className, mediumFormat }) {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const endTime = new Date(endsAt).getTime();
    const timeRemaining = endTime - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  if (
    timeRemaining.days <= 0 &&
    timeRemaining.hours <= 0 &&
    timeRemaining.minutes <= 0 &&
    timeRemaining.seconds <= 0
  ) {
    return <p className={` ${className}`}>Checkin time has passed</p>;
  }

  return (
    <div className={`flex gap-2 font-medium ${className}`}>
      {longFormat === true && <p className="font font-normal">Checkin in:</p>}
      {timeRemaining.days >= 1 ? (
        <p>In {timeRemaining.days} days</p>
      ) : (
        <p>Today</p>
      )}

      {mediumFormat && <p>Left</p>}
    </div>
  );
}

export default CountdownTimer;
