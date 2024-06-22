//cards
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Navbar from './Navbar';
import { useAuth } from '../contexts/authContext/index'
import Login from './auth/login/index';

const Cardblock = () => {

  const {userLoggedIn} = useAuth();

  const [blogPosts, setBlogPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12); 
  const [updateId, setUpdateId] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRemoveBlogPost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blogposts/${id}`);
      setBlogPosts(blogPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error removing blog post:', error);
    }
  };

  const handleUpdateBlogPost = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/blogposts/${id}`, {
        title,
        author,
        content
      });
      console.log('Blog post updated successfully:', response.data);
      setUpdateId(null);
    } catch (error) {
      console.error('Error updating blog post:', error);
      setError('Error updating blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchQuery.trim() !== '') {
          response = await axios.get(`http://localhost:5000/getbgposts?query=${searchQuery}`);
        } else {
          response = await axios.get('http://localhost:5000/getbgposts');
        }
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchQuery]);

  // Handle pagination functions...
  const handleEdit = (id, title, author, content) => {
    setUpdateId(id);
    setTitle(title);
    setAuthor(author);
    setContent(content);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    {userLoggedIn ? 
      <>
      <div id="1">
      <Navbar/>
      <div>
        
        <div className="mx-auto max-w-7xl px-2">
          <div className="flex flex-col space-y-8 pb-10  px-4 pt-12 md:pt-24">
            <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
              Resources and insights
            </p>
            <p className="max-w-4xl text-base text-gray-600 md:text-xl">
              Blogs offer a goldmine of resources and insights spanning diverse topics. From DIY hacks to scholarly discussions, they're reservoirs of knowledge. Dive in for expert advice, personal anecdotes, and cutting-edge research, enriching your understanding and broadening your horizons.
            </p>
            <div className="mt-6 flex w-full items-center space-x-2 md:w-1/3">
              <input
                className="flex h-10 w-full rounded-full border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Search blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="rounded-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Search
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 p-4 gap-4 bg-white'>
            {currentPosts.map(post => {
              const { _id: id, title: postTitle, author: postAuthor, content: postContent } = post;
              const isEditing = id === updateId;

              return (
                <div key={id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-2xl hover:bg-gray-300">
                  {isEditing ? (
                    <form onSubmit={() => handleUpdateBlogPost(id)}>
                      <input
                        className='block mb-4 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs '
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                      <input
                        className='block mb-4 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs'
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                      />
                      <textarea
                        className='block mb-4 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs'
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      ></textarea>
                      <button
                        className='text-gray-900 bg-gray-600 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Updating...' : 'Update'}
                      </button>
                    </form>
                  ) : (
                    <>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{postTitle}</h5>
                      <p className="font-normal mb-2 text-gray-700 ">By {postAuthor}</p>
                      <p className="font-normal mb-6 text-gray-700 ">{postContent}</p>
                      <div className='flex justify-items items-center h-[50px] w-auto'>
                        <button
                          className='text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-2 me-2 mb-2'
                          onClick={() => handleRemoveBlogPost(id)}
                        >
                          Remove
                        </button>
                        <button
                          className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                          onClick={() => handleEdit(id, postTitle, postAuthor, postContent)}
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full px-5 border-t border-gray-300">
            <div className="mt-2 flex items-center justify-between">
              <div className="hidden md:block">
                <p>
                Showing <strong>{indexOfFirstPost + 1}</strong> to{' '}
                  <strong>{Math.min(indexOfLastPost, blogPosts.length)}</strong> of{' '}
                  <strong>{blogPosts.length}</strong> results
                  </p>
              </div>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastPost >= blogPosts.length}
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
      </> 
      
      :
       <>
      {<Login/>}
      </>}
    </>
  );
};

export default Cardblock;
