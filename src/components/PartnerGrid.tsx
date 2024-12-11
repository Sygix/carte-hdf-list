import { PartnerCard } from './PartnerCard';

interface PartnerGridProps {
  partners: {
    ID: number;
    Name: string;
    Street: string;
    PostalCode: string;
    City: string;
    Tel: string;
    MailAddress: string;
    SiteWeb: string;
    conventions: { ID: number; Libelle: string }[];
  }[];
}

export function PartnerGrid({ partners }: PartnerGridProps) {
  if (partners.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No partners found matching your search criteria.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {partners.map((partner, index) => {
        return (
        <PartnerCard key={`${partner.ID}-${index}`} partner={partner} />
      )})}
    </div>
  );
}