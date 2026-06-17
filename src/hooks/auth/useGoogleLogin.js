export const useGoogleLogin = () => {
  const loginWithGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return { loginWithGoogle };
};
