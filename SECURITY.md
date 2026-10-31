# Security policy

This repository builds a static website. Fixes are made on the `main` branch;
there is no response-time guarantee.

## Reporting a vulnerability

For problems in this site, use **Security → Report a vulnerability** on
GitHub (private vulnerability reporting). If that option is not available,
open an issue that only asks for a private contact, without details. Do not
publish exploit details before they are fixed.

Vulnerabilities in a listed project belong to that project's own security
policy, linked from its product page.

## Scope

Relevant reports include, for example:

- a download button that points to a file other than the documented asset of
  a stable release;
- content injection through project or release data;
- leaked secrets or personal data in this repository or its build output.

The site has no accounts, forms, cookies or server-side code. Release
metadata is fetched by a scheduled workflow with a read-only token and
proposed as a pull request; it is not fetched by visitors' browsers.
Checksums shown on product pages come from the projects' releases and prove
file integrity, not authorship.
