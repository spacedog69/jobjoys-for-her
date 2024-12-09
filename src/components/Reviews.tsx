import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Software Engineer",
    content: "Found my dream remote job in just 2 weeks! The mentorship program was invaluable.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Emily R.",
    role: "Product Manager",
    content: "The premium tier is worth every penny. Landed multiple interviews within days!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: 3,
    name: "Jessica K.",
    role: "UX Designer",
    content: "Amazing platform for women in tech. The community support is incredible!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
  },
];

export const Reviews = () => {
  return (
    <div className="bg-[#1A1F2C] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Loved by 10,000+ Women in Tech</h2>
          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-accent text-accent" />
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#232836] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-white"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};