import { Link, LinkProps } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Children } from 'react';

const DecoratedLink = (props: LinkProps) => {
  const children = props.isExternal ? (
    <>
      {props.children} <ExternalLinkIcon mb="0.3em" role="presentation" />
    </>
  ) : (
    Children
  );
  return (
    <Link color="primary" {...props}>
      {children}
    </Link>
  );
};

export default DecoratedLink;
