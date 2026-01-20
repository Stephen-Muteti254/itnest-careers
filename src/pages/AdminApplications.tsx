import { useEffect, useState } from "react";
import { applicationsApi } from "@/lib/applications.api.ts";

import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Application } from "@/types";
import {
  Search,
  Eye,
  FileText,
  Download,
  Mail,
  Calendar,
  Briefcase,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);


  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await applicationsApi.list();
        console.log(res);
        setApplications(res.applications);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load applications",
          variant: "destructive",
        });
      }
    };

    loadApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: Application["status"]) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reviewing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "interviewed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-screen-xl">
          {/* Back Link */}
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Applications</h1>
              <p className="text-muted-foreground">
                Review and manage candidate applications
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or job title..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                {filteredApplications.length} Application
                {filteredApplications.length !== 1 ? "s" : ""}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredApplications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Applicant</th>
                        <th className="text-left py-3 px-4 font-medium">Position</th>
                        <th className="text-left py-3 px-4 font-medium">Submitted</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((app) => (
                        <tr
                          key={app.id}
                          className="border-b last:border-0 hover:bg-muted/50"
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{app.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {app.email}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{app.jobTitle}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(app.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Select
                              value={app.status}
                              onValueChange={(value) =>
                                updateStatus(app.id, value as Application["status"])
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <Badge className={`capitalize ${getStatusColor(app.status)}`}>
                                  {app.status}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewing">Reviewing</SelectItem>
                                <SelectItem value="interviewed">Interviewed</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedApplication(app)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Application Details</DialogTitle>
                                  </DialogHeader>
                                  {selectedApplication && (
                                    <div className="space-y-6">
                                      {/* Applicant Info */}
                                      <div className="space-y-2">
                                        <h3 className="font-semibold flex items-center gap-2">
                                          <Mail className="h-4 w-4" />
                                          Contact Information
                                        </h3>
                                        <div className="grid gap-2 text-sm">
                                          <p>
                                            <span className="text-muted-foreground">Name:</span>{" "}
                                            {selectedApplication.name}
                                          </p>
                                          <p>
                                            <span className="text-muted-foreground">Email:</span>{" "}
                                            {selectedApplication.email}
                                          </p>
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Documents */}
                                      <div className="space-y-2">
                                        <h3 className="font-semibold flex items-center gap-2">
                                          <FileText className="h-4 w-4" />
                                          Documents
                                        </h3>
                                        <div className="flex gap-3">
                                          <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            {selectedApplication.resumeName}
                                          </Button>
                                          <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            {selectedApplication.coverLetterName}
                                          </Button>
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Experience */}
                                      <div className="space-y-2">
                                        <h3 className="font-semibold flex items-center gap-2">
                                          <Briefcase className="h-4 w-4" />
                                          Work Experience
                                        </h3>
                                        <div className="space-y-3">
                                          {selectedApplication.experiences.map((exp) => (
                                            <div
                                              key={exp.id}
                                              className="p-3 border rounded-lg text-sm"
                                            >
                                              <p className="font-medium">{exp.title}</p>
                                              <p className="text-muted-foreground">
                                                {exp.company}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                              </p>
                                              {exp.description && (
                                                <p className="mt-2">{exp.description}</p>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Education */}
                                      <div className="space-y-2">
                                        <h3 className="font-semibold flex items-center gap-2">
                                          <GraduationCap className="h-4 w-4" />
                                          Education
                                        </h3>
                                        <div className="space-y-3">
                                          {selectedApplication.education.map((edu) => (
                                            <div
                                              key={edu.id}
                                              className="p-3 border rounded-lg text-sm"
                                            >
                                              <p className="font-medium">
                                                {edu.degree} in {edu.field}
                                              </p>
                                              <p className="text-muted-foreground">
                                                {edu.institution}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                {edu.startDate} - {edu.current ? "Expected" : edu.endDate}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <Separator />

                                      {/* Submission Info */}
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                          Submitted on{" "}
                                          {new Date(
                                            selectedApplication.submittedAt
                                          ).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No applications match your search criteria.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminApplications;
