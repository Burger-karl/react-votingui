import type { TPollEntry } from "@/types/poll";

type LiveResultsProps = {
  poll: TPollEntry[];
  totalVotes: number;
};

export function LiveResults({ poll, totalVotes }: LiveResultsProps) {
  return (
    <div className="fixed right-6 bottom-6 z-40 w-72 rounded-xl bg-gray-800/90 p-5 shadow-2xl ring-1 ring-white/10 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Live Results
        </h3>
      </div>

      {poll.length === 0 ? (
        <p className="text-sm text-gray-500">No candidates on the ballot yet.</p>
      ) : (
        <ul className="max-h-64 space-y-4 overflow-y-auto pr-1">
          {poll.map((entry) => {
            const percentage = totalVotes === 0 ? 0 : (entry.votes / totalVotes) * 100;

            return (
              <li key={entry.candidate}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-white">{entry.candidate}</span>
                  <span className="font-semibold text-indigo-400">{entry.votes}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
