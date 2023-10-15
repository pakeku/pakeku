import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable-next-line */
export interface NotificationToastProps {
  children: React.ReactNode;
}

export function NotificationToastProvider(props: NotificationToastProps) {
  return (
    <>
      <ToastContainer />
      {props.children}
    </>
  );
}

export default NotificationToastProvider;
