"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomSegmentIdGenerator =
    exports.segmentIdGeneratorManager =
    exports.SegmentIdGeneratorManager =
    exports.SegmentIdGenerator =
    exports.isAdmin =
    exports.isDeveloper =
    exports.getLocalSegmentName =
    exports.getLocalSegmentId =
    exports.clearLocalSegmentRow =
    exports.getAccountSegmentNames =
    exports.getAccountSegmentRows =
    exports.getCreatorById =
    exports.getSegmentIdByCreator =
    exports.getCreatorBySegmentId =
    exports.getCreaterNameById =
    exports.getCreaterDescById =
    exports.getSegmentId =
    exports.getIdCountPerSegment =
    exports.loadIdSegmentConfig =
      void 0);
const Init_1 = require("../../Interface/Init"),
  BranchDefine_1 = require("../BranchDefine"),
  Config_1 = require("../Config"),
  EventSystem_1 = require("../Misc/EventSystem"),
  File_1 = require("../Misc/File"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Misc/Util");
function getIdSegmentConfigPath() {
  return (0, Init_1.isUe5)()
    ? "Content/Editor/Config/IdSegmentConfig.json"
    : "Content/Aki/UniverseEditor/Config/IdSegmentConfig.json";
}
function loadIdSegmentConfig() {
  var e = (0, File_1.getProjectPath)(getIdSegmentConfigPath());
  return (0, Util_1.readJsonObj)(e, []);
}
exports.loadIdSegmentConfig = loadIdSegmentConfig;
const ID_COUNT_PER_SEGMENT = 1e6;
function getIdCountPerSegment() {
  return ID_COUNT_PER_SEGMENT;
}
function checkSegmentConfig(e) {
  let t = 0;
  e.forEach((e) => {
    e.SegmentId > t && (t = e.SegmentId);
  });
  e = Math.floor(2147483647.5 / ID_COUNT_PER_SEGMENT);
  if (t >= e) throw new Error(`配置段id超出范围, 最大值[${e}] 当前值[${t}]`);
}
exports.getIdCountPerSegment = getIdCountPerSegment;
let segmentMap = new Map();
function getSegmentMap() {
  var e;
  return (
    0 === segmentMap.size &&
      (checkSegmentConfig((e = loadIdSegmentConfig())),
      (segmentMap = (0, Util_1.arrayToMap)(e, "SegmentId"))),
    segmentMap
  );
}
function getSegmentId(e) {
  return Math.floor(e / ID_COUNT_PER_SEGMENT);
}
function getCreaterDescById(e) {
  (e = getSegmentId(e)), (e = getSegmentMap().get(e));
  return `${e?.Name}(${e?.SegmentId})`;
}
function getCreaterNameById(e) {
  e = getSegmentId(e);
  return "" + getSegmentMap().get(e)?.Name;
}
function getCreatorBySegmentId(e) {
  return "" + getSegmentMap().get(e)?.Name;
}
(exports.getSegmentId = getSegmentId),
  (exports.getCreaterDescById = getCreaterDescById),
  (exports.getCreaterNameById = getCreaterNameById),
  (exports.getCreatorBySegmentId = getCreatorBySegmentId);
let segmentIdByCreator = new Map();
function getSegmentIdByCreator(e) {
  return (
    0 === segmentIdByCreator.size &&
      ((segmentIdByCreator = new Map()),
      getSegmentMap().forEach((e) => {
        segmentIdByCreator.set(e.Name, e.SegmentId);
      })),
    segmentIdByCreator.get(e)
  );
}
function getCreatorById(e) {
  return getCreatorBySegmentId(getSegmentId(e));
}
(exports.getSegmentIdByCreator = getSegmentIdByCreator),
  (exports.getCreatorById = getCreatorById);
let localSegmentRow = void 0;
function getLocalSegmentRow() {
  var e = getSegmentMap(),
    e = Array.from(e.values());
  if (
    !(localSegmentRow =
      !localSegmentRow && Config_1.Config.Instance.VirtualMacAddress
        ? e.find(
            (e) =>
              Config_1.Config.Instance.VirtualMacAddress === e.MacAddress ||
              Config_1.Config.Instance.VirtualMacAddress === e.NetworkAddress,
          )
        : localSegmentRow)
  ) {
    const t = Config_1.Config.Instance.NetworkAddress;
    localSegmentRow = e.find((e) => e.NetworkAddress === t);
  }
  if (!localSegmentRow) {
    const n = Config_1.Config.Instance.MacAddress;
    localSegmentRow = e.find((e) => e.MacAddress === n);
  }
  return localSegmentRow;
}
function getAccountSegmentRows() {
  var e,
    t = [];
  for ([, e] of getSegmentMap()) e.Account && t.push(e);
  return t;
}
function getAccountSegmentNames() {
  var e = getSegmentMap();
  const t = [];
  return (
    e.forEach((e) => {
      t.push(e.Name);
    }),
    t
  );
}
function clearLocalSegmentRow() {
  localSegmentRow = void 0;
}
function getLocalSegmentId() {
  return getLocalSegmentRow()?.SegmentId;
}
function getLocalSegmentName() {
  return getLocalSegmentRow()?.Name;
}
function isDeveloper() {
  return !!(0, Init_1.isUe5)() || !!getLocalSegmentRow()?.IsDevelop;
}
function isAdmin() {
  return !!(0, Init_1.isUe5)() || !!getLocalSegmentRow()?.IsAdmin;
}
(exports.getAccountSegmentRows = getAccountSegmentRows),
  (exports.getAccountSegmentNames = getAccountSegmentNames),
  (exports.clearLocalSegmentRow = clearLocalSegmentRow),
  (exports.getLocalSegmentId = getLocalSegmentId),
  (exports.getLocalSegmentName = getLocalSegmentName),
  (exports.isDeveloper = isDeveloper),
  (exports.isAdmin = isAdmin);
class SegmentIdGenerator {
  constructor(e) {
    if (
      ((this.MinId = 0),
      (this.MaxId = 0),
      (this.xe = 0),
      (this.Name = e),
      (this.Se = this.GetSegmentId()),
      (this.BranchName = (0, Util_1.getWorkspaceBranch)()),
      void 0 === this.Se)
    )
      (0, Log_1.warn)(
        `No segment id found for local machine [${Config_1.Config.Instance.MacAddress}]`,
      );
    else {
      if ((0, Init_1.isUe5)())
        (this.MinId = this.Se * ID_COUNT_PER_SEGMENT),
          (this.MaxId = this.Se * ID_COUNT_PER_SEGMENT + ID_COUNT_PER_SEGMENT);
      else {
        e = this.BranchRange;
        if (!e) return void (0, Log_1.warn)("This Branch Can not Add Id");
        (this.MinId = this.Se * ID_COUNT_PER_SEGMENT + e[0]),
          (this.MaxId = this.Se * ID_COUNT_PER_SEGMENT + e[1]);
      }
      0 === this.MinId && (this.MinId = 1);
      var e = SegmentIdGenerator.ne(this.Name),
        t = (0, Util_1.readJsonObj)(e);
      if (t) {
        if (t.Name !== this.Name)
          throw new Error(`Generator file name [${t.Name}] !== [${this.Name}]`);
        this.ContainsId(t.Id)
          ? (this.xe = t.Id)
          : ((0, Log_1.error)(
              `保存的生成Id[${t.Id}]不在范围[${this.MinId}, ${this.MaxId})中`,
            ),
            (0, Log_1.error)("移除id状态文件: " + e),
            (0, File_1.removeFile)(e),
            (this.xe = this.MinId));
      } else this.xe = this.MinId;
    }
  }
  static ne(e) {
    return (0, File_1.getSavePath)("Editor/Generator") + `/${e}.json`;
  }
  static HasRecordForConfig(e) {
    e = this.ne(e);
    return (0, File_1.existFile)(e);
  }
  static RemoveRecordForConfig(e) {
    e = this.ne(e);
    (0, File_1.removeFile)(e);
  }
  get BranchRange() {
    return (0, BranchDefine_1.getBranchSegment)(this.BranchName);
  }
  GetSegmentId() {
    return getLocalSegmentId();
  }
  get IsValid() {
    return void 0 !== this.Se;
  }
  Ee() {
    var e = { Name: this.Name, Id: this.xe };
    (0, Util_1.writeJson)(e, SegmentIdGenerator.ne(this.Name));
  }
  ToString() {
    return `[${this.Name}][${this.MinId} - ${this.MaxId}] Id = ` + this.xe;
  }
  ContainsId(e) {
    return this.MinId <= e && e < this.MaxId;
  }
  SetId(e) {
    if (!this.ContainsId(e))
      throw new Error(
        `[${this.Name}] id[${e}] 超出范围 [${this.MinId}, ${this.MaxId})`,
      );
    this.xe = e;
  }
  SaveWithId(e) {
    this.SetId(e), this.Ee();
  }
  Re() {
    var e = this.xe;
    if ((this.xe++, this.xe >= this.MaxId))
      throw new Error(
        `[${this.Name}]Id生成失败: 机器[${Config_1.Config.Instance.MacAddress}]的配置id耗尽`,
      );
    return e;
  }
  GenOne() {
    var e = this.Re();
    return this.Ee(), e;
  }
}
exports.SegmentIdGenerator = SegmentIdGenerator;
const segmentIdGeneratorEventDefine = { ErrorOccurred: (e, t) => {} };
class SegmentIdGeneratorManager extends EventSystem_1.EventDispatcher {
  constructor() {
    super(...arguments), (this.Ie = []);
  }
  AddGenerator(e) {
    this.Ie.push(e);
  }
  ShowInfo() {
    this.Ie.forEach((e) => {
      (0, Log_1.log)(e.ToString());
    });
  }
  FireMachineNotRegistedErrorEvent(e) {
    this.Dispatch("ErrorOccurred", "machineNotRegisted", e);
  }
}
(exports.SegmentIdGeneratorManager = SegmentIdGeneratorManager),
  (exports.segmentIdGeneratorManager = new SegmentIdGeneratorManager());
const GEN_ID_ERROR_MESSAGE =
  "无法生成Id, 请将您的机器Mac地址发给TD同学进行注册";
class CustomSegmentIdGenerator extends SegmentIdGenerator {
  constructor(e) {
    super(e), exports.segmentIdGeneratorManager.AddGenerator(this);
  }
  GenOne() {
    if (this.IsValid) return this.SetId(this.we()), super.GenOne();
    throw (
      ((0, Log_1.warn)(GEN_ID_ERROR_MESSAGE),
      exports.segmentIdGeneratorManager.FireMachineNotRegistedErrorEvent(
        GEN_ID_ERROR_MESSAGE,
      ),
      new Error(GEN_ID_ERROR_MESSAGE))
    );
  }
  we() {
    let e = this.GetMaxIdGenerated();
    return e < 0 ? (e = this.MinId) : (e += 1), e;
  }
  ReScan() {
    var e = this.we();
    this.SaveWithId(e),
      (0, Log_1.log)(`Id Generator [${this.Name}] scan id to [${e}]`);
  }
}
exports.CustomSegmentIdGenerator = CustomSegmentIdGenerator;
//# sourceMappingURL=SegmentIdGenerator.js.map
