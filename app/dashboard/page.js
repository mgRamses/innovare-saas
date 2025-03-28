import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonPortal from "@/components/ButtonPortal";

async function getUser() {
  const session = await auth();
  await connectMongo();
  return await User.findById(session.user.id).populate("boards");
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <main className="bg-base-200 min-h-screen">
      {/* HEDAER */}
      <section className="bg-base-100  ">
        <dvi className="max-w-5xl mx-auto flex justify-between px-5 py-3">
          {user.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
          <ButtonLogout />
        </dvi>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-12">
        <FormNewBoard />

        <div>
          <h1 className="font-extrabold text-xl mb-4">
            {user.boards.length} Boards
          </h1>

          <ul className="space-y-4">
            {user.boards.map((board) => {
              return (
                <Link href={`/dashboard/b/${board._id}`} key={board._id}>
                  <li className="bg-base-100 p-6 mb-3 rounded-3xl hover:bg-neutral hover:text-neutral-content duration-200">
                    {board.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
