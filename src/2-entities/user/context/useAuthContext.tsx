import {
  createContext,
  useContext,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import type { TAuthUser } from '../model';
import { useApiContext } from 'shared/context';

type AuthContextType = {
  profile?: TAuthUser;
  setProfile: (profile: TAuthUser, token: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  setProfile: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<TAuthUser | undefined>();
  const { login } = useApiContext();
  const contextValue = useMemo(
    () => ({
      setProfile: (profile: TAuthUser, token: string) => {
        setProfile(profile);
        login(token);
      },
      profile,
    }),
    [profile, login],
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
