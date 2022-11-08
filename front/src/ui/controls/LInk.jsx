import { Link as RouterLink } from 'react-router-dom';

const Link = ({ name, styles, onhover, path, spacing, ...rest }) => {
  return (
    <RouterLink className={spacing} to={path} {...rest}>
      <button
        className={`font-semibold transition-colors ${styles} ${onhover}`}
      >
        {name}
      </button>
    </RouterLink>
  );
};

export default Link;
