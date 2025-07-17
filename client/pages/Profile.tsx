import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  Camera,
  Heart,
  MessageCircle,
  FileText,
  History,
  Key,
  LogOut,
  Eye,
  Trash2,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

// Sample user data
const userData = {
  name: "Nguyễn Văn A",
  phone: "0123456789",
  email: "nguyenvana@email.com",
  gender: "male",
  role: "buyer", // buyer or seller
  avatar: "A",
  joinDate: "Tháng 3, 2024",
  location: "TP. Hồ Chí Minh",
};

// Sample user posts
const userPosts = [
  {
    id: 1,
    title: "Kinh nghiệm chọn bò giống chất lượng",
    content: "Sau 5 năm nuôi bò, tôi muốn chia sẻ cách chọn bò giống...",
    topic: "Chia sẻ kỹ thuật",
    likes: 24,
    comments: 8,
    timeAgo: "2 ngày trước",
  },
  {
    id: 2,
    title: "Hỏi về giá thức ăn cho gà",
    content: "Mọi người cho em hỏi giá thức ăn cho gà hiện tại...",
    topic: "Hỏi đáp",
    likes: 12,
    comments: 15,
    timeAgo: "1 tuần trước",
  },
];

// Sample liked posts
const likedPosts = [
  {
    id: 3,
    title: "Cách phòng bệnh cho lợn trong mùa mưa",
    author: "Trần Thị B",
    topic: "Chia sẻ kỹ thuật",
    likes: 45,
    timeAgo: "3 ngày trước",
  },
  {
    id: 4,
    title: "Thành công với mô hình nuôi gà thả vườn",
    author: "Lê Văn C",
    topic: "Giao dịch thành công",
    likes: 67,
    timeAgo: "1 tuần trước",
  },
];

// Sample activity history
const activityHistory = [
  {
    id: 1,
    type: "swipe",
    description: "Quan tâm đến Bò Wagyu A5 từ Trại Thành Đạt",
    timestamp: "2 giờ trước",
    icon: Heart,
  },
  {
    id: 2,
    type: "message",
    description: "Nhắn tin với Nguyễn Thị B về Lợn Duroc",
    timestamp: "5 giờ trước",
    icon: MessageCircle,
  },
  {
    id: 3,
    type: "post",
    description: "Đăng bài 'Kinh nghiệm chọn bò giống chất lượng'",
    timestamp: "2 ngày trước",
    icon: FileText,
  },
  {
    id: 4,
    type: "like",
    description: "Thích bài viết 'Cách phòng bệnh cho lợn'",
    timestamp: "3 ngày trước",
    icon: Heart,
  },
];

export default function Profile() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [editData, setEditData] = useState({
    name: userData.name,
    phone: userData.phone,
    email: userData.email,
    gender: userData.gender,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    console.log("Saving profile:", editData);
    setShowEditDialog(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
    console.log("Changing password");
    setShowChangePasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleLogout = () => {
    console.log("Logging out");
    setShowLogoutDialog(false);
    // In real app, would clear auth and redirect to login
    window.location.href = "/login";
  };

  const handleDeletePost = (postId: number) => {
    if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
      console.log("Deleting post:", postId);
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Header */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Hồ sơ cá nhân</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-2xl bg-primary/10">
                      {userData.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <Badge
                    variant={
                      userData.role === "buyer" ? "default" : "secondary"
                    }
                  >
                    {userData.role === "buyer" ? "Người nhận" : "Người cho"}
                  </Badge>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Tham gia {userData.joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{userData.location}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setShowEditDialog(true)}
                  className="w-full"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa thông tin
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userData.email || "Chưa cập nhật"}</span>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Bài viết</TabsTrigger>
              <TabsTrigger value="liked">Đã thích</TabsTrigger>
              <TabsTrigger value="activity">Hoạt động</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Bài viết của tôi</h3>
                <Badge variant="secondary">{userPosts.length}</Badge>
              </div>
              {userPosts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Bạn chưa đăng bài viết nào
                  </p>
                </div>
              ) : (
                userPosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{post.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {post.content}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            <Badge variant="outline">{post.topic}</Badge>
                            <span className="text-muted-foreground">
                              {post.timeAgo}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="liked" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Bài viết đã thích</h3>
                <Badge variant="secondary">{likedPosts.length}</Badge>
              </div>
              {likedPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{post.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>bởi {post.author}</span>
                        <Badge variant="outline">{post.topic}</Badge>
                        <span>{post.timeAgo}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-1 text-sm text-red-500">
                          <Heart className="h-3 w-3 fill-current" />
                          <span>{post.likes}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Xem
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Lịch sử hoạt động</h3>
                <Badge variant="secondary">{activityHistory.length}</Badge>
              </div>
              {activityHistory.map((activity) => {
                const Icon = activity.icon;
                return (
                  <Card key={activity.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.description}</p>
                          <span className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          </Tabs>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cài đặt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowChangePasswordDialog(true)}
              >
                <Key className="h-4 w-4 mr-2" />
                Đổi mật khẩu
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={() => setShowLogoutDialog(true)}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Đăng xuất
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin cá nhân của bạn
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Họ và tên</Label>
                <Input
                  id="editName"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="editPhone">Số điện thoại</Label>
                <Input
                  id="editPhone"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Giới tính</Label>
                <RadioGroup
                  value={editData.gender}
                  onValueChange={(value) =>
                    setEditData({ ...editData, gender: value })
                  }
                  className="flex space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="editMale" />
                    <Label htmlFor="editMale">Nam</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="editFemale" />
                    <Label htmlFor="editFemale">Nữ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="editOther" />
                    <Label htmlFor="editOther">Khác</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleSaveProfile}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog
          open={showChangePasswordDialog}
          onOpenChange={setShowChangePasswordDialog}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Đổi mật khẩu</DialogTitle>
              <DialogDescription>
                Nhập mật khẩu hi���n tại và mật khẩu mới
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowChangePasswordDialog(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleChangePassword}>Đổi mật khẩu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Logout Confirmation Dialog */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận đăng xuất</DialogTitle>
              <DialogDescription>
                Bạn có chắc muốn đăng xuất khỏi tài khoản?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
              >
                Hủy
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
}
