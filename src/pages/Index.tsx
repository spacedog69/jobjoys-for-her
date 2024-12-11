import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { Reviews } from "@/components/Reviews";
import { SearchBar } from "@/components/SearchBar";
import { JobPreview } from "@/components/JobPreview";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>JobJoys | Remote Jobs for Women in Tech</title>
        <meta 
          name="description" 
          content="Find the best remote job opportunities for women in tech. Join our community of 300,000+ professional women and discover your next career move." 
        />
        <meta 
          name="keywords" 
          content="women in tech, remote jobs, tech careers, female professionals, remote work, job board" 
        />
        <meta property="og:title" content="JobJoys | Remote Jobs for Women in Tech" />
        <meta 
          property="og:description" 
          content="Find the best remote job opportunities for women in tech. Join our community of 300,000+ professional women and discover your next career move." 
        />
        <link rel="canonical" href="https://jobjoys.com" />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <div className="relative">
          {/* Hero Section with Search */}
          <div 
            className="min-h-[600px] flex flex-col items-center justify-center px-4 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=2000&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center mb-8">
              <h1 className="text-5xl font-bold mb-4 text-white">
                Find Your Dream Remote Job 🚀
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Join 300,000+ women discovering amazing remote opportunities
              </p>
              <SearchBar />
            </div>
          </div>

          {/* Job Listings Preview */}
          <JobPreview />

          {/* Features Section */}
          <section className="py-16">
            <Features />
          </section>

          {/* Reviews Section */}
          <section className="py-16 bg-gray-50">
            <Reviews />
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;