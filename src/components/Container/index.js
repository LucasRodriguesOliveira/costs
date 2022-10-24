import style from './style.module.css';

export const Container = ({ children, customClass }) => (
  <div className={`${style.container} ${style.min_height} ${style[customClass]}`}>{ children }</div>
);
