import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProperties } from '../../api';
import PropertyCard from '../../components/public/PropertyCard';
import FilterPills from '../../components/public/FilterPills';
import WhatsAppFloat from '../../components/public/WhatsAppFloat';
import { Search, Building2 } from 'lucide-react';

export default function ListingsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties', { search, type: filter }],
    queryFn: () => fetchProperties({ search, type: filter !== 'All' ? filter : undefined }),
    keepPreviousData: true,
  });

  return (
    <div className="page-fade">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-serif text-3xl font-black text-slate-900 mb-1">All Properties</h1>
          <p className="text-sm text-slate-400 mb-6">
            {isLoading ? 'Loading…' : `${properties.length} verified propert${properties.length === 1 ? 'y' : 'ies'} in Pune`}
          </p>
          {/* Search + filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
              />
            </div>
            <FilterPills active={filter} onChange={setFilter} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <Building2 className="w-14 h-14 mx-auto mb-4 opacity-20" />
            <p className="font-semibold">No properties match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
      <WhatsAppFloat />
    </div>
  );
}
