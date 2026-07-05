import React from "react";

const PostCard = () => {
  return (
    <div className="bg-secondary rounded-lg shadow-sm p-8">
      <div className="w-120 flex flex-col items-center justify-center ">
        <div className="h-40 w-full flex justify-center items-start gap-2 ">
          <div className="w-30 h-30 bg-fuchsia-300 rounded-xl">
            Image container
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-full flex  items-center justify-start gap-3 text-muted-text text-xs">
              <span>Category</span>
              <hr className="w-25 h-1 mx-4" />
              <span className="">Date</span>
            </div>
            <div className="w-full heading-card">
              Lorem ipsum dolor sit amet.
            </div>
          </div>
        </div>
        <div className="prose-text font-article">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id,
            exercitationem sequi vero unde dolorem vitae consequatur cupiditate
            rerum ratione vel.
          </p>
        </div>
        <div className="w-full flex justify-end">
          <p className="text-link hover:text-link-hover">read more...</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
