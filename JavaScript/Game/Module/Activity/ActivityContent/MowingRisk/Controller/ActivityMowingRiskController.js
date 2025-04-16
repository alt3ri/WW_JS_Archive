"use strict";
var _a;
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
  Proto_RiskHarvestInstRewardRequest = Protocol_1.Aki.Protocol.Om_,
  Proto_RiskHarvestScoreRewardRequest = Protocol_1.Aki.Protocol.Gm_,
  Proto_RiskHarvestStarRewardRequest = Protocol_1.Aki.Protocol.uU_;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  ItemRewardController_1 = require("../../../../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../../../../ItemReward/ItemRewardDefine");
var Proto_RiskHarvestSettleRequest = Protocol_1.Aki.Protocol.If_;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  RiskHarvestInstById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstById"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class ActivityMowingRiskController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.Dnh = new CustomPromise_1.CustomPromise()),
      (this.gVa = (e) => {
        this.fVa(e),
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
            (ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestEndNotify(
              e,
            ),
            this.Anh(e));
      }),
      (this.pVa = (e) => {
        this.fVa(e),
          ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestInstUpdateNotify(
            e,
          );
      }),
      (this.vVa = (e) => {
        this.fVa(e),
          ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestArtifactNotify(
            e,
          );
      }),
      (this.MVa = (e) => {
        this.fVa(e);
        var t = ModelManager_1.ModelManager.MowingRiskModel;
        t.SyncProtocolRiskHarvestBuffUpdateNotify(e),
          this.Rnh(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskInBattleRootUpdate,
            t.BuildInBattleRootData(),
          );
      }),
      (this.yVa = (e) => {
        this.fVa(e),
          ModelManager_1.ModelManager.MowingRiskModel.SyncProtocolRiskHarvestBuffUnlockNotify(
            e,
          );
      }),
      (this.EVa = (e) => {
        this.fVa(e);
        var t = ModelManager_1.ModelManager.MowingRiskModel;
        t.SyncProtocolRiskHarvestActivityUpdateNotify(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnNeedRefreshByProtocol,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityViewRefreshCurrent,
            t.ActivityData.Id,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            t.ActivityData.Id,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot,
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
            !1),
          ModelManager_1.ModelManager.MowingRiskModel.ResetCacheInBattle());
      }),
      (this.yRa = () => {
        this.CheckInInstanceDungeon() &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MowingRisk", 64, "局内局内局内的起点"),
          (ModelManager_1.ModelManager.DeadReviveModel.HandleOnClickGiveUpExternal =
            () => {
              this.RequestRiskHarvestSettleRequest();
            }),
          (InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.IsSettleExternalProcess =
            !0),
          this.Dnh.SetResult());
      }),
      (this.Unh = () => {
        this.Rnh();
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
    Net_1.Net.Register(26124, this.gVa),
      Net_1.Net.Register(27498, this.pVa),
      Net_1.Net.Register(27658, this.vVa),
      Net_1.Net.Register(16983, this.MVa),
      Net_1.Net.Register(18643, this.yVa),
      Net_1.Net.Register(17219, this.EVa);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26124),
      Net_1.Net.UnRegister(27498),
      Net_1.Net.UnRegister(27658),
      Net_1.Net.UnRegister(16983),
      Net_1.Net.UnRegister(18643),
      Net_1.Net.UnRegister(17219);
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
        this.yRa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MowingRiskOnBuffTipsAfterDestroy,
        this.Unh,
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
        this.yRa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MowingRiskOnBuffTipsAfterDestroy,
        this.Unh,
      );
  }
  GetActivityLevelUnlockState(e) {
    return ModelManager_1.ModelManager.MowingRiskModel.IsInstanceUnlockedByInstanceId(
      e,
    );
  }
  async RequestRiskHarvestInstRewardRequest(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MowingRisk",
        64,
        "RequestRiskHarvestInstRewardRequest:" + e,
      );
    var t = Proto_RiskHarvestInstRewardRequest.create(),
      t = ((t.s5n = e), await Net_1.Net.CallAsync(17304, t));
    void 0 !== t &&
      (t.Q4n !== Proto_ErrorCode.KRs
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MowingRisk",
              64,
              "请求失败，关卡奖励：RiskHarvestInstRewardRequest---" + t.Q4n,
            ),
          t.Q4n === Proto_ErrorCode.Proto_ErrRiskHarvestActivityNotOpen
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "MowingRiskActivityNotOpenForReward",
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.Q4n,
                21255,
              ))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "MowingRisk",
              64,
              `RequestRiskHarvestInstRewardRequest:${e}--Success`,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.MowingRiskModel.ActivityData.Id,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnGetReward,
          )));
  }
  async RequestRiskHarvestScoreRewardRequest(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MowingRisk",
        64,
        "RequestRiskHarvestScoreRewardRequest:" + e,
      );
    var t = Proto_RiskHarvestScoreRewardRequest.create(),
      t = ((t.s5n = e), await Net_1.Net.CallAsync(18172, t));
    void 0 !== t &&
      (t.Q4n !== Proto_ErrorCode.KRs
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MowingRisk",
              64,
              "请求失败，积分奖励：RiskHarvestScoreRewardRequest---" + t.Q4n,
            ),
          t.Q4n === Proto_ErrorCode.Proto_ErrRiskHarvestActivityNotOpen
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "MowingRiskActivityNotOpenForReward",
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.Q4n,
                26950,
              ))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "MowingRisk",
              64,
              `RequestRiskHarvestScoreRewardRequest:${e}--Success`,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.MowingRiskModel.ActivityData.Id,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnGetReward,
          )));
  }
  async RequestRiskHarvestStarRewardRequest(e, t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MowingRisk",
        64,
        "RequestRiskHarvestStarRewardRequest:" + e,
      );
    var o = Proto_RiskHarvestStarRewardRequest.create(),
      t = ((o.s5n = e), (o.c5n = t), await Net_1.Net.CallAsync(15946, o));
    void 0 !== t &&
      (t.Q4n !== Proto_ErrorCode.KRs
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MowingRisk",
              43,
              "请求失败，阶段奖励：RequestRiskHarvestStarRewardRequest---" +
                t.Q4n,
            ),
          t.Q4n === Proto_ErrorCode.Proto_ErrRiskHarvestActivityNotOpen
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "MowingRiskActivityNotOpenForReward",
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.Q4n,
                23747,
              ))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "MowingRisk",
              43,
              `请求失败，阶段奖励：RequestRiskHarvestStarRewardRequest:${e}--Success`,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnRefreshRewardRedDot,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.MowingRiskModel.ActivityData.Id,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingRiskOnGetReward,
          )));
  }
  async RequestRiskHarvestSettleRequest() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MowingRisk", 64, "请求请求请求结算");
    var e = Proto_RiskHarvestSettleRequest.create(),
      e = await Net_1.Net.CallAsync(19001, e);
    void 0 !== e &&
      (e.Q4n !== Proto_ErrorCode.KRs
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MowingRisk",
            64,
            "请求失败，退出请求结算：RequestRiskHarvestSettleRequest---" +
              e.Q4n,
          )
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MowingRisk", 64, "请求请求请求结算--Success"));
  }
  fVa(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MowingRisk",
        64,
        "割草冒险Notify:" + e.constructor.name,
        ["msg", e],
      );
  }
  Rnh() {
    var e, t, o;
    !UiManager_1.UiManager.IsViewOpen("MowingBuffNewBuffTipsView") &&
      this.CheckInInstanceDungeon() &&
      (t = (e = ModelManager_1.ModelManager.MowingRiskModel).NextNewBuffId) &&
      ((o = e.BuildNewBuffTipsDataById(t)),
      UiManager_1.UiManager.OpenView("MowingBuffNewBuffTipsView", o),
      e.IsSuperBuffById(t)) &&
      (this.xnh(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MowingRiskOnNeedPlayLevelUpSequence,
      ));
  }
  xnh(e) {
    var t =
      ModelManager_1.ModelManager.MowingRiskModel.BuildInBattleBuffDataById(e);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MowingRisk",
        64,
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
  async Anh(e) {
    await this.Pnh(),
      RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(e.s5n)
        .Accumulate
        ? this.TU_(e)
        : this.bU_(e);
  }
  TU_(e) {
    var t = {
        ButtonTextId: "riskofrain_UIBacktoworld",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !0,
        OnClickedCallback: function () {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        },
      },
      o = {
        ButtonTextId: "ConfirmBox_133_ButtonText_1",
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: function () {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon();
        },
        DescriptionTextId: void 0,
      },
      i = ModelManager_1.ModelManager.MowingRiskModel.GetMaxScoreById(e.s5n),
      i = {
        DetailScoreDataList: [
          { DescTextId: "RiskHarvest_Timepoint", ScoreText: e.pM_.toString() },
          {
            DescTextId: "RiskHarvest_Monsterpoint",
            ScoreText: e.aE_.toString(),
          },
        ],
        TotalScoreDataList: [
          { DescTextId: "RiskHarvest_Score", ScoreText: e.Yma.toString() },
        ],
        CurScore: e.fU_,
        MaxScore: i,
      },
      r = 0 < e.pM_ ? void 0 : "riskofrain_UIFinish";
    ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
      e.eE_
        ? ItemRewardDefine_1.MOWING_RESULT
        : ItemRewardDefine_1.MOWING_ERROR_RESULT,
      e.eE_,
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
      void 0,
      void 0,
      i,
      r,
    );
  }
  bU_(e) {
    var t = {
        ButtonTextId: "riskofrain_UIBacktoworld",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !0,
        OnClickedCallback: function () {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        },
      },
      o = {
        ButtonTextId: "ConfirmBox_133_ButtonText_1",
        DescriptionTextId: "RiskHarvest_HistoryToppoint",
        DescriptionArgs: [
          ModelManager_1.ModelManager.MowingRiskModel.GetRecordScoreById(
            e.s5n,
          ).toString(),
        ],
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: function () {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon();
        },
      },
      i = ModelManager_1.ModelManager.MowingRiskModel.GetMaxScoreById(e.s5n),
      r = e.Yma,
      n = 0 < e.pM_ ? void 0 : "riskofrain_UIFinish";
    ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
      e.eE_
        ? ItemRewardDefine_1.MOWING_RESULT
        : ItemRewardDefine_1.MOWING_ERROR_RESULT,
      e.eE_,
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
            Target: [e.pM_.toString()],
            DescriptionTextId: "RiskHarvest_Timepoint",
            IsReached: !0,
          },
          {
            Target: [e.aE_.toString()],
            DescriptionTextId: "RiskHarvest_Monsterpoint",
            IsReached: !0,
          },
        ],
        IfNewRecord: !1,
        FullScore: r,
        RecordTextId: r < i ? "RiskHarvest_Score" : "RiskHarvest_Scorelimit",
      },
      void 0,
      void 0,
      n,
    );
  }
  async Pnh() {
    await this.Dnh.Promise, (this.Dnh = new CustomPromise_1.CustomPromise());
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
  static IsMowingRiskInstanceDungeon(e) {
    return (
      !!e &&
      22 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          ?.InstSubType
    );
  }
}
(exports.ActivityMowingRiskController = ActivityMowingRiskController),
  ((_a = ActivityMowingRiskController).GetInstanceSubtitleTextIdByInstanceId = (
    e,
  ) =>
    ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceSubtitleTextIdByInstanceId(
      e,
    )),
  (ActivityMowingRiskController.GetInstanceSubtitleArgsByInstanceId = (e) =>
    ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceSubtitleTextArgsByInstanceId(
      e,
    )),
  (ActivityMowingRiskController.CheckInstanceFinishedByInstanceId = (e) =>
    ModelManager_1.ModelManager.MowingRiskModel.CheckInstanceFinishedByInstanceId(
      e,
    )),
  (ActivityMowingRiskController.CheckInstanceUnlockByInstanceId = (e) =>
    ModelManager_1.ModelManager.MowingRiskModel.IsInstanceUnlockedByInstanceId(
      e,
    )),
  (ActivityMowingRiskController.GetInstanceLockTextIdByInstanceId = (e) =>
    ModelManager_1.ModelManager.MowingRiskModel.GetInstanceLockTextIdByInstanceId(
      e,
    )),
  (ActivityMowingRiskController.GetInstanceLockTextArgsByInstanceId = (e) =>
    ModelManager_1.ModelManager.MowingRiskModel.GetLockTextArgsByInstanceId(e)),
  (ActivityMowingRiskController.GetEntranceViewDefaultSelectData = (e) => {
    let t = 0,
      o = 0;
    for (var [i, r] of e) {
      t = i;
      for (const n of r)
        if (((o = n), !_a.CheckInstanceFinishedByInstanceId(n)))
          return { InstanceId: o, SeriesId: t };
    }
    return { InstanceId: o, SeriesId: t };
  });
//# sourceMappingURL=ActivityMowingRiskController.js.map
