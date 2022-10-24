import { Link } from 'react-router-dom';
import './style.css';

export const LinkButton = ({ to, text }) => (
  <Link to={to} className='btn'>{ text }</Link>
);
