"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityVersionPreheatController = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../../ActivityControllerBase"),
  ActivityManager_1 = require("../../../ActivityManager"),
  VersionPreheatDefine_1 = require("../VersionPreheatDefine"),
  ActivityVersionPreheatSubView_1 = require("../View/ActivityVersionPreheatSubView");
var Proto_PreheatSignRewardRequest = Protocol_1.Aki.Protocol.kf_,
  Proto_ErrorCode = Protocol_1.Aki.Protocol.Q4n,
  Proto_PreheatSignSurveyInfoRequest = Protocol_1.Aki.Protocol.Of_;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  LogReportController_1 = require("../../../../LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../../LogReport/LogReportDefine");
class ActivityVersionPreheatController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.OCl = void 0),
      (this.HandleQuestDetailClickInReward = (e) => {
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) <
          Protocol_1.Aki.Protocol.hTs.a3_ &&
          UiManager_1.UiManager.OpenView("QuestView", e);
      }),
      (this.HandleVoteClickAsync = async (e, r) => {
        (this.OCl = new CustomPromise_1.CustomPromise()),
          await TimerSystem_1.TimerSystem.Wait(
            VersionPreheatDefine_1.VOTE_CLICK_DELAY,
          ),
          await this.RequestPreheatSignRewardRequest(e, r),
          await this.OCl.Promise,
          (this.OCl = void 0),
          await this.OpenTargetViewAsyncById(e, !1);
      }),
      (this.NCl = () => {
        this.OCl?.SetResult();
      });
  }
  static get Instance() {
    return ActivityManager_1.ActivityManager.GetActivityController(
      Protocol_1.Aki.Protocol.uks.Proto_PreheatSign,
    );
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityPreheatMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityVersionPreheatSubView_1.ActivityVersionPreheatSubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.VersionPreheatModel.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCloseRewardView,
      this.NCl,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCloseRewardView,
      this.NCl,
    );
  }
  async RequestPreheatSignRewardRequest(e, r) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "VersionPreheat",
        64,
        "RequestPreheatSignRewardRequest:" + e,
      );
    var t = Proto_PreheatSignRewardRequest.create(),
      r = ((t.M_l = e), (t.S_l = r), await Net_1.Net.CallAsync(17985, t));
    void 0 !== r &&
      (r.fMs !== Proto_ErrorCode.KRs
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "VersionPreheat",
              64,
              "预热作答失败：RequestPreheatSignRewardRequest---" + r.fMs,
            ),
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            r.fMs,
            21255,
          ))
        : void 0 === r.UM_
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "VersionPreheat",
              64,
              "预热作答response中没有SurveyInfo",
              ["TVersionPreheatId", e],
            )
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "VersionPreheat",
                64,
                "RequestPreheatSignRewardResponse",
                ["response", r],
              ),
            (t =
              ModelManager_1.ModelManager
                .VersionPreheatModel).SyncPreheatSignSurveyInfo(e, r.UM_),
            t.SyncPreheatRewardedState(e))),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.VersionPreheatRewardResponse,
        e,
      );
  }
  async RequestPreheatSignSurveyInfoRequest(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "VersionPreheat",
        64,
        "RequestPreheatSignSurveyInfoRequest:" + e,
      );
    var r = Proto_PreheatSignSurveyInfoRequest.create(),
      r = ((r.M_l = e), await Net_1.Net.CallAsync(23371, r));
    void 0 !== r &&
      (r.fMs !== Proto_ErrorCode.KRs
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "VersionPreheat",
              64,
              "预热作答失败：RequestPreheatSignRewardRequest---" + r.fMs,
            ),
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            r.fMs,
            21255,
          ))
        : void 0 === r.UM_
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "VersionPreheat",
              64,
              "预热问卷数据response中没有SurveyInfo",
              ["TVersionPreheatId", e],
            )
          : ModelManager_1.ModelManager.VersionPreheatModel.SyncPreheatSignSurveyInfo(
              e,
              r.UM_,
            ));
  }
  SendDetailClickLogData(e) {
    var r = new LogReportDefine_1.ActivityPreheatLogData(),
      t = ModelManager_1.ModelManager.VersionPreheatModel.ActivityData,
      o = TimeUtil_1.TimeUtil.GetServerTime(),
      o = 0 === Number(t.EndOpenTime) ? 0 : Number(t.EndOpenTime) - o;
    (r.i_activity_id = t.Id),
      (r.i_activity_type = t.Type),
      (r.i_time_left = Math.round(o)),
      (r.i_type = e ?? 0),
      LogReportController_1.LogReportController.LogReport(r);
  }
  async OpenTargetViewAsyncById(e, r) {
    var t,
      o = ModelManager_1.ModelManager.VersionPreheatModel;
    let i = void 0;
    return void 0 === e
      ? ((t = o.BuildBonusDetailData()),
        void 0 !==
          (i = await UiManager_1.UiManager.OpenViewAsync(
            "VersionPreheatQuestDetailView",
            t,
          )))
      : (r && this.Cml(e)
          ? ((t = o.BuildVoteDataById(e)),
            (i = await UiManager_1.UiManager.OpenViewAsync(
              "VersionPreheatVoteView",
              t,
            )))
          : 1 <= o.GetQuestStateById(e) &&
            ((r = o.BuildQuestDetailDataById(e)),
            (i = await UiManager_1.UiManager.OpenViewAsync(
              "VersionPreheatQuestDetailView",
              r,
            ))),
        void 0 !== i);
  }
  OpenShareView(e, r, t) {
    e = {
      ScreenShot: !1,
      PrepareFullScreenShot: !1,
      IsHiddenBattleView: !1,
      VersionPreheat: { PhotoPath: e, NameTextId: r, ThemeTextId: t },
      RoleSkinData: void 0,
      HandBookPhotoData: void 0,
      GachaData: void 0,
      FragmentMemory: void 0,
    };
    UiManager_1.UiManager.OpenView("PhotoSaveView", e);
  }
  IsQuestFinishedById(e) {
    e = ModelManager_1.ModelManager.VersionPreheatModel.GetQuestIdById(e);
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
  }
  IsQuestAvailableButNotFinishedById(e) {
    (e = ModelManager_1.ModelManager.VersionPreheatModel.GetQuestIdById(e)),
      (e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e));
    return 1 === e || 2 === e;
  }
  Cml(e) {
    e = ModelManager_1.ModelManager.VersionPreheatModel.GetQuestIdById(e);
    return 2 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
  }
  get SelfPlayerId() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
  }
}
exports.ActivityVersionPreheatController = ActivityVersionPreheatController;
//# sourceMappingURL=ActivityVersionPreheatController.js.map
