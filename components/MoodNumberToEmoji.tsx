export default function MoodNumberToEmoji({ mood }: { mood: number }) {
  if (mood === 1) return <>😁</>;
  if (mood >= 0.5 && mood < 1) return <>🙂</>;
  if (mood > 0 && mood < 0.5) return <>🙁</>;
  if (mood === 0) return <>😞</>;
  return <>-</>;
}
