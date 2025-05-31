# use-new-window

A React hook that opens and manages a new browser window.

---

## Installation

```sh
npm install use-new-window
```

---

## Quick start

```tsx
import { useNewWindow } from 'use-new-window'

function Example() {
  const { isOpen, open, close } = useNewWindow(
    '/secondWindow.html',
    'width=400,height=300',
    'secondWindow'
  )

  return (
    <div>
      <button onClick={isOpen ? close : open}>
        {isOpen ? 'Close second window' : 'Open second window'}
      </button>
    </div>
  )
}
```

---

## API

```ts
const { isOpen, open, close } = useNewWindow(
  url: string,
  features?: string,
  name?: string,
)
```

| Parameter  | Type     | Default    | Description                                                                                                                           |
| ---------- | -------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `url`      | `string` | —          | Destination URL for the new window                                                                                                    |
| `features` | `string` | `''`       | Standard [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) feature string (e.g. `"width=640,height=480"`) |
| `name`     | `string` | `"_blank"` | Window name/target. Re‑using the same name re‑uses the window instead of creating a new one                                           |

Return value:

| Property  | Type         | Description                                                     |
| --------- | ------------ | --------------------------------------------------------------- |
| `isOpen`  | `boolean`    | `true` while the window exists (even if it’s in the background) |
| `open()`  | `() => void` | Opens the window or re‑focuses it if it already exists          |
| `close()` | `() => void` | Closes the window programmatically                              |

---

## License

MIT © 2025 Kieran Harte
