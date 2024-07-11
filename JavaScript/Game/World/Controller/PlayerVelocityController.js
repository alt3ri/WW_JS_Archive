"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerVelocityController = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../Core/Common/Stats"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MAX_DELTA_TIME = 5,
  HIGH_SPEED_SQUARED = 64e4,
  IMPOSTER_UPDATE_BATCH = "r.imp.UpdateBatch";
class PlayerVelocityController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.fva(), this.sCe(), super.OnInit();
  }
  static fva() {
    this.pva = UE.KismetSystemLibrary.GetConsoleVariableIntValue(
      IMPOSTER_UPDATE_BATCH,
    );
  }
  static OnClear() {
    return this.aCe(), super.OnClear();
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.nye,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.SYi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.vva,
      );
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.SYi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.vva,
      );
  }
  static il() {
    (this.Mva = !0), this.av();
  }
  static nl() {
    this.Mva = !1;
  }
  static av() {
    this.Sva.DeepCopy(this.Eva()), this.yva();
  }
  static yva() {
    this.Iva.Set(0, 0, 0);
  }
  static OnTick(t) {
    this.Mva && this.Tva(0.001 * t);
  }
  static Eva() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        3,
      );
    return t ? t.ActorLocationProxy : this.Sva;
  }
  static Tva(t) {
    var e;
    t <= 0
      ? this.yva()
      : t > MAX_DELTA_TIME
        ? this.av()
        : ((e = this.Eva()).Subtraction(this.Sva, this.Dva),
          this.Dva.DivisionEqual(t),
          this.Sva.DeepCopy(e),
          (e = MathCommon_1.MathCommon.Clamp(100 * t, 0, 1)),
          this.Iva.MultiplyEqual(1 - e),
          this.Dva.MultiplyEqual(e),
          this.Iva.AdditionEqual(this.Dva)),
      this.Rva();
  }
  static Rva() {
    var t = this.Iva.SizeSquared() > HIGH_SPEED_SQUARED;
    t !== this.tWo &&
      ((this.tWo = t),
      this.Ava(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnHighSpeedModeChanged,
        this.tWo,
      ));
  }
  static Ava() {
    this.tWo ? this.Uva(Math.floor(this.pva / 2)) : this.Uva(this.pva);
  }
  static Uva(t) {
    (this.xva[0] = IMPOSTER_UPDATE_BATCH),
      (this.xva[1] = t),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        this.xva.join(" "),
      );
  }
  static GetAvgVelocity() {
    return this.Iva;
  }
  static IsHighSpeedMode() {
    return this.tWo;
  }
}
(exports.PlayerVelocityController = PlayerVelocityController),
  ((_a = PlayerVelocityController).Mva = !1),
  (PlayerVelocityController.Sva = Vector_1.Vector.Create(0, 0, 0)),
  (PlayerVelocityController.Dva = Vector_1.Vector.Create(0, 0, 0)),
  (PlayerVelocityController.Iva = Vector_1.Vector.Create(0, 0, 0)),
  (PlayerVelocityController.tWo = !1),
  (PlayerVelocityController.pva = 128),
  (PlayerVelocityController.xva = ["", 0]),
  (PlayerVelocityController.Lva = void 0),
  (PlayerVelocityController.nye = () => {
    _a.il();
  }),
  (PlayerVelocityController.SYi = () => {
    _a.nl();
  }),
  (PlayerVelocityController.bpr = () => {
    _a.nl();
  }),
  (PlayerVelocityController.vva = () => {
    _a.il();
  });
//# sourceMappingURL=PlayerVelocityController.js.map
