import style from './style.module.css';
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findById, updateProject } from '../../Api/Project';
import { getProjectCategoryById } from "../../Api/ProjectCategories";
import { deleteProjectService, getProjectServices, postProjectService } from '../../Api/ProjectServices';
import { Container } from "../../components/Container";
import { Loading } from "../../components/Loading";
import { ProjectForm } from '../../components/ProjectForm';
import { Message } from '../../components/Message';
import { ServiceForm } from './components/ServiceForm';
import { v4 as uuid } from 'uuid';
import { ServiceCard } from './components/ServiceCard';

export function Project () {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [category, setCategory] = useState({});
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState();
  const [showServiceForm, setShowServiceForm] = useState(false);

  const fetchProjectData = useCallback(async () => {
    setProject(await findById(id));
    setIsLoading(false);
  }, [id]);

  const getCategoryData = useCallback(async () => {
    setCategory(await getProjectCategoryById(project.categoryId));
  }, [project.categoryId])

  const validateProjectCost = useCallback((project) => {
    setMessage(null);
    if (parseFloat(project?.budget) < parseFloat(project?.cost)) {
      setMessage({
        text: 'Project budget cannot be lower than its costs',
        type: 'error',
      });
      setShowForm(false);

      return false;
    }

    return true;
  }, []);

  const fetchServices = useCallback(async () => {
    setServices(await getProjectServices(project.id));
  }, [project.id]);

  const handleRemoveService = useCallback(async (serviceId, serviceCost) => {
    setMessage(null);
    await deleteProjectService(serviceId);
    const newProjectCost = parseFloat(project.cost) - parseFloat(serviceCost);
    setProject({
      ...project,
      cost: newProjectCost,
    });
    setMessage({
      type: 'success',
      text: 'Service removed successfully!',
    });
    fetchServices();
  }, [fetchServices, project]);

  const handleSubmit = useCallback(async (projectData) => {
    setMessage(null);
    if(!validateProjectCost(projectData)) {
      return;
    }

    setProject(await updateProject(projectData.id, projectData));
    setShowForm(false);
    setMessage({
      text: 'Project updated successfully!',
      type: 'success',
    });
  }, [validateProjectCost]);

  const createService = useCallback(async (serviceData) => {
    const newProjectCost = parseFloat(project.cost) + parseFloat(serviceData.cost);
    if(!validateProjectCost({
      ...project,
      cost: newProjectCost,
    })) {
      return;
    }

    serviceData.id = uuid();
    serviceData.projectId = project.id;

    await postProjectService(serviceData);
    fetchServices();

    setProject({
      ...project,
      cost: newProjectCost,
    });
    updateProject(project.id, {
      ...project,
      cost: newProjectCost,
    });
    setShowServiceForm(false);
  }, [project, validateProjectCost, fetchServices]);

  useEffect(() => {
    setIsLoading(true);
    fetchProjectData();
  }, [fetchProjectData]);

  useEffect(() => {
    if (project.categoryId) {
      getCategoryData();
    }
  }, [getCategoryData, project.categoryId]);

  useEffect(() => {
    if (project.id) {
      fetchServices();
    }
  }, [fetchServices, project.id]);

  return (
    <>
      {isLoading &&
        <Loading />
      }
      {(!isLoading && project.id)
        ? <div className={style.details}>
          <Container customClass={'column'}>
            {message?.text &&
              <Message
                {...message}
              />
            }
            <div className={style.container}>
              <h1>{project.name}</h1>
              <button className={style.button}
                onClick={() => { setShowForm(!showForm) }}
              >{ showForm ? 'Cancel' : 'Edit' }</button>
              <div className={style.info}>
                {!showForm
                  ? (
                    <>
                      <p>
                        <span>Category:</span> { category?.description }
                      </p>
                      <p>
                        <span>Budget:</span> $ { project?.budget }
                      </p>
                      <p>
                        <span>Cost:</span> $ { project?.cost }
                      </p>
                    </>
                  )
                  : (
                    <ProjectForm
                      buttonText='Save changes'
                      defaultProject={project}
                      handleOnSubmit={handleSubmit}
                    />
                  )
                }
              </div>
            </div>
            <div className={style.services_container}>
              <h2>Add a service:</h2>
              <button className={style.button}
                onClick={() => { setShowServiceForm(!showServiceForm) }}
              >{ showServiceForm ? 'Cancel' : 'Add' }</button>
              <div className={style.info}>
                {showServiceForm && (
                    <ServiceForm
                      handleOnSubmit={createService}
                    />
                  )
                }
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass={'start'}>
              {services.length
                ? services.map((service) =>
                    <ServiceCard
                      {...service}
                      key={service.id}
                      handleRemove={handleRemoveService}
                    />
                  )
                : <p>There is no service registered!</p>
              }
            </Container>
          </Container>
        </div>
        : <p>Project not found</p>
      }
    </>
  );
}
