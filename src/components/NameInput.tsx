type NameInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function NameInput({ value, onChange }: NameInputProps) {
  return (
    <input
      type="text"
      id="voter-name"
      name="voter-name"
      placeholder="Enter your name"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white placeholder:text-gray-400 ring-1 ring-inset ring-white/10 transition-colors focus:ring-2 focus:ring-indigo-400 focus:outline-none"
    />
  );
}
