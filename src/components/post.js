import React from 'react';
import ReactHtmlParser from 'react-html-parser'; 

const PostBox = (props) => {
    return (
        <div className="post-body">
            {props.children}
        </div>
    )
}

const Image = (props) => {
    return (
        <img src={props.image} alt="Profile" className="picture">
        </img>
    )
}

const Location = (props) => {
    return (
        <div className="location">
            {props.location}
        </div>
    )
}

const Name = (props) => {
    return (
        <div className="name">
            {props.name}
        </div>
    )
}

const Post = (props) => {
    return (
        <div className="post">
            {props.post}
        </div>
    )
}

class PostBody extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          user: {}
        }
    }

    componentDidMount() {
        return new Promise((resolve) => {
          this.getData()
          this.forceUpdate()

        });
      }

    getData() {
        let firstAPICall = fetch('https://randomuser.me/api/');
        let secondAPICall = fetch('http://www.randomtext.me/api/');
    
        Promise.all([firstAPICall, secondAPICall])
          .then(values => Promise.all(values.map(value => value.json())))
          .then(finalVals => {
            let firstAPIResp = finalVals[0];
            let secondAPIResp = finalVals[1];
            this.setState({
              user:
                {
                  name: `${firstAPIResp.results[0].name.first} ${firstAPIResp.results[0].name.last}`,
                  image: firstAPIResp.results[0].picture.large,
                  location: `${firstAPIResp.results[0].location.city}, ${firstAPIResp.results[0].location.state}`,
                  post: ReactHtmlParser (secondAPIResp.text_out.split('\r')[0]),
                },
            });
        });
      }

    render () {
        return (
            <PostBox>
                <div className="post-body">
                    <div className="profile">
                        <Image image={this.state.user.image}/>
                            <div className="name-location">
                                <Name name={this.state.user.name}/>
                                <Location location={this.state.user.location}/>
                            </div>
                        </div>
                    <Post post={this.state.user.post}/>
                </div>
            </PostBox>
        )
    }    
}

export { PostBody }