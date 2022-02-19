import { Stat, StatProps } from '@chakra-ui/react';

const StyledStat: React.FC<StatProps> = ({ ...props }) => (
  <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} bg="white" {...props} />
);

export default StyledStat;
