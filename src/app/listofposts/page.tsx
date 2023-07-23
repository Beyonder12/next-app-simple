import Image from "next/image";
import {next} from "sucrase/dist/types/parser/tokenizer";

const getPostsData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com")
    return res.json(); 
}

const getUsersData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    return res.json(); 
}

const getDogData = async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random", {
        // next : {
        //     revalidate : 10
        // }
        cache: "no-store"

    }
        // {cache: "no-store"}
    )
    return res.json();
}

export default async function ListOfPosts() {
    // const posts = await getPostsData();
    // const users = await getUsersData();
    const [posts, users, dog] = await Promise.all([getPostsData(), getUsersData(), getDogData()]);
    // posts.map((post : any) => {
    //     console.log(post)
    // })
    // console.log(posts)
    // users.forEach((user:any) => {
    //     console.log(user.name)
    // })
    console.log(users)
    return (
        <div>
            <Image src={dog.message} alt={"dog"} width={300} height={300}/>
            <h1>
                {posts.map((post:any) => {
                    return <p>{post.title}</p>
                })}
            </h1>
            <h1>
                {users.map((user:any) => {
                    return <p>{user.name}</p>
                })}
            </h1>
        </div>
    )
}