import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, Tractor } from "lucide-react";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      // Store the selected role (in a real app, this would be in state management or API)
      localStorage.setItem("userRole", selectedRole);
      navigate("/profile-setup");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-primary">
            Chọn vai trò của bạn
          </CardTitle>
          <CardDescription>
            Bạn muốn sử dụng app với vai trò nào?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedRole}
            onValueChange={setSelectedRole}
            className="space-y-4"
          >
            <div className="space-y-4">
              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedRole === "buyer"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedRole("buyer")}
              >
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="buyer" id="buyer" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <Label
                        htmlFor="buyer"
                        className="text-lg font-semibold cursor-pointer"
                      >
                        Người nhận
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tìm kiếm và lựa chọn con giống phù hợp qua cơ chế quẹt thẻ
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedRole === "seller"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedRole("seller")}
              >
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="seller" id="seller" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Tractor className="h-5 w-5 text-accent" />
                      </div>
                      <Label
                        htmlFor="seller"
                        className="text-lg font-semibold cursor-pointer"
                      >
                        Người cho
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quản lý trang trại và đăng thông tin con giống để bán
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroup>

          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="w-full h-12 text-base font-semibold"
          >
            Tiếp tục
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
