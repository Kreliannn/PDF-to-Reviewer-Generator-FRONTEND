import Link from "next/link";

export default function Home() {
  return (
    <div>
        <Link href="/pages/generatorUplaod"> generate reviewer </Link>
        <Link href="/pages/quizUpload"> take reviewer </Link>
    </div>
  );
}
