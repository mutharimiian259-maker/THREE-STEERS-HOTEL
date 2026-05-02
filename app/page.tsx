"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import Facilities from "@/components/Facilities";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Conference from "@/components/Conference";
import Dining from "@/components/Dining";
import Experience from "@/components/Experience";
import Link from "next/link";
import rooms from "@/data/rooms";
import { HOTEL } from "@/lib/config";
import { setFunnelStep } from "@/lib/analytics/funnel";

export default function Home() {
  const safeRooms = Array.isArray(rooms) ? rooms : [];

  useEffect(() => {
    setFunnelStep("VISIT");
  }, []);

  return (
    <div>
