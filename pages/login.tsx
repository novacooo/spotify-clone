import React from 'react';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { GetServerSideProps } from 'next';

interface ILoginProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const Login = ({ providers }: ILoginProps) => (
  <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
    <img className="mb-14 w-52" src="https://links.papareact.com/9xl" alt="Spotify logo" />
    {providers &&
      Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-full bg-[#18D860] px-8 py-4 font-bold uppercase tracking-widest text-white hover:bg-[#0fc053]"
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
