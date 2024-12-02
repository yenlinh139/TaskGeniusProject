import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { getProjectsData } from '../../store/actions/projectAction';
import ProjectsList from './ProjectsList';
import './style.scss';

const WrapperProjects = () => {
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);
  const { projects } = useSelector((state) => state.projectStore);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsData());
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <ProjectsList projects={projects} />
    </>
  );
};

export default WrapperProjects;
