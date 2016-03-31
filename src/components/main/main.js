import React from 'react';
import styles from './style.css';

export default React.createClass({
  getInitialState() {
    return { cards: [], delimiter: ' - ' }
  },
  onChange(event) {
    this.setState({
      cards: event.target.value
        .split('\n')
        .filter(line => line.trim().length > 0 && line[0] !== '#')
        .map(line => {
          const [front, back] = line.split(this.state.delimiter);
          return { front, back };
        })
    });
  },
  onClick() {
    const name = 'Anki2 node-browser-deck';

    require.ensure([], (require) => {
      const generatePkg = require('./generate-pkg');
      generatePkg.default(name, this.state.cards);
    });
  },
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.panels}>
          <textarea className={styles.textarea} onChange={this.onChange} ref="myTextarea" />
          { this.state.cards.length > 0 && (
            <table className={styles.table}>
              <tbody>
                {
                  this.state.cards.map((item, index) => {
                    return <tr key={index}>
                      <td>{item.front}</td>
                      <td>{item.back}</td>
                    </tr>;
                  })
                }
              </tbody>
            </table>
          ) || ''}
        </div>
        <div>
          <button className={styles.btn} onClick={this.onClick}>
            Generate apkg
          </button>
        </div>
      </div>
    );
  }
});
