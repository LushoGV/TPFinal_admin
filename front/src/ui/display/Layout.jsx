import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="text-gray-700">
      <Navbar />
      <div className="max-w-7xl px-6 m-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
