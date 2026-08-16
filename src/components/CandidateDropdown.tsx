import { useEffect, useRef, useState } from "react";
import type { TCandidate } from "@/types/poll";

type CandidateDropdownProps = {
  candidates: TCandidate[];
  onSelectCandidate: (candidate: TCandidate) => void;
  onAddCandidate: (name: string) => { ok: boolean; error?: string };
};

export function CandidateDropdown({
  candidates,
  onSelectCandidate,
  onAddCandidate,
}: CandidateDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCandidateName, setNewCandidateName] = useState("");
  const [addError, setAddError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(candidate: TCandidate) {
    onSelectCandidate(candidate);
    setIsOpen(false);
  }

  function handleAddCandidate() {
    const result = onAddCandidate(newCandidateName);

    if (!result.ok) {
      setAddError(result.error ?? "Couldn't add that candidate.");
      return;
    }

    setNewCandidateName("");
    setAddError(null);
  }

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-center gap-x-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/20"
      >
        Candidates
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="size-5 text-gray-400"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-1/2 z-50 mt-2 w-64 -translate-x-1/2 origin-top rounded-lg bg-gray-800 shadow-xl outline-1 -outline-offset-1 outline-white/10">
          <div className="max-h-56 divide-y divide-white/5 overflow-y-auto py-1">
            {candidates.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-500">
                No candidates yet.
              </p>
            ) : (
              candidates.map((candidate) => (
                <button
                  key={candidate}
                  type="button"
                  onClick={() => handleSelect(candidate)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-hidden"
                >
                  <span>{candidate}</span>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-white/5 p-3">
            <label
              htmlFor="new-candidate"
              className="mb-1.5 block text-xs font-semibold tracking-widest text-gray-500 uppercase"
            >
              Add candidate
            </label>
            <div className="flex gap-2">
              <input
                id="new-candidate"
                type="text"
                value={newCandidateName}
                onChange={(event) => {
                  setNewCandidateName(event.target.value);
                  setAddError(null);
                }}
                placeholder="Name"
                className="min-w-0 flex-1 rounded-md bg-white/10 px-2.5 py-1.5 text-sm text-white placeholder:text-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCandidate}
                className="shrink-0 rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
              >
                Add
              </button>
            </div>
            {addError && (
              <p className="mt-1.5 text-xs text-red-400">{addError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
