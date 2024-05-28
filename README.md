# Auction House, Semester project 2

![image](/public/screenshot.png)

- Deployed site: https://holidayhelper.netlify.app/
- Design and style guide: https://www.figma.com/design/7rzjgibX81ps5PQ1gB0erP/Final-exam%3A-Holidaze?node-id=0%3A1&t=9SYJX5BIR8dpP5y4-1
- Prototype https://www.figma.com/proto/7rzjgibX81ps5PQ1gB0erP/Final-exam%3A-Holidaze?page-id=0%3A1&node-id=60-7868&viewport=1773%2C278%2C0.16&t=YDToSKBd9R1lTEPA-1&scaling=scale-down&starting-point-node-id=18%3A1801

Holiday Helper is a booking website, where users can view, post and book venues.

## Built with

- ReactJs https://react.dev/
- Vite https://vitejs.dev/
- TailwindCSS https://tailwindcss.com/
- Components from ShadCN https://ui.shadcn.com/
- Toast components from: Sonner https://sonner.emilkowal.ski/
- Icons from: React icons https://react-icons.github.io/react-icons/
- Icons from: Lucide React https://lucide.dev/
- TanStack Query https://tanstack.com/query/latest
- React Router https://reactrouter.com/en/main
- Zustand https://docs.pmnd.rs/zustand/getting-started/introduction
- Noroff API v2: https://docs.noroff.dev/docs/v2

## Features

General

- Users can view, search, and filter through venues.
- Pagination if no search terms or filters are applied.
- Venue cards have a swipeable image carousel.
- Infinite scrolling if search terms or filters are applied.
- Logged-in users can become venue managers.
- Users can view individual venues with an image gallery, and details about the venue and the owner.
- Venue pages have a booking form with a date-picker calendar that displays the available dates for the venue.
- Logged-in users can view profiles.
- Logged-in users can edit their profiles.
- Users can log in, log out, and register.
- Users can see their upcoming bookings, as well as past bookings.
- Success, error, and loading UI for both validation and on request.
- Bottom nav bar on mobile

Venue managers

- Logged-in venue managers can publish a venue in a multistep form.
- Venue Managers can edit and delete venues they manage.
- Venue managers can see bookings made on their venues.

## Getting started

### Installing

```bash
git clone git@github.com:Hallvard-Benan/auction-house.git
```

Install dependencies

```bash
npm i
```

### Running

Setup your local environment using the base url and an api key found at https://docs.noroff.dev/docs/v2

then:

```bash
npm run dev
```

## Contributing

Fork the repo, create a new branch to make your changes and make a pull request, and I will take a look at it. Or contact me with feedback.

## Contact

Email: hallvard.dev@gmail.com
LinkedIn: https://www.linkedin.com/in/hallvard-benan-282937249/

Credits:
Images: <a href="https://www.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_7906236.htm#page=3&query=error%20illustration&position=49&from_view=keyword&track=ais_user&uuid=3bc702cb-1a99-474c-99d1-35ac8c1f95d5">
Image by storyset
</a>{" "}
on Freepik

<a href="https://www.freepik.com/free-vector/online-app-tourism-traveler-with-mobile-phone-passport-booking-buying-plane-ticket_11235774.htm#fromView=search&page=4&position=18&uuid=635740d9-2eff-46f6-89b8-b38e6d652af3">Image by pch.vector on Freepik</a>
