import { SignInForm } from 'entities/user/ui';
import { WithProtection } from 'shared/store/HOCs';

export const SignInPage = WithProtection(() => {
  return <SignInForm />;
});
