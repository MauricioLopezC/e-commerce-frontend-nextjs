import FeaturesList from "@/components/home/Features";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces/products/product";
import CoverImageV2 from "@/components/home/CoverImageV2";
import { getAllProducts } from "@/lib/actions/product.actions";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

async function Home() {
  //TODO: change CldImage components for img component in products grids,
  //and places with many images because vercel charges on you for that optimization
  //use CldImage only in few neccessary places
  //for example when cloudinary awesome trasfomations are needed
  const { productsData } = await getAllProducts({
    limit: 5
  })
  const { productsData: bestSellersData } = await getAllProducts({
    orderBy: '-unitsOnOrder',
    limit: 5
  })
  //console.log(products)
  return (
    <main>
      <div className="relative w-full bg-[#333232] h-[60vh] md:h-[80vh] xl:h[100vh]" >
        {/* <CoverImage /> */}
        <div className="absolute inset-0">
          <CoverImageV2 />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <div className="space-y-6 max-w-2xl mx-auto px-4">
            <p className="text-white text-xs sm:text-sm md:text-base tracking-wider mb-4 leading-relaxed">
              NUEVOS INGRESOS INCLUYENDO<br />
              JEANS, CAMISAS, ZAPATILLAS y MAS.
            </p>

            <Link
              href="/products"
              className="inline-block px-8 sm:px-12 py-2.5 sm:py-3 bg-white text-black
                       hover:bg-gray-100 transition-colors duration-200
                       text-md font-bold tracking-wider"
            >
              VER TODO
            </Link>
          </div>
        </div>

        {/* Spring 2024 Text */}
        <h1 className="absolute bottom-4 sm:bottom-8 w-full text-center text-white 
                     text-[12vw] sm:text-[8vw] font-light tracking-[0.2em] px-4 z-10">
          VERANO 2024
        </h1>
      </div>

      <section className="container mx-auto mt-16">
        <div className="mb-16">
          <FeaturesList />
        </div>

        <div className="flex justify-between mx-6  py-2">
          <h2 className="font-bold">Nuevos</h2>
          <Link href='/products' className="text-gray-600">MAS</Link>
        </div>
        <ScrollArea className="mb-16 mx-6 whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-6 p-4">
            {productsData?.products.map((product: Product, idx: number) => (
              <ProductCard key={idx} id={product.id} price={product.price} title={product.name} imgSrc={product.images[0].imgSrc} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* best sellers section */}
        <div className="flex justify-between mx-6  py-2 mt-16">
          <h2 className="font-bold">Los más vendidos</h2>
          <Link href='/products' className="text-gray-600">MAS</Link>
        </div>
        <ScrollArea className="mb-16 mx-6 whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-6 p-4">
            {bestSellersData?.products.map((product: Product, idx: number) => (
              <ProductCard key={idx} id={product.id} price={product.price} title={product.name} imgSrc={product.images[0].imgSrc} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </main>
  );
}

export default Home
