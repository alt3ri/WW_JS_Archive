"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowConfig = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  FlowById_1 = require("../../../../Core/Define/ConfigQuery/FlowById"),
  FlowStateByStateKey_1 = require("../../../../Core/Define/ConfigQuery/FlowStateByStateKey"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  GlobalData_1 = require("../../../GlobalData");
class FlowConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.$Xi = void 0);
  }
  OnInit() {
    return (
      (this.$Xi = new Map()),
      PublicUtil_1.PublicUtil.UseDbConfig() ||
        ((FlowListData.AudioCache = new Set()), this.lte()),
      !0
    );
  }
  OnClear() {
    return (this.$Xi = void 0), !(FlowListData.AudioCache = void 0);
  }
  GetRandomFlow(t, e, o, i) {
    let l = void 0;
    if (
      (l = (l = i ? this.GetFlowStateActions(t, e, i) : l) || this.YXi(t, e, o))
    )
      return l.find((t) => "ShowTalk" === t.Name)?.Params;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Plot",
        19,
        "找不到剧情配置",
        ["flowListName", t],
        ["flowId", e],
      );
  }
  GetFlowStateActions(t, e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      const i = this.JXi(t, e, o);
      return i ? JSON.parse(i.Actions) : void 0;
    }
    const i = this.zXi(t, e, o);
    if (i) return i.Actions;
  }
  GetFlowStateKeepMusic(t, e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      const i = this.JXi(t, e, o);
      return i?.KeepBgm;
    }
    const i = this.zXi(t, e, o);
    return i?.KeepBgm;
  }
  JXi(t, e, o) {
    (t = t + `_${e}_` + o),
      (e = FlowStateByStateKey_1.configFlowStateByStateKey.GetConfig(t));
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Level", 19, "无法找到对应剧情配置", [
            "stateKey",
            t,
          ])),
      e
    );
  }
  YXi(t, e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var i = t + "_" + e;
      const l = FlowById_1.configFlowById.GetConfig(i);
      return l
        ? ((i = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(l.States)),
          this.GetFlowStateActions(t, e, i))
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Plot",
              19,
              "找不到剧情配置",
              ["flowListName", t],
              ["flowId", e],
            )
          );
    }
    const l = this.ZXi(t, e, o);
    if (l && l.States && 0 !== l.States.length) {
      i = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(l.States);
      if (i) return i.Actions;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Plot",
          19,
          "剧情状态为空",
          ["flowListName", t],
          ["flowId", e],
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          30,
          "找不到剧情配置",
          ["flowListName", t],
          ["flowId", e],
        );
  }
  zXi(t, e, o, i) {
    t = this.ZXi(t, e, i);
    if (t)
      return (
        (i = t.States.find((t) => t.Id === o)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Level",
              19,
              "[StartFlow] 无法找到对应剧情的状态",
              ["FlowId", e],
              ["StateId", o],
            )),
        i
      );
  }
  e$i(t, e) {
    this.$Xi || (this.$Xi = new Map());
    let o = this.$Xi.get(t);
    if (!o) {
      var i = PublicUtil_1.PublicUtil.GetFlowListInfo(t);
      if (!i || !i.Flows || 0 === i.Flows.length)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Level",
            30,
            "FlowListName配置错误",
            ["Value", t],
            ["Name", e],
          )
        );
      (o = new FlowListData()).Init(i),
        this.$Xi.set(t, o),
        PublicUtil_1.PublicUtil.RegisterFlowTextLocalConfig(t);
    }
    return o.UpdateTime(), o;
  }
  ZXi(t, e, o) {
    t = this.e$i(t, o);
    if (t)
      return (
        (o = t.GetFlowInfo(e)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Level",
              7,
              "[PlotController.StartPlotNetwork] 无法找到对应剧情",
              ["PlotName", e],
            )),
        o
      );
  }
  lte() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 27, "加载音频资源表");
      var t = UE.BlueprintPathsLibrary.ProjectContentDir() + "../../..",
        t = UE.MyFileHelper.GetAbsolutePath(
          t + "/Source/Config/Raw/BaseTables/j.剧情语音.xlsx",
        ),
        e = UE.KuroConfigEdLibrary.CreateOrLoadExcel(t, !0),
        o = (FlowListData.AudioCache.clear(), e.mSheets.Num());
      for (let t = 0; t < o; t++) {
        var i = e.mSheets.Get(t);
        if (i.GetName().endsWith("|PlotAudio")) {
          var l = i.RowCount();
          for (let t = 6; t < l; t++) {
            var r = i.ReadStr(t, 4);
            StringUtils_1.StringUtils.IsEmpty(r) ||
              FlowListData.AudioCache.add(r);
          }
        }
      }
      e.Dispose(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Plot", 27, "检索到条音频", [
            "FlowListData.AudioCache!.size",
            FlowListData.AudioCache.size,
          ]);
    }
  }
  ResetLocalFlowConfig() {
    this.$Xi?.clear();
  }
}
exports.FlowConfig = FlowConfig;
class FlowListData {
  constructor() {
    this.IdsMap = void 0;
  }
  Init(t) {
    this.IdsMap = new Map();
    for (const o of t.Flows) {
      var e = Object.assign({}, o);
      e.States.forEach((t) => {
        t.Actions.forEach((t) => {
          "ShowTalk" === t.Name &&
            t.Params.TalkItems?.forEach((t) => {
              FlowListData.AudioCache.has(t.TidTalk) && (t.PlayVoice = !0);
            });
        });
      }),
        this.IdsMap.set(e.Id, e);
    }
  }
  GetFlowInfo(t) {
    return this.IdsMap.get(t);
  }
  UpdateTime() {}
}
FlowListData.AudioCache = void 0;
//# sourceMappingURL=FlowConfig.js.map
