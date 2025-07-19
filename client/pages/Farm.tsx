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
  ArrowLeft,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { useNavigate } from "react-router-dom";

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
    species: "cow",
    breed: "Wagyu",
    age: "2 tuổi",
    health: "Tốt",
    price: "45.000.000 VND",
    status: "Đang hiển thị",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
    swipes: 45,
    matches: 3,
    description: "Bò giống chất lượng cao, có giấy tờ nguồn gốc rõ ràng",
    weight: "450kg",
    location: "Long An",
  },
  {
    id: 2,
    name: "Lợn Duroc",
    species: "pig",
    breed: "Duroc",
    age: "8 tháng",
    health: "Rất tốt",
    price: "8.500.000 VND",
    status: "Đang hiển thị",
    image:
      "https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=400&h=300&fit=crop",
    swipes: 32,
    matches: 2,
    description: "Lợn giống cao sản, phù hợp nuôi thương phẩm",
    weight: "80kg",
    location: "Đồng Nai",
  },
  {
    id: 3,
    name: "Gà Brahma",
    species: "chicken",
    breed: "Brahma",
    age: "6 tháng",
    health: "Tốt",
    price: "450.000 VND",
    status: "Tạm ẩn",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop",
    swipes: 18,
    matches: 1,
    description: "Gà giống to khỏe, khả năng sinh sản cao",
    weight: "3.5kg",
    location: "Bình Dương",
  },
  {
    id: 4,
    name: "Bò Holstein",
    species: "cow",
    breed: "Holstein",
    age: "3 tuổi",
    health: "Tốt",
    price: "35.000.000 VND",
    status: "Đang hiển thị",
    image:
      "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
    swipes: 28,
    matches: 1,
    description: "Bò sữa năng suất cao",
    weight: "520kg",
    location: "Lâm Đồng",
  },
  {
    id: 5,
    name: "Lợn Yorkshire",
    species: "pig",
    breed: "Yorkshire",
    age: "10 tháng",
    health: "Tốt",
    price: "12.000.000 VND",
    status: "Đang hiển thị",
    image:
      "https://images.unsplash.com/photo-1573160103600-1eba0c5c8763?w=400&h=300&fit=crop",
    swipes: 41,
    matches: 4,
    description: "Lợn nái giống sinh sản tốt, có khả năng cho nhiều con",
    weight: "95kg",
    location: "Tiền Giang",
  },
];

