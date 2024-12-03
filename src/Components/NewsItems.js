import React from 'react'

const NewsItems = (props) => {
  let { title, description, imgUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3 '>
      <div className="card">
        <div style={{
          display: 'flex',
          position: 'absolute',
          right: '0'
        }}>
          <span className=" badge rounded-pill bg-danger" >{source}</span></div>

        <img className="card-img-top" src={imgUrl} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleDateString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItems;