import style from './style.module.css';

import Image from 'next/image';
import PropTypes from 'prop-types';

export default function SideContainer({heading, description, imgSrc}) {
  return (
    <div className={style.container}>
      {imgSrc && (
        <Image src={imgSrc} height={200} width={200} alt="forgot password" />
      )}
      <h1 className={style.heading}>{heading}</h1>
      <p className={style.subHeading}>{description}</p>
      <div className={style.circle}></div>
    </div>
  );
}

SideContainer.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  imgSrc: PropTypes.string,
};
