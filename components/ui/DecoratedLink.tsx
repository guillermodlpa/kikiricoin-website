import { Link, LinkProps } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const isExternalLink = (href: string) => typeof window !== 'undefined' && !href.startsWith(window.location.origin);

const DecoratedLink = (props: LinkProps) => {
  const isExternal = Boolean(props.href && isExternalLink(props.href));

  return (
    <Link color="primary" isExternal={isExternal} {...props}>
      {isExternal ? (
        <>
          {props.children} <ExternalLinkIcon mb="0.3em" role="presentation" />
        </>
      ) : (
        props.children
      )}
    </Link>
  );
};

export default DecoratedLink;
