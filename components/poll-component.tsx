"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface PollOption {
  id: string
  text: string
  votes: number
}

interface PollProps {
  poll: {
    id: string
    question: string
    options: PollOption[]
    totalVotes: number
    daysLeft: number
  }
}

export default function PollComponent({ poll }: PollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [pollData, setPollData] = useState(poll)

  const handleVote = () => {
    if (!selectedOption) return

    // Update the poll data with the new vote
    const updatedOptions = pollData.options.map((option) => {
      if (option.id === selectedOption) {
        return { ...option, votes: option.votes + 1 }
      }
      return option
    })

    setPollData({
      ...pollData,
      options: updatedOptions,
      totalVotes: pollData.totalVotes + 1,
    })

    setHasVoted(true)
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-navy-700 mb-4">{pollData.question}</h3>

      <div className="space-y-4 mb-6">
        {pollData.options.map((option) => {
          const percentage = Math.round((option.votes / pollData.totalVotes) * 100) || 0

          return (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`option-${option.id}`}
                  name={`poll-${pollData.id}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => !hasVoted && setSelectedOption(option.id)}
                  disabled={hasVoted}
                  className="mr-3"
                />
                <label htmlFor={`option-${option.id}`} className={`flex-grow ${hasVoted ? "font-medium" : ""}`}>
                  {option.text}
                </label>
                {hasVoted && <span className="text-navy-700 font-medium">{percentage}%</span>}
              </div>

              {hasVoted && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <span className="font-medium">{pollData.totalVotes}</span> votes • {pollData.daysLeft} days left
        </div>

        {!hasVoted && (
          <Button
            onClick={handleVote}
            disabled={!selectedOption}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Vote
          </Button>
        )}
      </div>
    </div>
  )
}
