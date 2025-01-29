import { Client } from "@stomp/stompjs";

import { stompClient } from "./stompClient";

export const connectToGreet = () => {

    stompClient.onConnect = () => {
        console.log('✅ Connected to the WebSocket');

        stompClient.subscribe('/topic/greetings',(message)=>{
            console.log('✉️ Message received on the server',JSON.parse(message.body));
        });
    }

    stompClient.onStompError = (frame) => {
        console.log('❌ Stomp error: ',frame);
    }

    stompClient.activate();
}

export const sendMessage = (client: Client | null,name: string) => {
    if(client){
        const message = {name};
        client.publish({
            destination: '/app/hello',
            body: JSON.stringify(message)
        });
        console.log('📨 Message sent:',message);        
    }else{
        console.error('⚠️ No conection to WebSocket');
    }
}