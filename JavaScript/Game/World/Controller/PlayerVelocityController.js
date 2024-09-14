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
    return this.TEa(), this.sCe(), super.OnInit();
  }
  static TEa() {
    this.LEa = UE.KismetSystemLibrary.GetConsoleVariableIntValue(
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
        this.DEa,
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
        this.DEa,
      );
  }
  static il() {
    (this.REa = !0), this.av();
  }
  static nl() {
    this.REa = !1;
  }
  static av() {
    this.BKs.DeepCopy(this.AEa()), this.UEa();
  }
  static UEa() {
    this.xEa.Set(0, 0, 0);
  }
  static OnTick(t) {
    this.REa && this.PEa(0.001 * t);
  }
  static AEa() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        3,
      );
    return t ? t.ActorLocationProxy : this.BKs;
  }
  static PEa(t) {
    var e;
    this.wEa.Start(),
      t <= 0
        ? this.UEa()
        : t > MAX_DELTA_TIME
          ? this.av()
          : ((e = this.AEa()).Subtraction(this.BKs, this.BEa),
            this.BEa.DivisionEqual(t),
            this.BKs.DeepCopy(e),
            (e = MathCommon_1.MathCommon.Clamp(100 * t, 0, 1)),
            this.xEa.MultiplyEqual(1 - e),
            this.BEa.MultiplyEqual(e),
            this.xEa.AdditionEqual(this.BEa)),
      this.bEa(),
      this.wEa.Stop();
  }
  static bEa() {
    var t = this.xEa.SizeSquared() > HIGH_SPEED_SQUARED;
    t !== this.tWo &&
      ((this.tWo = t),
      this.qEa(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnHighSpeedModeChanged,
        this.tWo,
      ));
  }
  static qEa() {
    this.tWo ? this.GEa(Math.floor(this.LEa / 2)) : this.GEa(this.LEa);
  }
  static GEa(t) {
    (this.OEa[0] = IMPOSTER_UPDATE_BATCH),
      (this.OEa[1] = t),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        this.OEa.join(" "),
      );
  }
  static GetAvgVelocity() {
    return this.xEa;
  }
  static IsHighSpeedMode() {
    return this.tWo;
  }
}
(exports.PlayerVelocityController = PlayerVelocityController),
  ((_a = PlayerVelocityController).REa = !1),
  (PlayerVelocityController.BKs = Vector_1.Vector.Create(0, 0, 0)),
  (PlayerVelocityController.BEa = Vector_1.Vector.Create(0, 0, 0)),
  (PlayerVelocityController.xEa = Vector_1.Vector.Create(0, 0, 0)),
  (PlayerVelocityController.tWo = !1),
  (PlayerVelocityController.LEa = 128),
  (PlayerVelocityController.OEa = ["", 0]),
  (PlayerVelocityController.wEa = Stats_1.Stat.Create(
    "PlayerVelocityController.CalculateVelocity",
  )),
  (PlayerVelocityController.nye = () => {
    _a.il();
  }),
  (PlayerVelocityController.SYi = () => {
    _a.nl();
  }),
  (PlayerVelocityController.bpr = () => {
    _a.nl();
  }),
  (PlayerVelocityController.DEa = () => {
    _a.il();
  });
//# sourceMappingURL=PlayerVelocityController.js.map
