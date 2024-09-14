"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.platformUe = exports.PlatformUe = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Unreal/Util"),
  Interface_1 = require("./Interface");
class PlatformUe extends Interface_1.Platform {
  constructor() {
    super(...arguments), (this.Be = () => {});
  }
  ReadFile(e) {
    var r = (0, puerts_1.$ref)("");
    return (
      ue_1.KuroStaticLibrary.LoadFileToString(r, e), (0, puerts_1.$unref)(r)
    );
  }
  async ReadFileAsync(r) {
    return new Promise((t, e) => {
      const s = (e, r) => {
        (0, puerts_1.releaseManualReleaseDelegate)(s),
          t({ IsSuccess: e, FileContent: r });
      };
      ue_1.EditorRuntimeOperations.ReadFileAsync(
        r,
        (0, puerts_1.toManualReleaseDelegate)(s),
      );
    });
  }
  async ReadBatchFilesAsync(r) {
    return new Promise((s, e) => {
      const u = (r, e) => {
        (0, puerts_1.releaseManualReleaseDelegate)(u);
        var t = new Map();
        for (let e = 0; e < r.Num(); e++)
          t.set(r.Get(e).FilePath, r.Get(e).FileContent);
        s({ FileMap: t, FailedFiles: (0, Util_1.toTsArray)(e) });
      };
      ue_1.EditorRuntimeOperations.ReadBatchFilesAsync(
        (0, Util_1.toUeArray)(r, ue_1.BuiltinString),
        (0, puerts_1.toManualReleaseDelegate)(u),
      );
    });
  }
  WriteFile(e, r) {
    ue_1.KuroStaticLibrary.SaveStringToFile(r, e);
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
    var r = e.split("/");
    let t = r[0];
    for (let e = 1; e < r.length; e++)
      if (((t = t + "/" + r[e]), !ue_1.MyFileHelper.CreateDir(t)))
        return this.Log(2, `Create dir: [${t}] failed`), !1;
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
  ListFiles(e, r, t) {
    var s = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.BuiltinString));
    return (
      void 0 === r && (r = ""),
      t
        ? ue_1.MyFileHelper.FindFilesRecursively(s, e, r)
        : ue_1.MyFileHelper.FindFiles(s, e, r),
      (0, Util_1.toTsArray)((0, puerts_1.$unref)(s))
    );
  }
  ListDirs(e, r) {
    var t = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.BuiltinString));
    return (
      r
        ? ue_1.MyFileHelper.FindDirsRecursively(t, e)
        : ue_1.MyFileHelper.FindDirs(t, e),
      (0, Util_1.toTsArray)((0, puerts_1.$unref)(t))
    );
  }
  GetRelativePathToDir(e, r) {
    return r.endsWith("/")
      ? ue_1.MyFileHelper.GetPathRelativeTo(e, r)
      : ue_1.MyFileHelper.GetPathRelativeTo(e, r + "/");
  }
  GetAbsolutePath(e) {
    return ue_1.MyFileHelper.GetAbsolutePath(e);
  }
  GetFileModifyTick(e) {
    return ue_1.MyFileHelper.GetFileModifyTick(e);
  }
  Log(e, r) {
    switch (e) {
      case 0:
        this.LogLevel <= 0 && ue_1.MyLog?.Log(r);
        break;
      case 1:
        this.LogLevel <= 1 && ue_1.MyLog?.Warn(r);
        break;
      case 2:
        this.LogLevel <= 2 && (ue_1.MyLog?.Error(r), this.Be(r));
    }
  }
  SetErrorReportFun(e) {
    this.Be = e;
  }
  Exec(e, r) {
    e.includes("\\") && (e = e.split("\\").join("\\\\"));
    var t = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry)),
      s = (0, puerts_1.$ref)("");
    let u = "";
    (u = (
      r
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
    (r = ue_1.PythonScriptLibrary.ExecutePythonCommandEx(u, s, t)),
      (e = (0, puerts_1.$unref)(t));
    let o = (0, puerts_1.$unref)(s);
    return [
      r,
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
  ConvertExcelToCsv(e, r, t, s) {
    var u;
    return (
      !!this.ExistFile(e) &&
      ((u = this.GetProjectPath(
        "../Config/Tool/UniverseEditorTool/ExcelConverter/main.exe",
      )),
      this.ExistFile(u)
        ? ((s = void 0 === s ? -1 : s),
          (r = [
            "import subprocess",
            `args = "${u} ${e} ${r} ${(e = t.includes("|")) ? t.replace(/\|/g, ",") : t} ${e} ${s}"`,
            `subp = subprocess.Popen(args, stdin=subprocess.PIPE,
                stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True, shell=True)`,
            "print(subp.communicate()[0])",
          ].join("\r\n")),
          (t = (0, puerts_1.$ref)(
            (0, ue_1.NewArray)(ue_1.PythonLogOutputEntry),
          )),
          (0, Log_1.log)("ExecutePythonCommandEx: " + r),
          ue_1.PythonScriptLibrary.ExecutePythonCommandEx(r, void 0, t),
          0 !== (e = (0, puerts_1.$unref)(t)).Num() &&
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
      r = (0, puerts_1.$ref)((0, ue_1.NewArray)(ue_1.PythonLogOutputEntry)),
      e =
        ((0, Log_1.log)("ExecutePythonCommandEx: " + e),
        ue_1.PythonScriptLibrary.ExecutePythonCommandEx(e, void 0, r),
        (0, puerts_1.$unref)(r));
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
  CopyDir(e, r, t) {
    this.Exec(`robocopy "${e}" "${r}" /MIR`);
  }
  CopyFile(e, r) {
    this.Exec(`echo F | xcopy "${e}" "${r}" /F /Y`);
  }
  async DoJsonHttpReq(e, r, t) {
    const n = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
    for (const s of Object.entries({ "Content-Type": "application/json" }))
      n.Add(s[0], s[1]);
    return new Promise((s, u) => {
      const o = (e, r, t) => {
        (0, puerts_1.releaseManualReleaseDelegate)(o),
          e
            ? s({ Status: r, Data: t ? JSON.parse(t) : void 0 })
            : u(new Error(`Http request failed, code: ${r}, response: ` + t));
      };
      ue_1.EditorRuntimeOperations.SendHttpRequest(
        e,
        r,
        n,
        t ? JSON.stringify(t) : "",
        (0, puerts_1.toManualReleaseDelegate)(o),
      );
    });
  }
  GetProcessImagePathsByName(e) {
    var r = ue_1.KuroProcessUtils.GetProcessImagePathsByName(e),
      t = [];
    for (let e = 0; e < r.Num(); e++) t.push(r.Get(e));
    return t;
  }
  async ExecAsync(e) {
    throw new Error("Method not implemented.");
  }
}
(exports.PlatformUe = PlatformUe), (exports.platformUe = new PlatformUe());
//# sourceMappingURL=PlatformUe.js.map
