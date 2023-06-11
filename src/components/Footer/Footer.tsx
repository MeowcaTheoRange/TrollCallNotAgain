import {
  brand,
  domain,
  fullDomain,
  source,
  sourceCopyright,
} from "@/types/assist/branding";
import Link from "next/link";
import Box from "../Box/Box";
import "./Footer.css";

export default function Footer() {
  return (
    <Box title={fullDomain} hr small>
      <p>
        {brand.code} rev. 3 ver. 0.1.0 created by {brand.owner}.
      </p>
      <p>
        {fullDomain} domain owned by {domain.owner}.
      </p>
      <p>
        The {brand.name} name is derived from {source}. The name may be used in
        an entity context or a project context.
      </p>
      <p>{sourceCopyright}</p>
      <p>
        <Link href="/about/privacy">Privacy Policy</Link>
      </p>
    </Box>
  );
}
