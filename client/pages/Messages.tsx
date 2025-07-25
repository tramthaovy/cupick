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
} from "@/components/ui/dialog";
import {
  Send,
  Image,
  MoreVertical,
  ArrowLeft,
  Clock,
  Check,
  CheckCheck,
  AlertTriangle,
  Bell,
  Bot,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileLayout from "@/components/MobileLayout";
import { useNavigate } from "react-router-dom";

// Sample matched data
const matchedUsers = [
  {
    id: 1,
    name: "Lê Thị D",
    avatar: "D",
    animal: "Bò Wagyu A5",
    matchTime: "2 giờ trước",
    isNew: true,
  },
  {
    id: 2,
    name: "Nguyễn Văn E",
    avatar: "E",
    animal: "Lợn Yorkshire",
    matchTime: "1 ngày trước",
    isNew: false,
  },
  {
    id: 3,
    name: "Trần Minh F",
    avatar: "F",
    animal: "Gà Brahma",
    matchTime: "3 ngày trước",
    isNew: false,
  },
];

// Sample chat data
const conversations = [
  {
    id: "ai-assistant",
    participant: {
      name: "AI Assistant",
      avatar: "AI",
      role: "Tư vấn viên", // AI assistant
    },
    animal: "",
    lastMessage: "Tôi có thể giúp bạn tư vấn về chăn nuôi",
    timestamp: "Luôn sẵn sàng",
    unreadCount: 0,
    status: "ai-assistant",
    isOnline: true,
    isAI: true,
  },
  {
    id: 1,
    participant: {
      name: "Trần Văn A",
      avatar: "A",
      role: "Người cho", // seller
    },
    animal: "Bò Wagyu A5",
    lastMessage: "Bò này còn không anh?",
    timestamp: "10:30",
    unreadCount: 2,
    status: "accepted", // accepted, pending, expired
    isOnline: true,
  },
  {
    id: 2,
    participant: {
      name: "Nguyễn Thị B",
      avatar: "B",
      role: "Người nhận", // buyer
    },
    animal: "Lợn Duroc",
    lastMessage: "Em quan tâm đến con lợn này",
    timestamp: "9:15",
    unreadCount: 0,
    status: "pending",
    isOnline: false,
  },
  {
    id: 3,
    participant: {
      name: "Lê Minh C",
      avatar: "C",
      role: "Người cho",
    },
    animal: "Gà Brahma",
    lastMessage: "Cảm ơn anh đã quan tâm",
    timestamp: "Hôm qua",
    unreadCount: 0,
    status: "expired",
    isOnline: false,
  },
];

// Sample chat messages
const chatMessages = [
  {
    id: 1,
    senderId: 2,
    senderName: "Nguyễn Thị B",
    content: "Chào anh, em quan tâm đến con lợn Duroc",
    timestamp: "9:10",
    type: "text",
    status: "read",
  },
  {
    id: 2,
    senderId: 1,
    senderName: "Tôi",
    content: "Chào em! Con lợn này 8 tháng tuổi, khỏe mạnh lắm",
    timestamp: "9:12",
    type: "text",
    status: "read",
  },
  {
    id: 3,
    senderId: 2,
    senderName: "Nguyễn Thị B",
    content: "Em có thể xem thêm ảnh không ạ?",
    timestamp: "9:15",
    type: "text",
    status: "read",
  },
  {
    id: 4,
    senderId: 1,
    senderName: "Tôi",
    content: "Được chứ, anh gửi ngay",
    timestamp: "9:16",
    type: "text",
    status: "delivered",
  },
];

export default function Messages() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showEndChatDialog, setShowEndChatDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"conversations" | "matches">(
    "conversations",
  );
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      content:
        "Xin chào! Tôi là AI Assistant của Cupick. Tôi có thể giúp bạn tư vấn về chăn nuôi, giá cả thị trường và kết nối với người bán phù hợp. Bạn cần hỗ trợ gì?",
      isBot: true,
      timestamp: "Bây giờ",
    },
  ]);
  const [aiInput, setAiInput] = useState("");

  const handleSelectChat = (conversation: any) => {
    if (conversation.isAI) {
      setShowAIChat(true);
    } else {
      setSelectedChat(conversation);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message to chat (simulate)
      const newMsg = {
        id: chatMessages.length + 1,
        senderId: 1,
        senderName: "Tôi",
        content: newMessage,
        timestamp: "Bây giờ",
        type: "text",
        status: "delivered",
      };
      chatMessages.push(newMsg);
      console.log("Message sent:", newMessage);
      setNewMessage("");
    }
  };

  const handleSendImage = () => {
    // Simulate image upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        // Simulate sending image
        const newMsg = {
          id: chatMessages.length + 1,
          senderId: 1,
          senderName: "Tôi",
          content: `[Hình ảnh: ${file.name}]`,
          timestamp: "Bây giờ",
          type: "image",
          status: "delivered",
        };
        chatMessages.push(newMsg);
        console.log("Image sent:", file.name);
      }
    };
    input.click();
  };

  const handleSendAIMessage = () => {
    if (aiInput.trim()) {
      // Add user message
      const userMessage = {
        id: aiMessages.length + 1,
        content: aiInput,
        isBot: false,
        timestamp: "Bây giờ",
      };

      setAiMessages((prev) => [...prev, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "Tôi hiểu bạn quan tâm về vấn đề này. Dựa trên kinh nghiệm, tôi khuyên bạn nên...",
          "Về giá cả hiện tại, thị trường đang có xu hư���ng tăng nhẹ. Bạn có thể tham khảo...",
          "Để chọn con giống tốt, bạn cần chú ý đến sức khỏe, nguồn gốc và độ tuổi...",
          "Tôi có thể giúp bạn kết nối với những người bán uy tín trong khu vực của bạn.",
        ];

        const aiResponse = {
          id: aiMessages.length + 2,
          content: responses[Math.floor(Math.random() * responses.length)],
          isBot: true,
          timestamp: "Bây giờ",
        };

        setAiMessages((prev) => [...prev, aiResponse]);
      }, 1000);

      setAiInput("");
    }
  };

  const handleStartConversation = (match: any) => {
    console.log("Starting conversation with:", match.name);
    // In real app, this would create a new conversation
  };

  const handleAcceptConnection = (conversationId: number) => {
    console.log("Accepting connection:", conversationId);
  };

  const handleRejectConnection = (conversationId: number) => {
    console.log("Rejecting connection:", conversationId);
  };

  const handleBlockUser = () => {
    console.log("Blocking user");
    setShowBlockDialog(false);
    setSelectedChat(null);
  };

  const handleEndChat = () => {
    console.log("Ending chat");
    setShowEndChatDialog(false);
    setSelectedChat(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return "Đã kết nối";
      case "pending":
        return "Chờ phản hồi";
      case "expired":
        return "Đã hết hạn";
      default:
        return "Không xác định";
    }
  };

  // AI Assistant Chat View
  if (showAIChat) {
    return (
      <MobileLayout>
        <div className="h-[calc(100vh-80px)] flex flex-col bg-background">
          {/* AI Chat Header */}
          <div className="bg-white border-b border-border p-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIChat(false)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">AI Assistant</h2>
                <p className="text-xs text-muted-foreground">
                  Tư vấn chăn nuôi & kết nối
                </p>
              </div>
            </div>
          </div>

          {/* AI Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {aiMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.isBot
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-end mt-1">
                    <span className="text-xs opacity-70">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Messages */}
          {aiMessages.length === 1 && (
            <div className="border-t border-border p-4 bg-muted/30">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Gợi ý câu hỏi:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Giá lợn giống hiện tại?",
                    "Cách chọn bò giống tốt?",
                    "Kỹ thuật nuôi gà thả vườn?",
                    "Tìm người bán uy tín gần đây?",
                    "Phòng bệnh cho gia súc?",
                    "Thức ăn chăn nuôi chất lượng?",
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs hover:bg-primary hover:text-white"
                      onClick={() => {
                        setAiInput(suggestion);
                        handleSendAIMessage();
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Message Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Hỏi AI về chăn nuôi..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendAIMessage();
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSendAIMessage} disabled={!aiInput.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  if (selectedChat) {
    return (
      <MobileLayout>
        <div className="h-[calc(100vh-80px)] flex flex-col bg-background">
          {/* Chat Header */}
          <div className="bg-white border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedChat(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {selectedChat.participant.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">
                    {selectedChat.participant.name}
                  </h2>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-muted-foreground">
                      {selectedChat.animal}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedChat.isOnline ? "bg-green-400" : "bg-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEndChatDialog(true)}>
                    Kết thúc chat
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowBlockDialog(true)}>
                    Chặn người dùng
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Connection Status */}
            {selectedChat.status === "pending" && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">
                      Chờ bạn phản hồi kết nối
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRejectConnection(selectedChat.id)}
                    >
                      Từ chối
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAcceptConnection(selectedChat.id)}
                    >
                      Chấp nhận
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {selectedChat.status === "expired" && (
              <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-800">
                    Cuộc trò chuyện đã hết hạn do không phản hồi trong 36 giờ
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderName === "Tôi" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.senderName === "Tôi"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-xs opacity-70">
                      {message.timestamp}
                    </span>
                    {message.senderName === "Tôi" && (
                      <div className="ml-1">
                        {message.status === "delivered" ? (
                          <Check className="h-3 w-3 opacity-70" />
                        ) : (
                          <CheckCheck className="h-3 w-3 opacity-70" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          {selectedChat.status === "accepted" && (
            <div className="border-t border-border p-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleSendImage}>
                  <Image className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Block User Dialog */}
        <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chặn người dùng</DialogTitle>
              <DialogDescription>
                Bạn có chắc muốn chặn {selectedChat.participant.name}? Hai bên
                sẽ không thể liên lạc và nhìn th���y nhau nữa.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowBlockDialog(false)}
              >
                Hủy
              </Button>
              <Button variant="destructive" onClick={handleBlockUser}>
                Chặn
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* End Chat Dialog */}
        <Dialog open={showEndChatDialog} onOpenChange={setShowEndChatDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Kết thúc cuộc trò chuyện</DialogTitle>
              <DialogDescription>
                Bạn có chắc muốn kết thúc cuộc trò chuyện với{" "}
                {selectedChat.participant.name}? Hành động này không thể hoàn
                tác.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEndChatDialog(false)}
              >
                Hủy
              </Button>
              <Button variant="destructive" onClick={handleEndChat}>
                Kết th��c
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Header */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-primary">Tin nhắn</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/notifications")}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Kết nối và tư vấn chăn nuôi
          </p>

          {/* Tabs */}
          <div className="flex space-x-1 mt-3 bg-muted rounded-lg p-1">
            <Button
              variant={activeTab === "conversations" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("conversations")}
              className="flex-1 h-8"
            >
              Trò chuyện
            </Button>
            <Button
              variant={activeTab === "matches" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("matches")}
              className="flex-1 h-8"
            >
              <Heart className="h-3 w-3 mr-1" />
              Đã Match
            </Button>
          </div>
        </div>

        <div className="p-4">
          {/* Conversations Tab */}
          {activeTab === "conversations" && (
            <>
              {conversations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Chưa có tin nhắn nào
                  </h3>
                  <p className="text-muted-foreground">
                    Khi có người quan tâm đến con giống của bạn, tin nhắn sẽ
                    xuất hiện ở đây
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conversation) => (
                    <Card
                      key={conversation.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSelectChat(conversation)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            {conversation.isAI ? (
                              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <Bot className="h-6 w-6 text-white" />
                              </div>
                            ) : (
                              <Avatar className="w-12 h-12">
                                <AvatarFallback>
                                  {conversation.participant.avatar}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            {conversation.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold truncate">
                                {conversation.participant.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                  {conversation.timestamp}
                                </span>
                                {conversation.unreadCount > 0 && (
                                  <Badge
                                    variant="destructive"
                                    className="w-5 h-5 rounded-full text-xs flex items-center justify-center p-0"
                                  >
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage}
                              </p>
                              {!conversation.isAI && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getStatusColor(
                                    conversation.status,
                                  )}`}
                                >
                                  {getStatusText(conversation.status)}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              {conversation.isAI ? (
                                <Badge
                                  variant="default"
                                  className="text-xs bg-primary"
                                >
                                  <Bot className="h-3 w-3 mr-1" />
                                  AI Tư vấn
                                </Badge>
                              ) : (
                                <>
                                  {conversation.animal && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {conversation.animal}
                                    </Badge>
                                  )}
                                  <Badge variant="outline" className="text-xs">
                                    {conversation.participant.role}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Matches Tab */}
          {activeTab === "matches" && (
            <>
              {matchedUsers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Chưa có match nào
                  </h3>
                  <p className="text-muted-foreground">
                    Quẹt phải những con giống bạn thích để tạo match
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {matchedUsers.map((match) => (
                    <Card
                      key={match.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback>{match.avatar}</AvatarFallback>
                            </Avatar>
                            {match.isNew && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{match.name}</h3>
                              <span className="text-xs text-muted-foreground">
                                {match.matchTime}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="text-xs">
                                {match.animal}
                              </Badge>
                              <Button
                                size="sm"
                                onClick={() => handleStartConversation(match)}
                                className="h-7 text-xs"
                              >
                                Nhắn tin
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
