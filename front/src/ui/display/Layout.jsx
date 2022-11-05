import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="text-gray-700">
      <Navbar />
      <div className="max-w-6xl  m-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
