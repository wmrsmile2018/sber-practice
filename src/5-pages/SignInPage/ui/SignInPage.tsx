import { WithProtection } from '../../../1-shared/store/HOCs/WithProtection';
import { SignInForm } from '../../../2-entities/user/SignInForm';

export const SignInPage = WithProtection(() => {
  return <SignInForm />;
});
