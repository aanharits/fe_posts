import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import postService from "@/services/postService";
import { toast } from "sonner";

export function usePosts() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/auth/login");
            return;
        }
        fetchPosts();
    }, [router]);

    const fetchPosts = async () => {
        const token = localStorage.getItem("token");
        try {
            setLoading(true);
            const data = await postService.getAllPosts(token);
            setPosts(data.reverse());
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (data) => {
        const token = localStorage.getItem("token");
        try {
            const newPost = await postService.createPost(data, token);
            setPosts((prevPosts) => [newPost, ...prevPosts]);

            toast.success("Create Successful!", {
                position: "top-right",
                duration: 2000,
                style: {
                    fontSize: "13px",
                    color: "#1A1F36",
                    backgroundColor: "#D1D8BE",
                },
                className: "rounded-xl shadow-xl border-2 border-gray-800",
            });
            return true;
        } catch (error) {
            console.error("Failed to create post:", error.response?.data || error);
            toast.error("Failed to create post");
            fetchPosts(); // Fallback
            return false;
        }
    };

    const updatePost = async (id, data) => {
        const token = localStorage.getItem("token");
        try {
            await postService.updatePost(id, data, token);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === id ? { ...post, ...data } : post
                )
            );

            toast.success("Post Updated!", {
                position: "top-right",
                duration: 2000,
                style: {
                    fontSize: "13px",
                    color: "#1A1F36",
                    backgroundColor: "#D1D8BE",
                },
                className: "rounded-xl shadow-xl border-2 border-gray-800",
            });
            return true;
        } catch (error) {
            console.error("Failed to update post:", error.response?.data || error);
            toast.error("Failed to update post");
            fetchPosts(); // Fallback
            return false;
        }
    };

    const deletePost = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await postService.deletePost(id, token);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

            toast.success("Post Deleted!", {
                position: "top-right",
                duration: 2000,
                style: {
                    fontSize: "13px",
                    color: "#1A1F36",
                    backgroundColor: "#D1D8BE",
                },
                className: "rounded-xl shadow-xl border-2 border-gray-800",
            });
        } catch (error) {
            console.error("Failed to delete post:", error.response?.data || error);
            toast.error("Failed to delete post");
        }
    };

    return {
        posts,
        loading,
        createPost,
        updatePost,
        deletePost,
        fetchPosts,
    };
}