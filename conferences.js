(function () {
  var el = Roster.el;
  var setText = Roster.setText;
  var fmt = function (n) { return n.toLocaleString('en-US'); };

  var DATA = {
    football: {
      title: 'Football by conference',
      sub: '2026 membership · 2025-26 playoff',
      postLabel: 'CFP teams 2025-26',
      footnote: 'Pac-12 shows no playoff history because its current lineup started play in 2026. Max roster spots are schools × 105.',
      rows: [
        { name: 'Big Ten', schools: 18, spots: 1890, post: '3 of 12', note: 'Indiana beat Miami 27–21 for the 2025-26 national title. Ohio State and Oregon also made the field.' },
        { name: 'SEC', schools: 16, spots: 1680, post: '5 of 12', note: 'Most CFP teams of any conference: Georgia, Ole Miss, Texas A&M, Oklahoma and Alabama.' },
        { name: 'ACC', schools: 17, spots: 1785, post: '1 of 12', note: 'Miami reached the title game. Notre Dame plays football as an independent.' },
        { name: 'Big 12', schools: 16, spots: 1680, post: '1 of 12', note: 'Texas Tech earned the No. 4 seed.' },
        { name: 'Pac-12', schools: 8, spots: 840, post: 'New lineup', note: 'Rebuilt for 2026: Oregon State and Washington State plus Boise State, Colorado State, Fresno State, San Diego State, Texas State and Utah State.' }
      ],
      stats: function (schools, spots) {
        return [
          { value: String(schools), label: 'Football schools', note: 'Across the five conferences for 2026' },
          { value: fmt(spots), label: 'Max roster spots', note: '105 per team under the new roster limits' },
          { value: '10 of 12', label: 'CFP spots, 2025-26', note: 'The rest went to Tulane and James Madison' },
          { value: 'Indiana', label: '2025-26 national champion', note: 'Big Ten' }
        ];
      }
    },
    basketball: {
      title: 'Basketball by conference',
      sub: '2026-27 membership · 2026 NCAA tournaments',
      postLabel: 'NCAA bids 2026',
      footnote: 'Pac-12 shows no tournament history because its current lineup started play in 2026-27. Max roster spots are schools × 30 (men’s and women’s teams combined).',
      rows: [
        { name: 'Big Ten', schools: 18, spots: 540, post: '9 M · 12 W', note: 'Swept the 2026 titles: Michigan (men) and UCLA (women).' },
        { name: 'SEC', schools: 16, spots: 480, post: '10 M · 10 W', note: 'Most men’s bids. South Carolina reached the women’s final.' },
        { name: 'ACC', schools: 18, spots: 540, post: '8 M · 9 W', note: 'Includes Notre Dame, a full ACC member in basketball.' },
        { name: 'Big 12', schools: 16, spots: 480, post: '8 M · 8 W', note: 'Same bid count in both tournaments.' },
        { name: 'Pac-12', schools: 9, spots: 270, post: 'New lineup', note: 'Gonzaga joins its eight football members for 2026-27.' }
      ],
      stats: function (schools, spots) {
        return [
          { value: String(schools), label: 'Basketball schools', note: 'Across the five conferences for 2026-27' },
          { value: fmt(spots), label: 'Max roster spots', note: '15 men’s + 15 women’s per school' },
          { value: '35 · 39', label: 'NCAA bids, men · women', note: 'Of 68 in each 2026 tournament (Big Ten, SEC, ACC, Big 12)' },
          { value: 'Big Ten', label: 'Won both 2026 titles', note: 'Michigan 69–63 over UConn; UCLA 79–51 over South Carolina' }
        ];
      }
    }
  };

  function render(sport) {
    var d = DATA[sport];
    var max = Math.max.apply(null, d.rows.map(function (r) { return r.spots; }));
    var totalSchools = d.rows.reduce(function (a, r) { return a + r.schools; }, 0);
    var totalSpots = d.rows.reduce(function (a, r) { return a + r.spots; }, 0);

    var stats = document.getElementById('stats');
    stats.replaceChildren.apply(stats, d.stats(totalSchools, totalSpots).map(function (s) {
      var card = el('div', 'card stat');
      card.append(el('span', 'stat-value', s.value), el('span', 'stat-label', s.label), el('span', 'stat-note', s.note));
      return card;
    }));

    var tbody = document.getElementById('rows');
    tbody.replaceChildren.apply(tbody, d.rows.map(function (r) {
      var tr = el('tr');
      var name = el('th', null, r.name);
      name.scope = 'row';

      var spots = el('td');
      var wrap = el('div', 'stack');
      wrap.style.gap = '8px';
      var track = el('div', 'bar-track');
      var fill = el('div', 'bar-fill');
      fill.style.width = Math.round((r.spots / max) * 100) + '%';
      track.append(fill);
      wrap.append(el('span', null, fmt(r.spots)), track);
      spots.append(wrap);

      tr.append(name, el('td', null, String(r.schools)), spots, el('td', 'nowrap', r.post), el('td', 'note', r.note));
      return tr;
    }));

    setText('table-title', d.title);
    setText('table-sub', d.sub);
    setText('post-label', d.postLabel);
    setText('footnote', d.footnote);
  }

  Roster.onSportChange(render);
})();
