## Prerequisites

To make eslint errors visible in VSCode, you need to install the ESLint plugin: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

To make VSCode actually format our code on save according to our prettier configuration file, install VSCode's prettier plugin: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
## Getting started

```sh
# Install dependencies
yarn install
# Enable husky
yarn husky install
# Start dev server
yarn dev
```

### Configure webhooks

Stripe webhooks are used to sync data from Stripe to your Supabase database. To configure Stripe webhooks follow the steps:

- Add an endpoint on the [Test endpoints page](https://dashboard.stripe.com/test/webhooks).
- Then, set the endpoint URL to the URL of your application. E.g. `https://url-of-your-application/api/webhooks`.
- Select the events that you want to receive. The events handled by this app are:
  - `product.created`
  - `product.updated`
  - `product.deleted`
  - `price.created`
  - `price.updated`
  - `price.deleted`
  - `checkout.session.completed`
  - `customer.updated`
  - `customer.deleted`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Finally, copy the `Signing secret` - you'll need it in the next step.

### Set environment variables

To run the project, copy `.env.example` and make a copy called `.env.example` To securely interact with Stripe, add the following environment variable values for your application and the variable in the newly copied config:

- For production
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE`
  - `STRIPE_SECRET_KEY_LIVE`
  - `STRIPE_WEBHOOK_SECRET_LIVE`

### Test webhooks

To be sure that your application uses the latest environment variables, redeploy your application.

Then, send a `product.created` test event from your [Stripe test dashboard](https://dashboard.stripe.com/test/webhooks) by clicking the `Send test event` button. If everything is configured correctly, a test product will be created in your Supabase database.

If the configuration is working, delete the test products created via the webhook from your Supabase database.

### Create product and pricing information

To receive recurring payments from users via Stripe, you need to create your product and pricing information in your [Stripe Dashboard](https://dashboard.stripe.com/test/products). When you create or update your product and price information, the changes will automatically sync with your Supabase database.

For example, this kit has been set up to support 3 different products with 2 different prices (monthly/yearly) each.

E.g.:

- Product 1: Basic
  - Price 1: 19.99 USD per month
  - Price 2: 199.99 USD per year
- Product 2: Professional
  - Price 1: 24.99 USD per month
  - Price 2: 249.99 USD per year

You should set this up according to your business model and pricing structure.

Once you have configured your products and prices, add the price IDs to the `pricing.tsx` component. Now, you can start testing your Stripe checkout flow.

### Configure the Stripe customer portal

1. Set your business branding and identity in the [Stripe settings](https://dashboard.stripe.com/settings/branding)
2. Configure your [Customer Portal settings](https://dashboard.stripe.com/test/settings/billing/portal)
3. Toggle on "Allow customers to update their payment methods"
4. Toggle on "Allow customers to update subscriptions"
5. Toggle on "Allow customers to cancel subscriptions"
6. Add the products and prices according to your business model and pricing structure
7. Set up the required business information and links (e.g. terms and conditions, usage policy, etc.)

## Start blogging

`blog-data/metadata.ts` info is used for the SEO of your blog. To add blog posts simply add markdown files in the `blog-data/posts` directory. Check out the example blog post to see how a blog post can be structured. The blogging functionality has been adapted from this repository: [github.com/timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

- Tip 1: Install a spellchecker extension in your code editor to ensure your blog posts are spelling mistake-free
- Tip 2: Install a markdown extension in your code editor to help with markdown formatting and troubleshooting common markdown mistakes.

## Run this project locally

To run this project locally run the following commands in the root directory:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## Shipping to production

Optional step before deploying the project: run the `npm run lint` command to see possible warnings and errors in the application.

### Archive testing products

Before going live, archive all Stripe products created during testing and create your actual products and prices.

### Configure production environment variables

To run the project in live mode and process payments with Stripe, modify the environment variables from Stripe "test mode" to "production mode." After switching the variables, redeploy the application to ensure the latest environment variables are used.

To verify you are running in production mode, test checking out with the [Stripe test card](https://stripe.com/docs/testing). The test card should not work.

---

For the most recent changes check out the [Ship SaaS Changelog](https://shipsaas.com/changelog). If you have any suggestions or feedback to improve this kit and help you ship __EVEN__ faster, please reach out to me on Twitter (@nwbotha) or via email at nicolaasb@pm.me.
