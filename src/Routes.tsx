import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';

import { Home } from './pages/Home';
import { PlaylistTracks } from './features/songs/PlaylistTracks';
import { useUserLocation } from './hooks/useUserLocation';

export function Router() {
  const { countryName } = useUserLocation();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home countryName={countryName} />} />

          <Route path="/playlist/:id" element={<PlaylistTracks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
