class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rocketX: 400,
      shots: []
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    this.timerID = setInterval(() => this.updatePerFrame(), 25);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    clearInterval(this.timerID);
  }
  updatePerFrame() {
    let shots = this.state.shots
      .map(coords => [coords[0], coords[1] - 2])
      .filter(coords => coords[1] > 0);
    this.setState({ shots: shots });
  }

  handleKeyPress(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.setState(state => {
          if (state.rocketX == 10) return;
          return { rocketX: state.rocketX - 10 };
        });
        break;
      case "ArrowRight":
        this.setState(state => {
          if (state.rocketX == 790) return;
          return { rocketX: state.rocketX + 10 };
        });
        break;
      case "Space":
        this.setState(state => {
          return { shots: [...state.shots, [state.rocketX, 400]] };
        });
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
