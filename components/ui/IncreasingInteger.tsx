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

const IncreasingInteger: React.FC<{
  value: number;
  initialValue?: number;
  maxDuration?: number;
}> = ({ value, initialValue = 0, maxDuration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState(initialValue);
  const [startingValue, setStartingValue] = useState(initialValue);

  const startTimestamp = useRef<number>(Date.now());
  const timeEllapsed = useRef(0);
  const timeout = useRef<NodeJS.Timer>();

  const updateValue = useCallback(() => {
    timeEllapsed.current = Date.now() - startTimestamp.current;

    const newDisplayValue =
      timeEllapsed.current > maxDuration
        ? value
        : Math.round(easeOutExpo(timeEllapsed.current, startingValue, value - startingValue, maxDuration));

    setDisplayValue(newDisplayValue);

    // if we didn't reach the end, continue another iteration with a longer delay
    if (newDisplayValue !== value) {
      const easedTimeout = easeOutExpo(timeEllapsed.current, minTimeout, maxTimeout - minTimeout, maxDuration);
      timeout.current = setTimeout(updateValue, Math.round(easedTimeout));
    }
    // if we reached the end, the new starting number to animate will be the final one
    else {
      setStartingValue(value);
    }
  }, [maxDuration, startingValue, value]);

  useEffect(() => {
    // stop ongoing animations when `value` changes
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    startTimestamp.current = Date.now();
    timeout.current = setTimeout(updateValue, minTimeout);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [updateValue, value]);

  return <>{displayValue.toLocaleString()}</>;
};

export default IncreasingInteger;
