"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UniversalDataSystemManager = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  SCE_NP_UNIVERSAL_DATA_SYSTEM_INVALID_CONTEXT = -1,
  SCE_NP_UNIVERSAL_DATA_SYSTEM_INVALID_HANDLE = -1,
  UNIVERSAL_DATA_SYSTEM_MEMORY_POOL_SIZE = 262144,
  SCE_OK = 0;
class EventData {
  constructor() {
    (this.EventName = ""),
      (this.EventPtr = BigInt(0)),
      (this.ProPtr = BigInt(0));
  }
}
class UniversalDataSystemManager {
  constructor() {
    (this.nx = SCE_NP_UNIVERSAL_DATA_SYSTEM_INVALID_CONTEXT),
      (this.vJ = SCE_NP_UNIVERSAL_DATA_SYSTEM_INVALID_HANDLE),
      (this.Dwa = UNIVERSAL_DATA_SYSTEM_MEMORY_POOL_SIZE),
      (this.Awa = !1),
      (this.tMi = void 0);
  }
  Initialize(e) {
    (this.tMi = e),
      ue_1.KuroStaticPS5Library.InitNpUniversalDataSystem(this.Dwa),
      (this.Awa = !1);
  }
  Start() {
    this.Rwa(), this.pKo(), this.Uwa();
  }
  Stop() {
    this.xwa(), this.Pwa(), this.wwa();
  }
  pKo() {
    var e, t;
    this.tMi
      ? ((e = (0, puerts_1.$ref)(0)),
        (t = ue_1.KuroStaticPS5Library.CreateUdsHandle(e)) !== SCE_OK
          ? LauncherLog_1.LauncherLog.Debug(
              "UniversalDataSystemManager: CreateUdsHandle Fail",
              ["result", t],
            )
          : (this.vJ = (0, puerts_1.$unref)(e)))
      : LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: CreateHandle Fail!!! UserId Is Empty",
        );
  }
  xwa() {
    var e = ue_1.KuroStaticPS5Library.AbortUdsHandle(this.vJ);
    e !== SCE_OK &&
      LauncherLog_1.LauncherLog.Debug(
        "UniversalDataSystemManager: AbortUdsHandle Fail",
        ["result", e],
      );
  }
  Pwa() {
    var e = ue_1.KuroStaticPS5Library.DestroyUdsHandle(this.vJ);
    e !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: DestroyUdsHandle Fail",
          ["result", e],
        )
      : (this.vJ = SCE_NP_UNIVERSAL_DATA_SYSTEM_INVALID_HANDLE);
  }
  Uwa() {
    var e = ue_1.KuroStaticPS5Library.RegisterUdsContext(this.nx, this.vJ);
    e !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: RegisterUdsContext Fail",
          ["result", e],
        )
      : (this.Awa = !0);
  }
  Rwa() {
    var e, t;
    this.tMi
      ? ((e = (0, puerts_1.$ref)(this.nx)),
        (t = ue_1.KuroStaticPS5Library.CreateUdsContext(
          (0, puerts_1.$ref)(this.tMi),
          e,
        )) !== SCE_OK &&
          LauncherLog_1.LauncherLog.Debug(
            "UniversalDataSystemManager: CreateUdsContext Fail",
            ["result", t],
          ),
        (this.nx = (0, puerts_1.$unref)(e)))
      : LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: CreateUdsContext Fail!!! UserId Is Empty",
        );
  }
  wwa() {
    var e;
    this.nx === SCE_NP_UNIVERSAL_DATA_SYSTEM_INVALID_CONTEXT
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: DestroyUdsContext Fail!!! Context Is Empty",
        )
      : ((e = ue_1.KuroStaticPS5Library.DestroyUdsContext(this.nx)) !==
          SCE_OK &&
          LauncherLog_1.LauncherLog.Debug(
            "UniversalDataSystemManager: DestroyUdsContext Fail",
            ["result", e],
          ),
        (this.Awa = !1));
  }
  GBa(e) {
    var t,
      a = (0, puerts_1.$ref)(e),
      s = (0, puerts_1.$ref)(BigInt(0)),
      r = (0, puerts_1.$ref)(BigInt(0)),
      a = ue_1.KuroStaticPS5Library.CreateUdsEvent(a, s, r);
    if (a === SCE_OK)
      return (
        ((t = new EventData()).EventName = e),
        (t.EventPtr = (0, puerts_1.$unref)(s)),
        (t.ProPtr = (0, puerts_1.$unref)(r)),
        LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: CreateUdsEvent Success",
          ["eventName", e],
        ),
        t
      );
    LauncherLog_1.LauncherLog.Debug(
      "UniversalDataSystemManager: CreateUdsEvent Fail",
      ["result", a],
    );
  }
  OBa(e) {
    var t = ue_1.KuroStaticPS5Library.PostUdsEvent(
      this.nx,
      this.vJ,
      e.EventPtr,
    );
    t !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: PostUdsEvent Fail",
          ["result", t],
          ["eventName", e.EventName],
        )
      : LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: PostUdsEvent Success",
          ["eventName", e.EventName],
        );
  }
  dre(e) {
    var t = ue_1.KuroStaticPS5Library.DestroyUdsEvent(e.EventPtr);
    t !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: DestroyUdsEvent Fail",
          ["result", t],
        )
      : LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: DestroyUdsEvent Success",
          ["eventName", e.EventName],
        );
  }
  kBa(e, t, a) {
    var s = ue_1.KuroStaticPS5Library.UdsEventPropertyObjectSetString(
      e.ProPtr,
      (0, puerts_1.$ref)(t),
      (0, puerts_1.$ref)(a),
    );
    s !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: EventPropertyObjectSetString Fail",
          ["result", s],
          ["key", t],
          ["value", a],
        )
      : LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: EventPropertyObjectSetString Success",
          ["eventName", e.EventName],
          ["key", t],
          ["value", a],
        );
  }
  StartActivity(e) {
    var t = this.GBa("activityStart");
    t && (this.kBa(t, "activityId", e), this.OBa(t), this.dre(t));
  }
  EndActivity(e, t = "completed") {
    var a = this.GBa("activityEnd");
    a &&
      (this.kBa(a, "activityId", e),
      this.kBa(a, "outcom", t),
      this.OBa(a),
      this.dre(a));
  }
  GetHandle() {
    return this.vJ;
  }
  GetContext() {
    return this.nx;
  }
  GetIsRegistered() {
    return this.Awa;
  }
}
exports.UniversalDataSystemManager = UniversalDataSystemManager;
//# sourceMappingURL=UniversalDataSystemManager.js.map
