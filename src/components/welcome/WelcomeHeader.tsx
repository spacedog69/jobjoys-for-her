import { Heart } from "lucide-react";

export const WelcomeHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <Heart className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold">Welcome to Our Community!</h1>
      <p className="text-base md:text-lg text-gray-400">
        We're excited to have you join us. Let's get to know you better.
      </p>
    </div>
  );
};