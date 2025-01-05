interface SessionModel{ 
    user:{
        token: string | null;
        username: string | null;
    }
}

export const getSession = ():SessionModel => {
    return {
        user:{
            token: sessionStorage.getItem('JWT_TOKEN') ?? null,
            username: sessionStorage.getItem('username') ?? null
        }
    }   
}

export const resetSession = ():void => {
    sessionStorage.clear();
}