const Button = ({ bg, bgHover, styles, text, ...rest }) => (
  <button
    className={`${bg} ${bgHover} p-2 px-4 rounded-lg text-gray-100 transition-all shadow-md ${styles}`}
    {...rest}
  >
    {text}
  </button>
);

export default Button;
