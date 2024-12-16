import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ email }]);

      if (error) throw error;

      toast.success("Thank you for subscribing!");
      setIsVisible(false);
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
            <img
              src="/lovable-uploads/ee000dad-5077-4f9a-89d9-72d6e20afe76.png"
              alt="Woman working on laptop by the marina"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center text-primary">
            <Mail className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold">Stay Updated!</h2>
          </div>
          <p className="text-center text-gray-600">
            Receive the latest job openings directly in your inbox, completely free!
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};