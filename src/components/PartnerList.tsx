import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { usePartners } from '@/hooks/usePartners';
import { SearchInput } from './SearchInput';
import { PartnerGrid } from './PartnerGrid';
import { LoadingSpinner } from './LoadingSpinner';

export function PartnerList() {
  const { partners, loading } = usePartners();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [displayedPartners, setDisplayedPartners] = useState<unknown[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredPartners = useMemo(() => {
    return searchTerm !== '' ? 
      partners.filter((partner) =>
        partner.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.City?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.PostalCode?.includes(searchTerm))
      : partners;
  }, [partners, searchTerm]);

  const loadMorePartners = useCallback(() => {
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    const newPartners = filteredPartners.slice(startIndex, endIndex);
    setDisplayedPartners((prev) => [...prev, ...newPartners]);
    setPage((prev) => prev + 1);
  }, [filteredPartners, page]);

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMorePartners();
    }
  });

  // Load more partners when the component mounts
  useEffect(() => {
    if (page === 1) {
      loadMorePartners();
    }
  }, [filteredPartners, loadMorePartners, page]);

  // Replace displayed partners when the search term changes
  useEffect(() => {
    setDisplayedPartners(filteredPartners.slice(0, 9));
    setPage(1);
  }, [searchTerm]);

  // Observe the scroll anchor element
  useEffect(() => {
    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, [scrollRef, observer]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <PartnerGrid partners={displayedPartners as any} />
      <div ref={scrollRef} id="scroll-anchor" />
    </div>
  );
}