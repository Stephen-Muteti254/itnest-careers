import { Link } from "react-router-dom";
import { Job } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Building2, ArrowRight } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const typeColors: Record<string, string> = {
    "full-time": "bg-primary/20 text-primary-foreground border-primary/40",
    "part-time": "bg-secondary text-secondary-foreground",
    contract: "bg-muted text-muted-foreground",
    internship: "bg-accent/30 text-accent-foreground",
  };

  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:border-primary/40 bg-popover">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {job.title}
            </CardTitle>
            <Badge
              variant="outline"
              className={`shrink-0 capitalize ${typeColors[job.type]}`}
            >
              {job.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
          <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            View Details
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
