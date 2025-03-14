import ButtonLogin from "@/components/ButtonLogin";
import { ListItem } from "@/components/ListItem";
import { FAQListItem } from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "./productDemo.jpeg"
import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()
  console.log(session)

  const pricingFeaturesList = [
    "Collect customer feedback",
    "Unlimited boards",
    "Admin dashboard",
    "24/7 support",
  ];

  return (
    <main>
      {/* HEADER */}
      <section className="bg-base-200">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-bold">Innovare SaaS</div>
          <div className="space-x-4 max-md:block">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#faq">
              FAQ
            </a>
          </div>
          <div>
            <ButtonLogin session={session} />
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="text-center lg:text-left py-32 px-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center">
        <Image src={productDemo} alt="Product demo" className="w-96 rounded-xl"/>
        <div>
          <h1 className="text-4xl font-extrabold mb-6">
            Collect customer feedback to build better products
          </h1>
          <div className="opacity-90 mb-10">
            Create a feedback board in minutes, prioritize features, and build
            products your customers will love.
          </div>

          <ButtonLogin session={session} />
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-base-200" id="pricing">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            A pricing that adapts to your needs
          </h2>
          <div className="p-8 bg-base-100 max-w-96 rounded-3xl max-auto space-y-6">
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black">$19</div>
              <div className="uppercase text-sm font-medium opacity-60">
                /month
              </div>
            </div>

            <ul className="space-y-2">
              {pricingFeaturesList.map((priceItem) => {
                return <ListItem key={priceItem}>{priceItem}</ListItem>;
              })}
            </ul>

            <ButtonLogin session={session} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200" id="faq">
        <div className="py-32 px-8 mx-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center">FAQ</p>
          <h2 className="text-center text-3xl lg:text-4xl font-extrabold mb-12">
            Frequently Asked Questions
          </h2>

          <ul className="max-w-lg mx-auto">
            {[
              { question: "What do I get exactly?", answer: "A" },
              { question: "Can I get a refund", answer: "A" },
              { question: "I hace another question", answer: "A" },
            ].map((qa) => (
              <FAQListItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
