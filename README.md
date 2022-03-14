# Ship SaaS starter kit

## Motivation

Congratulations on purchasing the Ship SaaS starter kit 🥳

This kit was designed with one goal in mind - helping you ship a SaaS without having to spend hours (possibly days) on writing boilerplate code and setting up integrations.

Supabase and Stripe integrations have already been implemented and allow you to get started with minimal configuration.

If you have any suggestions or feedback to improve this kit and help you ship __EVEN__ faster, please reach out to me on Twitter (@nwbotha) or via email at nicolaasb@pm.me.

## Getting started

Before you can run this project, you need a Supabase account ([supabase.io](https://supabase.io)) with an active project and a Stripe account ([stripe.com](https://stripe.com)) with a "business" account. It's free to sign up for both platforms.

## Configure Supabase

Once you have created your Supabase project, copy the Supabase URL, the anon public API key and the secret service role key and add it as environment variables for the application:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

To configure environment variables for this project rename the `.env.example` file in the root directory of this project to `.env.local` and modify the values in the file.

In the `sql` folder of this project you will find 6 SQL scripts, ordered 1 - 6. Run these scripts on your Supabase database from 1 - 6 to create the required tables, storage buckets and policies for this app. To run these scripts go to the SQL editor page (`https://app.supabase.io/project/{project_id}/editor/sql`) of your project on Supabase.

After you created the "avatars" storage bucket (with script 6) you should change the bucket's access to public. This can be done by navigating to the storage buckets page (`https://app.supabase.io/project/{project_id}/storage/buckets`), clicking on the options menu for the bucket, and then clicking "Make public".

## Configure Stripe

To test Stripe payments you need to configure your Stripe account to handle test payments. To complete the following steps, ensure that the "test mode" in Stripe is enabled.

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

To securely interact with Stripe, add the following environment variables for your application:

- For testing
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`

- For production
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE`
  - `STRIPE_SECRET_KEY_LIVE`
  - `STRIPE_WEBHOOK_SECRET_LIVE`

- For both testing and production (these settings will depend on your pricing structure)
  - `NEXT_PUBLIC_PRICE_BASIC_MONTHLY`
  - `NEXT_PUBLIC_PRICE_BASIC_YEARLY`
  - `NEXT_PUBLIC_PRICE_PRO_MONTHLY`
  - `NEXT_PUBLIC_PRICE_PRO_YEARLY`
  - `NEXT_PUBLIC_PRICE_MASTER_MONTHLY`
  - `NEXT_PUBLIC_PRICE_MASTER_YEARLY`

The first two keys can be found on the [API keys page](https://dashboard.stripe.com/test/apikeys) in Stripe. The `STRIPE_WEBHOOK_SECRET` value is the `Signing secret` you copied in the previous step.

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
- Product 3: Master
  - Price 1: 39.99 USD per month
  - Price 2: 399.99 USD per year

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

### You are ready to start shipping your SaaS

Now you are ready to start shipping your SaaS 🥳

## Styling

Tailwindcss is used for styling this application. You can read more about it in the official [Tailwindcss docs](https://tailwindcss.com/docs).

### Set primary color

Easily change the primary color of this application by changing the color on line 22 in the `tailwind.config.js` file.

```js:tailwind.config.js
  extend: {
    colors: {
      primary: colors.indigo // change this line to your primary color
    },
    ...
  }
```

## Start blogging

To use the statically generated blog, first customize the info and links in the `blog-data/metadata.ts` file. This info is used for the SEO of your blog. To add blog posts simply add markdown files in the `blog-data/posts` directory. Check out the example blog post to see how a blog post can be structured. The blogging functionality has been adapted from this repository: [github.com/timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

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

## External documentation

If you want to read the official documentation for NextJS, Supabase, Stripe, or Tailwindcss check out the links below:

- NextJS - [nextjs.org/docs](https://nextjs.org/docs)
- Supabase - [supabase.io/docs](https://supabase.io/docs)
- Stripe - [stripe.com/docs](https://stripe.com/docs)
- Tailwindcss - [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Shipping to production

Optional step before deploying the project: run the `npm run lint` command to see possible warnings and errors in the application.

### Archive testing products

Before going live, archive all Stripe products created during testing and create your actual products and prices.

### Configure production environment variables

To run the project in live mode and process payments with Stripe, modify the environment variables from Stripe "test mode" to "production mode." After switching the variables, redeploy the application to ensure the latest environment variables are used.

To verify you are running in production mode, test checking out with the [Stripe test card](https://stripe.com/docs/testing). The test card should not work.

---

For the most recent changes check out the [Ship SaaS Changelog](https://shipsaas.com/changelog). If you have any suggestions or feedback to improve this kit and help you ship __EVEN__ faster, please reach out to me on Twitter (@nwbotha) or via email at nicolaasb@pm.me.
