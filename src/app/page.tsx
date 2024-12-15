import FeaturesList from "@/components/home/Features";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/interfaces/products/product";
import CoverImageV2 from "@/components/home/CoverImageV2";
import { getAllProducts } from "@/lib/actions/product.actions";

async function Home() {
  //TODO: change CldImage components for img component in products grids,
  //and places with many images because vercel charges on you for that optimization
  //use CldImage only in few neccessary places
  //for example when cloudinary awesome trasfomations are needed
  //
  const { productsData, error } = await getAllProducts({
    limit: 5
  })
  //console.log(products)
  return (
    <main>
      <div className="">
        <div className=" bg-[#333232] flex justify-center sm:px-12  h-[70vh]" >
          {/* <CoverImage /> */}
          <CoverImageV2 />
          <div className="absolute inset-0 flex justify-center items-center">
            <Link href={'/products'}>
              <button className="w-full mx-2 px-8 py-2 bg-white md: max-w-md font-bold">VER TODO</button>
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <FeaturesList />
        </div>
      </div>

      <section className="mt-14">
        <div className="flex justify-between px-8 py-2">
          <h2 className="font-bold">Nuevos</h2>
          <Link href={'/products'} className="text-gray-600">MAS</Link>
        </div>

        <div className="flex gap-6 overflow-x-auto mb-16 mx-6">
          {productsData?.products.map((product: Product, idx: number) => (
            <ProductCard key={idx} id={product.id} price={product.price} title={product.name} imgSrc={product.images[0].imgSrc} />
          ))}
        </div>

        {/* best sellers sections */}
      </section>
    </main>
  );
}

export default Home
