"use client";
 
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
 
const menuItems = [
  {
    id: 1,
    name: "Matcha Latte",
    category: "Green Tea Series",
    price: "Rp 65.000",
    desc: "Ceremonial-grade matcha, steamed milk, a touch of sweetness.",
    img: "/assets/starbucks_matchalatte.png",
    tag: "BESTSELLER",
    tagColor: "bg-[#00704A]",
    cal: "240 cal",
  },
  {
    id: 2,
    name: "Americano",
    category: "Espresso Series",
    price: "Rp 50.000",
    desc: "Bold espresso shots pulled over cold water. Pure. Unapologetic.",
    img: "/assets/starbucks_americano.png",
    tag: "CLASSIC",
    tagColor: "bg-[#1E3932]",
    cal: "15 cal",
  },
  {
    id: 3,
    name: "Dark Mocha Cappuccino",
    category: "Espresso Series",
    price: "Rp 72.000",
    desc: "Deep chocolate notes layered with velvety espresso foam.",
    img: "/assets/starbucks_DarkMochaCappuchino.png",
    tag: "NEW",
    tagColor: "bg-[#CBA258]",
    cal: "310 cal",
  },
  {
    id: 4,
    name: "Pumpkin Spice Latte",
    category: "Seasonal Series",
    price: "Rp 78.000",
    desc: "Warm autumn spices, real pumpkin, espresso. A seasonal icon.",
    img: "/assets/starbucks_PumpkinSpiceLatte.png",
    tag: "LIMITED",
    tagColor: "bg-[#8B4513]",
    cal: "380 cal",
  },
  {
    id: 5,
    name: "Strawberry Frappuccino",
    category: "Frappuccino Series",
    price: "Rp 80.000",
    desc: "Blended strawberry, cream, and ice. Refreshingly vibrant.",
    img: "/assets/starbucks_strawberryfrappuchino.png",
    tag: "POPULAR",
    tagColor: "bg-[#C41E3A]",
    cal: "420 cal",
  },
  {
    id: 6,
    name: "Butter Croissant",
    category: "Bakery",
    price: "Rp 45.000",
    desc: "Flaky, golden, layered with French butter. The perfect pairing.",
    img: "/assets/starbucks_buttercroissant.png",
    tag: "FOOD",
    tagColor: "bg-[#CBA258]",
    cal: "260 cal",
  },
];
 
const stats = [
  { value: "36,000+", label: "Stores Worldwide" },
  { value: "100M+", label: "Weekly Customers" },
  { value: "1971", label: "Year Founded" },
  { value: "80+", label: "Countries Served" },
];
 
