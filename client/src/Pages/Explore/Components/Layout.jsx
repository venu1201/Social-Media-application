import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useNavigate } from "react-router-dom";
const Layout = ({ posts, loading }) => {
    const navigate = useNavigate();
    const items = Array.from({ length: 30 }).map((_, index) => (
        <div
            key={index}
            className="bg-blue-950 animate-pulse"
            style={{
                height: index % 2 ? "300px" : "350px",
                
            }}
        />
    ));
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4, 1300: 5 }}
        >
            {loading === true ? (
                <Masonry
                    gutter="10px"
                >
                    {items}
                </Masonry>
            ) : (
                <Masonry
                    gutter="20px"
                >
                    {posts.map((item, index) => (
                        <div key={index} onClick={() => navigate(`/Post/${item._id}`)} className={`shadow-sm shadow-black`}>
                            <img className='w-full object-fill' src={item.selectedfile} alt="" />
                        </div>
                    ))}
                </Masonry>
            )}

        </ResponsiveMasonry>
    );

}

export default Layout