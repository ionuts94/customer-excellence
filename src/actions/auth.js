import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const register = async ({ email, password }) => {
  const auth = getAuth();


  console.log(email);
  console.log(password);
  
  // Create auth user
  let userCredentials;
  try {
    userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }

  if (userCredentials) {
    return true;
  } else {
    return false;
  }
}