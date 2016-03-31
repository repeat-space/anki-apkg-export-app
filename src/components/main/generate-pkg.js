import { saveAs } from 'filesaverjs';
import AnkiExport from 'anki-apkg-export';

export default (name, cards) => {
  const apkg = new AnkiExport(name);
  cards.forEach(card => apkg.addCard(card.front, card.back));

  const zip = apkg.save();
  saveAs(zip, 'output.apkg');
};
