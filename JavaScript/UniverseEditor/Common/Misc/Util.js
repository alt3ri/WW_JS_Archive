"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.killProcess =
    exports.isProcessRunning =
    exports.isProcessRunningInPath =
    exports.getProcessImagePathsByName =
    exports.isRunAsAdmin =
    exports.execAsUser =
    exports.exec =
    exports.getTimeSeconds =
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
    exports.parseCsvIntArray =
    exports.parseBool =
    exports.parseIntSafe =
    exports.parseFloatSafe =
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
  (exports.getBranchReqShortPath =
    exports.compareTextOrder =
    exports.doJsonHttpDelete =
    exports.doJsonHttpPost =
    exports.doJsonHttpGet =
    exports.toDepotPath =
    exports.deepCopyData =
    exports.getMd5 =
    exports.stringIsNullOrEmpty =
    exports.formatDateTime =
    exports.isPipelineEnv =
    exports.isInPie =
    exports.isValidVarName =
    exports.getEditorCommandArgs =
    exports.getCommandLine =
    exports.getLocalIp =
    exports.isPortInUse =
    exports.isSetEqual =
    exports.isTransformEqual =
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
    exports.getAkiBaseProjectPath =
    exports.getAkiBaseLocalPath =
    exports.getChangeListShelveFiles =
    exports.getCurrentP4Owner =
    exports.getWorkspaceBranch =
    exports.getCurrentP4Branch =
    exports.getCurrentClientName =
    exports.getCurrentClientRoot =
    exports.getCurrentP4Stream =
    exports.checkP4Connection =
    exports.upperStringFirstLetter =
    exports.checkMonsterValid =
    exports.getNextPathName =
    exports.getPreName =
    exports.getUniqueName =
    exports.getNextName =
    exports.getNameWithoutIndex =
      void 0),
  (exports.isIpAddress =
    exports.touchInstance =
    exports.execAsync =
    exports.isCurrentBranchAssetAsync =
    exports.getFileSourceBranchAsync =
    exports.getBatchFileBranchDataAsync =
    exports.isTextFileInOriginRequiredListAsync =
    exports.isTextFileByExtension =
    exports.getTextFileOriginRequiredList =
    exports.getFileDepotInfoAsync =
    exports.getFileDepotInfo =
    exports.isCurrentBranchAsset =
    exports.getAllDepotBranchDataSync =
    exports.getBranchOriginsDataSync =
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
function getEnumValues(e) {
  return Object.keys(e)
    .filter((t) => Number.isNaN(Number(t)))
    .map((t) => e[t]);
}
function getEnumNames(t) {
  return Object.keys(t).filter((t) => Number.isNaN(Number(t)));
}
function getEnumNameByValue(e, r) {
  var t = Object.keys(e).find((t) => e[t] === r);
  return t || "";
}
function subArray(t, e) {
  return e.length <= 0 ? t : t.filter((t) => !e.includes(t));
}
function addArray(t, e) {
  return [...t, ...e];
}
function unionArray(t, e) {
  return Array.from(new Set([...t, ...e]));
}
function arrayToMap(t, e) {
  return new Map(t.map((t) => [t[e], t]));
}
function arrayToRecord(t) {
  const e = {};
  return t.forEach((t) => (e[t] = t)), e;
}
function calHash(e) {
  let r = 0;
  var n = e.length;
  if (0 !== n) {
    for (let t = 0; t < n; t++) {
      var o = e.charCodeAt(t);
      (r = (r << 5) - r + o), (r |= 0);
    }
    r < 0 && (r = -r);
  }
  return r;
}
function getFieldCount(t) {
  let e = 0;
  for (const r in t) r && e++;
  return e;
}
function stringify(t, r, e = !0) {
  return JSON.stringify(
    t,
    (t, e) => {
      if (!r || "string" != typeof t || !t.startsWith("_")) return e;
    },
    e ? 2 : void 0,
  );
}
function parse(t, e) {
  return JSON.parse(t, (t, r) => {
    if (!e || !t.startsWith("_"))
      return (
        r instanceof Array &&
          r.forEach((t, e) => {
            null === t && (r[e] = void 0);
          }),
        r
      );
  });
}
function stringFormat(t, ...r) {
  return t.replace(/{([0-9])}/g, (t, e) =>
    void 0 !== r[e] ? r[e].toString() : t,
  );
}
function parseFloatSafe(t, e) {
  (t = parseFloat(t)), (t = Number.isNaN(t) ? 0 : t);
  return e ? ((e = 10 ** e), Math.round(t * e) / e) : t;
}
function parseIntSafe(t, e) {
  t = parseInt(t, e);
  return Number.isNaN(t) ? 0 : t;
}
function parseBool(t) {
  return !!t && ("1" === t || "true" === t || "True" === t || "TRUE" === t);
}
function parseCsvIntArray(t) {
  return t
    .substring(1, t.length - 1)
    .split(",")
    .map((t) => parseIntSafe(t));
}
function parseCsvInt2Array(t) {
  return JSON.parse(t);
}
function parseCsvStringArray(t) {
  return t.substring(1, t.length - 1).split(",");
}
function parseCsvFloatArray(t) {
  return t
    .substring(1, t.length - 1)
    .split(",")
    .map((t) => parseFloatSafe(t));
}
function parseCsvLongArray(t) {
  return t
    .substring(1, t.length - 1)
    .split(",")
    .map((t) => parseIntSafe(t));
}
function parsePos(t) {
  t = parseCsvIntArray(t);
  return t ? { X: t[0], Y: t[1], Z: t[2] } : { X: 0, Y: 0, Z: 0 };
}
function parseVarValue(t, e) {
  switch (t) {
    case "Boolean":
      return parseBool(e);
    case "String":
      return e;
    case "Float":
      return parseFloat(e);
    case "Entity":
    case "Quest":
    case "QuestState":
    case "Prefab":
    case "Int":
      var r = parseInt(e);
      return isNaN(r) ? 0 : r;
    case "Pos":
      return parsePos(e);
  }
  return IVar_1.varConfig[t];
}
function stringifyBool(t) {
  return t ? "1" : "0";
}
function stringifyEditor(t) {
  return JSON.stringify(
    t,
    (t, e) => {
      if (
        !("string" == typeof t && 0 < t.length) ||
        t.startsWith("_") ||
        "object" == typeof e
      )
        return e;
    },
    2,
  );
}
function alignNumber(t, e = 1) {
  return Math.floor(t / e) * e;
}
function clampAngle(t) {
  let e = t % 360;
  return e < 0 && (e += 360), e;
}
function clampNumber(t, e, r) {
  return Math.max(e, Math.min(t, r));
}
function isNumText(t) {
  return /^\d+(\.\d+)?$/.test(t);
}
function readJsonObj(t, e) {
  t = (0, File_1.readFile)(t);
  return t ? parse(t) : e || void 0;
}
function writeJson(t, e, r) {
  (0, File_1.writeFile)(e, stringify(t, r));
}
function writeDataJson(t, e) {
  writeJson(t, e, !0);
}
function getClassNameFromBpPath(t) {
  var e = t.lastIndexOf(".");
  return e < 0
    ? ((0, Log_1.error)("Blueprint path is invalid: " + t), t)
    : t.slice(e + 1);
}
function createMultiData(e, t, r) {
  if (void 0 === e) return (0, IUtil_1.clearIgnoreField)(t, r);
  if (null == t) return null;
  if ("object" != typeof t || "object" != typeof e)
    return t !== e ? null : (0, IUtil_1.clearIgnoreField)(t, r);
  if (e instanceof Array) {
    var n = t;
    if (!n || e.length !== n.length) return null;
    const s = [];
    for (let t = 0; t < e.length; t++) {
      var o = createMultiData(e[t], n[t], r);
      s.push(o);
    }
    return s;
  }
  const s = {};
  for (const c in t) r?.(c) || (void 0 === e[c] && (s[c] = null));
  for (const p in e) {
    var a, i, u;
    r?.(p) ||
      ((a = t[p]),
      (i = e[p]),
      null === a || null === i
        ? (s[p] = null)
        : void 0 === a
          ? (s[p] = void 0 === i ? void 0 : null)
          : (u = typeof a) == typeof i && "object" == u
            ? ((u = createMultiData(a, i, r)), (s[p] = u))
            : (s[p] = a !== i ? null : a));
  }
  return s;
}
function applyMultiData(r, t, n) {
  if (null === t) return r;
  if ("object" != typeof t || "object" != typeof r) return t;
  if (r instanceof Array) {
    var e = t;
    if (null !== e) {
      if (0 === e.length || e.length < r.length) return e;
      0 < e.length &&
        e.forEach((t, e) => {
          r[e] = "object" != typeof t ? t : applyMultiData(r[e], t, n);
        });
    }
    return r;
  }
  var o,
    s,
    a,
    i,
    u = {};
  for (const c in t)
    n?.(c) ||
      null === t ||
      ((o = t[c]),
      void 0 === r[c] &&
        null !== o &&
        (u[c] = (0, IUtil_1.removeNullField)(o)));
  for (const p in r)
    n?.(p) ||
      ((s = t[p]),
      (a = r[p]),
      null !== s
        ? (i = typeof s) == typeof a && "object" == i
          ? ((i = applyMultiData(a, s, n)), (u[p] = i))
          : (u[p] = s)
        : (u[p] = a));
  return u;
}
function strcmp(t, e) {
  return t < e ? -1 : e < t ? 1 : 0;
}
function strcmpi(t, e) {
  return t.toLowerCase() < e.toLowerCase()
    ? -1
    : t.toLowerCase() > e.toLowerCase()
      ? 1
      : 0;
}
function forEachField(t, e, r) {
  if ("object" == typeof t) {
    var n = t;
    for (const s in n) {
      var o = n[s];
      "object" == typeof o ? forEachField(o, e, r) : e(s, o) && r(n, s, o);
    }
  }
}
function hasFieldMatch(t, e) {
  if ("object" == typeof t) {
    var r = t;
    for (const o in r) {
      var n = r[o];
      if (e(o, n)) return !0;
      if ("object" == typeof n && hasFieldMatch(n, e)) return !0;
      if (Array.isArray(n))
        for (const s of n)
          if ("object" == typeof s && hasFieldMatch(s, e)) return !0;
    }
  }
  return !1;
}
function getMacAddress() {
  return (0, Platform_1.getPlatform)().GetMacAddress();
}
function getNetWorkAddress() {
  var t = (0, Platform_1.getPlatform)().GetPhysicMacAddress();
  if ("" !== t) return t;
}
function genGuid() {
  let r = new Date().getTime(),
    n = 0;
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (t) {
    let e = 16 * Math.random();
    return (
      0 < r
        ? ((e = (r + e) % 16 | 0), (r = Math.floor(r / 16)))
        : ((e = (n + e) % 16 | 0), (n = Math.floor(n / 16))),
      ("x" === t ? e : (3 & e) | 8).toString(16)
    );
  });
}
function getTimeSeconds() {
  return new Date().getTime() / Async_1.MS_PER_SEC;
}
function exec(t, e) {
  return (0, Platform_1.getPlatform)().Exec(t, e);
}
function execAsUser(t, e) {
  return exec(
    (0, File_1.getTsRoot)() +
      "/Src/UniverseEditor/Tool/run_as_standard_user.bat" +
      " " +
      t,
    e,
  );
}
function isRunAsAdmin() {
  var [t] = exec("net session");
  return t;
}
function getProcessImagePathsByName(t) {
  return (0, Platform_1.getPlatform)().GetProcessImagePathsByName(t);
}
function isProcessRunningInPath(t) {
  const e = t.replace(/\\/g, "/");
  return getProcessImagePathsByName(e.split("/").pop()).some(
    (t) => t.replace(/\\/g, "/") === e,
  );
}
function isProcessRunning(t) {
  t = getProcessImagePathsByName(t);
  return [0 < t.length, t];
}
function killProcess(t) {
  exec(`wmic process where "name='${t}'" delete`);
}
function getNameWithoutIndex(t) {
  var e = t.match(/[^0-9]/g),
    e = t.lastIndexOf(e ? e[e.length - 1] : "");
  return "" + t.substring(0, e + 1);
}
function getNextName(t, e = "-") {
  if (!t) return `user${e}1`;
  let r = -1,
    n = "";
  if (
    ((n = e
      ? ((r = t.lastIndexOf(e)), t.substring(r + 1))
      : ((o = t.match(/[^0-9]/g)),
        (r = t.lastIndexOf(o ? o[o.length - 1] : "") + 1),
        t.substring(r))),
    r < 0)
  )
    return "" + t + e + "1";
  var o = Number.parseInt(n);
  if (isNaN(o)) return "" + t + e + "1";
  var s = n.length;
  for (n = (o + 1).toString(); n.length < s; ) n = "0" + n;
  return "" + t.substring(0, r) + e + n;
}
function getUniqueName(e, t, r = "-") {
  if (e.length < 1) return `${t || "user"}${r}1`;
  let n = getNextName(t || e[0], r);
  for (let t = 0; t < e.length && e.includes(n); t++) n = getNextName(n, r);
  return n;
}
function getPreName(t, e = "-") {
  var r, n;
  return t
    ? (r = t.lastIndexOf(e)) < 0 ||
      ((n = Number.parseInt(t.substring(r + 1))), isNaN(n))
      ? "" + t + e + "1"
      : ((n = n <= 1 ? n : n - 1), "" + t.substring(0, r) + e + n)
    : `user${e}1`;
}
function getNextPathName(t) {
  var e = t.lastIndexOf("."),
    r = t.substring(e, t.length);
  return getNextName(t.substring(0, e)) + r;
}
function checkMonsterValid(t) {
  if (t.length < 2) return [{ X: 0, Y: 0, Z: 0 }, -1];
  var e = t[0].X ?? 0,
    r = t[0].Y ?? 0,
    n = t[1].X ?? 0,
    o = t[1].Y ?? 0;
  let s = n < e ? n : e,
    a = n < e ? e : n,
    i = o < r ? o : r,
    u = o < r ? r : o,
    c = 2;
  for (c = 2; c < t.length; c++) {
    var p = t[c].X ?? 0,
      f = t[c].Y ?? 0;
    (s = p < s ? p : s),
      (a = p > a ? p : a),
      (i = f < i ? f : i),
      (u = f > u ? f : u);
  }
  return [
    { X: (s + a) / 2, Y: (u + i) / 2, Z: 0 },
    Math.floor(Math.sqrt((a - s) * (a - s) + (u - i) * (u - i))) / 2,
  ];
}
function upperStringFirstLetter(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function getClientDatas() {
  var [t, e] = (0, Platform_1.getPlatform)().Exec(
    "p4 -ztag -Mj clients -t --me",
  );
  if (t)
    return e
      .trim()
      .split("\n")
      .map((t) => parse(t.trim().replace('"client"', '"Client"')));
}
function checkP4Connection() {
  var [t, e] = (0, Platform_1.getPlatform)().Exec("p4 info");
  return t && !e.includes("Perforce client error");
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
  (exports.parseFloatSafe = parseFloatSafe),
  (exports.parseIntSafe = parseIntSafe),
  (exports.parseBool = parseBool),
  (exports.parseCsvIntArray = parseCsvIntArray),
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
  (exports.readJsonObj = readJsonObj),
  (exports.writeJson = writeJson),
  (exports.writeDataJson = writeDataJson),
  (exports.getClassNameFromBpPath = getClassNameFromBpPath),
  (exports.createMultiData = createMultiData),
  (exports.applyMultiData = applyMultiData),
  (exports.strcmp = strcmp),
  (exports.strcmpi = strcmpi),
  (exports.forEachField = forEachField),
  (exports.hasFieldMatch = hasFieldMatch),
  (exports.getMacAddress = getMacAddress),
  (exports.getNetWorkAddress = getNetWorkAddress),
  (exports.genGuid = genGuid),
  (exports.getTimeSeconds = getTimeSeconds),
  (exports.exec = exec),
  (exports.execAsUser = execAsUser),
  (exports.isRunAsAdmin = isRunAsAdmin),
  (exports.getProcessImagePathsByName = getProcessImagePathsByName),
  (exports.isProcessRunningInPath = isProcessRunningInPath),
  (exports.isProcessRunning = isProcessRunning),
  (exports.killProcess = killProcess),
  (exports.getNameWithoutIndex = getNameWithoutIndex),
  (exports.getNextName = getNextName),
  (exports.getUniqueName = getUniqueName),
  (exports.getPreName = getPreName),
  (exports.getNextPathName = getNextPathName),
  (exports.checkMonsterValid = checkMonsterValid),
  (exports.upperStringFirstLetter = upperStringFirstLetter),
  (exports.checkP4Connection = checkP4Connection);
let currentP4ClientData = void 0;
function getP4ClientData() {
  if (currentP4ClientData) return currentP4ClientData;
  if (checkP4Connection()) {
    var t = getClientDatas();
    if (t) {
      const e = upperStringFirstLetter((0, File_1.getProjectPath)(""));
      return (currentP4ClientData = t.find((t) =>
        e.startsWith(
          (upperStringFirstLetter(t.Root).replace(/\\/g, "/") + "/").replace(
            /\/+/g,
            "/",
          ),
        ),
      ));
    }
  }
}
function getStreamFromSpecFile(t) {
  if (t) {
    var e = (0, File_1.getProjectPath)(
        "Content/Aki/JavaScript_Raw/UniverseEditor/Interface/IGlobal.js",
      ).replace(/\\/g, "/"),
      [t, e] = (0, Platform_1.getPlatform)().Exec(
        `p4 -ztag -c ${t} filelog -m 1 ` + e,
      );
    if (t) {
      t = e.split("\n").find((t) => t.includes("depotFile"));
      if (t)
        return (e = /\/\/([^/]+\/[^/]+)\//.exec(t)) && e[1]
          ? "//" + e[1]
          : void 0;
    }
  }
}
function getStreamFromEnv() {
  var t =
    process.env.Stream ??
    process.env.STREAM ??
    process.env.AKI_Stream ??
    process.env.Branch;
  if (t) return t.indexOf("//aki/") < 0 ? "//aki/" + t : t;
}
let currentStream = void 0;
function getCurrentP4Stream() {
  var t;
  return (
    currentStream ||
      ((currentStream = getStreamFromEnv()) ||
        ((t = getP4ClientData()),
        (currentStream = t?.Stream ?? getStreamFromSpecFile(t?.Client))),
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
  var t = getCurrentP4Stream();
  if (!t) throw new Error("找不到当前工作空间的Stream");
  if (t.startsWith("//aki/")) return t.substring("//aki/".length);
  throw new Error("当前P4环境不是aki分支");
}
function getWorkspaceBranch() {
  return (0, Init_1.getWorkspaceBranchDefine)();
}
function getCurrentP4Owner() {
  return getP4ClientData()?.Owner;
}
function getChangeListShelveFiles(t) {
  var t = "p4 -ztag -Mj describe -S " + t,
    [t, e] = (0, Platform_1.getPlatform)().Exec(t);
  if (!t) return [];
  t = parse(e);
  if (!t) return [];
  var r = [];
  for (const n of Object.entries(t)) n[0].includes("depotFile") && r.push(n[1]);
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
  var e = getClientDatas();
  if (e) {
    e = e.filter((t) => "//AkiBase/mainline" === t.Stream);
    if (e.length <= 0) (0, Log_1.error)("找不到AkiBase目录, 请先创建WorkSpace");
    else {
      let t = void 0;
      for (const n of e) {
        var r = n.Root;
        if ((0, File_1.existDir)(r)) {
          t = n;
          break;
        }
      }
      if (t) return (akiBasePath = t.Root);
      (0, Log_1.error)("本地找不到AkiBase目录, 请先创建WorkSpace");
    }
  }
}
function getAkiBaseProjectPath(t) {
  return getAkiBaseLocalPath() + "/Source/Client/" + t;
}
function loadEditorSaviorSyncConfig() {
  var t = new Map(),
    e = (0, File_1.getUserDirPath)(".editor_savior/sync_config.json");
  if ((0, File_1.existFile)(e)) {
    var r = readJsonObj(e);
    if (r)
      for (const o in r) {
        var n = r[o];
        n.forEach((t) => {
          t.Type = "EditorSavior";
        }),
          t.set(o, n);
      }
  }
  return t;
}
function getCurrentClientEditorSaviorSyncData() {
  var t = getCurrentP4Stream();
  if (t) {
    t = loadEditorSaviorSyncConfig().get(t);
    if (t) return t.find((t) => t.ClientName === getCurrentClientName());
  }
}
function loadUgsSyncConfig() {
  var t = (0, File_1.getProjectPath)("../../.ugs/state.json");
  if ((0, File_1.existFile)(t)) {
    t = readJsonObj(t);
    if (t)
      return (t.Type = "Ugs"), (t.Timestamp = Date.parse(t.LastSyncTime)), t;
  }
}
function getCurrentSyncData() {
  var t,
    e = getCurrentClientEditorSaviorSyncData(),
    r = loadUgsSyncConfig();
  return e && r
    ? ((t = isNaN(e.Timestamp) ? -1 : e.Timestamp),
      (isNaN(r.Timestamp) ? -1 : r.Timestamp) < t ? e : r)
    : (e ?? r);
}
(exports.getAkiBaseLocalPath = getAkiBaseLocalPath),
  (exports.getAkiBaseProjectPath = getAkiBaseProjectPath),
  (exports.loadEditorSaviorSyncConfig = loadEditorSaviorSyncConfig),
  (exports.getCurrentClientEditorSaviorSyncData =
    getCurrentClientEditorSaviorSyncData),
  (exports.loadUgsSyncConfig = loadUgsSyncConfig),
  (exports.getCurrentSyncData = getCurrentSyncData);
let currentSafeVersion = void 0;
function getLocalSafeVersion() {
  if (void 0 === currentSafeVersion) {
    var t = getCurrentSyncData();
    if (!t)
      return (
        (0, Log_1.warn)(
          "当前未从【编辑器救世主】或【UGS】更新过安全版本，请先拉取安全版本",
        ),
        0
      );
    switch (t.Type) {
      case "EditorSavior":
        currentSafeVersion = t.ChangeNum;
        break;
      case "Ugs":
        currentSafeVersion = t.CurrentChangeNumber;
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
function isVectorEqual(t, e, r = 0, n = 1e-4) {
  return (
    Math.abs((t?.X ?? r) - (e?.X ?? r)) <= n &&
    Math.abs((t?.Y ?? r) - (e?.Y ?? r)) <= n &&
    Math.abs((t?.Z ?? r) - (e?.Z ?? r)) <= n
  );
}
function getVectorDistance(t, e) {
  var r = (t.X ?? 0) - (e.X ?? 0),
    n = (t.Y ?? 0) - (e.Y ?? 0),
    t = (t.Z ?? 0) - (e.Z ?? 0);
  return Math.sqrt(r * r + n * n + t * t);
}
function isVector2Equal(t, e, r = 0, n = 1e-4) {
  return (
    Math.abs((t?.X ?? r) - (e?.X ?? r)) <= n &&
    Math.abs((t?.Y ?? r) - (e?.Y ?? r)) <= n
  );
}
function addVector(t, e) {
  return {
    X: (t?.X ?? 0) + (e?.X ?? 0),
    Y: (t?.Y ?? 0) + (e?.Y ?? 0),
    Z: (t?.Z ?? 0) + (e?.Z ?? 0),
  };
}
function subVector(t, e) {
  return {
    X: (t?.X ?? 0) - (e?.X ?? 0),
    Y: (t?.Y ?? 0) - (e?.Y ?? 0),
    Z: (t?.Z ?? 0) - (e?.Z ?? 0),
  };
}
function isTransformEqual(t, e, r = 1e-4, n = 1e-4, o = 1e-4) {
  var s = { X: 0, Y: 0, Z: 0 },
    a = { X: 1, Y: 1, Z: 1 };
  return (
    isVectorEqual(t.Pos || s, e.Pos || s, 0, r) &&
    isVectorEqual(t.Rot ?? s, e.Rot ?? s, 0, n) &&
    isVectorEqual(t.Scale ?? a, e.Scale ?? a, 1, o)
  );
}
function isSetEqual(t, e) {
  if (t.size !== e.size) return !1;
  for (const r of t) if (!e.has(r)) return !1;
  return !0;
}
function isPortInUse(t) {
  return Recorder_1.perfRecorder.Run(
    () => (0, Platform_1.getPlatform)().IsPortInUse(t),
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
  (exports.isTransformEqual = isTransformEqual),
  (exports.isSetEqual = isSetEqual),
  (exports.isPortInUse = isPortInUse);
let localIp = void 0;
function getLocalIp() {
  var t, e;
  return (
    localIp ||
      (([e, t] = (0, Platform_1.getPlatform)().Exec("ipconfig")),
      e &&
        (e = /IPv4 Address.+?(\d+\.\d+\.\d+\.\d+)/.exec(t)) &&
        (localIp = e[1])),
    localIp
  );
}
function getCommandLine() {
  return (0, Platform_1.getPlatform)().GetCommandLine();
}
function getEditorCommandArgs() {
  var r = getCommandLine();
  if ((r.shift(), 0 === r.length)) return {};
  var n = {},
    o = Object.keys(IEditor_1.defaultEditorArgConfig);
  for (let e = 0; e < r.length; e++) {
    var s = r[e];
    if (s.startsWith("-")) {
      s = s.slice(1);
      let t = "";
      o.includes(s) &&
        (e + 1 < r.length && !r[e + 1].startsWith("-") && ((t = r[e + 1]), e++),
        (n[s] = t));
    }
  }
  return n;
}
function isValidVarName(t) {
  return (
    !(
      16 < t.length ||
      !t[0] ||
      ("0" <= t[0] && t[0] <= "9") ||
      "q_count" === t
    ) && /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(t)
  );
}
function isInPie() {
  return (0, Platform_1.getPlatform)().IsInPie();
}
function isPipelineEnv() {
  return (0, Platform_1.getPlatform)().IsPipelineEnv;
}
function formatDateTime(t, e = "cn") {
  var r = new Date(t),
    n = r.getFullYear(),
    o = 9 < r.getMonth() + 1 ? r.getMonth() + 1 : "0" + (r.getMonth() + 1),
    s = 9 < r.getDate() ? r.getDate() : "0" + r.getDate(),
    a = 9 < r.getHours() ? r.getHours() : "0" + r.getHours(),
    i = 9 < r.getMinutes() ? r.getMinutes() : "0" + r.getMinutes(),
    u = 9 < r.getSeconds() ? r.getSeconds() : "0" + r.getSeconds();
  switch (e) {
    case "cn":
      return (
        n +
        `-${o}-${s}-${"星期" + "日一二三四五六".charAt(r.getDay())} ${a}:${i}:` +
        u
      );
    case "simple":
      return "" + n + o + s + a + i + u;
  }
  throw new Error("formatDateTime: unknown format " + e);
}
function stringIsNullOrEmpty(t) {
  return "string" != typeof t || void 0 === t || 0 === t.length;
}
function getMd5(t) {
  return crypto.MD5(t).toString();
}
function deepCopyData(t) {
  return JSON.parse(JSON.stringify(t));
}
function toDepotPath(t) {
  let e = getCurrentP4Stream(),
    r = getCurrentClientRoot();
  var n;
  if (e && r)
    return (
      (t = (0, File_1.getAbsolutePath)(t)),
      (r = r.replace(/\\/g, "/")).endsWith("/") &&
        !e.endsWith("/") &&
        (e += "/"),
      (n = new RegExp(r, "gi")),
      t.replace(/\\/g, "/").replace(n, e)
    );
}
async function doJsonHttpGet(t, e) {
  var r = await (0, Platform_1.getPlatform)().DoJsonHttpReq("GET", t, e);
  if (200 !== r.Status)
    throw new Error(
      `doJsonHttpGet ${t} ${e} failed, status: ${r.Status}, data: ` + r.Data,
    );
  return r.Data;
}
async function doJsonHttpPost(t, e) {
  var r = await (0, Platform_1.getPlatform)().DoJsonHttpReq("POST", t, e);
  if (201 !== r.Status && 200 !== r.Status)
    throw new Error(
      `doJsonHttpPost ${t} ${e} failed, status: ${r.Status}, data: ` + r.Data,
    );
  return r.Data;
}
async function doJsonHttpDelete(t, e) {
  var r = await (0, Platform_1.getPlatform)().DoJsonHttpReq("DELETE", t, e);
  if (204 !== r.Status)
    throw new Error(
      `doJsonHttpDelete ${t} ${e} failed, status: ${r.Status}, data: ` + r.Data,
    );
  return r.Data;
}
function compareTextOrder(t, e) {
  var r = t.replace(/_[^_]*$/, ""),
    n = e.replace(/_[^_]*$/, "");
  return r !== n
    ? r < n
      ? -1
      : 1
    : (r = t.split("_").pop()) === (n = e.split("_").pop())
      ? 0
      : Number(r) && Number(n)
        ? Number(r) < Number(n)
          ? -1
          : 1
        : r < n
          ? -1
          : 1;
}
function getBranchReqShortPath(t) {
  var e = (0, File_1.getAbsolutePath)(t).replace(/\\/g, "/"),
    r = e.indexOf("Source/");
  if (r < 0)
    (0, Log_1.error)(
      `文件: ${t} 不在分支 Source/ 目录下管理, 请确认是否为分支内文件 `,
    );
  else if (getCurrentP4Stream()) return e.substring(r);
}
function getBranchOriginsDataSync(t) {
  var e = getBranchReqShortPath(t);
  if (e) {
    var [e, r] = exec(
      `curl -X POST http://tools.aki.kuro.com:1025/multibranch/aki/file_origins -H "Content-Type:application/json" -d "{\\"filePath\\":\\"${e}\\"}"`,
    );
    if (e) {
      e = r.indexOf('{"code":');
      if (!(e < 0))
        return {
          Origins: (e = parse(r.substring(e))).data.origins,
          IsInDepot: !e.data.useDefault,
        };
      (0, Log_1.error)(
        `[${t}]获取文件分支信息返回异常: 
` + r,
      );
    } else (0, Log_1.error)("获取文件分支信息失败: " + t);
  }
}
(exports.getLocalIp = getLocalIp),
  (exports.getCommandLine = getCommandLine),
  (exports.getEditorCommandArgs = getEditorCommandArgs),
  (exports.isValidVarName = isValidVarName),
  (exports.isInPie = isInPie),
  (exports.isPipelineEnv = isPipelineEnv),
  (exports.formatDateTime = formatDateTime),
  (exports.stringIsNullOrEmpty = stringIsNullOrEmpty),
  (exports.getMd5 = getMd5),
  (exports.deepCopyData = deepCopyData),
  (exports.toDepotPath = toDepotPath),
  (exports.doJsonHttpGet = doJsonHttpGet),
  (exports.doJsonHttpPost = doJsonHttpPost),
  (exports.doJsonHttpDelete = doJsonHttpDelete),
  (exports.compareTextOrder = compareTextOrder),
  (exports.getBranchReqShortPath = getBranchReqShortPath),
  (exports.getBranchOriginsDataSync = getBranchOriginsDataSync);
let allBranchesFromServer = void 0;
function getAllDepotBranchDataSync() {
  if (allBranchesFromServer) return allBranchesFromServer;
  var [t, e] = exec(
    "curl --request GET --url http://tools.aki.kuro.com:1025/multibranch/aki/branches",
  );
  if (t) {
    var t = e.indexOf('{"code":');
    if (!(t < 0))
      return (
        (t = parse(e.substring(t))),
        (allBranchesFromServer = t.data.map((t) => t.replace("//aki/", "")))
      );
    (0, Log_1.error)(
      `获取所有分支信息返回异常: 
` + e,
    );
  } else (0, Log_1.error)("获取所有分支信息失败");
}
function isCurrentBranchAsset(t) {
  var e,
    t = getBranchOriginsDataSync(t);
  return !!t && ((e = "//aki/" + getWorkspaceBranch()), t.Origins.includes(e));
}
function getFileDepotInfo(t) {
  var e,
    r,
    t = getBranchReqShortPath(t);
  return t
    ? (([r, e] = exec(
        (t = `curl -X POST http://tools.aki.kuro.com:1025/multibranch/aki/file/exist -H "Content-Type:application/json" -d "{\\"filePath\\":\\"${t}}\\""`),
      )),
      r
        ? (r = e.indexOf('{"code":')) < 0
          ? ((0, Log_1.error)(
              `返回信息异常: 
请求: ${t}
回复: ` + e,
            ),
            [])
          : parse(e.substring(r)).data
        : ((0, Log_1.error)("获取分支信息失败: " + t), []))
    : [];
}
async function getFileDepotInfoAsync(t) {
  t = getBranchReqShortPath(t);
  const e = { filePath: t };
  let r = { Success: !1, Error: "获取仓库信息失败" };
  for (
    let t = 0;
    t < 2 &&
    !(r = await (async () => {
      try {
        var t = await doJsonHttpPost(
          "http://tools.aki.kuro.com:1025/multibranch/aki/file/exist",
          e,
        );
        return t
          ? { Success: !0, Result: t.data }
          : {
              Success: !1,
              Error: `获取仓库信息失败: ${t} (${stringify(e)})`,
              Result: [],
            };
      } catch (t) {
        return { Success: !1, Error: "获取仓库信息异常: " + t };
      }
    })()).Result;
    t++
  );
  return r.Error && (0, Log_1.error)(r.Error), r;
}
(exports.getAllDepotBranchDataSync = getAllDepotBranchDataSync),
  (exports.isCurrentBranchAsset = isCurrentBranchAsset),
  (exports.getFileDepotInfo = getFileDepotInfo),
  (exports.getFileDepotInfoAsync = getFileDepotInfoAsync);
let fileOriginRequiredList = void 0;
async function getTextFileOriginRequiredList() {
  var t;
  return (
    fileOriginRequiredList ||
    ((t = await doJsonHttpGet(
      "http://tools.aki.kuro.com:1025/multibranch/aki/originrequiredlist",
    ))
      ? (fileOriginRequiredList = t.data)
      : ((t = "获取分支管理文本文件路径信息失败: " + t),
        void (0, Log_1.error)(t)))
  );
}
function isTextFileByExtension(t) {
  t = t.split(".").pop()?.toLowerCase();
  return !(
    !t ||
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
    ].includes(t)
  );
}
async function isTextFileInOriginRequiredListAsync(t) {
  var e = await getTextFileOriginRequiredList();
  if (e)
    for (const o of e) {
      var r = o.replace(/\./g, "\\.").replace(/\*/g, ".*"),
        r = new RegExp(`(^|\\/|\\\\)${r}$`),
        n = t.replace(/^.*\/Source/, "Source");
      if (r.test(n)) return !0;
    }
  return !1;
}
async function getBatchFileBranchDataAsync(e) {
  const r = getCurrentP4Stream();
  if (!r) return { Success: !1, Error: "获取当前分支失败" };
  var t = new Map(),
    n = [],
    o = new Map(),
    s = new Map();
  for (const l of e) {
    var a,
      i = getBranchReqShortPath(l);
    i &&
      (a = await getFileDepotInfoAsync(i)).Success &&
      (a.Result.findIndex((t) => t.endsWith(r)) < 0
        ? t.set(l, { IsInDepot: !1, Origins: [r] })
        : (s.set(i, a.Result), n.push(i), o.set(i, l)));
  }
  e = { filePaths: n };
  try {
    var u,
      c = await doJsonHttpPost(
        "http://tools.aki.kuro.com:1025/multibranch/aki/file_origins/batch",
        e,
      );
    if (!c)
      return (
        (u = `获取分支信息失败: ${c} (${stringify(e)})`),
        (0, Log_1.error)(u),
        { Success: !1, Error: u }
      );
    for (const [x, g] of Object.entries(c.data)) {
      var p = o.get(x);
      if (
        isTextFileByExtension(p) &&
        !(await isTextFileInOriginRequiredListAsync(p))
      )
        t.set(p, { IsInDepot: !0, Origins: ["//aki/" + getWorkspaceBranch()] });
      else {
        if (g.useDefault) {
          var f = s.get(x) ?? [];
          if (!(0 < f.length)) {
            t.set(p, { IsInDepot: !1, Origins: [r] });
            continue;
          }
          if (f.every((t) => !g.origins.includes(t))) {
            t.set(p, { IsInDepot: !0, Origins: [f[0]] });
            continue;
          }
        }
        t.set(p, { IsInDepot: !0, Origins: g.origins });
      }
    }
    return { Success: !0, Result: t };
  } catch (t) {
    e = "获取分支信息失败: " + t;
    return (0, Log_1.error)(e), { Success: !1, Error: e };
  }
}
async function getFileSourceBranchAsync(t) {
  var e = await getBatchFileBranchDataAsync([t]);
  return e.Success
    ? toDepotPath(t)
      ? { Success: !0, Result: e.Result.get(t) }
      : { Success: !1, Error: "文件路径非法，不是项目内的文件" }
    : { Success: !1, Error: e.Error };
}
async function isCurrentBranchAssetAsync(t) {
  var e = getBranchReqShortPath(t);
  if (!e) return !1;
  var r = getCurrentP4Stream();
  if (!r) return !1;
  e = { filePath: e };
  try {
    var n = await doJsonHttpPost(
      "http://tools.aki.kuro.com:1025/multibranch/aki/file_origins",
      e,
    );
    return n
      ? n.data.origins.includes(r)
      : ((0, Log_1.error)(`获取分支信息失败: ${n} (${t})`), !1);
  } catch (t) {
    e = "获取分支信息失败: " + t;
    return (0, Log_1.error)(e), !1;
  }
}
async function execAsync(t) {
  return await (0, Platform_1.getPlatform)().ExecAsync(t);
}
function touchInstance(t) {
  return t.Instance;
}
function isIpAddress(t) {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    t,
  );
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
  (exports.isIpAddress = isIpAddress);
//# sourceMappingURL=Util.js.map
