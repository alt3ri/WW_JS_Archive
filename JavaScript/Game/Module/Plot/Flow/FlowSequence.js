"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowSequence =
    exports.INVALID_INDEX =
    exports.FINISH_INDEX =
      void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TeleportController_1 = require("../../Teleport/TeleportController");
const PlotController_1 = require("../PlotController");
const SequenceController_1 = require("../Sequence/SequenceController");
(exports.FINISH_INDEX = -1), (exports.INVALID_INDEX = -2);
class FlowSequence {
  constructor() {
    (this.vXi = !1),
      (this.MXi = !1),
      (this.SXi = void 0),
      (this.EXi = new Map()),
      (this.yXi = exports.INVALID_INDEX),
      (this.IXi = void 0),
      (this.nx = void 0),
      (this.TXi = !1),
      (this.LXi = !1),
      (this.DXi = !1),
      (this.RXi = 0),
      (this.UXi = void 0),
      (this.AXi = []),
      (this.i5s = new Map()),
      (this.r5s = new Map()),
      (this.PXi = -1),
      (this.xXi = !1),
      (this.ZPt = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[FlowSequence] Seq开始播放允许跳过"),
          ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0);
      }),
      (this.wXi = () => {
        (this.nx.CurTalkId = -1),
          (this.nx.CurOptionId = -1),
          (this.nx.CurSubActionId = 0),
          (this.nx.CurShowTalk = void 0),
          (this.nx.CurShowTalkActionId = 0),
          ModelManager_1.ModelManager.PlotModel.GrayOptionMap.clear(),
          (ModelManager_1.ModelManager.PlotModel.CurShowTalk = void 0),
          (ModelManager_1.ModelManager.PlotModel.OptionEnable = !1),
          ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.PlotSequencePlay,
            this.ZPt,
          ),
          this.Clear(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[FlowSequence] 停止"),
          ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
      }),
      (this.BXi = () => {
        let t;
        this.DXi &&
          (this.bXi()
            ? this.OnSelectOption(
                ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                  this.IXi,
                ),
              )
            : this.RXi >= this.SXi.TalkItems.length
              ? this.OnSequenceStop()
              : ((t = this.SXi.TalkItems[this.RXi].Id),
                this.OnSubtitleStart(t),
                this.OnSubtitleEnd(t)));
      }),
      (this.qXi = () => {
        let t;
        this.DXi &&
          (this.RXi >= this.SXi.TalkItems.length
            ? this.OnSequenceStop()
            : ((t = this.SXi.TalkItems[this.RXi].Id),
              this.OnSubtitleStart(t),
              this.OnSubtitleEnd(t)));
      }),
      (this.OnSequenceStop = () => {
        this.GXi(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[FlowSequence] Seq播放完毕"),
          (this.MXi = !1),
          this.Stop();
      });
  }
  get IsInit() {
    return this.vXi;
  }
  get IsPlaying() {
    return this.MXi;
  }
  Clear() {
    (this.vXi = !1),
      (this.MXi = !1),
      (this.SXi = void 0),
      this.EXi.clear(),
      (this.yXi = exports.INVALID_INDEX),
      (this.IXi = void 0),
      (this.nx = void 0),
      (this.TXi = !1),
      (this.LXi = !1),
      (this.DXi = !1),
      (this.RXi = void 0),
      (this.UXi = void 0),
      (this.AXi.length = 0),
      this.i5s.clear(),
      this.r5s.clear(),
      (this.PXi = -1),
      (this.xXi = !1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "清理引用数据-FlowSequence");
  }
  Init(t, e) {
    this.Clear(),
      (this.SXi = t),
      !this.SXi || StringUtils_1.StringUtils.IsEmpty(this.SXi.SequenceDataAsset)
        ? ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "[FlowSequence] 配置错误",
          )
        : (this.SXi.TalkSequence?.forEach((t, e) => {
            t.forEach((t) => {
              this.EXi.has(t)
                ? ControllerHolder_1.ControllerHolder.FlowController.LogError(
                    "[FlowSequence] 初始化分段时Id重复",
                  )
                : this.EXi.set(t, e);
            });
          }),
          (this.nx = e),
          (this.nx.CurTalkId = -1),
          (this.nx.CurOptionId = -1),
          (this.nx.CurSubActionId = 0),
          (this.yXi = 0),
          (this.RXi = 0),
          (this.vXi = !0),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.PlotSequencePlay,
            this.ZPt,
          ));
  }
  Start() {
    if (this.IsInit && !this.IsPlaying) {
      (this.MXi = !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[FlowSequence] 开始"),
        ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA"
          ? (ModelManager_1.ModelManager.SequenceModel.Type = 0)
          : ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ===
              "LevelB" && (ModelManager_1.ModelManager.SequenceModel.Type = 1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PlotStartShowTalk,
          this.SXi,
        ),
        (ModelManager_1.ModelManager.PlotModel.CurShowTalk = this.SXi);
      const i = new Array();
      const e =
        (this.SXi.TalkFrameEvents?.forEach((t) => {
          let e;
          i.push(t.FrameEvent),
            ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.has(
              t.Position?.TalkItemId,
            )
              ? (e =
                  ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.get(
                    t.Position.TalkItemId,
                  )) &&
                (e.push(t.FrameEvent.EventKey),
                ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.set(
                  t.Position.TalkItemId,
                  e,
                ))
              : ((e = new Array()).push(t.FrameEvent.EventKey),
                ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.set(
                  t.Position.TalkItemId,
                  e,
                ));
        }),
        []);
      ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB" &&
        this.SXi.TalkItems?.forEach((t) => {
          t.TidTalk && t.PlayVoice && e.push(t.TidTalk);
        }),
        SequenceController_1.SequenceController.Play(
          {
            Path: this.SXi.SequenceDataAsset,
            ResetCamera: this.SXi.ResetCamera,
            FrameEvents: i,
          },
          e,
          this.OnSequenceStop,
          !0,
          !0,
          this.nx.IsWaitRenderData,
          1,
        );
    }
  }
  Stop(t = 0) {
    this.IsInit &&
      (this.IsPlaying &&
        ((this.MXi = !1),
        SequenceController_1.SequenceController.ManualFinish()),
      this.NXi().finally(this.wXi));
  }
  async NXi() {
    let t;
    await PlotController_1.PlotController.CheckFormation(),
      this.DXi &&
        ((t = this.IXi ? this.EXi.get(this.IXi.Id) : 0) >= 0 &&
          t < this.AXi.length &&
          this.AXi[t] &&
          (ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
        this.UXi) &&
        ((t = t < this.UXi.length ? this.UXi[t] : void 0)
          ? await TeleportController_1.TeleportController.TeleportToPositionNoLoading(
              t.GetLocation().ToUeVector(),
              t.GetRotation().Rotator().ToUeRotator(),
              "FlowSequence.Stop",
            )
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "剧情SeqDA的FinalPos未配置，跳过时最终位置将不准确，联系策划修改",
            ));
  }
  Skip() {
    let t;
    this.IsInit &&
      this.IsPlaying &&
      !this.DXi &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowSequence] 执行跳过"),
      (this.DXi = !0),
      ModelManager_1.ModelManager.SequenceModel.CurFinalPos?.length !== 0 &&
        (this.UXi = Object.assign(
          [],
          ModelManager_1.ModelManager.SequenceModel.CurFinalPos,
        )),
      ModelManager_1.ModelManager.SequenceModel.IsFadeEnd.forEach((t) => {
        this.AXi.push(t);
      }),
      ModelManager_1.ModelManager.SequenceModel.FrameEvents.forEach((t, e) => {
        this.r5s.set(e, t);
      }),
      ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.forEach(
        (t, e) => {
          this.i5s.set(e, t);
        },
      ),
      SequenceController_1.SequenceController.ManualFinish(),
      (this.MXi = !1),
      this.TXi
        ? this.OnSubtitleEnd(this.IXi.Id)
        : this.bXi() && !this.LXi
          ? this.OnSelectOption(
              ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                this.IXi,
              ),
            )
          : this.RXi >= this.SXi.TalkItems.length
            ? this.OnSequenceStop()
            : ((t = this.SXi.TalkItems[this.RXi].Id),
              this.OnSubtitleStart(t),
              this.OnSubtitleEnd(t)));
  }
  bXi() {
    return !!this.IXi?.Options && this.IXi?.Options?.length > 0;
  }
  GXi() {
    this.xXi &&
      !this.LXi &&
      ControllerHolder_1.ControllerHolder.FlowController.LogError("遗漏选项", [
        "Miss TalkItem Id",
        this.PXi,
      ]),
      (this.PXi = this.IXi?.Id ?? -1),
      (this.xXi = this.bXi());
  }
  OnJumpTalk(e) {
    this.IsInit &&
      ((this.yXi = this.EXi.get(e) ?? exports.FINISH_INDEX),
      SequenceController_1.SequenceController.SetNextSequenceIndex(this.yXi),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowSequence] JumpTalk设置下个分支Seq", [
          "NextIndex",
          this.yXi,
        ]),
      (this.RXi = this.SXi.TalkItems.findIndex((t) => t.Id === e)),
      this.DXi) &&
      (this.OnSubtitleStart(e), this.OnSubtitleEnd(e));
  }
  OnFinishTalk() {
    this.IsInit &&
      ((this.yXi = exports.FINISH_INDEX),
      SequenceController_1.SequenceController.SetNextSequenceIndex(this.yXi),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowSequence] FinishTalk设置结束"),
      this.DXi) &&
      this.OnSequenceStop();
  }
  OnSubtitleStart(e) {
    let t;
    this.IsInit &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[FlowSequence][Subtitle] 字幕显示", [
          "talkId",
          e,
        ]),
      (t = this.SXi.TalkItems.find((t) => t.Id === e)),
      this.SXi.TalkItems[this.RXi].Id !== e &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "[FlowSequence][Subtitle] Seq字幕顺序与编辑器对不上",
          ["talkId", e],
          ["SeqIndex", ModelManager_1.ModelManager.SequenceModel.SubSeqIndex],
          ["index in seq", this.RXi],
        ),
        (this.RXi = this.SXi.TalkItems.indexOf(t))),
      this.RXi++,
      t ||
        ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "[FlowSequence][Subtitle] 依赖编辑器的Seq找不到字幕",
          ["talkItem.ID", e],
        ),
      (this.TXi = !0),
      (this.nx.CurTalkId = e),
      (this.nx.CurOptionId = -1),
      (this.IXi = t),
      this.GXi(),
      (this.LXi = !1),
      this.DXi) &&
      this.RunSequenceFrameEventsWhenSkip(e);
  }
  OnSubtitleEnd(t) {
    this.IsInit &&
      this.TXi &&
      this.IXi.Id === t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowSequence][Subtitle] 字幕关闭"),
      (this.TXi = !1),
      this.OXi(this.IXi.Actions, this.BXi));
  }
  OnSelectOption(t) {
    this.IsInit &&
      this.nx.CurOptionId === -1 &&
      !this.LXi &&
      (this.OnSubtitleEnd(this.IXi.Id),
      (this.LXi = !0),
      (this.nx.CurOptionId = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[FlowSequence] 选择选项", ["index", t]),
      !this.IXi.Options || t >= this.IXi.Options.length
        ? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "[FlowSequence] 选项超出下标",
          ),
          this.qXi())
        : (ControllerHolder_1.ControllerHolder.FlowController.SelectOption(
            this.IXi.Id,
            t,
          ),
          (t = this.IXi.Options[t]),
          this.OXi(t.Actions, this.qXi)));
  }
  OXi(t, e) {
    const i = Time_1.Time.Frame;
    ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
      t,
      () => {
        i !== Time_1.Time.Frame &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Plot",
            27,
            "[FlowSequence] 高级别ShowTalk中不应配非即时事件",
          ),
          e && e();
      },
    );
  }
  CreateSubtitleFromTalkItem(e) {
    let t;
    if (this.IsInit)
      return (
        (t = this.SXi.TalkItems.find((t) => t.Id === e)) ||
          ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "[FlowSequence] 剧情Seq找不到字幕",
            ["talkId", e],
          ),
        t
      );
  }
  GetNextTalkItem() {
    return void 0 !== this.RXi &&
      void 0 !== this.SXi &&
      this.SXi.TalkItems.length > 0 &&
      this.SXi.TalkItems.length > this.RXi
      ? this.SXi.TalkItems[this.RXi]
      : void 0;
  }
  RunSequenceFrameEventsWhenSkip(i) {
    let t = void 0;
    (t = this.i5s.has(i) ? this.i5s.get(i) : t) &&
      t.forEach((t) => {
        const e = this.r5s.get(t);
        e &&
          e.length !== 0 &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Plot",
              46,
              "RunSequenceFrameEventsWhenSkip",
              ["id", i],
              ["key", t],
            ),
          ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
            e,
            () => {},
          ));
      });
  }
}
exports.FlowSequence = FlowSequence;
// # sourceMappingURL=FlowSequence.js.map