export default function Home() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [navOpen, setNavOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
 
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
 
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
 
  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };
 
  const isVisible = (id: string) => visibleSections.has(id);
 
  const filters = ["All", "Espresso", "Green Tea", "Frappuccino", "Seasonal", "Bakery"];
  const filterMap: Record<string, string> = {
    All: "",
    Espresso: "Espresso Series",
    "Green Tea": "Green Tea Series",
    Frappuccino: "Frappuccino Series",
    Seasonal: "Seasonal Series",
    Bakery: "Bakery",
  };
 
  const filteredMenu =
    activeFilter === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === filterMap[activeFilter]);
 
  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans">
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 60 ? "bg-[#1E3932]/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Image
              src="/assets/YOUR_LOGO_FILENAME.png"
              alt="Starbucks"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-white font-bold text-lg tracking-wide">STARBUCKS</span>
          </div>
 
          
          <div className="hidden md:flex gap-8 text-white/80 text-sm font-medium tracking-wider">
            {["Menu", "Story", "Stores"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-[#CBA258] transition-colors duration-200"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>
 
          
          <a
            href="#menu"
            className="hidden md:block bg-[#CBA258] text-[#1E3932] text-sm font-bold px-5 py-2 rounded-full hover:bg-[#d4aa5e] transition-colors duration-200 tracking-wide"
          >
            ORDER NOW
          </a>
 
          
          <button
            className="md:hidden text-white"
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-4 h-0.5 bg-white" />
          </button>
        </div>
 
        
        {navOpen && (
          <div className="md:hidden bg-[#1E3932] px-6 pb-6 flex flex-col gap-4 text-white/80 text-sm font-medium">
            {["Menu", "Story", "Stores"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setNavOpen(false)}
                className="hover:text-[#CBA258]"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </nav>
 
      
      <section className="relative min-h-screen bg-[#1E3932] overflow-hidden flex items-center">
        
        <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full bg-[#00704A]/20 blur-3xl" />
        <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full bg-[#CBA258]/10 blur-2xl" />
 
        
        <div className="absolute top-32 left-6 md:left-12 flex items-center gap-3">
          <div className="h-px w-12 bg-[#CBA258]" />
          <span className="text-[#CBA258] text-xs tracking-[0.3em] font-medium uppercase">
            01 / Introduction
          </span>
        </div>
 
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center w-full pt-28 pb-16">
          
          <div className="z-10">
            <p className="text-[#CBA258] text-xs tracking-[0.4em] font-bold uppercase mb-4">
              Est. 1971 · Seattle, WA
            </p>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
              EVERY
              <br />
              <span className="text-[#00704A]">SIP</span>
              <br />
              HAS A
              <br />
              <span className="italic font-light text-[#CBA258]">Story.</span>
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Premium coffee, thoughtfully sourced, expertly crafted. Experience
              the intersection of quality and community at every Starbucks store.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#menu"
                className="bg-[#00704A] text-white font-bold px-8 py-3 rounded-full hover:bg-[#005c3d] transition-all duration-200 text-sm tracking-widest uppercase"
              >
                Explore Menu
              </a>
              <a
                href="#story"
                className="border border-white/30 text-white font-medium px-8 py-3 rounded-full hover:border-[#CBA258] hover:text-[#CBA258] transition-all duration-200 text-sm tracking-widest uppercase"
              >
                Our Story
              </a>
            </div>
          </div>
 
          
          <div className="flex justify-center items-center relative">
            <div className="absolute w-72 h-72 rounded-full bg-[#00704A]/30 blur-2xl" />
            <div className="relative z-10 hover:scale-105 transition-transform duration-500">
              <Image
                src="/assets/starbucks_cup.png"
                alt="Starbucks Cup"
                width={420}
                height={420}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
 
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/20 animate-pulse" />
        </div>
      </section>
 
      
      <section
        id="stats"
        ref={setRef("stats")}
        className="bg-[#00704A] py-16"
      >
        <div
          className={`max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${
            isVisible("stats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-white text-3xl md:text-5xl font-black tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-xs tracking-widest uppercase font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
 
      
      <section id="menu" ref={setRef("menu")} className="py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div
            className={`mb-14 transition-all duration-700 ${
              isVisible("menu") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#00704A]" />
              <span className="text-[#00704A] text-xs tracking-[0.4em] font-bold uppercase">
                02 / Our Menu
              </span>
            </div>
            <h2 className="text-[#1E3932] text-4xl md:text-6xl font-black tracking-tight mb-4">
              CRAFTED
              <br />
              <span className="text-[#00704A]">FOR YOU.</span>
            </h2>
            <p className="text-[#1E3932]/50 text-base max-w-lg leading-relaxed">
              Each drink is a deliberate choice — sourced from the world&apos;s finest
              farms, prepared to highlight every natural flavor.
            </p>
          </div>
 
          
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-[#1E3932] text-white"
                    : "bg-[#1E3932]/8 text-[#1E3932]/60 hover:bg-[#1E3932]/15"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
 
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item, i) => (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#1E3932]/8 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  isVisible("menu")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => setActiveMenu(item.id)}
              >
                
                <div className="relative bg-[#F2EFE4] h-52 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={180}
                    height={180}
                    className="object-contain group-hover:scale-110 transition-transform duration-500 z-10"
                  />
                  <span
                    className={`absolute top-3 left-3 ${item.tagColor} text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full`}
                  >
                    {item.tag}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/80 text-[#1E3932] text-[10px] font-medium px-2 py-1 rounded-full">
                    {item.cal}
                  </span>
                </div>
 
                
                <div className="p-5">
                  <div className="text-[#00704A] text-[10px] font-bold tracking-widest uppercase mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-[#1E3932] text-lg font-black tracking-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[#1E3932]/50 text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1E3932] font-black text-base">{item.price}</span>
                    <button className="bg-[#00704A] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#1E3932] transition-colors duration-200 tracking-wider uppercase">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      
      <section
        id="story"
        ref={setRef("story")}
        className="bg-[#1E3932] py-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
              isVisible("story") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 border border-[#CBA258]/30 rounded-xl" />
              <div className="relative bg-[#00704A]/20 rounded-2xl p-8 flex justify-center">
                <Image
                  src="/assets/starbucks_matchalatte.png"
                  alt="Featured"
                  width={300}
                  height={300}
                  className="object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-[#00704A]/40 rounded-xl" />
            </div>
 
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#CBA258]" />
                <span className="text-[#CBA258] text-xs tracking-[0.4em] font-bold uppercase">
                  03 / Our Story
                </span>
              </div>
              <h2 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                MORE THAN
                <br />
                <span className="text-[#CBA258]">A COFFEE</span>
                <br />
                COMPANY.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                Since 1971, Starbucks has been more than a place to get coffee — 
                it&apos;s been a gathering place, a community, and a daily ritual 
                for millions around the world.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                We source our beans directly from farmers in over 30 countries, 
                investing in sustainable practices that benefit the entire 
                supply chain — from crop to cup.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Ethically Sourced", "100% of coffee"],
                  ["Farmers Supported", "500K+ globally"],
                  ["Reusable Cups", "↑ 34% YoY"],
                  ["Carbon Reduction", "Target: 50% by 2030"],
                ].map(([label, val], i) => (
                  <div key={i} className="border border-white/10 rounded-xl p-4">
                    <div className="text-[#CBA258] font-black text-sm mb-1">{val}</div>
                    <div className="text-white/50 text-xs tracking-wide">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
 
      
      <section
        id="stores"
        ref={setRef("stores")}
        className="py-24 bg-[#F2EFE4]"
      >
        <div
          className={`max-w-7xl mx-auto px-6 text-center transition-all duration-700 ${
            isVisible("stores") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#00704A]" />
            <span className="text-[#00704A] text-xs tracking-[0.4em] font-bold uppercase">
              04 / Find Us
            </span>
            <div className="h-px w-10 bg-[#00704A]" />
          </div>
          <h2 className="text-[#1E3932] text-4xl md:text-6xl font-black tracking-tight mb-6">
            A STORE
            <br />
            <span className="text-[#00704A]">NEAR YOU.</span>
          </h2>
          <p className="text-[#1E3932]/50 text-base max-w-lg mx-auto leading-relaxed mb-10">
            With over 36,000 locations worldwide, your next great coffee moment
            is closer than you think. Find your nearest Starbucks and come visit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-[#1E3932] text-white font-bold px-10 py-4 rounded-full hover:bg-[#00704A] transition-colors duration-200 text-sm tracking-widest uppercase">
              Find a Store
            </button>
            <button className="border-2 border-[#1E3932] text-[#1E3932] font-bold px-10 py-4 rounded-full hover:border-[#00704A] hover:text-[#00704A] transition-colors duration-200 text-sm tracking-widest uppercase">
              Download App
            </button>
          </div>
 
          
          <div className="mt-16 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto opacity-30">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <Image
                  src="/assets/starbucks_cup.png"
                  alt=""
                  width={60}
                  height={60}
                  className="object-contain"
                  style={{ opacity: 1 - i * 0.12 }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
 
      
      <footer className="bg-[#1E3932] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#00704A] flex items-center justify-center">
                  <Image
                    src="/assets/starbucks_cup.png"
                    alt="Starbucks"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <span className="text-white font-black tracking-wide text-sm">STARBUCKS</span>
              </div>
              <p className="text-white/40 text-xs max-w-xs leading-relaxed">
                Inspiring and nurturing the human spirit — one person, one cup,
                one neighborhood at a time.
              </p>
            </div>
 
            <div className="flex gap-12 text-white/40 text-xs">
              <div className="flex flex-col gap-2">
                <span className="text-white/70 font-bold uppercase tracking-widest text-[10px] mb-1">
                  Company
                </span>
                {["About Us", "Careers", "Newsroom", "Investors"].map((l) => (
                  <a key={l} href="#" className="hover:text-[#CBA258] transition-colors">
                    {l}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/70 font-bold uppercase tracking-widest text-[10px] mb-1">
                  Our Menu
                </span>
                {["Coffee", "Tea", "Frappuccino", "Food"].map((l) => (
                  <a key={l} href="#menu" className="hover:text-[#CBA258] transition-colors">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
 
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-white/25 text-xs">
            <span>© 2026 Starbucks Corporation. All rights reserved.</span>
            <span>Made with Next.js + Tailwind CSS · Module 09</span>
          </div>
        </div>
      </footer>
    </div>
  );
}