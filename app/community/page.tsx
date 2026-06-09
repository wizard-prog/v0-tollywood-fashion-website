import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CharacterSuggestionForm from "@/components/character-suggestion-form"
import PollComponent from "@/components/poll-component"
import ForumPostList from "@/components/forum-post-list"
import RecommenderSystem from "@/components/recommender-system"
import CinematicBackground from "@/components/cinematic-background"

export default function CommunityPage() {
  // Poll data
  const polls = [
    {
      id: "1",
      question: "Whose wedding look would you wear – Samantha or Kajal?",
      options: [
        { id: "1", text: "Samantha's traditional elegance", votes: 342 },
        { id: "2", text: "Kajal's modern fusion style", votes: 289 },
      ],
      totalVotes: 631,
      daysLeft: 3,
    },
    {
      id: "2",
      question: "Which actor's style do you prefer for casual wear?",
      options: [
        { id: "1", text: "Allu Arjun's trendy street style", votes: 423 },
        { id: "2", text: "Mahesh Babu's sophisticated casual", votes: 387 },
        { id: "3", text: "Vijay Deverakonda's laid-back cool", votes: 291 },
      ],
      totalVotes: 1101,
      daysLeft: 5,
    },
    {
      id: "3",
      question: "Which movie had the most iconic costumes?",
      options: [
        { id: "1", text: "Baahubali's royal grandeur", votes: 512 },
        { id: "2", text: "RRR's period-perfect looks", votes: 478 },
        { id: "3", text: "Pushpa's raw, rugged style", votes: 356 },
        { id: "4", text: "Sita Ramam's vintage elegance", votes: 298 },
      ],
      totalVotes: 1644,
      daysLeft: 2,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Hero Banner */}
      <CinematicBackground posterUrl="/images/banners/collections-banner.jpg" overlayColor="rgba(15, 23, 42, 0.7)">
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Tollywood Threads Community</h1>
            <p className="text-xl text-white/90 mb-8">
              Join fellow Telugu cinema fans in discussing styles, suggesting characters, and sharing your fashion
              inspirations
            </p>
          </div>
        </div>
      </CinematicBackground>

      {/* Community Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="polls" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="polls">Style Polls</TabsTrigger>
              <TabsTrigger value="suggest">Suggest Characters</TabsTrigger>
              <TabsTrigger value="forum">Fan Forum</TabsTrigger>
              <TabsTrigger value="recommender">Style Matcher</TabsTrigger>
            </TabsList>

            {/* Polls Tab */}
            <TabsContent value="polls" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-navy-700 mb-6">Vote in Our Style Polls</h2>
              <div className="space-y-8">
                {polls.map((poll) => (
                  <PollComponent key={poll.id} poll={poll} />
                ))}
              </div>
            </TabsContent>

            {/* Suggest Characters Tab */}
            <TabsContent value="suggest" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-navy-700 mb-6">Suggest a Character</h2>
              <p className="text-gray-600 mb-8">
                Is there a Telugu cinema character whose style you'd love to see featured? Let us know!
              </p>
              <CharacterSuggestionForm />
            </TabsContent>

            {/* Forum Tab */}
            <TabsContent value="forum" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-navy-700 mb-6">Fan Style Forum</h2>
              <p className="text-gray-600 mb-8">
                Join the conversation about Telugu cinema fashion, share your style inspirations, and connect with other
                fans.
              </p>
              <ForumPostList />
            </TabsContent>

            {/* Recommender Tab */}
            <TabsContent value="recommender" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-navy-700 mb-6">Style Recommender</h2>
              <p className="text-gray-600 mb-8">
                Tell us which character's style you love, and we'll recommend similar looks you might enjoy.
              </p>
              <RecommenderSystem />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
