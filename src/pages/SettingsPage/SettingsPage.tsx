import { ReactElement, useState } from "react";
import styles from "./SettingsPage.module.css";
import useUserStore from "../../store/user/userStore";
import UploadWidget from "../../components/Atoms/UploadWidget/UploadWidget";
import { ImagePlacement } from "../../components/Atoms/ImagePlacement/ImagePlacement";
import { FaRegEdit } from "react-icons/fa";
import { BiShow,BiHide } from "react-icons/bi";

export default function SettingsPage(): ReactElement {
  
  const user = useUserStore((state) => state.user);
  const [showPassword,setShowPassword] = useState<boolean>(false);

  return (
    <div className={styles.settingsPageContainer}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.userInfoContainer}>
    
        <ImagePlacement image={user?.userImage}/>
        
        <div className={styles.userInfo}>
          <p className={styles.username}>{user?.username}</p>
          <p className={styles.user_id}>{user?.id}</p>
        </div>
      </div>
        <UploadWidget/>      


      <div className={styles.user_content}>
          <div className={styles.user_stat}>
            <div className={styles.stats}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={user?.email}/>
            </div>            
            <div className={styles.controls}>
              <FaRegEdit size={20} className={styles.control}/>
            </div>
          </div>

          <div className={styles.user_stat}>
            <div className={styles.stats}>
              <label htmlFor="password">Password</label>
              <input id="password" type={showPassword ? "text":"password"} value={user?.password} disabled/>
            </div>
            <div className={styles.controls}>
              <FaRegEdit size={20} className={styles.control}/>          
              <div className={styles.control} onClick={()=>setShowPassword(!showPassword)}>
                {showPassword == true ? (
                  <BiShow size={22} />                                            
                ):(
                  <BiHide size={22} />
                )

              }
                
              </div>
            </div>
          </div>
      </div>

    </div>
  );
}
