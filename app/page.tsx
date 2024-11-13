"use client";

import { initializeMockCategories } from "@/lib/category/categoriesApi";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const initializeData = async () => {
      await initializeMockCategories();
    };
    initializeData();
  }, []);
  return <div>Hello World</div>;
}
