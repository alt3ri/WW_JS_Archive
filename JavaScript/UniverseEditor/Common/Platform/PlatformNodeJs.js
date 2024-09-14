"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.platformNodeJs = exports.PlatformNodeJs = void 0);
const child_process_1 = require("child_process"),
  fs_1 = require("fs"),
  os_1 = require("os"),
  path = require("path"),
  util_1 = require("util"),
  Interface_1 = require("./Interface");
class PlatformNodeJs extends Interface_1.Platform {
  constructor() {
    super(...arguments), (this.Hjs = !0);
  }
  ReadFile(e) {
    return (0, fs_1.existsSync)(e)
      ? (0, fs_1.readFileSync)(e, "utf8").replace(/^\uFEFF/, "")
      : "";
  }
  async ReadFileAsync(e) {
    try {
      return {
        IsSuccess: !0,
        FileContent: (
          await (0, util_1.promisify)(fs_1.readFile)(e, { encoding: "utf8" })
        ).replace(/^\uFEFF/, ""),
      };
    } catch (e) {
      return { IsSuccess: !1, FileContent: "" };
    }
  }
  async ReadBatchFilesAsync(e) {
    var r = { FileMap: new Map(), FailedFiles: [] },
      t = (0, util_1.promisify)(fs_1.readFile);
    for (const i of e)
      try {
        var s = await t(i, { encoding: "utf8" });
        r.FileMap.set(i, s.replace(/^\uFEFF/, ""));
      } catch (e) {
        r.FailedFiles.push(i);
      }
    return r;
  }
  WriteFile(e, r) {
    var t = path.dirname(e);
    (0, fs_1.existsSync)(t) || (0, fs_1.mkdirSync)(t, { recursive: !0 }),
      (0, fs_1.writeFileSync)(e, r);
  }
  ExistFile(e) {
    return (0, fs_1.existsSync)(e);
  }
  ExistDir(e) {
    return (0, fs_1.existsSync)(e);
  }
  CreateDir(e) {
    return void 0 !== (0, fs_1.mkdirSync)(e, { recursive: !0 });
  }
  RemoveFile(r) {
    try {
      return (0, fs_1.rmSync)(r), !0;
    } catch (e) {
      return (
        e instanceof Error
          ? this.Log(2, e.message)
          : this.Log(2, "remove file failed: " + r),
        !1
      );
    }
  }
  RemoveDir(e) {
    (0, fs_1.rmSync)(e, { recursive: !0, force: !0 });
  }
  GetProjectPath(e) {
    return "" + this.Ae() + e;
  }
  GetSavePath(e) {
    return this.Ae() + "Saved/" + e;
  }
  GetUserDirPath(e) {
    return (0, os_1.homedir)() + "/" + e;
  }
  ListFiles(e, r, t) {
    var s = [];
    return this.Oe(e, r, t, s), s;
  }
  ListDirs(e, r) {
    var t = [];
    return this.De(e, r, t), t;
  }
  De(r, t, s = []) {
    (0, fs_1.readdirSync)(r).forEach((e) => {
      e = r + "/" + e;
      (0, fs_1.lstatSync)(e).isDirectory() &&
        t &&
        (s.push(e), this.De(e, t, s));
    });
  }
  GetRelativePathToDir(e, r) {
    return path.relative(r, e);
  }
  GetAbsolutePath(e) {
    return path.resolve(e);
  }
  GetFileModifyTick(e) {
    return this.ExistFile(e) ? (0, fs_1.statSync)(e).mtime.getTime() : 0n;
  }
  ke() {
    var e = new Date();
    return `${e.getHours()}:${e.getMinutes()}:` + e.getSeconds();
  }
  SetLogWithTime(e) {
    this.Hjs = e;
  }
  Log(e, r) {
    var t = this.Hjs ? this.ke() + ": " + r : r;
    switch (e) {
      case 0:
        this.LogLevel <= 0 && console.log(t);
        break;
      case 1:
        this.LogLevel <= 1 && console.warn(t);
        break;
      case 2:
        this.LogLevel <= 2 && console.error(t);
    }
  }
  SetErrorReportFun(e) {}
  Exec(r) {
    try {
      return [!0, (0, child_process_1.execSync)(r).toString()];
    } catch (e) {
      return e instanceof Error
        ? [!1, e.message]
        : [!1, `execute command failed. (${r})`];
    }
  }
  GetMacAddress() {
    var e = (0, os_1.networkInterfaces)();
    for (const t of Object.entries(e)) {
      var r = t[1];
      if (r)
        for (const s of r)
          if (s.mac) return s.mac.replace(/:/gi, "").toLocaleUpperCase();
    }
    return "";
  }
  GetPhysicMacAddress() {
    var [e, r] = this.Exec(
      `wmic path Win32_NetworkAdapter where "PNPDeviceID like '%PCI%' AND AdapterTypeID='0'" get name, MacAddress`,
    );
    return e && r
      ? (e = r
          .split(
            `

`,
          )[1]
          .split(" ")[0]
          .split(":"))[0] +
          e[1] +
          e[2] +
          e[3] +
          e[4] +
          e[5]
      : "";
  }
  GetPlatformType() {
    return 1;
  }
  Oe(t, s, i, n = []) {
    (0, fs_1.existsSync)(t) &&
      (s && !s.startsWith(".") && (s = "." + s),
      (0, fs_1.readdirSync)(t).forEach((e) => {
        var r = t + "/" + e;
        (0, fs_1.lstatSync)(r).isDirectory() && i
          ? this.Oe(r, s, i, n)
          : (s && path.extname(e) !== s) || n.push(r);
      }));
  }
  Ae() {
    var e = __dirname.indexOf("Content");
    if (e < 0) throw new Error("Invalid project!!!");
    return ("" + __dirname.substring(0, e)).replace(/\\/g, "/");
  }
  ReadUassetInfo(n) {
    if (n.endsWith(".uasset") && this.ExistFile(n)) {
      const o = (0, fs_1.readFileSync)(n);
      n = new Uint8Array(o);
      let e = !1,
        r = this.be("##KUROS##"),
        t = this.qe(r, n),
        s =
          (t < 0 && ((r = this.Ue("##KUROS##")), (t = this.qe(r, n)), (e = !0)),
          void 0),
        i = -1;
      i =
        ((s = e ? this.Ue("##KUROE##") : this.be("##KUROE##")), this.qe(s, n));
      var a = t + r.length;
      if (0 <= t && 0 <= i && a < i) {
        n = new Uint8Array(n.subarray(a, i));
        const o = Buffer.from(n);
        return e ? o.toString("ucs2") : o.toString("utf8");
      }
    }
    return "";
  }
  be(e) {
    e = Buffer.from(e, "utf8");
    return new Uint8Array(e);
  }
  Ue(e) {
    e = Buffer.from(e, "ucs2");
    return new Uint8Array(e);
  }
  qe(t, s) {
    for (let r = 0; r < s.length; r++)
      if (s[r] === t[0])
        for (let e = 1; e < t.length && s[r + e] === t[e]; e++)
          if (e === t.length - 1) return r;
    return -1;
  }
  ConvertExcelToCsv(e, r, t) {
    return !1;
  }
  CheckFileIsInUse(e) {
    try {
      return (0, fs_1.accessSync)(e, fs_1.constants.R_OK), !1;
    } catch (e) {
      return !0;
    }
  }
  IsPortInUse(e) {
    var [e, r] = this.Exec(`netstat -ano | grep ":${e}"`);
    return !!e && void 0 !== r && "" !== r;
  }
  GetCommandLine() {
    return process.argv;
  }
  IsInPie() {
    return !1;
  }
  CopyDir(e, r, t) {
    (0, fs_1.cpSync)(e, r, { force: !0, recursive: !0, preserveTimestamps: t });
  }
  CopyFile(e, r) {
    (0, fs_1.copyFileSync)(e, r, fs_1.constants.COPYFILE_FICLONE);
  }
  async DoJsonHttpReq(e, r, t) {
    throw new Error("Method not implemented.");
  }
  GetProcessImagePathsByName(e) {
    var e = (0, child_process_1.execSync)(
      `wmic process where "name='${e}.exe'" get ExecutablePath /format:value`,
    )
      .toString()
      .match(/ExecutablePath=(.*)/g);
    return e
      ? ((e = new Set(e.map((e) => e.split("=")[1]))), Array.from(e))
      : [];
  }
  async ExecAsync(e) {
    return new Promise((s, i) => {
      try {
        (0, child_process_1.exec)(e, (e, r, t) => {
          t && this.Log(2, "execAsync log error: " + t),
            e && (this.Log(2, "execAsync error: " + JSON.stringify(e)), i(e)),
            s(r);
        });
      } catch (e) {
        this.Log(2, "execSync error: " + JSON.stringify(e)), i(e);
      }
    });
  }
}
(exports.PlatformNodeJs = PlatformNodeJs),
  (exports.platformNodeJs = new PlatformNodeJs());
//# sourceMappingURL=PlatformNodeJs.js.map
