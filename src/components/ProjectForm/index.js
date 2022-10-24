import './style.css';

import { Input } from '../Input';
import { Select } from '../Select';
import { SubmitButton } from '../SubmitButton';
import { useCallback, useEffect, useState } from 'react';
import { getProjectCategories } from '../../Api/ProjectCategories';

export function ProjectForm({
  handleOnSubmit = () => {},
  defaultProject = {},
  buttonText = ''
}) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(defaultProject);

  const handleFetchCategories = useCallback(async () => {
    setCategories(await getProjectCategories());
  },[setCategories]);

  useEffect(() => {
    handleFetchCategories();
  }, [handleFetchCategories]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    handleOnSubmit(project);
  }, [handleOnSubmit, project]);

  const handleCategoryChange = useCallback(({ target: { value } }) => {
    setProject({
      ...project,
      categoryId: value,
    });
  }, [project]);

  const handleNameChange = useCallback(({ target: { value } }) => {
    setProject({
      ...project,
      name: value
    });
  }, [project]);

  const handleBudgetChange = useCallback(({ target: { value } }) => {
    setProject({
      ...project,
      budget: value,
    });
  }, [project]);

  return (
    <form
      className='form'
      onSubmit={handleSubmit}
    >
      <Input
        name={'name'}
        text={'Project Name'}
        placeholder={'Project Name. Ex: My Awesome Project'}
        type={'text'}
        value={project.name || ''}
        handleOnChange={handleNameChange}
      />
      <Input
        name={'budget'}
        text={'Project Budget'}
        placeholder={'Project Budget. Ex: 40000'}
        type={'number'}
        value={project.budget || ''}
        handleOnChange={handleBudgetChange}
      />
      <Select
        name={'category'}
        text={'Select a category'}
        options={categories}
        value={project.categoryId || 0}
        handleOnChange={handleCategoryChange}
      />
      <SubmitButton text={buttonText}/>
    </form>
  );
}
