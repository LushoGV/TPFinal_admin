import CardTechno from '../../components/CardTechno/CardTechno';
import cardTechnoData from '../../components/CardTechno/CardTechnoData';
import CodeBox from '../../components/CodeBox/CodeBox';
import {
  queriesTables,
  queriesViews,
} from '../../components/CodeBox/queriesCodeBox';

const Home = () => {
  return (
    <div className="mt-[4rem]">
      <h1 className="text-center font-bold text-3xl p-4 text-gray-600">
        TRABAJO PRACTICO FINAL
      </h1>
      <h3 className="text-center text-gray-500">
        Diseño y Administración de Base de Datos.
      </h3>
      <div className="w-3/4 m-auto p-3">
        <p>
          Se construyó una base de datos para la gestión de exámenes. La misma
          contiene la información referentes a los alumnos que van a rendir,
          profesores titulares de las materias a rendir, materias , turnos y
          fechas de exámenes, y el resultado de cada uno de los exámenes.
        </p>
      </div>
      {/* Crear componente de imagenes */}
      <section className="w-3/4 m-auto p-3">
        <h3 className="font-bold text-3xl p-2 text-gray-600 text-center">
          Tecnologias Usadas
        </h3>
        <div className="w-all  mt-5 p-4 rounded-lg grid grid-cols-2 md:grid-cols-3 space place-content-around">
          {cardTechnoData.map((element, index) => {
            return (
              <div key={index}>
                <CardTechno
                  cardImage={element.src}
                  cardName={element.name}
                  imageDescription={element.description}
                />
              </div>
            );
          })}
        </div>
      </section>
      {/* Creacion de Tablas */}
      <section className="w-3/4 m-auto p-3">
        <h1 className="font-bold text-3xl p-2 text-gray-600 text-center">
          Creacion de Tablas
        </h1>
        {queriesTables.map((element, index) => {
          return (
            <div key={index}>
              <CodeBox
                tableContent={element.description}
                tableName={element.title}
              />
            </div>
          );
        })}
      </section>
      {/* Creacion de Views */}
      <section className="w-3/4 m-auto p-3">
        <h1 className="font-bold text-3xl p-2 text-gray-600 text-center">
          Creación de Vistas
        </h1>
        {queriesViews.map((element, index) => {
          return (
            <div key={index}>
              <CodeBox
                tableContent={element.description}
                tableName={element.title}
              />
            </div>
          );
        })}
      </section>
      {/* Integrantes */}
      <div className="w-1/2 m-auto mt-2 p-3 rounded-md">
        <h4 className="font-bold text-center text-xl mb-3">Integrantes </h4>
        <ul className="w-all flex flex-col text-center">
          <li>Bernardi Franco</li>
          <li>Caballero Lautaro</li>
          <li>Grageda Gonzalo</li>
          <li>Cossy Torquati Octavio</li>
          <li>Viola Luciano</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
