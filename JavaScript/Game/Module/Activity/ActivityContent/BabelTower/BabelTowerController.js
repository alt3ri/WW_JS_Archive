"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerController = void 0);
const BabelTowerLevelById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerLevelById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  BabelTowerData_1 = require("./BabelTowerData"),
  BabelTowerSubView_1 = require("./BabelTowerSubView");
class BabelTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.Gec = (e) => {
        var t = BabelTowerController.GetBabelTowerData();
        for (const r of e.QX_)
          (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
            r.ELl,
          ).IsDifficult
            ? t.HardLevelDataMap
            : t.NormalLevelDataMap
          ).set(r.ELl, r),
            t.RoleLockData.set(r.ELl, r.FX_);
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BabelTowerRefreshLevelInfo,
        );
      }),
      (this.Nec = (e) => {
        var t = BabelTowerController.GetBabelTowerData();
        for (const r of e.KX_) t.DeTermUnlock.set(r.HX_, r.$X_);
      }),
      (this.Vec = (e) => {
        var t = BabelTowerController.GetBabelTowerData();
        for (const r of e.XX_) t.BuffUnlock.set(r.WX_, r.$X_);
      }),
      (this.jec = (e) => {
        var t = BabelTowerController.GetBabelTowerData();
        for (const r of e.E$s) t.NormalQuest.set(r.s5n, r);
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BabelTowerRefreshQuestState,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            t.Id,
          );
      }),
      (this.Hec = (e) => {
        var t = BabelTowerController.GetBabelTowerData();
        for (const r of e.E$s) t.DailyQuest.set(r.s5n, r);
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BabelTowerRefreshQuestState,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            t.Id,
          );
      }),
      (this.$ec = (t) => {
        const a =
          ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData;
        if (a) {
          const c = a.LevelId;
          var r = a.CurStarNum;
          const v =
              BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(c),
            w = v.InstId;
          var o = v.PassStar,
            n = o <= r,
            l = t.JX_;
          const T = v.IsDifficult;
          if (l && T)
            (i = {
              LevelId: c,
              StarNum: r,
              PassDate: Number(MathUtils_1.MathUtils.LongToBigInt(t.Qxs)),
              PassTime: t.Y2s,
              TeamRoleIdList:
                ModelManager_1.ModelManager.SceneTeamModel.GetTeamRoleConfigIdList(),
              BuffIdList: a.BuffSelection,
              DeTermIdList: a.DeTermIdList,
            }),
              UiManager_1.UiManager.OpenView("BabelTowerSettlementView", i);
          else {
            let e = void 0;
            var i = l
              ? ItemRewardDefine_1.BABEL_TOWER_SUCCESS
              : ItemRewardDefine_1.BABEL_TOWER_FAIL;
            if (l) {
              l = {
                NewBabelBuffIds: t.xsc,
                NewBabelDeTermIds: t.Usc,
                StarTextParam: {
                  Params: [r, o],
                  TextKey: n
                    ? "Text_BabelResultOverStarNum_Text"
                    : "Text_BabelResultUnderStarNum_Text",
                },
                TipTextId: n
                  ? "Text_BabelResultOverStarTip_Text"
                  : "Text_BabelResultUnderStarTip_Text",
              };
              e = { ConfigId: i, IsSuccess: !0, BabelTowerSuccessData: l };
            } else {
              var s = [],
                r =
                  ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
              if (r)
                for (const e of r) {
                  var _ = { TrainingData: e };
                  s.push(_);
                }
              e = { ConfigId: i, IsSuccess: !1, ExploreBarDataList: s };
            }
            (o = []),
              (l =
                (o.push({
                  ButtonTextId: "Text_ButtonTextExit_Text",
                  DescriptionTextId: void 0,
                  IsTimeDownCloseView: !1,
                  IsClickedCloseView: !1,
                  OnClickedCallback: (e) => {
                    var t;
                    T
                      ? ((t = {
                          IfReturnToBabelTowerMainView: !0,
                          IfLeaveInstanceDungeonWhenMainViewClose: !0,
                        }),
                        UiManager_1.UiManager.OpenView(
                          "BabelTowerHardLevelChoseView",
                          t,
                        ))
                      : ((t = {
                          IfReturnToBabelTowerMainView: !0,
                          IfLeaveInstanceDungeonWhenMainViewClose: !0,
                        }),
                        UiManager_1.UiManager.OpenView(
                          "BabelTowerNormalLevelChoseView",
                          t,
                        ));
                  },
                }),
                !(t.JX_ && n)));
            l &&
              (o.push({
                ButtonTextId: "Text_ChallengeAgain_Text",
                DescriptionTextId: void 0,
                IsTimeDownCloseView: !1,
                IsClickedCloseView: !1,
                OnClickedCallback: () => {
                  var t =
                    UiManager_1.UiManager.GetViewByName(
                      "ExploreRewardView",
                    ).GetBottomToggleState();
                  if (t && 1 === t) {
                    let e = 0;
                    t = a.DeTermIdList;
                    if (t)
                      for (const o of t) {
                        var r =
                          ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(
                            o,
                          );
                        e += r.Star;
                      }
                    t = {
                      BabelTowerLevelId: c,
                      InstanceId: w,
                      RoleList:
                        BabelTowerController.GetTeamRoleConfigIdListWithFill(),
                      BuffList: a?.BuffSelection ?? [-1, -1],
                      BuffCount: v.OptionalBabelBuffNum,
                      StarNumber: e,
                    };
                    UiManager_1.UiManager.OpenView(
                      "BabelTowerLevelInfoView",
                      t,
                    );
                  } else BabelTowerController.ReChallengeBabelTower();
                },
              }),
              (e.StateToggle = {
                DescriptionTextId: "Text_ChangeFormation_Text",
              })),
              (e.ButtonInfoList = o),
              ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(
                e,
              );
          }
        }
      }),
      (this.Jcc = (e) => {
        ModelManager_1.ModelManager.BabelTowerModel.UpdateCurrentChallengeInstDataByNotify(
          e,
        );
      }),
      (this.qTc = (e) => {
        BabelTowerController.GetBabelTowerData().CurrentItemCount = e.ETc;
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityBabel";
  }
  OnCreateSubPageComponent(e) {
    return new BabelTowerSubView_1.BabelTowerSubView();
  }
  OnCreateActivityData(e) {
    return (
      (BabelTowerController.ActivityId = e.s5n),
      new BabelTowerData_1.BabelTowerData()
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(27359, this.Gec),
      Net_1.Net.Register(27821, this.Nec),
      Net_1.Net.Register(17118, this.Vec),
      Net_1.Net.Register(29538, this.jec),
      Net_1.Net.Register(23720, this.Hec),
      Net_1.Net.Register(21769, this.$ec),
      Net_1.Net.Register(21310, this.Jcc),
      Net_1.Net.Register(20458, this.qTc);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27359),
      Net_1.Net.UnRegister(27821),
      Net_1.Net.UnRegister(17118),
      Net_1.Net.UnRegister(29538),
      Net_1.Net.UnRegister(23720),
      Net_1.Net.UnRegister(21769),
      Net_1.Net.UnRegister(21310),
      Net_1.Net.UnRegister(20458);
  }
  OnAddEvents() {}
  OnRemoveEvents() {}
  static async SelectBabelActivityDeTermRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.BX_.create(),
      e = ((r.eY_ = e), (r.GX_ = t), await Net_1.Net.CallAsync(27123, r));
    return !(
      !e ||
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          23503,
        ),
        1))
    );
  }
  static BabelTowerTaskRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.TX_.create();
    (t.gps = e),
      Net_1.Net.Call(23094, t, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            16940,
          );
      });
  }
  static BabelTowerDailyTaskRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.LX_.create();
    (t.gps = e),
      Net_1.Net.Call(15281, t, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            27149,
          );
      });
  }
  static ResetBabelTowerLevelRequest(e) {
    var t = Protocol_1.Aki.Protocol.RX_.create();
    (t.eY_ = e),
      Net_1.Net.Call(18588, t, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                18827,
              )
            : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "BabelTowerResetLevelTips",
              ));
      });
  }
  static BabelTowerSettlementRequest() {
    var e = Protocol_1.Aki.Protocol.xX_.create();
    Net_1.Net.Call(21415, e, (e) => {
      e &&
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          17580,
        );
    });
  }
  static ReChallengeBabelTower() {
    var e =
        ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData,
      t = e.LevelId,
      r = BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(t).InstId,
      o = this.GetTeamRoleConfigIdListWithFill();
    this.BabelTowerStartRequest(r, o, t, e.BuffSelection ?? []);
  }
  static GetTeamRoleConfigIdListWithFill() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetTeamRoleConfigIdList();
    for (let e = t.length; e < 3; e++) t.push(0);
    return t;
  }
  static BabelTowerStartRequest(e, t, r, o) {
    r = { ELl: r, TLl: o };
    (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.iY_ =
      r),
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(
        e,
        t,
        0,
        0,
      );
  }
  static GetBabelTowerData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      BabelTowerController.ActivityId,
    );
  }
  static OnClickInstanceDungeonExitButton() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(276);
    e.IsEscViewTriggerCallBack = !1;
    e.FunctionMap.set(1, () => {
      UiManager_1.UiManager.OpenView("BabelTowerMainView", {
        IfLeaveInstanceDungeonWhenClose: !0,
      });
    }),
      e.FunctionMap.set(2, () => {
        this.ReChallengeBabelTower();
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  static SaveNewLevelData(e) {
    var t =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevel,
      ) ?? new Map();
    t.set(e, !0),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevel,
        t,
      );
  }
  static SaveNewLevelClickData(e, t) {
    var r =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevelHasClick,
      ) ?? new Map();
    r.set(e, !0),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevelHasClick,
        r,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BabelTowerLevelClick,
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BabelTowerDifficultyLevelClick,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.ActivityId,
      );
  }
}
(exports.BabelTowerController = BabelTowerController).ActivityId = 0;
//# sourceMappingURL=BabelTowerController.js.map
