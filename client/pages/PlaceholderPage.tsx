import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Construction } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

interface PlaceholderPageProps {
  title: string;
  description: string;
  features?: string[];
}

export default function PlaceholderPage({
  title,
  description,
  features = [],
}: PlaceholderPageProps) {
  return (
    <MobileLayout>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
              <Construction className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {features.length > 0 && (
              <div className="text-left">
                <h3 className="font-semibold mb-3">Tính năng sẽ có:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
              Trang này đang được phát triển. Hãy tiếp tục hỏi để chúng tôi hoàn
              thiện nội dung cho bạn!
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
