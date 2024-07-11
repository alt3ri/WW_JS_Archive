"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.flowOp = void 0);
const CsvRegistry_1 = require("../CsvConfig/CsvRegistry");
const SexFormat_1 = require("../CsvConfig/SexFormat");
class FlowOp {
  GetState(e, r) {
    return e.States.find((e) => e.Id === r);
  }
  GetStateNames(e) {
    return e.States.map((e) => e.Name);
  }
  GetSexFormat(e) {
    const r = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
      SexFormat_1.SexFormatCsv,
    );
    let t = 0;
    for (t = 0; t < r.length; t++) {
      const s = r[t];
      if (s.MaleText === e) return s.FemaleText;
    }
    return e;
  }
}
exports.flowOp = new FlowOp();
// # sourceMappingURL=Flow.js.map
