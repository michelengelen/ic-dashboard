"use client";
import React from "react";
import axios from "@/lib/axios.ts";
import useSWR from "swr";
import type { AxiosRequestConfig } from "axios";
import type { Routes } from "@/types/routeTypes.ts";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { Box } from "@mui/material";

const fetcher = ({
  url,
  options,
}: {
  url: string;
  options: AxiosRequestConfig;
}) => axios.get(url, options).then((res) => res.data);

const columns = [
  { field: "number", headerName: "#", width: 90 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "state",
    headerName: "State",
    width: 150,
  },
];

export default function Dashboard() {
  const { data, error, isLoading } = useSWR<Routes["/issues"]>(
    {
      url: "/issues",
      options: { method: "GET", params: { owner: "mui", repo: "mui-x" } },
    },
    fetcher,
  );

  if (error) {
    return <div>Failed to fetch issues.</div>;
  }

  return (
    <div>
      <h1>Dashboard - All Issues & PRs</h1>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGridPremium
          columns={columns}
          rows={data || []}
          density="compact"
          loading={isLoading}
          pageSizeOptions={[20, 50, 100]}
        />
      </Box>
    </div>
  );
}
