import React from 'react';
import { ToastContainer } from 'react-toastify';

const ContainerToast = () => {
  return <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />;
}

export default ContainerToast;