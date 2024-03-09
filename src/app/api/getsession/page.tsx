import { getServerSession } from "next-auth/client";

export default async function getSession(req, res) {
  const session = await getServerSession({ req });

  if (session) {
    // Access session data here
    res.status(200).json({ message: "Welcome, " + session.user.email });
  } else {
    // User is not authenticated
    res.status(401).json({ message: "You need to be logged in" });
  }
}
