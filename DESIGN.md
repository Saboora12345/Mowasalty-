# Mowasalti — design system

Arabic-first (RTL) with an English LTR mirror. All layout uses logical properties (`start`/`end`, `ps`/`pe`), so one markup serves both directions.

## Colour system
Cool Mowasalti palette from the AlSooq `DESIGN.md`, plus one turquoise accent for this site.

| Token | Hex | Use |
|---|---|---|
| ink | `#0B2A38` | text, dark surfaces |
| navy | `#123251` | dark cards |
| blue | `#0077B6` | primary actions |
| cyan | `#0096C7` | secondary, gradients |
| turq | `#12B5AD` | accent, hover states (new) |
| turq-soft | `#2DD4C4` | accent on dark |
| mist | `#EDF4F8` | section surfaces |
| line | `#CFDEE8` | hairlines |
| ok / warn | `#1B9E77` / `#C77D0A` | status |

Turquoise is new to this repo; confirm the exact hex with the owner.

## Type
IBM Plex Sans, IBM Plex Sans Arabic, IBM Plex Mono for codes. Arabic gets 1.75 line height. The "How it works" section scopes Inter first with Plex Arabic as the fallback, as its spec asks.

## Numbers and currency
Arabic-Indic digits in Arabic, Western in English (`useLang().n`). SDG shows as **ج.س**; EGP, SAR, AED have Arabic labels in `lib/lang.tsx`.

## Honesty rules
Only the 3,000 / 8,000 / 15,000 SDG fares are real inputs. Everything else (route fares on non-urban routes, operators, fleet figures, testimonials, revenue mix, partner slots) is sample data and carries an "illustrative" label in the UI. Operator plan prices read "on request" on purpose. Payment, forms and the ticket code are simulated. Contact addresses and social handles are pending.

## Components (`src/components`)
`ui.tsx` Button, Card, Badge, Stat, Field, Icon, Logo, Illustrative · `Booking` (search, seats, pay, ticket) · `RouteMap` (schematic SVG) · `FleetDashboard` · `Phone` + app screens · `Ecosystem` · `HowItWorks04Kelo` · `Shell` (Header, Footer, PageHero). Live reference at `#/system`.

## Pages
`#/home` `routes` `operators` `fleet` `corporate` `driver` `app` `pricing` `investors` `contact`, plus `system`.
