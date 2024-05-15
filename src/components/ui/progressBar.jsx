import { useEffect, useState } from "react";

const ProgressBar = ({ start, end }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date();

    // Calculate total number of days
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Calculate progress
    const elapsedDays = Math.ceil(
      (currentDate - startDate) / (1000 * 60 * 60 * 24),
    );
    const progressPercentage = (elapsedDays / totalDays) * 100;

    setProgress(progressPercentage);
  }, [start, end]);

  return (
    <div className="h-2.5 w-full rounded-full bg-gray-200">
      <div
        className="h-2.5 rounded-full bg-primary"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
