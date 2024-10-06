import { useEffect, useState } from "react";

// import { getUser } from "~/api/users";
import { IUser } from "~/~/models/User";

// export function useUser(userId: string) {
//   const [data, setData] = useState<IUser | undefined>();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     async function fetchUser() {
//       setIsLoading(true);
//       setError(false);

//       try {
//         const user = await getUser(userId);

//         setData(user);
//         setIsLoading(false);
//       } catch {
//         setError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchUser();
//   }, [userId]);

//   return { data, isLoading, error };
// }
