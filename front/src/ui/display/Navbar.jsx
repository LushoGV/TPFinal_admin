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

  return (
    <div className="max-w-6xl m-auto flex">
      <p className="flex-1">Testing</p>

      <div>
        {MenuItems.map((item) => (
          <button
            key={item.title}
            className={'mx-2'}
            onClick={() => go(item.url)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
