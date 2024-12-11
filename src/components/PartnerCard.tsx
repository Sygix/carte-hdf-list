import { Building2, Globe, Mail, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PartnerCardProps {
  partner: {
    ID: number;
    Name: string;
    Street: string;
    PostalCode: string;
    City: string;
    Tel: string;
    MailAddress: string;
    SiteWeb: string;
    conventions: { ID: number; Libelle: string }[];
  };
}

export function PartnerCard({ partner }: PartnerCardProps) {

  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          {partner.Name}
        </CardTitle>
        <CardDescription>
          {partner.Street}, {partner.PostalCode} {partner.City}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {partner.conventions?.map((convention) => (
              <Badge
                key={convention.ID}
                className="mr-2"
              >
                {convention.Libelle}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-2 text-sm">
            {partner.Tel && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${partner.Tel}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {partner.Tel}
                </a>
              </div>
            )}
            
            {partner.MailAddress && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${partner.MailAddress}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {partner.MailAddress}
                </a>
              </div>
            )}
            
            {partner.SiteWeb && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={partner.SiteWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}