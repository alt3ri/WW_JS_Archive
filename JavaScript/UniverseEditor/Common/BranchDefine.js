"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.toBranchStream =
    exports.getBranchNameFromStream =
    exports.getBranchShortName =
    exports.getNearestSourceBranch =
    exports.getBranchOrder =
    exports.getBranchByBranchPath =
    exports.isBranchInRange =
    exports.isReachBranch =
    exports.isWorkspacePreBranch =
    exports.getLowerBranches =
    exports.getBranchSegment =
    exports.getAllBranches =
    exports.isInDevelopmentBranch =
    exports.isPlannedBranch =
    exports.getDefaultPlannedBranch =
    exports.getAllPlannedBranches =
    exports.getAllStreamBranches =
    exports.getBranchDefineData =
    exports.getAllPlannedBranchData =
    exports.getAllBranchDefineData =
      void 0);
const File_1 = require("./Misc/File"),
  Util_1 = require("./Misc/Util");
let branchDefineData = void 0;
function getAllBranchDefineData() {
  var e;
  return (
    branchDefineData ||
      ((e = (0, File_1.getProjectPath)(
        "TypeScript/Src/UniverseEditor/Config/BranchConfig.json",
      )),
      (branchDefineData = (0, Util_1.readJsonObj)(e, []))),
    branchDefineData
  );
}
exports.getAllBranchDefineData = getAllBranchDefineData;
let plannedBranchData = void 0;
function getAllPlannedBranchData() {
  var e;
  return (
    plannedBranchData ||
      ((e = (0, File_1.getProjectPath)(
        "TypeScript/Src/UniverseEditor/Config/PlannedBranchConfig.json",
      )),
      (plannedBranchData = (0, Util_1.readJsonObj)(e, []))),
    plannedBranchData
  );
}
function getBranchDefineData(r) {
  return getAllBranchDefineData().find((e) => e.Branch === r);
}
function getAllStreamBranches() {
  return getAllBranchDefineData().map((e) => e.Branch);
}
function getAllPlannedBranches() {
  return getAllPlannedBranchData().map((e) => e.Branch);
}
function getDefaultPlannedBranch() {
  return getAllPlannedBranches()[0];
}
function isPlannedBranch(e) {
  return getAllPlannedBranches().includes(e);
}
function isInDevelopmentBranch() {
  return "development" === (0, Util_1.getWorkspaceBranch)();
}
function getAllBranches(e = !0) {
  var r,
    n = Array.from(getAllStreamBranches());
  return e
    ? ((e = getAllPlannedBranches()),
      (r = n.findIndex((e) => "development" === e)),
      n.splice(r, 1),
      [...n, ...e])
    : n;
}
function getBranchSegment(e) {
  return getBranchDefineData(e)?.IdSegment;
}
function getLowerBranches(e, r = !0) {
  var n = [];
  for (const t of getAllBranches(r)) {
    if (e === t) break;
    n.push(t);
  }
  return n;
}
function isWorkspacePreBranch(r) {
  var e = getAllBranches(!1),
    n = (0, Util_1.getWorkspaceBranch)(),
    t = e.findIndex((e) => e === r);
  return -1 !== t && e[t + 1] === n;
}
function isReachBranch(e, r) {
  var n = (0, Util_1.getWorkspaceBranch)();
  return !!n && (n === e || getLowerBranches(n).includes(e));
}
function isBranchInRange(r, n, e) {
  var t = getAllBranches(!0);
  if (!t.includes(r) || !t.includes(n))
    throw new Error(`分支区间非法, 有不存在的分支：[${r}, ${n}]`);
  var a = e ?? (0, Util_1.getWorkspaceBranch)();
  let c = -1,
    o = -1,
    l = -1;
  for (let e = 0; e < t.length; e++) {
    var s = t[e];
    s === r && (c = e), s === n && (o = e), s === a && (l = e);
  }
  return l >= c && l <= o;
}
function getBranchByBranchPath(r) {
  return getAllStreamBranches().find((e) => r.toLowerCase().endsWith(e));
}
function getBranchOrder(r) {
  return getAllStreamBranches().findIndex((e) => e === r);
}
function getNearestSourceBranch(e, r) {
  var n = getBranchOrder(r);
  let t = -1;
  for (const o of e) {
    var a = getBranchOrder(o),
      c = n - a;
    c < 0 || (c < n - t && (t = a));
  }
  return -1 === t ? r : getAllStreamBranches()[t];
}
function getBranchShortName(r) {
  return getAllBranchDefineData().find((e) => e.Branch === r).ShortName;
}
function getBranchNameFromStream(r) {
  return getAllBranchDefineData().find((e) => e.Stream === r).Branch;
}
function toBranchStream(e) {
  return e.startsWith("//aki/") ? e : "//aki/" + e;
}
(exports.getAllPlannedBranchData = getAllPlannedBranchData),
  (exports.getBranchDefineData = getBranchDefineData),
  (exports.getAllStreamBranches = getAllStreamBranches),
  (exports.getAllPlannedBranches = getAllPlannedBranches),
  (exports.getDefaultPlannedBranch = getDefaultPlannedBranch),
  (exports.isPlannedBranch = isPlannedBranch),
  (exports.isInDevelopmentBranch = isInDevelopmentBranch),
  (exports.getAllBranches = getAllBranches),
  (exports.getBranchSegment = getBranchSegment),
  (exports.getLowerBranches = getLowerBranches),
  (exports.isWorkspacePreBranch = isWorkspacePreBranch),
  (exports.isReachBranch = isReachBranch),
  (exports.isBranchInRange = isBranchInRange),
  (exports.getBranchByBranchPath = getBranchByBranchPath),
  (exports.getBranchOrder = getBranchOrder),
  (exports.getNearestSourceBranch = getNearestSourceBranch),
  (exports.getBranchShortName = getBranchShortName),
  (exports.getBranchNameFromStream = getBranchNameFromStream),
  (exports.toBranchStream = toBranchStream);
//# sourceMappingURL=BranchDefine.js.map
