// import { useState } from "react";
// import api from "../lib/axios";

// export default function TaskForm({ onCreated }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();
//     const { data } = await api.post("/tasks", { title, description });
//     setTitle("");
//     setDescription("");
//     onCreated?.(data);
//   };

//   return (
//     <form
//       onSubmit={submit}
//       className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-indigo-700/20 transition"
//     >
//       <h2 className="text-xl font-bold text-white">Add New Task</h2>

//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Task title"
//         className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
//       />

//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//         className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
//         rows={4}
//       />

//       <button
//         type="submit"
//         className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200"
//       >
//         Add Task
//       </button>
//     </form>
//   );
// }


import { useState } from "react";
import api from "../lib/axios"; // make sure this is your axios setup

const hijabStyles = [
  {
    id: 1,
    title: "Elegant Black Hijab",
    description: "Perfect for formal and daily wear. Smooth, breathable fabric.",
    image: "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    title: "Floral Chiffon Hijab",
    description: "Lightweight and perfect for summer vibes. Easy to drape.",
    image: "h",
  },
  {
    id: 3,
    title: "Classic White Hijab",
    description: "Minimalist and elegant for everyday styling.",
    image: "https://images.unsplash.com/photo-1612783600377-5ad3627dd94f",
  },
];

export default function HijabStyles() {
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});

  const submitReview = async (id) => {
    const review = reviews[id];
    const rating = ratings[id];

    if (!review || !rating) return alert("Please add review & rating");

    try {
      const { data } = await api.post("/reviews", {
        hijabStyleId: id,
        review,
        rating: Number(rating),
      });

      setReviews({ ...reviews, [id]: "" });
      setRatings({ ...ratings, [id]: "" });
      alert("Review submitted!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Hijab Style Reviews
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {hijabStyles.map((hijab) => (
          <div
            key={hijab.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
          >
            <img
              src={hijab.image}
              alt={hijab.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {hijab.title}
              </h2>
              <p className="text-gray-600 mt-2">{hijab.description}</p>

              <div className="mt-4">
                <textarea
                  value={reviews[hijab.id] || ""}
                  onChange={(e) =>
                    setReviews({ ...reviews, [hijab.id]: e.target.value })
                  }
                  placeholder="Write your review..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  rows={3}
                ></textarea>

                <select
                  value={ratings[hijab.id] || ""}
                  onChange={(e) =>
                    setRatings({ ...ratings, [hijab.id]: e.target.value })
                  }
                  className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 && "s"}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => submitReview(hijab.id)}
                  className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
