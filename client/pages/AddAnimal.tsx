import React, { useState } from "react";
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
import { ArrowLeft, Camera, Save } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { useNavigate } from "react-router-dom";

export default function AddAnimal() {
  const navigate = useNavigate();
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

  const handleAddAnimal = () => {
    console.log("Adding animal:", newAnimal);
    // In real app, this would call API
    navigate("/farm");
  };

  const handleCancel = () => {
    navigate("/farm");
  };

  return (
    <MobileLayout>
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Header */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">
              Thêm con giống mới
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Nhập thông tin chi tiết về con giống
          </p>
        </div>

        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center">
                  <Camera className="h-10 w-10 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Thêm ảnh
                </Button>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên con giống *</Label>
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
                  <Label htmlFor="species">Loài *</Label>
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
                    placeholder="VD: Wagyu, Duroc, Brahma"
                    value={newAnimal.breed}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, breed: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="age">Tuổi *</Label>
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
                  <Label htmlFor="health">Tình trạng sức khỏe *</Label>
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
                  <Label htmlFor="price">Giá bán *</Label>
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
                    rows={4}
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
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pb-4">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Hủy
            </Button>
            <Button
              onClick={handleAddAnimal}
              className="flex-1"
              disabled={
                !newAnimal.name ||
                !newAnimal.species ||
                !newAnimal.breed ||
                !newAnimal.age ||
                !newAnimal.health ||
                !newAnimal.price
              }
            >
              <Save className="h-4 w-4 mr-2" />
              Thêm con giống
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
