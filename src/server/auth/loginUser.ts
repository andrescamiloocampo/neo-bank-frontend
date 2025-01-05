import { errorLogs } from "../../utils/errors";

interface LoginResponseM {
    message: string;
    token: string;
    username: string;
}

export const loginUser = async(username:string,password:string):Promise<LoginResponseM | null> => {
    const body = JSON.stringify({username,password});    
    const headers = new Headers();
    headers.append('Content-Type','application/json');

    try {
        const response = await fetch(`${import.meta.env.VITE_SPRING_BACKEND}/auth/login`,{
            method: 'POST',
            headers,
            body
        });
        
        if(!response.ok)
            return null;

        return await response.json();
    } catch (error) {
        throw new Error(`${errorLogs[0].message,error}`)
    }
}