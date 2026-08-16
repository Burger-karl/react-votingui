import type { TPollEntry } from "@/types/poll";

type ResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  poll: TPollEntry[];
  totalVotes: number;
  winner: TPollEntry | undefined;
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getWinnerText(
  poll: TPollEntry[],
  totalVotes: number,
  winner: TPollEntry | undefined,
): string {
  if (!winner || totalVotes === 0) return "No votes yet";

  const isTie = poll.filter((entry) => entry.votes === winner.votes).length > 1;
  if (isTie) return "It's currently a tie!";

  return `${winner.candidate} is currently winning with ${winner.votes} votes!`;
}

export function ResultModal({
  isOpen,
  onClose,
  poll,
  totalVotes,
  winner,
}: ResultModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all"
        >
          <div className="px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <h2 id="drawer-title" className="text-lg font-semibold text-gray-900">
                Election Results
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="relative -m-2 shrink-0 p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close panel</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-2 text-sm font-semibold text-indigo-600">
              {getWinnerText(poll, totalVotes, winner)}
            </p>

            <div className="mt-6">
              {poll.length === 0 ? (
                <p className="py-6 text-sm text-gray-500">No candidates on the ballot.</p>
              ) : (
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {poll.map((entry) => (
                    <li key={entry.candidate} className="flex py-6">
                      <div className="flex size-20 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-indigo-50 text-lg font-semibold text-indigo-600">
                        {getInitials(entry.candidate)}
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-center">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{entry.candidate}</h3>
                          <p className="ml-4">{entry.votes} votes</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
