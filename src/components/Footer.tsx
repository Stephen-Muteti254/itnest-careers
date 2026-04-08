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
              <img src={logoLight} alt="itnest" className="h-8 w-8" />
              <span className="text-lg font-bold text-foreground">
                itnest <span className="text-primary">Careers</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Join our mission to build innovative technology solutions for businesses
worldwide. We're creating scalable, secure, and impactful digital systems—
one talented team member at a time.
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
                  Open Roles
                </Link>
              </li>
              <li>
                <a
                  href="https://itnest.org"
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
              <li>support@itnest.org</li>
              <li>
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} itnest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
