---
name: 21st-ui
description: Pull UI components and inspiration from the 21st.dev MCP server and turn them into Mowasalaty (مواصلاتي) screens. Use when building or upgrading a Mowasalaty section (booking search, trip results, live tracking, fleet tables, dashboards, nav, forms), or when the user says "use 21st", "magic component", or asks to enhance the UI.
---

# 21st.dev components for Mowasalaty

The `21st` MCP server is registered in `.mcp.json` (HTTP, `https://21st.dev/api/mcp`).
It reads the key from the `API_KEY_21ST` environment variable. Never paste the key
into `.mcp.json`, a page, or a commit.

If the server's tools are missing, check `/mcp`. The usual cause is that
`API_KEY_21ST` is not set in the shell (local) or in the environment's variables (cloud).

## How to use it here

21st.dev returns React + Tailwind. Until this repo picks a framework, build pages the
same way as the Mowasalaty console in the alSooq repo
(`Saboora12345/AlSooqonbording`, `mowasalaty.html`): one self-contained `.html` file,
inlined CSS and vanilla JS, no build step. Treat a 21st.dev component as a reference,
not a drop-in.

1. Ask the MCP for the component that fits the section (e.g. "trip search form with
   date picker", "seat availability cards", "vehicle status table"). Read its markup
   and motion.
2. Rewrite it as plain HTML + CSS + vanilla JS. No React, no Tailwind CDN, no new
   dependencies unless the repo has adopted a stack.
3. Colours: the Mowasalaty blue/cyan brand, defined once as CSS custom properties on
   `:root`. Do not bring in the component's palette. Inside the wider alSooq ecosystem,
   gold marks the Mowasalaty identity.
4. Fonts: IBM Plex Sans + IBM Plex Sans Arabic.
5. Bilingual: Arabic first (`dir="rtl"`) with an English toggle. Every string has both
   versions. Use logical properties (`margin-inline-start`, `inset-inline-end`) so the
   layout flips correctly.
6. Motion: decelerating easing only, and honour `prefers-reduced-motion`.
7. No secrets in client code. Trip booking calls `api.alsooq.com/mowasalaty/trips`
   through a server-side proxy; the AlSooq API Bearer token never ships to the browser.

## Before committing

Open the page at phone width (360px) in both Arabic and English and check nothing
overflows horizontally.
