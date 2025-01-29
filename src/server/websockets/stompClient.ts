import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
    brokerURL: `${import.meta.env.VITE_SPRING_WS}/socket-server`,
    reconnectDelay: 5000,
    debug: (str) => console.log(str),
});