import { eventConfig } from "@/config/event";

export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-[20px] md:flex-row md:justify-between md:px-[64px]">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-display text-label-md font-bold tracking-widest text-primary">
            {eventConfig.nav.brandName}
          </span>
          <p className="text-body-md text-on-surface-variant">
            {eventConfig.footer.copyright}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={eventConfig.footer.privacyPolicyUrl}
            className="text-body-md text-on-surface-variant transition-colors hover:text-primary"
          >
            개인정보처리방침
          </a>
          <a
            href={`mailto:${eventConfig.contactEmail}`}
            className="text-body-md font-semibold text-primary underline underline-offset-4"
          >
            {eventConfig.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
