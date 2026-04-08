import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building2,
  Users,
  Target,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { jobsApi } from "@/lib/jobs.api";
import { Job } from "@/types";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        const data = await jobsApi.getById(id);
        setJob(data);
      } catch (err) {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Role Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The role you're looking for doesn't exist or may have been removed.
            </p>
            <Button asChild>
              <Link to="/jobs">View All Jobs</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const typeColors: Record<string, string> = {
    "full-time": "bg-primary/20 text-primary-foreground border-primary/40",
    "part-time": "bg-secondary text-secondary-foreground",
    contract: "bg-muted text-muted-foreground",
    internship: "bg-accent/30 text-accent-foreground",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-screen-xl">
          {/* Back Link */}
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all jobs
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Header */}
              <div className="bg-card p-6 md:p-8 rounded-lg border">
                <div className="flex flex-wrap items-start gap-3 mb-4">
                  <Badge
                    variant="outline"
                    className={`capitalize ${typeColors[job.type]}`}
                  >
                    {job.type}
                  </Badge>
                  {job.status === "active" && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      Actively Hiring
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
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
              </div>

              {/* About the Role */}
              <div className="bg-card p-6 md:p-8 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Role Overview</h2>
                <p className="text-muted-foreground">{job.description}</p>
              </div>

              {/* Who We Are */}
              <div className="bg-card p-6 md:p-8 rounded-lg border">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">About itnest</h2>
                </div>
                <p className="text-muted-foreground">{job.whoWeAre}</p>
              </div>

              {/* What We Look For */}
              <div className="bg-card p-6 md:p-8 rounded-lg border">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">What We're Looking For</h2>
                </div>
                <p className="text-muted-foreground">{job.whatWeLookFor}</p>
              </div>

              {/* Qualifications */}
              <div className="bg-card p-6 md:p-8 rounded-lg border">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Qualifications</h2>
                </div>
                <ul className="space-y-3">
                  {job.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div className="bg-card p-6 md:p-8 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Application Form */}
              <div id="apply">
                <h2 className="text-2xl font-bold mb-6">Apply for this role</h2>
                <ApplicationForm jobId={job.id} jobTitle={job.title} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Apply Card */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-4">Interested in this opportunity?</h3>
                  <Button asChild className="w-full shadow-primary" size="lg">
                    <a href="#apply">Apply Now</a>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    We typically review applications within 3–5 business days
                  </p>
                </div>

                {/* Job Summary */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-4">Job Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-medium">{job.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium capitalize">{job.type}</span>
                    </div>
                    {job.salary && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Salary</span>
                        <span className="font-medium">{job.salary}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      {/*<span className="text-muted-foreground">Posted</span>
                      <span className="font-medium">
                        {job.createdAt &&
                          new Date(job.createdAt).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                      </span>*/}
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-4">Share this job</h3>
                  <p className="text-sm text-muted-foreground">
                    Know someone who would be perfect for this role? Share it
                    with them!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetail;
