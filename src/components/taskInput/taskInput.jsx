import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Input, Space } from 'antd';

import style from './taskInput.module.css';

function TaskInput({ addTask }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const addNewTask = () => {
    if (input.trim()) {
      addTask(input.trim());
      setInput('');
    } else {
      setError('Title is required');
    }
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  };

  const inputChange = (event) => {
    setInput(event.target.value);
    setError('');
  };

  return (
    <div>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          className={style.input}
          onKeyDown={handleEnter}
          onChange={inputChange}
          value={input}
          status={error ? 'error' : ''}
        />
        <Button className={style.button} onClick={addNewTask} type="primary">
          Submit
        </Button>
      </Space.Compact>
      {error && <div className={style.error_message}>{error}</div>}
    </div>
  );
}

export default TaskInput;

TaskInput.propTypes = {
  addTask: PropTypes.func.isRequired,
};
