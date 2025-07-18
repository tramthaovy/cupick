import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  User,
  Calendar,
  Bell,
  Trash2,
  Settings,
  Check,
  AlertCircle,
  Info,
  Star,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample notification data
const notifications = [
  {
    id: 1,
    type: "match",
    title: "Bạn có match mới!",
    message: "Nguyễn Văn A đã thích con bò Wagyu của bạn",
    time: "5 phút trước",
    isRead: false,
    avatar: "A",
    animalName: "Bò Wagyu A5",
    actionUser: "Nguyễn Văn A",
  },
  {
    id: 2,
    type: "message",
    title: "Tin nhắn mới",
    message: "Lê Thị B: 'Con lợn này còn không anh?'",
    time: "15 phút trước",
    isRead: false,
    avatar: "B",
    animalName: "Lợn Yorkshire",
    actionUser: "Lê Thị B",
  },
  {
    id: 3,
    type: "request",
    title: "Yêu cầu kết nối",
    message: "Trần Văn C muốn kết nối để trao đổi về con gà Brahma",
    time: "1 giờ trước",
    isRead: true,
    avatar: "C",
    animalName: "Gà Brahma",
    actionUser: "Trần Văn C",
  },
  {
    id: 4,
    type: "system",
    title: "Cập nhật ứng dụng",
    message: "Phiên bản mới với nhiều tính năng thú vị đã sẵn sàng",
    time: "2 giờ trước",
    isRead: true,
    avatar: "",
    animalName: "",
    actionUser: "",
  },
  {
    id: 5,
    type: "promotion",
    title: "Khuyến mãi đặc biệt",
    message: "Giảm 20% phí giao dịch cho lần mua đầu tiên",
    time: "3 giờ trước",
    isRead: true,
    avatar: "",
    animalName: "",
    actionUser: "",
  },
  {
    id: 6,
    type: "like",
    title: "Bài viết được thích",
    message: "Bài viết 'Kỹ thuật nuôi bò thịt' của bạn đã được 15 lượt thích",
    time: "4 giờ trước",
    isRead: true,
    avatar: "",
    animalName: "",
    actionUser: "",
  },
  {
    id: 7,
    type: "comment",
    title: "Bình luận mới",
    message: "Phạm Văn D đã bình luận vào bài viết của bạn",
    time: "6 giờ trước",
    isRead: true,
    avatar: "D",
    animalName: "",
    actionUser: "Phạm Văn D",
  },
  {
    id: 8,
    type: "reminder",
    title: "Nhắc nhở",
    message: "Đã đến lúc tiêm phòng cho đàn gà của bạn",
    time: "8 giờ trước",
    isRead: true,
    avatar: "",
    animalName: "Gà Đông Tảo",
    actionUser: "",
  },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMarkAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotificationList((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const handleNotificationAction = (notification: any) => {
    // Mark as read first
    handleMarkAsRead(notification.id);

    // Navigate based on notification type
    switch (notification.type) {
      case "match":
      case "message":
        navigate("/messages");
        break;
      case "request":
        navigate("/messages");
        break;
      case "like":
      case "comment":
        navigate("/forum");
        break;
      default:
        break;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case "request":
        return <User className="h-5 w-5 text-green-500" />;
      case "system":
        return <Info className="h-5 w-5 text-gray-500" />;
      case "promotion":
        return <Star className="h-5 w-5 text-yellow-500" />;
      case "like":
        return <Heart className="h-5 w-5 text-pink-500" />;
      case "comment":
        return <MessageCircle className="h-5 w-5 text-purple-500" />;
      case "reminder":
        return <Bell className="h-5 w-5 text-orange-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredNotifications = notificationList.filter((notification) =>
    filter === "unread" ? !notification.isRead : true,
  );

  const unreadCount = notificationList.filter((n) => !n.isRead).length;

  return (
    <MobileLayout>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Header */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleGoBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">Thông báo</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleMarkAllAsRead}>
                  <Check className="h-4 w-4 mr-2" />
                  Đánh dấu tất cả đã đọc
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} thông báo chưa đọc`
              : "Tất cả đã đọc"}
          </p>

          {/* Filter Tabs */}
          <div className="flex space-x-1 mt-3 bg-muted rounded-lg p-1">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="flex-1 h-8"
            >
              Tất cả ({notificationList.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("unread")}
              className="flex-1 h-8"
            >
              Chưa đọc ({unreadCount})
            </Button>
          </div>
        </div>

        <div className="p-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {filter === "unread"
                  ? "Không có thông báo chưa đọc"
                  : "Chưa có thông báo nào"}
              </h3>
              <p className="text-muted-foreground">
                {filter === "unread"
                  ? "Tất cả thông báo đã được đọc"
                  : "Thông báo sẽ xuất hiện ở đây khi có hoạt động mới"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                    !notification.isRead ? "border-primary/20 bg-primary/5" : ""
                  }`}
                  onClick={() => handleNotificationAction(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {notification.avatar}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                        {!notification.isRead && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3
                            className={`font-semibold text-sm ${
                              !notification.isRead ? "text-primary" : ""
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {notification.time}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNotification(notification.id);
                              }}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2">
                          {notification.animalName && (
                            <Badge variant="secondary" className="text-xs">
                              {notification.animalName}
                            </Badge>
                          )}
                          {notification.actionUser && (
                            <Badge variant="outline" className="text-xs">
                              {notification.actionUser}
                            </Badge>
                          )}
                          {!notification.isRead && (
                            <Badge variant="destructive" className="text-xs">
                              Mới
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
