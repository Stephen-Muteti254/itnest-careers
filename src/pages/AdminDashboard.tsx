import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Job } from "@/types";
import { Plus, Pencil, Trash2, Eye, Users, Briefcase, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { jobsApi } from "@/lib/jobs.api";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [formData, setFormData] = useState<Partial<Job>>({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    whoWeAre: "AcademicHub is a leading platform dedicated to advancing academic excellence. We connect scholars, researchers, and students with the resources they need to succeed.",
    whatWeLookFor: "",
    qualifications: [],
    responsibilities: [],
    status: "active",
  });

  const [qualificationsText, setQualificationsText] = useState("");
  const [responsibilitiesText, setResponsibilitiesText] = useState("");

  const stats = [
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: jobs.filter((j) => j.status === "active").length,
    },
    {
      icon: Users,
      label: "Total Applicants",
      value: 23,
    },
    {
      icon: FileText,
      label: "Pending Reviews",
      value: 8,
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobsApi.getAll();
        setJobs(data);
      } catch (err) {
        toast({
          title: "Failed to load jobs",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "full-time",
      salary: "",
      description: "",
      whoWeAre: "AcademicHub is a leading platform dedicated to advancing academic excellence. We connect scholars, researchers, and students with the resources they need to succeed.",
      whatWeLookFor: "",
      qualifications: [],
      responsibilities: [],
      status: "active",
    });
    setQualificationsText("");
    setResponsibilitiesText("");
    setEditingJob(null);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData(job);
    setQualificationsText(job.qualifications.join("\n"));
    setResponsibilitiesText(job.responsibilities.join("\n"));
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const qualifications = qualificationsText
      .split("\n")
      .filter(Boolean);

    const responsibilities = responsibilitiesText
      .split("\n")
      .filter(Boolean);

    const jobData: Job = {
      id: editingJob?.id ?? "",
      title: formData.title || "",
      department: formData.department || "",
      location: formData.location || "",
      type: formData.type as Job["type"],
      salary: formData.salary,
      description: formData.description || "",
      whoWeAre: formData.whoWeAre || "",
      whatWeLookFor: formData.whatWeLookFor || "",
      qualifications,
      responsibilities,
      status: formData.status as Job["status"],
      createdAt: editingJob?.createdAt,
    };

    try {
      if (editingJob) {
        const updated = await jobsApi.update(editingJob.id, jobData);
        setJobs((prev) =>
          prev.map((j) => (j.id === updated.id ? updated : j))
        );

        toast({
          title: "Job Updated",
          description: `${updated.title} updated successfully.`,
        });
      } else {
        const created = await jobsApi.create(jobData);
        setJobs((prev) => [created, ...prev]);

        toast({
          title: "Job Created",
          description: `${created.title} posted successfully.`,
        });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      toast({
        title: "Operation failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };


  const handleDelete = async (id: string) => {
    try {
      await jobsApi.delete(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));

      toast({
        title: "Job Deleted",
        description: "The job posting has been removed.",
      });
    } catch (err) {
      toast({
        title: "Delete failed",
        description: "Unable to delete job.",
        variant: "destructive",
      });
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-red-100 text-red-800 border-red-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-screen-xl">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage job postings and applications
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to="/admin/applications">View Applications</Link>
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                          id="title"
                          required
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department *</Label>
                        <Input
                          id="department"
                          required
                          value={formData.department}
                          onChange={(e) =>
                            setFormData({ ...formData, department: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          required
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Job Type *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData({ ...formData, type: value as Job["type"] })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary">Salary Range</Label>
                        <Input
                          id="salary"
                          placeholder="e.g., $60,000 - $80,000"
                          value={formData.salary}
                          onChange={(e) =>
                            setFormData({ ...formData, salary: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea
                        id="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whoWeAre">Who We Are</Label>
                      <Textarea
                        id="whoWeAre"
                        rows={3}
                        value={formData.whoWeAre}
                        onChange={(e) =>
                          setFormData({ ...formData, whoWeAre: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatWeLookFor">What We Look For *</Label>
                      <Textarea
                        id="whatWeLookFor"
                        required
                        rows={3}
                        placeholder="Describe the ideal candidate personality and traits..."
                        value={formData.whatWeLookFor}
                        onChange={(e) =>
                          setFormData({ ...formData, whatWeLookFor: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualifications">
                        Qualifications (one per line) *
                      </Label>
                      <Textarea
                        id="qualifications"
                        required
                        rows={4}
                        placeholder="Bachelor's degree required&#10;3+ years experience&#10;Strong communication skills"
                        value={qualificationsText}
                        onChange={(e) => setQualificationsText(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsibilities">
                        Responsibilities (one per line) *
                      </Label>
                      <Textarea
                        id="responsibilities"
                        required
                        rows={4}
                        placeholder="Lead team projects&#10;Develop new features&#10;Collaborate with stakeholders"
                        value={responsibilitiesText}
                        onChange={(e) => setResponsibilitiesText(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData({ ...formData, status: value as Job["status"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsDialogOpen(false);
                          resetForm();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingJob ? "Update Job" : "Create Job"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-card">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Title</th>
                      <th className="text-left py-3 px-4 font-medium">Department</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-muted-foreground">
                          Loading jobs...
                        </td>
                      </tr>
                    ) : jobs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-muted-foreground">
                          No jobs found
                        </td>
                      </tr>
                    ) : (
                    jobs.map((job) => (
                      <tr key={job.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{job.title}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {job.department}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {job.location}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="capitalize">
                            {job.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`capitalize ${getStatusColor(job.status)}`}>
                            {job.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                            >
                              <Link to={`/jobs/${job.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(job)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(job.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
