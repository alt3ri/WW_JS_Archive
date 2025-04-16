"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.exec =
    exports.getTimeSeconds =
    exports.regenerateField =
    exports.genGuid =
    exports.getNetWorkAddress =
    exports.getMacAddress =
    exports.hasFieldMatch =
    exports.forEachField =
    exports.strcmpi =
    exports.strcmp =
    exports.applyMultiData =
    exports.createMultiData =
    exports.getClassNameFromBpPath =
    exports.writeDataJson =
    exports.writeJson =
    exports.readJsonObj =
    exports.isPipelineEnv =
    exports.isNumText =
    exports.clampNumber =
    exports.clampAngle =
    exports.alignNumber =
    exports.stringifyEditor =
    exports.stringifyBool =
    exports.parseVarValue =
    exports.parsePos =
    exports.parseCsvLongArray =
    exports.parseCsvFloatArray =
    exports.parseCsvStringArray =
    exports.parseCsvInt2Array =
    exports.parseCsvIntToIntMap =
    exports.parseCsvIntArray =
    exports.parseBool =
    exports.parseIntSafe =
    exports.parseFloatSafe =
    exports.isValidNumberString =
    exports.stringifyCsvInt2Array =
    exports.isNumber2dArray =
    exports.stringFormat =
    exports.parse =
    exports.stringify =
    exports.getFieldCount =
    exports.calHash =
    exports.arrayToRecord =
    exports.arrayToMap =
    exports.unionArray =
    exports.addArray =
    exports.subArray =
    exports.getEnumNameByValue =
    exports.getEnumNames =
    exports.getEnumValues =
      void 0),
  (exports.isPortInUse =
    exports.isSetEqual =
    exports.isTransformEqual =
    exports.isSphereInsideSphere =
    exports.isPosInsideSphere =
    exports.scaleVector =
    exports.subVector =
    exports.addVector =
    exports.isVector2Equal =
    exports.getVectorDistance =
    exports.isVectorEqual =
    exports.isRuntimePlatform =
    exports.isNodeJsPlatform =
    exports.isUePlatform =
    exports.getPlatformType =
    exports.getLocalSafeVersion =
    exports.getCurrentSyncData =
    exports.loadUgsSyncConfig =
    exports.getCurrentClientEditorSaviorSyncData =
    exports.loadEditorSaviorSyncConfig =
    exports.getAkiBaseClient =
    exports.getAkiBaseProjectPath =
    exports.getAkiBaseLocalPath =
    exports.getChangeListShelveFiles =
    exports.getCurrentP4Owner =
    exports.getWorkspaceBranch =
    exports.getCurrentP4Branch =
    exports.getCurrentClientName =
    exports.getCurrentClientRoot =
    exports.getCurrentP4Stream =
    exports.getP4ClientDataByFilePath =
    exports.checkP4Connection =
    exports.getClientDatas =
    exports.upperStringFirstLetter =
    exports.checkMonsterValid =
    exports.getNextPathName =
    exports.getPreName =
    exports.getUniqueName =
    exports.getNextName =
    exports.getNameWithoutIndex =
    exports.isRunInStandaloneGameWithCache =
    exports.isRunInStandaloneGame =
    exports.killProcess =
    exports.isProcessRunning =
    exports.isProcessRunningInPath =
    exports.getProcessImagePathsByPort =
    exports.getProcessPathAndCommandLine =
    exports.getProcessImagePathsByName =
    exports.isRunAsAdmin =
    exports.execAsUser =
      void 0),
  (exports.isArrayElementSame =
    exports.objectIterator =
    exports.isSubdirectoryDataPath =
    exports.createValueStackByDataPath =
    exports.getValueByDataPath =
    exports.ValueStack =
    exports.createDiffPaths =
    exports.changeChineseStringToEnglishString =
    exports.isIpAddress =
    exports.touchInstance =
    exports.execAsync =
    exports.isCurrentBranchAssetAsync =
    exports.getFileSourceBranchAsync =
    exports.getBatchFileBranchDataAsync =
    exports.isTextFileInOriginRequiredListAsync =
    exports.isTextFileByExtension =
    exports.getTextFileOriginRequiredList =
    exports.getFileDepotInfoAsyncBatch =
    exports.isCurrentBranchAsset =
    exports.getAllDepotBranchDataSync =
    exports.getBranchOriginsDataSync =
    exports.getBranchReqShortPath =
    exports.compareTextOrder =
    exports.doJsonHttpDelete =
    exports.doJsonHttpPost =
    exports.doJsonHttpGet =
    exports.isDepotFileExist =
    exports.toDepotPath =
    exports.deepCopyData =
    exports.getMd5 =
    exports.stringIsNullOrEmpty =
    exports.formatDateTime =
    exports.isInPie =
    exports.isValidVarName =
    exports.getEditorCommandArgs =
    exports.getCommandLine =
    exports.getLocalIp =
      void 0);
const crypto = require("crypto-js"),
  IEditor_1 = require("../../Interface/IEditor"),
  Init_1 = require("../../Interface/Init"),
  IUtil_1 = require("../../Interface/IUtil"),
  IVar_1 = require("../../Interface/IVar"),
  Recorder_1 = require("../Performance/Recorder"),
  Platform_1 = require("../Platform/Platform"),
  Async_1 = require("./Async"),
  File_1 = require("./File"),
  Log_1 = require("./Log");
