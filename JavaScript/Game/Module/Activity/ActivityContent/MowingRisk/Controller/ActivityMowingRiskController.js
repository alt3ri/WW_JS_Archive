"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMowingRiskController = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  InstanceDungeonEntranceController_1 = require("../../../../InstanceDungeon/InstanceDungeonEntranceController"),
  ActivityControllerBase_1 = require("../../../ActivityControllerBase"),
  ActivityManager_1 = require("../../../ActivityManager"),
  ActivityMowingRiskSubView_1 = require("../View/ActivityMowingRiskSubView");
var Proto_ErrorCode = Protocol_1.Aki.Protocol.Q4n,
  Proto_RiskHarvestInstRewardRequest = Protocol_1.Aki.Protocol.keh,
  Proto_RiskHarvestScoreRewardRequest = Protocol_1.Aki.Protocol.Oeh;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  InstanceDungeonController_1 = require("../../../../InstanceDungeon/InstanceDungeonController"),
  ItemRewardController_1 = require("../../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../../ItemReward/ItemRewardDefine");
var Proto_RiskHarvestSettleRequest = Protocol_1.Aki.Protocol.Sth;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
class ActivityMowingRiskController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.XJa = new CustomPromise_1.CustomPromise()),
      (this.P5a = (e) => {
        this.w5a(e),
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
            (ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestEndNotify(
              e,
            ),
            this.YJa(e));
      }),
      (this.B5a = (e) => {
        this.w5a(e),
          ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestInstUpdateNotify(
            e,
          );
      }),
      (this.b5a = (e) => {
        this.w5a(e),
          ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestArtifactNotify(
            e,
          );
      }),
      (this.q5a = (e) => {
        this.w5a(e);
        var t = ModelManager_1.ModelManager.MowingRiskModel;
        t.SyncProtocolRiskHarvestBuffUpdateNotify(e),
          this.zJa(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskInBattleRootUpdate,
            t.BuildInBattleRootData(),
          );
      }),
      (this.G5a = (e) => {
        this.w5a(e),
          ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestBuffUnlockNotify(
            e,
          );
      }),
      (this.k5a = (e) => {
        this.w5a(e),
          ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestActivityUpdateNotify(
            e,
          );
      }),
      (this.uZs = () => {
        this.CheckInInstanceDungeon() && this.RequestRiskHarvestSettleRequest();
      }),
      (this.lZs = () => {}),
      (this._Zs = () => {
        this.CheckInInstanceDungeon() &&
          ((ModelManager_1.ModelManager.DeadReviveModel.HandleOnClickGiveUpExternal =
            void 0),
          (InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.IsSettleExternalProcess =
            !1));
      }),
      (this.vRa = () => {
        this.CheckInInstanceDungeon() &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MowingRisk", 65, "局内局内局内的起点"),
          (ModelManager_1.ModelManager.DeadReviveModel.HandleOnClickGiveUpExternal =
            () => {
              this.RequestRiskHarvestSettleRequest();
            }),
          (InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.IsSettleExternalProcess =
            !0),
          this.XJa.SetResult());
      }),
      (this.JJa = () => {
        this.zJa();
      });
  }
  static get Instance() {
    return ActivityManager_1.ActivityManager.GetActivityController(
      Protocol_1.Aki.Protocol.uks.Proto_RiskHarvest,
    );
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMowingRisk";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityMowingRiskSubView_1.ActivityMowingRiskSubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.MowingRiskModel.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(28790, this.P5a),
      Net_1.Net.Register(23773, this.B5a),
      Net_1.Net.Register(17020, this.b5a),
      Net_1.Net.Register(19856, this.q5a),
      Net_1.Net.Register(28879, this.G5a),
      Net_1.Net.Register(19171, this.k5a);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28790),
      Net_1.Net.UnRegister(23773),
      Net_1.Net.UnRegister(17020),
      Net_1.Net.UnRegister(19856),
      Net_1.Net.UnRegister(28879),
      Net_1.Net.UnRegister(19171);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EnterInstanceDungeon,
      this.lZs,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        this._Zs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        this.uZs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.vRa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MowingRiskOnBuffTipsAfterDestroy,
        this.JJa,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.EnterInstanceDungeon,
      this.lZs,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        this._Zs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        this.uZs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.vRa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MowingRiskOnBuffTipsAfterDestroy,
        this.JJa,
      );
  }
  async RequestRiskHarvestInstRewardRequest(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MowingRisk",
        65,
        "RequestRiskHarvestInstRewardRequest:" + e,
      );
    var t = Proto_RiskHarvestInstRewardRequest.create(),
      t = ((t.s5n = e), await Net_1.Net.CallAsync(18155, t));
    void 0 !== t &&
      (t.Q4n !== Proto_ErrorCode.KRs
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MowingRisk",
              65,
              "请求失败，关卡奖励：RiskHarvestInstRewardRequest---" + t.Q4n,
            ),
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            15284,
          ))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "MowingRisk",
              65,
              `RequestRiskHarvestInstRewardRequest:${e}--Success`,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot,
          )));
  }
  async RequestRiskHarvestScoreRewardRequest(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MowingRisk",
        65,
        "RequestRiskHarvestScoreRewardRequest:" + e,
      );
    var t = Proto_RiskHarvestScoreRewardRequest.create(),
      t = ((t.s5n = e), await Net_1.Net.CallAsync(28751, t));
    void 0 !== t &&
      (t.Q4n !== Proto_ErrorCode.KRs
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MowingRisk",
              65,
              "请求失败，积分奖励：RiskHarvestScoreRewardRequest---" + t.Q4n,
            ),
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            20362,
          ))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "MowingRisk",
              65,
              `RequestRiskHarvestScoreRewardRequest:${e}--Success`,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot,
          )));
  }
  async RequestRiskHarvestSettleRequest() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MowingRisk", 65, "请求请求请求结算");
    var e = Proto_RiskHarvestSettleRequest.create(),
      e = await Net_1.Net.CallAsync(24566, e);
    void 0 !== e &&
      (e.Q4n !== Proto_ErrorCode.KRs
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MowingRisk",
            65,
            "请求失败，退出请求结算：RequestRiskHarvestSettleRequest---" +
              e.Q4n,
          )
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MowingRisk", 65, "请求请求请求结算--Success"));
  }
  w5a(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MowingRisk",
        65,
        "割草冒险Notify:" + e.constructor.name,
        ["msg", e],
      );
  }
  zJa() {
    var e, t, o;
    !UiManager_1.UiManager.IsViewOpen("MowingBuffNewBuffTipsView") &&
      this.CheckInInstanceDungeon() &&
      (t = (e = ModelManager_1.ModelManager.MowingRiskModel).NextNewBuffId) &&
      ((o = e.BuildNewBuffTipsDataById(t)),
      UiManager_1.UiManager.OpenView("MowingBuffNewBuffTipsView", o),
      e.IsSuperBuffById(t)) &&
      (this.ZJa(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MowingRiskOnNeedPlayLevelUpSequence,
      ));
  }
  ZJa(e) {
    var t =
      ModelManager_1.ModelManager.MowingRiskModel.BuildInBattleBuffDataById(e);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "MowingRisk",
        65,
        `显示场内Buff 中心Tips，buff Id：${e}----` + t.TitleTextId,
      ),
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
        21,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0,
        t,
      );
  }
  async YJa(e) {
    await this.eZa();
    var t = {
        ButtonTextId: "ConfirmBox_133_ButtonText_0",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !0,
        OnClickedCallback: function () {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        },
      },
      o = {
        ButtonTextId: "ConfirmBox_133_ButtonText_1",
        DescriptionTextId: "MowingHighestPoint",
        DescriptionArgs: [e.Wma.toString()],
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: function () {
          var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
            t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
          if (0 !== t.length) {
            var o = [];
            for (const i of t) o.push(i.GetConfigId);
            InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
              e,
              o,
            );
          }
        },
      };
    ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
      e.Iih
        ? ItemRewardDefine_1.MOWING_RESULT
        : ItemRewardDefine_1.MOWING_ERROR_RESULT,
      e.Iih,
      void 0,
      void 0,
      void 0,
      [t, o],
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      {
        TargetReached: [
          {
            Target: [e.Pih.toString()],
            DescriptionTextId: "BossRushTimeScoreTips",
            IsReached: !0,
          },
          {
            Target: [e.Uih.toString()],
            DescriptionTextId: "BossRushMonsterScoreTips",
            IsReached: !0,
          },
        ],
        IfNewRecord: !1,
        FullScore: e.Wma,
        RecordTextId: "MowingCurrentPoint",
      },
    );
  }
  async eZa() {
    await this.XJa.Promise, (this.XJa = new CustomPromise_1.CustomPromise());
  }
  CheckInInstanceDungeon() {
    var e;
    return (
      !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      void 0 !==
        (e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon) &&
      22 === e.InstSubType
    );
  }
}
exports.ActivityMowingRiskController = ActivityMowingRiskController;
//# sourceMappingURL=ActivityMowingRiskController.js.map
