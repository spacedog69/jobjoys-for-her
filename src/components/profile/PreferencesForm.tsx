import { Settings } from "lucide-react";

export function PreferencesForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Preferences</h2>
      </div>
      <p className="text-muted-foreground">
        Job preferences can be updated from the main jobs page filters.
      </p>
    </div>
  );
}