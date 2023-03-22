import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ThemeContextProvider } from './contexts/ThemeContext';
import { PlayerContextProvider } from './contexts/PlayerContext';
import { store } from './app/store';

import { App } from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </Provider>
    </ThemeContextProvider>
  </React.StrictMode>
);
