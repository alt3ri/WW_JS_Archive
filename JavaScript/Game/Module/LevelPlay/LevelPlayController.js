"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapController_1 = require("../Map/Controller/MapController"),
  PowerController_1 = require("../Power/PowerController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  LevelPlayDefine_1 = require("./LevelPlayDefine"),
  INTERVAL_TIME = 1e3;
class LevelPlayController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.qfi(), !0;
  }
  static OnClear() {
    return this.Gfi(), !0;
  }
  static qfi() {
    Net_1.Net.Register(9061, LevelPlayController.Nfi),
      Net_1.Net.Register(25069, LevelPlayController.Ofi),
      Net_1.Net.Register(29337, LevelPlayController.kfi),
      Net_1.Net.Register(18070, LevelPlayController.Ffi),
      Net_1.Net.Register(3462, LevelPlayController.Vfi),
      Net_1.Net.Register(26610, LevelPlayController.Hfi);
  }
  static Gfi() {
    Net_1.Net.UnRegister(9061),
      Net_1.Net.UnRegister(25069),
      Net_1.Net.UnRegister(29337),
      Net_1.Net.UnRegister(18070),
      Net_1.Net.UnRegister(3462),
      Net_1.Net.UnRegister(26610);
  }
  static jfi() {
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
  static Wfi(e) {
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
            if (LevelPlayController.Kfi(a)) {
              r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(64);
              if (
                (r.SetTextArgs(a.toString()),
                r.FunctionMap.set(2, () => {
                  LevelPlayController.Kfi(a) &&
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
    e = Protocol_1.Aki.Protocol.Qts.create({
      rkn: MathUtils_1.MathUtils.NumberToLong(e),
    });
    Net_1.Net.Call(14578, e, (e) => {
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
        ? ((e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
            e.lkn,
          )),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e))
        : l.UpdateCanGetReward(!1);
    });
  }
  static Kfi(e) {
    return (
      !!ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e) ||
      ((e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "ReceiveLevelPlayPowerNotEnough",
      )),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e),
      PowerController_1.PowerController.OpenPowerView(),
      !1)
    );
  }
}
((exports.LevelPlayController = LevelPlayController).e8 = 0),
  (LevelPlayController.OnTick = (e) => {
    (LevelPlayController.e8 += e),
      LevelPlayController.e8 >= INTERVAL_TIME &&
        ((LevelPlayController.e8 -= INTERVAL_TIME), LevelPlayController.jfi());
  }),
  (LevelPlayController.Nfi = (e) => {
    for (const r of e.iAs) {
      var l =
        ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
          r.Ekn,
        );
      l.UpdateState(r.ckn),
        l.UpdateFirstPass(r.Wys),
        l.UpdateRefreshTime(r.eAs),
        l.IsClose &&
          void 0 !== l.MarkConfig &&
          0 < l.MarkConfig.MarkId &&
          LevelPlayController.Wfi(l.MarkConfig.MarkId),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneGameplay",
            19,
            "下发已开启的玩法",
            ["玩法id", r.Ekn],
            ["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[r.ckn]],
            ["是否首通", r.Wys],
            ["开启时间", r.eAs],
          );
    }
  }),
  (LevelPlayController.Ofi = (e) => {
    var l,
      e = e.Ekn,
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
  (LevelPlayController.kfi = (e) => {
    var l = e.Ekn;
    switch (e.ckn) {
      case 1:
      case 2:
        ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
          l,
        ).UpdateState(e.ckn);
        break;
      case 0:
        var r = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(l);
        r &&
          (ModelManager_1.ModelManager.LevelPlayModel.LevelPlayClose(r),
          r.MarkConfig) &&
          0 < r.MarkConfig.MarkId &&
          LevelPlayController.Wfi(r.MarkConfig.MarkId);
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
        ["玩法状态", LevelPlayDefine_1.levelPlayStatusLogString[e.ckn]],
      );
  }),
  (LevelPlayController.Vfi = (e) => {
    var l = e.Ekn;
    let r =
      ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(l);
    (r =
      r ||
      ModelManager_1.ModelManager.LevelPlayModel.EnterLevelPlayRange(
        l,
      )).UpdateState(e.ckn),
      r.UpdateCanGetReward(e.ZDs);
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
  (LevelPlayController.Hfi = (e) => {
    e = e.Ekn;
    ModelManager_1.ModelManager.LevelPlayModel.LeaveLevelPlayRange(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneGameplay", 19, "玩法离开", ["id", e]);
  }),
  (LevelPlayController.Ffi = (e) => {
    var l = e.Ekn;
    ModelManager_1.ModelManager.LevelPlayModel.SafeCreateLevelPlayInfo(
      l,
    ).UpdateRefreshTime(e.Kys),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneGameplay",
          19,
          "玩法开启时间更新",
          ["id", l],
          ["OpenTime", e.Kys],
        );
  });
//# sourceMappingURL=LevelPlayController.js.map
