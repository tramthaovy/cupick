import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, User, Clock, Zap } from "lucide-react";

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "match",
    title: "Kết nối mới!",
    message: "Bạn đã kết nối với Nguyễn Văn A về Bò Wagyu A5",
    time: "5 phút trước",
    isRead: false,
    icon: Heart,
    avatar: "A",
  },
  {
    id: 2,
    type: "message",
    title: "Tin nhắn mới",
    message: "Trần Thị B: Bò này còn không anh?",
    time: "10 phút trước",
    isRead: false,
    icon: MessageCircle,
    avatar: "B",
  },
  {
    id: 3,
    type: "forum",
    title: "Bài viết được thích",
    message: "Lê Văn C đã thích bài viết 'Kỹ thuật chăn nuôi bò'",
    time: "1 giờ trước",
    isRead: true,
    icon: Heart,
    avatar: "C",
  },
  {
    id: 4,
    type: "system",
    title: "Chat hết hạn",
    message: "Cuộc trò chuyện với Phạm Minh D đã hết hạn do không phản hồi",
    time: "2 giờ trước",
    isRead: true,
    icon: Clock,
    avatar: "D",
  },
  {
    id: 5,
    type: "match",
    title: "Kết nối mới!",
    message: "Bạn đã kết nối với Hoàng Thị E về Lợn Yorkshire",
    time: "3 giờ trước",
    isRead: true,
    icon: Heart,
    avatar: "E",
  },
];

export default function NotificationModal({
  open,
  onOpenChange,
}: NotificationModalProps) {
  const [notificationList, setNotificationList] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const unreadCount = notificationList.filter((n) => !n.isRead).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "match":
        return "bg-pink-100 text-pink-700";
      case "message":
        return "bg-blue-100 text-blue-700";
      case "forum":
        return "bg-green-100 text-green-700";
      case "system":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Thông báo</DialogTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Đánh dấu tất cả đã đọc
              </Button>
            )}
          </div>
          <DialogDescription>
            {unreadCount > 0
              ? `${unreadCount} thông báo chưa đọc`
              : "Tất cả thông báo đã đọc"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3">
          {notificationList.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Không có thông báo</h3>
              <p className="text-muted-foreground text-sm">
                Các thông báo mới sẽ xuất hiện ở đây
              </p>
            </div>
          ) : (
            notificationList.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                    !notification.isRead
                      ? "bg-primary/5 border-primary/20"
                      : "bg-background"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{notification.avatar}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}
                      >
                        <Icon className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
