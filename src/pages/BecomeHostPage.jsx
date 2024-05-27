import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Container from "../components/ui/container";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import useUpdateUser from "../hooks/useUpdateUser";
import { useBoundStore } from "../stores/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function BecomeHostPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);
  const userName = useBoundStore((state) => state.user.name);
  const venueManager = useBoundStore((state) => state.user.venueManager);
  const { updateProfileMutation } = useUpdateUser({
    name: userName,
    setError,
    onSuccess: () => {
      toast.success("Success! You are now a venue manager");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      name: userName,
      body: { venueManager: true },
    });
  };

  useEffect(() => {
    if (venueManager) {
      navigate("/");
    }
  }, [venueManager]);

  return (
    <Container className={"h-[85vh]"}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-items-center gap-16 rounded-lg bg-card p-4"
      >
        <div className="mx-auto flex h-full max-w-[500px] flex-col justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-xl font-semibold capitalize">
              Begin your hosting journey today
            </h1>
            <p className="text-muted-foreground">
              Host travelers and earn money. Just a few clicks away.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className=" flex items-center gap-4">
              <Label htmlFor="venue-manager-check" className="">
                * I have read and agree to the <TermsAndConditionsDialog />
              </Label>
              <Input
                id="venue-manager-check"
                type="checkbox"
                checked={hasAgreed}
                onChange={() => setHasAgreed((prev) => !prev)}
                className="size-6 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
            </div>
            <Button disabled={!hasAgreed}>Become a Host</Button>
          </div>
          {error?.root && (
            <div className="text-red-500">
              {error.root.error.map((m, i) => (
                <p key={i}>{m.message}</p>
              ))}
            </div>
          )}
        </div>
      </form>
    </Container>
  );
}

function TermsAndConditionsDialog() {
  return (
    <Dialog>
      <DialogTrigger className="font-medium text-primary hover:underline">
        Terms And Conditions
      </DialogTrigger>
      <DialogContent className="my-4 max-h-[90dvh] overflow-auto">
        <div className=" space-y-4 ">
          <h1>Host Terms and Conditions</h1>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Holiday Helper. These Host Terms and Conditions
            (&quot;Terms&quot;) govern your use of our platform to list and
            manage rental properties ("Services"). By signing up to become a
            host, you agree to comply with and be bound by these Terms.
          </p>
          <h2>2. Host Eligibility</h2>
          <p>To become a host, you must:</p>
          <ul>
            <li>Be at least 18 years old.</li>
            <li>
              Provide accurate and up-to-date information during the
              registration process.
            </li>
            <li>Comply with all applicable local laws and regulations.</li>
          </ul>
          <h2>3. Host Responsibilities</h2>
          <p>As a host, you agree to:</p>
          <ul>
            <li>
              Provide accurate, complete, and truthful information about your
              property.
            </li>
            <li>
              Ensure your property complies with all local laws, including
              health and safety regulations.
            </li>
            <li>
              Maintain your property in a clean, safe, and habitable condition
              for guests.
            </li>
            <li>Communicate promptly and courteously with guests.</li>
            <li>Respect guests&apos; privacy and property.</li>
          </ul>
          <h2>4. Listing and Booking</h2>
          <p>
            <strong>Listing:</strong> You are responsible for setting your
            listing prices, including any additional fees (e.g., cleaning fees).
            You must clearly state all fees and charges.
          </p>
          <p>
            <strong>Booking:</strong> All bookings made through Holiday Helper
            are binding. You agree to honor all reservations unless there are
            exceptional circumstances.
          </p>
          <h2>5. Fees and Payments</h2>
          <p>
            <strong>Service Fees:</strong> Holiday Helper charges a service fee
            for each booking made through our platform. The fee amount will be
            communicated to you during the listing process.
          </p>
          <p>
            <strong>Payouts:</strong> Payouts will be made to your designated
            bank account according to our payment schedule. Holiday Helper is
            not responsible for any delays caused by third-party payment
            processors.
          </p>
          <h2>6. Cancellations and Refunds</h2>
          <p>
            <strong>Host Cancellations:</strong> If you cancel a booking, you
            may be subject to a cancellation fee and/or penalties as outlined in
            our Cancellation Policy.
          </p>
          <p>
            <strong>Guest Cancellations:</strong> Guest cancellations will be
            handled according to the cancellation policy you set for your
            listing.
          </p>
          <h2>7. Taxes</h2>
          <p>
            You are responsible for determining and fulfilling your tax
            obligations related to the rental income received from bookings made
            through our platform. Holiday Helper may provide tax-related
            information as a courtesy, but it is not responsible for your tax
            obligations.
          </p>
          <h2>8. Insurance</h2>
          <p>
            Holiday Helper strongly recommends that you obtain appropriate
            insurance coverage for your rental property. Holiday Helper is not
            responsible for any damage, loss, or liability arising from your use
            of our Services.
          </p>
          <h2>9. Termination</h2>
          <p>
            Holiday Helper reserves the right to terminate or suspend your
            account at any time if you violate these Terms or engage in any
            conduct detrimental to our platform or users.
          </p>
          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Holiday Helper shall not be
            liable for any direct, indirect, incidental, special, consequential,
            or punitive damages arising out of or related to your use of our
            Services.
          </p>
          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Holiday Helper,
            its affiliates, and their respective officers, directors, employees,
            and agents from and against any claims, liabilities, damages,
            losses, and expenses arising out of or related to your use of our
            Services.
          </p>
          <h2>12. Changes to Terms</h2>
          <p>
            Holiday Helper reserves the right to modify these Terms at any time.
            We will notify you of any changes by posting the revised Terms on
            our website. Your continued use of our Services after such changes
            constitutes your acceptance of the new Terms.
          </p>
          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Country/State], without regard to its conflict of
            law principles.
          </p>
          <h2>14. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:email@holidayhelper.com">email@holidayhelper.com</a>
            .
          </p>
          <p>
            <strong>
              By signing up as a host on Holiday Helper, you acknowledge that
              you have read, understood, and agree to be bound by these Terms
              and Conditions.
            </strong>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
