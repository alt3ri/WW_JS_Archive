"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.testGetDescText = exports.getDescText = void 0);
const CsvRegistry_1 = require("../CsvConfig/CsvRegistry"),
  DescTextCsv_1 = require("../CsvConfig/DescTextCsv"),
  descTextMap = new Map();
function getDescText(e) {
  if (0 < descTextMap.size) {
    const t = descTextMap.get(e);
    return t || "";
  }
  for (const s of CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
    DescTextCsv_1.DescTextCsv,
  ))
    descTextMap.set(s.Id, s.Text);
  const t = descTextMap.get(e);
  return t || "";
}
function testGetDescText(e) {
  if (0 < descTextMap.size) {
    const t = descTextMap.get(e);
    return t || "";
  }
  for (const s of CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
    DescTextCsv_1.DescTextCsv,
  ))
    descTextMap.set(s.Id, s.Text);
  const t = descTextMap.get(e);
  return t || "";
}
(exports.getDescText = getDescText),
  (exports.testGetDescText = testGetDescText);
//# sourceMappingURL=DescText.js.map
