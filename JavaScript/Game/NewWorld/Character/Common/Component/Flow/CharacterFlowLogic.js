"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterFlowLogic = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  Global_1 = require("../../../../../Global"),
  LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  LogReportController_1 = require("../../../../../Module/LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine"),
  SimpleNpcFlowConditionChecker_1 = require("../../../SimpleNpc/Logics/SimpleNpcFlowConditionChecker"),
  DynamicFlowController_1 = require("./DynamicFlowController"),
  DEFAULT_WAIT_TIME = 3,
  DEFAULT_LOOP_TIME = 10;
class CharacterFlowLogic {
  constructor(t, i) {
    (this.HYo = 0),
      (this.ActorComp = void 0),
      (this.HeadInfoComp = void 0),
      (this.FlowInfoList = new Array()),
      (this.TempFlowInfoList = new Array()),
      (this.CurrentFlowInfo = void 0),
      (this.EntityList = new Array()),
      (this.CurrentTalkItems = void 0),
      (this.CurrentTalkId = 0),
      (this.DynamicFlowData = void 0),
      (this.IsPause = !0),
      (this.EnableUpdate = !1),
      (this.IsExecuteFlowEnd = !0),
      (this.WaitSecondsRemain = 0),
      (this.ActorComp = t),
      (this.HeadInfoComp = t.Entity.GetComponent(73)),
      (this.TempFlowInfoList = new Array()),
      (this.HYo = this.ActorComp.CreatureData.GetPbDataId()),
      i && ((this.EntityList = i.NpcIds), (this.FlowInfoList = i.Flows));
  }
  Tick(t) {
    this.EnableUpdate &&
      ((this.WaitSecondsRemain -= t), this.WaitSecondsRemain <= 0) &&
      (this.IsExecuteFlowEnd
        ? this.IsPause
          ? (this.EnableUpdate = !1)
          : this.StartFlow()
        : this.PlayTalk(this.CurrentTalkId + 1));
  }
  get IsPlaying() {
    return !this.IsExecuteFlowEnd;
  }
  StartFlow() {
    this.FindRandomFlow(), this.PlayFlow();
  }
  StopFlow() {
    this.IsExecuteFlowEnd = !0;
    let e = void (this.WaitSecondsRemain = 0);
    if (
      (e = this.DynamicFlowData
        ? this.DynamicFlowData.EntityIds
        : this.EntityList) &&
      2 < e.length
    )
      for (let t = 0, i = e.length; t < i; t++) {
        var o = this.GetEntity(e[t]);
        o && o.GetComponent(28).RemoveFlowActions();
      }
    else this.ActorComp.Entity.GetComponent(28).RemoveFlowActions();
  }
  PlayFlow() {
    if (this.CurrentFlowInfo || this.DynamicFlowData) {
      if (this.IsFlowActorsReady()) {
        let t = void 0,
          i = 0;
        var e;
        this.DynamicFlowData
          ? ((t = this.DynamicFlowData.Flow),
            (i = this.DynamicFlowData.Flow?.StateId
              ? this.DynamicFlowData.Flow.StateId
              : 0))
          : (e = this.CurrentFlowInfo.Flow) &&
            ((t = e.FlowIndex),
            (i = e.FlowIndex?.StateId ? e.FlowIndex.StateId : 0)),
          t &&
          (e = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(
            t.FlowListName,
            t.FlowId,
            this.ActorComp.Owner.ActorLabel,
            i,
          ))
            ? ((this.CurrentTalkItems = e.TalkItems),
              (this.IsExecuteFlowEnd = !1),
              this.PlayTalk(0),
              this.hRi(t))
            : this.HandleFlowEnd();
      }
    } else this.HandleFlowEnd();
  }
  PlayTalk(i) {
    this.CurrentTalkId = i;
    var e = this.CurrentTalkItems;
    if (i >= e.length)
      this.HandleFlowEnd(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Level",
            51,
            "[CharacterFlowLogic] 冒泡演出结束",
            ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
            ["WaitTime", this.WaitSecondsRemain],
          );
    else {
      var o = this.DynamicFlowData
          ? this.DynamicFlowData.Flow
          : this.CurrentFlowInfo?.Flow.FlowIndex,
        r = this.DynamicFlowData
          ? this.DynamicFlowData.EntityIds
          : this.EntityList,
        e = e[i];
      let t = this.ActorComp.Entity;
      if (r && 2 <= r?.length) {
        var s =
          SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.GetFlowActorIndex(
            e.WhoId,
          );
        if (-1 === s)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                51,
                "请配置演出目标",
                ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
                ["FlowName", o?.FlowListName],
                ["FlowId", o?.FlowId],
                ["StateId", o?.StateId],
                ["TalkId", i],
              ),
            void this.PlayTalk(i + 1)
          );
        if (s >= r.length)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Level",
                51,
                "演出目标索引越界",
                ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
                ["FlowName", o?.FlowListName],
                ["FlowId", o?.FlowId],
                ["StateId", o?.StateId],
                ["Index", s],
              ),
            void this.PlayTalk(i + 1)
          );
        var r = r[s];
        if (!(t = this.GetEntity(r)))
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Level",
                51,
                "播放多人冒泡时找不到演员,停止冒泡",
                ["MasterPbDataId", this.ActorComp.CreatureData.GetPbDataId()],
                ["ActorPbDataId", r],
                ["FlowName", o?.FlowListName],
                ["FlowId", o?.FlowId],
                ["StateId", o?.StateId],
                ["Index", s],
              ),
            void this.HandleFlowEnd()
          );
      }
      this.HandleTalkAction(t, e)
        ? ((this.IsExecuteFlowEnd = !1),
          this.WaitSecondsRemain <= 0 &&
            (this.WaitSecondsRemain = this.GetWaitSeconds(e)),
          (r = this.ActorComp.CreatureData.GetPbDataId()),
          (o = this.GetFlowText(e.TidTalk)),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Level",
              51,
              "[CharacterFlowLogic] 播放对话框文本",
              ["PbDataId", r],
              ["DialogText", o],
              ["WaitTime", this.WaitSecondsRemain],
            ))
        : this.PlayTalk(i + 1);
    }
  }
  HandleTalkAction(t, i) {
    if (!t) return !1;
    let e = !1;
    t = this.GetFlowText(i.TidTalk);
    return (
      t &&
        ((e = !0),
        (i = this.GetWaitSeconds(i, 0.05)),
        this.HeadInfoComp.SetDialogueText(t, i)),
      e
    );
  }
  HandleFlowEnd() {
    if (((this.IsExecuteFlowEnd = !0), this.DynamicFlowData)) {
      this.WaitSecondsRemain = DEFAULT_LOOP_TIME;
      var i = this.ActorComp.CreatureData.GetPbDataId(),
        i =
          DynamicFlowController_1.DynamicFlowController.GetDynamicFlowByMasterActor(
            i,
          ).Callback;
      i && i();
    } else if (this.CurrentFlowInfo) {
      i = this.CurrentFlowInfo.Flow;
      let t = DEFAULT_LOOP_TIME;
      i.WaitTime && (t = i.WaitTime), (this.WaitSecondsRemain = t);
    }
    this.ResetFlowState();
  }
  ResetFlowState() {
    (this.CurrentTalkItems = void 0),
      (this.CurrentTalkId = 0),
      (this.CurrentFlowInfo = void 0),
      (this.DynamicFlowData = void 0);
  }
  FindRandomFlow() {
    if (!this.FindDynamicFlow()) {
      (this.TempFlowInfoList.length = 0), (this.CurrentFlowInfo = void 0);
      for (const t of this.FlowInfoList)
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          t.Condition,
          this.ActorComp.Owner,
          LevelGeneralContextDefine_1.EntityContext.Create(
            this.ActorComp.Entity.Id,
          ),
        ) && this.TempFlowInfoList.push(t);
      this.CurrentFlowInfo = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(
        this.TempFlowInfoList,
      );
    }
  }
  ResetWaitTime() {
    this.WaitSecondsRemain = 0;
  }
  HasValidFlow() {
    return !!this.FlowInfoList.length;
  }
  GetUiRootItemState() {
    return this.HeadInfoComp.GetRootItemState();
  }
  GetEntity(t) {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)
      ?.Entity;
  }
  GetWaitSeconds(t, i = 0) {
    let e = t.WaitTime;
    return (e && 0 !== e) || (e = DEFAULT_WAIT_TIME), (e += i);
  }
  GetFlowText(t) {
    if (t && !StringUtils_1.StringUtils.IsEmpty(t))
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
  }
  hRi(t) {
    var i = new LogReportDefine_1.PlayFlowLogData(),
      e =
        ((i.i_bubble_type = this.DynamicFlowData ? 2 : 1),
        (i.s_flow_file = t.FlowListName),
        (i.i_flow_id = t.FlowId),
        (i.i_flow_status_id = t.StateId ?? 0),
        (i.i_config_id = this.HYo),
        (i.i_area_id =
          ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId()),
        (i.i_father_area_id =
          ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy);
    (i.f_pos_x = e.X),
      (i.f_pos_y = e.Y),
      (i.f_pos_z = e.Z),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Plot",
          43,
          "播放冒泡埋点",
          ["EntityConfigId", this.HYo],
          ["FlowListName", t.FlowListName],
          ["FlowId", t.FlowId],
          ["StateId", t.StateId],
          ["IsDynamicMultiFlow", void 0 !== this.DynamicFlowData],
        ),
      LogReportController_1.LogReportController.LogReport(i);
  }
  HasDynamicFlow() {
    return void 0 !== this.DynamicFlowData;
  }
  FindDynamicFlow() {
    var t = this.ActorComp.CreatureData.GetPbDataId(),
      t =
        DynamicFlowController_1.DynamicFlowController.GetDynamicFlowByMasterActor(
          t,
        );
    return (this.DynamicFlowData = t?.BubbleData), !!t;
  }
  IsFlowActorsReady() {
    let t = void 0;
    if (
      !(t = this.DynamicFlowData
        ? this.DynamicFlowData.EntityIds
        : this.EntityList)?.length
    )
      return !1;
    for (const i of t)
      if (
        !ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(i)
          ?.IsInit
      )
        return !1;
    return !0;
  }
}
exports.CharacterFlowLogic = CharacterFlowLogic;
//# sourceMappingURL=CharacterFlowLogic.js.map
