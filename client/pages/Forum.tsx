import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Clock,
  Eye,
  Bell,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import NotificationModal from "@/components/NotificationModal";
import { useNavigate } from "react-router-dom";

// Sample topics data
const topics = [
  {
    id: 1,
    name: "Chia sẻ kỹ thuật",
    description: "Thảo luận về kỹ thuật chăn nuôi",
    icon: "📚",
    postCount: 45,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "Giao dịch thành công",
    description: "Chia s�� những giao dịch thành công",
    icon: "🤝",
    postCount: 23,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    name: "Hỏi đáp",
    description: "Giải đáp thắc mắc v�� chăn nuôi",
    icon: "❓",
    postCount: 67,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 4,
    name: "Thị trường",
    description: "Thông tin giá cả và thị trường",
    icon: "📈",
    postCount: 34,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    name: "Bệnh tật",
    description: "Phòng chống và điều trị bệnh",
    icon: "🏥",
    postCount: 28,
    color: "bg-red-100 text-red-700",
  },
];

// Sample posts data
const posts = [
  {
    id: 1,
    title: "Cách chăm sóc bò Wagyu trong mùa mưa",
    content:
      "Mình muốn chia sẻ kinh nghiệm chăm sóc bò Wagyu trong mùa mưa. Điều quan trọng nhất là giữ chuồng trại khô ráo và thông thoáng...",
    author: {
      name: "Nguyễn Văn A",
      avatar: "A",
    },
    topic: "Chia sẻ kỹ thuật",
    likes: 24,
    comments: 8,
    views: 156,
    timeAgo: "2 giờ trước",
    isLiked: false,
  },
  {
    id: 2,
    title: "Bán thành công 5 con lợn Duroc với giá tốt",
    content:
      "Vừa bán được 5 con lợn Duroc 6 tháng tuổi với giá 7.5 triệu/con. Chia sẻ kinh nghiệm nuôi để bán được giá cao...",
    author: {
      name: "Tr���n Thị B",
      avatar: "B",
    },
    topic: "Giao dịch thành công",
    likes: 45,
    comments: 12,
    views: 298,
    timeAgo: "4 giờ trước",
    isLiked: true,
  },
  {
    id: 3,
    title: "Gà mái có triệu chứng ăn ít, có ai gặp chưa?",
    content:
      "Gà mái của mình ăn ít hơn bình thường, không sốt nhưng có vẻ uể oải. Có ai gặp trường hợp này chưa? Cần làm gì?",
    author: {
      name: "Lê Văn C",
      avatar: "C",
    },
    topic: "Hỏi đáp",
    likes: 8,
    comments: 15,
    views: 89,
    timeAgo: "6 giờ trước",
    isLiked: false,
  },
];

