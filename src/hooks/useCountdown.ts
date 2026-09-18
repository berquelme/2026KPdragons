import { useState, useEffect } from 'react';

export function useCountdown(targetDate: string | Date) {
  const calculateTimeLeft = () => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    return {
      days: Math.floor(totalHours / 24),
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    // 1. Calculate immediately so there is no delay
    setTimeLeft(calculateTimeLeft());

    // 2. Set up the recurring 1-second interval
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // 3. Cleanup: prevent memory leaks when component unmounts
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
} 