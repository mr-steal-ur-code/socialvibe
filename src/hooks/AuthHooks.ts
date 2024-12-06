import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential
} from "firebase/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "../firebase";

const fetchUserClaims = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;

  const idToken = await currentUser.getIdToken();
  const claims = (await currentUser.getIdTokenResult(true)).claims;

  return {
    idToken,
    claims,
    emailVerified: currentUser.emailVerified,
  };
};

export const useAuthState = () => {
  return useQuery({
    queryKey: ["authState"],
    queryFn: () => fetchUserClaims,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  }
  )
}

export const useEmailSignup = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(res.user);
      return res.user;
    }
  });
}

export const useEmailLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const res: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    }
  });
};

export const usePasswordReset = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      await sendPasswordResetEmail(auth, email);
    }
  });
};

export const useSendVerificationEmail = () => {
  return useMutation({
    mutationFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("No user is currently logged in.");
      await sendEmailVerification(user);
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await auth.signOut();
      queryClient.invalidateQueries({
        queryKey: ["authState"]
      });
    }
  })
}
