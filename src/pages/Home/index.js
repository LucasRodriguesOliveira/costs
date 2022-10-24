import './style.css';
import savings from '../../img/savings.svg';
import { LinkButton } from '../../components/LinkButton';

export function Home () {
  return (
    <section className='home-container'>
      <h1>Welcome to the <span>Costs</span></h1>
      <p>Start to managing your projects</p>
      <LinkButton text={'Create a Project'} to='/new-project' />
      <img src={savings} alt="costs" />
    </section>
  );
}
