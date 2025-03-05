// import { ReactNode } from "react";
// import { useParams } from "react-router-dom";

// import { useUser } from "~/hooks/queries";
// import { AppContext } from ".";

// interface AppContextProviderProps {
//   children: ReactNode;
// }

// export function AppContextProvider({ children }: AppContextProviderProps) {
//   const { slug } = useParams();

//   const { data: user } = useUser(slug!);

//   const value = {
//     user,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// }
