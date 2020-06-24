import React from 'react';

export default class MyBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: false };
    }
  
    static getDerivedStateFromError(data) {
      return { error: true }; // update the state object
    }
  
    componentDidCatch(error, data) {
      // handle the error content here.
    }
  
    render() {
      const { error } = this.state;
      const { children } = this.props;
  
      if (error) return <p>Something wrong happen! 🧐s</p>;
  
      return children;
    }
  }