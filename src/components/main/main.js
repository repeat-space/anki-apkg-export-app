import React from 'react';
import styles from './style.css';

export default React.createClass({
  getInitialState() {
    const text = [
      '# first group of words',
      'front side - back side',
      '',
      '# second group of words',
      'word - explanaition'
    ].join('\n');

    const delimiter = ' - ';

    return { text, delimiter, cards: this.parseText(text, delimiter) }
  },
  parseText(text, delimiter) {
    return text
     .split('\n')
     .map(line => {
       if (line[0] === '#') {
         return;
       }

       const [front, back] = line.trim().split(delimiter || this.state.delimiter);

       if (front && back) {
         return { front, back };
       }
     })
     .filter(line => !!line);
  },
  onTextChange(e) {
    const text = e.target.value;

    this.setState({
      text: text,
      cards: this.parseText(text)
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
          <textarea className={styles.textarea} onChange={this.onTextChange} ref="myTextarea" value={this.state.text} />

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
          ) || (
            <table className={styles.table}>
              <tbody>
                <tr><td>No cards</td></tr>
              </tbody>
            </table>
          )}
        </div>
        <div>
          { this.state.cards.length > 0 && (
            <button className={styles.btn} onClick={this.onClick}>
              {`Generate apkg with ${this.state.cards.length} card${this.state.cards.length === 1 ? '' : 's'}`}
            </button>
          ) || (
            <button className={`${styles.btn} ${styles.btnDisabled}`} disabled={true}>
              Generate apkg
            </button>
          )}
        </div>
        <div className={styles.footer}>
          Made by <a href="https://github.com/ewnd9" target="_blank">@ewnd9</a>
        </div>
      </div>
    );
  }
});
