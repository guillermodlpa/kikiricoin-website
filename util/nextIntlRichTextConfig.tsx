/**
 * To be used with the package next-intl, when using t.rich()
 * @see {@link https://next-intl-docs.vercel.app/docs/usage/messages#rich-text}
 */
const richTextConfig = {
  b: (children: React.ReactNode) => <b>{children}</b>,
  i: (children: React.ReactNode) => <i>{children}</i>,
};

export default richTextConfig;
