import { Image } from "react-bootstrap"
import UserType from "../types/auth"

type HomeProps = {
    loggedInUser: Partial<UserType>|null
}


export default function Home({ loggedInUser }: HomeProps) {
  return (
    <>
    { loggedInUser && <h1>Hello {loggedInUser?.first_name}, Welcome to Quiz-Up!</h1>}
    <Image src='src\components\quizmasterrobot.jpg' roundedCircle></Image>
    </>
  )
}