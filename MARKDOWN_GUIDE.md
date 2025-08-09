## Chat Markdown Guide

This app supports GitHub‑Flavored Markdown (GFM) in messages for server channels, direct messages (DMs), and threads.

### Quick start
- Type Markdown directly in the message box. Messages render as Markdown when displayed.
- HTML is disabled for safety. Use Markdown syntax only.

### Supported syntax

- Headings:
  - `# H1`  `## H2`  `### H3`

- Emphasis:
  - Bold: `**bold**`
  - Italic: `*italic*`
  - Strikethrough: `~~strikethrough~~`

- Links and images:
  - Link: `[label](https://example.com)`
  - Image: `![alt](https://example.com/image.png)`

- Quotes:
  - `> quoted text`

- Lists:
  - Unordered:
    - `- item`
    - `* item`
  - Ordered:
    - `1. item`

- Tables (GFM):

```
| Name  | Score |
|-------|------:|
| Alice |   100 |
| Bob   |    95 |
```

- Code
  - Inline: `` `const x = 1` ``
  - Block with optional language for highlighting:
    ```
    ```ts
    export function add(a: number, b: number) {
      return a + b
    }
    ```
    ```

- Task lists (GFM):
  - `- [x] done`
  - `- [ ] todo`

### Notes and limitations

- Security: raw HTML is disabled and will not render.
- Links open in a new tab and are styled with underline on hover.
- Syntax highlighting is enabled for fenced code blocks via `rehype-highlight` (common languages are supported automatically).
- Composer: the current message input is single‑line. For multi‑line content (tables, long lists, code blocks), paste from an editor. If you’d like true multi‑line composing (Shift+Enter for new lines), we can switch the input to a textarea.

### Tips

- Prefer explicit Markdown links (`[label](url)`) to ensure consistent rendering.
- Use fenced code blocks with a language identifier (e.g., `js`, `ts`, `json`, `bash`) for best highlighting.

### Where it’s available

- Server channels
- Direct Messages (DMs)
- Threads


