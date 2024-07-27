import { useStateContext } from "../../contexts/ContextProvider";

export default function Toast() {
  const { toast } = useStateContext();

  return (
    <>
      {toast.show && (
        <div className={`w-[300px] py-2 px-3 text-white rounded fixed right-4 bottom-4 z-50 animate-fade-in-down ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}