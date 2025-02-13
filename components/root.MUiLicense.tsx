"use client";
import { LicenseInfo } from "@mui/x-license";

LicenseInfo.setLicenseKey(process.env.MUI_LICENSE_KEY!);
console.log("License key set to", process.env);

export default function RootMUiLicense() {
  return null;
}
