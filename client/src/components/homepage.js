import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { getRandom } from '../utils';

const posts = [
  {
    imgURL: `https://loremflickr.com/300/300?random=${getRandom()}`,
    title: 'A loving heart is truest Wisdom',
    date: 'June 28, 2019',
    category: 'Travel',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popula',
    summary: 'A small river named Duden flows by their place and supplies it with the neccessary.',
    opened: null,
  },
  {
    imgURL: `https://loremflickr.com/300/300?random=${getRandom()}`,
    title: 'A loving heart is truest Wisdom',
    date: 'June 28, 2019',
    category: 'Travel',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popula',
    summary: 'A small river named Duden flows by their place and supplies it with the neccessary.',
    opened: null,
  },
  {
    imgURL: `https://loremflickr.com/300/300?random=${getRandom()}`,
    title: 'A loving heart is truest Wisdom',
    date: 'June 28, 2019',
    category: 'Travel',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popula',
    summary: 'A small river named Duden flows by their place and supplies it with the neccessary.',
    opened: null,
  },
  {
    imgURL: `https://loremflickr.com/300/300?random=${getRandom()}`,
    title: 'A loving heart is truest Wisdom',
    date: 'June 28, 2019',
    category: 'Travel',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popula',
    summary: 'A small river named Duden flows by their place and supplies it with the neccessary.',
    opened: null,
  },
  {
    imgURL: `https://loremflickr.com/300/300?random=${getRandom()}`,
    title: 'A loving heart is truest Wisdom',
    date: 'June 28, 2019',
    category: 'Travel',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popula',
    summary: 'A small river named Duden flows by their place and supplies it with the neccessary.',
    opened: null,
  },
]



export default function () {

  const [postsState, setPostsState] = useState();

  const handleToggle = (idx) => {
    console.log('hi89', idx)
    let oldState = postsState;
    oldState.forEach((post, i) => {
      if (i === idx) {
        console.log('here');
        if (post.opened === null) {
          post.opened = 1;
        } else if (post.opened === 1) {
          post.opened = null;
        }
      }
    });
    console.log(oldState, "satte");
    setPostsState([...oldState]);
  }


  useEffect(() => {
    setPostsState(posts);
  }, [])

  return (
    <div className='row'>
      <div className='col-8'>
        {
          postsState && postsState.map((post, index) => (
            <MDBCard className='blog-card'>
              <MDBRow className='g-0'>
                <MDBCol md='4'>
                  <MDBCardImage className='blog-image' src={post.imgURL} alt='...' fluid />
                </MDBCol>
                <MDBCol md='8'>
                  <MDBCardBody>
                    <MDBCardTitle>{post.title}</MDBCardTitle>
                    <MDBCardText>
                      <i style={{ color: '#F93154' }} class="fas fa-clock"></i>
                      &nbsp;
                      <small className='text-muted'>{post.date}</small>
                      &nbsp;&nbsp;
                      <i style={{ color: '#1266F1' }} class="fas fa-folder"></i>
                      &nbsp;
                      <strong className='text-muted'>{post.category}</strong>
                    </MDBCardText>
                    {
                      post.opened === null
                        ?
                        <>
                          <MDBCardText>{post.summary}</MDBCardText>
                          <small style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleToggle(index)}>
                            Read more
                            &nbsp;&nbsp;<i style={{ color: '#1266F1' }} className="fas fa-caret-right"></i>
                          </small>
                        </>
                        :
                        <>
                          <MDBCardText>{post.content}</MDBCardText>
                          <small style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleToggle(index)}>
                            <i style={{ color: '#1266F1' }} class="fas fa-sort-up"></i>
                            &nbsp;&nbsp;collapse
                          </small>
                        </>
                    }
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          ))
        }
      </div>
      <div className='col-4'>
        <div className='right-uper'>
          <h5>Categories</h5>
          <MDBListGroup flush style={{ minWidth: '22rem' }}>
            <MDBListGroupItem>
              <strong style={{ cursor: 'pointer' }}>Fashion</strong>
              <span style={{ color: 'gray' }}>(1)</span></MDBListGroupItem>
            <MDBListGroupItem>
              <strong style={{ cursor: 'pointer' }}>Technology</strong>
              <span style={{ color: 'gray' }}>(2)</span></MDBListGroupItem>
            <MDBListGroupItem>
              <strong style={{ cursor: 'pointer' }}>Travel</strong>
              <span style={{ color: 'gray' }}>(5)</span></MDBListGroupItem>
            <MDBListGroupItem>
              <strong style={{ cursor: 'pointer' }}>Food</strong>
              <span style={{ color: 'gray' }}>(1)</span></MDBListGroupItem>
            <MDBListGroupItem>
              <strong style={{ cursor: 'pointer' }}>Photography</strong>
              <span style={{ color: 'gray' }}>(7)</span></MDBListGroupItem>
          </MDBListGroup>

        </div>
        <br/>
        <br/>
        <div className='right-lower card'>
          <strong>Subscribe for newsletter</strong>
          <MDBInput
            label='Enter Email Address'
            type='email'
          />
          <br />
          <MDBBtn>Submit</MDBBtn>


        </div>
      </div>

    </div>
  );
}