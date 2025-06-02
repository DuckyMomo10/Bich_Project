import React, { useState } from 'react';
import { Input, Form } from 'antd';

// Component cho Input thường
const FloatingLabelInput = ({ label, className, required, type, ...props }) => {
  const [hasValue, setHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setHasValue(e.target.value !== '');
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  // Kiểm tra nếu là type password thì dùng Input.Password
  const InputComponent = type === 'password' ? Input.Password : Input;

  return (
    <Form.Item
      name={className}
      rules={[
        {
          required: required,
          message: `Please input your ${label.toLowerCase()}!`,
        },
        ...(props.rules || [])
      ]}
    >
      <div className="floating-input">
        <div className={`input-wrapper ${(isFocused || hasValue) ? 'active' : ''}`}>
          <InputComponent
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            style={{borderRadius:2, width: '100%', height:40}}
          />
          <span className="floating-label">{label}</span>
        </div>
      </div>
    </Form.Item>
  );
};

export default FloatingLabelInput;