# Mowasalty · مواصلاتي

The transport module of the alSooq / Hawil ecosystem: trip booking, live tracking and
fleet management. The current working prototype lives in
[`Saboora12345/AlSooqonbording`](https://github.com/Saboora12345/AlSooqonbording)
as `mowasalaty.html`.

## MCP: 21st.dev components

This repo registers the [21st.dev](https://21st.dev) MCP server at project scope in
[`.mcp.json`](./.mcp.json). Claude Code picks it up after you approve the server once.

```bash
export API_KEY_21ST=your-key   # read from the environment, never committed
claude                          # then run /mcp to confirm "21st" is connected
```

To add it yourself instead:
`claude mcp add --scope project --transport http 21st https://21st.dev/api/mcp --header 'x-api-key: ${API_KEY_21ST}'`

The project skill [`.claude/skills/21st-ui`](./.claude/skills/21st-ui/SKILL.md) tells
Claude how to turn 21st.dev's React/Tailwind output into Mowasalaty screens: the
blue/cyan brand, IBM Plex, Arabic RTL + English LTR, and reduced-motion support.
