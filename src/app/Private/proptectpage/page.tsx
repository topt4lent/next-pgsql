// pages/protectedPage.js
import { getSession } from "next-auth/react";

function ProtectedPage({ user: any }) {
  return (
    <div>
      <p>Hello, {user.name}!</p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login", // Redirect to login page if not authenticated
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}

export default ProtectedPage;
