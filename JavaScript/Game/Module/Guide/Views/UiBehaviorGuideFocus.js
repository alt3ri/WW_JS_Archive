"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviorGuideFocus = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GuidePrefabDefine_1 = require("./GuidePrefabDefine");
class UiBehaviorGuideFocus {
  constructor(i) {
    (this.RZt = void 0),
      (this.UZt = void 0),
      (this.AZt = void 0),
      (this.PZt = void 0),
      (this.OQt = void 0),
      (this.OQt = i);
  }
  SetOwner(i) {
    this.OQt = i;
  }
  SetParam(...i) {
    (this.RZt = i[0]),
      (this.PZt = this.RZt.ViewData.ViewConf),
      this.PZt.DynamicTabName
        ? (this.UZt = this.PZt.DynamicTabName)
        : (this.UZt = this.PZt.ViewName);
    i = this.OQt;
    i instanceof UiViewBase_1.UiViewBase
      ? (this.AZt = i.Info?.Name)
      : i instanceof UiTabViewBase_1.UiTabViewBase &&
        (this.AZt = i.GetViewName());
  }
  OnAfterUiShow() {
    this.RZt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "[UiBehaviorGuideFocus] OnShow",
          ["引导组id", this.RZt.OwnerGroup.Id],
          ["聚焦引导Id", this.RZt.Id],
        ),
      1 !== this.RZt.StateMachine.CurrentState
        ? this.RZt.TryEnterExecuting()
        : this.RZt.GuideView?.Show());
  }
  OnBeforeUiHide() {
    this.RZt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "[UiBehaviorGuideFocus] OnHide",
          ["引导组id", this.RZt.OwnerGroup.Id],
          ["聚焦引导Id", this.RZt.Id],
        ),
      this.RZt.GuideView?.Hide());
  }
  CleanGuideStep() {
    this.RZt = void 0;
  }
  OnBeforeDestroy() {
    var i;
    this.RZt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "[UiBehaviorGuideFocus] OnDestroy",
          ["引导组id", this.RZt.OwnerGroup.Id],
          ["步骤Id", this.RZt.Id],
        ),
      (this.AZt = void 0),
      (this.UZt = void 0),
      (i = this.RZt?.StateMachine?.CurrentState) &&
        1 === i &&
        this.RZt.SwitchState(3),
      (this.RZt = void 0));
  }
  PrepareForOpenGuideFocus() {
    var i;
    return (
      this.RZt.ViewData.ResetAttachedUiItem(),
      this.AZt !== this.UZt
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "聚焦引导配置依附的界面与实际打开的界面不一致",
              ["当前打开的界面名称", this.AZt],
              ["引导应该依附的界面", this.UZt],
              ["引导组id", this.RZt.OwnerGroup.Id],
              ["聚焦引导Id", this.RZt.Id],
            ),
          !1)
        : this.xZt()
          ? !(
              !(i = this.RZt.ViewData.GetAttachedView())?.GetRootActor() ||
              !i?.GetActive()
            ) ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "聚焦引导步骤  附着界面不可见而挂起",
                ["this.GuideStepInfo!.Id", this.RZt.Id],
              ),
            !1)
          : (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "聚焦引导步骤  因找不到挂点ui而挂起",
                ["this.GuideStepInfo!.Id", this.RZt.Id],
              ),
            !1)
    );
  }
  xZt() {
    if (!this.OQt)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            `聚焦引导 ${this.RZt.Id} AttachedUiComponentAction为空`,
          ),
        !1
      );
    if (!this.OQt.GetRootItem() || !this.OQt.GetActive())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            `聚焦引导 ${this.RZt.Id} 依附界面还没打开, 打开后再来`,
          ),
        !1
      );
    var i = this.RZt,
      t = this.PZt.ExtraParam;
    if (0 < t.length)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "聚焦引导步骤配置了额外参数, 走扩展逻辑",
            ["步骤Id", i.Id],
          ),
        2 !== (t = this.OQt.GetGuideUiItemAndUiItemForShowEx(t))?.length
          ? (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Guide", 17, "聚焦引导  额外参数解析失败", [
                "stepInfo!.Id",
                i.Id,
              ]),
            !1)
          : ((e = i.ViewData).SetAttachedUiItem(t[0]),
            e.SetAttachedUiItemForShow(t[1]),
            (t = this.OQt.GetGuideScrollViewToLock()) && e.TryLockScrollView(t),
            !0)
      );
    var e = this.PZt.HookName,
      t = this.OQt.GetGuideUiItem(e);
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件",
            ["当前打开的界面名称", this.AZt],
            ["引导应该依附的界面", this.UZt],
            ["引导组id", i.OwnerGroup.Id],
            ["聚焦引导Id", i.Id],
            ["出错的挂点名称", e],
          ),
        !1
      );
    let s = this.PZt.HookNameForShow;
    s = (s = StringUtils_1.StringUtils.IsEmpty(s) ? e : s).replace(
      GuidePrefabDefine_1.NEW_TAG,
      "",
    );
    e = this.OQt.GetGuideUiItem(s);
    return e
      ? (i.ViewData.SetAttachedUiItem(t),
        i.ViewData.SetAttachedUiItemForShow(e),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件",
            ["当前打开的界面名称", this.AZt],
            ["引导应该依附的界面", this.UZt],
            ["引导组id", i.OwnerGroup.Id],
            ["聚焦引导Id", i.Id],
            ["出错的挂点名称", s],
          ),
        !1);
  }
}
exports.UiBehaviorGuideFocus = UiBehaviorGuideFocus;
//# sourceMappingURL=UiBehaviorGuideFocus.js.map
