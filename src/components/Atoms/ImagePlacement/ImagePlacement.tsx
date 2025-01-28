import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { ReactElement } from "react";
import styles from "./ImagePlacement.module.css";

interface Props {
  image?: string;
  size?: string;  
}

export const ImagePlacement = ({ image = "",size }: Props): ReactElement => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dd5m7qrpo",
    },
  });
  const userImage = cld.image((image === "" || image === null) ? "default_ewmi9t" : image);

  return (
    <div className={styles.userImageContainer} style={{width:`${size}px`,height:`${size}px`}}>
      <AdvancedImage cldImg={userImage} className={styles.user_image}/>
    </div>
  );
};
