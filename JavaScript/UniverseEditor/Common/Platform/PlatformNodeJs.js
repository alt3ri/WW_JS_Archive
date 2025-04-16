"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.platformNodeJs =
    exports.PlatformNodeJs =
    exports.HttpClient =
      void 0);
const child_process_1 = require("child_process"),
  fs_1 = require("fs"),
  http = require("http"),
  https = require("https"),
  os_1 = require("os"),
  path = require("path"),
  url_1 = require("url"),
  util_1 = require("util"),
  Interface_1 = require("./Interface");
class HttpClient {
  async QZl(e) {
    const { url: t, method: n, headers: r, data: a } = e,
      s = new url_1.URL(t),
      i =
        ("GET" === n &&
          a &&
          Object.keys(a).forEach((e) => {
            s.searchParams.append(e, String(a[e]));
          }),
        {
          method: n,
          hostname: s.hostname,
          port: s.port,
          path: s.pathname + s.search,
          headers: { "Content-Type": "application/json", ...r },
        }),
      o = "https:" === s.protocol ? https : http;
    return new Promise((r, s) => {
      var e = o.request(i, (e) => {
        e.setEncoding("utf8");
        let t = "";
        e.on("data", (e) => {
          t += e;
        }),
          e.on("end", () => {
            try {
              r(t);
            } catch (e) {
              s("Failed to parse response: " + t);
            }
          });
      });
      e.on("error", (e) => {
        s(e);
      }),
        !a || ("POST" !== n && "PUT" !== n) || e.write(JSON.stringify(a)),
        e.end();
    });
  }
  async DoRequest(e, t, r) {
    t = await this.QZl({ url: t, method: e, data: r });
    return { Status: 200, Data: JSON.parse(t) };
  }
}
exports.HttpClient = HttpClient;
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
    var t = { FileMap: new Map(), FailedFiles: [] },
      r = (0, util_1.promisify)(fs_1.readFile);
    for (const n of e)
      try {
        var s = await r(n, { encoding: "utf8" });
        t.FileMap.set(n, s.replace(/^\uFEFF/, ""));
      } catch (e) {
        t.FailedFiles.push(n);
      }
    return t;
  }
  WriteFile(e, t) {
    var r = path.dirname(e);
    (0, fs_1.existsSync)(r) || (0, fs_1.mkdirSync)(r, { recursive: !0 }),
      (0, fs_1.writeFileSync)(e, t);
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
  RemoveFile(t) {
    try {
      return (0, fs_1.rmSync)(t), !0;
    } catch (e) {
      return (
        e instanceof Error
          ? this.Log(2, e.message)
          : this.Log(2, "remove file failed: " + t),
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
  ListFiles(e, t, r) {
    var s = [];
    return this.Oe(e, t, r, s), s;
  }
  ListDirs(e, t) {
    var r = [];
    return this.De(e, t, r), r;
  }
  De(t, r, s = []) {
    (0, fs_1.readdirSync)(t).forEach((e) => {
      e = t + "/" + e;
      (0, fs_1.lstatSync)(e).isDirectory() &&
        r &&
        (s.push(e), this.De(e, r, s));
    });
  }
  GetRelativePathToDir(e, t) {
    return path.relative(t, e);
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
  Log(e, t) {
    var r = this.Hjs ? this.ke() + ": " + t : t;
    switch (e) {
      case 0:
        this.LogLevel <= 0 && console.log(r);
        break;
      case 1:
        this.LogLevel <= 1 && console.warn(r);
        break;
      case 2:
        this.LogLevel <= 2 && console.error(r);
    }
  }
  SetErrorReportFun(e) {}
  Exec(t) {
    try {
      return [!0, (0, child_process_1.execSync)(t, { encoding: "utf8" })];
    } catch (e) {
      return e instanceof Error
        ? [!1, e.message]
        : [!1, `execute command failed. (${t})`];
    }
  }
  GetMacAddress() {
    var e = (0, os_1.networkInterfaces)();
    for (const r of Object.entries(e)) {
      var t = r[1];
      if (t)
        for (const s of t)
          if (s.mac) return s.mac.replace(/:/gi, "").toLocaleUpperCase();
    }
    return "";
  }
  GetPhysicMacAddress() {
    var [e, t] = this.Exec(
      `wmic path Win32_NetworkAdapter where "PNPDeviceID like '%PCI%' AND AdapterTypeID='0'" get name, MacAddress`,
    );
    return e && t
      ? (e = t
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
  Oe(r, s, n, a = []) {
    (0, fs_1.existsSync)(r) &&
      (s && !s.startsWith(".") && (s = "." + s),
      (0, fs_1.readdirSync)(r).forEach((e) => {
        var t = r + "/" + e;
        (0, fs_1.lstatSync)(t).isDirectory() && n
          ? this.Oe(t, s, n, a)
          : (s && path.extname(e) !== s) || a.push(t);
      }));
  }
  Ae() {
    var e = __dirname.indexOf("Content");
    if (e < 0) throw new Error("Invalid project!!!");
    return ("" + __dirname.substring(0, e)).replace(/\\/g, "/");
  }
  ReadUassetInfo(a) {
    if (a.endsWith(".uasset") && this.ExistFile(a)) {
      const o = (0, fs_1.readFileSync)(a);
      a = new Uint8Array(o);
      let e = !1,
        t = this.be("##KUROS##"),
        r = this.qe(t, a),
        s =
          (r < 0 && ((t = this.Ue("##KUROS##")), (r = this.qe(t, a)), (e = !0)),
          void 0),
        n = -1;
      n =
        ((s = e ? this.Ue("##KUROE##") : this.be("##KUROE##")), this.qe(s, a));
      var i = r + t.length;
      if (0 <= r && 0 <= n && i < n) {
        a = new Uint8Array(a.subarray(i, n));
        const o = Buffer.from(a);
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
  qe(r, s) {
    for (let t = 0; t < s.length; t++)
      if (s[t] === r[0])
        for (let e = 1; e < r.length && s[t + e] === r[e]; e++)
          if (e === r.length - 1) return t;
    return -1;
  }
  ConvertExcelToCsv(e, t, r) {
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
    var [e, t] = this.Exec(`netstat -ano | grep ":${e}"`);
    return !!e && void 0 !== t && "" !== t;
  }
  GetCommandLine() {
    return [...process.argv];
  }
  IsInPie() {
    return !1;
  }
  CopyDir(e, t, r) {
    (0, fs_1.cpSync)(e, t, { force: !0, recursive: !0, preserveTimestamps: r });
  }
  CopyFile(e, t) {
    (0, fs_1.copyFileSync)(e, t, fs_1.constants.COPYFILE_FICLONE);
  }
  async DoJsonHttpReq(e, t, r) {
    return new HttpClient().DoRequest(e, t, r);
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
  GetProcessPathAndCommandLine(e) {
    var t = (0, child_process_1.execSync)(
      `wmic process where "name='${e}.exe'" get ExecutablePath,CommandLine /format:value`,
    )
      .toString()
      .split("\n")
      .filter((e) => "" !== e.trim());
    if (t.length % 2 != 0) return [];
    function r(e, t) {
      (e = e.split("=")), (t = t.split("="));
      return {
        Path: 1 < e.length ? e[1] : "",
        CommandLine: 1 < t.length ? t[1] : "",
      };
    }
    var s = [];
    for (let e = 0; e < t.length; e += 2) {
      var n = t[e],
        a = t[e + 1];
      n.includes("ExecutablePath=") ? s.push(r(n, a)) : s.push(r(a, n));
    }
    return s;
  }
  GetProcessImagePathsByPort(e) {
    var [e, t] = this.Exec(`netstat -ano | findstr ":${e}"`);
    if (!e) return [];
    var e = t.split("\n"),
      r = new Set();
    for (const o of e) {
      var s = /\d+\.\d+\.\d+\.\d+:${port}\s+\S+\s+\S+\s+(?<pid>\d+)/.exec(o);
      s && s.groups?.pid && r.add(parseInt(s.groups.pid, 10));
    }
    var n = [];
    for (const c of r) {
      var [a, i] = this.Exec(
        `wmic process where "ProcessId=${c}" get ExecutablePath`,
      );
      a &&
        (a = /ExecutablePath\s+(?<path>\S+)/.exec(i)) &&
        a.groups?.path &&
        n.push(a.groups.path);
    }
    return n;
  }
  async ExecAsync(e) {
    return new Promise((s, n) => {
      try {
        (0, child_process_1.exec)(e, (e, t, r) => {
          r && this.Log(2, "execAsync log error: " + r),
            e && (this.Log(2, "execAsync error: " + JSON.stringify(e)), n(e)),
            s(t);
        });
      } catch (e) {
        this.Log(2, "execSync error: " + JSON.stringify(e)), n(e);
      }
    });
  }
  IsAssetRedirector(e) {
    return !1;
  }
}
(exports.PlatformNodeJs = PlatformNodeJs),
  (exports.platformNodeJs = new PlatformNodeJs());
//# sourceMappingURL=PlatformNodeJs.js.map
