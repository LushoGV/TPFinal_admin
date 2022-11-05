import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Alert = ({ text, fontStyle, bodyStyles }) => {
  return (
    <div className={`mb-4 flex items-center ${bodyStyles}`}>
      <div className={`mr-2 text-yellow-500 ${fontStyle}`}>
        <ExclamationTriangleIcon />
      </div>
      <p className={`text-yellow-500 ${fontStyle}`}>{text}</p>
    </div>
  );
};

export default Alert;
