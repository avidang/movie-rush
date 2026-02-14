interface DetailsCompaniesProps {
  companies: Array<{ id: number; name: string; logoPath: string }>;
}

export const DetailsCompanies = ({ companies }: DetailsCompaniesProps) => {
  if (!companies.length) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-text">
        Production Companies
      </h2>
      <div className="flex flex-wrap gap-3">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center gap-3 rounded-2xl bg-primary px-3 py-2"
          >
            {company.logoPath ? (
              <img
                src={`https://image.tmdb.org/t/p/w92${company.logoPath}`}
                alt={company.name}
                className="h-6 w-auto object-contain"
                loading="lazy"
              />
            ) : null}
            <span className="text-xs text-primary-text">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
