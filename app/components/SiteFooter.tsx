type SiteFooterProps = {
  text?: string;
  fixed?: boolean;
};

export default function SiteFooter({ text = "© Entre Saisons 2026", fixed = true }: SiteFooterProps) {
  return (
    <footer
      className={`${fixed ? "fixed bottom-0 left-0 right-0" : ""} flex w-full items-center justify-between gap-4 px-4 py-3 text-[10px] text-[#0f1a2b]/70 sm:px-6 sm:py-4 sm:text-xs`}
    >
      <span>{text}</span>
      <a
        href="https://dylanroman.co"
        target="_blank"
        rel="noreferrer"
        className="transition-opacity hover:opacity-100 opacity-80"
      >
        website by dylan
      </a>
    </footer>
  );
}