function getEnumValues(t) {
  return Object.keys(t)
    .filter((e) => Number.isNaN(Number(e)))
    .map((e) => t[e]);
}
function getEnumNames(e) {
  return Object.keys(e).filter((e) => Number.isNaN(Number(e)));
}
function getEnumNameByValue(t, r) {
  var e = Object.keys(t).find((e) => t[e] === r);
  return e || "";
}
function subArray(e, t) {
  return t.length <= 0 ? e : e.filter((e) => !t.includes(e));
}
function addArray(e, t) {
  return [...e, ...t];
}
function unionArray(e, t) {
  return Array.from(new Set([...e, ...t]));
}
function arrayToMap(e, t) {
  return new Map(e.map((e) => [e[t], e]));
}
function arrayToRecord(e) {
  const t = {};
  return e.forEach((e) => (t[e] = e)), t;
}
function calHash(t) {
  let r = 0;
  var n = t.length;
  if (0 !== n) {
    for (let e = 0; e < n; e++) {
      var o = t.charCodeAt(e);
      (r = (r << 5) - r + o), (r |= 0);
    }
    r < 0 && (r = -r);
  }
  return r;
}
function getFieldCount(e) {
  let t = 0;
  for (const r in e) r && t++;
  return t;
}
function stringify(e, r, t = !0) {
  return JSON.stringify(
    e,
    (e, t) => {
      if (!r || "string" != typeof e || !e.startsWith("_")) return t;
    },
    t ? 2 : void 0,
  );
}
function parse(e, t) {
  return JSON.parse(e, (e, r) => {
    if (!t || !e.startsWith("_"))
      return (
        r instanceof Array &&
          r.forEach((e, t) => {
            null === e && (r[t] = void 0);
          }),
        r
      );
  });
}
function stringFormat(e, ...r) {
  return e.replace(/{([0-9])}/g, (e, t) =>
    void 0 !== r[t] ? r[t].toString() : e,
  );
}
function isNumber2dArray(e) {
  if (!Array.isArray(e)) return !1;
  for (const t of e) {
    if (!Array.isArray(t)) return !1;
    if (!t.every((e) => "number" == typeof e)) return !1;
  }
  return !0;
}
function stringifyCsvInt2Array(e) {
  const t = [];
  return (
    e.forEach((e) => {
      0 < e.length && t.push([e]);
    }),
    JSON.stringify(t)
  );
}
function isValidNumberString(e) {
  return !Number.isNaN(Number(e));
}
function parseFloatSafe(e, t) {
  (e = parseFloat(e)), (e = Number.isNaN(e) ? 0 : e);
  return t ? ((t = 10 ** t), Math.round(e * t) / t) : e;
}
function parseIntSafe(e, t) {
  e = parseInt(e, t);
  return Number.isNaN(e) ? 0 : e;
}
function parseBool(e) {
  return !!e && ("1" === e || "true" === e || "True" === e || "TRUE" === e);
}
function parseCsvIntArray(e) {
  return e
    .replace(/^\s*["\\[]|["\]]\s*$/g, "")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((e) => {
      e = parseIntSafe(e.trim(), 10);
      return isNaN(e) ? 0 : e;
    });
}
function parseCsvIntToIntMap(e) {
  e = e.replace(/^\s*["\\[]|["\]]\s*$/g, "").replace(/^\[|\]$/g, "");
  const r = {};
  return (
    e.split(",").forEach((e) => {
      var [e, t] = e.split(":").map((e) => parseIntSafe(e.trim(), 10));
      void 0 === e || void 0 === t || isNaN(e) || isNaN(t) || (r[e] = t);
    }),
    r
  );
}
function parseCsvInt2Array(e) {
  e = JSON.parse(e);
  const t = [];
  return (
    e.forEach((e) => {
      0 < e.length && ((e = e[0]), t.push(e));
    }),
    t
  );
}
function parseCsvStringArray(e) {
  return e.substring(1, e.length - 1).split(",");
}
function parseCsvFloatArray(e) {
  return e
    .substring(1, e.length - 1)
    .split(",")
    .map((e) => parseFloatSafe(e));
}
function parseCsvLongArray(e) {
  return e
    .substring(1, e.length - 1)
    .split(",")
    .map((e) => parseIntSafe(e));
}
function parsePos(e) {
  e = parseCsvIntArray(e);
  return e ? { X: e[0], Y: e[1], Z: e[2] } : { X: 0, Y: 0, Z: 0 };
}
function parseVarValue(e, t) {
  switch (e) {
    case "Boolean":
      return parseBool(t);
    case "String":
      return t;
    case "Float":
      return parseFloat(t);
    case "Entity":
    case "Quest":
    case "QuestState":
    case "Prefab":
    case "Int":
      var r = parseInt(t);
      return isNaN(r) ? 0 : r;
    case "Transform":
      return parsePos(t);
  }
  return IVar_1.varConfig[e];
}
function stringifyBool(e) {
  return e ? "1" : "0";
}
function stringifyEditor(e) {
  return JSON.stringify(
    e,
    (e, t) => {
      if (
        !("string" == typeof e && 0 < e.length) ||
        e.startsWith("_") ||
        "object" == typeof t
      )
        return t;
    },
    2,
  );
}
function alignNumber(e, t = 1) {
  return Math.floor(e / t) * t;
}
function clampAngle(e) {
  let t = e % 360;
  return t < 0 && (t += 360), t;
}
function clampNumber(e, t, r) {
  return Math.max(t, Math.min(e, r));
}
function isNumText(e) {
  return /^\d+(\.\d+)?$/.test(e);
}
function isPipelineEnv() {
  return (0, Platform_1.getPlatform)().IsPipelineEnv;
}
function readJsonObj(e, t) {
  e = (0, File_1.readFile)(e);
  return e ? parse(e) : t || void 0;
}
function writeJson(e, t, r) {
  (0, File_1.writeFile)(t, stringify(e, r));
}
function writeDataJson(e, t) {
  writeJson(e, t, !0);
}
function getClassNameFromBpPath(e) {
  var t = e.lastIndexOf(".");
  return t < 0
    ? ((0, Log_1.error)("Blueprint path is invalid: " + e), e)
    : e.slice(t + 1);
}
(exports.getEnumValues = getEnumValues),
  (exports.getEnumNames = getEnumNames),
  (exports.getEnumNameByValue = getEnumNameByValue),
  (exports.subArray = subArray),
  (exports.addArray = addArray),
  (exports.unionArray = unionArray),
  (exports.arrayToMap = arrayToMap),
  (exports.arrayToRecord = arrayToRecord),
  (exports.calHash = calHash),
  (exports.getFieldCount = getFieldCount),
  (exports.stringify = stringify),
  (exports.parse = parse),
  (exports.stringFormat = stringFormat),
  (exports.isNumber2dArray = isNumber2dArray),
  (exports.stringifyCsvInt2Array = stringifyCsvInt2Array),
  (exports.isValidNumberString = isValidNumberString),
  (exports.parseFloatSafe = parseFloatSafe),
  (exports.parseIntSafe = parseIntSafe),
  (exports.parseBool = parseBool),
  (exports.parseCsvIntArray = parseCsvIntArray),
  (exports.parseCsvIntToIntMap = parseCsvIntToIntMap),
  (exports.parseCsvInt2Array = parseCsvInt2Array),
  (exports.parseCsvStringArray = parseCsvStringArray),
  (exports.parseCsvFloatArray = parseCsvFloatArray),
  (exports.parseCsvLongArray = parseCsvLongArray),
  (exports.parsePos = parsePos),
  (exports.parseVarValue = parseVarValue),
  (exports.stringifyBool = stringifyBool),
  (exports.stringifyEditor = stringifyEditor),
  (exports.alignNumber = alignNumber),
  (exports.clampAngle = clampAngle),
  (exports.clampNumber = clampNumber),
  (exports.isNumText = isNumText),
  (exports.isPipelineEnv = isPipelineEnv),
  (exports.readJsonObj = readJsonObj),
  (exports.writeJson = writeJson),
  (exports.writeDataJson = writeDataJson),
  (exports.getClassNameFromBpPath = getClassNameFromBpPath);
