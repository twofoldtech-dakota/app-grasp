import Link from 'next/link';
import Image from 'next/image';
import Pricing from '@/components/pricing';
import { PageSEO } from '@/components/seo';

export default function Home() {
  return (
    <>
      <PageSEO
        title='Ship SaaS Demo'
        description='Use this template to build your SaaS in no time.'
      />

      {/* Hero section */}
      <section className='py-10 lg:py-24 bg-gradient-to-r from-primary-500 to-primary-700'>
        <div className='container mx-auto px-6 flex flex-col-reverse lg:flex-row justify-between items-center'>
          <div className='flex-1 text-center lg:text-left'>
            <h2 className='text-5xl font-bold mb-2 text-white text-center lg:text-left'>
              This is a demo landing page
            </h2>
            <h3 className='text-2xl mb-8 text-gray-200 text-center lg:text-left'>
              Use this template to build your SaaS in no time.
            </h3>
            <Link href='/pricing'>
              <a className='bg-white text-black font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider'>
                Get started
              </a>
            </Link>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <Image
              alt='hero image'
              width='521'
              height='450'
              src='/images/hero.png'
              className='p-8 lg:p-0'
            />
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className='container mx-auto px-6 py-10'>
        <h2 className='text-4xl font-bold text-center mb-12'>
          Features
        </h2>

        <div className='flex flex-col-reverse lg:flex-row items-center mb-16'>
          <div className='flex-1 text-center lg:text-left'>
            <h4 className='text-3xl font-bold mb-3'>
              Create stuff
            </h4>
            <p className='text-gray-600 dark:text-gray-200 mb-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <Image
              alt='alt tag for image'
              src='/images/sync.svg'
              height='224'
              width='224'
            />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row items-center mb-16'>
          <div className='flex flex-1 justify-center items-center'>
            <Image
              alt='alt tag for image'
              src='/images/laptop.svg'
              height='224'
              width='224'
            />
          </div>
          <div className='flex-1 text-center lg:text-left'>
            <h4 className='text-3xl font-bold mb-3'>
              Build stuff
            </h4>
            <p className='text-gray-600 dark:text-gray-200 mb-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <div className='flex flex-col-reverse lg:flex-row items-center mb-16'>
          <div className='flex-1 text-center lg:text-left'>
            <h4 className='text-3xl font-bold mb-3'>
              Ship stuff
            </h4>
            <p className='text-gray-600 dark:text-gray-200 mb-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <Image
              alt='alt tag for image'
              src='/images/internet.svg'
              height='224'
              width='224'
            />
          </div>
        </div>
      </section>

      {/* Social proof section */}
      <section className='bg-gray-100'>
        <div className='container mx-auto px-6 py-20'>
          <h2 className="text-4xl font-bold text-black text-center mb-8">
            Testimonials
          </h2>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-2 mb-4">
              <div className="bg-white rounded shadow py-2">
                <div className='flex justify-center items-center mb-4'>
                  <Image
                    alt='reviewer 1'
                    src='/images/face-1.jpg'
                    className='rounded-full'
                    height='64'
                    width='64'
                  />
                </div>
                <div>
                  <p className="text-gray-800 text-base px-6 mb-5">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">
                    Hannah Fleming
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4">
              <div className="bg-white rounded shadow py-2">
                <div className='flex justify-center items-center mb-4'>
                  <Image
                    alt='reviewer 2'
                    src='/images/face-2.jpg'
                    className='rounded-full'
                    height='64'
                    width='64'
                  />
                </div>
                <div>
                  <p className="text-gray-800 text-base px-6 mb-5">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                    sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                    adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
                    magnam aliquam quaerat voluptatem.
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">
                    Jane Doe
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2 mb-4">
              <div className="bg-white rounded shadow py-2">
                <div className='flex justify-center items-center mb-4'>
                  <Image
                    alt='reviewer 3'
                    src='/images/face-3.jpg'
                    className='rounded-full'
                    height='64'
                    width='64'
                  />
                </div>
                <div>
                  <p className="text-gray-800 text-base px-6 mb-5">
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">
                    Dean Dunning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / feature comparison section */}
      <section className="py-10">
        <Pricing />
      </section>

      {/* Big call to action */}
      <section className='bg-gradient-to-r from-primary-500 to-primary-700'>
        <div className="container mx-auto px-6 text-center py-20">
          <h2 className="mb-6 text-4xl font-bold text-center text-white">
            Start building today
          </h2>
          <h3 className="my-4 text-2xl text-white">
            You don't want to miss this opportunity!
          </h3>
          <div className='mt-6'>
            <Link href='/pricing'>
              <a className="bg-white text-black font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
                Get started
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className='py-10 bg-gray-100 dark:bg-gray-900'>
        <div className="container mx-auto px-6 py-20">
          <h2 className="mb-6 text-4xl font-bold text-center">
            Frequently asked questions
          </h2>

          <details className="font-medium rounded-lg text-lg px-2 py-3 flex flex-row-reverse mt-2 mb-4 cursor-pointer bg-white dark:bg-gray-600">
            <summary className="flex-auto px-4">How much does it cost?</summary>
            <div className="px-6 mt-4">
              <p className="pt-4 pb-2 border-t border-solid border-gray-300">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
                quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
                nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
            </div>
          </details>

          <details className="font-medium rounded-lg text-lg px-2 py-3 flex flex-row-reverse mt-2 mb-4 cursor-pointer bg-white dark:bg-gray-600">
            <summary className="flex-auto px-4">Can I use this product without signing up?</summary>
            <div className="px-6 mt-4">
              <p className="pt-4 pb-2 border-t border-solid border-gray-300">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
                quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
                nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
            </div>
          </details>

          <details className="font-medium rounded-lg text-lg px-2 py-3 flex flex-row-reverse mt-2 mb-4 cursor-pointer bg-white dark:bg-gray-600">
            <summary className="flex-auto px-4">Do you have 24/7 support?</summary>
            <div className="px-6 mt-4">
              <p className="pt-4 pb-2 border-t border-solid border-gray-300">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
                quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
                nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
