import { useEffect, useRef } from "react";
import { UpdateUserPhoto } from "../../../server";
import useUserStore from "../../../store/user/userStore";

export default function UploadWidget() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const user = useUserStore(state => state.user);

  useEffect(() => {

    const fetchData = async(userPhoto:string,username:string) =>{
        await UpdateUserPhoto(userPhoto,username);
    }

    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dd5m7qrpo",
        uploadPreset: "ml_default"      
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          fetchData(result.info.display_name,user?.username ?? '');
        }
      }
    );
  }, []);

  return <button onClick={() => widgetRef.current.open()}>Upload</button>;
}
