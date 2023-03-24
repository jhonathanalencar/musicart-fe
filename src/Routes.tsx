import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';

import { Home } from './pages/Home';
import { PlaylistTracks } from './features/songs/PlaylistTracks';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/playlist/:id" element={<PlaylistTracks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
