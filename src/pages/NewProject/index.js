import './style.css';
import { useCallback } from 'react';
import { ProjectForm } from '../../components/ProjectForm';
import { postProject } from '../../Api/Project';
import { useNavigate } from 'react-router-dom';

export function NewProject () {
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (project) => {
    project.cost = 0;

    await postProject(project);

    navigate('/projects', {
      state: {
        message: {
          text: 'Project successfully created!',
          type: 'success'
        }
      },
    });
  }, [navigate]);

  return (
    <div className='new-project-container'>
      <h1>Create a new Project</h1>
      <p>Create your project to add it's services</p>
      <ProjectForm
        handleOnSubmit={handleSubmit}
        buttonText={'Create Project'}
      />
    </div>
  );
}
