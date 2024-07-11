"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewFloatContainer = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Game/Manager/ConfigManager");
const UiModel_1 = require("../../UiModel");
const UiViewContainer_1 = require("../UiViewContainer");
const FloatQueue_1 = require("./FloatQueue");
class UiViewFloatContainer extends UiViewContainer_1.UiViewContainer {
  constructor(i, e, t) {
    super(),
      (this.Iur = new Map()),
      (this.Tur = new Map()),
      (this.Lur = new Map()),
      (this.Iur = i),
      (this.Tur = e),
      (this.Lur = t);
  }
  async OpenViewAsync(i) {
    const e = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
      i.Info.Name,
    );
    this.Dur(e, i) || (await this.OpenViewImplementAsync(i));
  }
  async CloseViewAsync(i) {
    const e = i.Info.Name;
    const t = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(e);
    const o = StringUtils_1.StringUtils.IsEmpty(t.Area) ? e : t.Area;
    const r = i.GetViewId();
    (await this.Rur(o, t.OnlyShowInMain, e, r)) ||
      this.Uur(o, e, r) ||
      (this.Iur.get(o)?.Delete(e, r)
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
  async Rur(i, e, t, o) {
    const r = this.Tur.get(i);
    return (
      !!r &&
      !!this.Aur(r, t, o) &&
      ((await this.$Oe(i, r)) &&
        (this.Pur(e)
          ? this.Lur.get(i)?.GetViewId() === o
            ? this.Lur.delete(i)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiFloatContainer",
                11,
                "[HideViewMap.delete]可能存在同个界面执行多次关闭,业务需要关注",
                ["区域", i],
                ["界面", t],
              )
          : this.Tur.get(i)?.GetViewId() === o
            ? this.xur(i)
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
  Uur(i, e, t) {
    const o = this.Lur.get(i);
    return (
      !!o &&
      !!this.Aur(o, e, t) &&
      (o.Destroy(),
      this.Lur.delete(i),
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
  Aur(i, e, t) {
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
  Pur(i) {
    return i && !UiModel_1.UiModel.IsInMainView;
  }
  wur(i) {
    return !(!i.IsWaitNormal || !UiModel_1.UiModel.InNormalQueue);
  }
  xur(i) {
    const e = this.Bur(i);
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
  Bur(i) {
    const e = this.Iur.get(i);
    if (e) {
      const t = e.Pop(UiModel_1.UiModel.IsInMainView);
      if (t)
        return (
          e.Size <= 0 && this.Iur.delete(i),
          this.Tur.set(i, t.ViewBase),
          t.ViewBase
        );
    }
    this.Tur.delete(i);
  }
  Dur(e, t) {
    const o = StringUtils_1.StringUtils.IsEmpty(e.Area) ? t.Info.Name : e.Area;
    if (this.Tur.has(o) || this.Pur(e.OnlyShowInMain) || this.wur(e)) {
      let i = this.Iur.get(o);
      return (
        i || ((i = new FloatQueue_1.FloatViewQueue()), this.Iur.set(o, i)),
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
      this.Tur.set(o, t),
      !1
    );
  }
  ClearContainer() {
    for (const a of this.Iur.values()) a.Clear();
    let i;
    let e;
    let t;
    let o;
    const r = [];
    for ([i, e] of this.Tur)
      (e.IsExistInLeaveLevel = !0),
        e.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(e), r.push(i));
    for (const n of r) this.Tur.delete(n);
    r.length = 0;
    for ([t, o] of this.Lur)
      (o.IsExistInLeaveLevel = !0),
        o.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(o), r.push(t));
    for (const s of r) this.Lur.delete(s);
  }
  ShowFloatTips() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiFloatContainer", 11, "主界面显示"),
      this.bur(),
      this.qur();
  }
  HideFloatTips() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiFloatContainer", 11, "主界面隐藏"),
      this.Gur();
  }
  StartWaitingNormalView() {
    for (const i of Array.from(this.Iur.keys())) this.Tur.has(i) || this.xur(i);
  }
  bur() {
    for (const t of Array.from(this.Lur.keys())) {
      const i = this.Lur.get(t);
      const e = (this.Lur.delete(t), this.Tur.get(t));
      this.Tur.set(t, i), this.Nur(i, !0), e && this.$Oe(t, e);
    }
  }
  qur() {
    for (const i of Array.from(this.Iur.keys())) this.Tur.get(i) || this.xur(i);
  }
  Gur() {
    for (const t of Array.from(this.Tur.keys())) {
      const i = this.Tur.get(t);
      const e = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
        i.Info.Name,
      );
      this.Pur(e.OnlyShowInMain) &&
        (this.Lur.set(t, i), this.Tur.delete(t), this.xur(t), this.Nur(i, !1));
    }
  }
  Nur(i, e) {
    i.OpenPromise?.IsPending()
      ? (i.SetLoadingFinishOperation(() => {
          this.Our(i, e);
        }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiFloatContainer",
            11,
            "界面在打开中",
            ["view", i.Info.Name],
            ["bActive", e],
          ))
      : this.Our(i, e);
  }
  Our(i, e) {
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
// # sourceMappingURL=UiViewFloatContainer.js.map
