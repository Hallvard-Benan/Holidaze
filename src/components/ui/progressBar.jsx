import { useEffect, useState } from "react";
import { cn } from "../../utils/utils";

const ProgressBar = ({ start, end, max, current, progressStyle }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const currentDate = new Date();

      // Calculate total number of days
      const totalDays = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24),
      );

      // Calculate progress
      const elapsedDays = Math.ceil(
        (currentDate - startDate) / (1000 * 60 * 60 * 24),
      );
      const progressPercentage = (elapsedDays / totalDays) * 100;

      setProgress(progressPercentage <= 100 ? progressPercentage : 100);
    }
  }, [start, end]);
  useEffect(() => {
    if (max && current) {
      const progressPercentage = (current / max) * 100;

      setProgress(progressPercentage <= 100 ? progressPercentage : 100);
    }
  }, [max, current]);

  return (
    <div className="h-2.5 w-full overflow-clip rounded-full bg-gray-200">
      <div
        className={cn(
          "h-2.5 rounded-full bg-primary transition-all duration-500",
          progressStyle,
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
