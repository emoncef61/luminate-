import Image from "next/image";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <div >
      <div className="w-full flex justify-end">
        <ThemeToggle/>
      </div>
    </div>
    
  );
}