import { WithProtection } from '../../../1-shared/store/HOCs/WithProtection';
import { SignUpForm } from '../../../widgets/SignUpForm';

export const SignUpPage = WithProtection(() => {
  return <SignUpForm />;
});
