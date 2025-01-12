const Footer = () => {
  return (
    <footer
      className="px-6 py-4 text-center border-t border-border bg-muted text-muted-foreground"
      id="footer"
    >
      <p className="mb-4">Follow us on:</p>
      <div className="flex justify-center gap-4">
        <a href="https://twitter.com" aria-label="Twitter">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* Ícone do Twitter */}
          </svg>
        </a>
        <a href="https://linkedin.com" aria-label="LinkedIn">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* Ícone do LinkedIn */}
          </svg>
        </a>
        <a href="https://github.com" aria-label="GitHub">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {/* Ícone do GitHub */}
          </svg>
        </a>
      </div>
      <p className="mt-6 text-sm">
        © {new Date().getFullYear()} Proj Man. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
