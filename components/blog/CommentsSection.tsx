"use client";

import React, { useState } from "react";
import { MessageSquare, ThumbsUp, Send, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

interface CommentItem {
  id: string;
  name: string;
  date: string;
  content: string;
  likes: number;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: "c1",
    name: "Dayo Oladipo",
    date: "2 hours ago",
    content: "Afrobeats is genuinely taking over the universe right now! Loving this detailed coverage.",
    likes: 14,
  },
  {
    id: "c2",
    name: "Ngozi Eze",
    date: "4 hours ago",
    content: "The quality of young Nigerian digital animators and skit makers is unmatched. Big up FunAllTheWay for highlighting homegrown talents!",
    likes: 9,
  },
];

export const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && commentText.trim()) {
      const newComment: CommentItem = {
        id: `c_${Date.now()}`,
        name: name.trim(),
        date: "Just now",
        content: commentText.trim(),
        likes: 0,
      };
      setComments([newComment, ...comments]);
      setName("");
      setCommentText("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="mt-12 bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span>Comments ({comments.length})</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">Join the discussion</span>
      </div>

      {/* Form */}
      <form onSubmit={handleAddComment} className="mb-8 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h4 className="text-sm font-bold text-slate-800 mb-3">Leave a Reply</h4>
        {submitted && (
          <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs p-3 rounded-md flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Your comment has been posted!</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Your Name (e.g. Tolu from Lagos)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email (kept private)"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <textarea
          placeholder="Write your thoughts..."
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
        <Button type="submit" variant="primary" size="sm" className="font-bold uppercase tracking-wider">
          <Send className="w-3.5 h-3.5 mr-1" />
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-lg bg-white border border-slate-100 shadow-xs flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
              {comment.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-slate-900">{comment.name}</h5>
                <span className="text-xs text-slate-400">{comment.date}</span>
              </div>
              <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{comment.content}</p>
              <button
                onClick={() => handleLike(comment.id)}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({comment.likes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
