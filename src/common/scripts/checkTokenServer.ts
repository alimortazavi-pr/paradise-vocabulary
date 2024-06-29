import * as fs from "fs";

//Types
import { IUserAuth } from "../interfaces";

export async function checkToken(token: string | null) {
  if (token === null) {
    return { status: false, message: "Token is null" };
  }
  const usersJson = fs.readFileSync(
    process.cwd() + "/src/db/users.json",
    "utf8"
  );
  let users = JSON.parse(usersJson).users as IUserAuth[];

  //Check users
  const user = await users.find((user) => user.token.token === token);
  if (user) {
    if (user.token.expires > new Date().getTime())
      return { status: true, message: { user } };
    else return { status: false, message: "Token expired" };
  } else {
    return { status: false, message: "User is not exists" };
  }
}
