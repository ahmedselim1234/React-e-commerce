import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import ProductCard from '../../components/Products/ProductCard';
import { dummyProducts, dummyCategories, dummyBrands } from '../../data/dummyData';

const ITEMS_PER_PAGE = 8;

const SORT_OPTIONS = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'price_asc', label: 'السعر: الأقل أولاً' },
  { value: 'price_desc', label: 'السعر: الأعلى أولاً' },
  { value: 'rating', label: 'الأعلى تقييماً' },
  { value: 'bestseller', label: 'الأكثر مبيعاً' },
];

// Checkmark SVG for custom checkbox
const CheckIcon = () => (
  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function ShopProductPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  useEffect(() => { setPage(1); }, [selectedCategories, selectedBrands, priceRange, sortBy, searchQuery]);

  // Product counts per category and brand
  const catCount = useMemo(() => {
    const counts = {};
    dummyProducts.forEach(p => {
      counts[p.category._id] = (counts[p.category._id] || 0) + 1;
    });
    return counts;
  }, []);

  const brandCount = useMemo(() => {
    const counts = {};
    dummyProducts.forEach(p => {
      counts[p.brand._id] = (counts[p.brand._id] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let result = [...dummyProducts];

    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category._id));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand._id));
    }

    result = result.filter(p => {
      const price = p.priceAfterDiscount || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return (a.priceAfterDiscount || a.price) - (b.priceAfterDiscount || b.price);
        case 'price_desc': return (b.priceAfterDiscount || b.price) - (a.priceAfterDiscount || a.price);
        case 'rating': return (b.Averagerating || 0) - (a.Averagerating || 0);
        case 'bestseller': return (b.sold || 0) - (a.sold || 0);
        default: return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return result;
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleCategory = (id) => setSelectedCategories(prev =>
    prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
  );

  const toggleBrand = (id) => setSelectedBrands(prev =>
    prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
  );

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setSortBy('newest');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000;
  const activeFilterCount = selectedCategories.length + selectedBrands.length +
    ((priceRange[0] > 0 || priceRange[1] < 2000) ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-1">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Tag size={15} className="text-primary" />
          الفلاتر
          {activeFilterCount > 0 && (
            <span className="min-w-5 h-5 px-1.5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold">
              {activeFilterCount}
            </span>
          )}
        </h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
            مسح الكل
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <button onClick={() => setCatOpen(!catOpen)} className="w-full flex items-center justify-between px-4 py-3.5 font-semibold text-gray-800 text-sm hover:bg-gray-50 transition-colors">
          الأقسام
          {catOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {catOpen && (
          <div className="px-3 pb-3 space-y-0.5">
            {dummyCategories.map(cat => {
              const isSelected = selectedCategories.includes(cat._id);
              return (
                <div
                  key={cat._id}
                  className="flex items-center gap-3 cursor-pointer group py-2 px-1 rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => toggleCategory(cat._id)}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected ? 'bg-primary border-primary shadow-sm' : 'border-gray-300 bg-white group-hover:border-primary/50'
                  }`}>
                    {isSelected && <CheckIcon />}
                  </div>
                  <span className={`text-sm flex-1 transition-colors ${isSelected ? 'text-primary font-semibold' : 'text-gray-600 group-hover:text-gray-800'}`}>
                    {cat.name}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                    {catCount[cat._id] || 0}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <button onClick={() => setBrandOpen(!brandOpen)} className="w-full flex items-center justify-between px-4 py-3.5 font-semibold text-gray-800 text-sm hover:bg-gray-50 transition-colors">
          الماركات
          {brandOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {brandOpen && (
          <div className="px-3 pb-3 space-y-0.5">
            {dummyBrands.map(brand => {
              const isSelected = selectedBrands.includes(brand._id);
              return (
                <div
                  key={brand._id}
                  className="flex items-center gap-3 cursor-pointer group py-2 px-1 rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => toggleBrand(brand._id)}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected ? 'bg-primary border-primary shadow-sm' : 'border-gray-300 bg-white group-hover:border-primary/50'
                  }`}>
                    {isSelected && <CheckIcon />}
                  </div>
                  <span className={`text-sm flex-1 transition-colors ${isSelected ? 'text-primary font-semibold' : 'text-gray-600 group-hover:text-gray-800'}`}>
                    {brand.name}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                    {brandCount[brand._id] || 0}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <button onClick={() => setPriceOpen(!priceOpen)} className="w-full flex items-center justify-between px-4 py-3.5 font-semibold text-gray-800 text-sm hover:bg-gray-50 transition-colors">
          نطاق السعر (ج.م)
          {priceOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {priceOpen && (
          <div className="px-4 pb-4 space-y-4">
            {/* Gradient range track */}
            <div className="pt-2">
              <input
                type="range"
                min={0}
                max={2000}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-2 appearance-none rounded-full cursor-pointer outline-none"
                style={{
                  background: `linear-gradient(to left, #e5e7eb ${100 - (priceRange[1] / 2000) * 100}%, #6366f1 ${100 - (priceRange[1] / 2000) * 100}%)`
                }}
              />
            </div>
            {/* Min / Max labels */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">{priceRange[0]} ج.م</span>
              <span className="text-xs text-gray-300">—</span>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-lg">{priceRange[1]} ج.م</span>
            </div>
            {/* Manual input */}
            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-1/2 px-3 py-2 border border-gray-200 rounded-xl text-xs text-center focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="من"
              />
              <input
                type="number"
                min={priceRange[0]}
                max={2000}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-1/2 px-3 py-2 border border-gray-200 rounded-xl text-xs text-center focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="إلى"
              />
            </div>
          </div>
        )}
      </div>

      {/* Clear All — prominent button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 text-sm text-white rounded-2xl transition-all font-semibold flex items-center justify-center gap-2 shadow-sm"
          style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
        >
          <X size={16} /> مسح جميع الفلاتر
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-background min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900">
            {searchQuery ? (
              <>نتائج البحث عن: <span className="text-primary">"{searchQuery}"</span></>
            ) : 'جميع المنتجات'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} منتج</p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors md:hidden">
            <SlidersHorizontal size={16} /> فلترة
            {activeFilterCount > 0 && (
              <span className="min-w-5 h-5 px-1 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 mr-auto">
            <span className="text-sm text-gray-500 hidden sm:block">ترتيب:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {selectedCategories.map(id => {
              const cat = dummyCategories.find(c => c._id === id);
              return cat ? (
                <button key={id} onClick={() => toggleCategory(id)} className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 hover:bg-primary/20 transition-colors">
                  {cat.name} <X size={11} />
                </button>
              ) : null;
            })}
            {selectedBrands.map(id => {
              const brand = dummyBrands.find(b => b._id === id);
              return brand ? (
                <button key={id} onClick={() => toggleBrand(id)} className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full border border-secondary/20 hover:bg-secondary/20 transition-colors">
                  {brand.name} <X size={11} />
                </button>
              ) : null;
            })}
            {(priceRange[0] > 0 || priceRange[1] < 2000) && (
              <button onClick={() => setPriceRange([0, 2000])} className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors">
                {priceRange[0]}–{priceRange[1]} ج.م <X size={11} />
              </button>
            )}
            <button onClick={clearFilters} className="px-3 py-1 text-xs text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
              مسح الكل
            </button>
          </div>
        )}

        <div className="flex gap-6">
          <aside className="hidden md:block w-60 flex-shrink-0">
            <FilterPanel />
          </aside>

          {filterOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-72 bg-background overflow-y-auto p-4 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800">الفلاتر</h2>
                  <button onClick={() => setFilterOpen(false)}><X size={20} /></button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد منتجات</h3>
                <p className="text-gray-400 text-sm mb-6">جرب تغيير الفلاتر أو البحث بكلمات أخرى</p>
                <button onClick={clearFilters} className="px-5 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">مسح الفلاتر</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paginated.map(product => <ProductCard key={product._id} product={product} />)}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors">السابق</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${page === p ? 'bg-gradient-primary text-white shadow-md' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{p}</button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors">التالي</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
