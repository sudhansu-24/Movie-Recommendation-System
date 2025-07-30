import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

function SearchInput() {
  async function searchAction(formData: FormData) {
    "use server";

    const searchTerm = formData.get("searchTerm") as string;

    redirect(`/search/${searchTerm}`);
  }

  return (
    <form
      action={searchAction}
      className="w-full flex items-center px-5 rounded-full border-dark-border bg-dark-accent border shadow-lg"
    >
      <Link href="/">
        <HomeIcon className="h-10 w-10 text-dark-muted hover:text-purple-400 transition-colors duration-200" />
      </Link>
      <input
        type="text"
        className="flex-1 p-5 outline-none text-dark-text bg-transparent placeholder-dark-muted"
        name="searchTerm"
        placeholder="Discover your next favorite movie... Try 'space adventures' or 'romantic comedies'"
      />
    </form>
  );
}

export default SearchInput;
