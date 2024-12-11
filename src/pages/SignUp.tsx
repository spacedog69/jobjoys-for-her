import { AuthSection } from "@/components/signup/AuthSection";
import { Features } from "@/components/signup/Features";
import { PricingTiers } from "@/components/signup/PricingTiers";
import { Helmet } from "react-helmet";

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Join JobJoys | Create Your Account</title>
        <meta 
          name="description" 
          content="Sign up for JobJoys to access exclusive remote job opportunities, connect with top employers, and advance your career in tech." 
        />
        <meta 
          name="keywords" 
          content="sign up, create account, remote jobs, women in tech, career opportunities" 
        />
        <meta property="og:title" content="Join JobJoys | Create Your Account" />
        <meta 
          property="og:description" 
          content="Sign up for JobJoys to access exclusive remote job opportunities, connect with top employers, and advance your career in tech." 
        />
        <link rel="canonical" href="https://jobjoys.com/signup" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 py-16">
          <article className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold">Join Our Community 🌟</h1>
              <p className="text-xl text-gray-600 mt-4">
                Connect with amazing opportunities tailored for women in tech
              </p>
            </header>
            
            <section className="mb-16">
              <Features />
            </section>
            
            <section className="mb-16">
              <PricingTiers />
            </section>
            
            <section>
              <AuthSection />
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default SignUp;