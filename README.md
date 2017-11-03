# react-text-marquee

A <marquee> component for react.

## Getting Started

Install it via npm or yarn:

```shell
npm install --save @gag/react-text-marquee
```

```shell
yarn add @gag/react-text-marquee
```

## Example

```html
import React, { Component } from 'react';
import Marquee from '@gag/react-text-marquee';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Marquee hoverToStop={true} loop={true} leading={0} speed={1} text="Wow this is really quite a long message but it can be handled by this component just fine" />
      </div>
    );
  }
}
```

## Props

### text
The text displayed in marquee.

- Type: String
- Default: `""`

### hoverToStop
悬浮停止.

- Type: Bool
- Default: `false`

### loop
Whether or not loop the marquee.

- Type: Bool
- Default: `false`

### leading
The leading waiting time for the marquee to move.

- Type: Number
- Default: `0`

### trailing
The trailing waiting time for the marquee to start over.

- Type: Number
- Default: `0`

### speed
每20毫秒滚动的距离.

- Type: Number
- Default: `1`

## License

MIT
