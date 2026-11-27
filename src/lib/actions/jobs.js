"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { serverMutation } from "../core/server";

export const createJob = async (newJobData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("You must be signed in to post a job.");
  }

  const jobPayload = {
    ...newJobData,
    recruiterId: session.user.id,
    recruiterEmail: session.user.email,
  };

  return serverMutation("/api/jobs", jobPayload);
};
