"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CsvLoader =
    exports.GlobalCsv =
    exports.createCsvField =
    exports.parseCsvValue =
    exports.csvCellTypeConfig =
      void 0);
const BranchDefine_1 = require("../BranchDefine"),
  CsvParser_1 = require("../Misc/CsvParser"),
  File_1 = require("../Misc/File"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Misc/Util");
function parseCsvValue(e, r) {
  return exports.csvCellTypeConfig[r].Parse(e);
}
(exports.csvCellTypeConfig = {
  Int: { Default: 0, Parse: (e) => parseInt(e, 10), Desc: "整形" },
  String: { Default: "", Parse: (e) => e, Desc: "字符串" },
  Boolean: { Default: !1, Parse: (e) => Boolean(e), Desc: "布尔型" },
  Float: { Default: 0, Parse: (e) => parseFloat(e), Desc: "浮点型" },
  UiResource: { Default: "", Parse: (e) => e, Desc: "UI资源" },
}),
  (exports.parseCsvValue = parseCsvValue);
const customExportType = ["C", "S", "CS", "", "@Tag"],
  customValueType = [
    "Int",
    "String",
    "Long",
    "Bool",
    "Float",
    "Array<Int>",
    "Array<String>",
    "",
  ],
  customBoolType = ["1", "0", ""],
  valueTypeByRenderType = {
    [0]: "String",
    1: "Bool",
    2: "String",
    3: "String",
    4: "String",
    8: "String",
    12: "String",
    6: "String",
    9: "String",
    10: "Float",
    11: "String",
    13: "String",
    14: "String",
    15: "String",
    16: "String",
    17: "String",
    18: "Int",
    19: "Long",
    20: "String",
    21: "String",
    5: "String",
    22: "String",
    23: "String",
    24: "String",
    25: "String",
    26: "String",
    27: "String",
    28: "String",
    30: "String",
    31: "Int",
    32: "String",
    33: "String",
    34: "Array<Int>",
    35: "Array<String>",
    36: "String",
    37: "String",
    38: "Int",
    39: "String",
    40: "Int",
    41: "Int",
    42: "Int",
    43: "String",
    44: "Int",
    45: "String",
    46: "Int",
    47: "Int",
    29: "String",
    48: "Int",
    49: "Int",
    50: "String",
    51: "String",
    7: "String",
    52: "Int",
    53: "Array<String>",
    54: "Array<String>",
    55: "String",
    56: "String",
    57: "String",
    58: "String",
  },
  csvFieldValidValues = {
    ExportType: { CnName: "客户端/服务端 使用", Range: customExportType },
    Name: { CnName: "字段名" },
    Type: { CnName: "字段数据类型", Range: customValueType },
    Filter: { CnName: "该字段是否用于条件筛选", Range: customBoolType },
    Localization: { CnName: "是否导出多语言", Range: customBoolType },
    Condition: { CnName: "条件检查" },
    Default: { CnName: "默认值" },
    CnName: { CnName: "#" },
    RenderType: { CnName: "", IgnoreSerialize: !0 },
  },
  depotCsvCache = new Map();
function createDefaultCsvFiledEx() {
  return {
    ExportType: "C",
    Name: "default",
    Type: "String",
    Filter: "0",
    Localization: "0",
    Condition: "",
    Default: "",
    CnName: "未知",
    RenderType: 21,
    Tip: "",
    CreateType: "prevRow",
  };
}
function createCsvField(e) {
  var r = createDefaultCsvFiledEx();
  return Object.assign(r, e), r;
}
exports.createCsvField = createCsvField;
class GlobalCsv {
  constructor() {
    (this.Name = ""),
      (this.FieldTypes = []),
      (this.Rows = []),
      (this.Tables = []),
      (this.Branch = "development"),
      (this.OtherBranchCsv = []);
  }
  Bind(e) {
    Object.assign(this, e);
  }
  Check(e) {
    return 0;
  }
  CreateDefault(e) {
    return e;
  }
}
exports.GlobalCsv = GlobalCsv;
class CsvLoader {
  constructor(e, r) {
    (this.aOn = []),
      (this.T = new Map()),
      (this.FiledTypes = r.slice()),
      (this.Name = e),
      r.forEach((e) => {
        this.T.set(e.Name, e);
      }),
      this.v(),
      this.g();
  }
  v() {
    let r = 0;
    if (
      (this.FiledTypes.forEach((e) => {
        "1" === e.Filter && r++;
      }),
      r <= 0)
    )
      throw new Error(`[${this.Name}]: No index key (field [filter] = 1)`);
  }
  g() {
    this.FiledTypes.forEach((e) => {
      var r = valueTypeByRenderType[e.RenderType];
      if (r !== e.Type)
        throw new Error(
          `[${this.Name}]: [${e.Name}] Type [${e.Type}] not match renderType [${e.RenderType}][${r}]`,
        );
    });
  }
  I(r, e) {
    var t = csvFieldValidValues[e];
    if (r[0] !== t.CnName)
      throw new Error(
        `CSV file [${this.Name}] first column invalid, expect[${t.CnName}] actual:[${r[0]}]`,
      );
    "Name" === e && (this.aOn = r);
    for (let e = 1; e < r.length; e++)
      if (t.Range) {
        var i = r[e];
        if (!t.Range.includes(i))
          throw new Error(
            `CSV file [${this.Name}] head field invalid, [${t.CnName}], expect of [${t.Range.join(",")}], actual[${i}]`,
          );
      }
  }
  L(e, r) {
    const t = [];
    var i = csvFieldValidValues[r];
    t.push(i.CnName),
      this.FiledTypes.forEach((e) => {
        t.push(e[r]);
      }),
      e.Write(t);
  }
  M(e) {
    for (const t in csvFieldValidValues) {
      var r = csvFieldValidValues[t];
      if (!r.IgnoreSerialize) {
        r = e.ReadNext();
        if (!r)
          throw new Error(
            `CSV [${this.Name}] header row count [${e.TotalLine}] not enough`,
          );
        this.I(r, t);
      }
    }
  }
  GetCsvFieldConfig(e) {
    return this.T.get(e);
  }
  F(e) {
    var r = e.ReadNext();
    if (!r)
      throw new Error(
        `CSV [${this.Name}] row count [${e.TotalLine}] not enough`,
      );
    var t = {};
    for (let e = 1; e < r.length; e++) {
      var i = this.aOn[e],
        a = this.T.get(i);
      if (a) {
        var n = r[e];
        switch (a.Type) {
          case "Int":
            "" === r[e] ? (t[a.Name] = void 0) : (t[a.Name] = parseInt(n, 10));
            break;
          case "Long":
            t[a.Name] = BigInt(n);
            break;
          case "String":
            t[a.Name] = n;
            break;
          case "Bool":
            t[a.Name] = (0, Util_1.parseBool)(n);
            break;
          case "Float":
            t[a.Name] = parseFloat(n);
            break;
          case "Array<Int>":
            t[a.Name] = (0, Util_1.parseCsvIntArray)(n);
            break;
          case "Array<String>":
            t[a.Name] = (0, Util_1.parseCsvStringArray)(n);
        }
      }
    }
    return t;
  }
  P(e) {
    for (var r = []; !e.IsEnd; ) r.push(this.F(e));
    return r;
  }
  O(e) {
    for (const r in csvFieldValidValues)
      csvFieldValidValues[r].IgnoreSerialize || this.L(e, r);
  }
  k(e, t) {
    const i = [];
    i.push(""),
      this.FiledTypes.forEach((e) => {
        var r = t[e.Name];
        void 0 === r
          ? i.push("")
          : "Array<String>" === e.Type || "Array<Int>" === e.Type
            ? i.push(`[${r}]`)
            : "string" == typeof r
              ? i.push(r)
              : i.push(r.toString());
      }),
      e.Write(i);
  }
  q(r, e) {
    e.forEach((e) => {
      this.k(r, e);
    });
  }
  Parse(e) {
    e = new CsvParser_1.LineReader(e);
    return e.IsValid ? (this.M(e), this.P(e)) : [];
  }
  ParseOne(e) {
    e = new CsvParser_1.LineReader(e);
    if (e.IsValid) return this.M(e), this.F(e);
  }
  Stringify(e) {
    var r = new CsvParser_1.LineWriter();
    return this.O(r), this.q(r, e), r.Gen();
  }
  StringifyOne(e) {
    var r = new CsvParser_1.LineWriter();
    return this.O(r), this.k(r, e), r.Gen();
  }
  Load(e) {
    var r = (0, File_1.readFile)(e);
    return r ? ((0, Log_1.log)(`Load csv: [${e}]`), this.Parse(r)) : [];
  }
  TryLoad(e) {
    e = (0, File_1.readFile)(e);
    return e ? this.Parse(e) : [];
  }
  LoadOne(e) {
    e = (0, File_1.readFile)(e);
    if (e) return this.ParseOne(e);
  }
  Save(e, r) {
    (0, File_1.writeFile)(r, this.Stringify(e));
  }
  SaveOne(e, r) {
    (0, File_1.writeFile)(r, this.StringifyOne(e));
  }
  RequestDepotCsv(e, r) {
    var t, i;
    return (0, Util_1.isUePlatform)()
      ? depotCsvCache.has(r)
        ? depotCsvCache.get(r)
        : ((i = r.indexOf("/c.Csv/")),
          (i = r.substring(i + 1)),
          (e =
            `p4 print -q -o ${(t = (0, File_1.getSavePath)("Editor/" + i).replace("\\", "/"))} //aki/${e}/Source/Config/Raw/Tables/k.可视化编辑/` +
            i),
          (0, Util_1.exec)(e),
          (i = (0, File_1.existFile)(t) ? t : ""),
          depotCsvCache.set(r, i),
          i)
      : "";
  }
  V(e) {
    return e.replace(/\\/g, "/").split("/").pop().replace(".csv", "");
  }
  hOn(e, r) {
    e.forEach((e) => {
      e.Branch = r;
    });
  }
  j(e) {
    var r = this.V(e),
      t = (0, File_1.getDir)(e),
      e = (0, BranchDefine_1.getAllBranches)();
    if (!e) return [];
    var i = [];
    for (const n of e)
      if (n !== r) {
        var a = `${t}/${n}.csv`;
        let e = a;
        (0, File_1.existFile)(a) ||
          (0, BranchDefine_1.isReachBranch)(n) ||
          ((a = this.RequestDepotCsv(n, a)),
          (0, File_1.existFile)(a) && (e = a));
        a = this.TryLoad(e);
        this.hOn(a, n),
          i.push({
            Name: n,
            FieldTypes: this.FiledTypes,
            Rows: a,
            Tables: [],
            Branch: n,
            OtherBranchCsv: [],
          });
      }
    return i;
  }
  LoadCsv(e) {
    var r = this.V(e),
      t = this.Load(e);
    return (
      this.hOn(t, r),
      {
        Name: this.Name,
        FieldTypes: this.FiledTypes,
        Rows: t,
        Tables: [],
        Branch: r,
        OtherBranchCsv: this.j(e),
      }
    );
  }
  SaveCsv(e, r) {
    this.Save(e.Rows, r);
  }
}
exports.CsvLoader = CsvLoader;
//# sourceMappingURL=CsvLoader.js.map
