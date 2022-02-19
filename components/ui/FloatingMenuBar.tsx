import { Box, useTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const FloatingMenuBar: React.FC = ({ children }) => {
  const theme = useTheme();

  // We delay rendering to not render this menu on server side
  // because of a hidration problem with IDs
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);
  if (!rendered) {
    return null;
  }

  return (
    <Box position="fixed" top={2} right={4} zIndex={theme.zIndices.docked}>
      {children}
    </Box>
  );
};

export default FloatingMenuBar;
