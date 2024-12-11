import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
      placeholder="Rechercher des partenaires par nom, ville ou code postal..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-10"
      />
    </div>
  );
}