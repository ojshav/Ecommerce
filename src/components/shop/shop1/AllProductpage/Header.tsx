import React, { useState, useRef, useEffect } from 'react';

// Heroicons SVGs (inline for simplicity)
const MailIcon = () => (
  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-1.27 1.27a16.06 16.06 0 006.6 6.6l1.27-1.27a2 2 0 011.95-.45l1.2.3A2 2 0 0021 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" /></svg>
);
const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
);
const CartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v7m4 0H9" /></svg>
);
const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
);
const MenuIcon = ({ className = "" }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const ChevronDownIcon = ({ className = "" }) => (
  <svg className={`w-4 h-4 ml-1 inline ${className}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
);

const categories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Beauty',
  'Toys',
];
const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
];
const navLinks = [
  { label: 'HOME', href: '#' },
  { label: 'PRODUCTS', href: '#', active: true },
  { label: 'BLOG', href: '#' },
  { label: 'CONTACT', href: '#' },
];

const Header: React.FC = () => {
  const [category, setCategory] = useState(categories[0]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [lang, setLang] = useState(languages[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Close dropdowns on outside click
  const catRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCategoryOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) setDepartmentsOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="w-full  bg-some-bg"> {/* optional: keep background full width */}
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-sm px-6 py-2 border-b bg-white">
          <div className="flex items-center gap-6">
            <a href="mailto:Aoin.@gmail.com" className="hover:underline"><MailIcon />Aoin.@gmail.com</a>
            <a href="tel:+6511188888" className="hover:underline"><PhoneIcon />+65 11.188.8888</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-blue-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.006 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 17.006 22 12" /></svg></a>
            <a href="#" aria-label="Instagram" className="text-pink-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5zm4.25 2.25a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm5.25 1.25a1 1 0 110 2 1 1 0 010-2z" /></svg></a>
            <a href="#" aria-label="Twitter" className="text-blue-400"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6a4.28 4.28 0 01-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z" /></svg></a>
            <div className="relative" ref={langRef}>
              <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1 px-2 py-1 border rounded hover:bg-gray-100">
                <span>{lang.flag}</span> {lang.label} <ChevronDownIcon />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                  {languages.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l); setLangOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                      <span>{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between px-6 py-6 bg-white">
          {/* Logo */}
          <div className="text-[36px] font-playfair font-bold tracking-wide">AOIN</div>
          {/* Search Bar */}
          <div className="flex-1 flex items-center mx-8 max-w-2xl">
            <div className="flex w-[739px] h-[59px] rounded-2xl border border-gray-300 ">
              <div className="relative" ref={catRef}>
                <button
                  onClick={() => setCategoryOpen((v) => !v)}
                  className="flex items-center justify-between px-4 py-4 text-[16px] min-w-[180px] focus:outline-none"
                  style={{ border: 'none' }}
                >
                  <span>{category}</span>
                  <span className="ml-2"><ChevronDownIcon /></span>
                </button>
                {categoryOpen && (
                  <div className="absolute left-0 w-48 bg-white border rounded shadow z-10">
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => { setCategory(cat); setCategoryOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-px h-10 my-auto bg-gray-300" />
              <input
                type="text"
                className="flex-1 px-6 py-5 text-[16px] focus:outline-none bg-white border-0 placeholder:text-black"
                placeholder="What do you need?"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ border: 'none', boxShadow: 'none' }}
              />
              <button className="px-5 py-5 transition-colors rounded-xl flex items-center justify-center" style={{ border: 'none', boxShadow: 'none', backgroundColor: '#FFB998' }}>
                <SearchIcon />
              </button>
            </div>
          </div>
          {/* Wishlist, Cart, Price */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="hover:text-orange-400">
                <HeartIcon />
              </button>
              <span className="absolute -top-2 -right-2 text-xs rounded-full px-1.5" style={{ backgroundColor: '#FFB998' }}>1</span>
            </div>
            <div className="relative">
              <button className="hover:text-orange-400">
                <CartIcon />
              </button>
              <span className="absolute -top-2 -right-2 text-xs rounded-full px-1.5" style={{ backgroundColor: '#FFB998' }}>3</span>
            </div>
            <span className="text-lg font-semibold">$150.00</span>
          </div>
        </div>

        {/* Navigation Bar */}
        
        <div className="flex items-center px-0 ml-0" style={{ backgroundColor: '#FFB998' }}>
          <div className="relative" ref={deptRef}>
            <button onClick={() => setDepartmentsOpen((v) => !v)} className="flex items-center gap-2 px-8 py-4  text-[17px] font-medium">
              <MenuIcon className="mr-4" /> ALL DEPARTMENTS <ChevronDownIcon className="ml-12" />
            </button>
            {departmentsOpen && (
              <div className="absolute left-0 mt-1 w-56 bg-white border rounded shadow z-10">
                {/* Placeholder department list */}
                {categories.slice(1).map((cat) => (
                  <div key={cat} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{cat}</div>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 flex  items-center justify-end gap-2 bg-gray-100 h-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-10 py-4 text-[17px] font-medium transition-colors ${link.active ? 'bg-[#FFB998]' : 'hover:bg-[#FFB998] text-gray-700'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 px-8 py-4 text-lg bg-white border-b">
          <HomeIcon /> <span className="font-semibold">Home</span> <span className="text-gray-400">›</span> <span className="text-gray-400">Shop</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
