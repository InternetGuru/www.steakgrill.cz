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
        allChildren: false,
        copies: 16,
        printToPng: false,
      },
      w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight,
      printNabidka = function (event) {
        var printWin = window.open('', 'PRINT', 'height=' + y + ',width=' + x);
        var id = document.querySelector(Config.parentSelector).id
        printWin.document.write(`
          <html>
            <head>
              <title>${id}</title>
              <link href="//fonts.googleapis.com/css?family=Roboto:400,500&amp;subset=latin-ext" rel="stylesheet">
              <script type="text/javascript" src="/themes/lib/dom-to-image.min.js"></script>
            </head>
            <body>`);

        var wrap = document.createElement('div');
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        wrap.appendChild(div1);
        div1.appendChild(div2);
        var h1 = document.createElement('h1');
        h1.innerHTML = document.querySelector(Config.parentSelector).title;
        div2.appendChild(h1);
        for (var i = 0; i < Config.childrenSelector.length; i++) {
          if (Config.allChildren) {
            var children = document.querySelectorAll(Config.childrenSelector[i]);
            for (var j = 0; j < children.length; j++) {
              div2.appendChild(children[j].cloneNode(true));
            }
          } else {
            var children = document.querySelector(Config.childrenSelector[i]);
            div2.appendChild(children.cloneNode(true));
          }
        }

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
        
        if (Config.printToPng) {
          var script = printWin.document.createElement("script")
          script.innerHTML = `
          function docReady (fn) {
            // see if DOM is already available
            if (document.readyState === "complete" || document.readyState === "interactive") {
              // call on next available tick
              setTimeout(fn, 1);
            } else {
              document.addEventListener("DOMContentLoaded", fn);
            }
          }
          var scale = 2.5
          docReady(() => { setTimeout(() => { 
            domtoimage.toPng(document.body.firstElementChild, {
              width: document.body.firstElementChild.clientWidth * scale,
              height: document.body.firstElementChild.clientHeight * scale,
              style: {
                'transform': 'scale(' + scale + ')',
                'transform-origin': 'top left',
              }
            })
            .then(function (dataUrl) {
              var link = document.createElement('a');
              link.download = "${id}";
              link.href = dataUrl;
              link.click();
            });
          }, 250) })
          `
          printWin.document.head.appendChild(script)
          return true;
        }

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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.wf-active body {
  font-family: 'Frank Ruhl Libre', serif;
}
body > div {
  display: inline-block;
  float: left;
  width: 25vw;
  height: 50vh;
  background: #ddd;
  padding: 1.5mm;
  position: relative;
  z-index: -1;
}
div > div {
  background: white;
  height: 100%;
  position: relative;
  padding-bottom: 2em;
}
div > div:before {
  content:"";
  display: block;
  position: absolute;
  width: 100%;
  height: calc(100% + 3mm);
  background: white;
  top: -1.5mm;
  z-index: -1;
}
div > div:after {
  content:"";
  display: block;
  position: absolute;
  width: calc(100% + 3mm);
  height: 100%;
  background: white;
  left: -1.5mm;
  top: 0;
  z-index: -1;
}
body > div > div > * {
  position: relative;
  z-index: 1;
}
body > div:after {
  content:"";
  width: 66%;
  height: 100%;
  background: url("/files/piktogram_orez_4.png") no-repeat bottom right;
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  background-size:  contain;
}
dt.price,
.noprint {
  display: none;
}
@media all and (orientation: portrait) and (min-width: 200mm) {
  body > div {
    height: 25vh;
  }
}
/**********************/
div {
  font-size: 10pt;
}
h1, dl {
  padding: 1em 2rem;
}
h1 +dl {
  padding-top: 0;
}
h1 {
  font-weight: 500;
  padding-top: 1.5em;
}
dl dt,
dl dd {
  margin: 0;
  position: relative;
}
dl.meal dt {
  position: relative;
  font-size: 12pt;
  font-weight: 600;
  margin-bottom: 0.3em;
}
dl.meal dd.price {
  font-weight: 600;
  margin-top: 0.2em;
  font-size: 12pt;
  text-align: right;
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
dl.meal {
  margin: 0 auto;
  max-width: 28.5em;
  padding-left: 4.3em;
}
dl.meal svg {
  font-size: 1em;
  width: 1em;
  display: inline-block;
  position: absolute;
  left: -1.7em;
  top: 0.1em;
} 
h1 {
  max-width: 25rem;
  margin: 0 auto;
}
/*************************/
body > div {
  width: max-content;
  height: max-content;
  overflow: hidden;
}
dl.meal dd:not(.price) {
  padding-right: 1em;
  font-style: italic;
}
`
    
const styles2 = `
body > div {
  width: 148.25mm;
  height: 209mm;
}
body > div > div > * {
  margin: 0 auto;
}
h1 {
  padding-top: 2em;
  max-width: 30.5rem;
  left: 0;
  margin-left: auto;
  margin-right: auto;
}
.meal {
  padding-bottom: 0.5em;
  max-width: 35.5em !important;
}
`
 
    var printable = new Printable()
    printable.init({
      styles: styles + styles2 + `
      h1 {
        padding-top: 0.75em;
        padding-bottom: 0.75em;
        font-size: 1.5em
      }
      dl.meal {
        padding-bottom: 0;
        padding-top: 0.35em;
        position: relative;
        left: 0.25em;
      }
      dl.meal dt {
        margin-bottom: 0.15em;
      }
      dl.meal dd.price {
        margin-top: 0;
      }
      `,
      parentSelector: '#denni_nabidka, #daily_offer',
      printButtonText: 'Tisk 4 × A5',
      childrenSelector: [".daily_offer dl.meal"],
      allChildren: true,
      copies: 4
    })
    
    var meals = document.querySelectorAll(".daily_offer dl.meal")
    var meals1 = []
    var meals2 = []

    for (var i = 0; i < meals.length; i++) {
      if (i < meals.length / 2) {
        meals2 += "\n body > div:nth-child(2) dl:nth-of-type(" + (i+1) + ") { display:none; }"
        continue
      }
       meals1 += "\n body > div:nth-child(1) dl:nth-of-type(" + (i+1) + ") { display:none; }"
    }

    var printable = new Printable()
    printable.init({
      styles: styles + styles2 + meals1 + meals2,
      parentSelector: '#denni_nabidka, #daily_offer',
      printButtonText: 'Tisk na dvě strany A5',
      childrenSelector: [".daily_offer dl.meal"],
      allChildren: true,
      copies: 2
    })
    var printable = new Printable()
    printable.init({
      styles: styles + styles2 + `
      body {
        width: 110mm;
        height: 209mm;
      }
      body > div {
        background: white;
        background-size: contain;
        width: 100%;
        height: 100%;
      }
      div > div:before,
      div > div:after {
        display: none;
      }
      div > div {
        background: none;
      }
      body > div:after {
        display: none;
      }
      h1 {
        padding-top: 1em;
      }
      `,
      parentSelector: '#denni_nabidka, #daily_offer',
      printButtonText: 'Export',
      childrenSelector: [".daily_offer dl.meal"],
      allChildren: true,
      copies: 1,
      printToPng: true,
      printButtonClass: "noprint fas fa-file-image",
    })
    
    var printable2 = new Printable()
    printable2.init({
      styles: styles,
      parentSelector: '#special',
      printButtonText: 'Tisk 4 × A6',
      childrenSelector: [".special dl.meal[data-type='Starter']", ".special dl.meal[data-type='Main meal']"],
      allChildren: true,
      copies: 4
    })

    var printable = new Printable()
    printable.init({
      styles: styles + styles2,
      parentSelector: '#special',
      printButtonText: 'Tisk 4 × A5',
      childrenSelector: [".daily_offer dl.meal"],
      allChildren: true,
      copies: 4
    })

    var printable3 = new Printable()
    printable3.init({
      styles: styles + "body > div { width: 33vw; height: 20vh; } img { display: none; } dl.meal dt + dd { font-style: normal !important; font-weight: 600; font-size: 12pt; margin-bottom: 0.3em; } }",
      parentSelector: '#pivo, #beer',
      printButtonText: 'Vytisknout speciální nabídku piva (3×5, A3 na výšku)',
      childrenSelector: [".beer dl.meal[data-type='Beer']"],
      copies: 15
    })

  });
  
})()