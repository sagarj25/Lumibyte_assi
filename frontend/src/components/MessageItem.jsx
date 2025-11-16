import React, { useState } from "react";
import TableView from "./TableView";

export default function MessageItem({ msg }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const question = msg.question || msg.q || "";
  const answer = msg.answer || msg;

  return (
    <div className="my-4">
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Q: {question}</div>
      <div className="bg-white dark:bg-gray-800 rounded p-3 border dark:border-gray-700">
        <div className="text-sm mb-2">{answer.description || answer.desc || ""}</div>

        <TableView table={answer.table || answer.table || answer} />

        <div className="mt-3 flex gap-3 items-center">
          <button className={`px-2 py-1 rounded ${liked ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`} onClick={() => { setLiked(!liked); if (disliked) setDisliked(false); }}>
            👍 {liked ? 'Liked' : 'Like'}
          </button>
          <button className={`px-2 py-1 rounded ${disliked ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`} onClick={() => { setDisliked(!disliked); if (liked) setLiked(false); }}>
            👎 {disliked ? 'Disliked' : 'Dislike'}
          </button>
          <div className="text-xs text-gray-500">{msg.timestamp ? `Answered at: ${new Date(msg.timestamp).toLocaleString()}` : ''}</div>
        </div>
      </div>
    </div>
  );
}
