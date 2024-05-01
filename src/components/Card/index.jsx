import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  imgUrl,
  alt,
  heading,
  description,
  details,
  href,
  location,
  rating,
}) {
  return (
    <div className="bg-card grid h-[420px] grid-rows-2 overflow-hidden rounded-lg border border-gray-200 shadow">
      <Link to={href}>
        <img
          className="h-[200px] w-full overflow-hidden rounded-t-lg object-cover"
          src={imgUrl}
          alt={alt}
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-5">
        <Link to={href}>
          <h5 className="text-foreground -foreground mb-2 text-2xl font-bold tracking-tight ">
            {heading}
          </h5>
        </Link>
        <p className="text-muted-foreground text-top line-clamp-1">
          {location}
        </p>
        <p>{rating}</p>

        {details && <p>{details}</p>}

        <Link
          to={href}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
