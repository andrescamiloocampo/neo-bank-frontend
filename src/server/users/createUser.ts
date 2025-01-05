import { UserModel } from "../../models";
import { errorLogs } from "../../utils";

export const createUser = async(user:UserModel):Promise<UserModel | null> => {    
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type','application/json');

    try {
        const response = await fetch(`${import.meta.env.VITE_SPRING_BACKEND}/auth/register`,{
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