export function testClientRect(
  element: HTMLElement,
  onEnter?: VoidFunction,
  onOut?: VoidFunction,
  deltaTop = 0,
  deltaBottom = 0
) {
  const rect = element.getBoundingClientRect()
  if (
    rect['y'] < window.innerHeight + deltaTop &&
    rect['y'] > -rect.height + deltaBottom
  ) {
    onEnter && onEnter()
  } else {
    onOut && onOut()
  }
}
