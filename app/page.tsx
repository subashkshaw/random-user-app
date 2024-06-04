import Image from "next/image";
import Users from "./Users";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  justify-between p-24">
      <Users />
    </main>
  );
}
