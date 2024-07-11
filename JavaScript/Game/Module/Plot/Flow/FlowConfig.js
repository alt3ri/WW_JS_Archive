"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowConfig = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FlowById_1 = require("../../../../Core/Define/ConfigQuery/FlowById");
const FlowStateByStateKey_1 = require("../../../../Core/Define/ConfigQuery/FlowStateByStateKey");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const GlobalData_1 = require("../../../GlobalData");
class FlowConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.JQi = void 0);
  }
  OnInit() {
    return (
      (this.JQi = new Map()),
      PublicUtil_1.PublicUtil.UseDbConfig() ||
        ((FlowListData.AudioCache = new Set()), this.lte()),
      !0
    );
  }
  OnClear() {
    return (this.JQi = void 0), !(FlowListData.AudioCache = void 0);
  }
  GetRandomFlow(t, e, o, i) {
    let l = void 0;
    if (
      (l = (l = i ? this.GetFlowStateActions(t, e, i) : l) || this.zQi(t, e, o))
    )
      return l.find((t) => t.Name === "ShowTalk")?.Params;
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
      const i = this.ZQi(t, e, o);
      return i ? JSON.parse(i.Actions) : void 0;
    }
    const i = this.eXi(t, e, o);
    if (i) return i.Actions;
  }
  GetFlowStateKeepMusic(t, e, o) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      const i = this.ZQi(t, e, o);
      return i?.KeepBgm;
    }
    const i = this.eXi(t, e, o);
    return i?.KeepBgm;
  }
  ZQi(t, e, o) {
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
  zQi(t, e, o) {
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
    const l = this.tXi(t, e, o);
    if (l && l.States && l.States.length !== 0) {
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
  eXi(t, e, o, i) {
    t = this.tXi(t, e, i);
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
  iXi(t, e) {
    this.JQi || (this.JQi = new Map());
    let o = this.JQi.get(t);
    if (!o) {
      const i = PublicUtil_1.PublicUtil.GetFlowListInfo(t);
      if (!i || !i.Flows || i.Flows.length === 0)
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
        this.JQi.set(t, o),
        PublicUtil_1.PublicUtil.RegisterFlowTextLocalConfig(t);
    }
    return o.UpdateTime(), o;
  }
  tXi(t, e, o) {
    t = this.iXi(t, o);
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
      var t = UE.BlueprintPathsLibrary.ProjectContentDir() + "../../..";
      var t = UE.MyFileHelper.GetAbsolutePath(
        t + "/Source/Config/Raw/BaseTables/j.剧情语音.xlsx",
      );
      const e = UE.KuroConfigEdLibrary.CreateOrLoadExcel(t, !0);
      const o = (FlowListData.AudioCache.clear(), e.mSheets.Num());
      for (let t = 0; t < o; t++) {
        const i = e.mSheets.Get(t);
        if (i.GetName().endsWith("|PlotAudio")) {
          const l = i.RowCount();
          for (let t = 6; t < l; t++) {
            const r = i.ReadStr(t, 4);
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
    this.JQi?.clear();
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
      const e = Object.assign({}, o);
      e.States.forEach((t) => {
        t.Actions.forEach((t) => {
          t.Name === "ShowTalk" &&
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
// # sourceMappingURL=FlowConfig.js.map
