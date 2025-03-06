import React from 'react';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  variant = 'primary'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen w-screen-xs px-4 pt-4 pb-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-60"></div>
        </div> 

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-3xl text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xs sm:w-full max-w-[60%] mx-auto">
          <div className="bg-white px-2 pt-5 pb-2 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-center sm:justify-center">
              <div className="mt-5 text-center sm:mt-0 w-full">
                <h3 className="text-center text-md font-bold leading-6 text-gray-900 mb-4 truncate">
                  {title}
                </h3>
                <div className="text-center text-sm mt-2 mx-auto max-w-7/10 px-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="gap-4 flex justify-center w-full px-8 py-3 sm:px-4 sm:flex sm:flex-row-reverse mb-3">
            <Button
              variant={variant}
              onClick={onConfirm}
              className="w-20 sm:ml-3 rounded-2xl"
            >
              {confirmText}
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-20 sm:mt-0 sm:ml-3 rounded-2xl"
            >
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
