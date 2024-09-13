export const sanitizedAlphabetInput = (input) =>
  input.replace(/[^a-zA-Z ]/g, '');

export const domainUrl = ({subDomain = ''} = {}) => {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const isLocalhost = rootDomain === 'localhost';

  const port = process.env.NEXT_PUBLIC_PORT || 3000;

  const mainDomain = isLocalhost ? `localhost:${port}` : rootDomain;
  const hasSubDomain = subDomain ? `${subDomain}.` : '';

  return isLocalhost
    ? `http://${hasSubDomain}${mainDomain}`
    : `https://${hasSubDomain}${mainDomain}`;
};
