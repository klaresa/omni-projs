import styles from './styles.module.scss';
import { signIn, useSession } from "next-auth/client";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe.js";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton ({ priceId } : SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;
    }

    // criacao do checkout session do stripe
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId }); //precisa ser um obj
    } catch (error) {
      console.log('deu ruim')
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
