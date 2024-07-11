"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.copyFile =
    exports.copyDir =
    exports.checkFileIsInUse =
    exports.convertExcelToCsv =
    exports.getJsRoot =
    exports.checkNeedUpdateByModifyTime =
    exports.readUassetInfo =
    exports.getRelativePathToDir =
    exports.joinPath =
    exports.getAbsolutePath =
    exports.removeFile =
    exports.getFileModifyTick =
    exports.listDirs =
    exports.listFiles =
    exports.rmDir =
    exports.existDir =
    exports.createDir =
    exports.existFile =
    exports.writeFile =
    exports.readFile =
    exports.getUserDirPath =
    exports.getSavePath =
    exports.getTsRoot =
    exports.getProjectPath =
    exports.getFileNameWithOutExt =
    exports.removeExtension =
    exports.getDir =
    exports.getDirName =
    exports.coverFullPathToName =
    exports.getFileExt =
    exports.getFileName =
      void 0);
const Init_1 = require("../../Interface/Init"),
  Platform_1 = require("../Platform/Platform");
function getFileName(t) {
  return t.replace(/^.*[\\\/]/, "");
}
function getFileExt(t) {
  var e = t.lastIndexOf(".");
  return 0 < e ? t.substring(e + 1) : void 0;
}
function coverFullPathToName(t) {
  return t.split(/:|\.|\\|\//g).join("_");
}
function getDirName(t) {
  let e = t.lastIndexOf("/");
  return -1 === e
    ? ""
    : (e === t.length - 1 && (e = t.slice(0, -1).lastIndexOf("/")),
      t.slice(e + 1).replace("/", ""));
}
function getDir(t) {
  let e = t.lastIndexOf("/");
  return -1 === (e = -1 === e ? t.lastIndexOf("\\") : e) ? "" : t.slice(0, e);
}
function removeExtension(t) {
  var e = t.lastIndexOf(".");
  return -1 === e ? t : t.slice(0, e);
}
function getFileNameWithOutExt(t) {
  return removeExtension(getFileName(t));
}
function getProjectPath(t) {
  return (0, Platform_1.getPlatform)().GetProjectPath(t ?? "");
}
function getTsRoot() {
  return getProjectPath("TypeScript");
}
function getSavePath(t) {
  return (0, Platform_1.getPlatform)().GetSavePath(t ?? "");
}
function getUserDirPath(t) {
  return (0, Platform_1.getPlatform)().GetUserDirPath(t ?? "");
}
function readFile(t) {
  return (0, Platform_1.getPlatform)().ReadFile(t);
}
function writeFile(t, e) {
  (0, Platform_1.getPlatform)().WriteFile(t, e);
}
function existFile(t) {
  return (0, Platform_1.getPlatform)().ExistFile(t);
}
function createDir(t) {
  return (0, Platform_1.getPlatform)().CreateDir(t);
}
function existDir(t) {
  return (0, Platform_1.getPlatform)().ExistDir(t);
}
function rmDir(t) {
  return (
    !existDir(t) || ((0, Platform_1.getPlatform)().RemoveDir(t), !existDir(t))
  );
}
function listFiles(t, e, r) {
  return (0, Platform_1.getPlatform)().ListFiles(t, e, r);
}
function listDirs(t, e) {
  return (0, Platform_1.getPlatform)().ListDirs(t, e);
}
function getFileModifyTick(t) {
  return (0, Platform_1.getPlatform)().GetFileModifyTick(t);
}
function removeFile(t) {
  return (0, Platform_1.getPlatform)().RemoveFile(t);
}
function getAbsolutePath(t) {
  return (0, Platform_1.getPlatform)().GetAbsolutePath(t);
}
function joinPath(...t) {
  return getAbsolutePath(t.join("/"));
}
function getRelativePathToDir(t, e) {
  return (0, Platform_1.getPlatform)().GetRelativePathToDir(t, e);
}
function readUassetInfo(t) {
  return (0, Platform_1.getPlatform)().ReadUassetInfo(t);
}
function checkNeedUpdateByModifyTime(t, e) {
  return (
    !existFile(e) || ((t = getFileModifyTick(t)), getFileModifyTick(e) < t)
  );
}
function readJsRootNameFromIni() {
  var t = readFile(getProjectPath("Config/DefaultPuertsJsEnv.ini"));
  return t
    ? t.includes("Aki/JavaScript_Raw")
      ? "JavaScript_Raw"
      : "JavaScript"
    : "";
}
(exports.getFileName = getFileName),
  (exports.getFileExt = getFileExt),
  (exports.coverFullPathToName = coverFullPathToName),
  (exports.getDirName = getDirName),
  (exports.getDir = getDir),
  (exports.removeExtension = removeExtension),
  (exports.getFileNameWithOutExt = getFileNameWithOutExt),
  (exports.getProjectPath = getProjectPath),
  (exports.getTsRoot = getTsRoot),
  (exports.getSavePath = getSavePath),
  (exports.getUserDirPath = getUserDirPath),
  (exports.readFile = readFile),
  (exports.writeFile = writeFile),
  (exports.existFile = existFile),
  (exports.createDir = createDir),
  (exports.existDir = existDir),
  (exports.rmDir = rmDir),
  (exports.listFiles = listFiles),
  (exports.listDirs = listDirs),
  (exports.getFileModifyTick = getFileModifyTick),
  (exports.removeFile = removeFile),
  (exports.getAbsolutePath = getAbsolutePath),
  (exports.joinPath = joinPath),
  (exports.getRelativePathToDir = getRelativePathToDir),
  (exports.readUassetInfo = readUassetInfo),
  (exports.checkNeedUpdateByModifyTime = checkNeedUpdateByModifyTime);
let jsRootNameInIni = void 0;
function getJsRootNameInIni() {
  return (jsRootNameInIni =
    void 0 === jsRootNameInIni ? readJsRootNameFromIni() : jsRootNameInIni);
}
function getJsRoot() {
  return (0, Init_1.isUe5)()
    ? getProjectPath("Content/JavaScript/UniverseEditor")
    : 2 === (0, Platform_1.getPlatform)().GetPlatformType()
      ? getProjectPath("Content/Aki/JavaScript/UniverseEditor")
      : getProjectPath(`Content/Aki/${getJsRootNameInIni()}/UniverseEditor`);
}
function convertExcelToCsv(t, e, r, o) {
  return (0, Platform_1.getPlatform)().ConvertExcelToCsv(t, e, r, o);
}
function checkFileIsInUse(t) {
  return (0, Platform_1.getPlatform)().CheckFileIsInUse(t);
}
function copyDir(t, e, r) {
  existDir(t) && (0, Platform_1.getPlatform)().CopyDir(t, e, r);
}
function copyFile(t, e) {
  existFile(t) && (0, Platform_1.getPlatform)().CopyFile(t, e);
}
(exports.getJsRoot = getJsRoot),
  (exports.convertExcelToCsv = convertExcelToCsv),
  (exports.checkFileIsInUse = checkFileIsInUse),
  (exports.copyDir = copyDir),
  (exports.copyFile = copyFile);
//# sourceMappingURL=File.js.map
