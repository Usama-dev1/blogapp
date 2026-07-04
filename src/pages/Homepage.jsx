import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex items-center h-screen justify-center">
        <div className="body-container bg-secondary">
          <h1 className="heading-main">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            sit?
          </h1>
          <p className="prose-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quod adipisci qui, modi maiores iure nesciunt laudantium in odio
            ipsum amet, officia cupiditate numquam sunt ullam quibusdam unde ut.
            Modi saepe fuga asperiores itaque nostrum distinctio vitae similique
            voluptas earum, laudantium veritatis, provident hic autem ullam
            incidunt ea facilis optio at illum fugiat in omnis unde quam. Omnis
            suscipit consectetur voluptatem porro id distinctio assumenda
            quibusdam sunt veniam vel vitae cupiditate, delectus temporibus
            neque error, corrupti praesentium sed impedit ut dolorum. Numquam et
            vitae aut esse eius reprehenderit odit aliquam, quidem dicta ipsam
            consequuntur asperiores laboriosam labore similique libero suscipit!
          </p>
        </div>
        {/* //comments */}
        <div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
