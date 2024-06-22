import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import logo from '../components/Assets/logo.jpg';
import { useAuth } from '../contexts/authContext/index';
import Login from '../components/auth/login/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addpage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [maxId, setMaxId] = useState(0);
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getbgposts');
        if (response.data.length > 0) {
          const maxId = Math.max(...response.data.map(post => post.id));
          setMaxId(maxId);
        }
      } catch (error) {
        console.error('Error fetching max id:', error);
      }
    };

    fetchMaxId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newId = maxId + 1;

    try {
      const response = await axios.post('http://localhost:5000/blogposts', {
        id: newId,
        title,
        author,
        content,
        tags: tags.split(',').map(tag => tag.trim()), 
      });

      toast.success("Blog post created successfully!");
      setMaxId(newId);
      setTitle('');
      setAuthor('');
      setContent('');
      setTags('');
    } catch (error) {
      toast.error("Error creating blog post");
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <div>
      {userLoggedIn ? (
        <>
          <div>
            <Navbar />
            <div id="middle">
              <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                  <div className="mx-auto max-w-max rounded-md border bg-gray-50 p-1 px-3">
                    <p className="text-center text-xs font-semibold leading-normal md:text-sm">
                      Share your thoughts
                    </p>
                  </div>
                  <p className="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                    Love to hear from you
                  </p>
                  <p className="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
                    Unleash your creativity and share your passions with the world through blogging! Dive into a platform where your voice matters, ideas flourish, and connections spark. Start your journey today!
                  </p>
                </div>
                <div className="mx-auto max-w-7xl py-12 md:py-24">
                  <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                    <div className="flex items-center justify-center">
                      <div className="px-2 md:px-12">
                        <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                          Get in touch
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                          Our friendly team would love to hear from you.
                        </p>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                          <div className="grid gap-y-4 p-2">
                            <div className="grid w-full items-center gap-1.5">
                              <label
                                className="text-sm font-medium pl-4 leading-none text-gray-700"
                                htmlFor="author"
                              >
                                Name
                              </label>
                              <input
                                className="text-black flex h-10 w-full rounded-full border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                type="text"
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                                placeholder="Enter author Name"
                              />
                            </div>
                          </div>
                          <div className="grid gap-y-4 p-2">
                            <div className="grid w-full items-center gap-1.5">
                              <label
                                className="text-sm font-medium pl-4 leading-none text-gray-700"
                                htmlFor="title"
                              >
                                Title
                              </label>
                              <input
                                className="flex w-full rounded-full border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Enter Title"
                              />
                            </div>
                          </div>
                          <div className="grid gap-y-4 p-2">
                            <div className="grid w-full items-center gap-1.5">
                              <label
                                className="text-sm font-medium pl-4 leading-none text-gray-700"
                                htmlFor="content"
                              >
                                Message
                              </label>
                              <input
                                className="flex w-full rounded-full border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                placeholder="Add Content"
                              />
                            </div>
                          </div>
                          <div className="grid gap-y-4 p-2">
                            <div className="grid w-full items-center gap-1.5">
                              <label
                                className="text-sm pl-4 font-medium leading-none text-gray-700"
                                htmlFor="tags"
                              >
                                Tags
                              </label>
                              <input
                                className="flex h-10 w-full rounded-full border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                type="text"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                required
                                placeholder="Tags (Comma-separated)"
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="w-full rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          >
                            Create a Blog
                          </button>
                        </form>
                      </div>
                    </div>
                    <img
                      alt="Contact us"
                      className="w-3/4 rounded-2xl object-cover lg:block"
                      src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=687&amp;h=800&amp;q=80"
                    />
                  </div>
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Addpage;
