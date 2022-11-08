import { useState } from 'react';

const CodeBox = ({ tableName, tableContent }) => {
  const [activeDropDown, setActiveDropDown] = useState(false);

  return (
    <>
      <button
        className={
          !activeDropDown
            ? 'p-4 rounded-lg w-full text-left mt-5 font-bold text-gray-600 whitespace-pre-line hover:bg-gray-300 bg-gray-200'
            : 'px-4 pt-4 pb-2 rounded-t-lg w-full text-left mt-5 font-bold text-gray-600 whitespace-pre-line hover:bg-gray-300 bg-gray-200'
        }
        data-dropdown-toggle="dropdown"
        id="dropdownDefault"
        type="button"
        onClick={() => setActiveDropDown(!activeDropDown)}
      >
        {tableName}
      </button>
      <div
        className={
          !activeDropDown
            ? 'hidden'
            : 'whitespace-pre-line bg-gray-200 px-4 pb-2 rounded-b-lg tab'
        }
        id="dropdown"
      >
        <ul aria-labelledby="dropdownDefault" className="py-1 text-s ">
          <li>
            <pre className="whitespace-pre-line bg-gray-200 rounded-b-lg tab">
              {tableContent}
            </pre>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CodeBox;
