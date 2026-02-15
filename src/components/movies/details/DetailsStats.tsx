import { FocusWrapper } from '@/components/focus/FocusWrapper';

interface DetailsStatsProps {
  budgetLabel: string;
  revenueLabel: string;
  languageLabel: string;
  homepage: string;
}

export const DetailsStats = ({
  budgetLabel,
  revenueLabel,
  languageLabel,
  homepage,
}: DetailsStatsProps) => (
  <FocusWrapper className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
    <div className="rounded-2xl p-3 bg-primary text-primary-text">
      <p className="text-xs uppercase tracking-[0.2em]">
        Budget
      </p>
      <p className="font-semibold">{budgetLabel}</p>
    </div>
    <div className="rounded-2xl p-3 bg-primary text-primary-text">
      <p className="text-xs uppercase tracking-[0.2em]">
        Revenue
      </p>
      <p className="font-semibold">{revenueLabel}</p>
    </div>
    <div className="rounded-2xl p-3 bg-primary text-primary-text">
      <p className="text-xs uppercase tracking-[0.2em">
        Language
      </p>
      <p className="font-semibold">{languageLabel}</p>
    </div>
    <div className="rounded-2xl p-3 bg-primary text-primary-text">
      <p className="text-xs uppercase tracking-[0.2em]">
        Homepage
      </p>
      {homepage ? (
        <a
          href={homepage}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex w-fit items-center rounded-xs px-2 py-1 font-semibol underline decoration-primary-text underline-offset-4"
        >
          Visit
        </a>
      ) : (
        <p className="font-semibold text-slate-900">N/A</p>
      )}
    </div>
  </FocusWrapper>
);
