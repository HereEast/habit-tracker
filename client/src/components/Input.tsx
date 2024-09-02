interface InputProps {
  name: string;
  placeholder: string;
}

export function Input(props: InputProps) {
  const { name, placeholder } = props;

  return (
    <input
      name={name}
      placeholder={placeholder}
      className="h-10 rounded-md border px-4"
    />
  );
}
