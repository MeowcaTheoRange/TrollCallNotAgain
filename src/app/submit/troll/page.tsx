import UserAuthWall from "@/components/UserAuthWall/UserAuthWall";
import Form from "./form";

export default async function TrollSubmit() {
  return await UserAuthWall(<Form />);
}
