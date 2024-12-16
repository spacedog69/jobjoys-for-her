import { Link } from "react-router-dom";
import { Building2, MapPin, Briefcase, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Job {
  id: number;
  position: string;
  Company: string;
  location: string;
  contractType: string;
  salary_min: number | null;
  salary_max: number | null;
}

interface JobTableProps {
  jobs: Job[] | undefined;
}

export const JobTable = ({ jobs }: JobTableProps) => {
  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Not specified";
    if (min && !max) return `$${(min / 1000).toFixed(0)}k+`;
    if (!min && max) return `Up to $${(max / 1000).toFixed(0)}k`;
    return `$${(min! / 1000).toFixed(0)}k - $${(max! / 1000).toFixed(0)}k`;
  };

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%] min-w-[200px]">Position</TableHead>
            <TableHead className="min-w-[150px]">Company</TableHead>
            <TableHead className="min-w-[120px]">Location</TableHead>
            <TableHead className="min-w-[100px]">Type</TableHead>
            <TableHead className="min-w-[120px]">Salary</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.position}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-500 hidden sm:block" />
                  {job.Company}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 hidden sm:block" />
                  {job.location}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500 hidden sm:block" />
                  {job.contractType}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500 hidden sm:block" />
                  {formatSalary(job.salary_min, job.salary_max)}
                </div>
              </TableCell>
              <TableCell>
                <Link to={`/job/${job.id}`}>
                  <Button variant="outline" className="w-full whitespace-nowrap">
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};