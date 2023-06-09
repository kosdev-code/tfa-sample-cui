import { PropsWithChildren, createContext, useContext } from "react";
import { FosSelectAndPourModel } from "../models/fos-select-and-pour";
import { useFosSelectAndPour } from "../hooks/fos-select-and-pour/use-fos-select-and-pour";

export const FosSelectAndPourContext = createContext<
  FosSelectAndPourModel | undefined
>(undefined);

export const useFosSelectAndPourContext = () => {
  const context = useContext(FosSelectAndPourContext);
  if (context === undefined) {
    throw new Error(
      "useFosSelectAndPourContext must be used within a FosSelectAndPourProvider"
    );
  }
  return context;
};
export const FosSelectAndPourProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { model, status, KosModelLoader } = useFosSelectAndPour();
  return (
    <FosSelectAndPourContext.Provider value={model}>
      <KosModelLoader {...status}>{children}</KosModelLoader>
    </FosSelectAndPourContext.Provider>
  );
};
