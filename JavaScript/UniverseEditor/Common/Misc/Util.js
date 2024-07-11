"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.checkP4Connection =
    exports.upperStringFirstLetter =
    exports.checkMonsterValid =
    exports.getNextPathName =
    exports.getPreName =
    exports.getUniqueName =
    exports.getNextName =
    exports.getNameWithoutIndex =
    exports.killProcess =
    exports.isProcessRunning =
    exports.isProcessRunningInPath =
    exports.getProcessImagePathsByName =
    exports.isRunAsAdmin =
    exports.execAsUser =
    exports.exec =
    exports.getTimeSeconds =
    exports.genGuid =
    exports.getMacAddress =
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
    exports.parseCsvStringArray =
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
    exports.getEnumNames =
    exports.getEnumValues =
      void 0),
  (exports.execAsync =
    exports.isCurrentBranchAssetAsync =
    exports.getFileSourceBranchAsync =
    exports.getBatchFileBranchDataAsync =
    exports.getFileDepotInfoAsync =
    exports.getFileDepotInfo =
    exports.isCurrentBranchAsset =
    exports.getBranchOriginsDataSync =
    exports.getBranchReqShortPath =
    exports.compareTextOrder =
    exports.doJsonHttpDelete =
    exports.doJsonHttpPost =
    exports.doJsonHttpGet =
    exports.toDepotPath =
    exports.deepCopyData =
    exports.getNetWorkAddress =
    exports.stringIsNullOrEmpty =
    exports.formatDateTime =
    exports.isInPie =
    exports.isValidVarName =
    exports.getEditorCommandArgs =
    exports.getCommandLine =
    exports.getLocalIp =
    exports.isPortInUse =
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
    exports.getDevBranchClientName =
    exports.getDevBranchLocalPath =
    exports.getAkiBaseLocalPath =
    exports.getCurrentP4Owner =
    exports.getWorkspaceBranch =
    exports.getCurrentP4Branch =
    exports.getCurrentClientName =
    exports.getCurrentClientRoot =
    exports.getCurrentP4Stream =
      void 0);
