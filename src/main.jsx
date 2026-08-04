import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function logDevtoolsEasterEgg() {
  const greeting = 'Hey, nice — you found the devtools 👀';
  const pitch = "If you're poking around, you're probably a fellow builder. Let's talk: dskohli@connect.ust.hk";
  const source = 'Also — the source: github.com/darshbir19';

  try {
    console.log(
      `%c${greeting}\n%c${pitch}\n%c${source}`,
      'font-size:16px;font-weight:700;line-height:1.4;',
      'font-size:12px;font-weight:400;line-height:1.6;color:#787774;',
      'font-size:12px;font-weight:400;line-height:1.6;color:#787774;',
    );
  } catch {
    console.log(`${greeting}\n${pitch}\n${source}`);
  }
}

logDevtoolsEasterEgg();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
