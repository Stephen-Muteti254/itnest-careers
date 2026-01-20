import { Link } from "react-router-dom";
import logoLight from "@/assets/logo-light-bg.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container max-w-screen-xl py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoLight} alt="AcademicHub" className="h-8 w-8" />
              <span className="text-lg font-bold text-foreground">
                AcademicHub <span className="text-primary">Careers</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Join our mission to advance academic excellence worldwide. We're
              building the future of academic support, one talented team member
              at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-primary transition-colors">
                  Open Positions
                </Link>
              </li>
              <li>
                <a
                  href="https://academichubpro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Main Website
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@academichubpro.com</li>
              <li>575 5th Ave Fl 14
                New York City, New York
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AcademicHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
