import { ReactNode } from 'react';

/**
 * To be used with the package next-intl, when using t.rich()
 * @see {@link https://next-intl-docs.vercel.app/docs/usage/messages#rich-text}
 */
const richTextConfig = {
  b: (children: ReactNode) => <b>{children}</b>,
  i: (children: ReactNode) => <i>{children}</i>,
};

export default richTextConfig;
