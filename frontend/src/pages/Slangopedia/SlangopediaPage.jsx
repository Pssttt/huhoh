import DashboardNavBar from '@/components/DashboardNavBar'
import SlangCard from '@/components/SlangCard'

const SlangopediaPage = () => {
  const slangTerms = [
    {
      id: 1,
      term: 'Yeet',
      meaning: 'To throw something with force',
      example: "I'm gonna yeet this water bottle into the trash",
      origin: 'Early 2000s hip-hop culture, popularized by viral videos',
    },
    {
      id: 2,
      term: 'Rizz',
      meaning: 'Charisma or romantic appeal',
      example: "He's got serious rizz with the ladies",
      origin: "Short for 'charisma', popularized by Twitch streamers in 2022",
    },
    {
      id: 3,
      term: 'Cap',
      meaning: 'To lie or exaggerate',
      example: "You're capping - no way you met Drake!",
      origin:
        "African American Vernacular English (AAVE), from 'high capping' meaning boasting",
    },
    {
      id: 4,
      term: 'Slay',
      meaning: 'To do something exceptionally well',
      example: 'She slayed that presentation!',
      origin: 'Drag culture, popularized by LGBTQ+ community in 1980s',
    },
    {
      id: 5,
      term: 'Sus',
      meaning: 'Suspicious or shady',
      example: 'That guy acting sus in the corner',
      origin:
        "Originally from 'Among Us' game (2020), derived from 'suspicious'",
    },
    {
      id: 6,
      term: 'Glow-up',
      meaning: 'A dramatic transformation/improvement',
      example: 'Her glow-up after high school was insane',
      origin: 'Beauty community, early 2010s',
    },
    {
      id: 7,
      term: 'Stan',
      meaning: 'An obsessive fan',
      example: "I'm a total Taylor Swift stan",
      origin: "Eminem's 2000 song 'Stan' about an obsessed fan",
    },
    {
      id: 8,
      term: 'Cheugy',
      meaning: 'Outdated or trying too hard',
      example: 'Those pumpkin spice lattes are so cheugy now',
      origin: 'TikTok (2021), possibly from Chicago suburban slang',
    },
    {
      id: 9,
      term: "Bussin'",
      meaning: 'Extremely good (usually food)',
      example: "This pizza is bussin'!",
      origin: 'Southern US Black vernacular, popularized by TikTok',
    },
    {
      id: 10,
      term: 'No cap',
      meaning: 'For real, not lying',
      example: 'I aced that test, no cap!',
      origin: "AAVE, opposite of 'cap' (lie)",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Slang Dictionary
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {slangTerms.map((term) => (
            <SlangCard
              key={term.id}
              term={term.term}
              meaning={term.meaning}
              example={term.example}
              origin={term.origin}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SlangopediaPage
