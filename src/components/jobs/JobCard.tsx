import { Link } from "react-router-dom";

interface JobCardProps {
  job: {
    title: string;
    company: string;
    type: string;
    description: string;
    salary: string;
    posted: string;
  };
  index: number;
  onJobClick: (job: any) => void;
}

export const JobCard = ({ job, index, onJobClick }: JobCardProps) => {
  return (
    <div
      onClick={() => onJobClick(job)}
      className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in opacity-0 hover:shadow-md transition-shadow cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
          <p className="text-primary">{job.company}</p>
        </div>
        <span className="bg-secondary px-3 py-1 rounded-full text-sm">
          {job.type}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{job.salary}</span>
        <span>Posted {job.posted}</span>
      </div>
    </div>
  );
};