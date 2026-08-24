import { SignUpForm } from 'entities/user/SignUpForm';
import { WithProtection } from '../../../1-shared/store/HOCs/WithProtection';

export const SignUpPage = WithProtection(() => {
  return <SignUpForm />;
});
