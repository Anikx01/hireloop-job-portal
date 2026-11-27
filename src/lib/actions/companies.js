"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyCompany = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { authenticated: false, company: null };
  }

  try {
    const res = await fetch(
      `${baseUrl}/api/companies?ownerId=${encodeURIComponent(session.user.id)}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return { authenticated: true, company: null };
    }

    const companies = await res.json();
    return {
      authenticated: true,
      company: companies?.[0] || null,
    };
  } catch (error) {
    console.error("getMyCompany error:", error);
    return { authenticated: true, company: null };
  }
};

export const createCompany = async (newCompanyData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("You must be signed in to register a company.");
  }

  const payload = {
    ...newCompanyData,
    ownerId: session.user.id,
    ownerEmail: session.user.email,
  };

  return serverMutation("/api/companies", payload);
};

export const updateCompany = async (companyId, updatedData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("You must be signed in to update your company.");
  }

  const payload = {
    ...updatedData,
    ownerId: session.user.id,
  };

  return serverMutation(`/api/companies/${companyId}`, payload, "PATCH");
};
