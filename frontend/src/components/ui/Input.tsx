interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder = "",
  onChange,
  name,
  value,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        required
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        `}
      />
    </div>
  );
};
