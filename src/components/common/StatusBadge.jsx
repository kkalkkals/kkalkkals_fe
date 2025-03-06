import React from 'react';

const StatusBadge = ({ status }) => {
  const badgeStyles = {
    요청중: 'bg-indigo-500 text-white',
    수거중: 'bg-green-500 text-white',
    완료됨: 'bg-gray-400 text-white',
    취소됨: 'bg-red-400 text-white',
  };

  return (
    <span
      className={`py-1 px-3 rounded-full text-sm ${
        badgeStyles[status] || 'bg-gray-200 text-gray-800'
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
