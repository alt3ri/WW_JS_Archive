"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  ControllerWithAssistantBase_1 = require("../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapController_1 = require("../Map/Controller/MapController"),
  PowerController_1 = require("../Power/PowerController"),
  GuideLineAssistant_1 = require("../QuestNew/Controller/GuideLineAssistant"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  LevelPlayDefine_1 = require("./LevelPlayDefine"),
  INTERVAL_TIME = 1e3,
  assistantMap = { [0]: void 0 };
class LevelPlayController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent(),
      Net_1.Net.Register(19570, LevelPlayController.Opi),
      Net_1.Net.Register(7673, LevelPlayController.kpi),
      Net_1.Net.Register(22798, LevelPlayController.Fpi),
      Net_1.Net.Register(24251, LevelPlayController.Vpi),
      Net_1.Net.Register(6286, LevelPlayController.Hpi),
      Net_1.Net.Register(26054, LevelPlayController.jpi);
  }
  static OnUnRegisterNetEvent() {
    super.OnRegisterNetEvent(),
      Net_1.Net.UnRegister(19570),
      Net_1.Net.UnRegister(7673),
      Net_1.Net.UnRegister(22798),
      Net_1.Net.UnRegister(24251),
      Net_1.Net.UnRegister(6286),
      Net_1.Net.UnRegister(26054);
  }
  static RegisterAssistant() {
    this.AddAssistant(
      0,
      new GuideLineAssistant_1.GuideLineAssistant(
        Protocol_1.Aki.Protocol.tps.Proto_BtTypeLevelPlay,
      ),
    );
  }
  static cYt(e) {
    if (this.Assistants) return this.Assistants.get(e);
  }
  static Wpi() {
    const o = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (o) {
      var e = ModelManager_1.ModelManager.LevelPlayModel,
        l = e.GetProcessingLevelPlayInfos();
      if (0 === l.size)
        e.SetTrackLevelPlayId(LevelPlayDefine_1.INVALID_LEVELPLAYID);
      else {
        let r = e.GetTrackLevelPlayInfo();
        !r ||
          (r.CanTrack && (r.UpdateDistanceSquared(o), r.IsInTrackRange())) ||
          (r = void 0);
        const a = e.GetTrackLevelPlayId();
        l.forEach((e, l) => {
          l !== a &&
            e.CanTrack &&
            (r
              ? e.TrackPriority < r.TrackPriority ||
                (e.TrackPriority > r.TrackPriority
                  ? (e.UpdateDistanceSquared(o), e.IsInTrackRange() && (r = e))
                  : (e.UpdateDistanceSquared(o),
                    e.IsInTrackRange() &&
                      e.CacheDistanceSquared < r.CacheDistanceSquared &&
                      (r = e)))
              : (e.UpdateDistanceSquared(o), e.IsInTrackRange() && (r = e)));
        });
        l = r?.Id ?? LevelPlayDefine_1.INVALID_LEVELPLAYID;
        e.SetTrackLevelPlayId(l);
      }
    }
  }
  static Kpi(e) {
    ModelManager_1.ModelManager.TrackModel.IsTracking(4, e) &&
      MapController_1.MapController.RequestTrackMapMark(10, e, !1);
  }
  static ReceiveReward(e, l) {
    if (!ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
      if (r) {
        r = r.Entity.GetComponent(0).GetPbDataId();
        const o =
          ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfoByRewardEntityId(
            r,
          );
        if (o) {
          r =
            ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(
              o.RewardId,
            );
          if (r && r.Cost) {
            const a = r.Cost.get(5);
            if (LevelPlayController.Qpi(a)) {
              r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64);
              if (
                ((r.ShowPowerItem = !0),
                r.SetTextArgs(a.toString()),
                r.FunctionMap.set(2, () => {
                  LevelPlayController.Qpi(a) &&
                    LevelPlayController.RequestReceiveReward(e, o);
                }),
                (r.DestroyFunction = () => {
                  ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward =
                    !1;
                }),
                0 < l)
              ) {
                const o =
                  ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
                    l,
                  );
                o &&
                  "SilentArea" === o.LevelPlayType &&
                  (l =
                    ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
                      [3],
                      !1,
                    )) &&
                  0 < l.LeftUpCount &&
                  (r.Tip = l.GetFullTip());
              }
              (ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward =
                !0),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  r,
                );
            }
          }
        }
      }
    }
  }
  static RequestReceiveReward(e, l) {
    e = Protocol_1.Aki.Protocol.Hns.create({
      P4n: MathUtils_1.MathUtils.NumberToLong(e),
    });
    Net_1.Net.Call(9614, e, (e) => {
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ((e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
            e.O4n,
          )),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e))
        : l.UpdateCanGetReward(!1);
    });
  }
  static Qpi(e) {
    var l;
    return (
      !!ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e) ||
      ((l = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "ReceiveLevelPlayPowerNotEnough",
      )),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(l),
      PowerController_1.PowerController.OpenPowerView(
        2,
        ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(e),
      ),
      !1)
    );
  }
}
((exports.LevelPlayController = LevelPlayController).e8 = 0),
  (LevelPlayController.OnTick = (e) => {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp &&
      ((LevelPlayController.e8 += e),
      LevelPlayController.e8 >= INTERVAL_TIME &&
        ((LevelPlayController.e8 -= INTERVAL_TIME), LevelPlayController.Wpi()),
      LevelPlayController.cYt(0)?.Tick(e));
  }),
  (LevelPlayController.Opi = (e) => {
    for (const r of e.Sxs) {
      var l =
        ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
          r.J4n,
        );
      l.UpdateState(r.F4n),
        l.UpdateFirstPass(r.uDs),
        l.UpdateRefreshTime(r.pxs),
        l.IsClose &&
          void 0 !== l.MarkConfig &&
          0 < l.MarkConfig.MarkId &&
          LevelPlayController.Kpi(l.MarkConfig.MarkId),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneGameplay",
            19,
            "下发已开启的玩法",
            ["玩法id", r.J4n],
            ["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[r.F4n]],
            ["是否首通", r.uDs],
            ["开启时间", r.pxs],
          );
    }
  }),
  (LevelPlayController.kpi = (e) => {
    var l,
      e = e.J4n,
      r =
        ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
          e,
        );
    r
      ? (r.UpdateFirstPass(!0),
        void 0 !== r.FirstRewardId &&
          ((l = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
            LevelPlayDefine_1.GAMEPLAY_FIRST_PROMPT_TYPE_ID,
          )),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
            l.TypeId,
            void 0,
            void 0,
            void 0,
            void 0,
            LevelPlayDefine_1.GAMEPLAY_FIRST_PROMPT_TYPE_ID,
          )),
        (l = r.LevelPlayFirstPassAction) &&
          0 < l.length &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneGameplay", 34, "开始执行玩法首通动作"),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
            l,
            LevelGeneralContextDefine_1.LevelPlayContext.Create(r.Id),
          )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneGameplay", 19, "玩法首通信息推送", ["id", e]))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 19, "玩法首通时，玩法不存在", [
          "玩法Id",
          e,
        ]);
  }),
  (LevelPlayController.Fpi = (e) => {
    var l = e.J4n;
    switch (e.F4n) {
      case 1:
      case 2:
        ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
          l,
        ).UpdateState(e.F4n);
        break;
      case 0:
        var r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(l);
        r &&
          (ModelManager_1.ModelManager.LevelPlayModel.LevelPlayClose(r),
          r.MarkConfig) &&
          0 < r.MarkConfig.MarkId &&
          LevelPlayController.Kpi(r.MarkConfig.MarkId);
        break;
      case 3:
        ModelManager_1.ModelManager.LevelPlayModel.LevelPlayFinish(l);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "SceneGameplay",
        19,
        "玩法状态改变",
        ["玩法id", l],
        ["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[e.F4n]],
      );
  }),
  (LevelPlayController.Hpi = (e) => {
    var l = e.J4n;
    let r =
      ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(l);
    (r =
      r ||
      ModelManager_1.ModelManager.LevelPlayModel.EnterLevelPlayRange(
        l,
      )).UpdateState(e.F4n),
      r.UpdateCanGetReward(e.vxs);
    e = r.LevelPlayEnterAction;
    r.CanExecOpenAction &&
      e &&
      0 < e.length &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneGameplay",
          34,
          "开始执行玩法进入动作(Finish状态下不会执行)",
        ),
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
        e,
        LevelGeneralContextDefine_1.LevelPlayContext.Create(r.Id),
      )),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneGameplay", 19, "玩法进入", ["id", l]);
  }),
  (LevelPlayController.jpi = (e) => {
    e = e.J4n;
    ModelManager_1.ModelManager.LevelPlayModel.LeaveLevelPlayRange(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneGameplay", 19, "玩法离开", ["id", e]);
  }),
  (LevelPlayController.Vpi = (e) => {
    var l = e.J4n;
    ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
      l,
    ).UpdateRefreshTime(e.cDs),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneGameplay",
          19,
          "玩法开启时间更新",
          ["id", l],
          ["OpenTime", e.cDs],
        );
  });
//# sourceMappingURL=LevelPlayController.js.map
