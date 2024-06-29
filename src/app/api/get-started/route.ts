import * as fs from "fs";
import { NextResponse } from "next/server";

//Types
import { IUserAuth } from "@/common/interfaces";

//Scripts
import { checkToken } from "@/common/scripts/checkTokenServer";

export async function GET(request: Request) {
  const token = request.headers.get("token");
  const checkTokenResponse = await checkToken(token);
  if (!checkTokenResponse.status) {
    return new Response(checkTokenResponse.message as string, { status: 401 });
  }

  return NextResponse.json({
    user: (checkTokenResponse.message as { user: IUserAuth }).user.mobile,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (
    !body.mobile ||
    body.mobile.length !== 11 ||
    !body.password ||
    body.password.length < 6
  ) {
    return new Response("The entered information is incorrect", {
      status: 400,
    });
  }

  const usersJson = fs.readFileSync(
    process.cwd() + "/src/db/users.json",
    "utf8"
  );
  let users = JSON.parse(usersJson).users as IUserAuth[];
  let token;

  //Check users
  const user = await users.find((user) => user.mobile === body.mobile);
  if (user) {
    if (user.password !== body.password) {
      return new Response("The password is incorrect", { status: 401 });
    }
    token = user.token.token;
    if (user.token.expires < new Date().getTime()) {
      token = user.mobile + new Date().getTime();
      user.token = {
        token: token,
        expires: new Date().getTime() + 1000 * 3600 * 24 * 90,
      };
      fs.writeFileSync(
        process.cwd() + "/src/db/users.json",
        JSON.stringify({ users })
      );
    }
    return NextResponse.json({
      token,
    });
  } else {
    token = body.mobile + new Date().getTime();
    users.push({
      ...body,
      token: {
        token: token,
        expires: new Date().getTime() + 1000 * 3600 * 24 * 90,
      },
    });
    fs.writeFileSync(
      process.cwd() + "/src/db/users.json",
      JSON.stringify({ users })
    );
  }

  return NextResponse.json({
    token,
  });
}
