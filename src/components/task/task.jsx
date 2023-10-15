import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Row, Col, Button, Checkbox } from 'antd';
import { DeleteOutlined, HighlightOutlined } from '@ant-design/icons';

import { ThreeDots } from 'react-loader-spinner';

import EditableText from '../editableText/editableText';

import {
  useDeleteTaskMutation,
  useUpdateIsCompletedMutation,
  useUpdateTaskMutation,
} from '../../redux/tasksApi';

import style from './task.module.css';

function Task({ taskItem, notify }) {
  const [edit, setEdit] = useState(false);

  const [deleteOneTask, { isLoading: isLoadingDeleteTask }] = useDeleteTaskMutation();
  const [updateOneTask, { isLoading: isLoadingUpdateTask }] = useUpdateTaskMutation();
  const [updateIsCompleted, { isLoading: isLoadingUpdateCompleted }] =
    useUpdateIsCompletedMutation();

  const deleteTask = async (id) => {
    try {
      await deleteOneTask(id).unwrap();
    } catch (err) {
      const res = err.data.errors;
      res.forEach((elem) => notify(elem.msg));
    }
  };

  const { title, isCompleted, id } = taskItem;

  const changeStatus = async () => {
    try {
      await updateIsCompleted(id).unwrap();
    } catch (err) {
      const res = err.data.errors;
      res.forEach((elem) => notify(elem.msg));
    }
  };

  const getNewValue = async (newValue) => {
    try {
      await updateOneTask({ id, title: newValue }).unwrap();
    } catch (err) {
      const res = err.data.errors;
      res.forEach((elem) => notify(elem.msg));
    }
  };

  const editTask = () => {
    setEdit((prevState) => !prevState);
  };

  return (
    <Row
      justify="space-between"
      align="middle"
      className={isCompleted ? `${style.task} ${style.isDone}` : style.task}
    >
      {isLoadingDeleteTask ? (
        <ThreeDots
          height="35"
          width="80"
          radius="9"
          color="#ebb582"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ margin: '0 auto' }}
          wrapperClassName=""
          visible
        />
      ) : (
        <>
          <Col span={2}>
            {isLoadingUpdateCompleted ? (
              <ThreeDots
                height="35"
                width="80"
                radius="9"
                color="#ebb582"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ margin: '0 auto' }}
                wrapperClassName=""
                visible
              />
            ) : (
              <Checkbox onChange={changeStatus} checked={isCompleted} />
            )}
          </Col>
          <Col span={17} className={style.mb}>
            <EditableText
              title={title}
              onChange={getNewValue}
              isEdit={edit}
              isLoading={isLoadingUpdateTask}
              setIsEdit={setEdit}
              isCompleted={isCompleted}
            />
          </Col>
          <Col span={5}>
            <Button
              className={style.buttons}
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteTask(id);
              }}
            />
            <Button
              className={style.buttons}
              disabled={edit}
              type="primary"
              icon={<HighlightOutlined />}
              onClick={() => {
                editTask();
              }}
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default Task;

Task.propTypes = {
  taskItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  notify: PropTypes.func.isRequired,
};
