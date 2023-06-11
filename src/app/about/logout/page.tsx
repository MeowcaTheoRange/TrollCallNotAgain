"use client";
import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import "@/styles/form.css";
import { RemoveUserCookies } from "@/types/assist/utility";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function LogOut() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <>
      <Box title="LOGGING OUT">
        <p>Are you sure you want to log out?</p>

        <Flexbox direction="row" gap="8px" justify="flex-end" align="center">
          <button
            onClick={() => {
              RemoveUserCookies(removeCookie);
              window.location.href = "/";
            }}
            className="shell"
          >
            Yes
          </button>
          <button onClick={() => router.back()} className="shell">
            No
          </button>
        </Flexbox>
      </Box>
    </>
  );
}
