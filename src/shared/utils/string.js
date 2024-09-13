export const removeSpaceAndConvertIntoLowercase = ({string}) => {
  return string?.replace(/\s+/g, '')?.toLowerCase();
};
