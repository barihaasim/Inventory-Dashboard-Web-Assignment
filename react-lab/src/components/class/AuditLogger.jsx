import React from "react";

// Class component that keeps a log of everything that happens
class AuditLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      toast: "",
    };
    this.timer = null;
  }

  // runs once when the component first shows up
  componentDidMount() {
    const saved = localStorage.getItem("auditLogs");
    if (saved) {
      this.setState({ logs: JSON.parse(saved) });
    }
  }

  // runs every time props or state change
  componentDidUpdate(prevProps, prevState) {
    // a new action came from App, so add it to the logs
    if (prevProps.lastAction !== this.props.lastAction && this.props.lastAction) {
      const newLog = {
        id: this.props.lastAction.id,
        text: this.props.lastAction.text,
        time: new Date().toLocaleTimeString(),
      };
      this.setState({
        logs: [newLog, ...this.state.logs],
        toast: this.props.lastAction.text,
      });
    }

    // logs changed so save them
    if (prevState.logs !== this.state.logs) {
      localStorage.setItem("auditLogs", JSON.stringify(this.state.logs));
    }

    // toast message just changed, hide it after 3 seconds
    if (prevState.toast !== this.state.toast && this.state.toast !== "") {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ toast: "" });
      }, 3000);
    }
  }

  // cleanup the timer
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  clearLogs = () => {
    this.setState({ logs: [] });
  };

  render() {
    return (
      <div className="card">
        <h3>Audit Log</h3>

        {this.state.toast && <div className="toast">{this.state.toast}</div>}

        <button onClick={this.clearLogs}>Clear Logs</button>

        {this.state.logs.length === 0 ? (
          <p>No activity yet.</p>
        ) : (
          <ul>
            {this.state.logs.map((log) => (
              <li key={log.id}>
                [{log.time}] {log.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default AuditLogger;
