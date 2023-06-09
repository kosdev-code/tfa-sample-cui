import {
  createContext,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { Modal } from "antd";

interface VRContext {
  route: string;
  setRoute: React.Dispatch<SetStateAction<string>>;
  resetActiveTimer: () => void;
}

interface RouterProviderProps {
  position: "left" | "right";
  children: ReactNode;
}
export const VirtualRouterContext = createContext<VRContext>({
  route: "index",
  setRoute: () => "index",
  resetActiveTimer: () => 60000,
});

export const RouterProvider: React.FC<RouterProviderProps> = ({
  children,
  position,
}) => {
  const [route, setRoute] = useState<string>("index");
  const [stillActiveTime] = useState<number>(200 * 1000);
  const [redirectTime] = useState<number>(3 * 1000);

  const activeTimer = useRef(setTimeout(() => {}, 0));
  const redirectTimer = useRef(setTimeout(() => {}, 0));

  useEffect(() => {
    clearTimeout(activeTimer.current);
    clearTimeout(redirectTimer.current);
    if (route !== "index") {
      activeTimer.current = setTimeout(() => {
        warningModal();
      }, stillActiveTime);
    }
    return () => {
      clearTimeout(activeTimer.current);
      clearTimeout(redirectTimer.current);
    };
  }, [route]);

  const resetActiveTimer = (): void => {
    clearTimeout(activeTimer.current);
    clearTimeout(redirectTimer.current);
    if (route && route !== "index") {
      activeTimer.current = setTimeout(() => {
        // warningModal();
      }, stillActiveTime);
    }
  };

  const clearActiveTimers = (): void => {
    clearTimeout(activeTimer.current);
    clearTimeout(redirectTimer.current);
  };

  const warningModal = (): void => {
    const modal = Modal.warning({
      title: "Are you still there?",
      content: "You will be redirected to the home screen",
      wrapClassName: position === "left" ? "wrapperLeft" : "wrapperRight",
      onOk: resetActiveTimer,
      style:
        position === "left"
          ? {
              position: "absolute",
              top: "25%",
              left: "20%",
              width: "50%",
            }
          : {
              position: "absolute",
              top: "25%",
              left: "20%",
              width: "50%",
            },
      maskStyle:
        position === "left"
          ? {
              position: "absolute",
              right: "5%",
              width: "50%",
            }
          : {
              position: "absolute",
              left: "50%",
              width: "50%",
            },
    });
    redirectTimer.current = setTimeout(() => {
      clearActiveTimers();
      setRoute("index");
      modal.destroy();
    }, redirectTime);
  };

  return (
    <VirtualRouterContext.Provider
      value={{ route, setRoute, resetActiveTimer }}
    >
      {children}
    </VirtualRouterContext.Provider>
  );
};
