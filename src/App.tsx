import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PetDetailPage } from './pages/PetDetailPage';

export default function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageLayout>
  );
}
