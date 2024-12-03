import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [totalResult, settotalResult] = useState(0)
  const [page, setpage] = useState(1)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let passdata = await data.json();
    props.setProgress(70);
    setarticles(passdata.articles)
    settotalResult(passdata.totalResults)
    setloading(false)
    props.setProgress(100);
  };


  useEffect(() => {
    updateNews()
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    // eslint-disable-next-line
  }, [])


  const fetchMoreData = async () => {
    console.log("fetch funcion")
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setpage(page + 1)
    let data = await fetch(url);
    let passdata = await data.json();
    setarticles(articles.concat(passdata.articles))
    settotalResult(passdata.totalResults)
  };


  return (
    <>
      <h1 className='text-center' style={{ margin: '80px 0px 30px 0px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResult}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row my-4'>
            {articles.filter(element => element.url !== "https://removed.com" || element.title !== "[Removed]").map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItems title={element.title ? element.title.slice(0, 45) : element.title = "null"} description={element.description ? element.description.slice(0, 100) : element.description = "Null"}
                  imgUrl={element.urlToImage !== null ? element.urlToImage : element.urlToImage = "https://yewthmag.com/wp-content/uploads/2024/07/Screenshot-2024-07-12-185629.png"}
                  newsUrl={element.url} author={element.author ? element.author : element.author = "Unknown"} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}


News.defaultProps = {
  country: 'in',
  category: 'general',
  pageSize: 6
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

export default News;

