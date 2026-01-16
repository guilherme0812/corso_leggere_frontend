import Content from "./_components/Content";

async function Page({}: { searchParams: { [key: string]: string } }) {
  return (
    <div>
      <Content />
    </div>
  );
}

export default Page;
