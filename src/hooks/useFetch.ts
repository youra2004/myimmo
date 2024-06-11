import {
  useEffect,
  useState,
  useRef,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";

export interface FetchState<T> {
  status: "idle" | "pending" | "rejected" | "resolved";
  data: T | null;
  error: boolean | null;
}

export interface FetchFlags<T> {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  run: (promise: Promise<Response>) => Promise<void>;
  setState: Dispatch<SetStateAction<FetchState<T>>>;
}

const defaultInitialState: FetchState<null> = {
  status: "idle",
  data: null,
  error: null,
};

export const useFetch = <T>(
  initialState?: Partial<FetchState<T>>
): FetchState<T> & FetchFlags<T> => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<FetchState<T>>({
    ...defaultInitialState,
    ...initialState,
  });

  useEffect(() => {
    isCurrent.current = true;
    return () => {
      isCurrent.current = false;
    };
  }, []);

  const run = useCallback(
    (promise: Promise<Response>) => {
      setState((state) => ({
        ...state,
        status: "pending",
      }));
      let status: number;
      return promise
        .then((response: Response) => {
          status = response.status;
          return response.json();
        })
        .then((json) => (status === 200 ? json : Promise.reject(json)))
        .then(
          (data) => {
            isCurrent.current &&
              setState((state) => ({
                ...state,
                data,
                status: "resolved",
              }));
          },
          (error) => {
            setState((state) => ({
              ...state,
              error: error?.message,
              status: "rejected",
            }));
          }
        );
    },
    [setState]
  );

  const { data, status, error } = state;

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    data,
    status,
    error,
    run,
    setState,
  };
};
