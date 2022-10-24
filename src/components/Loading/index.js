import loadingGif from '../../img/loading.svg';
import style from './style.module.css';

export const Loading = () => {
  return (
    <div className={style.container}>
      <img src={loadingGif} alt="loading" className={style.loader}/>
    </div>
  );
}
