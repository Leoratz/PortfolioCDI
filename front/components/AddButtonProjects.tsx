import Link from "next/link";

export default function AddButtonFix() {
  return (
    <>
      <Link
        href="/admin/project/add"
        className="bg-orange-500 text-white p-2 rounded-full fixed bottom-8 right-8 shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 rounded-full text-bold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Link>
    </>
  );
}
