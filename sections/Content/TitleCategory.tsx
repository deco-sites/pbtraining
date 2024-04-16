
export const loader = (_props: unknown, req: Request) => {
  const url = new URL(req.url);
  const pathName = url.pathname;
  const pathArray = pathName.split("/");
  const length = pathArray.length;
  const lastPath = pathArray[length-1];
  console.log("LASTPATH", lastPath);
  console.log("URL", pathName);
  return {
    title: lastPath,
  };
};

export default function TitleCategory({ title }: Props) {
  return (
    <div class="container px-4 sm:py-10">
      <div class="uppercase text-2xl font-bold">{title}</div>
    </div>
  );
}

interface Props {
  title: string;
}
