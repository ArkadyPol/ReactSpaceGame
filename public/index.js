class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rocketX: 400,
      shots: [],
      arrowLeft: false,
      arrowRight: false,
      space: false,
      readyToShoot: true,
      velocity: 0
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    this.timerID = setInterval(() => this.updatePerFrame(), 25);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    clearInterval(this.timerID);
  }
  updatePerFrame() {
    let shots = this.state.shots
      .map(coords => [coords[0], coords[1] - 4])
      .filter(coords => coords[1] > 0);
    let rocketX = this.state.rocketX;
    let velocity = this.state.velocity;
    if (Math.abs(velocity) < 0.15) velocity = 0;
    if (velocity > 0) velocity -= 0.15;
    if (velocity < 0) velocity += 0.15;
    if (this.state.arrowLeft) {
      velocity -= 0.4;
    }
    if (this.state.arrowRight) {
      velocity += 0.4;
    }
    rocketX += velocity;
    if (rocketX < 15) {
      rocketX = 15;
      velocity = 0;
    }
    if (rocketX > 785) {
      rocketX = 785;
      velocity = 0;
    }
    let readyToShoot = this.state.readyToShoot;
    if (this.state.space && readyToShoot) {
      shots.push([rocketX, 400]);
      readyToShoot = false;
      setTimeout(() => this.setState({ readyToShoot: true }), 100);
    }
    this.setState({ shots, rocketX, readyToShoot, velocity });
  }

  handleKeyDown(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.setState({ arrowLeft: true });
        break;
      case "ArrowRight":
        this.setState({ arrowRight: true });
        break;
      case "Space":
        this.setState({ space: true });
        break;
    }
  }
  handleKeyUp(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.setState({ arrowLeft: false });
        break;
      case "ArrowRight":
        this.setState({ arrowRight: false });
        break;
      case "Space":
        this.setState({ space: false });
        break;
    }
  }
  render() {
    const width = 800;
    const height = 500;
    const shots = this.state.shots.map(coords => (
      <Shot x={coords[0]} y={coords[1]} />
    ));
    return (
      <svg width={width} height={height}>
        {shots}
        <Rocket x={this.state.rocketX} />
      </svg>
    );
  }
}
class Rocket extends React.Component {
  render() {
    const x = this.props.x;
    return (
      <React.Fragment>
        <ellipse cx={x} cy="440" rx="12" ry="37" fill="#ff0000" />
        <circle cx={x} cy="420" r="5" fill="#ffff00" />
        <circle cx={x} cy="440" r="5" fill="#ffff00" />
        <circle cx={x} cy="460" r="5" fill="#ffff00" />
        <path
          d={`M${x - 7} 470 q -10 10 -10 20 q 0 -10 14 -16 Q ${x - 4} 475 ${x -
            7} 470`}
          fill="#ffff00"
        />
        <path
          d={`M${x + 7} 470 q 10 10 10 20 q 0 -10 -14 -16 Q ${x + 4} 475 ${x +
            7} 470`}
          fill="#ffff00"
        />
      </React.Fragment>
    );
  }
}
class Shot extends React.Component {
  render() {
    const x = this.props.x;
    const y = this.props.y;
    return <circle cx={x} cy={y} r="5" fill="#00af00" />;
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
