"use client"
import Link from "next/link";
import Image from "next/image";
import FeaturedProduct from "@/components/HomepageComponents/FeaturedProduct";
import BestSellingWatches from "@/components/HomepageComponents/BestSelling";
import WatchHero from "@/components/HomepageComponents/Herovideo";
import GallerySlider from "@/components/HomepageComponents/GallerySlider";
import WatchOfTheMonth from "@/components/HomepageComponents/WatchOfTheMonth";
import WatchReviewSlider from "@/components/HomepageComponents/WatchReviewSlider";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";


export default function Home() {
  return (
    <main>
      <WatchHero/>
      <BestSellingWatches/>
      <FeaturedProduct/>
      <GallerySlider/>
      <WatchOfTheMonth/>
      <WatchReviewSlider/>
      <NewsletterComponent/>
    </main>
  );
}