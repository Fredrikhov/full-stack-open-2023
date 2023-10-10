import style from "./Notification.module.css";
interface iNotification {
  status?: {
    type?: boolean;
    message?: string;
  };
}
export const Notification = ({ status }: iNotification) => {
  if (!status?.message) {
    return null;
  } else {
    return (
      <>
        {status?.type === true && status?.message?.length !== 0 ? (
          <div className={style.success}>{status?.message}</div>
        ) : (
          <div className={style.error}>{status?.message}</div>
        )}
        ;
      </>
    );
  }
};
