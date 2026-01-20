import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { JobFiltersComponent } from "@/components/JobFilters";
import { JobFilters, Job } from "@/types";
import { jobsApi } from "@/lib/jobs.api";

/* local helper — replaces mock util */
const getUniqueValues = <T, K extends keyof T>(
  items: T[],
  key: K
): string[] => {
  return Array.from(new Set(items.map((item) => String(item[key]))));
};

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilters>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* 🔌 BACKEND CALL VIA jobsApi */
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await jobsApi.getAll();
        console.log(data);
        setJobs(data);
      } catch {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  /* only active jobs */
  const activeJobs = useMemo(
    () => jobs.filter((job) => job.status === "active"),
    [jobs]
  );

  /* filter options */
  const departments = getUniqueValues(activeJobs, "department");
  const locations = getUniqueValues(activeJobs, "location");
  const types = getUniqueValues(activeJobs, "type");

  /* client-side filtering */
  const filteredJobs = useMemo(() => {
    return activeJobs.filter((job) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !job.title.toLowerCase().includes(q) &&
          !job.description.toLowerCase().includes(q) &&
          !job.department.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      if (filters.department && job.department !== filters.department)
        return false;

      if (filters.location && job.location !== filters.location)
        return false;

      if (filters.type && job.type !== filters.type)
        return false;

      return true;
    });
  }, [activeJobs, filters]);

  /* loading */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading jobs…</p>
        </main>
        <Footer />
      </div>
    );
  }

  /* error */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-destructive">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-screen-xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Open Positions
            </h1>
            <p className="text-muted-foreground">
              {filteredJobs.length} opportunities available
            </p>
          </div>

          <div className="mb-8">
            <JobFiltersComponent
              filters={filters}
              onFiltersChange={setFilters}
              departments={departments}
              locations={locations}
              types={types}
            />
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No positions match your current filters.
              </p>
              <button
                onClick={() => setFilters({})}
                className="text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
