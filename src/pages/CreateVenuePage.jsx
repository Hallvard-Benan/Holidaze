import { useLayoutEffect } from "react";
import CreateVenueForm from "../components/Forms/CreateVenueForm";
import useCreateVenue from "../hooks/useCreateVenue";
import { useBoundStore } from "../stores/store";

export default function CreateVenuePage() {
  const clearVenueForm = useBoundStore((state) => state.clearVenueForm);
  const { createVenueMutation, error, setError } = useCreateVenue();
  const updateItem = useBoundStore((state) => state.updateItem);
  const updateMeta = useBoundStore((state) => state.updateMeta);
  const updateLocation = useBoundStore((state) => state.updateLocation);
  const updateVenueForm = useBoundStore((state) => state.updateVenueForm);
  const venueFormData = useBoundStore((state) => state.venueFormData);
  const decreaseItem = useBoundStore((state) => state.decreaseItem);
  const increaseItem = useBoundStore((state) => state.increaseItem);

  useLayoutEffect(() => {
    clearVenueForm();
  }, []);

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
      updateItem={updateItem}
      updateMeta={updateMeta}
      updateLocation={updateLocation}
      updateVenueForm={updateVenueForm}
      venueFormData={venueFormData}
      decreaseItem={decreaseItem}
      increaseItem={increaseItem}
    />
  );
}
