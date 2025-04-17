import React from 'react';

// Định nghĩa kiểu cho props
interface FormatCurrentProps {
  price: number;
}

const FormatCurrent: React.FC<FormatCurrentProps> = ({ price }) => {
  const formatPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

  return <div>{formatPrice}</div>;
};

export default FormatCurrent;
