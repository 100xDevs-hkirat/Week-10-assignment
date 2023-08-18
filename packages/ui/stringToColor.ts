export function stringToColor(inputString: string) {
  let hash = 0;

  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + (hash << 5) - hash;
  }

  const hue = Math.abs(hash) % 360; // Use the hash as the hue value
  const saturation = 50; // Adjust saturation as needed
  const lightness = 50; // Adjust lightness as needed

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
