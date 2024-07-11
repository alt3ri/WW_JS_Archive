"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviorGuideFocus = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class UiBehaviorGuideFocus {
  constructor(i) {
    (this.Rzt = void 0),
      (this.Uzt = void 0),
      (this.Azt = void 0),
      (this.Pzt = void 0),
      (this.OKt = void 0),
      (this.OKt = i);
  }
  SetOwner(i) {
    this.OKt = i;
  }
  SetParam(...i) {
    (this.Rzt = i[0]),
      (this.Pzt = this.Rzt.ViewData.ViewConf),
      this.Pzt.DynamicTabName
        ? (this.Uzt = this.Pzt.DynamicTabName)
        : (this.Uzt = this.Pzt.ViewName);
    i = this.OKt;
    i instanceof UiViewBase_1.UiViewBase
      ? (this.Azt = i.Info?.Name)
      : i instanceof UiTabViewBase_1.UiTabViewBase &&
        (this.Azt = i.GetViewName());
  }
  OnAfterUiShow() {
    this.Rzt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "[UiBehaviorGuideFocus] OnShow",
          ["引导组id", this.Rzt.OwnerGroup.Id],
          ["聚焦引导Id", this.Rzt.Id],
        ),
      1 !== this.Rzt.StateMachine.CurrentState
        ? this.Rzt.TryEnterExecuting()
        : this.Rzt.GuideView?.Show());
  }
  OnBeforeUiHide() {
    this.Rzt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "[UiBehaviorGuideFocus] OnHide",
          ["引导组id", this.Rzt.OwnerGroup.Id],
          ["聚焦引导Id", this.Rzt.Id],
        ),
      this.Rzt.GuideView?.Hide());
  }
  CleanGuideStep() {
    this.Rzt = void 0;
  }
  OnBeforeDestroy() {
    var i;
    this.Rzt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "[UiBehaviorGuideFocus] OnDestroy",
          ["引导组id", this.Rzt.OwnerGroup.Id],
          ["步骤Id", this.Rzt.Id],
        ),
      (this.Azt = void 0),
      (this.Uzt = void 0),
      (i = this.Rzt?.StateMachine?.CurrentState) &&
        1 === i &&
        this.Rzt.SwitchState(3),
      (this.Rzt = void 0));
  }
  PrepareForOpenGuideFocus() {
    var i;
    return (
      this.Rzt.ViewData.ResetAttachedUiItem(),
      this.Azt !== this.Uzt
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "聚焦引导配置依附的界面与实际打开的界面不一致",
              ["当前打开的界面名称", this.Azt],
              ["引导应该依附的界面", this.Uzt],
              ["引导组id", this.Rzt.OwnerGroup.Id],
              ["聚焦引导Id", this.Rzt.Id],
            ),
          !1)
        : this.xzt()
          ? !(
              !(i = this.Rzt.ViewData.GetAttachedView())?.GetRootActor() ||
              !i?.GetActive()
            ) ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "聚焦引导步骤  附着界面不可见而挂起",
                ["this.GuideStepInfo!.Id", this.Rzt.Id],
              ),
            !1)
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "聚焦引导步骤  因找不到挂点ui而挂起",
                ["this.GuideStepInfo!.Id", this.Rzt.Id],
              ),
            !1)
    );
  }
  xzt() {
    if (!this.OKt)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            `聚焦引导 ${this.Rzt.Id} AttachedUiComponentAction为空`,
          ),
        !1
      );
    if (!this.OKt.GetRootItem() || !this.OKt.GetActive())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            `聚焦引导 ${this.Rzt.Id} 依附界面还没打开, 打开后再来`,
          ),
        !1
      );
    var i = this.Rzt,
      t = this.Pzt.ExtraParam;
    if (0 < t.length)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "聚焦引导步骤配置了额外参数, 走扩展逻辑",
            ["步骤Id", i.Id],
          ),
        2 !== (t = this.OKt.GetGuideUiItemAndUiItemForShowEx(t))?.length
          ? (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Guide", 17, "聚焦引导  额外参数解析失败", [
                "stepInfo!.Id",
                i.Id,
              ]),
            !1)
          : ((s = i.ViewData).SetAttachedUiItem(t[0]),
            s.SetAttachedUiItemForShow(t[1]),
            (t = this.OKt.GetGuideScrollViewToLock()) && s.TryLockScrollView(t),
            !0)
      );
    var s = this.Pzt.HookName,
      t = this.OKt.GetGuideUiItem(s);
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件",
            ["当前打开的界面名称", this.Azt],
            ["引导应该依附的界面", this.Uzt],
            ["引导组id", i.OwnerGroup.Id],
            ["聚焦引导Id", i.Id],
            ["出错的挂点名称", s],
          ),
        !1
      );
    let e = this.Pzt.HookNameForShow;
    StringUtils_1.StringUtils.IsEmpty(e) && (e = s);
    s = this.OKt.GetGuideUiItem(e);
    return s
      ? (i.ViewData.SetAttachedUiItem(t),
        i.ViewData.SetAttachedUiItemForShow(s),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件",
            ["当前打开的界面名称", this.Azt],
            ["引导应该依附的界面", this.Uzt],
            ["引导组id", i.OwnerGroup.Id],
            ["聚焦引导Id", i.Id],
            ["出错的挂点名称", e],
          ),
        !1);
  }
}
exports.UiBehaviorGuideFocus = UiBehaviorGuideFocus;
//# sourceMappingURL=UiBehaviorGuideFocus.js.map
