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
import { Heart, X, Eye, MapPin, Calendar } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

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
    image: "🐄",
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
    image: "🐷",
  },
  {
    id: 3,
    name: "Gà Brahma",
    breed: "Brahma",
    age: "6 tháng",
    description: "Gà giống to khỏe, khả năng sinh sản cao",
    health: "Tốt",
    price: "450.000 VND",
    owner: "Trại gia cầm Minh Anh",
    location: "Bình Dương",
    image: "🐓",
  },
];

export default function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);

  const currentAnimal = animals[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      // Show match popup
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
      setCurrentIndex(0); // Loop back to first animal
    }
  };

  const handleViewDetails = () => {
    // In a real app, this would open a detail modal or navigate to a detail page
    alert(`Xem chi tiết ${currentAnimal.name}`);
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

        {/* Animal Card */}
        <div className="h-full flex items-center justify-center p-4">
          <Card className="w-full max-w-sm h-[600px] relative overflow-hidden shadow-2xl">
            {/* Background with animal emoji */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-[200px] opacity-20">
                {currentAnimal.image}
              </span>
            </div>

            {/* Content */}
            <CardHeader className="relative z-10 text-center pb-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl">{currentAnimal.image}</span>
              </div>
              <CardTitle className="text-xl">{currentAnimal.name}</CardTitle>
              <CardDescription className="flex items-center justify-center space-x-1">
                <Badge variant="secondary">{currentAnimal.breed}</Badge>
                <Badge variant="outline">{currentAnimal.age}</Badge>
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              <p className="text-sm text-center text-muted-foreground">
                {currentAnimal.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sức khỏe:</span>
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Giá:</span>
                  <span className="font-semibold text-primary">
                    {currentAnimal.price}
                  </span>
                </div>
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

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleViewDetails}
              >
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
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
      </div>
    </MobileLayout>
  );
}
