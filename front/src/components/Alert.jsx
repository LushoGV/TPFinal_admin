import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Alert = ({ text, fontStyle, bodyStyles }) => {
  return (
    <div className={`mb-4 flex items-center ${bodyStyles}`}>
      <ExclamationTriangleIcon className="w-[1.2rem] mr-1 text-yellow-500" />
      <p className={`text-yellow-500 ${fontStyle}`}>{text}</p>
    </div>
  );
};

export default Alert;
