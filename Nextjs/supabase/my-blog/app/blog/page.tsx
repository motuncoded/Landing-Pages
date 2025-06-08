

"use client";


import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setPosts(data || []);
    };

    fetchPosts();
  }, []);

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>
      {posts.map((post) => (
        <article key={post.id} className="mb-8">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500">
            By {post.author} · {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className="mt-2">{post.content}</p>
        </article>
      ))}
    </main>
  );
}