const ARRAY_INDEX_KEY = "_arrayIndex";
function createMultiData(t, e, r) {
  if (void 0 === t) return (0, IUtil_1.clearIgnoreField)(e, r);
  if (null == e) return null;
  if ("object" != typeof e || "object" != typeof t)
    return e !== t ? null : (0, IUtil_1.clearIgnoreField)(e, r);
  if (t instanceof Array) {
    var n = e;
    if (!n || t.length !== n.length) return null;
    const a = [];
    for (let e = 0; e < t.length; e++) {
      var o = createMultiData(t[e], n[e], r);
      "object" == typeof o && null !== o && (o[ARRAY_INDEX_KEY] = e), a.push(o);
    }
    return a;
  }
  const a = {};
  for (const p in e) {
    var s;
    r?.(p) ||
      ((s = e[p]), void 0 === t[p] && (a[p] = void 0 === s ? void 0 : null));
  }
  for (const f in t) {
    var i, u, c;
    r?.(f) ||
      ((i = e[f]),
      (u = t[f]),
      null === i || null === u
        ? (a[f] = null)
        : void 0 === i
          ? (a[f] = void 0 === u ? void 0 : null)
          : (c = typeof i) == typeof u && "object" == c
            ? ((c = createMultiData(i, u, r)), (a[f] = c))
            : (a[f] = i !== u ? null : i));
  }
  return a;
}
function applyMultiData(e, t, r) {
  if (null === t) return e;
  if ("object" != typeof t || "object" != typeof e) return t;
  if (e instanceof Array) {
    const u = e;
    if (null === t) return u;
    {
      const n = [];
      return (
        t.forEach((e, t) => {
          null === e
            ? void 0 !== u[t] &&
              null !== u[t] &&
              ((t = applyMultiData(u[t], e, r)), n.push(t))
            : void 0 !== (t = e[ARRAY_INDEX_KEY]) && t < u.length
              ? ((t = applyMultiData(u[t], e, r)), n.push(t))
              : n.push(e);
        }),
        n
      );
    }
  }
  const n = {};
  for (const c in t) {
    var o;
    r?.(c) ||
      null === t ||
      c === ARRAY_INDEX_KEY ||
      ((o = t[c]),
      void 0 === e[c] &&
        null !== o &&
        (n[c] = (0, IUtil_1.removeNullField)(o)));
  }
  for (const p in e) {
    var a, s, i;
    r?.(p) ||
      p === ARRAY_INDEX_KEY ||
      ((a = t[p]),
      (s = e[p]),
      null !== a
        ? (i = typeof a) == typeof s && "object" == i
          ? ((i = applyMultiData(s, a, r)), (n[p] = i))
          : (n[p] = a)
        : (n[p] = s));
  }
  return n;
}
function strcmp(e, t) {
  return e < t ? -1 : t < e ? 1 : 0;
}
function strcmpi(e, t) {
  return e.toLowerCase() < t.toLowerCase()
    ? -1
    : e.toLowerCase() > t.toLowerCase()
      ? 1
      : 0;
}
function forEachField(e, t, r) {
  if ("object" == typeof e) {
    var n = e;
    for (const a in n) {
      var o = n[a];
      "object" == typeof o ? forEachField(o, t, r) : t(a, o) && r(n, a, o);
    }
  }
}
function hasFieldMatch(e, t) {
  if ("object" == typeof e) {
    var r = e;
    for (const o in r) {
      var n = r[o];
      if (t(o, n)) return !0;
      if ("object" == typeof n && hasFieldMatch(n, t)) return !0;
      if (Array.isArray(n))
        for (const a of n)
          if ("object" == typeof a && hasFieldMatch(a, t)) return !0;
    }
  }
  return !1;
}
function getMacAddress() {
  return (0, Platform_1.getPlatform)().GetMacAddress();
}
function getNetWorkAddress() {
  var e = (0, Platform_1.getPlatform)().GetPhysicMacAddress();
  if ("" !== e) return e;
}
function genGuid() {
  let r = new Date().getTime(),
    n = 0;
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
    let t = 16 * Math.random();
    return (
      0 < r
        ? ((t = (r + t) % 16 | 0), (r = Math.floor(r / 16)))
        : ((t = (n + t) % 16 | 0), (n = Math.floor(n / 16))),
      ("x" === e ? t : (3 & t) | 8).toString(16)
    );
  });
}
function regenerateField(t) {
  if (!t) return t;
  if (t instanceof Array) {
    var r = [];
    for (let e = 0; e < t.length; e++) r[e] = regenerateField(t[e]);
    return r;
  }
  if ("object" != typeof t) return t;
  var e,
    n = {};
  for (const o in t)
    (0, IUtil_1.isGuid)(o)
      ? (n[o] = genGuid())
      : ((e = t[o]), (n[o] = regenerateField(e)));
  return n;
}
function getTimeSeconds() {
  return new Date().getTime() / Async_1.MS_PER_SEC;
}
function exec(e, t) {
  return (0, Platform_1.getPlatform)().Exec(e, t);
}
function execAsUser(e, t) {
  return exec(
    (0, File_1.getTsRoot)() +
      "/Src/UniverseEditor/Tool/run_as_standard_user.bat" +
      " " +
      e,
    t,
  );
}
function isRunAsAdmin() {
  var [e] = exec("net session");
  return e;
}
function getProcessImagePathsByName(e) {
  return (0, Platform_1.getPlatform)().GetProcessImagePathsByName(e);
}
function getProcessPathAndCommandLine(e) {
  return (0, Platform_1.getPlatform)().GetProcessPathAndCommandLine(e);
}
function getProcessImagePathsByPort(e) {
  return (0, Platform_1.getPlatform)().GetProcessImagePathsByPort(e);
}
function isProcessRunningInPath(e) {
  const t = e.replace(/\\/g, "/");
  return getProcessImagePathsByName(t.split("/").pop()).some(
    (e) => e.replace(/\\/g, "/") === t,
  );
}
function isProcessRunning(e) {
  e = getProcessImagePathsByName(e);
  return [0 < e.length, e];
}
function killProcess(e) {
  exec(`wmic process where "name='${e}'" delete`);
}
function isRunInStandaloneGame() {
  for (const e of getProcessPathAndCommandLine("UE4Editor.exe"))
    if (e.CommandLine.includes('-SessionName="Play in Standalone Game"'))
      return !0;
  return !1;
}
(exports.createMultiData = createMultiData),
  (exports.applyMultiData = applyMultiData),
  (exports.strcmp = strcmp),
  (exports.strcmpi = strcmpi),
  (exports.forEachField = forEachField),
  (exports.hasFieldMatch = hasFieldMatch),
  (exports.getMacAddress = getMacAddress),
  (exports.getNetWorkAddress = getNetWorkAddress),
  (exports.genGuid = genGuid),
  (exports.regenerateField = regenerateField),
  (exports.getTimeSeconds = getTimeSeconds),
  (exports.exec = exec),
  (exports.execAsUser = execAsUser),
  (exports.isRunAsAdmin = isRunAsAdmin),
  (exports.getProcessImagePathsByName = getProcessImagePathsByName),
  (exports.getProcessPathAndCommandLine = getProcessPathAndCommandLine),
  (exports.getProcessImagePathsByPort = getProcessImagePathsByPort),
  (exports.isProcessRunningInPath = isProcessRunningInPath),
  (exports.isProcessRunning = isProcessRunning),
  (exports.killProcess = killProcess),
  (exports.isRunInStandaloneGame = isRunInStandaloneGame);
let isStandaloneGame = !1,
  lastCheckNewProcessTime = 0;
