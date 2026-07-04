import { AiOutlineLike } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import { FaComment } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const PostDetails = () => {
  return (
    <div className="body-width">
      <h1 className="heading-main p-4">
        Lorem ipsum do0lor sit amet consectetur adipisicing elit. Dolores, sit?
      </h1>
      <div className="w-full px-6 flex flex-wrap items-center justify-between border-t border-b border-border py-4 gap-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-body-text text-base">
              Post By <span className="text-brand">Usama</span>
            </p>
          </div>

          <div className="flex items-center gap-1 text-muted-text">
            <span className="opacity-50 text-xl">
              <GoDotFill />
            </span>
            <p>10 mins ago</p>
          </div>
        </div>
        <button className="flex items-center gap-2 btn-md btn-icon">
          <span className="text-md">Comment on this Post</span>
          <span className="text-md">
            <FaComment />
          </span>
        </button>
        <button className="flex items-center gap-2 btn-md btn-icon">
          <span className="text-md">Share this Post</span>
          <span className="text-md">
            <CiShare1 />
          </span>
        </button>

        <button className="flex items-center gap-2 btn-md btn-icon">
          <span className="text-md">Like this Post</span>
          <span className="text-md">
            <AiOutlineLike />
          </span>
        </button>
      </div>
      <p className="prose-text p-4 font-article">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quod
        adipisci qui, modi maiores iure nesciunt laudantium in odio ipsum amet,
        officia cupiditate numquam sunt ullam quibusdam unde ut. Modi saepe fuga
        asperiores itaque nostrum distinctio vitae similique voluptas earum,
        laudantium veritatis, provident hic autem ullam incidunt ea facilis
        optio at illum fugiat in omnis unde quam. Omnis suscipit consectetur
        voluptatem porro id distinctio assumenda quibusdam sunt veniam vel vitae
        cupiditate, delectus temporibus neque error, corrupti praesentium sed
        impedit ut dolorum. Numquam et vitae aut esse eius reprehenderit odit
        aliquam, quidem dicta ipsam consequuntur asperiores laboriosam labore
        similique libero suscipit!
      </p>
    </div>
  );
};

export default PostDetails;
