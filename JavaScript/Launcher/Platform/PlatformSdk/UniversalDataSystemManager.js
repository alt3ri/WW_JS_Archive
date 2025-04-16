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
      (this.Hwa = UNIVERSAL_DATA_SYSTEM_MEMORY_POOL_SIZE),
      (this.jwa = !1),
      (this.tMi = void 0);
  }
  Initialize(e) {
    (this.tMi = e),
      ue_1.KuroStaticPS5Library.InitNpUniversalDataSystem(this.Hwa),
      (this.jwa = !1);
  }
  Start() {
    this.Wwa(), this.pKo(), this.Qwa();
  }
  Stop() {
    this.Kwa(), this.$wa(), this.Xwa();
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
  Kwa() {
    var e = ue_1.KuroStaticPS5Library.AbortUdsHandle(this.vJ);
    e !== SCE_OK &&
      LauncherLog_1.LauncherLog.Debug(
        "UniversalDataSystemManager: AbortUdsHandle Fail",
        ["result", e],
      );
  }
  $wa() {
    var e = ue_1.KuroStaticPS5Library.DestroyUdsHandle(this.vJ);
    e !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: DestroyUdsHandle Fail",
          ["result", e],
        )
      : (this.vJ = SCE_NP_UNIVERSAL_DATA_SYSTEM_INVALID_HANDLE);
  }
  Qwa() {
    var e = ue_1.KuroStaticPS5Library.RegisterUdsContext(this.nx, this.vJ);
    e !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: RegisterUdsContext Fail",
          ["result", e],
        )
      : (this.jwa = !0);
  }
  Wwa() {
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
  Xwa() {
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
        (this.jwa = !1));
  }
  ZBa(e) {
    var t,
      a = (0, puerts_1.$ref)(e),
      r = (0, puerts_1.$ref)(BigInt(0)),
      s = (0, puerts_1.$ref)(BigInt(0)),
      a = ue_1.KuroStaticPS5Library.CreateUdsEvent(a, r, s);
    if (a === SCE_OK)
      return (
        ((t = new EventData()).EventName = e),
        (t.EventPtr = (0, puerts_1.$unref)(r)),
        (t.ProPtr = (0, puerts_1.$unref)(s)),
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
  eba(e) {
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
  tba(e, t, a) {
    var r = ue_1.KuroStaticPS5Library.UdsEventPropertyObjectSetString(
      e.ProPtr,
      (0, puerts_1.$ref)(t),
      (0, puerts_1.$ref)(a),
    );
    r !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: EventPropertyObjectSetString Fail",
          ["result", r],
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
  TTl(e, t, a) {
    var r = ue_1.KuroStaticPS5Library.UdsEventPropertyArraySetString(
      e.ProPtr,
      (0, puerts_1.$ref)(t),
      (0, puerts_1.$ref)(a),
    );
    r !== SCE_OK
      ? LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: EventPropertyArraySetString Fail",
          ["result", r],
          ["key", t],
          ["value", a],
        )
      : LauncherLog_1.LauncherLog.Debug(
          "UniversalDataSystemManager: EventPropertyArraySetString Success",
          ["eventName", e.EventName],
          ["key", t],
          ["value", a],
        );
  }
  StartActivity(e) {
    var t = this.ZBa("activityStart");
    t && (this.tba(t, "activityId", e), this.eba(t), this.dre(t));
  }
  EndActivity(e, t = "completed") {
    var a = this.ZBa("activityEnd");
    a &&
      (this.tba(a, "activityId", e),
      this.tba(a, "outcome", t),
      this.eba(a),
      this.dre(a));
  }
  ChangeActivityAvailability(e, t) {
    var a = this.ZBa("activityAvailabilityChange");
    a &&
      (e && this.TTl(a, "availableActivities", e),
      t && this.TTl(a, "unavailableActivities", t),
      this.tba(a, "mode", "full"),
      this.eba(a),
      this.dre(a));
  }
  GetHandle() {
    return this.vJ;
  }
  GetContext() {
    return this.nx;
  }
  GetIsRegistered() {
    return this.jwa;
  }
}
exports.UniversalDataSystemManager = UniversalDataSystemManager;
//# sourceMappingURL=UniversalDataSystemManager.js.map
