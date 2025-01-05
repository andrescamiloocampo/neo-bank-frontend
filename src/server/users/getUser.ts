import { errorLogs } from "../../utils/errors";

export const getUser = async(username:string) => {
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    try {
        const response = await fetch(`${import.meta.env.VITE_SPRING_BACKEND}/user/getUser?username=${username}`,{
            method: 'GET',
            headers
        });
        if(!response.ok)
            throw new Error(errorLogs[1].message);
        return await response.json();
    } catch (error) {
        throw new Error(`${errorLogs[0].message,error}`)
    }
}