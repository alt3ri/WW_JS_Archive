"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CsvLoader =
    exports.GlobalCsv =
    exports.createCsvField =
    exports.parseCsvValue =
    exports.csvCellTypeConfig =
      void 0);
const BranchDefine_1 = require("../BranchDefine"),
  Config_1 = require("../Config"),
  CsvParser_1 = require("../Misc/CsvParser"),
  File_1 = require("../Misc/File"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Misc/Util");
function parseCsvValue(r, e) {
  return exports.csvCellTypeConfig[e].Parse(r);
}
(exports.csvCellTypeConfig = {
  Int: { Default: 0, Parse: (r) => parseInt(r, 10), Desc: "整形" },
  String: { Default: "", Parse: (r) => r, Desc: "字符串" },
  Boolean: { Default: !1, Parse: (r) => Boolean(r), Desc: "布尔型" },
  Float: { Default: 0, Parse: (r) => parseFloat(r), Desc: "浮点型" },
  UiResource: { Default: "", Parse: (r) => r, Desc: "UI资源" },
}),
  (exports.parseCsvValue = parseCsvValue);
const customExportType = ["C", "S", "CS", "", "@Tag", "@Version"],
  customValueType = [
    "Int",
    "String",
    "Long",
    "Bool",
    "Float",
    "Array<Int>",
    "Array<String>",
    "Array<Float>",
    "Array<Long>",
    "Array<IntArray>",
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
    29: "String",
    31: "String",
    32: "Int",
    33: "String",
    34: "String",
    35: "Array<Int>",
    36: "Array<String>",
    37: "String",
    38: "String",
    39: "Int",
    40: "String",
    41: "Int",
    42: "Int",
    43: "Int",
    44: "String",
    45: "Int",
    46: "String",
    47: "Int",
    48: "Int",
    30: "String",
    49: "Int",
    50: "Int",
    51: "String",
    52: "String",
    7: "String",
    53: "Int",
    54: "Array<String>",
    55: "Array<String>",
    56: "String",
    57: "String",
    58: "String",
    59: "String",
    60: "Array<Int>",
    61: "String",
    62: "Int",
    63: "Array<Int>",
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
  MAX_HEADER_COUNT = 10,
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
function createCsvField(r) {
  var e = createDefaultCsvFiledEx();
  return Object.assign(e, r), e;
}
exports.createCsvField = createCsvField;
class GlobalCsv {
  constructor() {
    (this.Name = ""),
      (this.FieldTypes = []),
      (this.Rows = []),
      (this.Tables = []),
      (this.Branch = "development"),
      (this.Segment = [0, 0]),
      (this.OtherBranchCsv = []);
  }
  Bind(r) {
    Object.assign(this, r);
  }
  Check(r) {
    return 0;
  }
  CreateDefault(r) {
    return r;
  }
  GetAllRowsData() {
    var r = [];
    r.push({ Branch: this.Branch, Rows: this.Rows });
    for (const e of this.OtherBranchCsv)
      (0, BranchDefine_1.isReachBranch)(e.Branch) &&
        r.push({ Branch: e.Branch, Rows: e.Rows });
    return r;
  }
}
exports.GlobalCsv = GlobalCsv;
class CsvLoader {
  constructor(r, e) {
    (this.bkn = []),
      (this.T = new Map()),
      (this.FieldTypes = e.slice()),
      (this.Name = r),
      e.forEach((r) => {
        this.T.set(r.Name, r);
      }),
      this.v(),
      this.g();
  }
  v() {
    let e = 0;
    if (
      (this.FieldTypes.forEach((r) => {
        "1" === r.Filter && e++;
      }),
      e <= 0)
    )
      throw new Error(`[${this.Name}]: No index key (field [filter] = 1)`);
  }
  g() {
    this.FieldTypes.forEach((r) => {
      var e = valueTypeByRenderType[r.RenderType];
      if (e !== r.Type)
        throw new Error(
          `[${this.Name}]: [${r.Name}] Type [${r.Type}] not match renderType [${r.RenderType}][${e}]`,
        );
    });
  }
  I(e, r) {
    var t = csvFieldValidValues[r];
    for (let r = 1; r < e.length; r++)
      if (t.Range) {
        var i = e[r];
        if (!t.Range.includes(i))
          throw new Error(
            `CSV file [${this.Name}] head field invalid, [${t.CnName}], expect of [${t.Range.join(",")}], actual[${i}]`,
          );
      }
  }
  L(r, e) {
    const t = [];
    var i = csvFieldValidValues[e];
    t.push(i.CnName),
      this.FieldTypes.forEach((r) => {
        t.push(r[e]);
      }),
      r.Write(t);
  }
  M(e) {
    for (let r = 0; r < MAX_HEADER_COUNT; r++) {
      var t,
        i = e.ReadNext();
      if (!i)
        throw new Error(
          `CSV [${this.Name}] header row count [${e.TotalLine}] not enough`,
        );
      if ("#" === i[0]) return;
      1 === r && (this.bkn = i);
      for (const a in csvFieldValidValues)
        csvFieldValidValues[a].IgnoreSerialize ||
          ((t = csvFieldValidValues[a]), i[0] === t.CnName && this.I(i, a));
    }
  }
  GetCsvFieldConfig(r) {
    return this.T.get(r);
  }
  F(r) {
    var e = r.ReadNext();
    if (!e)
      throw new Error(
        `CSV [${this.Name}] row count [${r.TotalLine}] not enough`,
      );
    if ("" !== e.toString() && e.length < this.bkn.length)
      throw new Error(
        `CSV [${this.Name}] 行解析失败，行内容 【${e.toString()}】`,
      );
    if (!e[0]?.startsWith("#")) {
      var t = {};
      for (let r = 1; r < e.length; r++) {
        var i = this.bkn[r],
          a = this.T.get(i);
        if (a) {
          var n = e[r];
          switch (a.Type) {
            case "Int":
              "" === e[r]
                ? (t[a.Name] = void 0)
                : (t[a.Name] = parseInt(n, 10));
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
              break;
            case "Array<Float>":
              t[a.Name] = (0, Util_1.parseCsvFloatArray)(n);
              break;
            case "Array<Long>":
              t[a.Name] = (0, Util_1.parseCsvIntArray)(n);
              break;
            case "Array<IntArray>":
              t[a.Name] = (0, Util_1.parseCsvInt2Array)(n);
          }
        }
      }
      return t;
    }
  }
  P(r) {
    for (var e = []; !r.IsEnd; ) {
      var t = this.F(r);
      t && e.push(t);
    }
    return e;
  }
  O(r) {
    for (const e in csvFieldValidValues)
      csvFieldValidValues[e].IgnoreSerialize || this.L(r, e);
  }
  k(r, t) {
    const i = [];
    i.push(""),
      this.FieldTypes.forEach((r) => {
        var e = t[r.Name];
        void 0 === e
          ? i.push("")
          : "Array<String>" === r.Type ||
              "Array<Int>" === r.Type ||
              "Array<Float>" === r.Type ||
              "Array<Long>" === r.Type ||
              "Array<IntArray>" === r.Type
            ? i.push(`[${e}]`)
            : "string" == typeof e
              ? i.push(e)
              : i.push(e.toString());
      }),
      r.Write(i);
  }
  q(e, r) {
    r.forEach((r) => {
      this.k(e, r);
    });
  }
  Parse(r) {
    r = new CsvParser_1.LineReader(r);
    return r.IsValid ? (this.M(r), this.P(r)) : [];
  }
  ParseOne(r) {
    r = new CsvParser_1.LineReader(r);
    if (r.IsValid) return this.M(r), this.F(r);
  }
  Stringify(r) {
    var e = new CsvParser_1.LineWriter();
    return this.O(e), this.q(e, r), e.Gen();
  }
  StringifyOne(r) {
    var e = new CsvParser_1.LineWriter();
    return this.O(e), this.k(e, r), e.Gen();
  }
  Load(e) {
    var r = (0, File_1.readFile)(e);
    if (r)
      try {
        return (0, Log_1.log)(`Load csv: [${e}]`), this.Parse(r);
      } catch (r) {
        if (r instanceof Error)
          throw new Error(
            `CSV [${e}] 解析失败，错误如下:
` + r.message,
          );
      }
    return [];
  }
  TryLoad(e) {
    try {
      var r = (0, File_1.readFile)(e);
      return r ? this.Parse(r) : [];
    } catch (r) {
      if (r instanceof Error)
        throw new Error(
          `CSV [${e}] 解析失败，错误如下:
` + r.message,
        );
    }
    return [];
  }
  LoadOne(r) {
    r = (0, File_1.readFile)(r);
    if (r) return this.ParseOne(r);
  }
  Save(r, e) {
    (0, File_1.writeFile)(e, this.Stringify(r));
  }
  SaveOne(r, e) {
    (0, File_1.writeFile)(e, this.StringifyOne(r));
  }
  GetOtherBranchCsvPath(r, e) {
    return (0, File_1.getSavePath)(`Editor/c.Csv/${r}/${e}.csv`).replace(
      "\\",
      "/",
    );
  }
  RequestDepotCsv(r, e) {
    if (!(0, Util_1.isUePlatform)()) return "";
    e = (0, File_1.getDirName)((0, File_1.getDir)(e));
    let t = r;
    var i = `//aki/${(t = (0, BranchDefine_1.isPlannedBranch)(r) ? "development" : t)}/Source/Config/Raw/Tables/k.可视化编辑/c.Csv/${e}/${r}.csv`;
    return depotCsvCache.has(i)
      ? depotCsvCache.get(i)
      : ((r = `p4 print -q -o ${(e = this.GetOtherBranchCsvPath(e, r))} ` + i),
        (0, Util_1.exec)(r),
        depotCsvCache.set(i, e),
        e);
  }
  V(r) {
    return r.replace(/\\/g, "/").split("/").pop().replace(".csv", "");
  }
  qkn(r, e) {
    r.forEach((r) => {
      r.Branch = e;
    });
  }
  IDa(r) {
    var e = (
      (0, BranchDefine_1.isPlannedBranch)(r)
        ? (0, BranchDefine_1.getPlannedBranchSegment)
        : (0, BranchDefine_1.getBranchSegment)
    )(r);
    if (e) return e;
    throw new Error(`[${r}] id segment not found`);
  }
  j(r) {
    var e = this.V(r),
      t = (0, File_1.getDir)(r),
      r = (0, BranchDefine_1.getAllBranches)();
    if (!r) return [];
    var i = [];
    for (const n of r)
      if (n !== e) {
        var a = `${t}/${n}.csv`;
        let r = a;
        Config_1.Config.IsStartWithCliServer ||
          (0, Util_1.isPipelineEnv)() ||
          (0, File_1.existFile)(a) ||
          (0, BranchDefine_1.isReachBranch)(n) ||
          ((a = this.RequestDepotCsv(n, a)),
          (0, File_1.existFile)(a) && (r = a));
        a = this.TryLoad(r);
        this.qkn(a, n),
          i.push({
            Name: n,
            FieldTypes: this.FieldTypes,
            Rows: a,
            Tables: [],
            Branch: n,
            Segment: this.IDa(n),
            OtherBranchCsv: [],
          });
      }
    return i;
  }
  LoadCsv(r) {
    var e = this.V(r),
      t = this.Load(r);
    return (
      this.qkn(t, e),
      {
        Name: this.Name,
        FieldTypes: this.FieldTypes,
        Rows: t,
        Tables: [],
        Branch: e,
        Segment: this.IDa(e),
        OtherBranchCsv: this.j(r),
      }
    );
  }
  SaveCsv(r, e) {
    this.Save(r.Rows, e);
  }
  OnModifyRow(r, e) {}
}
exports.CsvLoader = CsvLoader;
//# sourceMappingURL=CsvLoader.js.map
