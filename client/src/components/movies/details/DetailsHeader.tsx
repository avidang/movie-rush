interface DetailsHeaderProps {
  title: string;
  tagline: string;
  statusLabel: string;
  languageLabel: string;
  releaseYearLabel: string;
  runtimeLabel: string;
  ratingLabel: string;
  votesLabel: string;
}

export const DetailsHeader = ({
  title,
  tagline,
  statusLabel,
  languageLabel,
  releaseYearLabel,
  runtimeLabel,
  ratingLabel,
  votesLabel,
}: DetailsHeaderProps) => (
  <div className="space-y-3">
    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary-text">
      <span>{statusLabel}</span>
      <span className="h-1 w-1 rounded-full bg-primary-text" />
      <span>{languageLabel}</span>
    </div>
    <h1 className="text-3xl font-semibold text-primary-text sm:text-4xl">
      {title}
    </h1>
    {tagline ? (
      <p className="text-sm italic text-primary-text">{tagline}</p>
    ) : null}
    <div className="flex flex-wrap items-center gap-3 text-sm text-primary-text">
      <span className="rounded-full bg-primary text-primary-text px-3 py-1">
        {releaseYearLabel}
      </span>
      <span className="rounded-full bg-primary text-primary-text px-3 py-1">
        {runtimeLabel}
      </span>
      <span className="rounded-full bg-primary text-primary-text px-3 py-1">{ratingLabel}</span>
      {votesLabel ? (
        <span className="text-xs text-primary-text">{votesLabel}</span>
      ) : null}
    </div>
  </div>
);
