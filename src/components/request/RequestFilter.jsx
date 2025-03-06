import React from 'react';

const RequestFilter = ({ activeFilter, onFilterChange, className = '' }) => {
  const filters = ['최신순', '오래된순'];

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 ${
            activeFilter === filter ? 'font-bold text-sky-500' : 'text-gray-500'
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default RequestFilter;
