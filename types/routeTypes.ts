import type { RestEndpointMethodTypes } from "@octokit/rest";

export type Routes = {
  "/issues": RestEndpointMethodTypes["issues"]["listForRepo"]["response"]["data"];
};
