import style from './style.module.css';
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { useCallback, useEffect, useState } from 'react';
import { getProjectCategoryById } from '../../../../Api/ProjectCategories';

export const Card = ({
  id,
  name,
  budget,
  categoryId,
  handleRemove,
}) => {
  const [category, setCategory] = useState({});

  const handleFetchCategory = useCallback(async () => {
    setCategory(await getProjectCategoryById(categoryId));
  }, [categoryId]);

  useEffect(() => {
    handleFetchCategory();
  }, [handleFetchCategory]);

  const removeProject = useCallback(e => {
    e.preventDefault();

    handleRemove(id);
  }, [id, handleRemove]);

  return (
    <div className={style.card}>
      <h4>{name}</h4>
      <p>
        <span>Budget:</span> $ {budget}
      </p>
      <p className={style.category_text}>
        <span className={style[category?.description?.toLowerCase()]}></span> {category.description}
      </p>
      <div className={style.actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={removeProject}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
};
