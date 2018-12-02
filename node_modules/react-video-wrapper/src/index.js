import cx from 'classnames';
import blacklist from 'blacklist';
import React from 'react';

class VideoWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlay = this.handlePlay.bind(this)
    }
    componentDidMount() {
        let self = this;
        let player = videojs(this.refs.video, this.props.options).ready(function() {
            self.player = this;
            self.player.on('play', self.handlePlay);
        });
        if(this.props.onPlayerInit) this.props.onPlayerInit(player);
    }

    handlePlay() {
        if(this.props.onPlay) this.props.onPlay(this.player);
    };

    render() {
        let props = blacklist(this.props, 'children', 'className', 'src', 'type', 'onPlay', 'onPlayerInit');
        props.className = cx(this.props.className, 'videojs', 'video-js vjs-default-skin');

        Object.assign(props, {
            ref: 'video',
            controls: true
        });

        return (
            <div>
                <video {... props}>
                    <source src={this.props.src} type={this.props.type}/>
                </video>
            </div>
        )
    }
}



export default VideoWrapper