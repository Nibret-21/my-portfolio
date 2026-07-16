export default function Footer({ profile }) {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="section-wrap !py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-light/60 dark:text-ink-dark/60">
        <p>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#top" className="hover:text-accent-violet transition-colors">Back to top</a>
          <a href="/privacy" className="hover:text-accent-violet transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-accent-violet transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
