import Box from "../Box/Box";
import { domain, name, source, sourceCopyright } from "@/types/assist/branding";
import "./Footer.css";

export default function Footer() {
  return (
    <Box title={domain} hr small>
      <p>Created by MeowcaTheoRange.</p>
      <p>{domain} domain owned by Redact4K.</p>
      <p>
        The {name} name is derived from {source}. The name may be used in an
        entity context or a project context.
      </p>
      <p>{sourceCopyright}</p>
    </Box>
  );
}
