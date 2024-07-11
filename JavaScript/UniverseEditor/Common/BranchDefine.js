"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getBranchShortName =
    exports.getNearestSourceBranch =
    exports.branchToStream =
    exports.streamToDepotBranch =
    exports.isBranchInRange =
    exports.isReachBranch =
    exports.isWorkspacePreBranch =
    exports.isHigherBranch =
    exports.isLowerBranch =
    exports.getHigherBranches =
    exports.getLowerBranches =
    exports.getBranchSegment =
    exports.getLatestBranch =
    exports.getEarliestBranch =
    exports.getAllBranches =
    exports.isInDevelopmentBranch =
    exports.isPlannedBranch =
    exports.getDefaultPlannedBranch =
    exports.getAllPlannedBranches =
    exports.getAllDepotBranches =
    exports.getBranchDefineData =
      void 0);
const BranchConfig_1 = require("./BranchConfig"),
  Util_1 = require("./Misc/Util");
function getBranchDefineData(r) {
  return BranchConfig_1.allBranchConfig.find((e) => e.Branch === r);
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
    t = Array.from(getAllDepotBranches());
  return e
    ? ((e = getAllPlannedBranches()),
      (r = t.findIndex((e) => "development" === e)),
      t.splice(r, 1),
      [...t, ...e])
    : t;
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
function getLowerBranches(e, r = !0) {
  var t = [];
  for (const n of getAllBranches(r)) {
    if (e === n) break;
    t.push(n);
  }
  return t;
}
function getHigherBranches(r, e = !0) {
  var t = [],
    n = getAllBranches(e);
  for (let e = n.length - 1; 0 <= e; e--) {
    var a = n[e];
    if (r === a) break;
    t.push(a);
  }
  return t;
}
function isLowerBranch(e, r) {
  return getLowerBranches(r).includes(e);
}
function isHigherBranch(e, r) {
  return getHigherBranches(r).includes(e);
}
function isWorkspacePreBranch(r) {
  var e = getAllBranches(!1),
    t = (0, Util_1.getWorkspaceBranch)(),
    n = e.findIndex((e) => e === r);
  return -1 !== n && e[n + 1] === t;
}
function isReachBranch(e, r) {
  var t = (0, Util_1.getWorkspaceBranch)();
  return !!t && (t === e || getLowerBranches(t).includes(e));
}
function isBranchInRange(r, t, e) {
  var n = getAllBranches(!0);
  if (!n.includes(r) || !n.includes(t))
    throw new Error(`分支区间非法, 有不存在的分支：[${r}, ${t}]`);
  var a = e ?? (0, Util_1.getWorkspaceBranch)();
  let o = -1,
    c = -1,
    s = -1;
  for (let e = 0; e < n.length; e++) {
    var h = n[e];
    h === r && (o = e), h === t && (c = e), h === a && (s = e);
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
    t = getBranchOrder(r);
  let n = -1;
  for (const c of e) {
    var a = getBranchOrder(c),
      o = t - a;
    o < 0 || (o < t - n && (n = a));
  }
  return -1 === n ? r : getAllDepotBranches()[n];
}
function getBranchShortName(r) {
  return BranchConfig_1.allBranchConfig.find((e) => e.Branch === r).ShortName;
}
(exports.getBranchDefineData = getBranchDefineData),
  (exports.getAllDepotBranches = getAllDepotBranches),
  (exports.getAllPlannedBranches = getAllPlannedBranches),
  (exports.getDefaultPlannedBranch = getDefaultPlannedBranch),
  (exports.isPlannedBranch = isPlannedBranch),
  (exports.isInDevelopmentBranch = isInDevelopmentBranch),
  (exports.getAllBranches = getAllBranches),
  (exports.getEarliestBranch = getEarliestBranch),
  (exports.getLatestBranch = getLatestBranch),
  (exports.getBranchSegment = getBranchSegment),
  (exports.getLowerBranches = getLowerBranches),
  (exports.getHigherBranches = getHigherBranches),
  (exports.isLowerBranch = isLowerBranch),
  (exports.isHigherBranch = isHigherBranch),
  (exports.isWorkspacePreBranch = isWorkspacePreBranch),
  (exports.isReachBranch = isReachBranch),
  (exports.isBranchInRange = isBranchInRange),
  (exports.streamToDepotBranch = streamToDepotBranch),
  (exports.branchToStream = branchToStream),
  (exports.getNearestSourceBranch = getNearestSourceBranch),
  (exports.getBranchShortName = getBranchShortName);
//# sourceMappingURL=BranchDefine.js.map
