"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.platformRuntime = exports.PlatformRuntime = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Interface_1 = require("./Interface");
class PlatformRuntime extends Interface_1.Platform {
  ReadFile(e) {
    var r = (0, puerts_1.$ref)("");
    return UE.KuroStaticLibrary.LoadFileToString(r, e), (0, puerts_1.$unref)(r);
  }
  OUa(e, r) {
    const t = UE.NewArray(r);
    return (
      e.forEach((e) => {
        t.Add(e);
      }),
      t
    );
  }
  kUa(r) {
    var t = [];
    for (let e = 0; e < r.Num(); e++) t.push(r.Get(e));
    return t;
  }
  async ReadFileAsync(r) {
    return new Promise((t, e) => {
      const o = (e, r) => {
        (0, puerts_1.releaseManualReleaseDelegate)(o),
          t({ IsSuccess: e, FileContent: r });
      };
      UE.EditorRuntimeOperations.ReadFileAsync(
        r,
        (0, puerts_1.toManualReleaseDelegate)(o),
      );
    });
  }
  async ReadBatchFilesAsync(r) {
    return new Promise((o, e) => {
      const s = (r, e) => {
        (0, puerts_1.releaseManualReleaseDelegate)(s);
        var t = new Map();
        for (let e = 0; e < r.Num(); e++)
          t.set(r.Get(e).FilePath, r.Get(e).FileContent);
        o({ FileMap: t, FailedFiles: this.kUa(e) });
      };
      UE.EditorRuntimeOperations.ReadBatchFilesAsync(
        this.OUa(r, UE.BuiltinString),
        (0, puerts_1.toManualReleaseDelegate)(s),
      );
    });
  }
  WriteFile(e, r) {
    UE.KuroStaticLibrary.SaveStringToFile(r, e);
  }
  ExistFile(e) {
    return UE.BlueprintPathsLibrary.FileExists(e);
  }
  ExistDir(e) {
    return UE.BlueprintPathsLibrary.DirectoryExists(e);
  }
  CreateDir(e) {
    return UE.KuroStaticLibrary.MakeDirectory(e, !0);
  }
  RemoveFile(e) {
    return UE.KuroStaticLibrary.DeleteFile(e);
  }
  RemoveDir(e) {
    UE.KuroStaticLibrary.DeleteFolder(e, !1, !0);
  }
  GetProjectPath(e) {
    return "" + UE.KismetSystemLibrary.GetProjectDirectory() + e;
  }
  GetSavePath(e) {
    return "" + UE.KismetSystemLibrary.GetProjectSavedDirectory() + e;
  }
  GetUserDirPath(e) {
    return (
      this.GetAbsolutePath(UE.KismetSystemLibrary.GetPlatformUserDir() + "..") +
      "/" +
      e
    );
  }
  ListFiles(e, r, t) {
    let o = void 0;
    if (
      (o = t
        ? ((t = (r = r?.startsWith(".") ? r.substring(1) : r) ? "*." + r : "*"),
          UE.KuroStaticLibrary.GetFilesRecursive(e, t, !0, !1))
        : (void 0 === r && (r = ""), UE.KuroStaticLibrary.GetFiles(e, r)))
    ) {
      var s = [];
      for (let e = 0; e < o.Num(); e++) s.push(o.Get(e));
      return s;
    }
    return [];
  }
  ListDirs(e, r) {
    var t = [],
      o = UE.KuroStaticLibrary.GetDirectories(e);
    for (let e = 0; e < o.Num(); e++) {
      var s = o.Get(e);
      t.push(s), r && ((s = this.ListDirs(s, r)), t.push(...s));
    }
    return t;
  }
  GetRelativePathToDir(e, r) {
    var r = r.endsWith("/") ? r : r + "/",
      t = (0, puerts_1.$ref)("");
    return (
      UE.BlueprintPathsLibrary.MakePathRelativeTo(e, r, t),
      (0, puerts_1.$unref)(t)
    );
  }
  GetAbsolutePath(e) {
    return UE.KismetSystemLibrary.ConvertToAbsolutePath(e);
  }
  CopyDir(e, r, t) {
    for (const s of this.ListFiles(e, void 0, !0)) {
      var o = this.GetRelativePathToDir(s, e);
      this.CopyFile(s, r + "/" + o);
    }
  }
  CopyFile(e, r) {
    var t = r.replace(/\\/g, "/"),
      o = t.lastIndexOf("/"),
      t = t.substring(0, o);
    this.ExistDir(t) || this.CreateDir(t), UE.KuroStaticLibrary.CopyFile(e, r);
  }
  GetFileModifyTick(e) {
    throw new Error("Method not implemented.");
  }
  ReadUassetInfo(e) {
    throw new Error("Method not implemented.");
  }
  Log(e, r) {
    switch (e) {
      case 0:
        this.LogLevel <= 0 && puerts_1.logger.log(r);
        break;
      case 1:
        this.LogLevel <= 1 && puerts_1.logger.warn(r);
        break;
      case 2:
        this.LogLevel <= 2 && puerts_1.logger.error(r);
    }
  }
  SetErrorReportFun(e) {
    throw new Error("Method not implemented.");
  }
  Exec(e, r) {
    throw new Error("Method not implemented.");
  }
  GetMacAddress() {
    throw new Error("Method not implemented.");
  }
  GetPhysicMacAddress() {
    throw new Error("Method not implemented.");
  }
  GetPlatformType() {
    return 2;
  }
  ConvertExcelToCsv(e, r, t, o) {
    throw new Error("Method not implemented.");
  }
  CheckFileIsInUse(e) {
    throw new Error("Method not implemented.");
  }
  IsPortInUse(e) {
    return UE.EditorRuntimeOperations.IsPortInUse(e);
  }
  GetCommandLine() {
    return UE.KismetSystemLibrary.GetCommandLine().split(" ");
  }
  IsInPie() {
    return !1;
  }
  async DoJsonHttpReq(e, r, t) {
    const i = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
    for (const o of Object.entries({ "Content-Type": "application/json" }))
      i.Add(o[0], o[1]);
    return new Promise((o, s) => {
      const n = (e, r, t) => {
        (0, puerts_1.releaseManualReleaseDelegate)(n),
          e
            ? o({ Status: r, Data: t ? JSON.parse(t) : void 0 })
            : s(new Error(`Http request failed, code: ${r}, response: ` + t));
      };
      UE.EditorRuntimeOperations.SendHttpRequest(
        e,
        r,
        i,
        t ? JSON.stringify(t) : "",
        (0, puerts_1.toManualReleaseDelegate)(n),
      );
    });
  }
  GetProcessImagePathsByName(e) {
    return [];
  }
  async ExecAsync(e) {
    throw new Error("Method not implemented.");
  }
}
(exports.PlatformRuntime = PlatformRuntime),
  (exports.platformRuntime = new PlatformRuntime());
//# sourceMappingURL=PlatformRuntime.js.map
