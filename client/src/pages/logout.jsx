import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { reducerCases } from "@/context/constants";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useStateProvider } from "@/context/StateContext";

const logout = () => {
  const router = useRouter();
  const [{ socket, userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    socket.current.emit("signout", userInfo.id);
    dispatch({ type: reducerCases.SET_USER_INFO, userInfo: undefined });

    signOut(firebaseAuth);
    router.push("/login");
  }, [socket])
  
  return (
    <div className="bg-conversation-panel-background">
      Logging out........
    </div>
  );
}

export default logout;
