"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "@/components/dashboard/PostCard";
import { PostForm } from "@/components/dashboard/PostForm";
import { PostViewModal } from "@/components/dashboard/PostViewModal";

export default function DashboardPage() {
    const router = useRouter();
    const { posts, loading, createPost, updatePost, deletePost } = usePosts();

    // UI State
    const [showForm, setShowForm] = useState(false);
    const [viewPost, setViewPost] = useState(null);
    const [editPost, setEditPost] = useState(null);

    // Handlers
    const handleCreateClick = () => {
        setEditPost(null);
        setShowForm(true);
    };

    const handleEditClick = (post) => {
        setEditPost(post);
        setShowForm(true);
    };

    const handleFormSubmit = async (data) => {
        let success;
        if (editPost) {
            success = await updatePost(editPost.id, data);
        } else {
            success = await createPost(data);
        }

        if (success) {
            setShowForm(false);
            setEditPost(null);
        }
        return success;
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/auth/login");
    };

    return (
        <div className="relative min-h-screen p-4 sm:p-6 z-10 bg-gray-800">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-accent-foreground">
                    PaperLane
                </h1>
                <div className="flex gap-2 sm:gap-3">
                    <Button
                        onClick={handleCreateClick}
                        className="bg-accent-foreground hover:bg-accent-foreground-60 shadow-md font-semibold text-gray-700 transition-transform hover:scale-105 px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm"
                    >
                        + Create
                    </Button>

                    <Button
                        onClick={handleLogout}
                        className="bg-red-500 text-white hover:bg-red-600 font-semibold transition-transform hover:scale-105 px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm"
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <p className="text-white text-lg">Loading posts...</p>
                </div>
            ) : (
                /* Posts Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onView={setViewPost}
                            onEdit={handleEditClick}
                            onDelete={deletePost}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <PostForm
                open={showForm}
                onOpenChange={setShowForm}
                onSubmit={handleFormSubmit}
                initialData={editPost}
            />

            <PostViewModal
                post={viewPost}
                open={!!viewPost}
                onOpenChange={(open) => !open && setViewPost(null)}
            />
        </div>
    );
}