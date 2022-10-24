import { Routes as Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import Company from './pages/Company';
import Contact from './pages/Contact';
import { NewProject } from './pages/NewProject';
import { Projects } from './pages/Projects';
import { Project } from './pages/Project';

export const Routes = () => (
  <Switch>
    <Route exact path='/' element={ <Home /> }></Route>
    <Route path='/company' element={ <Company /> }></Route>
    <Route path='/contact' element={ <Contact /> }></Route>
    <Route path='/new-project' element={ <NewProject /> }></Route>
    <Route path='/projects' element={ <Projects /> }></Route>
    <Route path='/project/:id' element={ <Project /> }></Route>
  </Switch>
);
