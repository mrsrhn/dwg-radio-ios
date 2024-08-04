import { useEffect, useState } from 'react';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Function to update the time
    const updateClock = () => {
      setCurrentTime(new Date());
    };

    // Set an interval to update the time every minute
    const intervalId = setInterval(updateClock, 60000);

    // Initial call to set the correct time immediately
    updateClock();

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
};

export default useCurrentTime;