function isRunInStandaloneGameWithCache() {
  var e = getTimeSeconds();
  return (
    e - lastCheckNewProcessTime < 5 ||
      ((lastCheckNewProcessTime = e),
      (isStandaloneGame = isRunInStandaloneGame())),
    isStandaloneGame
  );
}
function getNameWithoutIndex(e) {
  var t = e.match(/[^0-9]/g),
    t = e.lastIndexOf(t ? t[t.length - 1] : "");
  return "" + e.substring(0, t + 1);
}
function getNextName(e, t = "-") {
  if (!e) return `user${t}1`;
  let r = -1,
    n = "";
  if (
    ((n = t
      ? ((r = e.lastIndexOf(t)), e.substring(r + 1))
      : ((o = e.match(/[^0-9]/g)),
        (r = e.lastIndexOf(o ? o[o.length - 1] : "") + 1),
        e.substring(r))),
    r < 0)
  )
    return "" + e + t + "1";
  var o = Number.parseInt(n);
  if (isNaN(o)) return "" + e + t + "1";
  var a = n.length;
  for (n = (o + 1).toString(); n.length < a; ) n = "0" + n;
  return "" + e.substring(0, r) + t + n;
}
function getUniqueName(t, e, r = "-") {
  if (t.length < 1) return `${e || "user"}${r}1`;
  let n = getNextName(e || t[0], r);
  for (let e = 0; e < t.length && t.includes(n); e++) n = getNextName(n, r);
  return n;
}
function getPreName(e, t = "-") {
  var r, n;
  return e
    ? (r = e.lastIndexOf(t)) < 0 ||
      ((n = Number.parseInt(e.substring(r + 1))), isNaN(n))
      ? "" + e + t + "1"
      : ((n = n <= 1 ? n : n - 1), "" + e.substring(0, r) + t + n)
    : `user${t}1`;
}
function getNextPathName(e) {
  var t = e.lastIndexOf("."),
    r = e.substring(t, e.length);
  return getNextName(e.substring(0, t)) + r;
}
function checkMonsterValid(e) {
  if (e.length < 2) return [{ X: 0, Y: 0, Z: 0 }, -1];
  var t = e[0].X ?? 0,
    r = e[0].Y ?? 0,
    n = e[1].X ?? 0,
    o = e[1].Y ?? 0;
  let a = n < t ? n : t,
    s = n < t ? t : n,
    i = o < r ? o : r,
    u = o < r ? r : o,
    c = 2;
  for (c = 2; c < e.length; c++) {
    var p = e[c].X ?? 0,
      f = e[c].Y ?? 0;
    (a = p < a ? p : a),
      (s = p > s ? p : s),
      (i = f < i ? f : i),
      (u = f > u ? f : u);
  }
  return [
    { X: (a + s) / 2, Y: (u + i) / 2, Z: 0 },
    Math.floor(Math.sqrt((s - a) * (s - a) + (u - i) * (u - i))) / 2,
  ];
}
function upperStringFirstLetter(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function getP4CurrentDirectory() {
  var [e, t] = (0, Platform_1.getPlatform)().Exec("p4 info");
  return (e = e && t.split("\n").find((e) => e.includes("Current directory: ")))
    ? 0 <= (e = (t = e.replace(/\\/g, "/")).indexOf("/Package/Engine/"))
      ? t.substring("Current directory: ".length, e)
      : t.substring("Current directory: ".length)
    : "";
}
(exports.isRunInStandaloneGameWithCache = isRunInStandaloneGameWithCache),
  (exports.getNameWithoutIndex = getNameWithoutIndex),
  (exports.getNextName = getNextName),
  (exports.getUniqueName = getUniqueName),
  (exports.getPreName = getPreName),
  (exports.getNextPathName = getNextPathName),
  (exports.checkMonsterValid = checkMonsterValid),
  (exports.upperStringFirstLetter = upperStringFirstLetter);
let clientInfos = void 0;
function getClientDatas() {
  if (clientInfos) return clientInfos;
  let e = [];
  var t,
    r,
    n = "p4 -ztag -Mj clients -t --me";
  return 0 !==
    (e =
      0 ===
        (e =
          isPipelineEnv() &&
          "" !== (t = getP4CurrentDirectory()) &&
          ((t = t
            .split("/")
            .map((e) => `find /I "${e}"`)
            .join(" | ")),
          ([t, r] = (0, Platform_1.getPlatform)().Exec(n + " | " + t)),
          t)
            ? r.trim().split("\n")
            : e).length && (([t, r] = (0, Platform_1.getPlatform)().Exec(n)), t)
        ? r.trim().split("\n")
        : e).length
    ? (clientInfos = e.map((e) =>
        parse(e.trim().replace('"client"', '"Client"')),
      ))
    : void 0;
}
function checkP4Connection() {
  var [e, t] = (0, Platform_1.getPlatform)().Exec("p4 info");
  return e && !t.includes("Perforce client error");
}
(exports.getClientDatas = getClientDatas),
  (exports.checkP4Connection = checkP4Connection);
let currentP4ClientData = void 0;
function getP4ClientData() {
  if (currentP4ClientData) return currentP4ClientData;
  if (checkP4Connection()) {
    var e = getClientDatas();
    if (e) {
      const t = upperStringFirstLetter((0, File_1.getProjectPath)(""));
      return (currentP4ClientData = e.find((e) =>
        t.startsWith(
          (upperStringFirstLetter(e.Root).replace(/\\/g, "/") + "/").replace(
            /\/+/g,
            "/",
          ),
        ),
      ));
    }
  }
}
function getP4ClientDataByFilePath(e) {
  var t = getClientDatas();
  if (t) {
    const r = upperStringFirstLetter(e);
    return t.find((e) =>
      r.startsWith(
        (upperStringFirstLetter(e.Root).replace(/\\/g, "/") + "/").replace(
          /\/+/g,
          "/",
        ),
      ),
    );
  }
}
function getStreamFromSpecFile(e) {
  if (e) {
    var t = (0, File_1.getProjectPath)(
        "Content/Aki/JavaScript_Raw/UniverseEditor/Interface/IGlobal.js",
      ).replace(/\\/g, "/"),
      [e, t] = (0, Platform_1.getPlatform)().Exec(
        `p4 -ztag -c ${e} filelog -m 1 ` + t,
      );
    if (e) {
      e = t.split("\n").find((e) => e.includes("depotFile"));
      if (e)
        return (t = /\/\/([^/]+\/[^/]+)\//.exec(e)) && t[1]
          ? "//" + t[1]
          : void 0;
    }
  }
}
function getStreamFromEnv() {
  var e =
    process.env.Stream ??
    process.env.STREAM ??
    process.env.AKI_Stream ??
    process.env.Branch;
  if (e) return e.indexOf("//aki/") < 0 ? "//aki/" + e : e;
}
exports.getP4ClientDataByFilePath = getP4ClientDataByFilePath;
let currentStream = void 0;
function getCurrentP4Stream() {
  var e;
  return (
    currentStream ||
      ((currentStream = getStreamFromEnv()) ||
        ((e = getP4ClientData()),
        (currentStream = e?.Stream ?? getStreamFromSpecFile(e?.Client))),
      (0, Log_1.log)("Run in Stream: " + currentStream)),
    currentStream
  );
}
function getCurrentClientRoot() {
  return getP4ClientData()?.Root;
}
function getCurrentClientName() {
  return getP4ClientData()?.Client;
}
function getCurrentP4Branch() {
  var e = getCurrentP4Stream();
  if (!e) throw new Error("找不到当前工作空间的Stream");
  if (e.startsWith("//aki/")) return e.substring("//aki/".length);
  throw new Error("当前P4环境不是aki分支");
}
function getWorkspaceBranch() {
  return (0, Init_1.getWorkspaceBranchDefine)();
}
function getCurrentP4Owner() {
  return getP4ClientData()?.Owner;
}
function getChangeListShelveFiles(e) {
  var e = "p4 -ztag -Mj describe -S " + e,
    [e, t] = (0, Platform_1.getPlatform)().Exec(e);
  if (!e) return [];
  e = parse(t);
  if (!e) return [];
  var r = [];
  for (const n of Object.entries(e)) n[0].includes("depotFile") && r.push(n[1]);
  return r;
}
(exports.getCurrentP4Stream = getCurrentP4Stream),
  (exports.getCurrentClientRoot = getCurrentClientRoot),
  (exports.getCurrentClientName = getCurrentClientName),
  (exports.getCurrentP4Branch = getCurrentP4Branch),
  (exports.getWorkspaceBranch = getWorkspaceBranch),
  (exports.getCurrentP4Owner = getCurrentP4Owner),
  (exports.getChangeListShelveFiles = getChangeListShelveFiles);
let akiBasePath = void 0;
function getAkiBaseLocalPath() {
  if (akiBasePath) return akiBasePath;
  var t = getClientDatas();
  if (t) {
    t = t.filter((e) => "//AkiBase/mainline" === e.Stream);
    if (t.length <= 0) (0, Log_1.error)("找不到AkiBase目录, 请先创建WorkSpace");
    else {
      let e = void 0;
      for (const n of t) {
        var r = n.Root;
        if ((0, File_1.existDir)(r)) {
          e = n;
          break;
        }
      }
      if (e) return (akiBasePath = e.Root);
      (0, Log_1.error)("本地找不到AkiBase目录, 请先创建WorkSpace");
    }
  }
}
function getAkiBaseProjectPath(e) {
  return getAkiBaseLocalPath() + "/Source/Client/" + e;
}
(exports.getAkiBaseLocalPath = getAkiBaseLocalPath),
  (exports.getAkiBaseProjectPath = getAkiBaseProjectPath);
let akiBaseClient = void 0;
function getAkiBaseClient() {
  if (akiBaseClient) return akiBaseClient;
  var e = getClientDatas();
  if (e) {
    e = e.find((e) => "//AkiBase/mainline" === e.Stream);
    if (e) return (akiBaseClient = e.Client);
    (0, Log_1.error)("找不到AkiBase目录, 请先创建WorkSpace");
  }
}
function loadEditorSaviorSyncConfig() {
  var e = new Map(),
    t = (0, File_1.getUserDirPath)(".editor_savior/sync_config.json");
  if ((0, File_1.existFile)(t)) {
    var r = readJsonObj(t);
    if (r)
      for (const o in r) {
        var n = r[o];
        n.forEach((e) => {
          e.Type = "EditorSavior";
        }),
          e.set(o, n);
      }
  }
  return e;
}
function getCurrentClientEditorSaviorSyncData() {
  var e = getCurrentP4Stream();
  if (e) {
    e = loadEditorSaviorSyncConfig().get(e);
    if (e) return e.find((e) => e.ClientName === getCurrentClientName());
  }
}
function loadUgsSyncConfig() {
  var e = (0, File_1.getProjectPath)("../../.ugs/state.json");
  if ((0, File_1.existFile)(e)) {
    e = readJsonObj(e);
    if (e)
      return (e.Type = "Ugs"), (e.Timestamp = Date.parse(e.LastSyncTime)), e;
  }
}
function getCurrentSyncData() {
  var e,
    t = getCurrentClientEditorSaviorSyncData(),
    r = loadUgsSyncConfig();
  return t && r
    ? ((e = isNaN(t.Timestamp) ? -1 : t.Timestamp),
      (isNaN(r.Timestamp) ? -1 : r.Timestamp) < e ? t : r)
    : (t ?? r);
}
(exports.getAkiBaseClient = getAkiBaseClient),
  (exports.loadEditorSaviorSyncConfig = loadEditorSaviorSyncConfig),
  (exports.getCurrentClientEditorSaviorSyncData =
    getCurrentClientEditorSaviorSyncData),
  (exports.loadUgsSyncConfig = loadUgsSyncConfig),
  (exports.getCurrentSyncData = getCurrentSyncData);
let currentSafeVersion = void 0;
function getLocalSafeVersion() {
  if (void 0 === currentSafeVersion) {
    var e = getCurrentSyncData();
    if (!e)
      return (
        ((currentSafeVersion = 0), Log_1.warn)(
          "当前未从【编辑器救世主】或【UGS】更新过安全版本，请先拉取安全版本",
        ),
        0
      );
    switch (e.Type) {
      case "EditorSavior":
        currentSafeVersion = e.ChangeNum;
        break;
      case "Ugs":
        currentSafeVersion = e.CurrentChangeNumber;
    }
  }
  return currentSafeVersion;
}
function getPlatformType() {
  return (0, Platform_1.getPlatform)().GetPlatformType();
}
function isUePlatform() {
  return 0 === getPlatformType();
}
function isNodeJsPlatform() {
  return 1 === getPlatformType();
}
function isRuntimePlatform() {
  return 2 === getPlatformType();
}
function isVectorEqual(e, t, r = 0, n = 1e-4) {
  return (
    Math.abs((e?.X ?? r) - (t?.X ?? r)) <= n &&
    Math.abs((e?.Y ?? r) - (t?.Y ?? r)) <= n &&
    Math.abs((e?.Z ?? r) - (t?.Z ?? r)) <= n
  );
}
function getVectorDistance(e, t) {
  var r = (e.X ?? 0) - (t.X ?? 0),
    n = (e.Y ?? 0) - (t.Y ?? 0),
    e = (e.Z ?? 0) - (t.Z ?? 0);
  return Math.sqrt(r * r + n * n + e * e);
}
function isVector2Equal(e, t, r = 0, n = 1e-4) {
  return (
    Math.abs((e?.X ?? r) - (t?.X ?? r)) <= n &&
    Math.abs((e?.Y ?? r) - (t?.Y ?? r)) <= n
  );
}
function addVector(e, t) {
  return {
    X: (e?.X ?? 0) + (t?.X ?? 0),
    Y: (e?.Y ?? 0) + (t?.Y ?? 0),
    Z: (e?.Z ?? 0) + (t?.Z ?? 0),
  };
}
function subVector(e, t) {
  return {
    X: (e?.X ?? 0) - (t?.X ?? 0),
    Y: (e?.Y ?? 0) - (t?.Y ?? 0),
    Z: (e?.Z ?? 0) - (t?.Z ?? 0),
  };
}
function scaleVector(e, t) {
  return { X: (e.X ?? 0) * t, Y: (e.Y ?? 0) * t, Z: (e.Z ?? 0) * t };
}
function isPosInsideSphere(e, t, r) {
  var n = e.X ?? 0,
    o = e.Y ?? 0,
    e = e.Z ?? 0,
    n = (r.X ?? 0) - n,
    o = (r.Y ?? 0) - o,
    r = (r.Z ?? 0) - e;
  return n * n + o * o + r * r <= t * t;
}
function isSphereInsideSphere(e, t, r, n, o = 0.01) {
  var a = e.X ?? 0,
    s = e.Y ?? 0,
    e = e.Z ?? 0,
    a = a - (r.X ?? 0),
    s = s - (r.Y ?? 0),
    e = e - (r.Z ?? 0),
    r = n - t;
  return a * a + s * s + e * e - r * r <= o * o;
}
function isTransformEqual(e, t, r = 1e-4, n = 1e-4, o = 1e-4) {
  var a = { X: 0, Y: 0, Z: 0 },
    s = { X: 1, Y: 1, Z: 1 };
  return (
    isVectorEqual(e.Pos || a, t.Pos || a, 0, r) &&
    isVectorEqual(e.Rot ?? a, t.Rot ?? a, 0, n) &&
    isVectorEqual(e.Scale ?? s, t.Scale ?? s, 1, o)
  );
}
function isSetEqual(e, t) {
  if (e.size !== t.size) return !1;
  for (const r of e) if (!t.has(r)) return !1;
  return !0;
}
function isPortInUse(e) {
  return Recorder_1.perfRecorder.Run(
    () => (0, Platform_1.getPlatform)().IsPortInUse(e),
    "isPortInUse",
  );
}
(exports.getLocalSafeVersion = getLocalSafeVersion),
  (exports.getPlatformType = getPlatformType),
  (exports.isUePlatform = isUePlatform),
  (exports.isNodeJsPlatform = isNodeJsPlatform),
  (exports.isRuntimePlatform = isRuntimePlatform),
  (exports.isVectorEqual = isVectorEqual),
  (exports.getVectorDistance = getVectorDistance),
  (exports.isVector2Equal = isVector2Equal),
  (exports.addVector = addVector),
  (exports.subVector = subVector),
  (exports.scaleVector = scaleVector),
  (exports.isPosInsideSphere = isPosInsideSphere),
  (exports.isSphereInsideSphere = isSphereInsideSphere),
  (exports.isTransformEqual = isTransformEqual),
  (exports.isSetEqual = isSetEqual),
  (exports.isPortInUse = isPortInUse);
let localIp = void 0;
function getLocalIp() {
  var e, t;
  return (
    localIp ||
      (([t, e] = (0, Platform_1.getPlatform)().Exec("ipconfig")),
      t &&
        (t = /IPv4 Address.+?(\d+\.\d+\.\d+\.\d+)/.exec(e)) &&
        (localIp = t[1])),
    localIp
  );
}
function getCommandLine() {
  return (0, Platform_1.getPlatform)().GetCommandLine();
}
function getEditorCommandArgs() {
  var r = getCommandLine();
  if (1 === r.length) return {};
  var n = {},
    o = Object.keys(IEditor_1.defaultEditorArgConfig);
  for (let t = 1; t < r.length; t++) {
    var a = r[t];
    if (a.startsWith("-")) {
      a = a.slice(1);
      let e = "";
      o.includes(a) &&
        (t + 1 < r.length && !r[t + 1].startsWith("-") && ((e = r[t + 1]), t++),
        (n[a] = e));
    }
  }
  return n;
}
function isValidVarName(e, t = 16) {
  return e.length > t
    ? [!1, `变量【${e}】名称长度不能超过16`]
    : !e[0] || ("0" <= e[0] && e[0] <= "9")
      ? [!1, `变量【${e}】名称不能以数字开头`]
      : "q_count" === e
        ? [!1, `变量【${e}】名称不能包含程序定义字符【q_count】`]
        : /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(e)
          ? [!0, void 0]
          : [!1, `变量【${e}】名称不能包含特殊字符`];
}
function isInPie() {
  return (0, Platform_1.getPlatform)().IsInPie();
}
function formatDateTime(e, t = "cn") {
  var r = new Date(e),
    n = r.getFullYear(),
    o = 9 < r.getMonth() + 1 ? r.getMonth() + 1 : "0" + (r.getMonth() + 1),
    a = 9 < r.getDate() ? r.getDate() : "0" + r.getDate(),
    s = 9 < r.getHours() ? r.getHours() : "0" + r.getHours(),
    i = 9 < r.getMinutes() ? r.getMinutes() : "0" + r.getMinutes(),
    u = 9 < r.getSeconds() ? r.getSeconds() : "0" + r.getSeconds();
  switch (t) {
    case "cn":
      return (
        n +
        `-${o}-${a}-${"星期" + "日一二三四五六".charAt(r.getDay())} ${s}:${i}:` +
        u
      );
    case "simple":
      return "" + n + o + a + s + i + u;
  }
  throw new Error("formatDateTime: unknown format " + t);
}
function stringIsNullOrEmpty(e) {
  return "string" != typeof e || void 0 === e || 0 === e.length;
}
function getMd5(e) {
  return crypto.MD5(e).toString();
}
function deepCopyData(e) {
  return JSON.parse(JSON.stringify(e));
}
function toDepotPath(e) {
  if (e.startsWith("//aki/")) return e;
  let t = getCurrentP4Stream(),
    r = getCurrentClientRoot();
  var n;
  return t && r
    ? ((e = (0, File_1.getAbsolutePath)(e)),
      (r = r.replace(/\\/g, "/")).endsWith("/") &&
        !t.endsWith("/") &&
        (t += "/"),
      (n = new RegExp(r, "gi")),
      e.replace(/\\/g, "/").replace(n, t))
    : void 0;
}
function isDepotFileExist(e) {
  var [e, t] = exec("p4 -Mj files " + e);
  return e && !t.includes("no such file(s)") && !t.includes("- delete change");
}
async function doJsonHttpGet(e, t) {
  var r = await (0, Platform_1.getPlatform)().DoJsonHttpReq("GET", e, t);
  if (200 !== r.Status)
    throw new Error(
      `doJsonHttpGet ${e} ${t} failed, status: ${r.Status}, data: ` + r.Data,
    );
  return r.Data;
}
async function doJsonHttpPost(e, t) {
  var r = await (0, Platform_1.getPlatform)().DoJsonHttpReq("POST", e, t);
  if (201 !== r.Status && 200 !== r.Status)
    throw new Error(
      `doJsonHttpPost ${e} ${t} failed, status: ${r.Status}, data: ` + r.Data,
    );
  return r.Data;
}
async function doJsonHttpDelete(e, t) {
  var r = await (0, Platform_1.getPlatform)().DoJsonHttpReq("DELETE", e, t);
  if (204 !== r.Status)
    throw new Error(
      `doJsonHttpDelete ${e} ${t} failed, status: ${r.Status}, data: ` + r.Data,
    );
  return r.Data;
}
function compareTextOrder(e, t) {
  var r = e.replace(/_[^_]*$/, ""),
    n = t.replace(/_[^_]*$/, "");
  return r !== n
    ? r < n
      ? -1
      : 1
    : (r = e.split("_").pop()) === (n = t.split("_").pop())
      ? 0
      : Number(r) && Number(n)
        ? Number(r) < Number(n)
          ? -1
          : 1
        : r < n
          ? -1
          : 1;
}
function getBranchReqShortPath(e) {
  var t = (0, File_1.getAbsolutePath)(e).replace(/\\/g, "/"),
    r = t.indexOf("Source/");
  if (r < 0)
    (0, Log_1.error)(
      `文件: ${e} 不在分支 Source/ 目录下管理, 请确认是否为分支内文件 `,
    );
  else if (getCurrentP4Stream()) return t.substring(r);
}
function getBranchOriginsDataSync(e) {
  var t = getBranchReqShortPath(e);
  if (t) {
    var [t, r] = exec(
      `curl -X POST http://tools.aki.kuro.com:1025/multibranch/aki/file_origins -H "Content-Type:application/json" -d "{\\"filePath\\":\\"${t}\\"}"`,
    );
    if (t) {
      t = r.indexOf('{"code":');
      if (!(t < 0))
        return {
          Origins: (t = parse(r.substring(t))).data.origins,
          IsInDepot: !t.data.useDefault,
        };
      (0, Log_1.error)(
        `[${e}]获取文件分支信息返回异常: 
` + r,
      );
    } else (0, Log_1.error)("获取文件分支信息失败: " + e);
  }
}
(exports.getLocalIp = getLocalIp),
  (exports.getCommandLine = getCommandLine),
  (exports.getEditorCommandArgs = getEditorCommandArgs),
  (exports.isValidVarName = isValidVarName),
  (exports.isInPie = isInPie),
  (exports.formatDateTime = formatDateTime),
  (exports.stringIsNullOrEmpty = stringIsNullOrEmpty),
  (exports.getMd5 = getMd5),
  (exports.deepCopyData = deepCopyData),
  (exports.toDepotPath = toDepotPath),
  (exports.isDepotFileExist = isDepotFileExist),
  (exports.doJsonHttpGet = doJsonHttpGet),
  (exports.doJsonHttpPost = doJsonHttpPost),
  (exports.doJsonHttpDelete = doJsonHttpDelete),
  (exports.compareTextOrder = compareTextOrder),
  (exports.getBranchReqShortPath = getBranchReqShortPath),
  (exports.getBranchOriginsDataSync = getBranchOriginsDataSync);
let allBranchesFromServer = void 0;
function getAllDepotBranchDataSync() {
  if (allBranchesFromServer) return allBranchesFromServer;
  var [e, t] = exec(
    "curl --request GET --url http://tools.aki.kuro.com:1025/multibranch/aki/branches",
  );
  if (e) {
    var e = t.indexOf('{"code":');
    if (!(e < 0))
      return (
        (e = parse(t.substring(e))),
        (allBranchesFromServer = e.data.map((e) => e.replace("//aki/", "")))
      );
    (0, Log_1.error)(
      `获取所有分支信息返回异常: 
` + t,
    );
  } else (0, Log_1.error)("获取所有分支信息失败");
}
function isCurrentBranchAsset(e) {
  var t,
    e = getBranchOriginsDataSync(e);
  return !!e && ((t = "//aki/" + getWorkspaceBranch()), e.Origins.includes(t));
}
async function getFileDepotInfoAsyncBatch(e) {
  e = e.map((e) => getBranchReqShortPath(e));
  const t = { filePaths: e };
  let r = { Success: !1, Error: "获取仓库信息失败" };
  for (
    let e = 0;
    e < 2 &&
    !(r = await (async () => {
      try {
        var e = await doJsonHttpPost(
          "http://tools.aki.kuro.com:1025/multibranch/aki/file/batch/exist",
          t,
        );
        return e
          ? { Success: !0, Result: e.data }
          : {
              Success: !1,
              Error: `获取仓库信息失败: ${e} (${stringify(t)})`,
              Result: void 0,
            };
      } catch (e) {
        return { Success: !1, Error: "获取仓库信息异常: " + e };
      }
    })()).Result;
    e++
  );
  return r.Error && (0, Log_1.error)(r.Error), r;
}
(exports.getAllDepotBranchDataSync = getAllDepotBranchDataSync),
  (exports.isCurrentBranchAsset = isCurrentBranchAsset),
  (exports.getFileDepotInfoAsyncBatch = getFileDepotInfoAsyncBatch);
let fileOriginRequiredList = void 0;
async function getTextFileOriginRequiredList() {
  var e;
  return (
    fileOriginRequiredList ||
    ((e = await doJsonHttpGet(
      "http://tools.aki.kuro.com:1025/multibranch/aki/originrequiredlist",
    ))
      ? (fileOriginRequiredList = e.data)
      : ((e = "获取分支管理文本文件路径信息失败: " + e),
        void (0, Log_1.error)(e)))
  );
}
function isTextFileByExtension(e) {
  e = e.split(".").pop()?.toLowerCase();
  return !(
    !e ||
    ![
      "txt",
      "md",
      "html",
      "htm",
      "css",
      "js",
      "ts",
      "json",
      "xml",
      "csv",
      "log",
      "ini",
      "yaml",
      "yml",
      "py",
      "java",
      "c",
      "cpp",
      "h",
      "hpp",
      "php",
      "rb",
      "sh",
      "bat",
      "cmd",
      "pl",
      "sql",
      "r",
      "go",
      "kt",
    ].includes(e)
  );
}
async function isTextFileInOriginRequiredListAsync(e) {
  var t = await getTextFileOriginRequiredList();
  if (t)
    for (const o of t) {
      var r = o.replace(/\./g, "\\.").replace(/\*/g, ".*"),
        r = new RegExp(`(^|\\/|\\\\)${r}$`),
        n = e.replace(/^.*\/Source/, "Source");
      if (r.test(n)) return !0;
    }
  return !1;
}
async function getBatchFileBranchDataAsync(t) {
  const r = getCurrentP4Stream();
  if (!r) return { Success: !1, Error: "获取当前分支失败" };
  var e = new Map(),
    n = [],
    o = new Map(),
    a = new Map(),
    t = await getFileDepotInfoAsyncBatch(t);
  if (t.Success)
    for (var [s, i] of Object.entries(t.Result)) {
      var u = r + "/" + s;
      i.findIndex((e) => e.endsWith(r)) < 0
        ? e.set(u, { IsInDepot: !1, Origins: [r] })
        : (a.set(s, i), n.push(s), o.set(s, u));
    }
  t = { filePaths: n };
  try {
    var c,
      p = await doJsonHttpPost(
        "http://tools.aki.kuro.com:1025/multibranch/aki/file_origins/batch",
        t,
      );
    if (!p)
      return (
        (c = `获取分支信息失败: ${p} (${stringify(t)})`),
        (0, Log_1.error)(c),
        { Success: !1, Error: c }
      );
    for (const [x, g] of Object.entries(p.data)) {
      var f = o.get(x);
      if (f)
        if (
          isTextFileByExtension(f) &&
          !(await isTextFileInOriginRequiredListAsync(f))
        )
          e.set(f, {
            IsInDepot: !0,
            Origins: ["//aki/" + getWorkspaceBranch()],
          });
        else {
          if (g.useDefault) {
            var l = a.get(x) ?? [];
            if (!(0 < l.length)) {
              e.set(f, { IsInDepot: !1, Origins: [r] });
              continue;
            }
            if (l.every((e) => !g.origins.includes(e))) {
              e.set(f, { IsInDepot: !0, Origins: [l[0]] });
              continue;
            }
          }
          e.set(f, { IsInDepot: !0, Origins: g.origins });
        }
      else (0, Log_1.error)(`获取分支信息: ${x} 未找到对应文件路径`);
    }
    return { Success: !0, Result: e };
  } catch (e) {
    t = "获取分支信息失败: " + e;
    return (0, Log_1.error)(t), { Success: !1, Error: t };
  }
}
async function getFileSourceBranchAsync(e) {
  var t = await getBatchFileBranchDataAsync([e]);
  return t.Success
    ? toDepotPath(e)
      ? { Success: !0, Result: t.Result.get(e) }
      : { Success: !1, Error: "文件路径非法，不是项目内的文件" }
    : { Success: !1, Error: t.Error };
}
async function isCurrentBranchAssetAsync(e) {
  var t = getBranchReqShortPath(e);
  if (!t) return !1;
  var r = getCurrentP4Stream();
  if (!r) return !1;
  t = { filePath: t };
  try {
    var n = await doJsonHttpPost(
      "http://tools.aki.kuro.com:1025/multibranch/aki/file_origins",
      t,
    );
    return n
      ? n.data.origins.includes(r)
      : ((0, Log_1.error)(`获取分支信息失败: ${n} (${e})`), !1);
  } catch (e) {
    t = "获取分支信息失败: " + e;
    return (0, Log_1.error)(t), !1;
  }
}
async function execAsync(e) {
  return await (0, Platform_1.getPlatform)().ExecAsync(e);
}
function touchInstance(e) {
  return e.Instance;
}
function isIpAddress(e) {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    e,
  );
}
function changeChineseStringToEnglishString(t) {
  let r = "";
  for (let e = 0; e < t.length; e++) {
    var n = t.codePointAt(e);
    r += n.toString(36);
  }
  return r;
}
function createDiffPaths(e, t, r) {
  const s = [],
    i = (r, n, e, o) => {
      if (r !== n)
        if (r instanceof Array && n instanceof Array) {
          var t = Math.max(r.length, n.length);
          for (let e = 0; e < t; e++) {
            var a = o ? `${o}.[${e}]` : `[${e}]`;
            i(r[e], n[e], e, a);
          }
        } else
          r instanceof Object && n instanceof Object
            ? new Set([...Object.keys(r), ...Object.keys(n)]).forEach((e) => {
                var t = o ? o + "." + e : e;
                i(r[e], n[e], e, t);
              })
            : void 0 === r
              ? s.push({
                  Path: o,
                  KeyOrIndex: e,
                  Value1: void 0,
                  Value2: n,
                  State: "added",
                })
              : void 0 === n
                ? s.push({
                    Path: o,
                    KeyOrIndex: e,
                    Value1: r,
                    Value2: void 0,
                    State: "deleted",
                  })
                : s.push({
                    Path: o,
                    KeyOrIndex: e,
                    Value1: r,
                    Value2: n,
                    State: "modified",
                  });
    };
  return i(e, t, void 0, r), s;
}
(exports.getTextFileOriginRequiredList = getTextFileOriginRequiredList),
  (exports.isTextFileByExtension = isTextFileByExtension),
  (exports.isTextFileInOriginRequiredListAsync =
    isTextFileInOriginRequiredListAsync),
  (exports.getBatchFileBranchDataAsync = getBatchFileBranchDataAsync),
  (exports.getFileSourceBranchAsync = getFileSourceBranchAsync),
  (exports.isCurrentBranchAssetAsync = isCurrentBranchAssetAsync),
  (exports.execAsync = execAsync),
  (exports.touchInstance = touchInstance),
  (exports.isIpAddress = isIpAddress),
  (exports.changeChineseStringToEnglishString =
    changeChineseStringToEnglishString),
  (exports.createDiffPaths = createDiffPaths);
class ValueStack {
  constructor() {
    this.n5 = [];
  }
  Push(e, t) {
    this.n5.push({ Value: e, Key: t });
  }
  Pop() {
    return this.n5.pop();
  }
  Peek() {
    return this.n5[this.n5.length - 1];
  }
  Size() {
    return this.n5.length;
  }
  GetStack() {
    return this.n5;
  }
  ToString(e = 0) {
    var t = [];
    for (const n of this.n5) {
      var r = "number" == typeof n.Key ? `[${n.Key}]` : n.Key;
      if (0 < e && e <= t.length) break;
      t.push("" + r);
    }
    return t.join(".");
  }
}
function getValueByDataPath(e, t) {
  let r = e;
  var n;
  for (const o of t.split("."))
    r instanceof Array
      ? ((n = parseInt(o.slice(1, -1), 10)), isNaN(n) || (r = r[n]))
      : r instanceof Object && (r = r[o]);
  return r;
}
function createValueStackByDataPath(e, t) {
  var r,
    n = new ValueStack();
  let o = e;
  for (const a of t.split("."))
    o instanceof Array
      ? ((r = parseInt(a.slice(1, -1), 10)),
        isNaN(r) || ((o = o[r]), n.Push(o, r)))
      : o instanceof Object && ((o = o[a]), n.Push(o, a));
  return n;
}
function isSubdirectoryDataPath(e, t) {
  const r = e.split(".").filter((e) => e.length);
  return t
    .split(".")
    .filter((e) => e.length)
    .every((e, t) => r[t] === e);
}
function objectIterator(e, a) {
  const s = (t, r) => {
    if (null != t)
      if (t instanceof Array)
        for (let e = 0; e < t.length; e++) {
          var n = t[e];
          r.Push(n, e), a(n, r), s(n, r), r.Pop();
        }
      else if (t instanceof Object)
        for (const o in t) {
          var e = t[o];
          r.Push(e, o), a(e, r), s(e, r), r.Pop();
        }
  };
  s(e, new ValueStack());
}
function isArrayElementSame(e, t) {
  var e = new Set(e),
    r = new Set(t);
  if (e.size !== r.size) return !1;
  for (const n of e) if (!r.has(n)) return !1;
  return !0;
}
(exports.ValueStack = ValueStack),
  (exports.getValueByDataPath = getValueByDataPath),
  (exports.createValueStackByDataPath = createValueStackByDataPath),
  (exports.isSubdirectoryDataPath = isSubdirectoryDataPath),
  (exports.objectIterator = objectIterator),
  (exports.isArrayElementSame = isArrayElementSame);
//# sourceMappingURL=Util.js.map
