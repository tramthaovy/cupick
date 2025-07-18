import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, X, Eye, MapPin, Calendar, Bell } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import NotificationModal from "@/components/NotificationModal";

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
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=400&fit=crop",
    tags: ["Giống nhập khẩu", "Chất lượng cao", "Có giấy tờ"],
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
    image: "https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=600&h=400&fit=crop",
    tags: ["Cao sản", "Thương phẩm", "Khỏe mạnh"],
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
    image: "https://images.unsplash.com/photo-1573160103600-1eba0c5c8763?w=600&h=400&fit=crop",
    tags: ["Nái giống", "Sinh sản cao", "Thuần chủng"],
  },
  {
    id: 4,
    name: "Lợn Landrace",
    breed: "Landrace",
    age: "7 tháng",
    description: "Lợn đực giống chất lượng, tốc độ tăng trọng nhanh",
    health: "Rất tốt",
    price: "9.200.000 VND",
    owner: "Trang trại Minh Phát",
    location: "An Giang",
    image: "https://images.unsplash.com/photo-1518492104633-130d0b3fd5bc?w=600&h=400&fit=crop",
    tags: ["Đực giống", "Tăng trọng nhanh", "Chất lượng"],
  },
  {
    id: 5,
    name: "Gà Brahma",
    breed: "Brahma",
    age: "6 tháng",
    description: "Gà giống to khỏe, khả năng sinh sản cao",
    health: "Tốt",
    price: "450.000 VND",
    owner: "Trại gia cầm Minh Anh",
    location: "Bình Dương",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop",
    tags: ["Gà to", "Sinh sản cao", "Dễ nuôi"],
  },
];

