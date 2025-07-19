import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Camera, Save, Trash2 } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAnimal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [animal, setAnimal] = useState({
    id: "",
    name: "",
    species: "",
    breed: "",
    age: "",
    description: "",
    health: "",
    price: "",
    weight: "",
    image: "",
  });

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

  // Mock data - in real app, this would fetch from API
  const mockAnimals = [
    {
      id: "1",
      name: "Bò Wagyu A5",
      species: "cow",
      breed: "Wagyu",
      age: "2 tuổi",
      health: "Tốt",
      price: "45.000.000 VND",
      image:
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
      description: "Bò giống chất lượng cao, có giấy tờ nguồn gốc rõ ràng",
      weight: "450kg",
    },
    {
      id: "2",
      name: "Lợn Duroc",
      species: "pig",
      breed: "Duroc",
      age: "8 tháng",
      health: "Rất tốt",
      price: "8.500.000 VND",
      image:
        "https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=400&h=300&fit=crop",
      description: "Lợn giống cao sản, phù hợp nuôi thương phẩm",
      weight: "80kg",
    },
    {
      id: "3",
      name: "Gà Brahma",
      species: "chicken",
      breed: "Brahma",
      age: "6 tháng",
      health: "Tốt",
      price: "450.000 VND",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop",
      description: "Gà giống to khỏe, khả năng sinh sản cao",
      weight: "3.5kg",
    },
  ];

  useEffect(() => {
    // Load animal data based on ID
    const foundAnimal = mockAnimals.find((a) => a.id === id);
    if (foundAnimal) {
      setAnimal(foundAnimal);
    } else {
      // If animal not found, redirect back to farm
      navigate("/farm");
    }
  }, [id, navigate]);

  const handleUpdateAnimal = () => {
    console.log("Updating animal:", animal);
    // In real app, this would call API
    navigate("/farm");
  };

  const handleCancel = () => {
    navigate("/farm");
  };

  const handleDeleteAnimal = () => {
    if (confirm("Bạn có chắc muốn xóa con giống này?")) {
      console.log("Deleting animal:", animal.id);
      navigate("/farm");
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Header */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  Chỉnh sửa con giống
                </h1>
                <p className="text-sm text-muted-foreground">
                  Cập nhật thông tin {animal.name}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteAnimal}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted">
                  {animal.image ? (
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  Thay đổi ảnh
                </Button>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên con giống *</Label>
                  <Input
                    id="name"
                    value={animal.name}
                    onChange={(e) =>
                      setAnimal({ ...animal, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="species">Loài *</Label>
                  <Select
                    value={animal.species}
                    onValueChange={(value) =>
                      setAnimal({ ...animal, species: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {speciesOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="breed">Giống *</Label>
                  <Input
                    id="breed"
                    value={animal.breed}
                    onChange={(e) =>
                      setAnimal({ ...animal, breed: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="age">Tuổi *</Label>
                    <Input
                      id="age"
                      value={animal.age}
                      onChange={(e) =>
                        setAnimal({ ...animal, age: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Cân nặng</Label>
                    <Input
                      id="weight"
                      value={animal.weight}
                      onChange={(e) =>
                        setAnimal({ ...animal, weight: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="health">Tình trạng sức khỏe *</Label>
                  <Select
                    value={animal.health}
                    onValueChange={(value) =>
                      setAnimal({ ...animal, health: value })
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
                  <Label htmlFor="price">Giá bán *</Label>
                  <Input
                    id="price"
                    value={animal.price}
                    onChange={(e) =>
                      setAnimal({ ...animal, price: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={animal.description}
                    onChange={(e) =>
                      setAnimal({
                        ...animal,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pb-4">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Hủy
            </Button>
            <Button
              onClick={handleUpdateAnimal}
              className="flex-1"
              disabled={
                !animal.name ||
                !animal.species ||
                !animal.breed ||
                !animal.age ||
                !animal.health ||
                !animal.price
              }
            >
              <Save className="h-4 w-4 mr-2" />
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
