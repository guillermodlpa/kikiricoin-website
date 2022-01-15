/**
 * Utility component to a number increasing animation
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * @see {@link https://spicyyoghurt.com/tools/easing-functions}
 */
function easeOutExpo(time: number, beginningValue: number, changeInValue: number, duration: number) {
  return time == duration
    ? beginningValue + changeInValue
    : changeInValue * (-Math.pow(2, (-10 * time) / duration) + 1) + beginningValue;
}

const minTimeout = 10;
const maxTimeout = 75;

const IncreasingInteger = ({
  value,
  initialValue = 0,
  duration = 1500,
}: {
  value: number;
  initialValue?: number;
  duration?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimestamp = useRef<number>(Date.now());
  const timeEllapsed = useRef(0);
  const timeout = useRef<NodeJS.Timer>();

  const updateValue = useCallback(() => {
    timeEllapsed.current = Date.now() - startTimestamp.current;

    if (timeEllapsed.current > duration) {
      setDisplayValue(value);
    } else {
      const easedValue = easeOutExpo(timeEllapsed.current, initialValue, value - initialValue, duration);
      setDisplayValue(Math.round(easedValue));

      // On every iteration, we set a new timeout with a longer delay
      const easedTimeout = easeOutExpo(timeEllapsed.current, minTimeout, maxTimeout - minTimeout, duration);
      setTimeout(updateValue, Math.round(easedTimeout));
    }
  }, [duration, initialValue, value]);

  useEffect(() => {
    startTimestamp.current = Date.now();
    timeout.current = setTimeout(updateValue, minTimeout);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [updateValue]);

  return <>{displayValue.toLocaleString()}</>;
};

export default IncreasingInteger;
