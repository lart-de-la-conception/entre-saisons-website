type SiteFooterProps = {
  text?: string;
  fixed?: boolean;
};

export default function SiteFooter({ text = "© Entre Saisons 2026", fixed = true }: SiteFooterProps) {
  return (
    <footer className={`${fixed ? "fixed bottom-0 left-0" : ""} px-6 py-4 text-xs text-[#0f1a2b]/70`}>
      {text}
    </footer>
  );
}

