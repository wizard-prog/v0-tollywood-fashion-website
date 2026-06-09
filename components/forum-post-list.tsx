"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Heart, Send } from "lucide-react"

// Sample forum post data
const initialPosts = [
  {
    id: "1",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2 days ago",
    content:
      "I recreated Samantha's look from Shakuntalam for my cousin's wedding and got so many compliments! The traditional jewelry really makes the difference.",
    likes: 24,
    comments: [
      {
        id: "1",
        author: {
          name: "Rahul K",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "Wow! Would love to see pictures if you're comfortable sharing!",
        date: "1 day ago",
      },
    ],
    isLiked: false,
  },
  {
    id: "2",
    author: {
      name: "Karthik Reddy",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "3 days ago",
    content:
      "Anyone else think Allu Arjun's style in Pushpa has completely changed men's fashion in South India? I see those shirts everywhere now!",
    likes: 42,
    comments: [
      {
        id: "1",
        author: {
          name: "Sneha M",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "The floral prints and that rugged look have become iconic.",
        date: "2 days ago",
      },
      {
        id: "2",
        author: {
          name: "Vikram T",
          avatar: "/placeholder.svg?height=30&width=30",
        },
        content: "I bought two shirts inspired by his look. They're surprisingly versatile!",
        date: "1 day ago",
      },
    ],
    isLiked: false,
  },
  {
    id: "3",
    author: {
      name: "Ananya Desai",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "1 week ago",
    content:
      "Does anyone know where I can find a leather jacket similar to the one Mahesh Babu wore in Pokiri? Been searching everywhere!",
    likes: 18,
    comments: [],
    isLiked: false,
  },
]

export default function ForumPostList() {
  const [posts, setPosts] = useState(initialPosts)
  const [newComment, setNewComment] = useState<Record<string, string>>({})
  const [newPost, setNewPost] = useState("")

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleAddComment = (postId: string) => {
    if (!newComment[postId]?.trim()) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                author: {
                  name: "You",
                  avatar: "/placeholder.svg?height=30&width=30",
                },
                content: newComment[postId],
                date: "Just now",
              },
            ],
          }
        }
        return post
      }),
    )

    // Clear the comment input
    setNewComment({
      ...newComment,
      [postId]: "",
    })
  }

  const handleAddPost = () => {
    if (!newPost.trim()) return

    const newPostObj = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Just now",
      content: newPost,
      likes: 0,
      comments: [],
      isLiked: false,
    }

    setPosts([newPostObj, ...posts])
    setNewPost("")
  }

  return (
    <div className="space-y-8">
      {/* New Post Form */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your thoughts on Telugu cinema fashion..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
        ></textarea>
        <div className="flex justify-end mt-3">
          <Button
            onClick={handleAddPost}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!newPost.trim()}
          >
            Post
          </Button>
        </div>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-5 border border-gray-100">
          {/* Post Header */}
          <div className="flex items-center mb-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-navy-700">{post.author.name}</h4>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>

          {/* Post Content */}
          <p className="text-gray-700 mb-4">{post.content}</p>

          {/* Post Actions */}
          <div className="flex items-center justify-between border-t border-b border-gray-100 py-2 mb-4">
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center ${post.isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
            >
              <Heart className="w-4 h-4 mr-1" fill={post.isLiked ? "currentColor" : "none"} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center text-gray-500">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{post.comments.length}</span>
            </button>
          </div>

          {/* Comments */}
          {post.comments.length > 0 && (
            <div className="space-y-3 mb-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start bg-gray-50 p-3 rounded-lg">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2 mt-1">
                    <Image
                      src={comment.author.avatar || "/placeholder.svg"}
                      alt={comment.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium text-navy-700">{comment.author.name}</h5>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <div className="flex items-center">
            <input
              type="text"
              value={newComment[post.id] || ""}
              onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
              placeholder="Add a comment..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Button
              onClick={() => handleAddComment(post.id)}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-l-none"
              disabled={!newComment[post.id]?.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