export default function Forum() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("all"); // "all" or topic id
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    topic: "",
  });
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredPosts = posts.filter((post) => {
    // Filter by selected topic
    let matchesTopic = true;
    if (selectedView !== "all") {
      const topic = topics.find((t) => t.id.toString() === selectedView);
      matchesTopic = topic && post.topic === topic.name;
    }

    // Filter by search query
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      matchesSearch =
        post.title.toLowerCase().includes(searchLower) ||
        post.topic.toLowerCase().includes(searchLower) ||
        post.author.name.toLowerCase().includes(searchLower);
    }

    return matchesTopic && matchesSearch;
  });

  const handleCreatePost = () => {
    console.log("Creating post:", newPost);
    setShowCreatePost(false);
    setNewPost({ title: "", content: "", topic: "" });
  };

  const handleLikePost = (postId: number) => {
    // Toggle like status and update count
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex !== -1) {
      posts[postIndex].isLiked = !posts[postIndex].isLiked;
      posts[postIndex].likes += posts[postIndex].isLiked ? 1 : -1;
      console.log("Post like toggled:", posts[postIndex]);
    }
  };

  const handleViewPost = (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowPostDetail(true);
    }
  };

  const handleSharePost = (postId: number) => {
    alert("Chức năng chia sẻ sẽ được thêm sau");
    console.log("Sharing post:", postId);
  };

  return (
    <MobileLayout>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Header */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-primary">Forum</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/notifications")}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm chủ đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Topics Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Chủ đề nổi bật</h2>
            <div className="overflow-x-auto">
              <div
                className="flex space-x-3 pb-2"
                style={{ minWidth: "max-content" }}
              >
                <Card
                  className={`cursor-pointer transition-all flex-shrink-0 w-48 ${
                    selectedView === "all"
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedView("all")}
                >
                  <CardContent className="p-3">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-white font-bold text-sm">
                          All
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">
                          Tất cả bài viết
                        </h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {posts.length}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {topics.map((topic) => (
                  <Card
                    key={topic.id}
                    className={`cursor-pointer transition-all flex-shrink-0 w-48 ${
                      selectedView === topic.id.toString()
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedView(topic.id.toString())}
                  >
                    <CardContent className="p-3">
                      <div className="text-center space-y-2">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${topic.color}`}
                        >
                          <span className="text-xl">{topic.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">
                            {topic.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                            {topic.description}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {topic.postCount}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {selectedView === "all"
                  ? "Bài viết mới nhất"
                  : `Chủ đề: ${
                      topics.find((t) => t.id.toString() === selectedView)?.name
                    }`}
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Hot
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-3 w-3 mr-1" />
                  Mới
                </Button>
              </div>
            </div>

            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleViewPost(post.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{post.author.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            {post.author.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {post.topic}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {post.timeAgo}
                          </span>
                        </div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-8 ${
                            post.isLiked ? "text-red-500" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikePost(post.id);
                          }}
                        >
                          <Heart
                            className={`h-3 w-3 mr-1 ${
                              post.isLiked ? "fill-current" : ""
                            }`}
                          />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Create Post Dialog */}
        <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo bài viết mới</DialogTitle>
              <DialogDescription>
                Chia sẻ kinh nghiệm và kiến thức với cộng đồng
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic">Chủ đề</Label>
                <Select
                  value={newPost.topic}
                  onValueChange={(value) =>
                    setNewPost({ ...newPost, topic: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chủ đề" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.name}>
                        {topic.icon} {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div>
                <Label htmlFor="content">Nội dung</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  placeholder="Chia sẻ kinh nghiệm của bạn..."
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowCreatePost(false)}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                onClick={handleCreatePost}
                disabled={!newPost.title || !newPost.content || !newPost.topic}
                className="flex-1"
              >
                Đăng bài
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Post Detail Modal */}
        <Dialog open={showPostDetail} onOpenChange={setShowPostDetail}>
          <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi tiết bài viết</DialogTitle>
            </DialogHeader>
            {selectedPost && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {selectedPost.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {selectedPost.author.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {selectedPost.topic}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {selectedPost.timeAgo}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {selectedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {selectedPost.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 ${selectedPost.isLiked ? "text-red-500" : ""}`}
                      onClick={() => handleLikePost(selectedPost.id)}
                    >
                      <Heart
                        className={`h-3 w-3 mr-1 ${
                          selectedPost.isLiked ? "fill-current" : ""
                        }`}
                      />
                      {selectedPost.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {selectedPost.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Eye className="h-3 w-3 mr-1" />
                      {selectedPost.views}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8"
                    onClick={() => handleSharePost(selectedPost.id)}
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Bình luận</h4>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">B</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Trần Thị B</span>
                        <span className="text-xs text-muted-foreground">
                          1 giờ trước
                        </span>
                      </div>
                      <p className="text-sm">
                        Bài viết rất hữu ích! Cảm ơn bạn đã chia sẻ.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Input placeholder="Thêm bình luận..." className="flex-1" />
                    <Button size="sm">Gửi</Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Floating Action Button */}
        <Button
          onClick={() => setShowCreatePost(true)}
          className="fixed bottom-24 right-4 shadow-lg z-50 h-12 px-4 rounded-full"
        >
          <Plus className="h-5 w-5 mr-2" />
          Tạo bài viết
        </Button>
      </div>
    </MobileLayout>
  );
}
