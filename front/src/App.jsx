import { BrowserRouter, Route, Routes as RRoutes } from 'react-router-dom';

import { Routes } from './models';
import { Home, Views } from './pages';
import { Layout } from './ui';

const App = () => {
  return (
    <BrowserRouter>
      <RRoutes>
        <Route element={<Layout />}>
          <Route element={<Home />} path={'/'} />
          <Route element={<Views />} path={`${Routes.VIEWS}/:view`} />
        </Route>
        <Route element={<p>404</p>} path={'*'} />
      </RRoutes>
    </BrowserRouter>
  );
};

export default App;
