import { NextResponse } from "next/server";
import * as fs from "fs";

//Types
import { IUserAuth, IWord } from "@/common/interfaces";

//Scripts
import { checkToken } from "@/common/scripts/checkTokenServer";

export async function PUT(
  request: Request,
  { params }: { params: { wordId: string } }
) {
  const { wordId } = params;

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
  const findWord = words.find(
    (word) => word.id === wordId && word.user === user
  );
  if (!findWord) {
    return new Response("The word not found", {
      status: 400,
    });
  }
  const editedWord: IWord = {
    id: wordId,
    user: user,
    english: body.english,
    persian: body.persian,
    description: body.description,
    important: body.important,
  };
  words = words.map((word) =>
    word.id === wordId && word.user === user ? editedWord : word
  );

  fs.writeFileSync(
    process.cwd() + "/src/db/words.json",
    JSON.stringify({ words })
  );

  return NextResponse.json({ word: editedWord });
}

export async function DELETE(
  request: Request,
  { params }: { params: { wordId: string } }
) {
  const { wordId } = params;

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
  let words = (await JSON.parse(wordsJson).words) as IWord[];
  const findWord = words.find(
    (word) => word.id === wordId && word.user === user
  );
  if (!findWord) {
    return new Response("The word not found", {
      status: 400,
    });
  }
  words = words.filter((word) => word.id !== wordId && word.user === user);

  fs.writeFileSync(
    process.cwd() + "/src/db/words.json",
    JSON.stringify({ words })
  );

  return NextResponse.json({ message: "Deleted" });
}