export default function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Drag/swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cardRotation, setCardRotation] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentAnimal = animals[currentIndex];

      const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    setDragOffset({ x: 0, y: 0 });
    setCardRotation(0);

    // Add animation delay
    setTimeout(() => {
      if (direction === "right") {
        // Show match popup
        setShowMatch(true);
        setTimeout(() => {
          setShowMatch(false);
          nextAnimal();
          setSwipeDirection(null);
        }, 2000);
      } else {
        nextAnimal();
        setSwipeDirection(null);
      }
    }, 300);
  };

  const nextAnimal = () => {
    if (currentIndex < animals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first animal
    }
  };

    const handleViewDetails = () => {
    setShowDetailModal(true);
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

    // Calculate rotation based on horizontal drag
    const rotation = (deltaX / 10) * 0.5; // Adjust multiplier for rotation sensitivity
    setCardRotation(Math.max(-15, Math.min(15, rotation)));
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 100; // Minimum distance to trigger swipe

    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        handleSwipe("right");
      } else {
        handleSwipe("left");
      }
    } else {
      // Snap back to center
      setDragOffset({ x: 0, y: 0 });
      setCardRotation(0);
    }
  };

  // Mouse events
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

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
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
      <div className="relative h-[calc(100vh-80px)] overflow-hidden">
                {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-xl font-bold">Cupick</h1>
              <p className="text-sm opacity-90">Tìm con giống phù hợp</p>
            </div>
            <div className="flex items-center space-x-2">
                            <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  // Navigate to profile or stop swiping
                  window.location.href = "/profile";
                }}
              >
                Dừng quẹt
              </Button>
            </div>
          </div>
        </div>

                        {/* Animal Card */}
                <div className="absolute inset-0 top-16 bottom-20">
          <div
            className={`w-full h-full relative overflow-hidden cursor-grab select-none ${
              isDragging ? 'cursor-grabbing' : ''
            } ${
              swipeDirection === 'left' ? 'transition-transform duration-300 transform -translate-x-full rotate-12' :
              swipeDirection === 'right' ? 'transition-transform duration-300 transform translate-x-full rotate-12' :
              isDragging ? '' : 'transition-all duration-200'
            }`}
            style={{
              transform: isDragging
                ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${cardRotation}deg)`
                : swipeDirection
                ? undefined
                : 'translate(0px, 0px) rotate(0deg)',
              opacity: isDragging ? Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300) : 1,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
                                    {/* Background with animal image */}
            <div className="absolute inset-0">
              <img
                src={currentAnimal.image}
                alt={currentAnimal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDQwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMzAwSDEwMFYyNTBIMzAwVjM1MEgyNTBWMzAwSDIwMFYyNTBIMTUwVjMwMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            {/* Swipe Direction Indicators */}
            {isDragging && (
              <>
                {/* Like indicator (right swipe) */}
                <div className={`absolute top-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg transform rotate-12 transition-opacity ${
                  dragOffset.x > 50 ? 'opacity-100' : 'opacity-0'
                }`}>
                  THÍCH ❤️
                </div>

                {/* Pass indicator (left swipe) */}
                <div className={`absolute top-8 left-8 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg transform -rotate-12 transition-opacity ${
                  dragOffset.x < -50 ? 'opacity-100' : 'opacity-0'
                }`}>
                  BỎ QUA ✕
                </div>
              </>
            )}

            {/* Content */}
            <CardHeader className="relative z-10 text-center pb-4">
              
                                          <CardTitle className="text-xl text-white drop-shadow-lg bg-black/50 rounded-lg p-2">
                {currentAnimal.name}
              </CardTitle>
                            <div className="flex items-center justify-center space-x-1 mt-2">
                <Badge variant="secondary" className="bg-white/90 text-black">
                  {currentAnimal.breed}
                </Badge>
                <Badge variant="outline" className="bg-white/20 text-white border-white/50">
                  {currentAnimal.age}
                </Badge>
              </div>
            
            {/* Animal info overlay - positioned at bottom */}
            <div className="absolute bottom-6 left-4 right-4">
              <div className="bg-black/70 rounded-2xl p-4 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-2">{currentAnimal.name}</h2>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary" className="bg-white/90 text-black">
                    {currentAnimal.breed}
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/50">
                    {currentAnimal.age}
                  </Badge>
                </div>
                <p className="text-sm text-white/90 mb-3">
                  {currentAnimal.description}
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-white/70">Sức khỏe:</span>
                    <div className="mt-1">
                      <Badge
                        variant={currentAnimal.health === "Rất tốt" ? "default" : "secondary"}
                        className="bg-white/90 text-black"
                      >
                        {currentAnimal.health}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-white/70">Giá:</span>
                    <div className="mt-1 font-bold text-green-400">
                      {currentAnimal.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal info overlay - like Tinder */}
            <div className="absolute bottom-24 left-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                  {currentAnimal.name}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-white/90 text-lg">{currentAnimal.breed}</span>
                  <span className="text-white/70">•</span>
                  <span className="text-white/90 text-lg">{currentAnimal.age}</span>
                </div>
                <div className="flex items-center space-x-1 text-white/70">
                  <MapPin className="h-4 w-4" />
                  <span>{currentAnimal.location}</span>
                </div>
              </div>
            </div>

            {/* Quick action buttons on image */}
            <div className="absolute top-4 right-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20 p-0"
                onClick={handleViewDetails}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            <div className="hidden">
              <p className="text-sm text-center text-white">
                {currentAnimal.description}
              </p>

                            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Sức khỏe:</span>
                  <Badge
                    variant={
                      currentAnimal.health === "Rất tốt"
                        ? "default"
                        : "secondary"
                    }
                    className="bg-white/90 text-black"
                  >
                    {currentAnimal.health}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Giá:</span>
                  <span className="font-semibold text-green-400">
                    {currentAnimal.price}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {currentAnimal.owner.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-white">{currentAnimal.owner}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-white/80">
                  <MapPin className="h-3 w-3" />
                  <span>{currentAnimal.location}</span>
                </div>
              </div>

                            <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={handleViewDetails}
              >
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
                        </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-24 left-0 right-0 p-4">
          <div className="flex justify-center space-x-6">
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full shadow-lg"
              onClick={() => handleSwipe("left")}
            >
              <X className="h-8 w-8 text-destructive" />
            </Button>
            <Button
              size="lg"
              className="w-16 h-16 rounded-full shadow-lg"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="h-8 w-8" />
            </Button>
          </div>
        </div>

                {/* Match Popup */}
        {showMatch && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-background rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Kết nối thành công!
              </h2>
              <p className="text-muted-foreground mb-6">
                Bạn đã kết nối với {currentAnimal.owner}. Bắt đầu nhắn tin ngay?
              </p>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  Tiếp tục quẹt
                </Button>
                <Button className="flex-1">Nhắn tin ngay</Button>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-3xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Chi tiết con giống</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetailModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                                <div className="text-center">
                  <div className="w-24 h-24 rounded-xl overflow-hidden mx-auto mb-3">
                    <img
                      src={currentAnimal.image}
                      alt={currentAnimal.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNiA0OEgyNFYzNkg3MlY2MEg2MFY0OEg0OFYzNkgzNlY0OFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold">{currentAnimal.name}</h3>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Badge variant="secondary">{currentAnimal.breed}</Badge>
                    <Badge variant="outline">{currentAnimal.age}</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Mô tả</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentAnimal.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Đặc điểm</h4>
                    <div className="flex flex-wrap gap-1">
                      {currentAnimal.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Sức khỏe:</span>
                      <div className="mt-1">
                        <Badge
                          variant={
                            currentAnimal.health === "Rất tốt"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {currentAnimal.health}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Giá:</span>
                      <div className="mt-1 font-semibold text-primary">
                        {currentAnimal.price}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {currentAnimal.owner.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{currentAnimal.owner}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{currentAnimal.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowDetailModal(false);
                      handleSwipe("left");
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Bỏ qua
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setShowDetailModal(false);
                      handleSwipe("right");
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Quan tâm
                  </Button>
                </div>
              </div>
                        </div>
          </div>
        )}

        {/* Notification Modal */}
        <NotificationModal
          open={showNotifications}
          onOpenChange={setShowNotifications}
        />
      </div>
    </MobileLayout>
  );
}