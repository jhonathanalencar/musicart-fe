import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';

import { Home } from './pages/Home';
import { PlaylistTracks } from './features/songs/PlaylistTracks';
import { useUserLocation } from './hooks/useUserLocation';
import { Explore } from './pages/Explore';

export function Router() {
  const { countryName, countryCode } = useUserLocation();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route
            path="/"
            element={
              <Home countryName={countryName} countryCode={countryCode} />
            }
          />

          <Route path="/playlist/:id" element={<PlaylistTracks />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
