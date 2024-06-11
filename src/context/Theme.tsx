import { createContext, useMemo, useReducer } from "react";
import { ActionMap } from "../types/auth";

export const ThemeContext = createContext<any>(null);

interface ThemeState {
  statusBarBackground: string;
}

const themeInitState: ThemeState = {
  statusBarBackground: "#fff",
};

export const SET_STATUS_BAR_BACKGROUND = "SET_STATUS_BAR_BACKGROUND";

export type ThemeActionTypes = {
  [SET_STATUS_BAR_BACKGROUND]: {
    statusBarBackground: string;
  };
};

const ThemeReducer = (
  prevState: ThemeState,
  action: ActionMap<ThemeActionTypes>[keyof ActionMap<ThemeActionTypes>]
): ThemeState => {
  switch (action.type) {
    case "SET_STATUS_BAR_BACKGROUND":
      return {
        ...prevState,
        statusBarBackground: action.payload.statusBarBackground,
      };
  }
};

type Props = {
  children: React.ReactElement;
};

const ThemeProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(ThemeReducer, themeInitState);

  const themeContext = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
