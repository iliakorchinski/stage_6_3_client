import {
  inboxContainer,
  inboxHeader,
  inboxHeaderTitle,
  inboxHeaderMainContent,
} from './styles.css';

export const InboxContainer = () => {
  return (
    <div className={inboxContainer}>
      <div className={inboxHeader}>
        <h1 className={inboxHeaderTitle}>Inbox</h1>
      </div>
      <div className={inboxHeaderMainContent}>
        <h5>Объединяйте свои задачи</h5>
        <p>
          Обменивайтесь информацией в Trello быстро —сообщениями, по электронной
          почте и с помощью голоса.
        </p>
      </div>
    </div>
  );
};
