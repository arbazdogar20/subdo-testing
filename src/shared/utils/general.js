export const sanitizedAlphabetInput = (input) =>
  input.replace(/[^a-zA-Z ]/g, '');

export const domainUrl = ({subDomain = ''} = {}) => {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const isLocalhost = rootDomain === 'localhost';

  const mainDomain = isLocalhost ? 'localhost:3000' : rootDomain;
  const hasSubDomain = subDomain ? `${subDomain}.` : '';

  return isLocalhost
    ? `http://${hasSubDomain}${mainDomain}`
    : `https://${hasSubDomain}${mainDomain}`;
};
