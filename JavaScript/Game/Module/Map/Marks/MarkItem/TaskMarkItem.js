"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskMarkItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleUiDefine_1 = require("../../../BattleUi/BattleUiDefine"),
  LogReportController_1 = require("../../../LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../LogReport/LogReportDefine"),
  TaskMarkItemView_1 = require("../MarkItemView/TaskMarkItemView"),
  ServerMarkItem_1 = require("./ServerMarkItem"),
  ONE_HUNDRED = 100;
class TaskMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(t, e, i, r) {
    super(t, e, i, r),
      (this.MarkRange = 0),
      (this.RangeMarkShowDisUp = 0),
      (this.RangeMarkShowDisDown = 0),
      (this.RangeMarkShowDis = 0),
      (this.BtType = void 0),
      (this.TreeIncId = void 0),
      (this.TreeConfigId = 0),
      (this.Tree = void 0),
      (this.NodeId = 0),
      (this.iDi = 0),
      (this.oDi = !1),
      (this.rDi = 0),
      (this.nDi = void 0),
      (this.sDi = !0),
      (this.aDi = !1),
      (this.MapId = t.MapId);
  }
  get MarkType() {
    return 12;
  }
  get CanShowInDistance() {
    return this.sDi;
  }
  set CanShowInDistance(t) {
    this.sDi !== t && (this.sDi = t) && 1 === this.MapType && (this.aDi = !1);
  }
  Initialize() {
    super.Initialize();
    var t = this.ServerMarkInfo;
    if (
      (this.SetTrackData(t.TrackTarget),
      (this.rDi = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
        this.ConfigId,
      ).IconDistant),
      (this.NodeId = t.NodeId),
      this.NodeId)
    ) {
      if (
        ((this.TreeIncId = t.TreeId),
        (this.Tree =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            this.TreeIncId,
          )),
        !this.Tree)
      )
        return;
      (this.BtType = this.Tree.BtType),
        (this.TreeConfigId = this.Tree.TreeConfigId);
      var e = this.Tree.GetNode(this.NodeId),
        e =
          (e.TrackTarget &&
            e.TrackTarget.ZaxisViewRange &&
            ((this.RangeMarkShowDisUp =
              e.TrackTarget.ZaxisViewRange.Up / ONE_HUNDRED),
            (this.RangeMarkShowDisDown =
              -e.TrackTarget.ZaxisViewRange.Down / ONE_HUNDRED)),
          this.Tree.GetRangeMarkSize(this.NodeId)),
        e =
          (e && (this.MarkRange = e / ONE_HUNDRED),
          this.Tree.GetRangeMarkShowDis(this.NodeId));
      e
        ? ((this.RangeMarkShowDis = e / ONE_HUNDRED),
          (this.iDi = Math.pow(e, 2)))
        : ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
            "dailyquest_trackinfo_mini",
          )),
          (this.iDi = Math.pow(e, 2)));
    } else
      (this.BtType = Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest),
        (this.TreeConfigId = t.TreeId);
    var e = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
        this.ConfigId,
      ),
      t =
        (e &&
          ((t =
            2 ===
            ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(
              this.TreeConfigId,
            )
              ? e.MarkPic
              : e.MarkAcceptablePic),
          this.OnAfterSetConfigId({
            ShowRange: e.ShowRange,
            MarkPic: t,
            ShowPriority: e.ShowPriority,
            Scale: e.Scale,
          })),
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity);
    t &&
      (e = t.Entity.GetComponent(3)) &&
      ((t = e.ActorLocationProxy), this.UpdateItemIsInDistance(t)),
      this.UpdateTrackState();
  }
  OnDestroy() {
    1 === this.MapType &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
        this.TreeConfigId,
        this.NodeId,
        1,
      );
  }
  OnCreateView() {
    this.InnerView = new TaskMarkItemView_1.TaskMarkItemView(this);
  }
  OnUpdate(t) {
    this.UpdateItemIsInDistance(t), this.UpdateTrackState(), this.hDi(t);
  }
  GetTitleText() {
    if (this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest)
      return ModelManager_1.ModelManager.QuestNewModel.GetQuest(
        this.TreeConfigId,
      )?.Name;
  }
  GetAreaText() {
    if ("number" == typeof this.TrackTarget) {
      var t =
        ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
          this.MapId,
          this.TrackTarget,
        )?.AreaId;
      if (t) {
        var e,
          i = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(t),
          t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t);
        if (void 0 !== t)
          return (
            (i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(i)),
            (e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
              t.AreaName,
            )),
            (i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
              i.AreaName,
            )),
            ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
              t.CountryId,
            ) +
              `-${i}-` +
              e
          );
      }
    }
  }
  lDi(t) {
    this.nDi ||
      (this.nDi = Vector_1.Vector.DistSquared2D(t, this.WorldPosition));
  }
  _Di(t) {
    var e, i;
    this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
      ((e = this.TreeConfigId),
      (i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e))) &&
      4 === i.Type &&
      (this.lDi(t),
      !this.oDi &&
        this.nDi &&
        this.nDi <= this.iDi &&
        ((this.oDi = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
          e,
          this.NodeId,
          0,
        )),
      this.oDi) &&
      this.nDi &&
      this.nDi > this.iDi &&
      ((this.oDi = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnEnterDailyQuestNotifyRange,
        e,
        this.NodeId,
        1,
      ));
  }
  UpdateItemIsInDistance(t) {
    if (0 === this.NodeId) {
      var e = 1 === this.MapType ? BattleUiDefine_1.CLAMP_RANGE : this.rDi;
      if (!e) return;
      this.lDi(t),
        (this.CanShowInDistance = !!this.nDi && this.nDi < e * e * 1e4);
    }
    this._Di(t), (this.nDi = void 0);
  }
  CheckCanShowView() {
    return this.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
      ? 1 === this.MapType
      : !(
          ("number" == typeof this.TrackTarget &&
            !ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
              this.TrackTarget,
            )) ||
          (!this.CanShowInDistance && !this.IsTracked)
        );
  }
  hDi(t) {
    var e, i;
    1 === this.MapType &&
      this.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
      0 === this.NodeId &&
      this.IsCanShowView &&
      !this.aDi &&
      ((e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
        this.TreeConfigId,
      ))
        ? (((i = new LogReportDefine_1.QuestDiscoverLogData()).i_quest_id =
            this.TreeConfigId),
          (i.i_quest_type = e.Type ?? 0),
          (i.i_icon_distance = BattleUiDefine_1.CLAMP_RANGE),
          (i.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
          (i.i_father_area_id =
            ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
          (i.f_pos_x = t.X),
          (i.f_pos_y = t.Y),
          (i.f_pos_z = t.Z),
          LogReportController_1.LogReportController.LogReport(i),
          (this.aDi = !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LogReport", 19, "发送任务日志时,找不到任务对象", [
            "questId",
            this.TreeConfigId,
          ]));
  }
}
exports.TaskMarkItem = TaskMarkItem;
//# sourceMappingURL=TaskMarkItem.js.map
