import {SIDEBAR_LINKS} from './links';

export const sideBarLinks = ({currentUserRole}) => {
  const links = Object.values(SIDEBAR_LINKS).map((route) => ({
    id: route.id,
    title: route.title,
    link: route.link,
    icon: route.icon,
    allowed: route.allowed,
  }));

  return links.filter((link) => link?.allowed?.includes(currentUserRole));
};
