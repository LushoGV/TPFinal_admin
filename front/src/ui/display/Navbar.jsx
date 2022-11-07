import { useLocation } from 'react-router-dom';

import { PartialRoutes, Routes } from '../../models';
import { useNavigate } from '../../Hooks';

const MenuItems = [
  { title: 'Alumnos', url: `${Routes.VIEWS}/${PartialRoutes.ALUMNOS}` },
  { title: 'Profesores', url: `${Routes.VIEWS}/${PartialRoutes.PROFESORES}` },
  { title: 'Materias', url: `${Routes.VIEWS}/${PartialRoutes.MATERIAS}` },
  { title: 'Examenes', url: `${Routes.VIEWS}/${PartialRoutes.EXAMENES}` },
];

const Navbar = () => {
  const { go } = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="border-b-2">
      <div className="p-6 m-auto max-w-7xl flex">
        <p className="flex-1 text-2xl font-semibold">
          Planificador de Exámenes
        </p>
        <div className="flex items-center">
          {MenuItems.map((item) => (
            <button
              key={item.title}
              className={`mx-2 text-lg hover:underline
                ${pathname === `/${item.url}` && 'underline'}
              `}
              onClick={() => go(item.url)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
