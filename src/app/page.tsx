import { v2 as cloudinary } from "cloudinary";
import ImageGallery from "@/components/ImageGallery";

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getImages() {
  try {
    const results = await cloudinary.search
      .expression("resource_type:image")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    return results.resources;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default async function Home() {
  const images = await getImages();

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto">
        <ImageGallery images={images} />
      </div>
    </main>
  );
}
