import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// import htmlSubstring from '../../services/htmlSubstring'
// import injectEllipsis from '../../services/injectEllipsis'

//import UserCard from '../UserCard/UserCard.component';
import TagBadge from '../TagBadge/TagBadge.component';

import './PostItem.styles.css';

const PostItemProfile = ({
  post: {
    _id,
    title,
    // descr,
    //createdBy,
    answers,
    // comment_count,
    views,
    createdOn,
    tags,
    reviewStatus,
    isAdmin
  },
}) => {

  
  const answerVoteUp = (
    <div className='vote answer'>
      <span className='vote-count fc-green-500'>{answers?.length}</span>
      <div className='count-text'>answers</div>
    </div>
  );

  const answerVoteDown = (
    <div className='vote'>
      <span className='vote-count'>{answers?.length}</span>
      <div className='count-text'>answers</div>
    </div>
  );

  return (
    <div className='posts'>
      <div className='stats-container fc-black-500'>
        <div className='stats'>
          <div className='vote'>
            <span className='vote-count'>{views}</span>
            <span className='count-text'>views</span>
          </div>
          {answers?.length > 0 ? answerVoteUp : answerVoteDown}
          <div className='vote'>
            <span className='vote-count'>{tags.length}</span>
            <div className='count-text'>{tags.length > 1 ? "votes" : "vote" }</div>
          </div>
          {/* <div className='vote'>
            <div className='count-text'>{views} views</div>
          </div> */}
        </div>
      </div>
      <div className='summary'>
        <h3>
          {isAdmin?<Link to={`/admin/pending-questions/${_id}`}>{title}</Link>:<Link to={`/questions/${_id}`}>{title}</Link>}
          {reviewStatus=='pending' && <button className='s-btn s-btn__filled s-btn__danger' style={{marginLeft:'20px'}}>Pending Admin Review</button>}
          {reviewStatus=='rejected' && <button className='s-btn s-btn__filled s-btn__danger' style={{marginLeft:'20px'}}>Rejected by Admin</button>}
        </h3>
        {/* <div className='brief' dangerouslySetInnerHTML={{__html: injectEllipsis(htmlSubstring(descr, 200))}}></div> */}
        {tags?.map((tag, index) => (
          <TagBadge key={index} tag_name={tag?.name} size={'s-tag'} float={'left'} />
        ))}
        <div className='createdOn' style={{float:"right"}}>
            <span className='vote-count'>asked on {createdOn?.slice(0,10)}</span>
          </div>
      </div>
    </div>
  );
};

PostItemProfile.propTypes = {
  post: PropTypes.object.isRequired,
};

//export default connect(null)(PostItem);
export default connect(null)(PostItemProfile);
