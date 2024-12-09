import { Search, Rocket, Bell } from "lucide-react";

export const Features = () => (
  <div className="space-y-6">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-primary/20 rounded-lg">
        <Search className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">
          Discover hidden jobs
        </h3>
        <p className="text-gray-300">
          We scan the internet everyday and find remote jobs perfect for women,
          not posted on LinkedIn or other job boards.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <div className="p-3 bg-primary/20 rounded-lg">
        <Rocket className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">
          Head start against the competition
        </h3>
        <p className="text-gray-300">
          We find jobs within 24 hours of being posted, so you can apply
          before everyone else.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <div className="p-3 bg-primary/20 rounded-lg">
        <Bell className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">
          Be the first to know
        </h3>
        <p className="text-gray-300">
          Get instant notifications for new remote opportunities that match
          your preferences.
        </p>
      </div>
    </div>
  </div>
);