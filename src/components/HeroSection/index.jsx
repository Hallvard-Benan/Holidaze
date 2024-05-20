import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <>
      <div className="relative grid gap-4 py-6 text-center">
        <h1 className="text-balance text-3xl font-extrabold leading-relaxed sm:text-5xl sm:leading-relaxed">
          Find your Destination <br /> Host travelers
        </h1>
      </div>
      <div className="flex justify-center gap-2">
        <p className="text-muted-foreground">
          This is your moment to shine hehe
        </p>
        <Button>Register</Button>
        <Button variant="outline">Log In</Button>
      </div>{" "}
    </>
  );
}
