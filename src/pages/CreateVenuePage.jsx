import CreateVenueForm from "../components/Forms/CreateVenueForm";
import useCreateVenue from "../hooks/useCreateVenue";
import { useBoundStore } from "../stores/store";

export default function CreateVenuePage() {
  const venueFormData = useBoundStore((state) => state.venueFormData);
  const { createVenueMutation, error, setError } = useCreateVenue();
  const handleCreateVenue = (e) => {
    e.preventDefault();
    createVenueMutation.mutate(venueFormData);
  };

  return (
    <CreateVenueForm
      onSubmit={handleCreateVenue}
      errors={error?.response?.data?.errors}
      status={createVenueMutation.status}
      setError={setError}
    />
  );
}
