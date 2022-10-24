import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

import './style.css';

export const Footer = () => (
  <footer className='footer'>
    <ul className='social-media'>
      <li>
        <FaFacebook />
      </li>
      <li>
        <FaInstagram />
      </li>
      <li>
        <FaLinkedin />
      </li>
    </ul>
    <p><span>Costs</span> &copy; 2022</p>
  </footer>
);
