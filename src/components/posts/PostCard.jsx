import React from "react";

const PostCard = () => {
  return (
    <div className="max-w-140 bg-secondary rounded-lg shadow-sm p-3 md:p-6">
      <div className="flex  flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-full sm:w-32 h-40 sm:h-32 bg-fuchsia-300 rounded-xl shrink-0 flex items-center justify-center">
            Image
          </div>

          <div className="flex flex-col w-full">
            <div className="flex items-center gap-3 text-muted-text text-xs mb-2">
              <span>Technology</span>
              <hr className="grow border-border" />
              <span>25/4/2027</span>
            </div>
            <div className="heading-card text-xl font-bold">
              Lorem ipsum dolor sit amet.
            </div>
          </div>
        </div>

        <div className="prose-text font-article text-sm md:text-base">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id,
            exercitationem sequi vero unde dolorem vitae consequatur cupiditate
            rerum ratione vel.
          </p>
        </div>

        <div className="w-full flex justify-end">
          <button className="text-link hover:text-link-hover font-semibold">
            read more...
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
