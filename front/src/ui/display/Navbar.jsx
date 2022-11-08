import { useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { PartialRoutes, Routes } from '../../models';
import Link from '../controls/LInk';

const MenuItems = [
  { title: 'Home', url: `/` },
  { title: 'Alumnos', url: `${Routes.VIEWS}/${PartialRoutes.ALUMNOS}` },
  { title: 'Profesores', url: `${Routes.VIEWS}/${PartialRoutes.PROFESORES}` },
  { title: 'Materias', url: `${Routes.VIEWS}/${PartialRoutes.MATERIAS}` },
  { title: 'Examenes', url: `${Routes.VIEWS}/${PartialRoutes.EXAMENES}` },
  {
    title: 'Materia por Turno',
    url: `${Routes.VIEWS}/${PartialRoutes.TURNOS}`,
  },
  { title: 'Turnos', url: `${Routes.VIEWS}/${PartialRoutes.COUNT_TURNOS}` },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <Disclosure as="nav">
      {({ open, close }) => {
        const mobile = false;

        const mobileMode = () => {
          if (window.innerWidth >= 1055 && open) {
            close();
          }
        };

        mobileMode();
        window.addEventListener('resize', mobileMode);

        return (
          <>
            <div className="border py-5">
              <div className="max-w-7xl mx-auto px-8 relative flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-gray-600 flex-1">
                  Planificador de Exámenes
                </h2>
                <div className="inset-y-0 right-8 flex items-center prelg:hidden">
                  <Disclosure.Button
                    className="inline-flex items-center justify-center 
                  rounded-md text-gray-600 focus:outline-none focus:ring-2 
                  focus:ring-inset focus:ring-white"
                  >
                    {open ? (
                      <XMarkIcon aria-hidden="true" className="block h-7 w-7" />
                    ) : (
                      <Bars3Icon aria-hidden="true" className="block h-7 w-7" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden prelg:block sm:ml-6">
                    <div className="flex items-center">
                      {MenuItems.map((item) => {
                        return (
                          <Link
                            key={item.title}
                            name={item.title}
                            onhover={'hover:underline'}
                            path={item.url}
                            spacing={'mr-6'}
                            styles={'text-gray-600'}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!mobile && (
              <Disclosure.Panel>
                <div className="px-2 pt-2 pb-3 flex flex-col space-y-4 text-right mt-[1rem]">
                  {MenuItems.map((item) => {
                    return (
                      <Link
                        key={item.title}
                        name={item.title}
                        path={item.url}
                        spacing={'mx-6 p-2 rounded-md b-2 hover:bg-gray-100'}
                        styles={'text-gray-600'}
                        onClick={() => close()}
                      />
                    );
                  })}
                </div>
              </Disclosure.Panel>
            )}
          </>
        );
      }}
    </Disclosure>
  );
};

export default Navbar;
