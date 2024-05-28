import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./firebase";

const provider = new GoogleAuthProvider();

const authenticate = async () => {
  const auth = getAuth(app);
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    const errorMessage = error.message;
    console.error("Error during sign-in:", errorMessage);
    return null;
  }
};

export default authenticate;
