import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Typography, Input } from 'antd';

import { ThreeDots } from 'react-loader-spinner';

import style from './editableText.module.css';

function EditableText({ title, isEdit, setIsEdit, onChange, isLoading, isCompleted }) {
  const { Text } = Typography;

  const [inputValue, setInputValue] = useState(!isEdit ? title : '');

  const changeActiveMode = () => {
    setIsEdit(true);
    setInputValue(title);
  };

  const changeViewMode = () => {
    setIsEdit(false);
    onChange(inputValue);
  };

  const onChangeTitle = (e) => {
    setInputValue(e.target.value);
  };

  const enterViewMode = (e) => {
    if (e.code === 'Enter') {
      setIsEdit(false);
      onChange(inputValue);
    }
  };

  return isEdit ? (
    <Input
      className={style.input}
      onKeyDown={enterViewMode}
      onChange={onChangeTitle}
      value={inputValue}
      onBlur={changeViewMode}
      autoFocus
    />
  ) : (
    <Text
      onDoubleClick={changeActiveMode}
      className={isCompleted ? `${style.task_title} ${style.isDone}` : style.task_title}
    >
      {isLoading ? (
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
        title
      )}
    </Text>
  );
}

export default EditableText;

EditableText.propTypes = {
  title: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};
