import { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SiteFooter } from "@/components/footer";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FileText, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "BundleBear Research",
    description: "Data-driven reporting on the latest trends in account abstraction.",
};

type Post = {
    title: string;
    date: string;
    description: string;
    href: string;
};

const blogPosts: Post[] = [
    {
        title: "ERC-4337 Bundle Frontrunning on Polygon",
        date: "September 23, 2024",
        description: "Analysis of MEV bot frontrunning activity on ERC-4337 bundles on Polygon.",
        href: "/research/polygon-mev",
    },
    {
        title: "How much does it cost to use a smart account?",
        date: "December 7, 2023",
        description: "An analysis of the cost of using smart accounts on L2s and sidechains.",
        href: "/research/gas-cost",
    },
];

const yearInReviewPosts: Post[] = [
    {
        title: "2024 Year in Review",
        date: "December 26, 2024",
        description: "Annual review of the patterns and trends that shaped the ERC-4337 ecosystem in 2024.",
        href: "/research/year-in-review/2024",
    },
    {
        title: "2024 Half-Year Report",
        date: "July 15, 2024",
        description: "Semiannual review with insights on 'valuable users' in the ERC-4337 ecosystem.",
        href: "/research/year-in-review/2024H1",
    },
    {
        title: "2023 Year in Review",
        date: "December 26, 2023",
        description: "The first annual review of ERC-4337 smart account adoption.",
        href: "/research/year-in-review/2023",
    },
];

function PostCard({ post }: { post: Post }) {
    return (
        <Link href={post.href}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{post.description}</p>
                </CardContent>
            </Card>
        </Link>
    );
}

export default function ResearchPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 space-y-8 p-8 font-[family-name:var(--font-inter-sans)]">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Research</h1>
                    <p className="text-muted-foreground text-lg">
                        Data-driven reporting on the latest trends in account abstraction and ERC-4337.
                    </p>
                </div>

                <Separator />

                {/* Year in Review Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="h-5 w-5" />
                        <h2 className="text-2xl font-bold tracking-tight">Year in Review</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {yearInReviewPosts.map((post) => (
                            <PostCard key={post.href} post={post} />
                        ))}
                    </div>
                </section>

                <Separator />

                {/* Blog Posts Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="h-5 w-5" />
                        <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.map((post) => (
                            <PostCard key={post.href} post={post} />
                        ))}
                    </div>
                </section>
            </div>
            <SiteFooter />
        </div>
    );
}
