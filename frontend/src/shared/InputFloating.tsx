import React, { useState } from 'react';
import { Input, Form } from 'antd';
import { Rule } from 'antd/lib/form';

interface FloatingLabelInputProps {
  label: string;
  className: string;
  required: boolean;
  type?: string;
  rules?: Rule[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

// Component cho Input thường
const FloatingLabelInput = ({
  label,
  className,
  required,
  type,
  ...props
}: FloatingLabelInputProps) => {
  const [hasValue, setHasValue] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== '');
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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