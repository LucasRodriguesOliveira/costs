import { useCallback, useState } from 'react';
import { Input } from '../../../../components/Input';
import { SubmitButton } from '../../../../components/SubmitButton';
import style from './style.module.css';

export const ServiceForm = ({
  handleOnSubmit = () => {},
  defaultService = {},
  buttonText = 'Add service',
}) => {
  const [service, setService] = useState(defaultService);

  const handleSubmitService = useCallback((e) => {
    e.preventDefault();

    handleOnSubmit(service);
  }, [handleOnSubmit, service]);

  const handleNameChange = useCallback(({ target: { value } }) => {
    setService({
      ...service,
      name: value
    });
  }, [service]);

  const handleCostChange = useCallback(({ target: { value } }) => {
    setService({
      ...service,
      cost: value
    });
  }, [service]);

  const handleDescriptionChange = useCallback(({ target: { value } }) => {
    setService({
      ...service,
      description: value,
    });
  }, [service]);

  return (
    <form onSubmit={handleSubmitService} className={style.form}>
      <Input
        type={'text'}
        text={'Name'}
        name={'name'}
        placeholder={'e.g.: Hire a manager'}
        handleOnChange={handleNameChange}
        value={service.name || ''}
      />
      <Input
        type={'number'}
        text={'Cost'}
        name={'cost'}
        placeholder={'e.g.: 5000'}
        handleOnChange={handleCostChange}
        value={service.cost || ''}
      />
      <Input
        type={'text'}
        text={'Description'}
        name={'description'}
        placeholder={'e.g.: Manager hiring costs'}
        handleOnChange={handleDescriptionChange}
        value={service.description || ''}
      />
      <SubmitButton text={buttonText} />
    </form>
  );
};
