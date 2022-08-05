import {NextApiRequest, NextApiResponse} from "next";
import {stripe} from "../../services/stripe";
import {getSession} from "next-auth/client";
import {fauna} from "../../services/fauna";
import {query as q} from 'faunadb';

type User = {
  ref: {
    id: string;

  }
  data: {
    stripe_customer_id: string;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

  // para criacao se usa POST
  if (req.method === 'POST') {

    // pega a sessao
    const session = await getSession({ req });

    // pega o usuario da sessão
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    );

    // verifica se o usuario existe
    let customerId = user.data.stripe_customer_id;

    // se ele n existir, cria um novo customer
    if (!customerId) {

      // pega o email autenticado via NextAuth do cliente nos cookies de sessao e cria o customer
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
        // metadata
      });

      // guarda essa informação no FaunaDb
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: { stripe_customer_id: stripeCustomer.id }
          }
        )
      )

      // e faco a atribuicao da var customerId
      customerId = stripeCustomer.id;
    }

    // do usuario criado se cria uma checkoutSession
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
          { price: 'price_1J3tEcDCf9QDNBOln0UMhV1n', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    });

    // retorna a requisicao o id do usuario no stripe
    return res.status(200).json({ sessionId: stripeCheckoutSession.id });

  } else {
    // se nao for POST entao envie uma explicacao para o front
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}

