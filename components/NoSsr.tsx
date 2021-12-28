import { useEffect, useState } from 'react';

/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 * Levaraged as an escape hatch for broken dependencies not supporting SSR.
 *
 * @see {@link https://github.com/mui-org/material-ui/tree/v5.2.6/packages/mui-base/src/NoSsr}
 */
const NoSsr = ({ children }: { children: React.ReactNode }) => {
  const [mountedState, setMountedState] = useState(false);
  useEffect(() => {
    setMountedState(true);
  }, []);
  return <>{mountedState ? children : null}</>;
};

export default NoSsr;
