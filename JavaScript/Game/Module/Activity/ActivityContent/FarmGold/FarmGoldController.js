"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FarmGoldController = void 0);
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityInstanceEntranceData_1 = require("../../View/InstanceEntrance/ActivityInstanceEntranceData"),
  FarmGoldData_1 = require("./FarmGoldData"),
  FarmGoldSubView_1 = require("./FarmGoldSubView");
class FarmGoldController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.fSn = () => {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsFarmGoldInstanceDungeon() &&
          FarmGoldController.RequestExitDungeon();
      }),
      (this.Pwl = (e) => {
        var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          e.w6n,
        );
        t.RefreshLevelData(e.uE_),
          t.PhraseRewardInfo(),
          UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
              t.GetRewardViewData(),
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.FarmGoldRefreshRewardRedDot,
            e.w6n,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.w6n,
          );
      }),
      (this.xwl = (e) => {
        var t = e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs,
          n =
            (t &&
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                22009,
              ),
            {
              ButtonTextId: "ConfirmBox_217_ButtonText_0",
              DescriptionTextId: void 0,
              IsTimeDownCloseView: !1,
              IsClickedCloseView: !0,
              OnClickedCallback: function () {
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
              },
            }),
          r = {
            ButtonTextId: "ConfirmBox_217_ButtonText_1",
            DescriptionTextId: "FarmGoldHighestPoint",
            DescriptionArgs: [e.rMs.toString()],
            IsTimeDownCloseView: !1,
            IsClickedCloseView: !1,
            OnClickedCallback: function () {
              var e =
                ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
              if (0 !== e.length) {
                var t = [];
                for (const n of e) t.push(n.GetConfigId);
                InstanceDungeonController_1.InstanceDungeonController.SingleInstReChallengeRequest(
                  t,
                );
              }
            },
          },
          o = {
            TitleTextId: "FarmGoldCurrentPoint",
            Record: e.iMs.toString(),
            IsNewRecord: e.iMs > e.rMs,
          };
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          t
            ? ItemRewardDefine_1.FARM_GOLD_FAIL
            : ItemRewardDefine_1.FARM_GOLD_SUCCESS,
          !t && e.tMs,
          void 0,
          t ? void 0 : o,
          void 0,
          t ? [n] : [n, r],
          void 0,
          void 0,
          void 0,
        );
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_FarmGoldMain";
  }
  OnCreateSubPageComponent(e) {
    return new FarmGoldSubView_1.FarmGoldSubView();
  }
  OnCreateActivityData(e) {
    return new FarmGoldData_1.FarmGoldData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      this.fSn,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
      this.fSn,
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(19435, this.Pwl), Net_1.Net.Register(22009, this.xwl);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19435), Net_1.Net.UnRegister(22009);
  }
  static RequestExitDungeon() {
    var e = new Protocol_1.Aki.Protocol.u0_();
    Net_1.Net.Call(15496, e, (e) => {
      e ||
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
    });
  }
  static RequestFarmGoldPoint(t, n) {
    var e = Protocol_1.Aki.Protocol.n0_.create();
    (e.w6n = t),
      (e.s5n = n),
      Net_1.Net.Call(17159, e, (e) => {
        e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              24569,
            )
          : e &&
            e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
            ((e =
              ModelManager_1.ModelManager.ActivityModel.GetActivityById(
                t,
              )).AddFinishPointId(n),
            UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
                e.GetRewardPopUpViewData(),
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.FarmGoldRefreshRewardRedDot,
              t,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              t,
            ));
      });
  }
  static RequestFarmGoldLevelPlay(t, n) {
    var e = Protocol_1.Aki.Protocol.a0_.create();
    (e.w6n = t),
      (e.r6n = n),
      Net_1.Net.Call(24950, e, (e) => {
        e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              25005,
            )
          : e &&
            e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
            ((e =
              ModelManager_1.ModelManager.ActivityModel.GetActivityById(
                t,
              )).FinishLevelReward(n),
            UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
                e.GetRewardPopUpViewData(),
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.FarmGoldRefreshRewardRedDot,
              t,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              t,
            ));
      });
  }
  static async OpenDefaultFarmGoldView() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values())
      if (e instanceof FarmGoldData_1.FarmGoldData)
        return this.OpenFarmGoldEntranceView(e.Id);
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 27, "找不到FarmGold活动"),
      !1
    );
  }
  static async OpenFarmGoldEntranceView(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      e.Id,
    );
    const t = new CustomPromise_1.CustomPromise();
    e = this.wwl(e);
    return (
      UiManager_1.UiManager.OpenView("ActivityInstanceEntranceView", e, (e) => {
        t.SetResult(e);
      }),
      t.Promise
    );
  }
  static OpenTempFarmGoldEntranceView() {
    var e = this.Bwl(),
      e = this.wwl(e);
    UiManager_1.UiManager.OpenView("ActivityInstanceEntranceView", e);
  }
  static Bwl() {
    var e = new FarmGoldData_1.FarmGoldData(),
      t = new Protocol_1.Aki.Protocol.fks(),
      n =
        ((t.s5n = 100805001),
        (t.h5n = 33),
        (t.bwl = new Protocol_1.Aki.Protocol.bwl()),
        (t.bwl.qwl = []),
        ConfigManager_1.ConfigManager.FarmGoldConfig.GetAllFarmGoldActivity());
    for (const o of n) {
      var r = new Protocol_1.Aki.Protocol.ww_();
      (r.r6n = o.InstId),
        (r.Eps = 0),
        (r.Mps = 0),
        (r.Sps = !0),
        (r.Gwl = !1),
        (r.ljn = 1),
        t.bwl.uE_.push(r);
    }
    return e.Init(t), e.Phrase(t), e;
  }
  static wwl(n) {
    var e = n.GetCurrentFullScore(),
      e = ActivityInstanceEntranceData_1.ActivityEntrancePointData.Create(
        e,
        0,
        "FarmGoldReward",
        n.Id,
        n.GetRewardViewData(),
        () => n.GetScoreDesc(),
        () => {
          UiManager_1.UiManager.OpenView(
            "ActivityRewardPopUpView",
            n.GetRewardPopUpViewData(),
            (e, t) => {
              UiManager_1.UiManager.GetViewByName(
                "ActivityInstanceEntranceView",
              )?.AddChildViewById(t);
            },
          );
        },
      ),
      t = ActivityInstanceEntranceData_1.ActivityEntranceDescInfoData.Create(
        (e) => n.GetLevelNameTextByIndex(e),
        (e) => n.GetLevelDescTextByIndex(e),
        (e) => n.GetLevelRecommendElementByIndex(e),
      ),
      r =
        ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldEntranceName(),
      o =
        ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldEntranceSpritePath(),
      a =
        ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldEntranceHelpId(),
      r = ActivityInstanceEntranceData_1.ActivityEntranceCaptionItemData.Create(
        r,
        o,
        a,
      ),
      i = new Array(),
      _ = n.GetAllLevelData().length;
    for (let e = 0; e < _; e++) {
      var l =
        ActivityInstanceEntranceData_1.ActivityEntranceSelectItemBaseData.Create(
          e,
          e,
          void 0,
          (e) => n.GetLevelNameTextByIndex(e),
          (e) => n.GetLevelDescTextByIndex(e),
          (e) => n.GetLevelSubTitleTextByIndex(e),
          (e) => n.GetLevelLockStateByIndex(e),
          (e) => n.GetLevelInstanceDungeonIdByIndex(e),
          (e) => n.GetLevelUnlockTextByIndex(e),
          (e) => n.GetLevelFinishStateByIndex(e),
          (e) => n.GetLevelRecommendLevelByIndex(e),
          (e) => n.GetLevelDifficultIndexByIndex(e),
          (e) => n.GetLevelBgByIndex(e),
          (e) => {
            n.GetLevelDataByIndex(e)?.SaveOpenState();
          },
          (e) => n.GetLevelRedDotStateByIndex(e),
        );
      i.push(l);
    }
    const c =
        ActivityInstanceEntranceData_1.ActivityEntranceSelectItemData.Create(i),
      s =
        ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldAllDifficult();
    var v = s.length,
      d = new Array();
    for (let e = 0; e < v; e++) {
      var m =
        ActivityInstanceEntranceData_1.ActivityEntranceDropDownContentData.Create(
          e,
          (e) => {
            e = s[e].Id;
            return n.GetDifficultTogText(e);
          },
          (e) => {
            e = s[e].Id;
            return n.GetDifficultTitle(e);
          },
          (e) => {
            e = s[e].Id;
            return n.GetDifficultRecommendLevel(e);
          },
          (e, t) => {
            (t = s[t].Id),
              (e = e
                .GetActivityEntranceSelectItemData()
                .GetCurrentSelectData()
                .GetInstanceDungeonId());
            this.RequestSetDifficulty(n.Id, e, t);
          },
        );
      d.push(m);
    }
    (o = c.GetCurrentSelectData().GetInstanceDungeonId()),
      (a = n.GetLevelInfoByInstId(o)),
      (o = ActivityInstanceEntranceData_1.ActivityEntranceDropDownData.Create(
        d,
        a.GetSelectDifficultIndex(),
      )),
      (a =
        ActivityInstanceEntranceData_1.ActivityEntranceMonsterPreviewData.Create(
          (e) => {
            return n.GetLevelDataByIndex(e).GetMonsterTips();
          },
          (e) => {
            return n.GetLevelDataByIndex(e).GetMonsterPreviewState();
          },
          (e) => {
            return n.GetLevelDataByIndex(e).GetInstId();
          },
          (e) => {
            e = n.GetLevelDataByIndex(e);
            UiManager_1.UiManager.OpenView(
              "InstanceDungeonMonsterPreView",
              e?.GetInstId(),
            );
          },
        ));
    return ActivityInstanceEntranceData_1.ActivityInstanceEntranceData.Create(
      e,
      t,
      c,
      r,
      o,
      a,
      () => {
        var e = c.GetCurrentSelectData();
        e && (e = n.GetLevelDataByIndex(e.GetSelectDataIndex())) && this.qDc(e);
      },
    );
  }
  static qDc(e) {
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue = !1;
    var t = e.GetInstId();
    if (
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(
        t,
      ) &&
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.HasDungeonArchive(
        t,
      )
    )
      return (
        ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
          281,
        )).IsEscViewTriggerCallBack = !1),
        t.FunctionMap.set(2, () => {
          (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue =
            !0),
            this.GDc(e);
        }),
        t.FunctionMap.set(1, () => {
          this.GDc(e);
        }),
        t.FunctionMap.set(-1, () => {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        }),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          t,
        )
      );
    this.GDc(e);
  }
  static GDc(e) {
    var t = e.GetInstId();
    (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = t),
      (FarmGoldData_1.FarmGoldData.CurrentSelectEntranceId =
        e.GetInstanceEntranceId()),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId =
        e.GetInstanceEntranceId()),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
  }
  static CheckInFarmGold() {
    return (
      25 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        )?.InstSubType &&
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
    );
  }
}
(exports.FarmGoldController = FarmGoldController).RequestSetDifficulty = (
  t,
  n,
  r,
) => {
  var e = Protocol_1.Aki.Protocol.e0_.create();
  (e.w6n = t),
    (e.r6n = n),
    (e.z6n = r),
    Net_1.Net.Call(15811, e, (e) => {
      e &&
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          25005,
        ),
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          t,
        ).SetInsDifficult(n, r),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel,
        );
    });
};
//# sourceMappingURL=FarmGoldController.js.map
