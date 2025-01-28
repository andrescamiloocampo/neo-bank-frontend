import { errorLogs } from "../../utils";

export const UpdateUserPhoto = async(userImage:string,username:string):Promise<void> => {

    const headers = new Headers();
    headers.append('Content-Type','application/json');

    try {
        const response = await fetch(`${import.meta.env.VITE_SPRING_BACKEND}/user/updateUserImage?userImage=${userImage}&username=${username}`,{
            method: 'PUT',
            headers            
        });
        if(!response.ok)
            throw new Error(errorLogs[1].message);
        const resp = await response.json();
        console.log('Response:',resp);
    } catch (error) {
        console.error('Network error:', error);
        throw new Error(`${(errorLogs[0].message, error)}`);
    }
}