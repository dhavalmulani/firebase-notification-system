import './App.css';
import { registerServiceWorker } from './utils/registerServiceWorker';
import { notifications } from './utils/notifications';


function App() {

  // register service worker and sent notifications
  const handleNotification = async (status: string) => {
   await registerServiceWorker();
    notifications(status);
  };

  return (
    <div className="App">
      <div className='container'>
        <button className='button' onClick={() => handleNotification("success")}>Get Success Notification</button>
        <button className='button' onClick={() => handleNotification("warning")}>Get Warning Notification</button>
        <button className='button' onClick={() => handleNotification("info")}>Get Info Notification</button>
      </div>
    </div>
  );
}

export default App;