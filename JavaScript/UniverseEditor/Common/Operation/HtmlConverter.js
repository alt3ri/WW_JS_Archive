
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.HtmlConverter=void 0;const File_1=require("../Misc/File");class HtmlConverter{static ArrayListToHtml(t){if(!t||0===t.length)return"";let r="<table>\n<thead>\n<tr>\n";var e=Object.keys(t[0]);for(const n of e)r+=`<th>${n}</th>
`;r+="</tr>\n</thead>\n<tbody>\n";for(const s of t){r+="<tr>\n";for(const a of e){var o=s[a];"string"==typeof o&&(o.startsWith("http://")||o.startsWith("https://"))?r+=`<td><a href="${o}" target="_blank">${o}</a></td>`:r+=`<td>${o}</td>
`}r+="</tr>\n"}return r+="</tbody>\n</table>\n"}static WriteArrayListToHtml(t,r){t=this.ArrayListToHtml(t);(0,File_1.writeFile)(r,t)}}exports.HtmlConverter=HtmlConverter;
//# sourceMappingURL=HtmlConverter.js.map