export default function MoodNumberToEmoji({ mood }: { mood: number }) {
  if (mood === 1) return <>😁</>;
  if (mood >= 0.75 && mood < 1) return <>🙂</>;
  if (mood > 0.75 && mood < 0.5) return <>🙁</>;
  if (mood < 0.25) return <>😞</>;
  return <>-</>;
}
