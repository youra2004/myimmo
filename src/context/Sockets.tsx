import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { AuthContext } from "./Auth";

export const SocketsContext = createContext<any>(null);

const socketEndpoint = "http://3.76.72.157/dossier";

type Props = {
  children: React.ReactElement;
};

const SocketsProvider = ({ children }: Props): ReactElement => {
  const [socket, setSocket] = useState<Socket>();
  const {
    state: { userToken },
  } = useContext(AuthContext);

  useEffect(() => {
    if (!userToken) socket?.disconnect();
  }, [userToken, socket]);

  useEffect(() => {
    if (!userToken) return;
    initSockets(userToken);
  }, [userToken]);

  useEffect(() => {
    if (!socket) return;
    socket.io.on("open", () => {
      console.log("socket opened in App");
    });
    socket.io.on("close", () => {
      console.log("socket closed in App");
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const socketsContext = useMemo(() => ({ socket }), [socket, userToken]);

  const initSockets = async (token: string) => {
    const Authorization = `Bearer ${token}`;
    const socket = io(socketEndpoint, {
      extraHeaders: { Authorization },
    });
    setSocket(socket);
  };

  return (
    <SocketsContext.Provider value={socketsContext}>
      {children}
    </SocketsContext.Provider>
  );
};

export default SocketsProvider;
