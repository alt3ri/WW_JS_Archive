"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.platformUe = exports.PlatformUe = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Unreal/Util"),
  Interface_1 = require("./Interface"),
  REDIRECTOR_FILE_SIZE = 5120;
class PlatformUe extends Interface_1.Platform {
  constructor() {
    super(...arguments),
      (this.wx_ = new Map()),
      (this.Rx_ = new Map()),
      (this.Be = () => {});
  }
  ReadFile(e) {
    var t = (0, puerts_1.$ref)("");
    return (
      ue_1.KuroStaticLibrary.LoadFileToString(t, e), (0, puerts_1.$unref)(t)
    );
  }
  async ReadFileAsync(t) {
    return new Promise((r, e) => {
      const s = (e, t) => {
        (0, puerts_1.releaseManualReleaseDelegate)(s),
          r({ IsSuccess: e, FileContent: t });
      };
      ue_1.EditorRuntimeOperations.ReadFileAsync(
        t,
        (0, puerts_1.toManualReleaseDelegate)(s),
      );
    });
  }
  async ReadBatchFilesAsync(t) {
    return new Promise((s, e) => {
      const u = (t, e) => {
        (0, puerts_1.releaseManualReleaseDelegate)(u);
        var r = new Map();
        for (let e = 0; e < t.Num(); e++)
          r.set(t.Get(e).FilePath, t.Get(e).FileContent);
        s({ FileMap: r, FailedFiles: (0, Util_1.toTsArray)(e) });
      };
      ue_1.EditorRuntimeOperations.ReadBatchFilesAsync(
        (0, Util_1.toUeArray)(t, ue_1.BuiltinString),
        (0, puerts_1.toManualReleaseDelegate)(u),
      );
    });
  }
  WriteFile(e, t) {
    ue_1.KuroStaticLibrary.SaveStringToFile(t, e);
  }
  RemoveFile(e) {
    return ue_1.MyFileHelper.Remove(e);
  }
  RemoveDir(e) {
    this.Exec(`rd /s /q "${e}"`);
  }
  ExistFile(e) {
    return ue_1.MyFileHelper.Exist(e);
  }
  ExistDir(e) {
    return ue_1.MyFileHelper.ExistDir(e);
  }
  CreateDir(e) {
    var t = e.split("/");
    let r = t[0];
    for (let e = 1; e < t.length; e++)
      if (((r = r + "/" + t[e]), !ue_1.MyFileHelper.CreateDir(r)))
        return this.Log(2, `Create dir: [${r}] failed`), !1;
    return !0;
  }
  GetProjectPath(e) {
    return "" + ue_1.KismetSystemLibrary.GetProjectDirectory() + e;
  }
  GetSavePath(e) {
    return "" + ue_1.KismetSystemLibrary.GetProjectSavedDirectory() + e;
  }
  GetUserDirPath(e) {
    return (
      this.GetAbsolutePath(
        ue_1.KismetSystemLibrary.GetPlatformUserDir() + "..",
      ) +
      "/" +
      e
    );
  }
  ListFiles(e, t, r) {
    var s = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.BuiltinString));
    return (
      void 0 === t && (t = ""),
      r
        ? ue_1.MyFileHelper.FindFilesRecursively(s, e, t)
        : ue_1.MyFileHelper.FindFiles(s, e, t),
      (0, Util_1.toTsArray)((0, puerts_1.$unref)(s))
    );
  }
  ListDirs(e, t) {
    var r = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.BuiltinString));
    return (
      t
        ? ue_1.MyFileHelper.FindDirsRecursively(r, e)
        : ue_1.MyFileHelper.FindDirs(r, e),
      (0, Util_1.toTsArray)((0, puerts_1.$unref)(r))
    );
  }
  GetRelativePathToDir(e, t) {
    return t.endsWith("/")
      ? ue_1.MyFileHelper.GetPathRelativeTo(e, t)
      : ue_1.MyFileHelper.GetPathRelativeTo(e, t + "/");
  }
  GetAbsolutePath(e) {
    return ue_1.MyFileHelper.GetAbsolutePath(e);
  }
  GetFileModifyTick(e) {
    return ue_1.MyFileHelper.GetFileModifyTick(e);
  }
  Log(e, t) {
    switch (e) {
      case 0:
        this.LogLevel <= 0 && ue_1.MyLog?.Log(t);
        break;
      case 1:
        this.LogLevel <= 1 && ue_1.MyLog?.Warn(t);
        break;
      case 2:
        this.LogLevel <= 2 && (ue_1.MyLog?.Error(t), this.Be(t));
    }
  }
  SetErrorReportFun(e) {
    this.Be = e;
  }
  Exec(e, t) {
    e.includes("\\") && (e = e.split("\\").join("\\\\"));
    var r = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry)),
      s = (0, puerts_1.$ref)("");
    let u = "";
    (u = (
      t
        ? ["import os", `os.system('''${e}''')`]
        : [
            "import subprocess",
            `ret, output = subprocess.getstatusoutput('''${e}''')`,
            "print(output)",
            "if ret != 0:",
            `	raise Exception('ret != 0')`,
          ]
    ).join("\n")),
      (0, Log_1.log)("Exec: " + e);
    (t = ue_1.PythonScriptLibrary.ExecutePythonCommandEx(u, s, r)),
      (e = (0, puerts_1.$unref)(r));
    let o = (0, puerts_1.$unref)(s);
    return [
      t,
      (o = !(o = "None" === o ? "" : o) && 0 < e.Num() ? e.Get(0).Output : o),
    ];
  }
  GetMacAddress() {
    return ue_1.EditorOperations.GetMacAddress().toUpperCase();
  }
  GetPhysicMacAddress() {
    var e = ue_1.EditorOperations.GetPhysicalMacAddresses();
    return 0 === e.Num() ? "" : e.Get(0).toUpperCase();
  }
  GetPlatformType() {
    return 0;
  }
  ReadUassetInfo(e) {
    return e.endsWith(".uasset") &&
      this.ExistFile(e) &&
      (e = ue_1.MyFileHelper.ReadUassetInfo(e)) &&
      "" !== e
      ? e
      : "";
  }
  ConvertExcelToCsv(e, t, r, s) {
    var u;
    return (
      !!this.ExistFile(e) &&
      ((u = this.GetProjectPath(
        "../Config/Tool/UniverseEditorTool/ExcelConverter/main.exe",
      )),
      this.ExistFile(u)
        ? ((s = void 0 === s ? -1 : s),
          (t = [
            "import subprocess",
            `args = "${u} ${e} ${t} ${(e = r.includes("|")) ? r.replace(/\|/g, ",") : r} ${e} ${s}"`,
            `subp = subprocess.Popen(args, stdin=subprocess.PIPE,
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True, shell=True)`,
            "print(subp.communicate()[0])",
          ].join("\r\n")),
          (r = (0, puerts_1.$ref)(
            (0, ue_1.NewArray)(ue_1.PythonLogOutputEntry),
          )),
          (0, Log_1.log)("ExecutePythonCommandEx: " + t),
          ue_1.PythonScriptLibrary.ExecutePythonCommandEx(t, void 0, r),
          0 !== (e = (0, puerts_1.$unref)(r)).Num() &&
            "false" !== e.Get(0).Output.replace(/\r\n/g, "\n").split("\n")[0])
        : ((0, Log_1.error)("ExcelConverter not exist: " + u), !1))
    );
  }
  CheckFileIsInUse(e) {
    var e = [
        "try:",
        `   fd = open('${e}', "r+")`,
        "   fd.close()",
        '   print("false")',
        "except:",
        '   print("true")',
      ].join("\n"),
      t = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry)),
      e =
        ((0, Log_1.log)("ExecutePythonCommandEx: " + e),
        ue_1.PythonScriptLibrary.ExecutePythonCommandEx(e, void 0, t),
        (0, puerts_1.$unref)(t));
    return 0 !== e.Num() && "true" === e.Get(0).Output;
  }
  IsPortInUse(e) {
    return ue_1.EditorRuntimeOperations.IsPortInUse(e);
  }
  GetCommandLine() {
    return ue_1.KismetSystemLibrary.GetCommandLine().split(" ");
  }
  IsInPie() {
    return ue_1.EditorOperations.IsInPie();
  }
  CopyDir(e, t, r) {
    this.Exec(`robocopy "${e}" "${t}" /MIR`);
  }
  CopyFile(e, t) {
    this.Exec(`echo F | xcopy "${e}" "${t}" /F /Y`);
  }
  async DoJsonHttpReq(e, t, r) {
    const n = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
    for (const s of Object.entries({ "Content-Type": "application/json" }))
      n.Add(s[0], s[1]);
    return new Promise((s, u) => {
      const o = (e, t, r) => {
        (0, puerts_1.releaseManualReleaseDelegate)(o),
          e
            ? s({ Status: t, Data: r ? JSON.parse(r) : void 0 })
            : u(new Error(`Http request failed, code: ${t}, response: ` + r));
      };
      ue_1.EditorRuntimeOperations.SendHttpRequest(
        e,
        t,
        n,
        r ? JSON.stringify(r) : "",
        (0, puerts_1.toManualReleaseDelegate)(o),
      );
    });
  }
  GetProcessImagePathsByName(e) {
    var t = ue_1.KuroProcessUtils.GetProcessImagePathsByName(e),
      r = [];
    for (let e = 0; e < t.Num(); e++) r.push(t.Get(e));
    return r;
  }
  GetProcessPathAndCommandLine(e) {
    var t = ue_1.KuroProcessUtils.GetProcessPathAndCommandLine(e),
      r = [];
    for (let e = 0; e < t.Num(); e += 2)
      r.push({ Path: t.Get(e), CommandLine: t.Get(e + 1) });
    return r;
  }
  GetProcessImagePathsByPort(e) {
    var t = ue_1.KuroProcessUtils.GetProcessImagePathsByPort(e),
      r = [];
    for (let e = 0; e < t.Num(); e++) r.push(t.Get(e));
    return r;
  }
  async ExecAsync(e) {
    throw new Error("Method not implemented.");
  }
  IsAssetRedirector(e) {
    let t = this.wx_.get(e) ?? e;
    if (
      (t.startsWith("/Game/") &&
        ((t = ue_1.MyFileHelper.ConvertGamePathToDiskPath(e)),
        this.wx_.set(e, t)),
      this.Rx_.has(t))
    )
      return !!this.Rx_.get(t);
    var r = ue_1.MyFileHelper.GetFileSizeInBytes(t);
    if (r <= 0 || r > REDIRECTOR_FILE_SIZE) return this.Rx_.set(t, !1), !1;
    let s = e;
    s.startsWith("/Game/") ||
      (s = ue_1.MyFileHelper.ConvertDiskPathToGamePath(e));
    r = ue_1.EditorOperations.IsAssetRedirector(s);
    return this.Rx_.set(t, r), r;
  }
}
(exports.PlatformUe = PlatformUe), (exports.platformUe = new PlatformUe());
//# sourceMappingURL=PlatformUe.js.map
