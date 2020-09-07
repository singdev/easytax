function printIRPP() {
    var printContents = document.getElementById('fiche-irpp').innerHTML;
    var popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write(`<html><head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost&family=Noto+Sans&family=Noto+Sans+JP&family=Open+Sans&display=swap" />
        <link rel="stylesheet" href="/stylesheets/declaration.css" />
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <link rel="stylesheet" href="/stylesheets/page.css" />
        <link rel="stylesheet" href="/stylesheets/declaration/is1_fiche.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/declaration/irpp_fiche.css" />
        </head><body onload="window.print()">` + printContents + '</body></html>');
    popupWin.document.close();
}