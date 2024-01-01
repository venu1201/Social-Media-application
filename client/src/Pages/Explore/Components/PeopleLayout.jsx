import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Networkbox from "./Networkbox";
const Layout = ({ posts,func2 }) => {

    return (
        
            <Masonry
                gutter="10px"
                columnsCount={3}
            >
                {posts.map((item, index) => (
                    <Networkbox handlebutton={func2} item={item} key={index} />
                    // <div key={index} onClick={()=>navigate(`/Post/${item._id}`)} className={`w-[200px] h-[200px]`}>
                    //     <img className='w-full h-full object-fill' src={item.profilepicture || avatar} alt="" />
                    // </div>
                ))}
            </Masonry>

    );

}

export default Layout