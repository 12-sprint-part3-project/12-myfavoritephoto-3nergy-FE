const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useGoogleLogin = () => {
  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return { loginWithGoogle };
};
