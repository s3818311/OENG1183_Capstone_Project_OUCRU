import React from "react";
import blog1 from "../../assets/landing/blog1.jpeg";
import blog2 from "../../assets/landing/blog2.png";
import blog3 from "../../assets/landing/blog3.jpeg";
import blog4 from "../../assets/landing/blog4.png";
import blog5 from "../../assets/landing/blog5.jpeg";
import "../../styles/landing/blog.css";
import "../../styles/landing/article.css";

const Article = ({ imgUrl, date, text }) => (
  <div className="gpt3__blog-container_article">
    <div className="gpt3__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="gpt3__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <p>Read Full Article</p>
    </div>
  </div>
);

const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">
        {" "}
        Our available dataset and visualization
      </h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Article
          imgUrl={blog1}
          date="July 20, 2022"
          text="Dengue's population of all wards in Ho Chi Minh"
        />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Article
          imgUrl={blog2}
          date="July 19, 2022"
          text="Dengue's population of all wards in Ho Chi Minh"
        />
        <Article
          imgUrl={blog3}
          date="July 19, 2022"
          text="Rainfall Data in Ho Chi Minh and Ha Noi"
        />
        <Article
          imgUrl={blog4}
          date="July 19, 2022"
          text="Dengue's population of all wards in Ha Noi"
        />
        <Article
          imgUrl={blog5}
          date="July 19, 2022"
          text="Aphrodite data in geonomic data, available for both Ho Chi Minh and Ha Noi"
        />
      </div>
    </div>
  </div>
);

export default Blog;
