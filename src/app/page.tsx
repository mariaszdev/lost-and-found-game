import LostItemsGame from '@/components/LostItemsGame';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        <div className="flex gap-3">
          <Image
            src="/icons/search-cat-icon.png"
            width={30}
            height={30}
            alt="cat with magnifying glass icon"
          />
          Lost & Found Game
        </div>
      </h1>
      <LostItemsGame />
    </main>
  );
}
