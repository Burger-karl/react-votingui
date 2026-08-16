import { useState } from "react";
import type { TCandidate, TPollEntry } from "@/types/poll";

type PollActionResult = {
  ok: boolean;
  error?: string;
};

export function usePoll(initialCandidates: TCandidate[]) {
  const [poll, setPoll] = useState<TPollEntry[]>(
    initialCandidates.map((candidate) => ({ candidate, votes: 0 })),
  );
  const [votedNames, setVotedNames] = useState<Set<string>>(new Set());

  function getVotes(candidate: TCandidate): number {
    const entry = poll.find((p) => p.candidate === candidate);
    return entry ? entry.votes : 0;
  }

  function getTotalVotes(): number {
    return poll.reduce((sum, entry) => sum + entry.votes, 0);
  }

  function getWinner(): TPollEntry | undefined {
    if (poll.length === 0) return undefined;

    return poll.reduce(
      (winner, entry) => (entry.votes > winner.votes ? entry : winner),
      poll[0],
    );
  }

  function castVote(candidate: TCandidate, voterName: string): PollActionResult {
    const trimmedName = voterName.trim();

    if (trimmedName === "") {
      return { ok: false, error: "Please enter your name before voting." };
    }

    if (votedNames.has(trimmedName.toLowerCase())) {
      return { ok: false, error: `${trimmedName} has already voted!` };
    }

    const candidateExists = poll.some((entry) => entry.candidate === candidate);
    if (!candidateExists) {
      return { ok: false, error: "That candidate no longer exists." };
    }

    setPoll((prev) =>
      prev.map((entry) =>
        entry.candidate === candidate
          ? { ...entry, votes: entry.votes + 1 }
          : entry,
      ),
    );
    setVotedNames((prev) => new Set(prev).add(trimmedName.toLowerCase()));

    return { ok: true };
  }

  function addCandidate(name: TCandidate): PollActionResult {
    const trimmedName = name.trim();

    if (trimmedName === "") {
      return { ok: false, error: "Candidate name can't be empty." };
    }

    const alreadyExists = poll.some(
      (entry) => entry.candidate.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (alreadyExists) {
      return { ok: false, error: `${trimmedName} is already on the ballot.` };
    }

    setPoll((prev) => [...prev, { candidate: trimmedName, votes: 0 }]);
    return { ok: true };
  }

  return {
    poll,
    castVote,
    addCandidate,
    getVotes,
    getTotalVotes,
    getWinner,
  };
}
