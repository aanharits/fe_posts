import api from "@/lib/api/axios";

const postService = {
    // Get all posts
    async getAllPosts(token) {
        const response = await api.get("/api/posts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    },

    // Create new post
    async createPost(data, token) {
        const response = await api.post("/api/posts", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data || response.data;
    },

    // Update post
    async updatePost(id, data, token) {
        const response = await api.patch(`/api/posts/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data || response.data;
    },

    // Delete post
    async deletePost(id, token) {
        await api.delete(`/api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default postService;