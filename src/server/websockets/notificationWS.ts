import { Client } from "@stomp/stompjs";
import { stompClient } from "./stompClient"
import { NotificationModel } from "../../models";

export const connectToNotification = (onMessageReceived: (message: NotificationModel) => void) => {
    stompClient.onConnect = () => {
        console.log('✅ Connected to the WebSocket');

        stompClient.subscribe('/topic/notification', (notification) => {
            const message = JSON.parse(notification.body);
            console.log('✉️ Message received:', message);
            onMessageReceived(message); 
        });
    };

    stompClient.onStompError = (frame) => {
        console.log('❌ Stomp error: ', frame);
    };

    stompClient.activate();
};


export const Notify = (client: Client | null,concept: string) => {
    if(client){
        client.publish({
            destination: '/app/notification',
            body: JSON.stringify(concept)
        });
        console.log('Concept sent:',concept);
    }else{
        console.error('No connection to ws');
    }
}