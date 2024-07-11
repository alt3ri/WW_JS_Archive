"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SundialControlModel = void 0);
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const SundialControlController_1 = require("./SundialControlController");
const finalSocket = [5, 2];
const SUNDIAL_MODEL_CONFIG_ID = "518056";
const RING_ONE = "Ring_1";
const RING_TWO = "Ring_2";
const AK_ROTATING_1 = "play_amb_interact_sundial_outer_circle_loop";
const AK_STOP_ROTATING_1 = "play_amb_interact_sundial_outer_circle_stuck";
const AK_ROTATING_2 = "play_amb_interact_sundial_inner_circle_loop";
const AK_STOP_ROTATING_2 = "play_amb_interact_sundial_inner_circle_stuck";
const AK_SHOW_SHINE = "play_amb_interact_sundial_activate";
const AK_HIDE_SHINE = "play_amb_interact_sundial_deactivate";
const AK_FINISH = "play_amb_interact_sundial_finish";
class RotatingRing {
  constructor(t, e, i) {
    (this.RingActor = t),
      (this.SimpleRotateAngle = e),
      (this.TotalSocket = 360 / e),
      (this.CurSocket = 0),
      (this.IsShine = !1),
      (this.RotateSpeed = i);
    t = this.RingActor.RootComponent.RelativeRotation;
    this.InitYaw = t.Yaw;
  }
}
class SundialControlModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Pxe = void 0),
      (this.xxe = !1),
      (this.wxe = void 0),
      (this.Bxe = void 0),
      (this.bxe = []),
      (this.qxe = 0),
      (this.Gxe = 0);
  }
  get ModelConfig() {
    return (
      this.Pxe ||
        (this.Pxe = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
          0,
          SUNDIAL_MODEL_CONFIG_ID,
        )),
      this.Pxe
    );
  }
  get TargetLocation() {
    return this.xxe || this.Nxe(), this.wxe;
  }
  get TargetRotation() {
    return this.xxe || this.Nxe(), this.Bxe;
  }
  Nxe() {
    let t;
    this.xxe ||
      ((this.xxe = !0),
      (t =
        CameraController_1.CameraController.WidgetCamera.DisplayComponent
          .CineCamera),
      (this.wxe = t.K2_GetActorLocation()),
      (this.Bxe = t.K2_GetActorRotation()),
      (t = this.Bxe.Vector()).Normalize(MathCommon_1.MathCommon.SmallNumber),
      (this.wxe = this.wxe.op_Addition(t.op_Multiply(200))));
  }
  InitRingActors(t) {
    this.bxe = [];
    let e = 0;
    let i = 0;
    var r =
      GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
        "SundialGamePlay.AngularSpeed1",
      );
    var r =
      (r && (e = parseFloat(r.Value)),
      (r =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "SundialGamePlay.AngularSpeed2",
        )) && (i = parseFloat(r.Value)),
      new RotatingRing(t.GetActorByKey(RING_ONE), 30, e));
    var r =
      (r && this.bxe.push(r),
      new RotatingRing(t.GetActorByKey(RING_TWO), 90, i));
    r && this.bxe.push(r), (this.qxe = 0);
  }
  ChangeCurrentRingIndex(t = 1) {
    (this.qxe = (this.qxe + t) % this.bxe.length),
      this.UpdateTips(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSundialRingSwitch,
        this.qxe,
      );
  }
  SimpleAddCurRingSocket(t = 1) {
    const e = this.bxe[this.qxe];
    var t =
      ((e.CurSocket = (e.CurSocket + t) % e.TotalSocket),
      ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
        this.qxe === 0 ? AK_ROTATING_1 : AK_ROTATING_2,
      )?.Path);
    t &&
      AudioController_1.AudioController.PostEvent(
        t,
        SundialControlController_1.SundialControlController.GetMainActor(),
      );
  }
  RotateCurrentRing(i) {
    const r = this.bxe[this.qxe];
    const n = r.RingActor.RootComponent;
    if (n) {
      const o = r.RotateSpeed;
      let t = i * TimeUtil_1.TimeUtil.Millisecond * o;
      let e = ((this.Gxe += t), !1);
      if (
        (this.Gxe > r.SimpleRotateAngle &&
          ((t -= this.Gxe - r.SimpleRotateAngle), (e = !0)),
        n.K2_AddRelativeRotation(new UE.Rotator(0, t, 0), !1, void 0, !1),
        e)
      )
        return (
          (i = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
            this.qxe === 0 ? AK_STOP_ROTATING_1 : AK_STOP_ROTATING_2,
          )?.Path) &&
            AudioController_1.AudioController.PostEvent(
              i,
              SundialControlController_1.SundialControlController.GetMainActor(),
            ),
          (this.Gxe = 0),
          this.Oxe(),
          this.kxe(),
          !0
        );
    }
    return !1;
  }
  ClearCacheActor() {
    this.xxe && ((this.xxe = !1), (this.wxe = void 0), (this.Bxe = void 0)),
      this.bxe && this.bxe.length > 0 && (this.bxe = []);
  }
  ResetAll() {
    for (let t = (this.qxe = 0); t < this.bxe.length; t++) {
      const e = this.bxe[t];
      const i = e.RingActor.RootComponent;
      const r = i.RelativeRotation;
      (r.Yaw = e.InitYaw),
        i.K2_SetRelativeRotation(r, !1, void 0, !1),
        (e.IsShine = !1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSundialRingChangeShine,
          t,
          !1,
        ),
        (e.CurSocket = 0);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnSundialRingSwitch,
      0,
    );
  }
  Oxe() {
    for (let t = 0; t < this.bxe.length; t++) {
      var e;
      this.bxe[t].IsShine
        ? this.bxe[t].CurSocket !== finalSocket[t] &&
          ((this.bxe[t].IsShine = !1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSundialRingChangeShine,
            t,
            !1,
          ),
          (e =
            ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
              AK_HIDE_SHINE,
            )?.Path)) &&
          AudioController_1.AudioController.PostEvent(
            e,
            SundialControlController_1.SundialControlController.GetMainActor(),
          )
        : this.bxe[t].CurSocket === finalSocket[t] &&
          ((this.bxe[t].IsShine = !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSundialRingChangeShine,
            t,
            !0,
          ),
          (e =
            ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
              AK_SHOW_SHINE,
            )?.Path)) &&
          AudioController_1.AudioController.PostEvent(
            e,
            SundialControlController_1.SundialControlController.GetMainActor(),
          );
    }
  }
  kxe() {
    for (let t = 0; t < this.bxe.length; t++)
      if (this.bxe[t].CurSocket !== finalSocket[t]) return;
    const t =
      ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(AK_FINISH)?.Path;
    t &&
      AudioController_1.AudioController.PostEvent(
        t,
        SundialControlController_1.SundialControlController.GetMainActor(),
      ),
      SundialControlController_1.SundialControlController.PlayFinishAnimation();
  }
  UpdateTips() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnNeedUpdateSundialTips,
      this.qxe,
      this.bxe[this.qxe].CurSocket,
    );
  }
}
exports.SundialControlModel = SundialControlModel;
// # sourceMappingURL=SundialControlModel.js.map
