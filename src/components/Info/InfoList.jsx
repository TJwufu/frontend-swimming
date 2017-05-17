import React, { PropTypes } from 'react';
import style from './InfoList.less';
import { Link } from 'dva/router';

const InfoList = ({ dataSource }) => {
  if (!dataSource) {
	  dataSource = [];
  }
  return (
    <div>
      {
    	dataSource.map((ele, index) => (
    	  <Link to={`/news/${ele.id}`}  style={{color: '#333'}} key={ele.id}>
          <div className={style.item}>
            <figure>
              <img src={ele.topImageUrl} alt=""/>
            </figure>
            <section className={style.content}>
              <header>
                <h4 className={style.title}>{ele.title}</h4>
                <p className={style.time}>{ele.issuingTime}</p>
              </header>
              <article>
                <span wrap="false" className={style.infoContent}>{ele.content.length > 25 ? `${ele.content.slice(0,25)}...` : ele.content}</span>
              </article>
            </section>
          </div>
          </Link>
        ))
      }
    </div>
  )
};

export default InfoList;
