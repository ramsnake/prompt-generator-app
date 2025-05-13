export function Input({ value, onChange, placeholder }) {
  return <input className="border rounded px-3 py-2 w-full" value={value} onChange={onChange} placeholder={placeholder} />;
}