import style from './style.module.css';
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Message } from "../../components/Message";
import { LinkButton } from '../../components/LinkButton';
import { Container } from '../../components/Container';
import { deleteProject, getProjects } from '../../Api/Project';
import { Card } from './components/Card';
import { Loading } from '../../components/Loading';

export function Projects () {
  const location = useLocation();
  const [message, setMessage] = useState(() => {
    if (!location.state) {
      return '';
    }

    return location.state.message;
  });
  const [isLoading, setIsLoading] = useState(false);

  const [projects, setProjects] = useState([]);

  const handleFetchProjects = useCallback(async () => {
    setProjects(await getProjects());
    setIsLoading(false);
  }, [setProjects]);

  useEffect(() => {
    setIsLoading(true);
    handleFetchProjects();
  }, [handleFetchProjects]);

  const handleRemoveProject = useCallback(async (projectId) => {
    await deleteProject(projectId);
    setMessage({
      type: 'success',
      text: 'Project removed successfully!',
    });
    setIsLoading(true);
    handleFetchProjects();
  }, [handleFetchProjects, setIsLoading]);

  return (
    <div className={style.project_container}>
      <div className={style.title_container}>
        <h1>Projects</h1>
        <LinkButton text={'Create new Project'} to={'/new-project'}/>
      </div>

      <Message
        text={message.text}
        type={message.type}
      />
      <Container customClass={'start'}>
        {projects.length &&
          projects.map((project) => (
            <Card
              key={project.id}
              handleRemove={handleRemoveProject}
              {...project}
            />
          ))
        }
        {isLoading &&
          <Loading />
        }
        {!isLoading && !projects.length &&
          <p>There is no project registered</p>
        }
      </Container>
    </div>
  );
}
