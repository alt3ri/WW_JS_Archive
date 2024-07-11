"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewFloatContainer = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Game/Manager/ConfigManager"),
  UiModel_1 = require("../../UiModel"),
  UiViewContainer_1 = require("../UiViewContainer"),
  FloatQueue_1 = require("./FloatQueue");
class UiViewFloatContainer extends UiViewContainer_1.UiViewContainer {
  constructor(i, e, t) {
    super(),
      (this.Ecr = new Map()),
      (this.Scr = new Map()),
      (this.ycr = new Map()),
      (this.Ecr = i),
      (this.Scr = e),
      (this.ycr = t);
  }
  async OpenViewAsync(i) {
    var e = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
      i.Info.Name,
    );
    this.Icr(e, i) || (await this.OpenViewImplementAsync(i));
  }
  async CloseViewAsync(i) {
    var e = i.Info.Name,
      t = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(e),
      o = StringUtils_1.StringUtils.IsEmpty(t.Area) ? e : t.Area,
      r = i.GetViewId();
    (await this.Tcr(o, t.OnlyShowInMain, e, r)) ||
      this.Lcr(o, e, r) ||
      (this.Ecr.get(o)?.Delete(e, r)
        ? (i.ClosePromise?.SetResult(void 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiFloatContainer",
              11,
              "界面关闭成功,队列中关闭",
              ["区域", o],
              ["当前界面", e],
            ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiFloatContainer",
            11,
            "界面关闭失败",
            ["区域", o],
            ["当前界面", e],
          ));
  }
  async Tcr(i, e, t, o) {
    var r = this.Scr.get(i);
    return (
      !!r &&
      !!this.Dcr(r, t, o) &&
      ((await this.$Oe(i, r)) &&
        (this.Rcr(e)
          ? this.ycr.get(i)?.GetViewId() === o
            ? this.ycr.delete(i)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiFloatContainer",
                11,
                "[HideViewMap.delete]可能存在同个界面执行多次关闭,业务需要关注",
                ["区域", i],
                ["界面", t],
              )
          : this.Scr.get(i)?.GetViewId() === o
            ? this.Ucr(i)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiFloatContainer",
                11,
                "[HandleNextViewFromQueue]可能存在同个界面执行多次关闭,业务需要关注",
                ["区域", i],
                ["界面", t],
              )),
      !0)
    );
  }
  Lcr(i, e, t) {
    var o = this.ycr.get(i);
    return (
      !!o &&
      !!this.Dcr(o, e, t) &&
      (o.Destroy(),
      this.ycr.delete(i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiFloatContainer",
          11,
          "界面关闭成功,隐藏中关闭",
          ["区域", i],
          ["当前界面", e],
        ),
      !0)
    );
  }
  Dcr(i, e, t) {
    return (
      !(i.Info.Name !== e || (t && i.GetViewId() !== t)) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiFloatContainer",
          11,
          "界面检查失败",
          ["view.Info.Name", i.Info.Name],
          ["name", e],
          ["view.GetViewId()", i.GetViewId()],
          ["viewId", t],
        ),
      !1)
    );
  }
  async $Oe(i, e) {
    return (
      !!(await this.CloseViewImplementAsync(e)) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiFloatContainer",
          11,
          "界面关闭成功,显示中关闭",
          ["区域", i],
          ["当前界面", e.Info.Name],
        ),
      !0)
    );
  }
  Rcr(i) {
    return i && !UiModel_1.UiModel.IsInMainView;
  }
  Acr(i) {
    return !(!i.IsWaitNormal || !UiModel_1.UiModel.InNormalQueue);
  }
  Ucr(i) {
    var e = this.Pcr(i);
    e &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiFloatContainer",
          11,
          "从队列中获取要显示的界面",
          ["区域", i],
          ["界面", e.Info.Name],
        ),
      this.OpenViewImplementAsync(e));
  }
  Pcr(i) {
    var e = this.Ecr.get(i);
    if (e) {
      var t = e.Pop(UiModel_1.UiModel.IsInMainView);
      if (t)
        return (
          e.Size <= 0 && this.Ecr.delete(i),
          this.Scr.set(i, t.ViewBase),
          t.ViewBase
        );
    }
    this.Scr.delete(i);
  }
  Icr(e, t) {
    var o = StringUtils_1.StringUtils.IsEmpty(e.Area) ? t.Info.Name : e.Area;
    if (this.Scr.has(o) || this.Rcr(e.OnlyShowInMain) || this.Acr(e)) {
      let i = this.Ecr.get(o);
      return (
        i || ((i = new FloatQueue_1.FloatViewQueue()), this.Ecr.set(o, i)),
        i.Push(t, e.Priority, e.OnlyShowInMain),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            11,
            "界面添加到区域队列中",
            ["区域", o],
            ["界面", t.Info.Name],
          ),
        !0
      );
    }
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiFloatContainer",
          11,
          "界面直接在区域中显示",
          ["区域", o],
          ["界面", t.Info.Name],
        ),
      this.Scr.set(o, t),
      !1
    );
  }
  ClearContainer() {
    for (const a of this.Ecr.values()) a.Clear();
    var i,
      e,
      t,
      o,
      r = [];
    for ([i, e] of this.Scr)
      (e.IsExistInLeaveLevel = !0),
        e.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(e), r.push(i));
    for (const n of r) this.Scr.delete(n);
    r.length = 0;
    for ([t, o] of this.ycr)
      (o.IsExistInLeaveLevel = !0),
        o.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(o), r.push(t));
    for (const s of r) this.ycr.delete(s);
  }
  ShowFloatTips() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiFloatContainer", 11, "主界面显示"),
      this.xcr(),
      this.wcr();
  }
  HideFloatTips() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiFloatContainer", 11, "主界面隐藏"),
      this.Bcr();
  }
  StartWaitingNormalView() {
    for (const i of Array.from(this.Ecr.keys())) this.Scr.has(i) || this.Ucr(i);
  }
  xcr() {
    for (const t of Array.from(this.ycr.keys())) {
      var i = this.ycr.get(t),
        e = (this.ycr.delete(t), this.Scr.get(t));
      this.Scr.set(t, i), this.bcr(i, !0), e && this.$Oe(t, e);
    }
  }
  wcr() {
    for (const i of Array.from(this.Ecr.keys())) this.Scr.get(i) || this.Ucr(i);
  }
  Bcr() {
    for (const t of Array.from(this.Scr.keys())) {
      var i = this.Scr.get(t),
        e = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
          i.Info.Name,
        );
      this.Rcr(e.OnlyShowInMain) &&
        (this.ycr.set(t, i), this.Scr.delete(t), this.Ucr(t), this.bcr(i, !1));
    }
  }
  bcr(i, e) {
    i.OpenPromise?.IsPending()
      ? (i.SetLoadingFinishOperation(() => {
          this.qcr(i, e);
        }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            11,
            "界面在打开中",
            ["view", i.Info.Name],
            ["bActive", e],
          ))
      : this.qcr(i, e);
  }
  qcr(i, e) {
    e
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            11,
            "界面唤醒界面动画",
            ["view", i.Info.Name],
            ["bActive", e],
          ),
        i.SetActive(!0))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            11,
            "界面暂停界面动画",
            ["view", i.Info.Name],
            ["bActive", e],
          ),
        i.SetActive(!1));
  }
  async PreOpenViewAsync(i) {
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          17,
          "此类型容器不支持预打开界面",
          ["name", i.Info.Name],
          ["type", i.Info.Type],
        ),
      Promise.resolve()
    );
  }
  async OpenViewAfterPreOpenedAsync(i) {
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          17,
          "此类型容器不支持预打开界面",
          ["name", i.Info.Name],
          ["type", i.Info.Type],
        ),
      Promise.reject(TypeError("此类型容器不支持预打开界面"))
    );
  }
}
exports.UiViewFloatContainer = UiViewFloatContainer;
//# sourceMappingURL=UiViewFloatContainer.js.map
