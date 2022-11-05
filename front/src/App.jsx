import { BrowserRouter, Route, Routes as RRoutes } from 'react-router-dom';

import { Routes } from './models';
import { Home, Alumnos } from './pages';
import { Layout } from './ui';

const App = () => {
  return (
    <BrowserRouter>
      <RRoutes>
        <Route element={<Layout />}>
          <Route element={<Home />} path={Routes.HOME} />
          <Route element={<Alumnos />} path={Routes.ALUMNOS} />
        </Route>
      </RRoutes>
    </BrowserRouter>
  );
};

export default App;
