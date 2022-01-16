import { useState, useEffect, useMemo, RefObject } from 'react';

/**
 * @see {@link https://stackoverflow.com/a/65008608} Note that it's been modified for TypeScript and SSR
 */
export function useOnScreen(ref: RefObject<HTMLDivElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      return new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    }
    return null;
  }, []);

  useEffect(() => {
    if (!observer || !ref.current) {
      return;
    }
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [observer, ref]);

  return isIntersecting;
}

const useValueWasTrue = (value: boolean) => {
  const [wasTrue, setWasTrue] = useState(Boolean(value));
  useEffect(() => {
    if (value && !wasTrue) {
      setWasTrue(true);
    }
  }, [wasTrue, value]);
  return wasTrue;
};

export const useOnScreenPersistent = (ref: RefObject<HTMLDivElement>) => {
  const onScreen = useOnScreen(ref);
  const wasOnScreen = useValueWasTrue(onScreen);
  return onScreen || wasOnScreen;
};
