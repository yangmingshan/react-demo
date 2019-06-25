import React from 'react';

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Component: null };
    props
      .load()
      .then(Component => this.setState({ Component: Component.default }));
  }
  render() {
    const { load, ...props } = this.props;
    const Component = this.state.Component;
    return Component ? <Component {...props} /> : null;
  }
}

export default Bundle;
