import React, { ReactNode, createContext, useContext, useState } from "react";

// Define the type for the chat message
type ChatMessage = {
    id: string; // Unique identifier for each message
    sender: string; // Sender's identifier or name
    message: string; // The chat message content
    timestamp: Date; // Timestamp of the message
};

// Define the type for the context state and updater function
interface LoraAdaptorChatRoomContextType {
    messages: ChatMessage[];
    addMessage: (newMessage: ChatMessage) => void;
}

// Creating the context with an undefined default value. This will be overwritten by the Provider.
const LoraAdaptorChatRoomContext = createContext<
    LoraAdaptorChatRoomContextType | undefined
>(undefined);

// Define the Provider component
export const LoraAdaptorChatRoomProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // Function to add a new message to the chat
    const addMessage = (newMessage: ChatMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <LoraAdaptorChatRoomContext.Provider value={{ messages, addMessage }}>
            {children}
        </LoraAdaptorChatRoomContext.Provider>
    );
};

// Custom hook to use the context
export const useLoraAdaptorChatRoom = () => {
    const context = useContext(LoraAdaptorChatRoomContext);
    if (context === undefined) {
        throw new Error(
            "useLoraAdaptorChatRoom must be used within a LoraAdaptorChatRoomProvider"
        );
    }
    return context;
};
