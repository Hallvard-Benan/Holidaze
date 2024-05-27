import { useEffect, useLayoutEffect } from "react";
import CreateVenueForm from "../components/Forms/CreateVenueForm";
import useCreateVenue from "../hooks/useCreateVenue";
import { useBoundStore } from "../stores/store";
import { useNavigate } from "react-router-dom";

export default function CreateVenuePage() {
  const navigate = useNavigate();
  const clearVenueForm = useBoundStore((state) => state.clearVenueForm);
  const { createVenueMutation, error, setError } = useCreateVenue();
  const updateItem = useBoundStore((state) => state.updateItem);
  const updateMeta = useBoundStore((state) => state.updateMeta);
  const updateLocation = useBoundStore((state) => state.updateLocation);
  const updateVenueForm = useBoundStore((state) => state.updateVenueForm);
  const venueFormData = useBoundStore((state) => state.venueFormData);
  const decreaseItem = useBoundStore((state) => state.decreaseItem);
  const increaseItem = useBoundStore((state) => state.increaseItem);
  const venueManager = useBoundStore((state) => state.user.venueManager);
  useLayoutEffect(() => {
    clearVenueForm();
  }, []);

  useEffect(() => {
    if (!venueManager) {
      navigate("/become-host");
    }
  }, [venueManager]);

  const handleCreateVenue = (e) => {
    e.preventDefault();

    createVenueMutation.mutate(venueFormData);
  };

  return (
    <div className="h-screen">
      <CreateVenueForm
        handleBack={() => navigate(-1)}
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
    </div>
  );
}
