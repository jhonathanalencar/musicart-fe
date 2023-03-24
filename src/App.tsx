import { Router } from './Routes';
import { Provider } from 'react-redux';

import { ThemeContextProvider } from './contexts/ThemeContext';
import { PlayerContextProvider } from './contexts/PlayerContext';
import { store } from './app/store';

export function App() {
  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <PlayerContextProvider>
          <Router />
        </PlayerContextProvider>
      </Provider>
    </ThemeContextProvider>
  );
}
