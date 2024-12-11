import { AuthSection } from "@/components/signup/AuthSection";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login to JobJoys | Access Your Account</title>
        <meta 
          name="description" 
          content="Login to your JobJoys account to manage your job applications, track opportunities, and stay connected with top remote employers." 
        />
        <meta 
          name="keywords" 
          content="login, job board login, remote jobs account, women in tech" 
        />
        <meta property="og:title" content="Login to JobJoys | Access Your Account" />
        <meta 
          property="og:description" 
          content="Login to your JobJoys account to manage your job applications, track opportunities, and stay connected with top remote employers." 
        />
        <link rel="canonical" href="https://jobjoys.com/login" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 py-16">
          <article className="max-w-md mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold">Welcome Back! 👋</h1>
              <p className="text-gray-600 mt-2">
                Login to access your account
              </p>
            </header>
            <section>
              <AuthSection />
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default Login;