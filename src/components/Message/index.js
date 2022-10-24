import { useEffect, useState } from 'react';
import style from './style.module.css';

export const Message = ({ type, text }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(!text) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [text]);

  return (
  <>
    {visible &&
      <div className={`${style.message} ${style[type]}`}>
        {text}
      </div>
    }
  </>
  );
};
