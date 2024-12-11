import { Building } from 'lucide-react';
import { PartnerList } from '@/components/PartnerList';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <header className="border-b w-full py-6 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Liste des partenaires Carte HDF</h1>
        </div>
      </header>

      <main className="container py-8">
        <PartnerList />
      </main>

      <footer className="border-t w-full">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sygix. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;