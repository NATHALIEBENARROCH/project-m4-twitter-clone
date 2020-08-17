import React from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  // Fetch the user data from the API (/me/profile)

  React.useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // When the data is received, update currentUser.
        setCurrentUser(data);
        // Also, set `status` to `idle`
        setStatus("idle");
      })
      .catch((error) => {
        console.log("an error occured please refresh", error);
        if (error) {
          window.location.href = "/error";
        }
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ setCurrentUser, currentUser, status, setStatus }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
