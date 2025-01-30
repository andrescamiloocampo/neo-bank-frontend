import { Client } from "@stomp/stompjs";
import { stompClient } from "./stompClient"
import { NotificationModel } from "../../models";

interface ConnectProps{
    username: string;
    onMessageReceived: (message: NotificationModel) => void;
}

export const connectToNotifications = ({username,onMessageReceived}:ConnectProps) => {
    stompClient.onConnect = () => {
        console.log(`✅ ${username} Connected to the WebSocket`);
        stompClient.subscribe(`/user/${username}/queue/notifications`,(notification)=>{
            const message = JSON.parse(notification.body);
            console.log('✉️ Personal notification received',message);
            onMessageReceived(message);
        });
    };

    stompClient.onStompError = (frame) => {
        console.log('❌ Stomp error ',frame);
    };

    stompClient.connectHeaders = {
        username: username,
    }

    stompClient.activate();
}

export const transactionNotification = (client: Client | null,senderUsername: string,receiverUsername: string,amount: string) => {
    if(client){
        client.publish({
            destination:'/app/transaction-notification',
            body: JSON.stringify({
                senderUsername,
                receiverUsername,
                amount
            })
        });
        console.log('Transaction notification sent:',{senderUsername,receiverUsername,amount});
    }else{
        console.error('No connection to ws');
    }
}


export const Notify = (client: Client | null,concept: string) => {
    if(client){
        client.publish({
            destination: '/app/notification',
            body: concept
        });
        console.log('Concept sent:',concept);
    }else{
        console.error('No connection to ws');
    }
}

export const PrivateNotify = (client: Client | null,concept: string,userIds: string[]) => {
    if(client){
        client.publish({
            destination:'/app/notification/group',
            body: JSON.stringify({
                concept,
                userIds
            })
        });
        console.log('Notification sent:',{concept,userIds});
    }else{
        console.error('No connection to ws');
    }
}

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