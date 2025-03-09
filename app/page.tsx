import Image from "next/image";
import { Button } from "@/components/ui/button";
import Left from "@/public/left.png";
import Right from "@/public/right.png";

export default function Home() {
  return (
    <div className="w-full bg-amber-100 items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full gap-8">
        <header className="flex flex-row justify-between align-center w-full p-4">
          <h1 className="text-md font-800 text-2xl font-command">
          Stylehaven
          </h1>
          <div className="flex flex-row justify-around align-center min-w-[400px]">
            <p className="font-poppins font-200 text-md hover:decoration-dashed cursor-pointer ">Home</p>
            <p className="font-poppins font-200 text-md cursor-pointer hover:decoration-dashed">About</p>
            <p className="font-poppins font-200 text-md cursor-pointer hover:decoration-dashed">Footwear</p>
            <p className="font-poppins font-200 text-md cursor-pointer hover:decoration-dashed">Men s</p>
            <p className="font-poppins font-200 text-md cursor-pointer hover:decoration-dashed">Shop</p>
          </div>
          <div className="actions gap-4 flex justify-center align-center">
            <Button className="text-amber-100 bg-neutral-900 p-4">Order</Button>
            <Button className="bg-amber-100 text-neutral-900 hover:bg-amber-100 hover:text-neutral-500">Contact</Button>
          </div>
        </header>

        <section className="w-full pt-20 flex flex-row justify-center align-center gap-4">
         <Image src={Left} alt="left"/>
           <p className="font-noto-serif text-center text-neutral-800 text-8xl font-bold text-center p-4">STYLEHAVEN<br/>COLLECTIONS</p>
          <Image src={Right} alt="right" />   
        </section>
      </main>
    </div>
  );
}
