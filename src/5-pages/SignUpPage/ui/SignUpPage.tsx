import { SignUpForm } from 'entities/user';
import { WithProtection } from 'shared/store/HOCs';

export const SignUpPage = WithProtection(() => {
  return <SignUpForm />;
});
