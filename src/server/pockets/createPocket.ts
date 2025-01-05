import type { PocketModel } from "../../models/User.model"
import { errorLogs } from "../../utils";

export const createPocket = async(pocket:PocketModel,balanceId: string):Promise<PocketModel | null> => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
        const response = await fetch(`${import.meta.env.VITE_SPRING_BACKEND}/pocket/create`,{
            method: "POST",
            headers,
            body: JSON.stringify({ ...pocket, balance:{id: balanceId} })
        });

        if(!response.ok)
            throw new Error(errorLogs[1].message);
        return await response.json();    
    } catch (error) {
        throw new Error(`${errorLogs[0].message,error}`)
    }
}