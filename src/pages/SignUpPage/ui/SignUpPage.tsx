import { WithProtection } from '../../../1-shared/store/HOCs/WithProtection';
import { SignUpForm } from '../../../4-widgets/SignUpForm';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
