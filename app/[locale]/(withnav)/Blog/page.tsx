"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function BlogPage() {
    const [currentBlogSlide, setCurrentBlogSlide] = useState(1);
    const [currentReviewSlide, setCurrentReviewSlide] = useState(1);

    const blogs = [
        {
            id: 1,
            title: "Discover flavors & preserves of the best quality",
            image: "/Image/Burger1.jpg",
            author: "Robert Leo",
            category: "Restaurant",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type."
        },
        {
            id: 2,
            title: "Discover flavors & preserves of the best quality",
            image: "/Image/Burger2.jpg",
            author: "Anthony Leo",
            category: "Food",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type."
        },
        {
            id: 3,
            title: "Discover flavors & preserves of the best quality",
            image: "/Image/Burger3.jpg",
            author: "Jane Jenny",
            category: "Party",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type."
        }
    ];

    const nextBlogSlide = () => 
    {
        setCurrentBlogSlide((prev) => (prev === blogs.length ? 1 : prev + 1));
    };

    const prevBlogSlide = () => 
    {
        setCurrentBlogSlide((prev) => (prev === 1 ? blogs.length : prev - 1));
    };

    return (
        <main className="bg-white">
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">Our Blog</h1>
                    <p className="text-center text-xl text-gray-600 mb-16">More about the article</p>
                    <div className="relative flex items-center justify-center gap-4">
                        <button 
                            onClick={prevBlogSlide}
                            className="absolute left-0 z-10 bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 transition-colors">
                            <ChevronLeft size={24} className="text-black" />
                        </button>
                        <div className="flex gap-6 justify-center overflow-hidden max-w-6xl">
                            {blogs.map((blog, index) => 
                            (
                                <div
                                    key={blog.id}
                                    className={`transition-all duration-300 ${
                                        currentBlogSlide === blog.id
                                            ? "scale-100 opacity-100"
                                            : "scale-75 opacity-50"
                                    } flex-shrink-0 w-80`}>
                                    <div className="bg-gray-900 rounded-2xl overflow-hidden text-white">
                                        <div className="relative w-full h-56 bg-gray-800">
                                            <Image
                                                src={blog.image}
                                                alt={blog.title}
                                                fill
                                                className="object-cover"/>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden relative">
                                                    <Image
                                                        src={blog.image}
                                                        alt={blog.author}
                                                        fill
                                                        className="object-cover"/>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{blog.author}</p>
                                                    <p className="text-xs text-yellow-400">🔥 {blog.category}</p>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-4 line-clamp-2">{blog.title}</h3>
                                            <p className="text-sm text-gray-300 mb-6 line-clamp-3">{blog.description}</p>
                                            <button className="text-yellow-400 font-semibold text-sm hover:text-yellow-300 transition-colors">
                                                Read More →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={nextBlogSlide}
                            className="absolute right-0 z-10 bg-yellow-400 rounded-full p-2 hover:bg-yellow-500 transition-colors">
                            <ChevronRight size={24} className="text-black" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}