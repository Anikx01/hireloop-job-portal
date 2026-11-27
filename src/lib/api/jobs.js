const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status) => {
  const params = new URLSearchParams();

  if (companyId) {
    params.append("companyId", companyId);
  }
  if (status) {
    params.append("status", status);
  }

  const queryString = params.toString();
  const url = queryString
    ? `${baseUrl}/api/jobs?${queryString}`
    : `${baseUrl}/api/jobs`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs (status ${res.status})`);
  }

  return res.json();
};
