"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayDynamicSettlement = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  PreloadConstants_1 = require("../../World/Controller/PreloadConstants"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  SCREEN_EFFECT_CUE_ID = 10010092;
class LevelEventPlayDynamicSettlement extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.j3 = void 0),
      (this.$De = new Map()),
      (this.YDe = !0),
      (this.wQl = 0),
      (this.yta = void 0),
      (this.I5l = "Battle"),
      (this.JDe = () => {
        this.YDe &&
          ((this.YDe = !1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelEvent",
              17,
              "主界面打开，战斗结算效果继续执行",
            ),
          this.j3
            ? (TimerSystem_1.TimerSystem.Resume(this.j3),
              (ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement =
                !0),
              ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.BattleSettlementStateChanged,
                !0,
              ))
            : this.zDe());
      }),
      (this.ZDe = () => {
        this.YDe ||
          ((this.YDe = !0),
          this.j3 &&
            (TimerSystem_1.TimerSystem.Pause(this.j3),
            (ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement =
              !1),
            ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("LevelEvent", 17, "主界面关闭，战斗结算效果暂停"),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BattleSettlementStateChanged,
              !1,
            )));
      }),
      (this.FQe = (e) => {
        "FlySettlementView" === e &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OpenView,
            this.FQe,
          ),
          this.eRe());
      });
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  ExecuteNew(t, e) {
    if (t) {
      var t = t.DynamicSettlementConfig;
      this.I5l = t.Type;
      let e = 0;
      t && (t = t.GamePlayCue) && (e = t),
        (this.wQl = 0 < e ? e : SCREEN_EFFECT_CUE_ID),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("LevelEvent", 17, "战斗结算效果开始"),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ActiveBattleView,
          this.JDe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.DisActiveBattleView,
          this.ZDe,
        ),
        UiManager_1.UiManager.IsViewShow("BattleView")
          ? this.zDe()
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "LevelEvent",
                17,
                "当前不在主界面，延后执行战斗结算效果",
              ),
            (this.YDe = !0));
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 17, "战斗结算镜头效果参数不合法"),
        this.FinishExecute(!1);
  }
  zDe() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(1, [
      16,
    ]),
      (ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement = !0),
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.PlaySettlementCamera(
        this.I5l,
      );
    var e,
      t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH,
        UE.CurveFloat,
      ),
      t =
        (this.tRe(t),
        ControllerHolder_1.ControllerHolder.DamageUiController.SetDamageTimeScaleEnable(
          !0,
        ),
        Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()),
      i =
        (t &&
          ((e = t.GetComponent(21)) &&
            ((i = e?.AddCue(this.wQl)), (this.yta = e?.GetCueByHandle(i))),
          (e = t.GetComponent(61))) &&
          e.ClearInputCache(0, 0),
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "BattleSettlementAudioEvent",
        ));
    switch (
      (i && AudioSystem_1.AudioSystem.PostEvent(i),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleSettlementStateChanged,
        !0,
      ),
      this.I5l)
    ) {
      case "Battle":
        this.z8l(), this.IsAsync && this.FinishExecute(!0);
        break;
      case "SoaringChallenge":
        this.IsAsync
          ? (EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.OpenView,
              this.FQe,
            ),
            this.FinishExecute(!0))
          : this.z8l();
    }
  }
  tRe(e) {
    if (Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) {
      var t =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy;
      if (t) {
        var i = CommonParamById_1.configCommonParamById.GetIntConfig(
            "BattleSettlementTimeScaleRadius",
          ),
          r = CommonParamById_1.configCommonParamById.GetIntConfig(
            "BattleSettlementTimeScalePriority",
          ),
          o = CommonParamById_1.configCommonParamById.GetFloatConfig(
            "BattleSettlementTimeDilation",
          ),
          n = CommonParamById_1.configCommonParamById.GetFloatConfig(
            "BattleSettlementTimeScaleDuration",
          ),
          s = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
        if (s) for (const a of s) this.iRe(a, t, i, r, o, e, n);
        for (const l of ModelManager_1.ModelManager.CreatureModel.DelayRemoveContainer.GetAllEntities())
          this.iRe(l, t, i, r, o, e, n);
        ModelManager_1.ModelManager.BulletModel.SetAllBulletTimeScale(
          t,
          i,
          r,
          o,
          e,
          n,
          !0,
        );
      }
    }
  }
  iRe(e, t, i, r, o, n, s) {
    var a, l;
    e?.Valid &&
      (l = e.Entity)?.IsInit &&
      (a = l.GetComponent(120)) &&
      (l = l.GetComponent(1)?.ActorLocationProxy) &&
      Math.abs(l.X - t.X) <= i &&
      Math.abs(l.Y - t.Y) <= i &&
      Math.abs(l.Z - t.Z) <= i &&
      ((l = a.SetTimeScale(r, o, n, s, 5)), this.$De.set(e, l));
  }
  z8l() {
    var e =
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "BattleSettlementTime",
      ) * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      (this.j3 = void 0), this.eRe(), this.FinishExecute(!0);
    }, e);
  }
  eRe() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      (ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement = !1),
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.ZDe,
      ),
      this.$De.clear(),
      ControllerHolder_1.ControllerHolder.DamageUiController.SetDamageTimeScaleEnable(
        !1,
      ),
      this.yta && (this.yta.Destroy(), (this.yta = void 0)),
      (this.wQl = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("LevelEvent", 17, "战斗结算效果结束"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleSettlementStateChanged,
        !1,
      );
  }
  Release() {
    super.Release(),
      this.j3 &&
        (TimerSystem_1.TimerSystem.Remove(this.j3),
        (this.j3 = void 0),
        this.eRe());
  }
}
exports.LevelEventPlayDynamicSettlement = LevelEventPlayDynamicSettlement;
//# sourceMappingURL=LevelEventPlayDynamicSettlement.js.map
