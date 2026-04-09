import { useState } from "react";
import { Experience, Education } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { applicationsApi, ApplicationPayload } from "@/lib/applications.api";

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  onSuccess?: () => void;
}

export const ApplicationForm = ({ jobId, jobTitle, onSuccess }: ApplicationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    coverLetter: null as File | null,
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: crypto.randomUUID(),
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
    },
  ]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: crypto.randomUUID(),
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    }
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        current: false,
      },
    ]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter((edu) => edu.id !== id));
    }
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };


  const formatDate = (date: string) => {
    if (!date) return null;
    return date.length === 7 ? `${date}-01` : date;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: ApplicationPayload = {
        jobId,
        name: formData.name,
        email: formData.email,
        resume: formData.resume!,
        coverLetter: formData.coverLetter!,
        experiences: experiences.map(exp => ({
          ...exp,
          startDate: formatDate(exp.startDate),
          endDate: exp.current ? null : formatDate(exp.endDate),
        })),
        education: education.map(edu => ({
          ...edu,
          startDate: formatDate(edu.startDate),
          endDate: edu.current ? null : formatDate(edu.endDate),
        })),
      };

      await applicationsApi.submit(payload);

      toast({
        title: "Application Submitted!",
        description: `Your application for ${jobTitle} has been received. We'll be in touch soon.`,
      });

      setSubmitted(true);
      onSuccess?.();
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err?.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="bg-popover">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
          <p className="text-muted-foreground max-w-md">
            Thank you for applying to {jobTitle}. Our team will review your
            application and get back to you within 5-7 business days.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <Card className="bg-popover">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="bg-popover">
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="resume">Resume/CV *</Label>
              <div className="relative">
                <Input
                  id="resume"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  className="cursor-pointer"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      resume: e.target.files?.[0] || null,
                    })
                  }
                />
                {formData.resume && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.resume.name}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <div className="relative">
                <Input
                  id="coverLetter"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  className="cursor-pointer"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coverLetter: e.target.files?.[0] || null,
                    })
                  }
                />
                {formData.coverLetter && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.coverLetter.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card className="bg-popover">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addExperience}>
            <Plus className="h-4 w-4 mr-1" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="space-y-4 p-4 border rounded-lg relative">
              {experiences.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-destructive hover:text-destructive"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    required
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    required
                    placeholder="Your Role"
                    value={exp.title}
                    onChange={(e) =>
                      updateExperience(exp.id, "title", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="date"
                    required
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: MM/DD/YYYY
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>End Date {exp.current ? "(Current)" : "*"}</Label>
                  <Input
                    type="month"
                    disabled={exp.current}
                    required={!exp.current}
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: MM/DD/YYYY
                  </p>
                </div>
                <div className="flex items-end pb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) =>
                        updateExperience(exp.id, "current", !!checked)
                      }
                    />
                    <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your responsibilities and achievements..."
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(exp.id, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="bg-popover">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addEducation}>
            <Plus className="h-4 w-4 mr-1" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="space-y-4 p-4 border rounded-lg relative">
              {education.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-destructive hover:text-destructive"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    required
                    placeholder="University/College Name"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, "institution", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    required
                    placeholder="e.g., Bachelor's, Master's, PhD"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Field of Study *</Label>
                <Input
                  required
                  placeholder="e.g., Computer Science, English Literature"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(edu.id, "field", e.target.value)
                  }
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    required
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "startDate", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: MM/DD/YYYY
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>End Date {edu.current ? "(Expected)" : "*"}</Label>
                  <Input
                    type="month"
                    required={!edu.current}
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "endDate", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: MM/DD/YYYY
                  </p>
                </div>
                <div className="flex items-end pb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-edu-${edu.id}`}
                      checked={edu.current}
                      onCheckedChange={(checked) =>
                        updateEducation(edu.id, "current", !!checked)
                      }
                    />
                    <Label htmlFor={`current-edu-${edu.id}`}>Currently enrolled</Label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <Upload className="h-4 w-4 mr-2 animate-pulse" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </div>
    </form>
  );
};
