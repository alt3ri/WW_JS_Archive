"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformRuntime = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Platform_1 = require("./Platform");
class PlatformRuntime extends Platform_1.Platform {
  ReadFile(e) {
    const t = (0, puerts_1.$ref)("");
    return UE.KuroStaticLibrary.LoadFileToString(t, e), (0, puerts_1.$unref)(t);
  }
  WriteFile(e, t) {
    UE.KuroStaticLibrary.SaveStringToFile(t, e);
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
  ListFiles(e, t, r) {
    let o = void 0;
    if (
      (o = r
        ? ((r = (t = t?.startsWith(".") ? t.substring(1) : t) ? "*." + t : "*"),
          UE.KuroStaticLibrary.GetFilesRecursive(e, r, !0, !1))
        : (void 0 === t && (t = ""), UE.KuroStaticLibrary.GetFiles(e, t)))
    ) {
      const n = [];
      for (let e = 0; e < o.Num(); e++) n.push(o.Get(e));
      return n;
    }
    return [];
  }
  ListDirs(e, t) {
    const r = [];
    const o = UE.KuroStaticLibrary.GetDirectories(e);
    for (let e = 0; e < o.Num(); e++) {
      let n = o.Get(e);
      r.push(n), t && ((n = this.ListDirs(n, t)), r.push(...n));
    }
    return r;
  }
  GetRelativePathToDir(e, t) {
    var t = t.endsWith("/") ? t : t + "/";
    const r = (0, puerts_1.$ref)("");
    return (
      UE.BlueprintPathsLibrary.MakePathRelativeTo(e, t, r),
      (0, puerts_1.$unref)(r)
    );
  }
  GetAbsolutePath(e) {
    return UE.KismetSystemLibrary.ConvertToAbsolutePath(e);
  }
  CopyDir(e, t, r) {
    for (const n of this.ListFiles(e, void 0, !0)) {
      const o = this.GetRelativePathToDir(n, e);
      this.CopyFile(n, t + "/" + o);
    }
  }
  CopyFile(e, t) {
    var r = t.replace(/\\/g, "/");
    const o = r.lastIndexOf("/");
    var r = r.substring(0, o);
    this.ExistDir(r) || this.CreateDir(r), UE.KuroStaticLibrary.CopyFile(e, t);
  }
  GetFileModifyTick(e) {
    throw new Error("Method not implemented.");
  }
  ReadUassetInfo(e) {
    throw new Error("Method not implemented.");
  }
  Log(e, t) {
    switch (e) {
      case 0:
        this.LogLevel <= 0 && puerts_1.logger.log(t);
        break;
      case 1:
        this.LogLevel <= 1 && puerts_1.logger.warn(t);
        break;
      case 2:
        this.LogLevel <= 2 && puerts_1.logger.error(t);
    }
  }
  SetErrorReportFun(e) {
    throw new Error("Method not implemented.");
  }
  Exec(e, t) {
    throw new Error("Method not implemented.");
  }
  GetMacAddress() {
    throw new Error("Method not implemented.");
  }
  GetPlatformType() {
    return 2;
  }
  ConvertExcelToCsv(e, t, r, o) {
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
  async DoJsonHttpReq(e, t, r) {
    const i = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
    for (const o of Object.entries({ "Content-Type": "application/json" }))
      i.Add(o[0], o[1]);
    return new Promise((o, n) => {
      const s = (e, t, r) => {
        (0, puerts_1.releaseManualReleaseDelegate)(s),
          e
            ? o({ Status: t, Data: r ? JSON.parse(r) : void 0 })
            : n(new Error(`Http request failed, code: ${t}, response: ` + r));
      };
      UE.EditorRuntimeOperations.SendHttpRequest(
        e,
        t,
        i,
        r ? JSON.stringify(r) : "",
        (0, puerts_1.toManualReleaseDelegate)(s),
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
exports.PlatformRuntime = PlatformRuntime;
// # sourceMappingURL=PlatformRuntime.js.map
