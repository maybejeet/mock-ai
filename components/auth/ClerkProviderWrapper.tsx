import { ClerkProvider } from "@clerk/clerk-react";
import { ReactNode } from "react";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn("Missing VITE_CLERK_PUBLISHABLE_KEY - Clerk auth will not work");
}

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

const ClerkProviderWrapper = ({ children }: ClerkProviderWrapperProps) => {
  if (!PUBLISHABLE_KEY) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;
