(function () {
  var el = Roster.el;
  var setText = Roster.setText;

  var DATA = {
    football: {
      moneyTitle: 'Biggest football NIL budgets',
      moneySub: '2026 season · estimated range per school',
      moneyNote: 'Six of the ten are in the SEC. Bars use the middle of each range. Notre Dame plays football as an independent.',
      // n = middle of the estimated range, in $M; drives the bar length.
      money: [
        { school: 'Ohio State', conf: 'Big Ten', value: '$49–54M', n: 51.5 },
        { school: 'Oregon', conf: 'Big Ten', value: '$48–54M', n: 51 },
        { school: 'Texas', conf: 'SEC', value: '$45–55M', n: 50 },
        { school: 'LSU', conf: 'SEC', value: '$47–50M', n: 48.5 },
        { school: 'Texas A&M', conf: 'SEC', value: '$45–50M', n: 47.5 },
        { school: 'Miami', conf: 'ACC', value: '$44–50M', n: 47 },
        { school: 'Notre Dame', conf: 'Independent', value: '$41–48M', n: 44.5 },
        { school: 'Ole Miss', conf: 'SEC', value: '$39–45M', n: 42 },
        { school: 'Tennessee', conf: 'SEC', value: '$41–43M', n: 42 },
        { school: 'Alabama', conf: 'SEC', value: '$38–42M', n: 40 }
      ],
      moveTitle: 'Most football portal departures',
      moveSub: 'January 2026 portal window · players who left',
      moveNote: 'Oklahoma State’s 64 is a record, past Colorado’s 56 in 2023.',
      moves: [
        { school: 'Oklahoma State', conf: 'Big 12', value: '64 players', n: 64 },
        { school: 'Iowa State', conf: 'Big 12', value: '54 players', n: 54 },
        { school: 'Penn State', conf: 'Big Ten', value: '46 players', n: 46 },
        { school: 'West Virginia', conf: 'Big 12', value: '44 players', n: 44 },
        { school: 'Arkansas', conf: 'SEC', value: '38 players', n: 38 },
        { school: 'Mississippi State', conf: 'SEC', value: '38 players', n: 38 },
        { school: 'Michigan State', conf: 'Big Ten', value: '37 players', n: 37 },
        { school: 'Auburn', conf: 'SEC', value: '36 players', n: 36 },
        { school: 'Florida State', conf: 'ACC', value: '36 players', n: 36 },
        { school: 'Cal', conf: 'ACC', value: '35 players', n: 35 }
      ],
      takeTitle: 'The top spenders didn’t lose the most players',
      takeBody: 'None of the ten biggest NIL budgets is on the list of ten schools with the most departures. Spending doesn’t guarantee you’ll fit, but programs with heavy turnover are where to ask hardest about what changed: the head coach, the scheme, or the promises.'
    },
    basketball: {
      moneyTitle: 'Most expensive men’s rosters',
      moneySub: '2026-27 · estimated roster value',
      moneyNote: 'All ten are valued at $20M or more. St. John’s (Big East) also clears $20M. The average high-major roster is about $13.5M. Women’s power-conference rosters average $1M–5M, against $7M–10M for men’s.',
      money: [
        { school: 'Florida', conf: 'SEC', value: '$25M+', n: 25 },
        { school: 'Duke', conf: 'ACC', value: '$20M+', n: 20 },
        { school: 'Kentucky', conf: 'SEC', value: '$20M+', n: 20 },
        { school: 'Illinois', conf: 'Big Ten', value: '$20M+', n: 20 },
        { school: 'Louisville', conf: 'ACC', value: '$20M+', n: 20 },
        { school: 'Michigan', conf: 'Big Ten', value: '$20M+', n: 20 },
        { school: 'North Carolina', conf: 'ACC', value: '$20M+', n: 20 },
        { school: 'Tennessee', conf: 'SEC', value: '$20M+', n: 20 },
        { school: 'Texas', conf: 'SEC', value: '$20M+', n: 20 },
        { school: 'Texas Tech', conf: 'Big 12', value: '$20M+', n: 20 }
      ],
      moveTitle: 'Basketball portal movement',
      moveSub: 'Spring 2026 portal · players who left',
      moveNote: 'Conference totals are men’s entrants from each league’s schools. In women’s basketball, UCLA and South Carolina were the only Big Ten and SEC teams to lose no one to the portal, and they met in the national final.',
      moves: [
        { school: 'ACC', conf: 'men’s entrants', value: '138 players', n: 138 },
        { school: 'Big 12', conf: 'men’s entrants', value: '127 players', n: 127 },
        { school: 'SEC', conf: 'men’s entrants', value: '110 players', n: 110 },
        { school: 'Big Ten', conf: 'men’s entrants', value: '105 players', n: 105 },
        { school: 'Iowa State', conf: 'women · Big 12', value: '9 players', n: 9 },
        { school: 'UCLA', conf: 'women · Big Ten', value: '0 players', n: 0 },
        { school: 'South Carolina', conf: 'women · SEC', value: '0 players', n: 0 }
      ],
      takeTitle: 'Stability showed up in the final',
      takeBody: 'The two women’s finalists kept everyone who could have transferred, while some rosters turned over almost completely. In men’s basketball the money is concentrated: a few programs spend $20M+ while the average high-major roster sits around $13.5M. Know which kind of program you’re joining and where you’d sit in its budget.'
    }
  };

  function renderList(id, items, barClass) {
    var max = Math.max.apply(null, items.map(function (x) { return x.n; }));
    var list = document.getElementById(id);
    list.replaceChildren.apply(list, items.map(function (x, i) {
      var li = el('li');
      var row = el('div', 'rank-row');
      var name = el('span', 'rank-name', (i + 1) + '. ' + x.school + ' ');
      name.append(el('small', null, x.conf));
      row.append(name, el('span', 'rank-value', x.value));
      var track = el('div', 'bar-track');
      var fill = el('div', barClass);
      fill.style.width = Math.round((x.n / max) * 100) + '%';
      track.append(fill);
      li.append(row, track);
      return li;
    }));
  }

  function render(sport) {
    var d = DATA[sport];
    renderList('money-list', d.money, 'bar-fill');
    renderList('move-list', d.moves, 'bar-fill orange');
    ['moneyTitle', 'moneySub', 'moneyNote', 'moveTitle', 'moveSub', 'moveNote', 'takeTitle', 'takeBody'].forEach(function (key) {
      setText(key.replace(/[A-Z]/, function (c) { return '-' + c.toLowerCase(); }), d[key]);
    });
  }

  Roster.onSportChange(render);
})();
