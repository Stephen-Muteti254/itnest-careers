import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/JobCard";
import { ArrowRight, Users, Target, Award, Heart } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Job } from "@/types";
import { useToast } from "@/hooks/use-toast";


const Index = () => {
  const { toast } = useToast();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);


  const coreValues = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from research to customer service.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe great work happens when diverse minds come together with shared purpose.",
    },
    {
      icon: Award,
      title: "Integrity",
      description: "We uphold academic honesty and ethical practices as the foundation of our work.",
    },
    {
      icon: Heart,
      title: "Impact",
      description: "We're driven by the positive difference we make in students' and scholars' lives.",
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get<Job[]>("/jobs");
        setJobs(res.data.jobs);
      } catch (error) {
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


  const featuredJobs = jobs
    .filter((job) => job.status === "active")
    .slice(0, 3);


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
          </div>
          <div className="container relative z-10 max-w-screen-xl py-24 md:py-32">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Shape the Future of{" "}
                <span className="text-primary">Academic Excellence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Join a team of passionate educators, researchers, and innovators
                dedicated to empowering academic success worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="shadow-primary">
                  <Link to="/jobs">
                    View Open Positions
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#about">Learn About Us</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16 md:py-24">
          <div className="container max-w-screen-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Opportunities</h2>
                <p className="text-muted-foreground">
                  Discover roles where you can make a real impact
                </p>
              </div>
              <Button asChild variant="ghost">
                <Link to="/jobs">
                  View All Positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <p className="col-span-full text-center text-muted-foreground">
                  Loading opportunities...
                </p>
              ) : featuredJobs.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground">
                  No open positions at the moment.
                </p>
              ) : (
                featuredJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <JobCard job={job} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-card">
          <div className="container max-w-screen-xl">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <p className="text-lg text-muted-foreground">
                AcademicHub is a leading platform dedicated to advancing academic
                excellence. We connect scholars, researchers, and students with
                the resources they need to succeed. Our mission is to democratize
                access to quality academic support while maintaining the highest
                standards of integrity and professionalism.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {coreValues.map((value, index) => (
                <div
                  key={value.title}
                  className="p-6 bg-popover rounded-lg border text-center animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 gradient-primary">
          <div className="container max-w-screen-xl text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Join Our Team?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Take the next step in your career. Browse our open positions and
              find the perfect role for you.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/jobs">
                Explore Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
