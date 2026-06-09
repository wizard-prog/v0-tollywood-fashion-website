import CharacterStyleStory from "@/components/character-style-story"

export default function CharacterStoryPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <CharacterStyleStory />
    </div>
  )
}
