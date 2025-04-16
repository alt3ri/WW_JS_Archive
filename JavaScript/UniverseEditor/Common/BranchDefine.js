"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getBranchFullNameFromShortName =
    exports.getBranchShortName =
    exports.getNearestSourceBranch =
    exports.branchToStream =
    exports.streamsToDepotBranches =
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
    exports.isPulledDepotBranch =
    exports.isPlannedBranch =
    exports.getDefaultPlannedBranch =
    exports.getAllOperatingAndDevelopingBranches =
    exports.getAllPublishedBranches =
    exports.getAllPlannedBranches =
    exports.getAllDepotBranches =
    exports.getPlannedBranchDefineData =
    exports.getDepotBranchDefineData =
      void 0);
const BranchConfig_1 = require("./BranchConfig"),
  Util_1 = require("./Misc/Util");
function getDepotBranchDefineData(r) {
  return BranchConfig_1.allDepotBranchConfig.find((e) => e.Branch === r);
}
function getPlannedBranchDefineData(r) {
  return BranchConfig_1.allPlannedBranchConfig.find((e) => e.Branch === r);
}
function getAllDepotBranches() {
  return BranchConfig_1.allDepotBranchConfig.map((e) => e.Branch);
}
function getAllPlannedBranches() {
  return BranchConfig_1.allPlannedBranchConfig.map((e) => e.Branch);
}
function getAllPublishedBranches() {
  return BranchConfig_1.allDepotBranchConfig
    .filter((e) => e.IsPublished)
    .map((e) => e.Branch);
}
function getAllOperatingAndDevelopingBranches() {
  let e = void 0;
  var r = [];
  for (const n of BranchConfig_1.allDepotBranchConfig)
    n.IsPublished ? (e = n.Branch) : r.push(n.Branch);
  return e ? [e, ...r] : r;
}
function getDefaultPlannedBranch() {
  return getAllPlannedBranches()[0];
}
function isPlannedBranch(e) {
  for (const r of getAllPlannedBranches()) if (e === r) return !0;
  return !1;
}
function isPulledDepotBranch(e) {
  for (const r of getAllDepotBranches())
    if ("development" !== r && e === r) return !0;
  return !1;
}
function isInDevelopmentBranch() {
  return "development" === (0, Util_1.getWorkspaceBranch)();
}
function getAllBranches(e = !0) {
  return e
    ? (0, BranchConfig_1.getAllBranchConfigs)().map((e) => e.Branch)
    : BranchConfig_1.allDepotBranchConfig.map((e) => e.Branch);
}
function getEarliestBranch() {
  return getAllDepotBranches()[0];
}
function getLatestBranch() {
  return "development";
}
function getBranchSegment(e) {
  return getDepotBranchDefineData(e)?.IdSegment;
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
    var o = t[e];
    if (r === o) break;
    n.push(o);
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
  var o = e ?? (0, Util_1.getWorkspaceBranch)();
  let a = -1,
    c = -1,
    s = -1;
  for (let e = 0; e < t.length; e++) {
    var h = t[e];
    h === r && (a = e), h === n && (c = e), h === o && (s = e);
  }
  return s >= a && s <= c;
}
function streamToDepotBranch(r) {
  return BranchConfig_1.allDepotBranchConfig.find((e) => e.Stream === r)
    ?.Branch;
}
function streamsToDepotBranches(e) {
  var r = [];
  for (const t of e) {
    var n = streamToDepotBranch(t);
    n && r.push(n);
  }
  return r;
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
    var o = getBranchOrder(c),
      a = n - o;
    a < 0 || (a < n - t && (t = o));
  }
  return -1 === t ? r : getAllDepotBranches()[t];
}
function getBranchShortName(r) {
  return (0, BranchConfig_1.getAllBranchConfigs)().find((e) => e.Branch === r)
    ?.ShortName;
}
function getBranchFullNameFromShortName(r) {
  return (0, BranchConfig_1.getAllBranchConfigs)().find(
    (e) => e.ShortName === r,
  )?.Branch;
}
(exports.getDepotBranchDefineData = getDepotBranchDefineData),
  (exports.getPlannedBranchDefineData = getPlannedBranchDefineData),
  (exports.getAllDepotBranches = getAllDepotBranches),
  (exports.getAllPlannedBranches = getAllPlannedBranches),
  (exports.getAllPublishedBranches = getAllPublishedBranches),
  (exports.getAllOperatingAndDevelopingBranches =
    getAllOperatingAndDevelopingBranches),
  (exports.getDefaultPlannedBranch = getDefaultPlannedBranch),
  (exports.isPlannedBranch = isPlannedBranch),
  (exports.isPulledDepotBranch = isPulledDepotBranch),
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
  (exports.streamsToDepotBranches = streamsToDepotBranches),
  (exports.branchToStream = branchToStream),
  (exports.getNearestSourceBranch = getNearestSourceBranch),
  (exports.getBranchShortName = getBranchShortName),
  (exports.getBranchFullNameFromShortName = getBranchFullNameFromShortName);
//# sourceMappingURL=BranchDefine.js.map
