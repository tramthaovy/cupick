import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Heart,
  MessageCircle,
  BarChart3,
  Camera,
  Bell,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

// Sample farm data
const farmStats = {
  totalAnimals: 12,
  totalSwipes: 245,
  totalMatches: 18,
  newMessages: 5,
};

const animals = [
  {
    id: 1,
    name: "Bò Wagyu A5",
    breed: "Wagyu",
    age: "2 tuổi",
    health: "Tốt",
    price: "45.000.000 VND",
    status: "Đang hiển thị",
    image: "🐄",
    swipes: 45,
    matches: 3,
  },
  {
    id: 2,
    name: "Lợn Duroc",
    breed: "Duroc",
    age: "8 tháng",
    health: "Rất tốt",
    price: "8.500.000 VND",
    status: "Đang hiển thị",
    image: "🐷",
    swipes: 32,
    matches: 2,
  },
  {
    id: 3,
    name: "Gà Brahma",
    breed: "Brahma",
    age: "6 tháng",
    health: "Tốt",
    price: "450.000 VND",
    status: "Tạm ẩn",
    image: "🐓",
    swipes: 18,
    matches: 1,
  },
];

export default function Farm() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    health: "",
    price: "",
  });

  const handleAddAnimal = () => {
    // In real app, this would call API
    console.log("Adding animal:", newAnimal);
    setShowAddDialog(false);
    setNewAnimal({
      name: "",
      breed: "",
      age: "",
      description: "",
      health: "",
      price: "",
    });
  };

  const handleEditAnimal = (animal: any) => {
    setSelectedAnimal(animal);
    setShowEditDialog(true);
  };

  const handleDeleteAnimal = (animalId: number) => {
    if (confirm("Bạn có chắc muốn xóa con giống này?")) {
      console.log("Deleting animal:", animalId);
    }
  };

  const handleViewDetails = (animal: any) => {
    alert(`Xem chi tiết ${animal.name}`);
  };

  return (
    <MobileLayout>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Header */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-primary">
              Quản lý trang trại
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                alert("Thông báo sẽ được hiển thị ở đây");
              }}
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Theo dõi và quản lý con giống của bạn
          </p>
        </div>

        <div className="p-4 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {farmStats.totalAnimals}
                </div>
                <div className="text-sm text-muted-foreground">Con giống</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">
                  {farmStats.totalSwipes}
                </div>
                <div className="text-sm text-muted-foreground">Lượt quẹt</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-pink-500">
                  {farmStats.totalMatches}
                </div>
                <div className="text-sm text-muted-foreground">Kết nối</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {farmStats.newMessages}
                </div>
                <div className="text-sm text-muted-foreground">
                  Tin nhắn mới
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add New Animal Button */}
          <Button
            onClick={() => setShowAddDialog(true)}
            className="w-full h-12 text-base font-semibold"
          >
            <Plus className="h-5 w-5 mr-2" />
            Thêm con giống mới
          </Button>

          {/* Animals List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Danh sách con giống</h2>
            {animals.map((animal) => (
              <Card key={animal.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{animal.image}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{animal.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {animal.breed}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {animal.age}
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          variant={
                            animal.status === "Đang hiển thị"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {animal.status}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{animal.swipes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{animal.matches}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(animal)}
                          className="h-8 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Chi tiết
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditAnimal(animal)}
                          className="h-8 text-xs"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAnimal(animal.id)}
                          className="h-8 text-xs text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Animal Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm con giống mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin chi tiết về con giống
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Thêm ảnh
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Tên con giống</Label>
                  <Input
                    id="name"
                    value={newAnimal.name}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, name: e.target.value })
                    }
                    placeholder="Nhập tên"
                  />
                </div>
                <div>
                  <Label htmlFor="breed">Giống</Label>
                  <Input
                    id="breed"
                    value={newAnimal.breed}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, breed: e.target.value })
                    }
                    placeholder="Nhập giống"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Tuổi</Label>
                  <Input
                    id="age"
                    value={newAnimal.age}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, age: e.target.value })
                    }
                    placeholder="Nhập tuổi"
                  />
                </div>
                <div>
                  <Label htmlFor="health">Tình trạng sức khỏe</Label>
                  <Select
                    value={newAnimal.health}
                    onValueChange={(value) =>
                      setNewAnimal({ ...newAnimal, health: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tình trạng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rất tốt">Rất tốt</SelectItem>
                      <SelectItem value="Tốt">Tốt</SelectItem>
                      <SelectItem value="Bình thường">Bình thường</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Giá (VND)</Label>
                  <Input
                    id="price"
                    value={newAnimal.price}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, price: e.target.value })
                    }
                    placeholder="Nhập giá"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={newAnimal.description}
                    onChange={(e) =>
                      setNewAnimal({
                        ...newAnimal,
                        description: e.target.value,
                      })
                    }
                    placeholder="Mô tả chi tiết về con giống"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button onClick={handleAddAnimal} className="flex-1">
                Lưu
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
}
