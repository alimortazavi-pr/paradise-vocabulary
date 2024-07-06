import { cookies, headers } from "next/headers";

//Types
import { IWord } from "@/common/interfaces";

//Components
import { HomeProvider } from "@/components/pages/home";

//Services
import { url } from "@/services/url";

async function getData() {
  let words: IWord[] = [];
  const userAuthorization = cookies().get("userAuthorization");
  if (userAuthorization) {
    const transformedData = JSON.parse(userAuthorization.value);
    try {
      const res = await fetch(`${url}/words`, {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${transformedData.token}`,
        },
      });
      await res.json().then((data) => {
        words = data.words;
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  return { words };
}

const Home = async () => {
  const { words } = await getData();

  return <HomeProvider words={words} />;
};

export default Home;
