import { memo, useMemo } from 'react';
import {
  useTable as useReactTable,
  useSortBy,
  usePagination,
  useFilters,
} from 'react-table';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

const Table = ({ data, columns }) => {
  // Otorga filtro por default (ninguno) a los elementos con filtro sin especificar.
  const defaultColumn = useMemo(
    () => ({
      Filter: 'default',
    }),
    []
  );
  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];

          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableBodyProps,
    canPreviousPage,
    getTableProps,
    previousPage,
    headerGroups,
    setPageSize,
    canNextPage,
    pageOptions,
    prepareRow,
    pageCount,
    gotoPage,
    nextPage,
    page,
    state: { pageIndex, pageSize },
  } = useReactTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="border rounded-xl mb-[4rem]">
        <div className="overflow-x-auto w-full">
          <table
            {...getTableProps()}
            className="text-gray-600 table-auto overflow-hidden min-w-full"
          >
            <thead className="border-b">
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      key={i}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-3 py-3 text-center"
                    >
                      <div className="flex flex-row justify-center items-center">
                        {column.render('Header')}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <span className="ml-1">
                              <ArrowDownIcon />
                            </span>
                          ) : (
                            <span className="ml-1">
                              <ArrowUpIcon />
                            </span>
                          )
                        ) : (
                          ''
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {/* En caso de no obtener resultados */}
              {page.length === 0 ? (
                <tr>
                  <td className="text-center text-xl p-8" colSpan={'150'}>
                    No se encontraron registros...
                  </td>
                </tr>
              ) : (
                page.map((row, i) => {
                  prepareRow(row);

                  return (
                    <tr
                      key={i}
                      {...row.getRowProps()}
                      className="border-b mt-2"
                    >
                      {/* Celdas especiales o actions */}
                      {row.cells.map((cell, i) => {
                        if (
                          cell.column.Header === ' ' ||
                          cell.column.Cell.name === 'Cell'
                        ) {
                          return (
                            <td
                              key={i}
                              {...cell.getCellProps()}
                              className={'py-3'}
                            >
                              <div className="flex min-w-[10rem] justify-end">
                                {cell.render('Cell')}
                              </div>
                            </td>
                          );
                        }

                        return (
                          /* Celdas normales */
                          <td
                            key={i}
                            {...cell.getCellProps()}
                            className={'py-3 text-left'}
                          >
                            <p
                              className={
                                'pl-[18px] px-[8px] rounded-md max-w-[20rem] min-w-[10rem]'
                              }
                            >
                              {cell.render('Cell')}
                            </p>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {/* Paginación */}
        </div>
        <div className="p-2 text-gray-600 flex items-center justify-center flex-col md:flex-row space-x-3">
          <div className="flex items-center space-x-3 flex-col md:flex-row space-y-2 md:space-y-0">
            <section className="space-x-1">
              <button
                className="border rounded-md p-1"
                disabled={!canPreviousPage}
                onClick={() => gotoPage(0)}
              >
                {'<<'}
              </button>
              <button
                className="border rounded-md p-1 px-[0.6rem]"
                disabled={!canPreviousPage}
                onClick={() => previousPage()}
              >
                {'<'}
              </button>
              <button
                className="border rounded-md p-1 px-[0.6rem]"
                disabled={!canNextPage}
                onClick={() => nextPage()}
              >
                {'>'}
              </button>
              <button
                className="border rounded-md p-1 "
                disabled={!canNextPage}
                onClick={() => gotoPage(pageCount - 1)}
              >
                {'>>'}
              </button>
            </section>
            <span>
              Página{' '}
              <strong>
                {page.length !== 0 ? pageIndex + 1 : pageIndex} de{' '}
                {pageOptions.length}
              </strong>
            </span>
          </div>
          <select
            className="rounded-md border p-1 outline-none mt-2 md:mt-0"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[
              { value: 10, name: 10 },
              { value: 20, name: 20 },
              { value: 30, name: 30 },
              { value: 40, name: 40 },
              { value: 50, name: 50 },
            ].map((pageSize) => (
              <option key={pageSize.name} value={pageSize.value}>
                Mostrar {pageSize.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default memo(Table);
