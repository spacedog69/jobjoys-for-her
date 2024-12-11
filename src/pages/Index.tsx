import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { Reviews } from "@/components/Reviews";
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
        <article className="container mx-auto px-4">
          <header className="text-center py-16">
            <h1 className="text-5xl font-bold mb-4">
              Find Your Dream Remote Job 🚀
            </h1>
            <p className="text-xl text-gray-600">
              Join 300,000+ women discovering amazing remote opportunities
            </p>
          </header>
          <section>
            <Features />
          </section>
          <section>
            <Reviews />
          </section>
        </article>
      </main>
    </>
  );
};

export default Index;