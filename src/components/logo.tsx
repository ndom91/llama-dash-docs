/**
 * Project wordmark — the "ld" + blinking caret from the landing navbar,
 * theme-aware (foreground text + primary-colored caret) for use in the docs nav.
 */
export function Logo() {
  return (
    <span className="ld-mark" role="img" aria-label="llama-dash">
      ld
      <span className="ld-mark-caret" aria-hidden="true" />
    </span>
  );
}
