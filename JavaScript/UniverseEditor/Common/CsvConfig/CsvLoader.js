"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CsvMapFieldResolver =
    exports.CsvLoader =
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
    "Long54",
    "Bool",
    "Float",
    "Array<Int>",
    "Array<String>",
    "Array<GameplayTag>",
    "Array<String> && ReplaceIfMatch(EntityCommonTagInfo.TagName,EntityCommonTagInfo.UglyTagName)",
    "Array<Float>",
    "Array<Long>",
    "Array<Long54>",
    "Array<IntArray>",
    "Map<Int,Int>",
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
    17: "Int",
    18: "String",
    19: "Int",
    20: "Long",
    21: "String",
    22: "String",
    5: "String",
    23: "String",
    24: "String",
    25: "String",
    26: "String",
    27: "String",
    28: "String",
    29: "String",
    30: "String",
    32: "String",
    33: "Int",
    34: "String",
    35: "String",
    36: "Array<Int>",
    37: "Array<String>",
    38: "String",
    39: "String",
    40: "Int",
    41: "String",
    42: "Int",
    43: "Int",
    44: "Int",
    45: "String",
    46: "Int",
    47: "String",
    48: "Int",
    49: "Int",
    31: "String",
    50: "Int",
    51: "Int",
    52: "String",
    53: "String",
    7: "String",
    54: "Int",
    55: "Array<String>",
    56: "Array<String>",
    57: "String",
    58: "String",
    59: "String",
    60: "String",
    61: "Array<Int>",
    62: "String",
    63: "Int",
    64: "Array<Int>",
    65: "Map<Int,Int>",
    66: "Array<IntArray>",
    67: "Array<Int>",
    68: "Int",
    69: "Int",
    70: "String",
    71: "String",
    72: "Int",
    73: "Int",
    74: "Int",
    75: "Int",
    76: "String",
    77: "Int",
    78: "Array<IntArray>",
    79: "Array<Float>",
    80: "Array<Float>",
    81: "String",
    82: "Array<String>",
    83: "Int",
    84: "String",
    85: "String",
    86: "String",
    87: "String",
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
    RenderType: 22,
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
      (this.OtherBranchCsv = []),
      (this.krl = void 0);
  }
  get FilterFields() {
    return (
      this.krl || (this.krl = this.FieldTypes.filter((r) => "1" === r.Filter)),
      this.krl
    );
  }
  Bind(r) {
    Object.assign(this, r);
  }
  Nrl(r, e) {
    for (const t of this.FieldTypes) if (r[t.Name] !== e[t.Name]) return !1;
    return !0;
  }
  Frl(e, t, a) {
    let i = 0;
    var n = Array.from(t.keys());
    let s = !1;
    for (let r = 0; r < n.length - 1; r++) {
      var o = n[r],
        l = n[r + 1],
        h = t.get(o),
        c = t.get(l);
      1 !== h.length ||
        1 !== c.length ||
        this.Nrl(h[0], c[0]) ||
        (i++,
        a.push(`【${o}】和【${l}】存在重复索引的行内容不一致【${e}】`),
        (s = !0));
    }
    if (!s)
      for (const r of n)
        1 < t.get(r).length && (i++, a.push(`【${r}】存在重复的索引【${e}】`));
    return i;
  }
  Vrl(r) {
    const a = new Map();
    var e = [];
    for (const n of this.GetAllRowsData()) e.push(...n.Rows);
    e.forEach((e) => {
      var r = this.FilterFields.map((r) => r.CnName + ": " + e[r.Name]).join(
        ", ",
      );
      let t = a.get(r);
      t || ((t = []), a.set(r, t)), t.push(e);
    });
    let t = 0;
    for (const s of a.keys()) {
      var i = a.get(s);
      if (!(i.length <= 1)) {
        const o = new Map();
        i.forEach((r) => {
          var e = r.Branch;
          let t = o.get(e);
          t || ((t = []), o.set(r.Branch, t)), t.push(r);
        }),
          1 < o.size
            ? (t += this.Frl(s, o, r))
            : (t++,
              r.push(
                `【${Array.from(new Set(i.map((r) => r.Branch))).join(", ")}】存在重复的索引【${s}】`,
              ));
      }
    }
    return t;
  }
  BaseCheck(r) {
    var e = 0;
    return (e += this.Vrl(r));
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
    for (const e of [...this.OtherBranchCsv, ...(this.HigherBranchCsv ?? [])])
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
        var a = e[r];
        if (!t.Range.includes(a))
          throw new Error(
            `CSV file [${this.Name}] head field invalid, [${t.CnName}], expect of [${t.Range.join(",")}], actual[${a}]`,
          );
      }
  }
  L(r, e) {
    const t = [];
    var a = csvFieldValidValues[e];
    t.push(a.CnName),
      this.FieldTypes.forEach((r) => {
        t.push(r[e]);
      }),
      r.Write(t);
  }
  M(e) {
    for (let r = 0; r < MAX_HEADER_COUNT; r++) {
      var t,
        a = e.ReadNext();
      if (!a)
        throw new Error(
          `CSV [${this.Name}] header row count [${e.TotalLine}] not enough`,
        );
      if ("#" === a[0]) return;
      if ((1 === r && (this.bkn = a), 2 === r))
        for (let r = 0; r < a.length; r++) {
          var i = [...a[r].matchAll(/】(?:[^\n]*)/g)];
          0 < i.length &&
            ((i = i[i.length - 1][0].replace(/】/, "")), (a[r] = i));
        }
      for (const n in csvFieldValidValues)
        csvFieldValidValues[n].IgnoreSerialize ||
          ((t = csvFieldValidValues[n]), a[0] === t.CnName && this.I(a, n));
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
    if (!e[0]?.startsWith("#")) {
      if ("" !== e.toString() && e.length < this.bkn.length)
        throw new Error(
          `CSV [${this.Name}] 行解析失败，行内容 【${e.toString()}】`,
        );
      var t = {};
      for (let r = 1; r < e.length; r++) {
        var a = this.bkn[r],
          i = this.T.get(a);
        if (i) {
          var n = e[r];
          switch (i.Type) {
            case "Int":
              "" === e[r]
                ? (t[i.Name] = void 0)
                : (t[i.Name] = parseInt(n, 10));
              break;
            case "Long":
            case "Long54":
              t[i.Name] = BigInt(n);
              break;
            case "String":
              t[i.Name] = n;
              break;
            case "Bool":
              t[i.Name] = (0, Util_1.parseBool)(n);
              break;
            case "Float":
              t[i.Name] = parseFloat(n);
              break;
            case "Array<Int>":
              t[i.Name] = (0, Util_1.parseCsvIntArray)(n);
              break;
            case "Array<String>":
            case "Array<GameplayTag>":
            case "Array<String> && ReplaceIfMatch(EntityCommonTagInfo.TagName,EntityCommonTagInfo.UglyTagName)":
              t[i.Name] = (0, Util_1.parseCsvStringArray)(n);
              break;
            case "Array<Float>":
              t[i.Name] = (0, Util_1.parseCsvFloatArray)(n);
              break;
            case "Array<Long>":
            case "Array<Long54>":
              t[i.Name] = (0, Util_1.parseCsvIntArray)(n);
              break;
            case "Array<IntArray>":
              t[i.Name] = (0, Util_1.parseCsvInt2Array)(n);
              break;
            case "Map<Int,Int>":
              t[i.Name] = n;
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
  k(r, a) {
    const i = [];
    i.push(""),
      this.FieldTypes.forEach((r) => {
        var e = a[r.Name];
        if (void 0 === e) i.push("");
        else if (
          "Array<String>" === r.Type ||
          "Array<Int>" === r.Type ||
          "Array<Float>" === r.Type ||
          "Array<Long>" === r.Type
        )
          i.push(`[${e}]`);
        else if (
          "Array<IntArray>" === r.Type &&
          (0, Util_1.isNumber2dArray)(e)
        ) {
          const t = [];
          e.forEach((r) => {
            t.push([r]);
          });
          r = JSON.stringify(t);
          i.push(r);
        } else "string" == typeof e ? i.push(e) : i.push(e.toString());
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
  GetHigherBranchCsvPath(r, e) {
    return (0, File_1.getSavePath)(`Editor/c.Csv/${r}/${e}.csv`).replace(
      "\\",
      "/",
    );
  }
  ibl(e, r) {
    var t,
      a = new Map(),
      r =
        "p4 files " +
        r
          .map(
            (r) =>
              `//aki/development/Source/Config/Raw/Tables/k.可视化编辑/c.Csv/${e}/${r}.csv`,
          )
          .join(" "),
      [r, i] = (0, Util_1.exec)(r);
    if (r)
      for (const n of i.split("\n"))
        n.endsWith("no such file(s).") ||
          /(?<m>delete|move\/delete) change \d+/.test(n) ||
          (([t] = n.split(" - ")),
          ([t] = t.split("#")),
          (t = t.split("/").pop().replace(".csv", "")),
          a.set(t, !0));
    return a;
  }
  RequestDepotCsv(r, e) {
    if (!(0, Util_1.isUePlatform)()) return "";
    e = (0, File_1.getDirName)((0, File_1.getDir)(e));
    let t = r;
    var a = `//aki/${(t = (0, BranchDefine_1.isPlannedBranch)(r) ? "development" : t)}/Source/Config/Raw/Tables/k.可视化编辑/c.Csv/${e}/${r}.csv`;
    return depotCsvCache.has(a)
      ? depotCsvCache.get(a)
      : ((r = `p4 print -q -o ${(e = this.GetHigherBranchCsvPath(e, r))} ` + a),
        (0, Util_1.exec)(r),
        depotCsvCache.set(a, e),
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
  GetRowIdSegment(r) {
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
    var a,
      i = [];
    for (const n of r)
      n !== e &&
        (0, BranchDefine_1.isReachBranch)(n) &&
        ((a = `${t}/${n}.csv`),
        (a = this.Load(a)),
        this.qkn(a, n),
        i.push({
          Name: n,
          FieldTypes: this.FieldTypes,
          Rows: a,
          Tables: [],
          Branch: n,
          Segment: this.GetRowIdSegment(n),
          OtherBranchCsv: [],
        }));
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
        Segment: this.GetRowIdSegment(e),
        OtherBranchCsv: this.j(r),
      }
    );
  }
  LoadHigherBranchCsv(r, e) {
    if (!e.HigherBranchCsv) {
      var t = (0, BranchDefine_1.getAllBranches)();
      if (t && !(e.Tables.length <= 0)) {
        var a,
          i = r + "/" + e.Tables[0].TablePath,
          r =
            ((e.HigherBranchCsv = []),
            t.filter((r) => (0, BranchDefine_1.isHigherBranch)(r, e.Branch))),
          n = this.ibl(e.Tables[0].TablePath, r);
        for (const s of r) {
          let r = [];
          n.get(s) &&
            ((a = i + `/${s}.csv`),
            (a = this.RequestDepotCsv(s, a)),
            (r = this.TryLoad(a))),
            this.qkn(r, s),
            e.HigherBranchCsv.push({
              Name: s,
              FieldTypes: this.FieldTypes,
              Rows: r,
              Tables: [],
              Branch: s,
              Segment: this.GetRowIdSegment(s),
              OtherBranchCsv: [],
            });
        }
      }
    }
  }
  SaveCsv(r, e) {
    this.Save(r.Rows, e);
  }
  OnModifyRow(r, e) {}
}
exports.CsvLoader = CsvLoader;
class CsvMapFieldResolver {
  static ResolveNumberMapField(r) {
    return r
      ? r
          .slice(1, -1)
          .split(",")
          .map((r) => {
            var [r, e] = r.split(":").map(Number);
            return { Key: r, Value: e };
          })
      : [];
  }
}
exports.CsvMapFieldResolver = CsvMapFieldResolver;
//# sourceMappingURL=CsvLoader.js.map
