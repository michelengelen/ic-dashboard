"use client";
import React from "react";
import axios from "@/lib/axios.ts";
import useSWR from "swr";
import type { AxiosRequestConfig } from "axios";
import type { Routes } from "@/types/routeTypes.ts";

const fetcher = ({
  url,
  options,
}: {
  url: string;
  options: AxiosRequestConfig;
}) => axios.get(url, options).then((res) => res.data);

export default function Dashboard() {
  const { data, error, isLoading } = useSWR<Routes["/issues"]>(
    {
      url: "/issues",
      options: { method: "GET", params: { owner: "mui", repo: "mui-x" } },
    },
    fetcher,
  );

  if (error) return <div>Failed to fetch issues.</div>;
  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Dashboard - All Issues & PRs</h1>
      <ul>
        {data!.map((d) => (
          <li key={d.id}>{d.title}</li>
        ))}
      </ul>
    </div>
  );
}
