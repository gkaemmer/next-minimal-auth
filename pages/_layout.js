export default class Layout extends React.Component {
  componentDidUpdate(oldProps) {
    console.log(oldProps, this.props);
  }

  componentWillUnmount() {
    console.log("Unmounting...");
  }

  componentDidMount() {
    console.log("Mounted");
  }

  render() {
    const { children } = this.props;
    return <div style={{ margin: 100 }}>{children}</div>;
  }
}
