import { useQuery } from "@tanstack/react-query";
import { fetchAllVenues } from "../api/venues";
import { useBoundStore } from "../stores/store";
import { useEffect, useState } from "react";

const fakeVenues = {
  data: [
    {
      id: "a65311c5-a036-495a-848e-42ab648f0a27",
      name: "To be deleted",
      description: "xcxc",
      media: [
        {
          url: "https://www.wargamer.com/wp-content/sites/wargamer/2022/09/warhammer-40k-emperor-of-mankind-sorrowful-emperor.jpg",
          alt: "To be deleted",
        },
      ],
      price: 599,
      maxGuests: 2,
      rating: 3,
      created: "2024-05-02T18:21:45.508Z",
      updated: "2024-05-02T20:01:23.447Z",
      meta: {
        wifi: true,
        parking: true,
        breakfast: false,
        pets: true,
      },
      location: {
        address: "Riverside 1",
        city: "Naustdal",
        zip: "5411",
        country: "Norge",
        continent: "Europe",
        lat: 7,
        lng: 6,
      },
      owner: {
        name: "Mr_SalmonV",
        email: "salmonv@noroff.no",
        bio: "",
        avatar: {
          url: "https://laks.no/siteassets/lakseproduksjon/produksjonssteg/stamfisk/stamfisk_3.jpg",
          alt: "Mr_SalmonV avatar",
        },
        banner: {
          url: "https://laks.no/siteassets/lakseproduksjon/produksjonssteg/stamfisk/stamfisk_3.jpg",
          alt: "Mr_SalmonV banner",
        },
      },
      bookings: [
        {
          id: "462c4eab-bded-4e44-81f7-274d6ce1bcd1",
          dateFrom: "2024-05-09T22:00:00.000Z",
          dateTo: "2024-05-10T22:00:00.000Z",
          guests: 2,
          created: "2024-05-05T14:27:46.291Z",
          updated: "2024-05-05T14:27:46.291Z",
          customer: {
            name: "kyrre",
            email: "KyrGje24554@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "2071fa9f-7983-4ed4-8c8f-38a4a8eb2639",
          dateFrom: "2024-05-22T00:00:00.000Z",
          dateTo: "2024-05-23T00:00:00.000Z",
          guests: 1,
          created: "2024-05-03T10:35:36.564Z",
          updated: "2024-05-03T10:35:36.564Z",
          customer: {
            name: "lissipass",
            email: "lissipass@stud.noroff.no",
            bio: "",
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "ab9614fe-9fb1-48a1-8f4e-714a6e11f54f",
          dateFrom: "2024-05-23T22:00:00.000Z",
          dateTo: "2024-05-24T22:00:00.000Z",
          guests: 2,
          created: "2024-05-07T11:51:43.610Z",
          updated: "2024-05-07T11:51:43.610Z",
          customer: {
            name: "Emil",
            email: "emil_holidaze@noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "5436ace9-7d88-4f16-a332-425fa0288326",
          dateFrom: "2024-05-18T22:00:00.000Z",
          dateTo: "2024-05-19T22:00:00.000Z",
          guests: 2,
          created: "2024-05-07T11:56:49.341Z",
          updated: "2024-05-07T11:56:49.341Z",
          customer: {
            name: "Emil",
            email: "emil_holidaze@noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "42393b10-8fef-4d70-bac0-43891cee9303",
          dateFrom: "2024-05-26T22:00:00.000Z",
          dateTo: "2024-05-27T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T11:48:55.485Z",
          updated: "2024-05-07T11:48:55.485Z",
          customer: {
            name: "Emil",
            email: "emil_holidaze@noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "500e1467-37c4-4691-9151-3effc2de142a",
          dateFrom: "2024-05-28T22:00:00.000Z",
          dateTo: "2024-05-29T22:00:00.000Z",
          guests: 2,
          created: "2024-05-07T11:54:34.514Z",
          updated: "2024-05-07T11:54:34.514Z",
          customer: {
            name: "Emil",
            email: "emil_holidaze@noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "c5f446ca-0e7e-44aa-b7aa-3a06a41870f6",
          dateFrom: "2024-05-12T22:00:00.000Z",
          dateTo: "2024-05-13T22:00:00.000Z",
          guests: 2,
          created: "2024-05-07T11:54:59.162Z",
          updated: "2024-05-07T11:54:59.162Z",
          customer: {
            name: "Emil",
            email: "emil_holidaze@noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
      ],
      _count: {
        bookings: 7,
      },
    },
    {
      id: "4fc08a72-2a6a-44da-88e7-f55a54f843e4",
      name: "toaster",
      description: "does this work?",
      media: [
        {
          url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600",
          alt: "A hotel room with a bed, chair and table",
        },
      ],
      price: 50,
      maxGuests: 2,
      rating: 0,
      created: "2024-05-06T08:43:45.031Z",
      updated: "2024-05-06T08:43:45.031Z",
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
        lat: 0,
        lng: 0,
      },
      owner: {
        name: "venue_manager",
        email: "venuemanager@stud.noroff.no",
        bio: null,
        avatar: {
          url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
          alt: "A blurry multi-colored rainbow background",
        },
        banner: {
          url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
          alt: "A blurry multi-colored rainbow background",
        },
      },
      bookings: [
        {
          id: "888c735d-c0d6-4a18-8772-4cd1a8e6432b",
          dateFrom: "2024-05-05T22:00:00.000Z",
          dateTo: "2024-05-06T22:00:00.000Z",
          guests: 2,
          created: "2024-05-06T11:37:47.163Z",
          updated: "2024-05-06T11:37:47.163Z",
          customer: {
            name: "test_asdf1",
            email: "testtest1@stud.noroff.no",
            bio: "This is my profile bio",
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "b8ff5d37-3a01-4a8d-b01e-772d5fb2e335",
          dateFrom: "2024-05-08T22:00:00.000Z",
          dateTo: "2024-05-09T22:00:00.000Z",
          guests: 1,
          created: "2024-05-06T11:38:02.252Z",
          updated: "2024-05-06T11:38:02.252Z",
          customer: {
            name: "test_asdf1",
            email: "testtest1@stud.noroff.no",
            bio: "This is my profile bio",
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "d640cbc6-c5e1-4869-8171-acf281707564",
          dateFrom: "2024-05-24T22:00:00.000Z",
          dateTo: "2024-06-15T22:00:00.000Z",
          guests: 1,
          created: "2024-05-06T11:38:16.199Z",
          updated: "2024-05-06T11:38:16.199Z",
          customer: {
            name: "test_asdf1",
            email: "testtest1@stud.noroff.no",
            bio: "This is my profile bio",
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
      ],
      _count: {
        bookings: 3,
      },
    },
    {
      id: "33534d74-e661-4c3c-b1e8-b03629242c73",
      name: "tittelllllll",
      description: "woho",
      media: [
        {
          url: "https://sunhatvillaswebstorage.blob.core.windows.net/photocache/4477/2880/1.jpg",
          alt: "",
        },
      ],
      price: 3,
      maxGuests: 4,
      rating: 2,
      created: "2024-05-06T16:08:15.297Z",
      updated: "2024-05-06T16:08:15.297Z",
      meta: {
        wifi: false,
        parking: true,
        breakfast: true,
        pets: true,
      },
      location: {
        address: "engate",
        city: "",
        zip: "",
        country: null,
        continent: "",
        lat: null,
        lng: null,
      },
      owner: {
        name: "sindbertvm",
        email: "sindbertvm@stud.noroff.no",
        bio: null,
        avatar: {
          url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
          alt: "A blurry multi-colored rainbow background",
        },
        banner: {
          url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
          alt: "A blurry multi-colored rainbow background",
        },
      },
      bookings: [],
      _count: {
        bookings: 0,
      },
    },
    {
      id: "559d670b-0795-4e5e-a3ea-a1f09a8f90d7",
      name: "Title for my house",
      description: "cool house",
      media: [
        {
          url: "https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3Ae65b26e88886936af6f9915b21351854d9b5a8ecffee43123356dca5%2BIMAGE_THUMB_POSTCARD_TINY%2BIMAGE_THUMB_POSTCARD_TINY.1",
          alt: "",
        },
        {
          url: "https://www.treehugger.com/thmb/QdKvtJd2FZFupn-WuMrfOl77m9E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-124834329-5b5b4fcf46e0fb0050215615.jpg",
          alt: "",
        },
      ],
      price: 66,
      maxGuests: 3,
      rating: 3,
      created: "2024-05-06T18:10:24.429Z",
      updated: "2024-05-06T18:10:24.429Z",
      meta: {
        wifi: true,
        parking: true,
        breakfast: true,
        pets: true,
      },
      location: {
        address: "cool street 123",
        city: "New York",
        zip: "1234",
        country: null,
        continent: "America",
        lat: null,
        lng: null,
      },
      owner: {
        name: "drhouse",
        email: "drhouse@stud.noroff.no",
        bio: null,
        avatar: {
          url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
          alt: "A blurry multi-colored rainbow background",
        },
        banner: {
          url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
          alt: "A blurry multi-colored rainbow background",
        },
      },
      bookings: [],
      _count: {
        bookings: 0,
      },
    },
    {
      id: "b35e63ad-80fe-4d0b-aae4-951730a7fb50",
      name: "This is a venue",
      description: "Great looking venue",
      media: [
        {
          url: "https://media.musely.com/u/e0f76cba-7e1f-4c63-a891-1ef360e4f55e.jpg",
          alt: "Venue image",
        },
      ],
      price: 1000,
      maxGuests: 3,
      rating: 0,
      created: "2024-05-01T12:31:22.247Z",
      updated: "2024-05-01T12:31:22.247Z",
      meta: {
        wifi: true,
        parking: true,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "Good street",
        city: "Good city",
        zip: "1000",
        country: "AT",
        continent: "Europe",
        lat: 0,
        lng: 0,
      },
      owner: {
        name: "bjornar_langved",
        email: "bjornar.langved@stud.noroff.no",
        bio: "I am as cool as a cocombah",
        avatar: {
          url: "https://t3.ftcdn.net/jpg/05/65/13/74/360_F_565137466_AnFDfYMQpA04vS4IFzTB6wDy3RnZo5Zc.jpg",
          alt: "User avatar",
        },
        banner: {
          url: "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png",
          alt: "User banner",
        },
      },
      bookings: [
        {
          id: "6cdc37db-04aa-44ba-a9a4-d04b9a64a2ef",
          dateFrom: "2024-05-08T22:00:00.000Z",
          dateTo: "2024-05-10T22:00:00.000Z",
          guests: 2,
          created: "2024-05-02T12:40:25.907Z",
          updated: "2024-05-02T12:40:25.907Z",
          customer: {
            name: "Laura_holiday",
            email: "laura.holiday@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://c.stocksy.com/a/xfi900/za/2316689.jpg",
              alt: "",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "5ae72063-0ff4-414c-b52d-7d8c31acae32",
          dateFrom: "2024-05-15T22:00:00.000Z",
          dateTo: "2024-05-20T22:00:00.000Z",
          guests: 2,
          created: "2024-05-02T12:44:09.587Z",
          updated: "2024-05-02T12:44:09.587Z",
          customer: {
            name: "Laura_holiday",
            email: "laura.holiday@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://c.stocksy.com/a/xfi900/za/2316689.jpg",
              alt: "",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "8103f0fd-40ba-4c73-a064-2e2ac7d6177d",
          dateFrom: "2024-06-21T22:00:00.000Z",
          dateTo: "2024-06-23T21:59:59.999Z",
          guests: 1,
          created: "2024-05-02T13:13:43.320Z",
          updated: "2024-05-02T13:13:43.320Z",
          customer: {
            name: "name_namezon",
            email: "namez@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
      ],
      _count: {
        bookings: 3,
      },
    },
    {
      id: "eb1f109e-4833-464c-a489-547f7861cca0",
      name: "This is a great house!",
      description: "Coooooool house!!!!",
      media: [
        {
          url: "https://i.pinimg.com/originals/5f/d9/78/5fd9786dc347122dfc4b7ceaed697a0a.jpg",
          alt: "Venue image",
        },
      ],
      price: 5000,
      maxGuests: 5,
      rating: 0,
      created: "2024-04-28T15:58:55.374Z",
      updated: "2024-05-02T06:46:15.943Z",
      meta: {
        wifi: true,
        parking: true,
        breakfast: true,
        pets: false,
      },
      location: {
        address: "Cool street 9000",
        city: "Cool city",
        zip: "1000",
        country: "FI",
        continent: "Europe",
        lat: 0,
        lng: 0,
      },
      owner: {
        name: "bjornar_langved",
        email: "bjornar.langved@stud.noroff.no",
        bio: "I am as cool as a cocombah",
        avatar: {
          url: "https://t3.ftcdn.net/jpg/05/65/13/74/360_F_565137466_AnFDfYMQpA04vS4IFzTB6wDy3RnZo5Zc.jpg",
          alt: "User avatar",
        },
        banner: {
          url: "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png",
          alt: "User banner",
        },
      },
      bookings: [
        {
          id: "ac5e0831-715f-44a3-919b-d2d929941712",
          dateFrom: "2024-05-24T22:00:00.000Z",
          dateTo: "2024-05-27T21:59:59.999Z",
          guests: 1,
          created: "2024-05-01T09:05:30.018Z",
          updated: "2024-05-01T09:05:30.018Z",
          customer: {
            name: "name_namezon",
            email: "namez@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "aae807cc-8ad8-4793-905a-e06f7aa9e46c",
          dateFrom: "2024-05-03T22:00:00.000Z",
          dateTo: "2024-05-03T22:00:00.000Z",
          guests: 1,
          created: "2024-05-03T13:35:31.301Z",
          updated: "2024-05-03T13:35:31.301Z",
          customer: {
            name: "samsung",
            email: "samsung@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "a92394b2-ed5e-464e-9857-29272b15ec7e",
          dateFrom: "2024-05-15T22:00:00.000Z",
          dateTo: "2024-05-17T22:00:00.000Z",
          guests: 3,
          created: "2024-04-29T16:10:31.067Z",
          updated: "2024-04-29T16:10:31.067Z",
          customer: {
            name: "Laura_holiday",
            email: "laura.holiday@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://c.stocksy.com/a/xfi900/za/2316689.jpg",
              alt: "",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "713cd784-fc82-4059-8fc0-09a51ddcc0f4",
          dateFrom: "2024-05-20T22:00:00.000Z",
          dateTo: "2024-05-21T22:00:00.000Z",
          guests: 4,
          created: "2024-04-30T09:01:52.574Z",
          updated: "2024-04-30T09:01:52.574Z",
          customer: {
            name: "Laura_holiday",
            email: "laura.holiday@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://c.stocksy.com/a/xfi900/za/2316689.jpg",
              alt: "",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "84fbca1a-af71-4845-99b6-18d04181e565",
          dateFrom: "2022-01-01T00:00:00.000Z",
          dateTo: "2022-01-03T00:00:00.000Z",
          guests: 2,
          created: "2024-04-29T16:33:37.774Z",
          updated: "2024-04-29T16:33:37.774Z",
          customer: {
            name: "kyrre",
            email: "KyrGje24554@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "4de63245-cf6f-42a9-93d9-1cc0bc6c825a",
          dateFrom: "2022-01-01T00:00:00.000Z",
          dateTo: "2022-01-03T00:00:00.000Z",
          guests: 2,
          created: "2024-04-29T16:33:39.149Z",
          updated: "2024-04-29T16:33:39.149Z",
          customer: {
            name: "kyrre",
            email: "KyrGje24554@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "9b43ae92-81e1-48fa-a419-7127cc5dd340",
          dateFrom: "2024-06-04T22:00:00.000Z",
          dateTo: "2024-06-10T22:00:00.000Z",
          guests: 5,
          created: "2024-05-02T13:28:40.342Z",
          updated: "2024-05-02T13:28:40.342Z",
          customer: {
            name: "Laura_holiday",
            email: "laura.holiday@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://c.stocksy.com/a/xfi900/za/2316689.jpg",
              alt: "",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "b0480f44-bc9a-4f17-a94a-c818e8e6cbe4",
          dateFrom: "2024-07-21T22:00:00.000Z",
          dateTo: "2024-07-28T22:00:00.000Z",
          guests: 5,
          created: "2024-05-06T11:04:53.126Z",
          updated: "2024-05-06T11:04:53.126Z",
          customer: {
            name: "TravelMax",
            email: "tm@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
      ],
      _count: {
        bookings: 8,
      },
    },
    {
      id: "3e849cab-e17d-4cb7-80ed-5edfb934acc1",
      name: "The Venue",
      description: "this is a nice venue",
      media: [
        {
          url: "https://source.unsplash.com/random",
          alt: "My media",
        },
      ],
      price: 3000,
      maxGuests: 4,
      rating: 0,
      created: "2024-05-04T23:21:56.551Z",
      updated: "2024-05-04T23:21:56.551Z",
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: null,
        city: null,
        zip: null,
        country: null,
        continent: null,
        lat: 0,
        lng: 0,
      },
      owner: {
        name: "testUser01",
        email: "testuser01938@stud.noroff.no",
        bio: "Bio update testing...",
        avatar: {
          url: "https://source.unsplash.com/random",
          alt: "My avatar",
        },
        banner: {
          url: "https://source.unsplash.com/random",
          alt: "My banner",
        },
      },
      bookings: [
        {
          id: "4c68d3bd-a875-4e02-b433-e7875836a1cb",
          dateFrom: "2024-06-09T22:00:00.000Z",
          dateTo: "2024-06-10T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:43:16.882Z",
          updated: "2024-05-07T15:43:16.882Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "ebf818ec-0ce4-414d-a719-447a9786e144",
          dateFrom: "2024-07-11T22:00:00.000Z",
          dateTo: "2024-07-12T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:48:41.756Z",
          updated: "2024-05-07T15:48:41.756Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "fad75530-876e-43c2-aef3-3c18c02f2d3f",
          dateFrom: "2024-06-18T22:00:00.000Z",
          dateTo: "2024-06-19T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:51:42.624Z",
          updated: "2024-05-07T15:51:42.624Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "ac8ec4fa-f793-4dc3-9b09-17cdd9b27608",
          dateFrom: "2024-09-03T22:00:00.000Z",
          dateTo: "2024-09-05T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T16:22:16.781Z",
          updated: "2024-05-07T16:22:16.781Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "5b8b3fa3-751b-4fdb-88dc-de2ab843c4fe",
          dateFrom: "2024-09-02T22:00:00.000Z",
          dateTo: "2024-09-06T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T16:22:23.421Z",
          updated: "2024-05-07T16:22:23.421Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "46c8d911-7d95-4b76-99d2-0b9334318021",
          dateFrom: "2024-07-18T22:00:00.000Z",
          dateTo: "2024-07-20T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T17:57:36.911Z",
          updated: "2024-05-07T17:57:36.911Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "4631fce1-127a-4155-af88-c4a67803a896",
          dateFrom: "2024-05-15T22:00:00.000Z",
          dateTo: "2024-05-31T21:59:59.999Z",
          guests: 1,
          created: "2024-05-06T07:08:46.347Z",
          updated: "2024-05-06T07:08:46.347Z",
          customer: {
            name: "Winnie_Orbek",
            email: "email@noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1712307339575-9c6e21d392f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "6f17326f-8f79-4135-89ba-466331c834e4",
          dateFrom: "2024-05-07T22:00:00.000Z",
          dateTo: "2024-05-09T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:24:40.660Z",
          updated: "2024-05-07T15:24:40.660Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "8655fd42-3387-46af-8470-0d48eb603fd8",
          dateFrom: "2024-06-11T22:00:00.000Z",
          dateTo: "2024-06-12T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:46:36.393Z",
          updated: "2024-05-07T15:46:36.393Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "d05cf930-6f59-43aa-8a1a-ea1d65218d46",
          dateFrom: "2024-06-13T22:00:00.000Z",
          dateTo: "2024-06-14T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:48:21.635Z",
          updated: "2024-05-07T15:48:21.635Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "55f9afcf-f118-470c-b4b4-8b56b8828308",
          dateFrom: "2024-06-16T22:00:00.000Z",
          dateTo: "2024-06-17T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:49:23.916Z",
          updated: "2024-05-07T15:49:23.916Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "41867e23-440f-4580-941a-4259e0696809",
          dateFrom: "2024-06-18T22:00:00.000Z",
          dateTo: "2024-06-20T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:53:36.946Z",
          updated: "2024-05-07T15:53:36.946Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "b2a2dfc0-6651-44e4-b81f-e2725a61afac",
          dateFrom: "2024-06-18T22:00:00.000Z",
          dateTo: "2024-06-20T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:53:56.031Z",
          updated: "2024-05-07T15:53:56.031Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "3f143bba-5503-4859-823b-acb69f50559d",
          dateFrom: "2024-05-07T22:00:00.000Z",
          dateTo: "2024-05-10T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:25:29.670Z",
          updated: "2024-05-07T15:25:29.670Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "4059d34c-8a7d-4922-a15f-70e6382e3712",
          dateFrom: "2024-05-31T22:00:00.000Z",
          dateTo: "2024-06-01T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:34:40.078Z",
          updated: "2024-05-07T15:34:40.078Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "d249b646-a198-4a85-bbb7-5f551c52118d",
          dateFrom: "2024-05-12T22:00:00.000Z",
          dateTo: "2024-05-13T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:35:20.130Z",
          updated: "2024-05-07T15:35:20.130Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "5cc922f0-83f7-46bd-a237-eeaa58130b47",
          dateFrom: "2024-06-05T22:00:00.000Z",
          dateTo: "2024-06-06T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:35:27.694Z",
          updated: "2024-05-07T15:35:27.694Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "c91244b2-e83f-45c7-99c3-bb8c53b0ae0e",
          dateFrom: "2024-06-09T22:00:00.000Z",
          dateTo: "2024-06-10T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:39:32.004Z",
          updated: "2024-05-07T15:39:32.004Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "cdad1bb1-7a66-4509-8162-15a0dffc6508",
          dateFrom: "2024-06-25T22:00:00.000Z",
          dateTo: "2024-06-27T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T16:18:48.600Z",
          updated: "2024-05-07T16:18:48.600Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "42017812-79b1-4e10-b48b-196449264db3",
          dateFrom: "2024-06-22T22:00:00.000Z",
          dateTo: "2024-06-29T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T16:28:27.252Z",
          updated: "2024-05-07T16:28:27.252Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "4b03f8e0-3fb4-4b45-83e5-6317e294489a",
          dateFrom: "2024-05-17T22:00:00.000Z",
          dateTo: "2024-05-18T22:00:00.000Z",
          guests: 2,
          created: "2024-05-07T19:33:51.969Z",
          updated: "2024-05-07T19:33:51.969Z",
          customer: {
            name: "kyrre123456",
            email: "kyrre123456@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
              alt: "A blurry multi-colored rainbow background",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
        {
          id: "3ae47ba0-594e-44c7-bf74-6a72ded0f5a8",
          dateFrom: "2024-06-02T22:00:00.000Z",
          dateTo: "2024-06-04T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:31:41.119Z",
          updated: "2024-05-07T15:31:41.119Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "aeef4e5b-dce2-46b2-82ec-0e1f5e29a448",
          dateFrom: "2024-06-07T22:00:00.000Z",
          dateTo: "2024-06-08T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:40:10.899Z",
          updated: "2024-05-07T15:40:10.899Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "9f86d451-5f95-4b6f-b996-0740a2eda3f2",
          dateFrom: "2024-06-15T22:00:00.000Z",
          dateTo: "2024-06-16T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:50:05.554Z",
          updated: "2024-05-07T15:50:05.554Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "2ae58a61-442c-43b9-a902-5a3694725829",
          dateFrom: "2024-06-18T22:00:00.000Z",
          dateTo: "2024-06-20T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T15:54:54.302Z",
          updated: "2024-05-07T15:54:54.302Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "cb3eff34-13aa-4076-be18-5bdd001753dc",
          dateFrom: "2024-06-30T22:00:00.000Z",
          dateTo: "2024-07-02T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T16:11:09.724Z",
          updated: "2024-05-07T16:11:09.724Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "649eb78a-8ac5-4ff7-b189-f51317b5e4d2",
          dateFrom: "2024-05-11T22:00:00.000Z",
          dateTo: "2024-05-14T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T16:11:46.388Z",
          updated: "2024-05-07T16:11:46.388Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "2f1184f9-54f4-4e6d-8900-730d20136c95",
          dateFrom: "2024-07-14T22:00:00.000Z",
          dateTo: "2024-07-16T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T16:21:55.359Z",
          updated: "2024-05-07T16:21:55.359Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "57bf6cac-2152-48e6-99dc-b1a1f7c33c51",
          dateFrom: "2024-07-13T22:00:00.000Z",
          dateTo: "2024-07-17T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T16:22:03.736Z",
          updated: "2024-05-07T16:22:03.736Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
        {
          id: "3fc88202-5d30-4105-9ee6-b7b0ab4fbaea",
          dateFrom: "2024-07-23T22:00:00.000Z",
          dateTo: "2024-07-25T22:00:00.000Z",
          guests: 1,
          created: "2024-05-07T17:43:03.200Z",
          updated: "2024-05-07T17:43:03.200Z",
          customer: {
            name: "mrgold",
            email: "mrgold@stud.noroff.no",
            bio: "i am great",
            avatar: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "profileImage",
            },
            banner: {
              url: "https://i.stack.imgur.com/EzZiD.png",
              alt: "bannerImage",
            },
          },
        },
      ],
      _count: {
        bookings: 30,
      },
    },
    {
      id: "f007bdba-bd35-4805-ac3f-f66d95312134",
      name: "The Venue",
      description: "this is a nice venue",
      media: [
        {
          url: "https://source.unsplash.com/random",
          alt: "My media",
        },
      ],
      price: 3000,
      maxGuests: 4,
      rating: 0,
      created: "2024-05-04T21:39:00.078Z",
      updated: "2024-05-04T21:39:00.078Z",
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: null,
        city: null,
        zip: null,
        country: null,
        continent: null,
        lat: null,
        lng: null,
      },
      owner: {
        name: "testUser01",
        email: "testuser01938@stud.noroff.no",
        bio: "Bio update testing...",
        avatar: {
          url: "https://source.unsplash.com/random",
          alt: "My avatar",
        },
        banner: {
          url: "https://source.unsplash.com/random",
          alt: "My banner",
        },
      },
      bookings: [],
      _count: {
        bookings: 0,
      },
    },
    {
      id: "7367cb09-ab93-44cb-b111-a94cb0fffa5b",
      name: "The Venue",
      description: "this is a nice venue",
      media: [
        {
          url: "https://source.unsplash.com/random",
          alt: "My media",
        },
      ],
      price: 3000,
      maxGuests: 3,
      rating: 0,
      created: "2024-05-04T21:42:11.763Z",
      updated: "2024-05-04T21:42:11.763Z",
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: null,
        city: null,
        zip: null,
        country: null,
        continent: null,
        lat: 0,
        lng: 0,
      },
      owner: {
        name: "testUser01",
        email: "testuser01938@stud.noroff.no",
        bio: "Bio update testing...",
        avatar: {
          url: "https://source.unsplash.com/random",
          alt: "My avatar",
        },
        banner: {
          url: "https://source.unsplash.com/random",
          alt: "My banner",
        },
      },
      bookings: [],
      _count: {
        bookings: 0,
      },
    },
    {
      id: "10baf9da-a7f2-492b-a0d1-95b7e09c98b5",
      name: "The PaddingBottom plaza",
      description:
        "Mr. PaddingBottom and Ms Borderbottom invites you for a royal stay at the plaza",
      media: [
        {
          url: "https://media.cntraveler.com/photos/53d9d93adcd5888e145a6d18/master/pass/st-regis-atlanta-atlanta-georgia-103796-1.jpg",
          alt: "The fancy hotel wow",
        },
      ],
      price: 551,
      maxGuests: 12,
      rating: 5,
      created: "2024-05-02T11:42:47.035Z",
      updated: "2024-05-02T11:42:47.035Z",
      meta: {
        wifi: true,
        parking: true,
        breakfast: false,
        pets: true,
      },
      location: {
        address: "Borderbottom road 55",
        city: "Paddington",
        zip: "1234",
        country: "Legoland",
        continent: "Oceania",
        lat: 0,
        lng: 0,
      },
      owner: {
        name: "venueman",
        email: "venueman@stud.noroff.no",
        bio: "asdfsdf",
        avatar: {
          url: "https://www.southernliving.com/thmb/WHH7cdFT3YMJlJN4y7y3lsAKvJ8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-114166947-1-268128f97e5c415baede328c1fe32f55.jpg",
          alt: "dog",
        },
        banner: {
          url: "https://live-production.wcms.abc-cdn.net.au/d3bea69d5a23fec74769121f1bd10c1a?impolicy=wcms_crop_resize&cropH=1075&cropW=1910&xPos=10&yPos=98&width=862&height=485",
          alt: "string",
        },
      },
      bookings: [
        {
          id: "7e308587-74ea-4e9c-957a-0859800df6a4",
          dateFrom: "2024-05-03T00:00:00.000Z",
          dateTo: "2024-05-05T00:00:00.000Z",
          guests: 12,
          created: "2024-05-02T12:10:19.140Z",
          updated: "2024-05-02T12:10:19.140Z",
          customer: {
            name: "Godzilla",
            email: "godzilla@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://i.pinimg.com/564x/97/c3/7c/97c37c4eec569c2ef37fd88ee9e0f340.jpg",
              alt: "",
            },
            banner: {
              url: "https://www.tattydevine.com/cdn/shop/articles/snoopy-blog-banner_2000x.jpg?v=1542299595",
              alt: "",
            },
          },
        },
        {
          id: "c5019077-91cb-4d78-a68e-7fab3cfc63f9",
          dateFrom: "2024-05-05T22:00:00.000Z",
          dateTo: "2024-05-07T22:00:00.000Z",
          guests: 3,
          created: "2024-05-03T21:01:34.295Z",
          updated: "2024-05-03T21:01:34.295Z",
          customer: {
            name: "yen3",
            email: "yen3@stud.noroff.no",
            bio: "testtest",
            avatar: {
              url: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&fit=crop&h=900&q=80&w=1600",
              alt: "",
            },
            banner: {
              url: "https://www.spain.info/.content/imagenes/cabeceras-grandes/valencia/villajoyosa-s692966386.jpg",
              alt: "",
            },
          },
        },
        {
          id: "1a5e56a8-805d-41a9-b011-a0abbf245836",
          dateFrom: "2024-05-08T22:00:00.000Z",
          dateTo: "2024-05-09T22:00:00.000Z",
          guests: 1,
          created: "2024-05-08T16:08:10.235Z",
          updated: "2024-05-08T16:08:10.235Z",
          customer: {
            name: "Laura_holiday",
            email: "laura.holiday@stud.noroff.no",
            bio: null,
            avatar: {
              url: "https://c.stocksy.com/a/xfi900/za/2316689.jpg",
              alt: "",
            },
            banner: {
              url: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
              alt: "A blurry multi-colored rainbow background",
            },
          },
        },
      ],
      _count: {
        bookings: 3,
      },
    },
  ],
  meta: {
    isFirstPage: false,
    isLastPage: false,
    currentPage: 3,
    previousPage: 2,
    nextPage: 4,
    pageCount: 25,
    totalCount: 243,
  },
};

export default function useAllVenues() {
  const [filteredData, setFilteredData] = useState();
  const { data, status, error } = useQuery({
    queryKey: ["venues"],
    queryFn: () => fetchAllVenues(),
  });
  const filters = useBoundStore((state) => state.filters);

  useEffect(() => {
    if (data && filters) {
      const filteredVenues = filterVenues(data.data.data, filters);
      setFilteredData(filteredVenues);
    }
  }, [data, filters]);

  return { data, status, error, filteredData, fakeVenues };
}

function filterVenues(data, filters) {
  const filteredVenues = data.filter((item) => {
    const priceInRange =
      item.price <= filters.maxPrice && item.price >= filters.minPrice;
    const maxGuestsInRange = item.maxGuests >= filters.maxGuests;
    const petsMatch = !filters.pets || item.meta.pets === filters.pets;
    const wifiMatch = !filters.wifi || item.meta.wifi === filters.wifi;
    const parkingMatch =
      !filters.parking || item.meta.parking === filters.parking;
    const breakfastMatch =
      !filters.breakfast || item.meta.breakfast === filters.breakfast;

    return (
      priceInRange &&
      maxGuestsInRange &&
      petsMatch &&
      wifiMatch &&
      parkingMatch &&
      breakfastMatch
    );
  });

  return filteredVenues;
}
