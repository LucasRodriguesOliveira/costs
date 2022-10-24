import style from './style.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { useCallback } from 'react';

export const ServiceCard = ({
  id,
  name,
  cost,
  description,
  handleRemove,
}) => {
  const removeService = useCallback(e => {
    e.preventDefault();

    handleRemove(id, cost);
  }, [id, handleRemove, cost]);

  return (
    <div className={style.card}>
      <h4>{name}</h4>
      <p><span>Budget:</span> $ {cost}</p>
      <p>{description}</p>
      <div className={style.actions}>
        <button onClick={removeService}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
};