export default function Farm() {
  const navigate = useNavigate();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Species options
  const speciesOptions = [
    {
      value: "cow",
      label: "Bò",
      image:
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=100&h=100&fit=crop&crop=face",
      icon: "🐄",
    },
    {
      value: "pig",
      label: "Heo/Lợn",
      image:
        "https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=100&h=100&fit=crop&crop=face",
      icon: "🐷",
    },
    {
      value: "chicken",
      label: "Gà",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=100&h=100&fit=crop&crop=face",
      icon: "🐓",
    },
  ];

  // Calculate animal counts by species
  const getAnimalCountBySpecies = (species: string) => {
    return animals.filter((animal) => animal.species === species).length;
  };

  const getTotalAnimals = () => {
    return animals.length;
  };

  // Get filtered animals based on selected category
  const getFilteredAnimals = () => {
    if (!selectedCategory) return animals;
    return animals.filter((animal) => animal.species === selectedCategory);
  };

  const handleEditAnimal = (animal: any) => {
    navigate(`/farm/edit/${animal.id}`);
  };

  const handleViewAnimal = (animal: any) => {
    setSelectedAnimal(animal);
    setShowDetailModal(true);
  };

  const handleDeleteAnimal = (animalId: number) => {
    if (confirm("Bạn có chắc muốn xóa con giống này?")) {
      console.log("Deleting animal:", animalId);
    }
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
              onClick={() => navigate("/notifications")}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Theo dõi và quản lý con giống của bạn
          </p>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {!selectedCategory ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {getTotalAnimals()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tổng con vật
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {farmStats.totalSwipes}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lượt xem
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {farmStats.totalMatches}
                    </div>
                    <div className="text-sm text-muted-foreground">Match</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {farmStats.newMessages}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tin nhắn mới
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Herd Breakdown */}
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Phân loại đàn vật
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {speciesOptions.map((species) => {
                    const count = getAnimalCountBySpecies(species.value);
                    return (
                      <Card
                        key={species.value}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedCategory(species.value)}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-muted">
                            <img
                              src={species.image}
                              alt={species.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl">${species.icon}</div>`;
                              }}
                            />
                          </div>
                          <div className="text-3xl font-bold text-primary mb-1">
                            {count}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {species.label}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Back button and category title */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold">
                  {
                    speciesOptions.find((s) => s.value === selectedCategory)
                      ?.label
                  }
                  ({getAnimalCountBySpecies(selectedCategory)} con)
                </h2>
              </div>

              {/* Filtered Animals List */}
              <div className="space-y-4">
                {getFilteredAnimals().map((animal) => (
                  <Card key={animal.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden">
                          <img
                            src={animal.image}
                            alt={animal.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzMkgxNlYyNEg0OFY0MEg0MFYzMkgzMlYyNEgyNFYzMloiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+";
                            }}
                          />
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
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {animal.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{animal.swipes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{animal.matches}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>0</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewAnimal(animal)}
                              className="h-8 text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Xem
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

                {getFilteredAnimals().length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full overflow-hidden mx-auto mb-4">
                      {(() => {
                        const species = speciesOptions.find(
                          (s) => s.value === selectedCategory,
                        );
                        return (
                          <img
                            src={species?.image}
                            alt={species?.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl">${species?.icon}</div>`;
                            }}
                          />
                        );
                      })()}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Chưa có{" "}
                      {speciesOptions
                        .find((s) => s.value === selectedCategory)
                        ?.label.toLowerCase()}
                    </h3>
                    <p className="text-muted-foreground">
                      Nhấn nút "+" để thêm con vật đầu tiên
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Fixed Add Animal Button */}
        <Button
          onClick={() => navigate("/farm/add")}
          className="fixed bottom-24 right-4 shadow-lg z-10 h-12 px-4 rounded-full"
        >
          <Plus className="h-5 w-5 mr-2" />
          Thêm con vật
        </Button>

                {/* View Animal Detail Modal - keeping only this one */}
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
                    placeholder="VD: Bò Wagyu A5"
                    value={newAnimal.name}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="species">Loài</Label>
                  <Select
                    value={newAnimal.species}
                    onValueChange={(value) =>
                      setNewAnimal({ ...newAnimal, species: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loài" />
                    </SelectTrigger>
                    <SelectContent>
                      {speciesOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.emoji} {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="breed">Giống</Label>
                  <Input
                    id="breed"
                    placeholder="VD: Wagyu, Duroc, Brahma"
                    value={newAnimal.breed}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, breed: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="age">Tuổi</Label>
                    <Input
                      id="age"
                      placeholder="VD: 2 tuổi"
                      value={newAnimal.age}
                      onChange={(e) =>
                        setNewAnimal({ ...newAnimal, age: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Cân nặng</Label>
                    <Input
                      id="weight"
                      placeholder="VD: 450kg"
                      value={newAnimal.weight}
                      onChange={(e) =>
                        setNewAnimal({ ...newAnimal, weight: e.target.value })
                      }
                    />
                  </div>
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
                      <SelectItem value="Trung bình">Trung bình</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Giá bán</Label>
                  <Input
                    id="price"
                    placeholder="VD: 45.000.000 VND"
                    value={newAnimal.price}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, price: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả chi tiết về con giống..."
                    rows={3}
                    value={newAnimal.description}
                    onChange={(e) =>
                      setNewAnimal({
                        ...newAnimal,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddAnimal}>Thêm con giống</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Animal Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin con giống
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Thay đổi ảnh
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="edit-name">Tên con giống</Label>
                  <Input
                    id="edit-name"
                    value={newAnimal.name}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="edit-species">Loài</Label>
                  <Select
                    value={newAnimal.species}
                    onValueChange={(value) =>
                      setNewAnimal({ ...newAnimal, species: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {speciesOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.emoji} {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-breed">Giống</Label>
                  <Input
                    id="edit-breed"
                    value={newAnimal.breed}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, breed: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="edit-age">Tuổi</Label>
                    <Input
                      id="edit-age"
                      value={newAnimal.age}
                      onChange={(e) =>
                        setNewAnimal({ ...newAnimal, age: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-weight">Cân nặng</Label>
                    <Input
                      id="edit-weight"
                      value={newAnimal.weight}
                      onChange={(e) =>
                        setNewAnimal({ ...newAnimal, weight: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-health">Tình trạng sức khỏe</Label>
                  <Select
                    value={newAnimal.health}
                    onValueChange={(value) =>
                      setNewAnimal({ ...newAnimal, health: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rất tốt">Rất tốt</SelectItem>
                      <SelectItem value="Tốt">Tốt</SelectItem>
                      <SelectItem value="Trung bình">Trung bình</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="edit-price">Giá bán</Label>
                  <Input
                    id="edit-price"
                    value={newAnimal.price}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, price: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="edit-description">Mô tả</Label>
                  <Textarea
                    id="edit-description"
                    rows={3}
                    value={newAnimal.description}
                    onChange={(e) =>
                      setNewAnimal({
                        ...newAnimal,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                H��y
              </Button>
              <Button onClick={handleUpdateAnimal}>Cập nhật</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Animal Detail Modal */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Chi tiết con giống</DialogTitle>
            </DialogHeader>
            {selectedAnimal && (
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-32 h-32 rounded-xl overflow-hidden">
                    <img
                      src={selectedAnimal.image}
                      alt={selectedAnimal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {selectedAnimal.name}
                  </h3>
                  <Badge
                    variant={
                      selectedAnimal.status === "Đang hiển thị"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedAnimal.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Giống:</span>
                      <p className="font-medium">{selectedAnimal.breed}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tuổi:</span>
                      <p className="font-medium">{selectedAnimal.age}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cân nặng:</span>
                      <p className="font-medium">{selectedAnimal.weight}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sức khỏe:</span>
                      <p className="font-medium">{selectedAnimal.health}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-muted-foreground text-sm">Giá:</span>
                    <p className="font-semibold text-lg text-primary">
                      {selectedAnimal.price}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground text-sm">
                      Mô t��:
                    </span>
                    <p className="text-sm mt-1">{selectedAnimal.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {selectedAnimal.swipes}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Lượt xem
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {selectedAnimal.matches}
                      </div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        0
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tin nhắn
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDetailModal(false)}
              >
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
}