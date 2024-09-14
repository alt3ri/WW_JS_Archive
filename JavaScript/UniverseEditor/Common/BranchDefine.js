"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getBranchShortName =
    exports.getNearestSourceBranch =
    exports.branchToStream =
    exports.streamToDepotBranch =
    exports.isBranchInRange =
    exports.isBranchDefined =
    exports.isReachBranch =
    exports.isWorkspacePreBranch =
    exports.isHigherBranch =
    exports.isLowerBranch =
    exports.getHigherBranches =
    exports.getLowerBranches =
    exports.getPlannedBranchSegment =
    exports.getBranchSegment =
    exports.getLatestBranch =
    exports.getEarliestBranch =
    exports.getAllBranches =
    exports.isInDevelopmentBranch =
    exports.isPlannedBranch =
    exports.getDefaultPlannedBranch =
    exports.getAllPlannedBranches =
    exports.getAllDepotBranches =
    exports.getPlannedBranchDefineData =
    exports.getBranchDefineData =
      void 0);
const BranchConfig_1 = require("./BranchConfig"),
  Util_1 = require("./Misc/Util");
function getBranchDefineData(r) {
  return BranchConfig_1.allBranchConfig.find((e) => e.Branch === r);
}
function getPlannedBranchDefineData(r) {
  return BranchConfig_1.allPlannedBranchConfig.find((e) => e.Branch === r);
}
function getAllDepotBranches() {
  return BranchConfig_1.allBranchConfig.map((e) => e.Branch);
}
function getAllPlannedBranches() {
  return BranchConfig_1.allPlannedBranchConfig.map((e) => e.Branch);
}
function getDefaultPlannedBranch() {
  return getAllPlannedBranches()[0];
}
function isPlannedBranch(e) {
  for (const r of getAllPlannedBranches()) if (e === r) return !0;
  return !1;
}
function isInDevelopmentBranch() {
  return "development" === (0, Util_1.getWorkspaceBranch)();
}
function getAllBranches(e = !0) {
  var r,
    n = Array.from(getAllDepotBranches());
  return e
    ? ((e = getAllPlannedBranches()),
      (r = n.findIndex((e) => "development" === e)),
      n.splice(r, 1),
      [...n, ...e])
    : n;
}
function getEarliestBranch() {
  return getAllDepotBranches()[0];
}
function getLatestBranch() {
  return "development";
}
function getBranchSegment(e) {
  return getBranchDefineData(e)?.IdSegment;
}
function getPlannedBranchSegment(e) {
  return getPlannedBranchDefineData(e)?.IdSegment;
}
function getLowerBranches(e, r = !0) {
  var n = [];
  for (const t of getAllBranches(r)) {
    if (e === t) break;
    n.push(t);
  }
  return n;
}
function getHigherBranches(r, e = !0) {
  var n = [],
    t = getAllBranches(e);
  for (let e = t.length - 1; 0 <= e; e--) {
    var a = t[e];
    if (r === a) break;
    n.push(a);
  }
  return n;
}
function isLowerBranch(e, r) {
  return getLowerBranches(r).includes(e);
}
function isHigherBranch(e, r) {
  return getHigherBranches(r).includes(e);
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
function isBranchDefined(e) {
  return getAllBranches().includes(e);
}
function isBranchInRange(r, n, e) {
  var t = getAllBranches(!0);
  if (!t.includes(r) || !t.includes(n))
    throw new Error(`分支区间非法, 有不存在的分支：[${r}, ${n}]`);
  var a = e ?? (0, Util_1.getWorkspaceBranch)();
  let o = -1,
    c = -1,
    s = -1;
  for (let e = 0; e < t.length; e++) {
    var h = t[e];
    h === r && (o = e), h === n && (c = e), h === a && (s = e);
  }
  return s >= o && s <= c;
}
function streamToDepotBranch(r) {
  return BranchConfig_1.allBranchConfig.find((e) => e.Stream === r).Branch;
}
function branchToStream(e) {
  return e.startsWith("//aki/") ? e : "//aki/" + e;
}
function getBranchOrder(r) {
  return getAllDepotBranches().findIndex((e) => e === r);
}
function getNearestSourceBranch(e, r) {
  var r = r ?? (0, Util_1.getWorkspaceBranch)(),
    n = getBranchOrder(r);
  let t = -1;
  for (const c of e) {
    var a = getBranchOrder(c),
      o = n - a;
    o < 0 || (o < n - t && (t = a));
  }
  return -1 === t ? r : getAllDepotBranches()[t];
}
function getBranchShortName(r) {
  return BranchConfig_1.allBranchConfig.find((e) => e.Branch === r).ShortName;
}
(exports.getBranchDefineData = getBranchDefineData),
  (exports.getPlannedBranchDefineData = getPlannedBranchDefineData),
  (exports.getAllDepotBranches = getAllDepotBranches),
  (exports.getAllPlannedBranches = getAllPlannedBranches),
  (exports.getDefaultPlannedBranch = getDefaultPlannedBranch),
  (exports.isPlannedBranch = isPlannedBranch),
  (exports.isInDevelopmentBranch = isInDevelopmentBranch),
  (exports.getAllBranches = getAllBranches),
  (exports.getEarliestBranch = getEarliestBranch),
  (exports.getLatestBranch = getLatestBranch),
  (exports.getBranchSegment = getBranchSegment),
  (exports.getPlannedBranchSegment = getPlannedBranchSegment),
  (exports.getLowerBranches = getLowerBranches),
  (exports.getHigherBranches = getHigherBranches),
  (exports.isLowerBranch = isLowerBranch),
  (exports.isHigherBranch = isHigherBranch),
  (exports.isWorkspacePreBranch = isWorkspacePreBranch),
  (exports.isReachBranch = isReachBranch),
  (exports.isBranchDefined = isBranchDefined),
  (exports.isBranchInRange = isBranchInRange),
  (exports.streamToDepotBranch = streamToDepotBranch),
  (exports.branchToStream = branchToStream),
  (exports.getNearestSourceBranch = getNearestSourceBranch),
  (exports.getBranchShortName = getBranchShortName);
//# sourceMappingURL=BranchDefine.js.map
