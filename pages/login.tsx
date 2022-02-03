import React from 'react';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { GetServerSideProps } from 'next';

interface ILoginProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const Login = ({ providers }: ILoginProps) => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-black to-[#18d860]/10">
    <img
      className="mb-12 h-32 w-32 md:mb-16 md:h-40 md:w-40"
      src="https://links.papareact.com/9xl"
      alt="Spotify logo"
    />
    <h1 className="mb-2 text-2xl font-bold uppercase tracking-wider text-[#18d860] md:text-4xl">
      Spotify player
    </h1>
    <h2 className="mb-12 text-lg tracking-wider text-gray-300 md:mb-16 md:text-2xl">
      by{' '}
      <a className="hover:underline" href="https://novaco.dev" target="_blank">
        novaco
      </a>
    </h2>
    {providers &&
      Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-full bg-[#18d860] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#0fc053] md:px-8 md:py-4 md:text-base"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
  </div>
);

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
