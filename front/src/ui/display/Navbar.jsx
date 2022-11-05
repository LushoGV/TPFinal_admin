import Routes from '../../models/routes';
import { useNavigate } from '../../Hooks';

const MenuItems = [
  { title: 'Alumnos', url: Routes.ALUMNOS },
  { title: 'Profesores', url: Routes.PROFESORES },
  { title: 'Materias', url: Routes.MATERIAS },
  { title: 'Examenes', url: Routes.EXAMENES },
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
