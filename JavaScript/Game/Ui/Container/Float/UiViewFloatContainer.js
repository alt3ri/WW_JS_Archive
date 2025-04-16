"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewFloatContainer = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Game/Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayerType_1 = require("../../Define/UiLayerType"),
  UiLayer_1 = require("../../UiLayer"),
  UiModel_1 = require("../../UiModel"),
  UiViewContainer_1 = require("../UiViewContainer"),
  FloatQueue_1 = require("./FloatQueue");
class UiViewFloatContainer extends UiViewContainer_1.UiViewContainer {
  constructor(e, i, t) {
    super(),
      (this.Ecr = new Map()),
      (this.Scr = new Map()),
      (this.ycr = new Map()),
      (this.Ecr = e),
      (this.Scr = i),
      (this.ycr = t);
  }
  async OpenViewAsync(e) {
    var i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
      e.Info.Name,
    );
    this.Icr(i, e) ||
      (this.RefreshParentUiItem(e), await this.OpenViewImplementAsync(e));
  }
  async CloseViewAsync(e) {
    var i = e.Info.Name,
      t = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(i),
      r = StringUtils_1.StringUtils.IsEmpty(t.Area) ? i : t.Area,
      o = e.GetViewId();
    (await this.Tcr(r, t.OnlyShowInMain, i, o)) ||
      this.Lcr(r, i, o) ||
      (this.Ecr.get(r)?.Delete(i, o)
        ? (e.ClosePromise?.SetResult(void 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiFloatContainer",
              10,
              "界面关闭成功,队列中关闭",
              ["区域", r],
              ["当前界面", i],
            ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiFloatContainer",
            10,
            "界面关闭失败",
            ["区域", r],
            ["当前界面", i],
          ));
  }
  async Tcr(e, i, t, r) {
    var o = this.Scr.get(e);
    return (
      !!o &&
      !!this.Dcr(o, t, r) &&
      ((await this.$Oe(e, o)) &&
        (this.Rcr(i)
          ? this.ycr.get(e)?.GetViewId() === r
            ? this.ycr.delete(e)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiFloatContainer",
                10,
                "[HideViewMap.delete]可能存在同个界面执行多次关闭,业务需要关注",
                ["区域", e],
                ["界面", t],
              )
          : this.Scr.get(e)?.GetViewId() === r
            ? this.Ucr(e)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiFloatContainer",
                10,
                "[HandleNextViewFromQueue]可能存在同个界面执行多次关闭,业务需要关注",
                ["区域", e],
                ["界面", t],
              )),
      !0)
    );
  }
  Lcr(e, i, t) {
    var r = this.ycr.get(e);
    return (
      !!r &&
      !!this.Dcr(r, i, t) &&
      (r.Destroy(),
      this.ycr.delete(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiFloatContainer",
          10,
          "界面关闭成功,隐藏中关闭",
          ["区域", e],
          ["当前界面", i],
        ),
      !0)
    );
  }
  Dcr(e, i, t) {
    return (
      !(e.Info.Name !== i || (t && e.GetViewId() !== t)) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiFloatContainer",
          10,
          "界面检查失败",
          ["view.Info.Name", e.Info.Name],
          ["name", i],
          ["view.GetViewId()", e.GetViewId()],
          ["viewId", t],
        ),
      !1)
    );
  }
  async $Oe(e, i) {
    return (
      !!(await this.CloseViewImplementAsync(i)) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiFloatContainer",
          10,
          "界面关闭成功,显示中关闭",
          ["区域", e],
          ["当前界面", i.Info.Name],
        ),
      !0)
    );
  }
  Rcr(e) {
    return e && !UiModel_1.UiModel.IsInMainView;
  }
  Acr(e) {
    return !(!e.IsWaitNormal || !UiModel_1.UiModel.InNormalQueue);
  }
  Ucr(e) {
    var i = this.Pcr(e);
    i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiFloatContainer",
          10,
          "从队列中获取要显示的界面",
          ["区域", e],
          ["界面", i.Info.Name],
        ),
      this.RefreshParentUiItem(i),
      this.OpenViewImplementAsync(i));
  }
  Pcr(e) {
    var i = this.Ecr.get(e);
    if (i) {
      var t = i.Pop(UiModel_1.UiModel.IsInMainView);
      if (t)
        return (
          i.Size <= 0 && this.Ecr.delete(e),
          this.Scr.set(e, t.ViewBase),
          t.ViewBase
        );
    }
    this.Scr.delete(e);
  }
  Icr(i, t) {
    var r = StringUtils_1.StringUtils.IsEmpty(i.Area) ? t.Info.Name : i.Area;
    if (this.Scr.has(r) || this.Rcr(i.OnlyShowInMain) || this.Acr(i)) {
      let e = this.Ecr.get(r);
      return (
        e || ((e = new FloatQueue_1.FloatViewQueue()), this.Ecr.set(r, e)),
        e.Push(t, i.Priority, i.OnlyShowInMain),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            10,
            "界面添加到区域队列中",
            ["区域", r],
            ["界面", t.Info.Name],
          ),
        !0
      );
    }
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiFloatContainer",
          10,
          "界面直接在区域中显示",
          ["区域", r],
          ["界面", t.Info.Name],
        ),
      this.Scr.set(r, t),
      !1
    );
  }
  ClearContainer() {
    for (const a of this.Ecr.values()) a.Clear();
    var e,
      i,
      t,
      r,
      o = [];
    for ([e, i] of this.Scr)
      (i.IsExistInLeaveLevel = !0),
        i.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(i), o.push(e));
    for (const n of o) this.Scr.delete(n);
    o.length = 0;
    for ([t, r] of this.ycr)
      (r.IsExistInLeaveLevel = !0),
        r.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(r), o.push(t));
    for (const s of o) this.ycr.delete(s);
  }
  ShowFloatTips() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiFloatContainer", 10, "主界面显示"),
      this.xcr(),
      this.wcr();
  }
  HideFloatTips() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiFloatContainer", 10, "主界面隐藏"),
      this.Bcr();
  }
  StartWaitingNormalView() {
    for (const e of Array.from(this.Ecr.keys())) this.Scr.has(e) || this.Ucr(e);
  }
  xcr() {
    for (const t of Array.from(this.ycr.keys())) {
      var e = this.ycr.get(t),
        i = (this.ycr.delete(t), this.Scr.get(t));
      this.Scr.set(t, e), this.bcr(e, !0), i && this.$Oe(t, i);
    }
  }
  wcr() {
    for (const e of Array.from(this.Ecr.keys())) this.Scr.get(e) || this.Ucr(e);
  }
  Bcr() {
    for (const t of Array.from(this.Scr.keys())) {
      var e = this.Scr.get(t),
        i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
          e.Info.Name,
        );
      this.Rcr(i.OnlyShowInMain) &&
        (this.ycr.set(t, e), this.Scr.delete(t), this.Ucr(t), this.bcr(e, !1));
    }
  }
  bcr(e, i) {
    e.OpenPromise?.IsPending()
      ? (e.SetLoadingFinishOperation(() => {
          this.qcr(e, i);
        }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            10,
            "界面在打开中",
            ["view", e.Info.Name],
            ["bActive", i],
          ))
      : this.qcr(e, i);
  }
  qcr(e, i) {
    i
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            10,
            "界面唤醒界面动画",
            ["view", e.Info.Name],
            ["bActive", i],
          ),
        e.SetActive(!0))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            10,
            "界面暂停界面动画",
            ["view", e.Info.Name],
            ["bActive", i],
          ),
        e.SetActive(!1));
  }
  async PreOpenViewAsync(e) {
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          16,
          "此类型容器不支持预打开界面",
          ["name", e.Info.Name],
          ["type", e.Info.Type],
        ),
      Promise.resolve()
    );
  }
  async OpenViewAfterPreOpenedAsync(e) {
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          16,
          "此类型容器不支持预打开界面",
          ["name", e.Info.Name],
          ["type", e.Info.Type],
        ),
      Promise.reject(TypeError("此类型容器不支持预打开界面"))
    );
  }
  RefreshByPureModeChanged() {
    for (const e of this.Scr.values()) this.RefreshParentUiItem(e);
    for (const i of this.ycr.values()) this.RefreshParentUiItem(i);
  }
  RefreshParentUiItem(i) {
    var t = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
      i.Info.Name,
    );
    if (t.OnlyShowInMain) {
      let e = void 0;
      (e =
        t.HideInPureMode &&
        ModelManager_1.ModelManager.BattleUiModel?.PureModeData?.IsOpen
          ? UiLayer_1.UiLayer.GetPureModeFloatUnit(
              UiLayerType_1.ELayerType.BattleFloat,
            )
          : UiLayer_1.UiLayer.GetFloatUnit(
              UiLayerType_1.ELayerType.BattleFloat,
              t.RootItemIndex,
            )) && i.SetParentUiItem(e);
    }
  }
}
exports.UiViewFloatContainer = UiViewFloatContainer;
//# sourceMappingURL=UiViewFloatContainer.js.map
