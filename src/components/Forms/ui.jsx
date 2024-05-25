export function FormSection({ children }) {
  return <div className="grid gap-2 ">{children}</div>;
}

export function FormContainer({ onSubmit, title, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-[0.5rem]  flex  w-calc max-w-[600px] flex-col gap-8 rounded-xl bg-card p-8 "
    >
      <h1 className="text-center text-lg font-semibold md:text-xl">{title}</h1>
      {children}
    </form>
  );
}
