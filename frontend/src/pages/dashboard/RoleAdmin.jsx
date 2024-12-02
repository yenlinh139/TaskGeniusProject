import React, { useEffect } from 'react';
import TaskChart from '../../components/TaskChart';
import { useSelector } from 'react-redux';
import './style.scss';
import UserChart from '../../components/userChart';
import TaskStatusChart from '../../components/TaskStatusChart';
import ProjectsChart from '../projects/ProjectsChart';

function RoleAdmin(props) {
  const { listTask } = useSelector((state) => state.taskStore);
  const { listUser } = useSelector((state) => state.userStore);
  const { projects } = useSelector((state) => state.projectStore);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      <div className="row">
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-card shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                    USERS
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">{listUser.length}</div>
                </div>
                <div className="col-auto">
                  <i className="fa-solid fa-user fa-2x text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-card shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                    PROJECTS
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">{projects.length}</div>
                </div>
                <div className="col-auto">
                  <i className="fa-solid fa-diagram-project fa-2x text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-card shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                    TASKS
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">{listTask.length}</div>
                </div>
                <div className="col-auto">
                  <i className="fa-solid fa-list-check fa-2x text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 text-dark">
                <b>Tasks Overview</b>
              </h6>
            </div>
            <div className="card-body">
              <TaskChart />
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 text-dark">
                <b>Status</b>
              </h6>
            </div>
            <div className="card-body">
              <TaskStatusChart />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 text-dark">
                <b>Projects</b>
              </h6>
            </div>
            <div className="card-body">
              <ProjectsChart />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 text-dark">
                <b>Users</b>
              </h6>
            </div>
            <div className="card-body">
              <UserChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleAdmin;
