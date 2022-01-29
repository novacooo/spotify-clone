import React from 'react';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

interface ILoginProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const Login = ({ providers }: ILoginProps) => (
  <div>
    <img className="mb-5 w-52" src="https://links.papareact.com/9xl" alt="Spotify logo" />
  </div>
);

export default Login;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
