import React, { useState} from "react";

//Note: this is custom service hook, it is used for displaying alert messages to user,
//since react will keep repainting components according to its internal logic,
//alert messages may not be visible at correct moment or may get lost during repainting cycle of react,
//this hook ensures that such cases don't happen
export const useServices = () => {

	const [message, setMessage] = useState(null);
	const [level, setLevel] = useState(null);

	const broadcastMessage = (messageBroadcast, messageLevel) => {
		setMessage(messageBroadcast);
		setLevel(messageLevel);
	};

	return {
		ServicesCtx,
		ServicesProvider: ({ children }) => (
			<ServicesCtx.Provider value={{ message, level, broadcastMessage }}>
				{children}
			</ServicesCtx.Provider>
		)
	};
};

export const ServicesCtx = React.createContext({
	broadcastMessage: () => {}
});

export default useServices;