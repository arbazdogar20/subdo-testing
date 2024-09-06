export const getSubdomainLink = (path) => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];

    // Construct the subdomain URL, ignoring localhost
    if (subdomain !== 'localhost' && subdomain !== 'example') {
      return `https://${subdomain}.example.com${path}`;
    }
  }
  return path; // Return the relative path for the main domain
};
