import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Timer from 'react-native-background-timer-android';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Function to update the time
    const updateClock = () => {
      setCurrentTime(new Date());
    };
    const cleanUpInterval = (): void => {
      if (Platform.OS === 'android') {
        return Timer.clearInterval(intervalId as number) as unknown as void;
      }
      return clearInterval(intervalId);
    };

    // Set an interval to update the time every minute
    const intervalId =
      Platform.OS === 'android'
        ? Timer.setInterval(updateClock, 60000)
        : setInterval(updateClock, 60000);

    // Initial call to set the correct time immediately
    updateClock();

    // Cleanup function to clear the interval when the component unmounts
    return () => cleanUpInterval();
  }, []);

  return currentTime;
};

export default useCurrentTime;
