import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, X, Eye, MapPin, Bell, Star, Shield, Users } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import NotificationModal from "@/components/NotificationModal";
import { useNavigate } from "react-router-dom";

// Sample animal data
const animals = [
  {
    id: 1,
    name: "Bò Wagyu A5",
    breed: "Wagyu",
    age: "2 tuổi",
    description: "Bò giống chất lượng cao, có giấy tờ nguồn gốc rõ ràng",
    health: "Tốt",
    price: "45.000.000 VND",
    owner: "Trại Thành Đạt",
    location: "Long An",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=800&fit=crop",
    tags: ["Giống nhập khẩu", "Chất lượng cao", "Có giấy tờ"],
    ownerInfo: {
      name: "Nguyễn Văn A",
      farmName: "Trại Thành Đạt",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "Long An, Vi��t Nam",
      experience: "15 năm kinh nghiệm",
      speciality: "Bò giống cao cấp",
      rating: 4.8,
      totalAnimals: 50,
      verified: true,
      bio: "Chuyên cung cấp bò giống chất lượng cao với 15 năm kinh nghiệm trong ngành chăn nu��i.",
    },
  },
  {
    id: 2,
    name: "Lợn Duroc",
    breed: "Duroc",
    age: "8 tháng",
    description: "Lợn giống cao sản, phù hợp nuôi thương phẩm",
    health: "Rất tốt",
    price: "8.500.000 VND",
    owner: "Trang trại Hòa Bình",
    location: "Đồng Nai",
    image:
      "https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=600&h=800&fit=crop",
    tags: ["Cao sản", "Thương phẩm", "Khỏe mạnh"],
    ownerInfo: {
      name: "Trần Thị B",
      farmName: "Trang trại Hòa Bình",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b734?w=150&h=150&fit=crop&crop=face",
      location: "Đồng Nai, Việt Nam",
      experience: "8 năm kinh nghiệm",
      speciality: "Lợn thương phẩm",
      rating: 4.6,
      totalAnimals: 120,
      verified: true,
      bio: "Trang trại chuyên nuôi lợn thương phẩm quy mô lớn với công nghệ hiện đại.",
    },
  },
  {
    id: 3,
    name: "Lợn Yorkshire",
    breed: "Yorkshire",
    age: "10 tháng",
    description: "Lợn nái giống sinh sản tốt, có khả năng cho nhiều con",
    health: "Tốt",
    price: "12.000.000 VND",
    owner: "Trại chăn nuôi Phước An",
    location: "Tiền Giang",
    image:
      "https://images.unsplash.com/photo-1573160103600-1eba0c5c8763?w=600&h=800&fit=crop",
    tags: ["Nái giống", "Sinh sản cao", "Thuần chủng"],
    ownerInfo: {
      name: "Lê Minh C",
      farmName: "Trại chăn nuôi Phước An",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Tiền Giang, Việt Nam",
      experience: "12 năm kinh nghiệm",
      speciality: "Lợn nái giống",
      rating: 4.9,
      totalAnimals: 80,
      verified: true,
      bio: "Chuyên cung cấp lợn nái giống chất lượng cao với tỷ lệ sinh sản vượt trội.",
    },
  },
];

