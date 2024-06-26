import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
function AllPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    const filteredPosts = posts.documents.filter(post => post.userId === userData.$id);
                    setPosts(filteredPosts);
                }
            });
        }
    }, [userData]);


    if (posts.length === 0) {
        return (
            <>
                <div className="flex flex-col items-center justify-center mt-1 mb-2">
                    <img
                        src="https://illustrations.popsy.co/amber/taking-notes.svg"
                        alt="No Articles Illustration"
                        className=" w-2/6"
                    />
                    <h2 className="mt-4 text-black text-2xl font-semibold">
                        Loading the articles..
                    </h2>
                    <p className="text-black text-lg text-center mt-2">
                        {/* It looks like there are no articles available at the moment. */} Till then..
                        <br /> Why not start creating your own masterpiece?
                    </p>
                </div>
            </>
        )
    }
    return (
        <div className='w-full py-16'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

            </Container>
        </div>
    )
}

export default AllPosts