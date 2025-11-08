import config from "@/config";

export const continueWithGoogle = () => {
      window.open(`${config.baseUrl}/auth/google`);
}