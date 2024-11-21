import React from "react";

const BlogSection = () => {
    return (
        <section className="container blog">
            <h1>Blog</h1>
            <div className="blog-content">
                <div className="content">
                    <h1>Disini banyak informasi yang bisa kamu dapatkan - seputar konser, musik, dan lain-lain</h1>
                    <p>
                        Konser berasal dari bahasa Italia: concerto dan bahasa Latin: concertare yang berarti
                        berjuang, bersaing dengan orang lain. Konser adalah pertunjukan langsung, biasanya musik, di
                        depan penonton.
                    </p>
                    <button className="button" onClick={() => window.location.href = '../Detail/blogdetail.html'}>
                        Baca
                    </button>
                </div>
                <div className="image">
                    <img src="assets/Bernadya 1.webp" alt="Banner" />
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
