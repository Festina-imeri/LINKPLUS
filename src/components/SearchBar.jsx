export default function SearchBar({ value, onChange }) {
  return (
    <input
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      
    />
  )
}
