const Toast = ({ text, icon, styles }) => {
  return (
    <div
      className={`flex justify-center items-center border-l-4 absolute top-3 right-3 p-1 px-3 py-4
      rounded-md shadow-md ${styles} space-x-2`}
    >
      <div className="mr-2">{icon}</div>

      {text}
    </div>
  );
};

export default Toast;
