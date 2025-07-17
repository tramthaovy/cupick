import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelection from "./pages/RoleSelection";
import ProfileSetup from "./pages/ProfileSetup";
import Swipe from "./pages/Swipe";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />

          {/* Main App Routes */}
          <Route path="/swipe" element={<Swipe />} />
          <Route
            path="/farm"
            element={
              <PlaceholderPage
                title="Quản lý trang trại"
                description="Quản lý con giống và theo dõi hoạt động trang trại"
                features={[
                  "Thêm, sửa, xóa thông tin con giống",
                  "Xem thống kê lượt quẹt và kết nối",
                  "Quản lý tin nhắn từ người mua",
                  "Theo dõi lịch sử giao dịch",
                ]}
              />
            }
          />
          <Route
            path="/forum"
            element={
              <PlaceholderPage
                title="Forum cộng đồng"
                description="Chia sẻ kinh nghiệm và kết nối cộng đồng chăn nuôi"
                features={[
                  "Đăng bài viết về kỹ thuật chăn nuôi",
                  "Hỏi đáp và chia sẻ kinh nghiệm",
                  "Like, bình luận và chia sẻ bài viết",
                  "Tìm kiếm theo chủ đề",
                ]}
              />
            }
          />
          <Route
            path="/messages"
            element={
              <PlaceholderPage
                title="Tin nhắn"
                description="Trò chuyện trực tiếp với người mua/bán"
                features={[
                  "Chat realtime với người đã kết nối",
                  "Gửi ảnh và văn bản",
                  "Chấp nhận hoặc từ chối kết nối",
                  "Quản lý danh sách đoạn chat",
                ]}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PlaceholderPage
                title="Hồ sơ cá nhân"
                description="Quản lý thông tin và cài đặt tài khoản"
                features={[
                  "Chỉnh sửa thông tin cá nhân",
                  "Xem bài viết đã đăng",
                  "Lịch sử hoạt động",
                  "Đổi mật khẩu và đăng xuất",
                ]}
              />
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
