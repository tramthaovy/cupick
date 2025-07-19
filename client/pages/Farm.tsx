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
];

export default function Farm() {
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    description: "",
    health: "",
    price: "",
    weight: "",
  });

  // Species options
  const speciesOptions = [
    { value: "cow", label: "Bò", emoji: "🐄" },
    { value: "pig", label: "Heo/Lợn", emoji: "🐷" },
    { value: "chicken", label: "Gà", emoji: "🐓" },
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
    setNewAnimal({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      age: animal.age,
      description: animal.description,
      health: animal.health,
      price: animal.price,
      weight: animal.weight,
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (selectedAnimal) {
      const animalIndex = animals.findIndex((a) => a.id === selectedAnimal.id);
      if (animalIndex !== -1) {
        Object.assign(animals[animalIndex], newAnimal);
        console.log("Animal updated:", animals[animalIndex]);
        alert("Thông tin con giống đã được cập nhật!");
      }
    }
    setShowEditDialog(false);
    setSelectedAnimal(null);
    setNewAnimal({
      name: "",
      species: "",
      breed: "",
      age: "",
      description: "",
      health: "",
      price: "",
      weight: "",
    });
  };

  const handleDeleteAnimal = (animalId: number) => {
    if (confirm("Bạn có chắc muốn xóa con giống này?")) {
      const animalIndex = animals.findIndex((a) => a.id === animalId);
      if (animalIndex !== -1) {
        animals.splice(animalIndex, 1);
        console.log("Animal deleted:", animalId);
        alert("Con giống đã được xóa!");
      }
    }
  };

  const handleViewDetails = (animal: any) => {
    setSelectedAnimal(animal);
    setShowDetailModal(true);
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
            Theo d��i và quản lý con giống của bạn
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
                  <Label htmlFor="species">Loài vật</Label>
                  <Select
                    value={newAnimal.species}
                    onValueChange={(value) =>
                      setNewAnimal({ ...newAnimal, species: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loài vật" />
                    </SelectTrigger>
                    <SelectContent>
                      {speciesOptions.map((species) => (
                        <SelectItem key={species.value} value={species.value}>
                          {species.emoji} {species.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="weight">Cân nặng</Label>
                  <Input
                    id="weight"
                    value={newAnimal.weight}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, weight: e.target.value })
                    }
                    placeholder="Nhập cân nặng (kg)"
                  />
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

        {/* Edit Animal Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa con giống</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin chi tiết về con giống
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
                  <Label htmlFor="editName">Tên con giống</Label>
                  <Input
                    id="editName"
                    value={newAnimal.name}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, name: e.target.value })
                    }
                    placeholder="Nhập tên"
                  />
                </div>
                <div>
                  <Label htmlFor="editSpecies">Loài vật</Label>
                  <Select
                    value={newAnimal.species}
                    onValueChange={(value) =>
                      setNewAnimal({ ...newAnimal, species: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loài vật" />
                    </SelectTrigger>
                    <SelectContent>
                      {speciesOptions.map((species) => (
                        <SelectItem key={species.value} value={species.value}>
                          {species.emoji} {species.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editBreed">Giống</Label>
                  <Input
                    id="editBreed"
                    value={newAnimal.breed}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, breed: e.target.value })
                    }
                    placeholder="Nh���p giống"
                  />
                </div>
                <div>
                  <Label htmlFor="editAge">Tuổi</Label>
                  <Input
                    id="editAge"
                    value={newAnimal.age}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, age: e.target.value })
                    }
                    placeholder="Nhập tuổi"
                  />
                </div>
                <div>
                  <Label htmlFor="editWeight">Cân nặng</Label>
                  <Input
                    id="editWeight"
                    value={newAnimal.weight}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, weight: e.target.value })
                    }
                    placeholder="Nhập cân nặng (kg)"
                  />
                </div>
                <div>
                  <Label htmlFor="editHealth">Tình trạng sức khỏe</Label>
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
                  <Label htmlFor="editPrice">Giá (VND)</Label>
                  <Input
                    id="editPrice"
                    value={newAnimal.price}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, price: e.target.value })
                    }
                    placeholder="Nhập giá"
                  />
                </div>
                <div>
                  <Label htmlFor="editDescription">Mô tả</Label>
                  <Textarea
                    id="editDescription"
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
                onClick={() => setShowEditDialog(false)}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button onClick={handleSaveEdit} className="flex-1">
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Animal Detail Modal */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi tiết con giống</DialogTitle>
            </DialogHeader>
            {selectedAnimal && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-xl overflow-hidden mx-auto mb-4">
                    <img
                      src={selectedAnimal.image}
                      alt={selectedAnimal.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA2NEgzMlY0OEg5NlY4MEg4MFY2NEg2NFY0OEg0OFY2NFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold">{selectedAnimal.name}</h3>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <Badge variant="secondary">{selectedAnimal.breed}</Badge>
                    <Badge variant="outline">{selectedAnimal.age}</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Thông tin cơ bản</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Loài:</span>
                        <div className="mt-1 font-medium">
                          {
                            speciesOptions.find(
                              (s) => s.value === selectedAnimal.species,
                            )?.label
                          }
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cân nặng:</span>
                        <div className="mt-1 font-medium">
                          {selectedAnimal.weight}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sức khỏe:</span>
                        <div className="mt-1">
                          <Badge
                            variant={
                              selectedAnimal.health === "Rất tốt"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {selectedAnimal.health}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Giá:</span>
                        <div className="mt-1 font-semibold text-primary">
                          {selectedAnimal.price}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Mô tả</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedAnimal.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Thống kê</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-lg font-bold text-primary">
                          {selectedAnimal.swipes}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Lượt quẹt
                        </div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-lg font-bold text-accent">
                          {selectedAnimal.matches}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Kết nối
                        </div>
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-500">
                          {selectedAnimal.status === "Đang hiển thị"
                            ? "Hiển thị"
                            : "Ẩn"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Trạng thái
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEditAnimal(selectedAnimal);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowDetailModal(false);
                      handleDeleteAnimal(selectedAnimal.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
}
