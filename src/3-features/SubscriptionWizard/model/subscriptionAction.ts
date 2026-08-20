export type SubscriptionState = 'pending' | 'success' | 'error';

const DELAY = 1000;
const ERROR_CHANCE = 0.3;

export const submitSubscription = async (
  email: string,
): Promise<{ email: string } | void> => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < ERROR_CHANCE) {
        reject(new Error('Не удалось подписаться. Попробуйте позже.'));
      } else {
        resolve({ email });
      }
    }, DELAY);
  });
};

export const subscriptionAction = async (
  _prev: SubscriptionState,
  formData: FormData,
): Promise<SubscriptionState> => {
  const email = formData.get('email') as string;
  try {
    await submitSubscription(email);
    return 'success';
  } catch {
    return 'error';
  }
};
