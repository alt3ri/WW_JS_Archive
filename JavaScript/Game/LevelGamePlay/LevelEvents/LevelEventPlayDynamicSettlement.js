"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayDynamicSettlement = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../Ui/UiManager");
const PreloadConstants_1 = require("../../World/Controller/PreloadConstants");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayDynamicSettlement extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.j3 = void 0),
      (this.$De = new Map()),
      (this.YDe = !0),
      (this.JDe = () => {
        this.YDe &&
          ((this.YDe = !1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "LevelEvent",
              18,
              "主界面打开，战斗结算效果继续执行",
            ),
          this.j3
            ? (TimerSystem_1.TimerSystem.Resume(this.j3),
              (ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement =
                !0),
              InputDistributeController_1.InputDistributeController.RefreshInputTag(),
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
            InputDistributeController_1.InputDistributeController.RefreshInputTag(),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("LevelEvent", 18, "主界面关闭，战斗结算效果暂停"),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BattleSettlementStateChanged,
              !1,
            )));
      });
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, t) {
    e
      ? e.DynamicSettlementConfig.Type !== "Battle"
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 18, "战斗结算效果类型没有实现"),
          this.FinishExecute(!1))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("LevelEvent", 18, "战斗结算效果开始"),
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
                  18,
                  "当前不在主界面，延后执行战斗结算效果",
                ),
              (this.YDe = !0)))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 18, "战斗结算效果参数不合法"),
        this.FinishExecute(!1));
  }
  zDe() {
    var e =
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "BattleSettlementTime",
      ) * TimeUtil_1.TimeUtil.InverseMillisecond;
    var e =
      ((this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
        (this.j3 = void 0), this.eRe(), this.FinishExecute(!0);
      }, e)),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(1),
      (ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement = !0),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      CameraController_1.CameraController.FightCamera.LogicComponent.PlaySettlementCamera(),
      ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH,
        UE.CurveFloat,
      ));
    var e =
      (this.tRe(e),
      CommonParamById_1.configCommonParamById.GetStringConfig(
        "BattleSettlementAudioEvent",
      ));
    e && AudioSystem_1.AudioSystem.PostEvent(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleSettlementStateChanged,
        !0,
      );
  }
  tRe(e) {
    if (Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) {
      const t =
        Global_1.Global.BaseCharacter?.CharacterActorComponent
          ?.ActorLocationProxy;
      if (t) {
        const i = CommonParamById_1.configCommonParamById.GetIntConfig(
          "BattleSettlementTimeScaleRadius",
        );
        const r = CommonParamById_1.configCommonParamById.GetIntConfig(
          "BattleSettlementTimeScalePriority",
        );
        const n = CommonParamById_1.configCommonParamById.GetFloatConfig(
          "BattleSettlementTimeDilation",
        );
        const o = CommonParamById_1.configCommonParamById.GetFloatConfig(
          "BattleSettlementTimeScaleDuration",
        );
        const a = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
        if (a) for (const s of a) this.iRe(s, t, i, r, n, e, o);
        for (const l of ModelManager_1.ModelManager.CreatureModel.DelayRemoveContainer.GetAllEntities())
          this.iRe(l, t, i, r, n, e, o);
        ModelManager_1.ModelManager.BulletModel.SetAllBulletTimeScale(
          t,
          i,
          r,
          n,
          e,
          o,
          !0,
        );
      }
    }
  }
  iRe(e, t, i, r, n, o, a) {
    let s, l;
    e?.Valid &&
      (l = e.Entity)?.IsInit &&
      (s = l.GetComponent(107)) &&
      (l = l.GetComponent(1)?.ActorLocationProxy) &&
      Math.abs(l.X - t.X) <= i &&
      Math.abs(l.Y - t.Y) <= i &&
      Math.abs(l.Z - t.Z) <= i &&
      ((l = s.SetTimeScale(r, n, o, a, 5)), this.$De.set(e, l));
  }
  eRe() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      (ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement = !1),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.ZDe,
      ),
      this.$De.clear(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("LevelEvent", 18, "战斗结算效果结束"),
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
// # sourceMappingURL=LevelEventPlayDynamicSettlement.js.map
