import React from "react";
import styles from "./Banner.module.css";
import type { BannerProps } from "./Banner.types";

const Banner: React.FC<BannerProps> = ({
  altImg,
  image,
  copyRightText = "Made in ...",
}) => {
  return (
    <div className={styles.banner}>
      {image && (
        <img src={`${image}`} alt={altImg} className={styles.picture} />
      )}
      <div className={styles.copyText}>{copyRightText}</div>
    </div>
  );
};

export default Banner;
