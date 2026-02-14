interface DetailsOverviewProps {
  overview: string;
}

export const DetailsOverview = ({ overview }: DetailsOverviewProps) => (
  <div className="space-y-2">
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
      Overview
    </h2>
    <p className="text-sm leading-relaxed text-primary-text w-[20%]">
      {overview || 'No overview available.'}
    </p>
  </div>
);
