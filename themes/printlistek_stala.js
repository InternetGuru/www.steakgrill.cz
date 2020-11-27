(function() {
  
  require("IGCMS", function () {
  
    if (!'print' in window) {
      return;
    }

    var url = new URL(window.location.href);
    if (url.searchParams.get("print") === null) {
      return;
    }

    var Printable = function () {
      var
      Config = {
        styles: "",
        parentSelector: "",
        printButtonStyle: "",
        printButtonClass: "noprint fas fa-print",
        buttonClass: "button-print button button-img button-img-inline",
        printButtonText: "Print",
        childrenSelector: [],
        copies: 16,
        pageBreak: "page-break",
        separateLast: true,
      },
      w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight,
      printNabidka = function (event) {
        var printWin = window.open('', 'PRINT', 'height=' + y + ',width=' + x);

        printWin.document.write(`
          <html>
            <head>
              <title>${document.querySelector(Config.parentSelector).id}</title>
              <link href="//fonts.googleapis.com/css?family=Roboto:400,500&amp;subset=latin-ext" rel="stylesheet">
            </head>
            <body>`);

        var wrap = document.createElement('div');
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        wrap.appendChild(div1);
        div1.appendChild(div2);
        let children = [];
        for (var i = 0; i < Config.childrenSelector.length; i++) {
          if (Config.childrenSelector[i].nodeType == 1) {
            children.push(Config.childrenSelector[i])
            continue
          }
          if (!Config.childrenSelector[i]) {
            var span = document.createElement("span")
            span.className = Config.pageBreak
            children.push(span)
            continue
          }
          var elms = document.querySelectorAll(Config.childrenSelector[i]);
          for (var j = 0; j < elms.length; j++) {
            children.push(elms[j].cloneNode(true));
          }
        }
        var groupElm = document.createElement("div")
        groupElm.className = "group"
        children.forEach((item, idx, array) => {
          if (item.classList.contains(Config.pageBreak) || (Config.separateLast && idx === array.length - 1)) {
            div2.appendChild(groupElm)
            groupElm = document.createElement("div")
            groupElm.className = "group"
          }
          groupElm.appendChild(item)
        })
        div2.appendChild(groupElm)

        for (var i = 0; i < Config.copies; i++) {
          printWin.document.write(wrap.innerHTML);
        }
        printWin.document.write('</body></html>');

        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(Config.styles));
        printWin.document.head.appendChild(style);

        printWin.document.close(); // necessary for IE >= 10
        printWin.focus(); // necessary for IE >= 10*/


        printWin.setTimeout(function () {
          printWin.print();
        }, 300);

        //printWin.close();

        return true;
      }
      return {
        init: function (cfg) {
          if (!cfg.parentSelector) {
            return;
          }
          var nadpis = document.querySelector(cfg.parentSelector);
          if (!nadpis) {
            return;
          }
          IGCMS.initCfg(Config, cfg)
          var button = document.createElement('button');
          var span = document.createElement('span');
          var span2 = document.createElement('span');
          button.appendChild(span);
          button.className = Config.buttonClass;
          span2.innerHTML = Config.printButtonText;
          button.appendChild(span2);
          button.style = Config.printButtonStyle;
          button.title = Config.printButtonText;
          span.className = Config.printButtonClass;
          nadpis.parentNode.insertBefore(button, nadpis.nextSibling);
          button.addEventListener('click', printNabidka, false);
        }
      }
    };
    
    var styles = `
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700');
* {
  box-sizing: border-box;
}
body {
  font-size: 10pt;
  font-family: 'Frank Ruhl Libre' !important;
  margin: 0;
}
h1, h2, dt {
  font-weight: 500;
}
h1 {
  font-size: 4em;
  position: relative;
  width: 100%;
  top: 18%;
  text-align: center;
}
h1:after {
  content: "";
  width: 15rem;
  height: 15rem;
  display: block;
  background: url("/files/full/design/logo-white-bg.png") no-repeat;
  background-size: contain;
  margin: 1.5em auto 0 auto;
}
h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
}
h2 + p {
  display: none;
}
body > div > div > h1 {
  display: none;
}
body > div > div {
  display: flex;
  flex-wrap: wrap;
}
body > div > div > * {
  flex: 0 1 33%;
  max-width: 33%;
}
.group {
  padding: 12mm 10mm;
  height: 100vh;
  position: relative;
}
.group > *:first-child {
  margin-top: 0;
}
.group:nth-child(3):after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60em;
  height: 55em;
  background: url("/files/piktogram_bile-pozadi.jpg") no-repeat;
  background-position: right bottom;
  background-size: cover;
}
.group > * {
  position: relative;
  z-index: 1;
}
a {
  color: inherit;
  text-decoration: none;
}
svg {
  font-size: 1em;
  margin-right: 0.25em;
  position: relative;
  top: 0em;
  width: 1em;
  color: #b6150d;
}
h1 svg {
  display: none;
}
.meal {
  margin-bottom: 0.5em;
}
.meal dt {
  font-size: 1.2em;
  position: relative;
  margin-bottom: 0.25em;
}
.meal dd {
  margin-left: 0;
  font-style: italic;
}
.meal dt.price {
  display: none;
}
dl.meal dd.price {
  font-weight: 600;
  margin-top: 0.2em;
  font-size: 12pt;
  text-align: right;
  font-style: normal;
}
.meal dd.price > span > span:first-child {
  font-weight: normal;
  margin-right: 0.3rem;
}
.meal dd.price > span + span:before {
  content: ",";
  margin-right: 0.5em;
}
dl.meal dd.price > span > span:first-child {
  text-align: right;
  font-weight: normal;
  font-size: 10pt;
}
dl.meal dd.price > span > span + span {
  font-weight: 600;
}
.meal-oneline dt {
  width: 79%;
  line-height: 1;
  margin-bottom: 0;
  margin-top: 0.5em;
}
.meal-oneline dd.price {
  width: 19%;
  margin-top: 0.5em;
  text-align: right;
}
.meal-oneline dt,
.meal-oneline dd.price {
  box-sizing: border-box;
  display: inline-block;
}
.meal-oneline dd:not(.price) {
  /* display: none; */
}
.meal-oneline:after {
  content: "";
  display: table;
  clear: both;
}
.meal a[href="#signature"] svg {
  margin-left: 0.2em;
  position: relative;
  top: 0.1em;
}
.information svg {
  margin-left: 0;
  margin-right: 0.25em;
}
.meal .tag {
  margin-left: 0.5em;
}
.meal .tag svg {
  padding: 0;
  margin: 0;
  margin-right: 0.25em;
  color: #b6150d !important;
}
.tag,
#informace {
  display: none;
}`;
var styles_2  = `
.group:nth-child(3) {
  order: 4;
}
.group:nth-child(4) {
  order: 3;
}
.group:nth-child(5) {
  order: 6;
}
.group:nth-child(6) {
  order: 5;
}
.group:nth-child(3):after {
  display: none;
}
.group:nth-child(2):after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60em;
  height: 55em;
  background: url(/files/piktogram_bile-pozadi.jpg) no-repeat;
  background-position: right bottom;
  background-size: cover;
}
.group:nth-child(2),
.group:nth-child(6) {
  border-right: thin dashed #ddd;
}
`
    var printable = new Printable()
    printable.init({
      styles: styles + `
h1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
h1:before {
  content: "do 16 hod";
  width: 100%;
  order: 1;
}
h1:after {
  order: 1;
}`,
      parentSelector: 'h1#stala_nabidka',
      printButtonText: 'Vytisknout denní nabídku (A3 na šířku)',
      //childrenSelector: ["h2, h2 + p, .meal:not(.evening)", ".regular_menu.hdesc > *"],
      childrenSelector: ["h2, h2 + p, .meal:not(.evening)", "h1"],
      copies: 1
    })
    /*
    var printable = new Printable()
    printable.init({
      styles: styles + `
h1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
h1:before {
  content: "od 16 hod";
  width: 100%;
  order: 1;
}
h1:after {
  order: 1;
}`,
      parentSelector: '#stala_nabidka',
      printButtonText: 'Vytisknout večerní nabídku',
      //childrenSelector: ["h2, h2 + p, .meal:not(.evening)", ".regular_menu.hdesc > *"],
      childrenSelector: ["h2, h2 + p, .meal:not(.day)", "h1"],
      copies: 1,
      pageBreak: "page-break-evening"
    })
    */
    var printable = new Printable()
    printable.init({
      styles: styles + styles_2,
      parentSelector: 'h1#napojovy_listek',
      printButtonText: 'Vytisknout nápojový lístek (A3 na šířku)',
      //childrenSelector: ["h2, h2 + p, .meal:not(.evening)", ".regular_menu.hdesc > *"],
      childrenSelector: ["h2, h2 + p, .meal:not(.evening)", "", "", "h1"],
      copies: 1
    })
    var printable = new Printable()
    printable.init({
      styles: styles + styles_2,
      parentSelector: 'h1#vinny_listek',
      printButtonText: 'Vytisknout vinný lístek (A3 na šířku)',
      //childrenSelector: ["h2, h2 + p, .meal:not(.evening)", ".regular_menu.hdesc > *"],
      childrenSelector: ["h2, h2 + p, .meal:not(.evening)", "", "", "h1"],
      copies: 1
    })

var styles_3 = `
body {
  margin: 0;
  font-size: 9pt;
}
h1 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
}
h2 {
  font-size: 1.5em;
  margin-top: 0.25em;
}
h1:after {
  display: none;
}
.group {
  padding: 6mm 5mm;
}
.group > *:first-child {
  top: 0;
}
dl.break {
  page-break-before: always;
  margin-top: 6mm;
}
dl.meal {
  margin: 0;
}
dl.meal dd.price {
  font-size: 1.2em;
}
body > div > div > * {
  flex: 0 1 50%;
  max-width: 50%;
}
.group:nth-child(2):after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60em;
  height: 55em;
  background: url("/files/piktogram_bile-pozadi.jpg") no-repeat;
  background-position: right bottom;
  background-size: cover;
}
`
    var printable = new Printable()
    printable.init({
      styles: styles + styles_3,
      parentSelector: 'h1#stala_nabidka_covid',
      printButtonText: 'Tisk (A4 na šířku)',
      //childrenSelector: ["h2, h2 + p, .meal:not(.evening)", ".regular_menu.hdesc > *"],
      childrenSelector: ["h1", "h2, .meal"],
      copies: 1,
      separateLast: false,
    })

    var p = document.createElement("h2")
    p.className = "call"
    p.innerHTML = "Objednávky na čísle +420 777 330 050"
    var printable = new Printable()
    printable.init({
      styles: styles + styles_3 + `
      .call {
        padding-top: 1.5em;
      }
      `,
      parentSelector: 'h1#fastfood',
      printButtonText: 'Tisk (A4 na šířku)',
      //childrenSelector: ["h2, h2 + p, .meal:not(.evening)", ".regular_menu.hdesc > *"],
      childrenSelector: ["h1", "h2, .meal", p],
      copies: 1,
      separateLast: false,
    })
    
    var printable = new Printable()
    printable.init({
      styles: styles + styles_3 + `
      .meal svg {
        display: none;
      }
      #special {
        margin-top: 18rem;
        margin-bottom: 1em;
        font-size: 2.5em;
        text-align: center;
      }
      .group:nth-child(2):after {
        display: none;
      }
      .call {
        padding-top: 1.5em;
      }
      `,
      parentSelector: '#special',
      printButtonText: 'Dotisk A4',
      childrenSelector: ["", "#special", ".special .meal", p],
      copies: 1,
      separateLast: false,
    })

  });
  
})()
