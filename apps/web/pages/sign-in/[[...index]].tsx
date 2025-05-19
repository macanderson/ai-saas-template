import { SignIn } from "@clerk/nextjs";

const appearance = {
  variables: {
    colorPrimary: "#000",
    colorTextPrimary: "#000",
    colorTextSecondary: "#000",
    colorTextPlaceholder: "#000",
    colorTextLink: "#000",
    colorTextLinkHover: "#000",
  },
  layout: {
    logoImage: "/logo.png",
    logoPlacement: "inside" as "inside",
    logoWidth: "100px",
    socialButtonsVariant: "iconButton" as "iconButton",
  },
};

export default function SignInPage() {
  return <SignIn routing="path" path="/sign-in" appearance={appearance} />;
}
