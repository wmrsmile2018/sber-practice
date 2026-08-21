import { WithProtection } from '../../../1-shared/store/HOCs/WithProtection';
import { SignInForm } from '../../../4-widgets/SignInForm';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
