import {
	createUserWithEmailAndPassword,
	ParsedToken,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	UserCredential,
} from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

type AuthContextType = {
	isLoggedIn: boolean | undefined;
	isMember: boolean | undefined;
	isAdmin: boolean | undefined;
	emailVerified: boolean | undefined;
	idToken: string | undefined;
	sendVerificationEmail: () => void;
	emailLoginCreate: (email: string, password: string) => Promise<void>;
	emailAndPasswordLogin: (email: string, password: string) => Promise<void>;
	passwordReset: (email: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | any>("");

export const AuthContextProvider = ({ children }: { children: any }) => {
	const [isMember, setIsMember] = useState<boolean | undefined>(undefined);
	const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
	const [idToken, setIdToken] = useState<string | undefined>(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
	const [emailVerified, setEmailVerified] = useState<boolean | undefined>(
		undefined
	);

	const sendVerificationEmail = async () => {
		const user = auth?.currentUser || null;
		if (!user) {
			return { success: false, response: "No User" };
		}
		try {
			await sendEmailVerification(user);
			return { success: true, response: "Verification Email Sent" };
		} catch (error) {
			console.error("Error sending verification email:", error);
			return {
				success: false,
				response:
					"Error sending verification email, try again in a few minutes",
			};
		}
	};

	const emailLoginCreate = async (email: string, password: string) => {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			if (res.user) {
				await sendEmailVerification(res.user);
				return { success: true, response: res.user };
			}
		} catch (error: any) {
			console.error(error);
			return {
				success: false,
				response: error?.code?.split?.("/")?.[1] || error?.code,
			};
		}
	};

	const emailAndPasswordLogin = async (email: string, password: string) => {
		try {
			const res: UserCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (res.user) {
				return { success: true, response: res.user };
			}
		} catch (error: any) {
			console.error(error);
			return {
				success: false,
				response: error?.code?.split?.("/")?.[1] || error?.code,
			};
		}
	};

	const passwordReset = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
			return {
				success: true,
				response:
					"Please check your email and follow the link to reset your password.",
			};
		} catch (error: any) {
			console.error(error);
			return {
				success: false,
				response: error?.code?.split?.("/")?.[1] || error?.code,
			};
		}
	};

	const logout = async () => {
		try {
			auth?.signOut();
			console.log("Logged out");
		} catch (error: any) {
			console.error("Error signing out", error);
			return error?.code || error?.message;
		}
	};

	useEffect(() => {
		if (!auth) return;
		return auth.onAuthStateChanged(async (currentUser) => {
			if (!currentUser) {
				setIsAdmin(undefined);
				setIsMember(undefined);
				setIsLoggedIn(false);
			} else {
				const token = await currentUser?.getIdToken();
				setIdToken(token);
				if (!currentUser?.emailVerified) {
					setEmailVerified(false);
				} else {
					setEmailVerified(true);
				}
				const claims: Claims & ParsedToken =
					(await currentUser?.getIdTokenResult(true))?.claims || {};
				setIsLoggedIn(true);
				setIsAdmin(claims?.admin || false);
				setIsMember(claims?.member || false);
			}
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isMember,
				isAdmin,
				isLoggedIn,
				emailVerified,
				idToken,
				sendVerificationEmail,
				emailLoginCreate,
				emailAndPasswordLogin,
				passwordReset,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
