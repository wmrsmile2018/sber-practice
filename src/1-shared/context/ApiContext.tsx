import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { AUTH_TOKEN_KEY } from '../constants/apiConfig';
import { baseApi } from '../api/baseApi';

type ApiContextType = {
  getToken: () => string | undefined;
  isAuthorized: boolean;
  login: (token: string) => void;
  logout: VoidFunction;

  getEntity: <T extends {} = {}>(
    endpoint: string,
    options?: RequestInit,
  ) => Promise<T>;
  mutateEntity: <T extends {} = {}>(
    enpoint: string,
    options?: RequestInit,
  ) => Promise<T>;
};

export const ApiContext = createContext<ApiContextType>({
  isAuthorized: false,
  login: () => {},
  logout: () => {},
  getToken: () => {},
  getEntity: <T extends {} = {}>() => Promise.resolve({} as T),
  mutateEntity: <T extends {} = {}>() => Promise.resolve({} as T),
});

export const ApiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setAuthToken] = useState('');

  const getToken = useCallback(() => {
    return authToken;
  }, [authToken]);

  const setToken = useCallback((token: string) => {
    setAuthToken(token);
  }, []);

  const login = useCallback((token: string) => {
    setAuthToken(token);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }, []);

  const logout = useCallback(() => {
    setAuthToken('');
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const getEntity = useCallback(
    (endpoint: string, options?: RequestInit) => {
      return baseApi({
        endpoint,
        options: {
          ...options,
          method: 'GET',
          headers: authToken
            ? { Authorization: `Bearer ${authToken}` }
            : undefined,
        },
      });
    },
    [authToken],
  );

  const mutateEntity = useCallback(
    (endpoint: string, options?: RequestInit) => {
      return baseApi({
        endpoint,
        options: {
          ...options,
          method: 'POST',
          headers: authToken
            ? { Authorization: `Bearer ${authToken}` }
            : undefined,
        },
      });
    },
    [authToken],
  );

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const contextValue: ApiContextType = useMemo(
    () => ({
      getToken,
      setToken,
      getEntity,
      mutateEntity,
      isAuthorized: !!authToken,
      login,
      logout,
    }),
    [authToken, getEntity, getToken, login, logout, mutateEntity, setToken],
  );

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error(
      'useApiContext должен использоваться только внутри ApiProvider',
    );
  }

  return context;
};
