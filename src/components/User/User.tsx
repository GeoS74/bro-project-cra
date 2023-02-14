import { useLoaderData } from "react-router-dom";

export default function User() {
  console.log(useLoaderData())
  return <h1>
    user page
  </h1>
}