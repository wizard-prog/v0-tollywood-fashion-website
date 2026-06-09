import type { Metadata } from "next"
import { spotlightCharacters } from "@/lib/data"
import { CharacterSpotlight } from "@/components/character-spotlight"
import { EnhancedCharacterImage } from "@/components/enhanced-character-image"

export const metadata: Metadata = {
  title: "Arjun Reddy | Character Style | Tollywood Threads",
  description: "Explore the rebellious, urban style of Arjun Reddy from the blockbuster Telugu film.",
}

export default function ArjunRedyPage() {
  const character = spotlightCharacters.find((char) => char.name === "Arjun Reddy")

  if (!character) {
    return <div>Character not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Character Spotlight</h1>
        <CharacterSpotlight character={character} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Iconic Look</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <EnhancedCharacterImage
              src="/images/characters/vijay-deverakonda-arjun-reddy-hd.jpg"
              alt="Arjun Reddy's iconic look"
              width={600}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">The Rebellious Style</h3>
            <p className="mb-4">
              Vijay Deverakonda's portrayal of Arjun Reddy created a fashion revolution among youth. The character's
              signature look features:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Long, wavy hair that became a signature look</li>
              <li>Casual striped shirts with open collars</li>
              <li>Messy, unkempt hair that became a trend</li>
              <li>Full beard that many young men tried to emulate</li>
              <li>Round sunglasses that became a fashion statement</li>
              <li>Relaxed, carefree attitude reflected in the clothing choices</li>
            </ul>
            <p>
              The character's signature long hair and full beard combination created an instantly recognizable look that
              influenced men's grooming trends across India.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Style Evolution</h2>
        <p className="mb-4">Throughout the film, Arjun Reddy's style evolves with his character arc:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">College Phase</h3>
            <p>
              Clean-cut with casual shirts and a more groomed appearance, representing his focused medical student
              persona.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Heartbreak Phase</h3>
            <p>
              The iconic bearded look with disheveled appearance, reflecting his emotional turmoil and rebellion against
              society.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Redemption Phase</h3>
            <p>
              A blend of professional and rebellious elements, showing his journey toward finding balance while
              maintaining his authentic self.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Fashion Impact</h2>
        <p className="mb-4">Arjun Reddy's style had a significant impact on men's fashion in India:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Beard grooming products saw increased sales after the film's release</li>
          <li>Round sunglasses became a must-have accessory</li>
          <li>Casual, slightly disheveled looks gained popularity in urban fashion</li>
          <li>The film influenced a more relaxed approach to formal and semi-formal attire</li>
          <li>Created a trend of "intentionally messy" styling among young men</li>
        </ul>
      </div>
    </div>
  )
}
