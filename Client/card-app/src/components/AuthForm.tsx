import { FormEvent, useEffect, useState } from "react";

interface AuthFormProps {
  title: string;
  fields: {
    label: string;
    type: string;
    value: string;
    setValue: (value: string) => void;
  }[];
  validate: () => boolean;
  onSubmit: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  validate,
  onSubmit,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(fields.every((field) => field.value !== ""));
  }, [fields]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center pt-10">
      <h1>{title}</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-1/2 items-center"
      >
        {fields.map((field, index) => (
          <input
            key={index}
            className="rounded-md p-4 w-full text-black"
            type={field.type}
            placeholder={field.label}
            value={field.value}
            onChange={(e) => field.setValue(e.target.value)}
          />
        ))}
        <button
          type="submit"
          className={`bg-blue-500 text-white p-4 w-full rounded-md ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
