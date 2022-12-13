export default function Head() {
  return (
    <>
      <title>Journal App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      {/* Primary Meta Tags */}
      <meta name="title" content="Journal App" />
      <meta
        name="description"
        content="Create journal entries and track your mood!"
      />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://journal-app-lilac.vercel.app/" />
      <meta property="og:title" content="Journal App" />
      <meta
        property="og:description"
        content="Create journal entries and track your mood!"
      />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://journal-app-lilac.vercel.app/"
      />
      <meta property="twitter:title" content="Journal App" />
      <meta
        property="twitter:description"
        content="Create journal entries and track your mood!"
      />
    </>
  );
}
