import React from 'react';

class ChatRoom extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  render() {
    return(
      <div className='row'>
        <div className='col-md-8'>
          {/*code sharing space*/}
          code
        </div>
        <div className='col-md-4'>
          {/*chat space*/}
          chat
        </div>
      </div>
    );
  }
}

export default ChatRoom;
