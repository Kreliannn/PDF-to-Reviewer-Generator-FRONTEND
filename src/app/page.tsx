import Link from "next/link";

export default function Home() {
  return (
    <div>
        <Link  className="bg-red-500 m-5 "href="/pages/generatorUpload"> generate reviewer </Link>
        <Link  className="bg-blue-500 m-5 "href="/pages/quizUpload"> take reviewer </Link>
    </div>
  );
}
