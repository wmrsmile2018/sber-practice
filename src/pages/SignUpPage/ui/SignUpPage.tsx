import { SignUpForm } from 'entities/user/ui';
import { WithProtection } from 'shared/store/HOCs';

export const SignUpPage = WithProtection(() => {
  return <SignUpForm />;
});
