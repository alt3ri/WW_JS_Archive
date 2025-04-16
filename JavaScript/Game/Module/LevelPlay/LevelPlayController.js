"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  ControllerWithAssistantBase_1 = require("../GeneralLogicTree/ControllerAssistant/ControllerWithAssistantBase"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapController_1 = require("../Map/Controller/MapController"),
  PowerController_1 = require("../Power/PowerController"),
  GuideLineAssistant_1 = require("../QuestNew/Controller/GuideLineAssistant"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  LevelPlayDefine_1 = require("./LevelPlayDefine"),
  assistantMap = { [0]: void 0 };
class LevelPlayController extends ControllerWithAssistantBase_1.ControllerWithAssistantBase {
  static OnRegisterNetEvent() {
    super.OnRegisterNetEvent(),
      Net_1.Net.Register(24704, LevelPlayController.Opi),
      Net_1.Net.Register(19355, LevelPlayController.kpi),
      Net_1.Net.Register(27614, LevelPlayController.Fpi),
      Net_1.Net.Register(15020, LevelPlayController.Vpi),
      Net_1.Net.Register(19122, LevelPlayController.Hpi),
      Net_1.Net.Register(27174, LevelPlayController.jpi),
      Net_1.Net.Register(17464, LevelPlayController.oja);
  }
  static OnUnRegisterNetEvent() {
    super.OnRegisterNetEvent(),
      Net_1.Net.UnRegister(24704),
      Net_1.Net.UnRegister(19355),
      Net_1.Net.UnRegister(27614),
      Net_1.Net.UnRegister(15020),
      Net_1.Net.UnRegister(19122),
      Net_1.Net.UnRegister(27174),
      Net_1.Net.UnRegister(17464);
  }
  static OnAddEvents() {
    super.OnAddEvents(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AnyCharGravityDirectChanged,
        LevelPlayController.QVc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        LevelPlayController.dLe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AnyCharGravityDirectChanged,
      LevelPlayController.QVc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        LevelPlayController.dLe,
      ),
      super.OnRemoveEvents();
  }
  static RegisterAssistant() {
    this.AddAssistant(
      0,
      new GuideLineAssistant_1.GuideLineAssistant(
        Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay,
      ),
    );
  }
  static cYt(e) {
    if (this.Assistants) return this.Assistants.get(e);
  }
  static OnInit() {
    return this.InitTickOptimize(60, 120), super.OnInit();
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
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: 10,
        MarkId: e,
        Track: !1,
      });
  }
  static ReceiveReward(r, o) {
    if (!ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward) {
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
      if (a) {
        a = a.Entity.GetComponent(0).GetPbDataId();
        const n =
          ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfoByRewardEntityId(
            a,
          );
        if (n) {
          a =
            ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(
              n.RewardId,
            );
          if (a && a.Cost) {
            const i = a.Cost.get(5);
            let e =
                !(ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward =
                  !0),
              l = void 0;
            if (0 < o) {
              const n =
                ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(o);
              n &&
                "SilentArea" === n.LevelPlayType &&
                (l =
                  ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
                    [3],
                    !1,
                  )) &&
                0 < l.LeftUpCount &&
                (e = !0);
            }
            o = 0 < a.SharedId;
            if (a.SharedId === LevelPlayDefine_1.WEEK_SHARE_ID) {
              var t =
                ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
                  a.SharedId,
                );
              if (
                ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
                  a.SharedId,
                ) <= t
              )
                return (
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "Week_InstanceDungeonRewardTimeNotEnough_Text",
                  ),
                  void (ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward =
                    !1)
                );
            }
            !e &&
            !o &&
            ModelManager_1.ModelManager.FunctionModel.IsOpen(10071) &&
            CommonParamById_1.configCommonParamById
              .GetIntArrayConfig("MultiExchangeLevelPlayType")
              ?.includes(n.LevelPlayTypeNumber)
              ? ((a = {
                  SinglePowerCost: i,
                  RewardCallBack: (e) => {
                    LevelPlayController.RequestReceiveReward(r, e, n);
                  },
                  NeedResetLevelPlayModelRewardFlag: !0,
                }),
                UiManager_1.UiManager.OpenView(
                  "PowerMagnificationRewardPopView",
                  a,
                ))
              : (((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  64,
                )).ShowPowerItem = !0),
                (t.CanExecuteCloseFunc = (e) =>
                  2 !== e ||
                  ModelManager_1.ModelManager.PowerModel.IsPowerEnough(i)),
                t.SetTextArgs(i.toString()),
                t.FunctionMap.set(2, () => {
                  LevelPlayController.Qpi(i) &&
                    LevelPlayController.RequestReceiveReward(r, 1, n);
                }),
                (t.DestroyFunction = () => {
                  ModelManager_1.ModelManager.LevelPlayModel.IsInReceiveReward =
                    !1;
                }),
                e && l && (t.Tip = l.GetFullTip()),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  t,
                ));
          }
        }
      }
    }
  }
  static RequestReceiveReward(e, l, r) {
    e = Protocol_1.Aki.Protocol.Jns.create({
      F4n: MathUtils_1.MathUtils.NumberToLong(e),
      Cal: l,
    });
    (ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId =
      r.Id),
      Net_1.Net.Call(18536, e, (e) => {
        (ModelManager_1.ModelManager.ActivityRegressModel.LastUnGetRewardLevelPlayId = 0),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ((e =
                ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                  e.Q4n,
                )),
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                e,
              ))
            : r.UpdateCanGetReward(!1);
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
  static KVc() {
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
      GlobalData_1.GlobalData.World,
      UE.KuroLevelPlaySubsystem.StaticClass(),
    );
    e?.IsValid() && e.ProcessAllItems();
  }
}
((exports.LevelPlayController = LevelPlayController).OnTick = (e) => {
  ModelManager_1.ModelManager.GeneralLogicTreeModel.IsWakeUp &&
    (LevelPlayController.Wpi(), LevelPlayController.cYt(0)?.Tick(e));
}),
  (LevelPlayController.Opi = (e) => {
    for (const r of e.Dxs) {
      var l =
        ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
          r.s5n,
        );
      l.UpdateState(r.Y4n),
        l.UpdateFirstPass(r.vDs),
        l.UpdateRefreshTime(r.Lxs),
        l.IsClose &&
          void 0 !== l.MarkConfig &&
          0 < l.MarkConfig.MarkId &&
          LevelPlayController.Kpi(l.MarkConfig.MarkId),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneGameplay",
            18,
            "下发已开启的玩法",
            ["玩法id", r.s5n],
            ["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[r.Y4n]],
            ["是否首通", r.vDs],
            ["开启时间", r.Lxs],
          );
    }
  }),
  (LevelPlayController.kpi = (e) => {
    var l,
      e = e.s5n,
      r =
        ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
          e,
        );
    r
      ? (r.UpdateFirstPass(!0),
        r.FirstRewardId &&
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
            Log_1.Log.Info("SceneGameplay", 33, "开始执行玩法首通动作"),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
            l,
            LevelGeneralContextDefine_1.LevelPlayContext.Create(r.Id),
          )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneGameplay", 18, "玩法首通信息推送", ["id", e]))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("SceneGameplay", 18, "玩法首通时，玩法不存在", [
          "玩法Id",
          e,
        ]);
  }),
  (LevelPlayController.Fpi = (e) => {
    var l = e.s5n;
    switch (e.Y4n) {
      case 1:
      case 2:
        var r =
          ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(l);
        r.UpdateState(e.Y4n),
          ModelManager_1.ModelManager.WorldMapModel?.CheckGamePlayIsTracked(r);
        break;
      case 0:
        r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(l);
        r &&
          (ModelManager_1.ModelManager.LevelPlayModel.LevelPlayClose(r),
          r.MarkConfig) &&
          0 < r.MarkConfig.MarkId &&
          LevelPlayController.Kpi(r.MarkConfig.MarkId);
        break;
      case 3:
        ModelManager_1.ModelManager.LevelPlayModel.LevelPlayFinish(l);
    }
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "SceneGameplay",
        18,
        "玩法状态改变",
        ["玩法id", l],
        ["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[e.Y4n]],
      );
  }),
  (LevelPlayController.Hpi = (e) => {
    var l = e.s5n;
    let r =
      ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(l);
    (r =
      r ||
      ModelManager_1.ModelManager.LevelPlayModel.EnterLevelPlayRange(
        l,
      )).UpdateState(e.Y4n),
      r.UpdateCanGetReward(e.Txs);
    e = r.LevelPlayEnterAction;
    r.CanExecOpenAction &&
      e &&
      0 < e.length &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneGameplay",
          33,
          "开始执行玩法进入动作(Finish状态下不会执行)",
        ),
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
        e,
        LevelGeneralContextDefine_1.LevelPlayContext.Create(r.Id),
      )),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneGameplay", 18, "玩法进入", ["id", l]);
  }),
  (LevelPlayController.jpi = (e) => {
    e = e.s5n;
    ModelManager_1.ModelManager.LevelPlayModel.LeaveLevelPlayRange(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneGameplay", 18, "玩法离开", ["id", e]);
  }),
  (LevelPlayController.oja = (e) => {
    var l,
      r = e.s5n,
      e = MathUtils_1.MathUtils.LongToNumber(e.ZLs),
      e = Math.floor(e - TimeUtil_1.TimeUtil.GetServerTime());
    e <= 0 ||
      ((l =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Levelplay_reflesh",
        )),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
        StringUtils_1.StringUtils.Format(l, e.toString()),
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneGameplay",
          65,
          "多人联机获奖提示",
          ["id", r],
          ["countdown", e],
        ));
  }),
  (LevelPlayController.Vpi = (e) => {
    var l = e.s5n;
    ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
      l,
    ).UpdateRefreshTime(e.pDs),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneGameplay",
          18,
          "玩法开启时间更新",
          ["id", l],
          ["OpenTime", e.pDs],
        );
  }),
  (LevelPlayController.QVc = (e, l, r) => {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    o?.Valid
      ? o.Entity === e && LevelPlayController.KVc()
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "LevelPlay",
          72,
          "[OnAnyCharGravityDirectChanged] 玩家实体无效",
        );
  }),
  (LevelPlayController.dLe = () => {
    LevelPlayController.KVc();
  });
//# sourceMappingURL=LevelPlayController.js.map
