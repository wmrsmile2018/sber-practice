import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type FC,
  type PropsWithChildren,
} from 'react';
import type { TAuthUser } from '../model';
import { useApiContext } from 'shared/context';
import { myProfileApiConfig } from 'shared/api';

type AuthContextType = {
  profile?: TAuthUser;
  setProfile: (profile: TAuthUser, token: string) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  setProfile: () => {},
  isLoading: false,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<TAuthUser | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { login, getEntity, getToken } = useApiContext();

  useEffect(() => {
    const token = getToken();
    if (token) {
      login(token);

      getEntity(myProfileApiConfig.path)
        .then((response) => {
          setProfile(response as TAuthUser);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [getEntity, getToken, login]);

  const contextValue = useMemo(
    () => ({
      setProfile: (profile: TAuthUser, token: string) => {
        setProfile(profile);
        login(token);
      },
      profile,
      isLoading,
    }),
    [profile, isLoading, login],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuthContext должен использоваться только внутри AuthProvider',
    );
  }

  return context;
};
