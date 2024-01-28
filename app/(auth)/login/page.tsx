import type { Metadata, NextPage } from 'next';
import LoginCard from './components/LoginCard';

export const metaData: Metadata = {
  title: 'Login',
};

const Login: NextPage = () => {
  return <LoginCard />;
};

export default Login;
