import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface JobDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedJob: string | null;
  jobCount: number;
}

export const JobDialog = ({ isOpen, onOpenChange, selectedJob, jobCount }: JobDialogProps) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            🎯 We Found Your Perfect Match!
          </DialogTitle>
          <DialogDescription className="text-center space-y-4">
            <p className="text-lg">
              <span className="font-semibold text-primary">
                {jobCount}+ jobs
              </span> match your search for{" "}
              <span className="font-semibold">{selectedJob}</span>
            </p>
            <div className="p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg text-foreground">
                Get Instant Access to:
              </h3>
              <ul className="space-y-2 text-left">
                <li>✨ Exclusive remote job listings</li>
                <li>🚀 Early access to new opportunities</li>
                <li>📈 Salary insights and negotiations tips</li>
              </ul>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleSignUp}
            >
              Sign Up Now
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};