import { useQuery } from "@tanstack/react-query";

import { getUser } from "~/api/users/getUser";

export function useUser(slug: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [slug],
    queryFn: () => getUser(slug),
  });

  return { data, isLoading, isError };
}
