import { useState } from "react";
import { FaPoll, FaPaperclip } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Create() {
  const [content, setContent] = useState("");

  return (
    <div className="bg-[#0f172a] text-white max-w-xl mx-auto mt-10 p-5 rounded-2xl shadow-lg border border-gray-700">
      {/* Profile Info */}
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="w-12 h-12 rounded-full border border-gray-600"
        />
        <div className="ml-3">
          <h3 className="text-lg font-semibold">Ayush Singh</h3>
          <p className="text-sm text-gray-400">Post to Anyone</p>
        </div>
      </div>

      {/* Input box */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full p-3 rounded-lg bg-[#1e293b] border border-gray-600 text-white resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
        rows={4}
      />

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3">
          <Button variant="outline" disabled className="flex items-center gap-2 bg-[#1e293b] border-gray-600 text-gray-400 hover:text-gray-400">
            <FaPoll /> Poll
          </Button>
          <Button variant="outline" disabled className="flex items-center gap-2 bg-[#1e293b] border-gray-600 text-gray-400 hover:text-gray-400">
            <FaPaperclip /> Attach File
          </Button>
        </div>

        {/* Send Button */}
        <Button
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-xl shadow"
          disabled={!content.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
