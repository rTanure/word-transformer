import { useForm } from "react-hook-form";

interface RenderInputFormProps {
  variables: string[];
  onSubmitValues: (values: any) => void;
}

export default function RenderInputForm({ variables, onSubmitValues }: RenderInputFormProps) {
  const { register, handleSubmit, watch } = useForm();

  const watchedValues = watch();

  const allFilled =
    variables.length > 0 &&
    variables.every((v) => {
      const value = watchedValues[v];
      return value !== undefined && value !== null && String(value).trim() !== "";
    });

  return (
    <form
      onSubmit={handleSubmit(onSubmitValues)}
      className="space-y-4 p-4  text-neutral-200 rounded-md"
    >
      {variables.map((v) => (
        <div key={v} className="flex flex-col">
          <label className="font-medium mb-1 text-neutral-300">{v}</label>

          <input
            {...register(v)}
            type="text"
            placeholder={`Digite ${v}`}
            className="bg-neutral-800 border border-neutral-700 text-neutral-100 placeholder-neutral-400 p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={!allFilled}
        className={`
          px-4 py-2 rounded shadow transition text-white
          ${allFilled
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-neutral-700 cursor-not-allowed opacity-50"}
        `}
      >
        Enviar
      </button>
    </form>
  );
}
