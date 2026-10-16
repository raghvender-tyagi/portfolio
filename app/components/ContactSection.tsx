import { portfolioContent } from "@/data/content";

export default function ContactSection() {
  const { contact } = portfolioContent;

  return (
    <footer
      id="contact"
      className="w-full bg-[#161616] text-[#E4E4E4] pt-24 pb-16 px-6 md:px-12 lg:px-16 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Main Call to Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-[#2A2A2A]">
          <div className="lg:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#8E8E8E] mb-4 flex items-center gap-2">
              <span className="text-[#3B4BFF] font-bold">05 / CONTACT</span>
              <span>—</span>
              <span>DIRECT DISPATCH & CHANNELS</span>
            </div>
            <h2 className="font-headline font-light text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#E4E4E4] leading-[1]">
              {contact.heading}
            </h2>
            <p className="font-headline text-base md:text-xl text-[#8E8E8E] mt-6 max-w-2xl leading-relaxed">
              {contact.subheading}
            </p>
          </div>

          {/* Quick Direct Contacts & Resume Download */}
          <div className="lg:col-span-4 flex flex-col gap-4 font-mono text-xs">
            <div className="p-6 border border-[#2E2E2E] bg-[#1C1C1C]">
              <div className="text-[10px] text-[#777777] uppercase tracking-wider mb-2">
                DIRECT INBOX:
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm md:text-base text-[#E4E4E4] hover:text-[#3B4BFF] transition-colors block break-all font-semibold"
              >
                {contact.email}
              </a>

              <div className="text-[10px] text-[#777777] uppercase tracking-wider mt-5 mb-2">
                PHONE / WHATSAPP:
              </div>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="text-sm text-[#E4E4E4] hover:text-[#3B4BFF] transition-colors block font-semibold"
              >
                {contact.phone}
              </a>
            </div>

            <a
              href="/Raghvender_Tyagi_Resume.pdf"
              download
              className="px-6 py-4 bg-[#3B4BFF] text-white hover:bg-[#2F3ECC] transition-colors font-bold tracking-wider text-center border border-[#3B4BFF] uppercase text-xs flex items-center justify-center gap-2"
            >
              <span>DOWNLOAD RESUME [PDF]</span>
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* Social Links & Platform Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {contact.socials.map((social) => (
            <a
              key={social.code}
              href={social.href}
              target={social.code === "PDF" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="p-5 border border-[#262626] bg-[#181818] hover:border-[#3B4BFF] hover:bg-[#1E1E1E] transition-all group"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-[#666666] mb-3">
                <span>PORT // [{social.code}]</span>
                <span className="text-[#3B4BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </div>
              <div className="font-mono text-sm uppercase text-[#E4E4E4] font-semibold">
                {social.label}
              </div>
              <div className="font-mono text-[11px] text-[#8E8E8E] mt-1 truncate">
                {social.display}
              </div>
            </a>
          ))}
        </div>

        {/* Minimal Pixel Footer */}
        <div className="pt-12 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#666666]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#3B4BFF]" />
            <span>
              © {new Date().getFullYear()} RAGHVENDER TYAGI // AI SYSTEMS & DISTRIBUTED BACKEND
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>STARK EDITORIAL v2.0</span>
            <span>28.6692° N, 77.4538° E</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

