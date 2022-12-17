export default function MoodNumberToEmoji({ mood }: { mood: number }) {
  if (mood === 1) return <>😁</>;
  if (mood === 0.75) return <>🙂</>;
  if (mood === 0.25) return <>🙁</>;
  if (mood === 0) return <>😞</>;
  return <>-</>;
}
