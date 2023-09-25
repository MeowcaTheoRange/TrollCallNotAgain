export async function POST(
  request: Request,
  { params }: { params: { user: string } }
) {
  return new Response("", {
    status: 404,
  });
  // const body = await request.json();
  // const checkUserResponse = await UserAuthWall(params.user);
  // if (typeof checkUserResponse !== "object")
  //   return new Response(checkUserResponse, {
  //     status: 403,
  //   });
  // let troll: any;
  // try {
  //   troll = await SubmitTrollToServerTroll(body, checkUserResponse);
  // } catch (err) {
  //   console.log(err);
  //   return new Response((err as Error | ValidationError).message, {
  //     status: 400,
  //   });
  // }
  // // quickly, check if troll with name exists!
  // var existingTroll = await getTrollByName(troll.name[0], checkUserResponse);
  // if (existingTroll?.name[0] == troll.name[0]) {
  //   // remove admin-set values from the troll
  //   delete troll._id;
  //   delete troll.flairs;

  //   var merge: ServerTroll = { ...existingTroll, ...troll };

  //   if (merge.flairs == null) merge.flairs = [];
  //   merge.updatedDate = new Date();

  //   var newTroll = await replaceOne(
  //     "trolls",
  //     { "name.0": troll.name[0] },
  //     merge // merge them.
  //   );
  //   return NextResponse.json(troll);
  // }

  // // Don't leave with no flairs!
  // troll.flairs = [];
  // troll.updatedDate = new Date();
  // //ok, now post
  // await createOne("trolls", troll);
  // return NextResponse.json(troll);
}