export default function SwipeNew() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOwnerProfile, setShowOwnerProfile] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Drag/swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cardRotation, setCardRotation] = useState(0);

  const currentAnimal = animals[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setShowMatch(true);
      setTimeout(() => {
        setShowMatch(false);
        nextAnimal();
      }, 2000);
    } else {
      nextAnimal();
    }
  };

  const nextAnimal = () => {
    if (currentIndex < animals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Touch/Mouse event handlers
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
    setDragOffset({ x: 0, y: 0 });
    setCardRotation(0);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    setDragOffset({ x: deltaX, y: deltaY });

    const rotation = (deltaX / 10) * 0.5;
    setCardRotation(Math.max(-15, Math.min(15, rotation)));
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 100;

    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleSwipe("right");
      } else {
        handleSwipe("left");
      }
    } else {
      setDragOffset({ x: 0, y: 0 });
      setCardRotation(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  if (!currentAnimal) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              Không còn con giống nào
            </h2>
            <p className="text-muted-foreground">
              Hãy quay lại sau để xem thêm
            </p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="relative h-[calc(100vh-80px)] overflow-hidden bg-gray-100">
        {/* Header - Tinder style */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="text-xl font-bold text-primary">🔥 Cupick</div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/notifications")}
                className="w-10 h-10 rounded-full p-0 relative"
              >
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "/profile")}
                className="w-10 h-10 rounded-full p-0"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">U</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Swipe Area - Full Screen */}
        <div className="absolute inset-0 top-20 bottom-24">
          <div
            className={`w-full h-full relative overflow-hidden cursor-grab select-none transition-transform duration-300 ${
              isDragging ? "cursor-grabbing" : ""
            }`}
            style={{
              transform: isDragging
                ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${cardRotation}deg)`
                : "translate(0px, 0px) rotate(0deg)",
              opacity: isDragging
                ? Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300)
                : 1,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Full Screen Animal Image */}
            <div className="absolute inset-0">
              <img
                src={currentAnimal.image}
                alt={currentAnimal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMzAwSDEwMFYyNTBIMzAwVjM1MEgyNTBWMzAwSDIwMFYyNTBIMTUwVjMwMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Swipe Direction Indicators - Tinder style */}
            {isDragging && (
              <>
                <div
                  className={`absolute top-20 right-8 px-4 py-2 rounded-lg border-4 border-green-500 bg-green-500/20 transform rotate-12 transition-opacity ${
                    dragOffset.x > 50 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-green-500 font-bold text-2xl">
                    LIKE
                  </span>
                </div>

                <div
                  className={`absolute top-20 left-8 px-4 py-2 rounded-lg border-4 border-red-500 bg-red-500/20 transform -rotate-12 transition-opacity ${
                    dragOffset.x < -50 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-red-500 font-bold text-2xl">NOPE</span>
                </div>
              </>
            )}

            {/* Animal Info - Bottom overlay like Tinder */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-white">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold drop-shadow-lg">
                      {currentAnimal.name}
                    </h1>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xl text-white/90">
                        {currentAnimal.breed}
                      </span>
                      <span className="text-white/70">•</span>
                      <span className="text-xl text-white/90">
                        {currentAnimal.age}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-12 h-12 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 p-0"
                    onClick={() => setShowDetailModal(true)}
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-1 text-white/80 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{currentAnimal.location}</span>
                  <span>•</span>
                  <span className="font-semibold text-green-400">
                    {currentAnimal.price}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-black text-xs"
                  >
                    {currentAnimal.health}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 text-xs"
                  >
                    {currentAnimal.owner}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Owner Information Section */}
        <div className="absolute bottom-24 left-0 right-0 bg-white border-t border-gray-200">
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowOwnerProfile(true)}
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={currentAnimal.ownerInfo.avatar}
                  alt={currentAnimal.ownerInfo.name}
                />
                <AvatarFallback>
                  {currentAnimal.ownerInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {currentAnimal.ownerInfo.name}
                  </h3>
                  {currentAnimal.ownerInfo.verified && (
                    <Shield className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {currentAnimal.ownerInfo.location}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">
                    {currentAnimal.ownerInfo.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {currentAnimal.ownerInfo.experience}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Simplified */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex items-center justify-center space-x-12 py-6">
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-red-400 hover:bg-red-50"
              onClick={() => handleSwipe("left")}
            >
              <X className="h-7 w-7 text-red-500" />
            </Button>

            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 border-0"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="h-7 w-7 text-white" />
            </Button>
          </div>
        </div>

        {/* Match Popup */}
        {showMatch && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/90 to-purple-600/90 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-2">
                It's a Match!
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Bạn và {currentAnimal.owner} đã kết nối!
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Tiếp tục quẹt
                </Button>
                <Button className="bg-white text-black hover:bg-white/90">
                  Nhắn tin ngay
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Owner Profile Modal */}
        <Dialog open={showOwnerProfile} onOpenChange={setShowOwnerProfile}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Thông tin chủ nuôi</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Owner Header */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src={currentAnimal.ownerInfo.avatar}
                    alt={currentAnimal.ownerInfo.name}
                  />
                  <AvatarFallback className="text-lg">
                    {currentAnimal.ownerInfo.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-xl font-bold">
                      {currentAnimal.ownerInfo.name}
                    </h2>
                    {currentAnimal.ownerInfo.verified && (
                      <Shield className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-600 font-medium">
                    {currentAnimal.ownerInfo.farmName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {currentAnimal.ownerInfo.location}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-lg">
                      {currentAnimal.ownerInfo.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Đánh giá</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="font-bold text-lg">
                      {currentAnimal.ownerInfo.totalAnimals}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Con vật</p>
                </div>
                <div className="text-center">
                  <div className="mb-1">
                    <span className="font-bold text-lg">
                      {currentAnimal.ownerInfo.experience.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Năm kinh nghiệm</p>
                </div>
              </div>

              {/* Speciality */}
              <div>
                <h3 className="font-semibold mb-2">Chuyên môn</h3>
                <Badge variant="secondary" className="text-sm">
                  {currentAnimal.ownerInfo.speciality}
                </Badge>
              </div>

              {/* Bio */}
              <div>
                <h3 className="font-semibold mb-2">Giới thiệu</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentAnimal.ownerInfo.bio}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  Xem trang trại
                </Button>
                <Button className="flex-1">Nhắn tin</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Notification Modal */}
        <NotificationModal
          open={showNotifications}
          onOpenChange={setShowNotifications}
        />
      </div>
    </MobileLayout>
  );
}
