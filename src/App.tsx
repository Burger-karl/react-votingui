import { useState } from "react";
import { usePoll } from "@/hooks/usePoll";
import { NameInput } from "@/components/NameInput";
import { CandidateDropdown } from "@/components/CandidateDropdown";
import { LiveResults } from "@/components/LiveResults";
import { ResultModal } from "@/components/ResultModal";
import type { TCandidate } from "@/types/poll";

const INITIAL_CANDIDATES: TCandidate[] = ["Lilian", "Victor"];

function App() {
  const { poll, castVote, addCandidate, getTotalVotes, getWinner } =
    usePoll(INITIAL_CANDIDATES);
  const [voterName, setVoterName] = useState("");
  const [voteError, setVoteError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSelectCandidate(candidate: TCandidate) {
    const result = castVote(candidate, voterName);

    if (!result.ok) {
      setVoteError(result.error ?? "Something went wrong.");
      return;
    }

    setVoteError(null);
    setVoterName("");
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-30">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <span className="font-display text-lg font-semibold text-white">Vote</span>
          <span className="text-sm/6 font-medium text-gray-400">Hackathon 3.0</span>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-pink-400 to-indigo-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="font-display text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Hackathon 3.0 Head of House
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Enter your name, pick a candidate to cast your vote, or add a new
              name to the ballot.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
              <NameInput value={voterName} onChange={setVoterName} />
              <CandidateDropdown
                candidates={poll.map((entry) => entry.candidate)}
                onSelectCandidate={handleSelectCandidate}
                onAddCandidate={addCandidate}
              />
            </div>

            {voteError && (
              <p className="mt-4 text-sm font-medium text-red-400">{voteError}</p>
            )}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-400 to-indigo-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 left-6 z-40 inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl transition-colors hover:bg-indigo-400"
      >
        Check Result
      </button>

      <LiveResults poll={poll} totalVotes={getTotalVotes()} />

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        poll={poll}
        totalVotes={getTotalVotes()}
        winner={getWinner()}
      />
    </div>
  );
}

export default App;
