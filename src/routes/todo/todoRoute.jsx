import React, { useState } from 'react';

import { Row, Typography, Button } from 'antd';

import { ThreeDots } from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Task from '../../components/task/task';
import TaskInput from '../../components/taskInput/taskInput';
import TitleComponent from '../../components/title/title';

import { useGetTasksQuery, useAddNewTaskMutation } from '../../redux/tasksApi';

import style from './todoRoute.module.css';

function TodoRoute() {
  const { Title } = Typography;

  const [filter, setFilter] = useState(undefined);
  const [filterWord, setFilterWord] = useState('All');

  const { data = [], error, isError, isLoading: isLoadingGetAllTask } = useGetTasksQuery(filter);
  const [addNewTask, { isLoading: isLoadingAddNewTask }] = useAddNewTaskMutation();

  const notify = (message) =>
    toast.error(`${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const addTask = async (taskValue) => {
    try {
      await addNewTask({ title: taskValue }).unwrap();
    } catch (err) {
      const res = err.data.errors;
      if (res) {
        res.forEach((elem) => notify(elem.msg));
      } else {
        notify(err.error);
      }
    }
  };

  const changeFilter = (value) => {
    setFilter(value);
    if (value === undefined) {
      setFilterWord('All');
    } else if (value === true) {
      setFilterWord('Completed');
    } else if (value === false) {
      setFilterWord('Active');
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <TitleComponent title="What's the Plan for Today?" />
      <Row justify="center" align="middle" className={style.form_container}>
        <TaskInput addTask={addTask} />
      </Row>

      <Row justify="center" align="middle" className={style.item_container}>
        {isLoadingAddNewTask || isLoadingGetAllTask ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#ebb582"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible
          />
        ) : (
          <div className={style.task_items}>
            {data.length === 0 ? (
              <div className={style.filter_message}>
                {isError ? (
                  <div>
                    <p>{error.status}</p>
                    <p>Bad Request</p>
                  </div>
                ) : (
                  <p>
                    You have no <span>{filterWord}</span> tasks
                  </p>
                )}
              </div>
            ) : (
              data.map((task) => <Task notify={notify} taskItem={task} key={task.id} />)
            )}
          </div>
        )}
      </Row>

      <Row justify="center" align="middle" className={style.footer_container}>
        <Title level={3} className={style.title}>
          {filterWord} tasks: {data && data.length}
        </Title>
      </Row>

      <Row justify="center" align="middle" className={style.filter_container}>
        <Button
          type="primary"
          className={filter === undefined ? style.active_filter : style.static_filter}
          onClick={() => changeFilter(undefined)}
        >
          All
        </Button>
        <Button
          type="primary"
          className={filter === false ? style.active_filter : style.static_filter}
          onClick={() => changeFilter(false)}
        >
          Active
        </Button>
        <Button
          type="primary"
          className={filter === true ? style.active_filter : style.static_filter}
          onClick={() => changeFilter(true)}
        >
          Completed
        </Button>
      </Row>
    </div>
  );
}

export default TodoRoute;
