import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export function PostCard({ post, onView, onEdit, onDelete }) {
    return (
        <div className="bg-gray-900 p-3 sm:p-4 border border-gray-700 rounded-xl shadow-lg h-full flex flex-col hover:scale-[1.03] sm:hover:scale-[1.05] transition-transform">
            <div className="flex justify-between items-start gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white break-words flex-1">
                    {post.title}
                </h2>
                <span
                    className={
                        post.published
                            ? "text-green-400 font-semibold text-xs sm:text-sm whitespace-nowrap"
                            : "text-red-400 font-semibold text-xs sm:text-sm whitespace-nowrap"
                    }
                >
                    {post.published ? "Published" : "Draft"}
                </span>
            </div>

            <hr className="my-2 border-gray-600" />
            <p className="text-gray-400 text-xs sm:text-sm break-words">
                Author: {post.author_name || "Anonymous"}
            </p>

            {/* Preview content */}
            <div className="text-gray-300 text-sm sm:text-base mt-2 flex-1 overflow-hidden">
                <p className="line-clamp-3 whitespace-pre-wrap break-words">
                    {post.content}
                </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-auto pt-3 sm:pt-4 gap-2">
                <Button
                    size="sm"
                    onClick={() => onView(post)}
                    className="flex-1 bg-gray-800 text-white hover:bg-gray-700 text-xs sm:text-sm"
                >
                    View
                </Button>

                <div className="flex gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-gray-900 text-yellow-500 transition-transform hover:scale-105"
                        onClick={() => onEdit(post)}
                    >
                        <Pencil size={16} />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-gray-900 text-red-500 transition-transform hover:scale-105"
                        onClick={() => onDelete(post.id)}
                    >
                        <Trash size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}