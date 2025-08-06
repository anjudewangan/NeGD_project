import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { io } from 'socket.io-client';
import { callReducer, initialCallState } from 'reducers/activeCallReducer';
import { useAuth } from './AuthProvider';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(callReducer, initialCallState);
  const { token, user} = useAuth()

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SERVER_URL}/agent`, {
      extraHeaders: {
        token,
      },
    });

    socket.on('connect', () => {
      console.log('🔌 Connected to /agent namespace');
    });

    socket.on("callUpdate", (data) => {
      if (data?.client === null && state.activeCall !== null) {
        dispatch({ type: "CLEAR_CALL" });
      } else {
        dispatch({ type: "UPDATE_CALL", payload: data });
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket');
      dispatch({ type: 'CLEAR_CALL' });
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ callState: state }}>
      {children}
    </SocketContext.Provider>
  );
};