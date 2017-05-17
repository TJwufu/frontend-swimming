import React, {
  Component,
  PropTypes,
} from 'react';
import { NavBar } from 'antd-mobile';
import LazyLoad from 'react-lazyload';
import styles from './CoachTop.less';

const renderContent = (index, isLifeSaver, rowData) => {
  const rowObj = rowData;
  if(rowObj == null || rowObj.id == null){
	  return <div style={{ padding: '10px' }}>未查到数据，请返回上一页</div>
  }
  let certificateArr = rowObj.coachCertificates == null ? []:rowObj.coachCertificates;
  return <div className={styles.describe_container}>
    <div>{rowObj.name}</div>
    <p className={styles.describe_p}>&nbsp;&nbsp;{rowObj.genderDesc} , 出生年月 {rowObj.birth} , {rowObj.levelDesc} ,<span dangerouslySetInnerHTML={{__html: rowObj.introduction }} />
    </p>

    <div className={styles.certificate_title}>{rowObj.coachCertificates ==null?"":"证书/资格证："}</div>
    <div className={styles.describe_img}>
        {
    	  certificateArr.map((ele, index) => (
    	    <figure key={index}>
    	      <img src={ele.fileUrl} alt="certificate"/>
    	    </figure>
    	  ))
        }
    </div>
  </div>
  };

class CoachTop extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      index: props.isLifeSaver ? 0 : 0,
      rowData: this.props.dataList ==null ?{}:this.props.dataList[0]
    };
  }

  handleChange(e) {
    let index = e.target.id;
    if (this.state.index != index)
      this.setState({
        index: index,
        rowData: this.props.dataList[index]
      });
  }

  render() {
	const dataList = this.props.dataList == null?[]:this.props.dataList;
    return (
      <div className={styles.top_container}>
        <div className={styles.top_img_container}>
        {
        	dataList.map((ele, index) => (
      	          <figure key={index}>
      	            <LazyLoad height={400}>
      	              <img className={this.state.index == index ? styles.top_img_big : styles.top_img} onClick={this.handleChange}
      	               id={index}
      	               src={ele.avatar}/>
      	            </LazyLoad>
      	          </figure>
      	        ))
        }
        </div>

        <div style={{border: "#ddd dashed", borderWidth: 1}}></div>
        <div></div>
        {renderContent(this.state.index, this.props.isLifeSaver, this.state.rowData)}
      </div>
    );
  }
}

CoachTop.propTypes = {
  isLifeSaver: PropTypes.bool //是否是救生员页面
};

export default CoachTop;
