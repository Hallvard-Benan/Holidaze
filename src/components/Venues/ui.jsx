export function VenuesGrid({ children }) {
  return (
    <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
