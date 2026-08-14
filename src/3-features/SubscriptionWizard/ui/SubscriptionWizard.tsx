import { memo, useActionState } from 'react';
import { FormField } from 'shared/ui-kit';
import { subscriptionAction } from '../model/subscriptionAction';
import styles from './SubscriptionWizard.module.css';

const SUBMIT_LABEL = 'Подписаться';

export const SubscriptionWizard = memo(() => {
  const [state, formAction, pending] = useActionState(
    subscriptionAction,
    'pending',
  );

  const handleBack = () => {
    window.location.reload();
  };

  if (state === 'success') {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Подписка оформлена!</h2>
          <p className={styles.successText}>
            Мы отправили письмо для подтверждения на вашу почту.
          </p>
          <button className={styles.backButton} onClick={handleBack}>
            Вернуться
          </button>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={styles.container}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>✕</div>
          <h2 className={styles.errorTitle}>Ошибка подписки</h2>
          <p className={styles.errorText}>
            Не удалось подписаться. Пожалуйста, попробуйте ещё раз.
          </p>
          <div className={styles.errorActions}>
            <button className={styles.retryButton} onClick={handleBack}>
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wizardCard}>
        <div className={styles.wizardHeader}>
          <div className={`${styles.stepIndicator} ${styles.stepActive}`}>
            <span className={styles.stepNumber}>1</span>
            <span className={styles.stepLabel}>Email</span>
          </div>
          <div className={styles.stepConnector} />
          <div className={`${styles.stepIndicator} ${styles.stepInactive}`}>
            <span className={styles.stepNumber}>2</span>
            <span className={styles.stepLabel}>Подтверждение</span>
          </div>
        </div>

        <form action={formAction} className={styles.wizardForm}>
          <FormField label='Email' name='email' error={undefined}>
            <input
              type='email'
              name='email'
              className={styles.input}
              placeholder='your@email.com'
              required
              disabled={pending}
            />
          </FormField>

          <button
            type='submit'
            className={`${styles.submitButton}`}
            disabled={pending}
          >
            {pending ? 'Отправка...' : SUBMIT_LABEL}
          </button>
        </form>
      </div>
    </div>
  );
});
