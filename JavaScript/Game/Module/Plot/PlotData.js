"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotFlow =
    exports.PlotCenterText =
    exports.PlotFlowStateItem =
    exports.PlotResultInfo =
    exports.PlotStateInfo =
    exports.PlotInfo =
      void 0);
const Pool_1 = require("../../../Core/Container/Pool"),
  SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  CAPACITY = 20;
class PlotInfo {
  constructor() {
    (this.FlowListName = ""),
      (this.FlowId = 0),
      (this.StateId = 0),
      (this.StateActions = void 0),
      (this.KeepMusic = !1),
      (this.Context = void 0),
      (this.IsServerNotify = !1),
      (this.FlowIncId = void 0),
      (this.IsBackground = !1),
      (this.IsBreakdown = !1),
      (this.IsServerEnd = !1),
      (this.IsAsync = !1),
      (this.PlotLevel = "LevelC"),
      (this.IsWaitAnim = !1),
      (this.UiParam = void 0),
      (this.CanBeAbandoned = !1),
      (this.FadeBegin = void 0),
      (this.Pos = void 0);
  }
  Init(t, i, s, o, e, h, r, l, n, d = {}, v = !1, a = !1, c) {
    (this.FlowListName = s),
      (this.FlowId = o),
      (this.StateId = e),
      (this.StateActions = h),
      (this.KeepMusic = r),
      (this.IsServerNotify = t),
      (this.Context = l),
      (this.FlowIncId = i),
      (this.IsBackground = a),
      (this.IsBreakdown = !1),
      (this.IsAsync = n),
      (this.UiParam = d),
      (this.CanBeAbandoned = v),
      (this.Pos = c),
      PlotInfo.AnalyzeLevel(this, h);
  }
  static AnalyzeLevel(t, i) {
    let s = "LevelC",
      o = !1,
      e = !1,
      h = void 0;
    var r;
    !(h =
      0 < i.length &&
      "SetPlotMode" === (r = i[0]).Name &&
      ((r = r.Params),
      (s = r.Mode),
      (o = r.WaitForPlayerMotionEnd ?? !1),
      (e = r.NoUiEnterAnimation ?? !1),
      r.FastFadeIn)
        ? r.FastFadeIn.ScreenType ?? IAction_1.EFadeInScreenShowType.Black
        : h) &&
      1 < i.length &&
      "FadeInScreen" === (r = i[1]).Name &&
      ((r = r.Params),
      (h = r.ScreenType ?? IAction_1.EFadeInScreenShowType.Black)),
      (t.PlotLevel = s),
      (t.IsWaitAnim = o),
      (t.UiParam.DisableAnim = e),
      (t.FadeBegin = h),
      ("LevelD" !== s && "Prompt" !== s) ||
        t.UiParam.ViewName ||
        (t.UiParam.ViewName = "BattleView"),
      "Prompt" === s && this._bn(i, t);
  }
  static _bn(t, i) {
    var s,
      o,
      e = new Map();
    for (const h of t)
      if ("ShowTalk" === h.Name)
        for (const r of h.Params.TalkItems)
          r.WhoId &&
            ((s = SpeakerById_1.configSpeakerById.GetConfig(r.WhoId)),
            StringUtils_1.StringUtils.IsEmpty(s?.HeadRoundIconAsset)
              ? ((o = StringUtils_1.StringUtils.Format(
                  "{0},{1},{2}",
                  i.FlowListName,
                  i.FlowId.toString(),
                  i.StateId.toString(),
                )),
                ControllerHolder_1.ControllerHolder.FlowController.LogError(
                  "[PlotTips]  没有头像路径，检查对话人配置",
                  ["id", r.WhoId],
                  ["flow", o],
                ))
              : e.set(s.Id, s.HeadRoundIconAsset));
    i.UiParam.TipsTalkTexturePaths = e;
  }
  Clear() {
    (this.FlowListName = void 0),
      (this.StateId = void 0),
      (this.StateActions = void 0),
      (this.KeepMusic = !1),
      (this.FlowId = void 0),
      (this.Context = void 0),
      (this.IsServerNotify = void 0),
      (this.FlowIncId = void 0),
      (this.IsBackground = !1),
      (this.IsBreakdown = !1),
      (this.IsServerEnd = !1),
      (this.IsAsync = !1),
      (this.UiParam = void 0),
      (this.CanBeAbandoned = !1),
      (this.FadeBegin = void 0),
      (this.Pos = void 0);
  }
  static Create() {
    let t = PlotInfo.RUe.Get();
    return (t = t || PlotInfo.RUe.Create());
  }
  Recycle() {
    this.Clear(), PlotInfo.RUe.Put(this);
  }
}
(exports.PlotInfo = PlotInfo).RUe = new Pool_1.Pool(
  CAPACITY,
  () => new PlotInfo(),
);
class PlotStateInfo {
  constructor() {
    this.StateMap = new Map();
  }
  Reset() {
    this.StateMap.clear();
  }
}
exports.PlotStateInfo = PlotStateInfo;
class PlotResultInfo {
  constructor() {
    (this.FlowListName = ""),
      (this.FlowId = 0),
      (this.FinalStateId = 0),
      (this.StateId = 0),
      (this.FlowIncId = 0),
      (this.ResultCode = 0);
  }
  Reset() {
    this.ResultCode = 0;
  }
  ChangeSelfState(t) {
    this.FinalStateId = t;
  }
}
exports.PlotResultInfo = PlotResultInfo;
class PlotFlowStateItem {
  constructor(t, i, s, o) {
    (this.PbDataId = t),
      (this.FlowListName = i),
      (this.FlowId = s),
      (this.StateId = o);
  }
}
exports.PlotFlowStateItem = PlotFlowStateItem;
class PlotCenterText {
  constructor() {
    (this.Text = ""),
      (this.AudioId = ""),
      (this.AutoClose = !1),
      (this.UniversalTone = void 0),
      (this.TalkAkEvent = void 0),
      (this.Config = void 0),
      (this.Callback = void 0);
  }
  Clear() {
    (this.Text = void 0),
      (this.AudioId = ""),
      (this.AutoClose = !1),
      (this.UniversalTone = void 0),
      (this.TalkAkEvent = void 0),
      (this.Config = void 0),
      (this.Callback = void 0);
  }
}
exports.PlotCenterText = PlotCenterText;
class PlotFlow {
  constructor(t, i, s) {
    (this.FlowListName = void 0),
      (this.FlowId = void 0),
      (this.StateId = void 0),
      (this.FlowListName = t),
      (this.FlowId = i),
      (this.StateId = s);
  }
}
exports.PlotFlow = PlotFlow;
//# sourceMappingURL=PlotData.js.map