const IEditor_1 = require("../../Interface/IEditor"),
  Init_1 = require("../../Interface/Init"),
  IUtil_1 = require("../../Interface/IUtil"),
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
function parseFloatSafe(t) {
  t = parseFloat(t);
  return Number.isNaN(t) ? 0 : t;
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
function parseCsvStringArray(t) {
  return t.substring(1, t.length - 1).split(",");
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
    const a = [];
    for (let t = 0; t < e.length; t++) {
      var o = createMultiData(e[t], n[t], r);
      a.push(o);
    }
    return a;
  }
  const a = {};
  for (const c in t) r?.(c) || (void 0 === e[c] && (a[c] = null));
  for (const p in e) {
    var i, s, u;
    r?.(p) ||
      ((i = t[p]),
      (s = e[p]),
      null === i || null === s
        ? (a[p] = null)
        : void 0 === i
          ? (a[p] = void 0 === s ? void 0 : null)
          : (u = typeof i) == typeof s && "object" == u
            ? ((u = createMultiData(i, s, r)), (a[p] = u))
            : (a[p] = i !== s ? null : i));
  }
  return a;
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
    a,
    i,
    s,
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
      ((a = t[p]),
      (i = r[p]),
      null !== a
        ? (s = typeof a) == typeof i && "object" == s
          ? ((s = applyMultiData(i, a, n)), (u[p] = s))
          : (u[p] = a)
        : (u[p] = i));
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
    for (const a in n) {
      var o = n[a];
      "object" == typeof o ? forEachField(o, e, r) : e(a, o) && r(n, a, o);
    }
  }
}
function getMacAddress() {
  return (0, Platform_1.getPlatform)().GetMacAddress();
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
  var a = n.length;
  for (n = (o + 1).toString(); n.length < a; ) n = "0" + n;
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
  let a = n < e ? n : e,
    i = n < e ? e : n,
    s = o < r ? o : r,
    u = o < r ? r : o,
    c = 2;
  for (c = 2; c < t.length; c++) {
    var p = t[c].X ?? 0,
      f = t[c].Y ?? 0;
    (a = p < a ? p : a),
      (i = p > i ? p : i),
      (s = f < s ? f : s),
      (u = f > u ? f : u);
  }
  return [
    { X: (a + i) / 2, Y: (u + s) / 2, Z: 0 },
    Math.floor(Math.sqrt((i - a) * (i - a) + (u - s) * (u - s))) / 2,
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
  (exports.parseCsvStringArray = parseCsvStringArray),
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
  (exports.getMacAddress = getMacAddress),
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
  return t ? t.substring("//aki/".length) : void 0;
}
function getWorkspaceBranch() {
  return (0, Init_1.getWorkspaceBranchDefine)();
}
function getCurrentP4Owner() {
  return getP4ClientData()?.Owner;
}
(exports.getCurrentP4Stream = getCurrentP4Stream),
  (exports.getCurrentClientRoot = getCurrentClientRoot),
  (exports.getCurrentClientName = getCurrentClientName),
  (exports.getCurrentP4Branch = getCurrentP4Branch),
  (exports.getWorkspaceBranch = getWorkspaceBranch),
  (exports.getCurrentP4Owner = getCurrentP4Owner);
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
exports.getAkiBaseLocalPath = getAkiBaseLocalPath;
let devBranchPath = void 0;
function getDevBranchLocalPath() {
  if (devBranchPath) return devBranchPath;
  var e = getClientDatas();
  if (e) {
    e = e.filter((t) => t.Stream?.startsWith("//aki/development"));
    if (e.length <= 0)
      (0, Log_1.error)("找不到 development 目录, 请先创建 WorkSpace");
    else {
      let t = void 0;
      for (const n of e) {
        var r = n.Root;
        if ((0, File_1.existDir)(r)) {
          t = n;
          break;
        }
      }
      if (t) return (devBranchPath = t.Root);
      (0, Log_1.error)("本地找不到 development 目录, 请先创建 WorkSpace");
    }
  }
}
exports.getDevBranchLocalPath = getDevBranchLocalPath;
let devBranchClientName = void 0;
function getDevBranchClientName() {
  if (devBranchClientName) return devBranchClientName;
  var e = getClientDatas();
  if (e) {
    e = e.filter((t) => t.Stream?.startsWith("//aki/development"));
    if (e.length <= 0)
      (0, Log_1.error)("找不到 development 目录, 请先创建 WorkSpace");
    else {
      let t = void 0;
      for (const n of e) {
        var r = n.Root;
        if ((0, File_1.existDir)(r)) {
          t = n;
          break;
        }
      }
      if (t) return (devBranchClientName = t.Client);
      (0, Log_1.error)("本地找不到 development 目录, 请先创建 WorkSpace");
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
    : e ?? r;
}
(exports.getDevBranchClientName = getDevBranchClientName),
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
  var a = { X: 0, Y: 0, Z: 0 },
    i = { X: 1, Y: 1, Z: 1 };
  return (
    isVectorEqual(t.Pos || a, e.Pos || a, 0, r) &&
    isVectorEqual(t.Rot ?? a, e.Rot ?? a, 0, n) &&
    isVectorEqual(t.Scale ?? i, e.Scale ?? i, 1, o)
  );
}
function isPortInUse(t) {
  return (0, Platform_1.getPlatform)().IsPortInUse(t);
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
    var a = r[e];
    if (a.startsWith("-")) {
      a = a.slice(1);
      let t = "";
      o.includes(a) &&
        (e + 1 < r.length && !r[e + 1].startsWith("-") && ((t = r[e + 1]), e++),
        (n[a] = t));
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
function formatDateTime(t) {
  var t = new Date(t),
    e = t.getFullYear(),
    r = 9 < t.getMonth() + 1 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1),
    n = 9 < t.getDate() ? t.getDate() : "0" + t.getDate(),
    o = 9 < t.getHours() ? t.getHours() : "0" + t.getHours(),
    a = 9 < t.getMinutes() ? t.getMinutes() : "0" + t.getMinutes(),
    i = 9 < t.getSeconds() ? t.getSeconds() : "0" + t.getSeconds();
  return (
    e +
    `-${r}-${n}-${"星期" + "日一二三四五六".charAt(t.getDay())} ${o}:${a}:` +
    i
  );
}
function stringIsNullOrEmpty(t) {
  return "string" != typeof t || void 0 === t || 0 === t.length;
}
function getNetWorkAddress() {
  var [t, e] = exec(
    `wmic path Win32_NetworkAdapter where "PNPDeviceID like '%PCI%' AND AdapterTypeID='0'" get name, MacAddress`,
  );
  if (t && e)
    return (
      (t = e
        .split(
          `

`,
        )[1]
        .split(" ")[0]
        .split(":"))[0] +
      t[1] +
      t[2] +
      t[3] +
      t[4] +
      t[5]
    );
}
function deepCopyData(t) {
  return JSON.parse(JSON.stringify(t));
}
function toDepotPath(t) {
  var e = getCurrentP4Stream(),
    r = getCurrentClientRoot();
  if (e && r)
    return (
      (t = (0, File_1.getAbsolutePath)(t)),
      (r = new RegExp(r.replace(/\\/g, "/"), "gi")),
      t.replace(/\\/g, "/").replace(r, e)
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
          IsManageByBranch: !e.data.useDefault,
        };
      (0, Log_1.error)(
        `[${t}]获取文件分支信息返回异常: 
` + r,
      );
    } else (0, Log_1.error)("获取文件分支信息失败: " + t);
  }
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
  const r = { filePath: t };
  let e = { Success: !1, Error: "获取仓库信息失败" };
  for (let t = 0; t < 2; t++)
    if (
      (e = await (async () => {
        try {
          var t,
            e = await doJsonHttpPost(
              "http://tools.aki.kuro.com:1025/multibranch/aki/file/exist",
              r,
            );
          return e
            ? { Success: !0, Result: e.data }
            : ((t = `获取仓库信息失败: ${e} (${stringify(r)})`),
              (0, Log_1.error)(t),
              { Success: !1, Error: t, Result: [] });
        } catch (t) {
          e = "获取仓库信息失败: " + t;
          return (0, Log_1.error)(e), { Success: !1, Error: e };
        }
      })()).Result
    )
      return e;
  return e;
}
async function getBatchFileBranchDataAsync(e) {
  const r = getCurrentP4Stream();
  if (!r) return { Success: !1, Error: "获取当前分支失败" };
  var t = [],
    n = new Map(),
    o = new Map();
  for (const l of e) {
    var a,
      i = getBranchReqShortPath(l);
    i &&
      (a = await getFileDepotInfoAsync(i)).Success &&
      -1 !== a.Result.findIndex((t) => t.endsWith(r)) &&
      (o.set(i, a.Result), t.push(i), n.set(i, l));
  }
  var s = new Map(),
    e = { filePaths: t };
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
      var p = n.get(x);
      if (g.useDefault) {
        var f = o.get(x) ?? [];
        if (!(0 < f.length)) {
          s.set(p, { IsManageByBranch: !1, Origins: [r] });
          continue;
        }
        if (f.every((t) => !g.origins.includes(t))) {
          s.set(p, { IsManageByBranch: !0, Origins: [f[0]] });
          continue;
        }
      }
      s.set(p, { IsManageByBranch: !0, Origins: g.origins });
    }
    return { Success: !0, Result: s };
  } catch (t) {
    e = "获取分支信息失败: " + t;
    return (0, Log_1.error)(e), { Success: !1, Error: e };
  }
}
async function getFileSourceBranchAsync(t) {
  var e = await getBatchFileBranchDataAsync([t]);
  return e.Success
    ? { Success: !0, Result: e.Result.get(t) }
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
(exports.getLocalIp = getLocalIp),
  (exports.getCommandLine = getCommandLine),
  (exports.getEditorCommandArgs = getEditorCommandArgs),
  (exports.isValidVarName = isValidVarName),
  (exports.isInPie = isInPie),
  (exports.formatDateTime = formatDateTime),
  (exports.stringIsNullOrEmpty = stringIsNullOrEmpty),
  (exports.getNetWorkAddress = getNetWorkAddress),
  (exports.deepCopyData = deepCopyData),
  (exports.toDepotPath = toDepotPath),
  (exports.doJsonHttpGet = doJsonHttpGet),
  (exports.doJsonHttpPost = doJsonHttpPost),
  (exports.doJsonHttpDelete = doJsonHttpDelete),
  (exports.compareTextOrder = compareTextOrder),
  (exports.getBranchReqShortPath = getBranchReqShortPath),
  (exports.getBranchOriginsDataSync = getBranchOriginsDataSync),
  (exports.isCurrentBranchAsset = isCurrentBranchAsset),
  (exports.getFileDepotInfo = getFileDepotInfo),
  (exports.getFileDepotInfoAsync = getFileDepotInfoAsync),
  (exports.getBatchFileBranchDataAsync = getBatchFileBranchDataAsync),
  (exports.getFileSourceBranchAsync = getFileSourceBranchAsync),
  (exports.isCurrentBranchAssetAsync = isCurrentBranchAssetAsync),
  (exports.execAsync = execAsync);
//# sourceMappingURL=Util.js.map
