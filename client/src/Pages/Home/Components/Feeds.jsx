import React, { useEffect, useState } from 'react';
import { getposts } from '../../../api';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '../../../components/Spinner/Spinner';
import PostCard from './PostCard';

const Feeds = () => {
  const authData = useSelector((state) => state.authData);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more posts exist

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getposts(page, authData.username);
        setPosts((prevPosts) => [...prevPosts, ...response.data.posts]); // Append posts
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.nextPage); // Update hasMore based on API response
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const fetchNextPage = async () => {
    console.log('Fetching next page:', page);
    try {
      const response = await getposts(page, authData.username);
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(response.data.nextPage);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  console.log(posts)
  return (
    <div id='parent' className='w-full overflow-scroll h-full flex justify-center'>
      <div  className='Large:w-[90%] w-full   xmedium:pt-[10px] pb-[50px]  h-full '>
        {loading === true && (
          <div className=' w-full gap-4 flex items-center flex-col'
          >
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className='text-white  rounded-3xl bg-blue-950 animate-pulse w-[600px] min-h-[650px] flex '>
                           
                </div>
            ))}

          </div>
        )}
        {loading === false && (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchNextPage}
            // refreshFunction={fetchNextPage}
            // pullDownToRefresh
            // pullDownToRefreshThreshold={50}
            // pullDownToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            // }
            // releaseToRefreshContent={
            //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            // }

            hasMore={hasMore} // Use hasMore state for accurate loading
            loader={
              <div className='w-full justify-center flex items-center'>
                <LoadingSpinner />

              </div>
            }
            scrollThreshold={0.95}
            endMessage={
              <div className='h-[300px] flex justify-center items-center' >
                {posts.length === 0 ? (
                  <span className='text-cyan-600 text-[30px]'>
                    Build Your Network To view Feeds...
                  </span>
                ) : (
                  <span className='text-cyan-600 text-[30px]'>
                    Build Your Network to View more...
                  </span>
                )}


              </div>
            }
            scrollableTarget="parent"
            className=' w-full h-full  justify-center items-center  gap-4 flex flex-col'
          >
            {posts.map((item, index) => (
              <div key={index} className='text-white xmedium:rounded-3xl  large:w-[580px] xSmall:w-[520px] xsmall:w-[580px] xmedium:w-[510px] medium:w-[98%] w-full bg-black medium:px-[20px] px-[10px] flex justify-center items-center'>
                <PostCard item={item} />
              </div>
            ))}

          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Feeds;
