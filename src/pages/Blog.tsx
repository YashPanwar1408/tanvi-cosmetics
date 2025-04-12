
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Summer Makeup Trends for 2025",
    excerpt: "Discover the hottest makeup trends that will dominate the beauty scene this summer season.",
    image: "/placeholder.svg",
    date: "April 5, 2025",
    author: "Priya Sharma",
    category: "Makeup Trends",
    tags: ["summer", "trends", "makeup"]
  },
  {
    id: 2,
    title: "The Ultimate Skincare Routine for Dry Skin",
    excerpt: "Learn how to create an effective skincare routine that will keep dry skin hydrated and glowing.",
    image: "/placeholder.svg",
    date: "March 28, 2025",
    author: "Rahul Khanna",
    category: "Skincare",
    tags: ["dry skin", "routine", "hydration"]
  },
  {
    id: 3,
    title: "How to Choose the Perfect Foundation Shade",
    excerpt: "A comprehensive guide to finding your perfect foundation match, regardless of skin tone or type.",
    image: "/placeholder.svg",
    date: "March 15, 2025",
    author: "Ananya Patel",
    category: "Makeup Tips",
    tags: ["foundation", "shade matching", "makeup basics"]
  },
  {
    id: 4,
    title: "Clean Beauty: What It Really Means",
    excerpt: "Demystifying the clean beauty movement and helping you make informed choices about your products.",
    image: "/placeholder.svg",
    date: "March 2, 2025",
    author: "Vikram Singh",
    category: "Beauty Education",
    tags: ["clean beauty", "ingredients", "sustainability"]
  },
  {
    id: 5,
    title: "Celebrity Beauty Secrets Revealed",
    excerpt: "Famous makeup artists share the techniques and products they use on their celebrity clients.",
    image: "/placeholder.svg",
    date: "February 20, 2025",
    author: "Meera Kapoor",
    category: "Celebrity Beauty",
    tags: ["celebrities", "tips", "professional advice"]
  },
  {
    id: 6,
    title: "The Best Budget-Friendly Makeup Products",
    excerpt: "You don't need to break the bank for quality makeup. Here are our top affordable picks.",
    image: "/placeholder.svg",
    date: "February 10, 2025",
    author: "Deepak Verma",
    category: "Product Reviews",
    tags: ["budget", "affordable", "drugstore"]
  }
];

export default function BlogPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl mb-4">Beauty Blog</h1>
            <p className="text-xl text-gray-600">
              Discover the latest trends, tips, and insights from the world of beauty.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <Card key={post.id} className="flex flex-col h-full overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="text-sm">By {post.author}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="#">Read Article</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button>Load More Articles</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
