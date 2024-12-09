import { Link } from "react-router-dom";
import { Building2, MapPin, Briefcase, Clock } from "lucide-react";
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
  id: string;
  position: string;
  Company: string;
  location: string;
  contractType: string;
  publishedAt: string;
}

interface JobTableProps {
  jobs: Job[] | undefined;
}

export const JobTable = ({ jobs }: JobTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Position</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Posted</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs?.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.position}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                {job.Company}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                {job.location}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-gray-500" />
                {job.contractType}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                {new Date(job.publishedAt || "").toLocaleDateString()}
              </div>
            </TableCell>
            <TableCell>
              <Link to={`/job/${job.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};