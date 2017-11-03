import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

const FPS = 50;
const TIMEOUT = 1 / FPS * 1000;

let TEXTWIDTH   = 0;//文案内容宽度
let CONTAINERWIDTH  =  0;// 容器宽度

class Marquee extends Component {

  static displayName = 'Marquee';

  static propTypes = {
    text: PropTypes.string,
    hoverToStop: PropTypes.bool,
    loop: PropTypes.bool,
    leading: PropTypes.number,
    trailing: PropTypes.number,
    className: PropTypes.string,
    type: PropTypes.number,
    speed: PropTypes.number
  };

  static defaultProps = {
    className: 'notice',
    text: '',
    hoverToStop: false,
    loop: false,
    leading: 0,
    trailing: 0,
    speed: 1 //每50毫秒滚动的距离
  };

  state = {
    animatedWidth: 0, //当前运行的宽度
    overflowWidth: 0, //内容和容器的差值
    hoverToStop: false
  };

  componentDidMount() {
    this.measureText();
    this.startAnimation();
  }

  componentDidUpdate() {
    this.measureText();

    if (this.props.hoverToStop) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.marqueeTimer);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text.length !== nextProps.text.length) {
      clearTimeout(this.marqueeTimer);
      this.setState({ animatedWidth: 0 });
    }
  }

  handleMouseEnter = () => {
    if (this.props.hoverToStop) {
      clearTimeout(this.marqueeTimer);
      this.setState({
        hoverToStop: true
      });
    } else if (this.state.overflowWidth > 0){
      this.startAnimation();
    }
  }

  handleMouseLeave = () => {
    if (this.props.hoverToStop && this.state.overflowWidth > 0) {
      this.setState({
        hoverToStop: false
      });
      this.startAnimation();
    } else {
      clearTimeout(this.marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }
  }

  startAnimation = () => {
    clearTimeout(this.marqueeTimer);
    const isLeading = this.state.animatedWidth === 0;
    const timeout = isLeading ? this.props.leading : TIMEOUT;

    const animate = () => {
      if (this.state.hoverToStop) {
        return false;
      }
      const {overflowWidth} = this.state;
      let animatedWidth = this.state.animatedWidth + this.props.speed;
      let isRoundOver = false;
          isRoundOver = animatedWidth > overflowWidth;

      if (isRoundOver) {
        if (this.props.loop) {
          animatedWidth = 0;
        } else {
          return;
        }
      }

      if (isRoundOver && this.props.trailing) {
        this.marqueeTimer = setTimeout(() => {
          this.setState({ animatedWidth });
          this.marqueeTimer = setTimeout(animate, TIMEOUT);
        }, this.props.trailing);
      } else {
        this.setState({ animatedWidth });
        this.marqueeTimer = setTimeout(animate, TIMEOUT);
      }
    };

    this.marqueeTimer = setTimeout(animate, timeout);
  }

  measureText = () => {
    const container = this.container;
    const node = this.text;

    if (container && node) {
      TEXTWIDTH = node.offsetWidth;//滚动内容宽度
      CONTAINERWIDTH = container.offsetWidth;// 父级容器宽度
      const overflowWidth = TEXTWIDTH - CONTAINERWIDTH;

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({ overflowWidth });
      }
    }
  }

  render() {
    const style = {
      'position': 'relative',
      'right': this.state.animatedWidth,
      'whiteSpace': 'nowrap'
    };

    if (this.state.overflowWidth < 0) {
      return (
        <div
          ref={(el) => { this.container = el; }}
          className={`ui-marquee ${this.props.className}`}
          style={{ overflow: 'hidden' }}
        >
          <span
            ref={(el) => { this.text = el; }}
            style={style}
            title={this.props.text}
          >
            {this.props.text}
          </span>
        </div>
      );
    }

    return (
      <div
        ref={(el) => { this.container = el; }}
        className={`ui-marquee ${this.props.className}`.trim()}
        style={{ overflow: 'hidden' }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <span
          ref={(el) => { this.text = el; }}
          style={style}
          title={this.props.text}
        >
          {this.props.text}
        </span>
      </div>
    );
  }
}


export default Marquee;
