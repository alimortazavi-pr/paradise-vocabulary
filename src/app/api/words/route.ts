import { NextResponse } from "next/server";
import * as fs from "fs";

//Types
import { IUserAuth, IWord } from "@/common/interfaces";

//Scripts
import { checkToken } from "@/common/scripts/checkTokenServer";

export async function GET(request: Request) {
  const token = request.headers.get("token");
  const checkTokenResponse = await checkToken(token);
  if (!checkTokenResponse.status) {
    return new Response(checkTokenResponse.message as string, { status: 401 });
  }
  const user = (checkTokenResponse.message as { user: IUserAuth }).user.mobile;

  const wordsJson = await fs.readFileSync(
    process.cwd() + "/src/db/words.json",
    "utf8"
  );
  const words = (await JSON.parse(wordsJson).words) as IWord[];

  return NextResponse.json({
    words: words.filter((word) => word.user === user),
  });
}

export async function POST(request: Request) {
  const token = request.headers.get("token");
  const checkTokenResponse = await checkToken(token);
  if (!checkTokenResponse.status) {
    return new Response(checkTokenResponse.message as string, { status: 401 });
  }
  const user = (checkTokenResponse.message as { user: IUserAuth }).user.mobile;

  const body = await request.json();
  if (
    !body.english ||
    !body.persian ||
    body.description === undefined ||
    body.important === undefined
  ) {
    return new Response("The entered information is incorrect", {
      status: 400,
    });
  }

  const wordsJson = await fs.readFileSync(
    process.cwd() + "/src/db/words.json",
    "utf8"
  );
  let words = (await JSON.parse(wordsJson).words) as IWord[];
  const newWord: IWord = {
    id: body.english + new Date().getTime(),
    user: user,
    english: body.english,
    persian: body.persian,
    description: body.description,
    important: body.important,
  };
  words.push(newWord);

  fs.writeFileSync(
    process.cwd() + "/src/db/words.json",
    JSON.stringify({ words })
  );

  return NextResponse.json({ word: newWord });
}
