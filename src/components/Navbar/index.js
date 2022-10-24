import { Link } from 'react-router-dom';
import logo from '../../img/costs_logo.png'
import './style.css';

import { Container } from '../Container';

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <Container>
        <Link to='/'>
          <img src={logo} alt='costs' />
        </Link>
        <ul className='list'>
          <li className='item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='item'>
            <Link to='/projects'>Projects</Link>
          </li>
          <li className='item'>
            <Link to='/company'>Company</Link>
          </li>
          <li className='item'>
            <Link to='/contact'>Contact</Link>
          </li>
          <li className='item'>
            <Link to='/new-project'>New Project</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};
