"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewContainer = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiConfig_1 = require("../Define/UiConfig");
const UiLayerType_1 = require("../Define/UiLayerType");
const UiPopViewData_1 = require("../Define/UiPopViewData");
const UiMask_1 = require("../UiMask");
const UiModel_1 = require("../UiModel");
class UiViewContainer {
  constructor() {
    this.OpenViewMask = new UiMask_1.UiMask("OpenView");
  }
  async OpenViewImplementAsync(i) {
    if (
      (this.IsIgnoreOpenViewMask(i) || this.OpenViewMask.SetMask(!0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiViewContainer",
          17,
          "OpenViewImplement 界面打开开始",
          ["ViewName", i.Info?.Name],
          ["path", i.Info.UiPath],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OpenView,
        i.Info.Name,
        i.GetViewId(),
      ),
      this.OnContainerOpenView(i),
      await i.CreateAsync())
    ) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiViewContainer", 17, "OpenViewImplement 界面Start", [
          "ViewName",
          i.Info?.Name,
        ]),
        await i.StartAsync();
      let e = !0;
      i.ClosePromise
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiViewContainer",
              38,
              "[OpenViewImplement] 界面打开中断显示,界面已开始关闭流程",
              ["ViewName", i.Info.Name],
              ["Id", i.GetViewId()],
            ),
          (e = !1))
        : i.Parent &&
          i.Parent.GetClosePromiseImplement() &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiViewContainer",
              38,
              "[OpenViewImplement] 界面打开中断显示,父界面已开始关闭流程",
              ["ViewName", i.Info.Name],
              ["Id", i.GetViewId()],
            ),
          (e = !1)),
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiViewContainer",
              17,
              "OpenViewImplement 界面Show",
              ["ViewName", i.Info?.Name],
            ),
          await i.ShowAsync()),
        this.IsIgnoreOpenViewMask(i) || this.OpenViewMask.SetMask(!1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiViewContainer",
            17,
            "OpenViewImplement 界面打开完成",
            ["ViewName", i.Info?.Name],
            ["path", i.Info.UiPath],
          );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "UiViewContainer",
          17,
          "[OpenViewImplement] CreateAsync failed",
          ["ViewName", i.Info.Name],
        );
  }
  async CloseViewImplementAsync(e) {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiViewContainer",
          17,
          "CloseViewImplement 界面关闭开始",
          ["ViewName", e.Info?.Name],
          ["path", e.Info.UiPath],
        ),
      e.IsShowOrShowing &&
        ((e.LastHide = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiViewContainer", 17, "CloseViewImplement 界面Hide", [
            "ViewName",
            e.Info?.Name,
          ]),
        await e.HideAsync()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiViewContainer",
          17,
          "CloseViewImplement 界面Destroy",
          ["ViewName", e.Info?.Name],
        ),
      await e.DestroyAsync(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiViewContainer",
          17,
          "CloseViewImplement 界面关闭完成",
          ["ViewName", e.Info?.Name],
          ["path", e.Info.UiPath],
        ),
      !0
    );
  }
  IsIgnoreOpenViewMask(e) {
    return (
      (UiConfig_1.UiConfig.TryGetViewInfo(e.Info.Name).Type &
        UiLayerType_1.IGNORE_MASK_TYPE) !=
      0
    );
  }
  OnContainerOpenView(e) {
    let i = e.GetViewParam();
    i instanceof UiPopViewData_1.UiPopViewData &&
      (i.NotAddChildToTopStackView ||
        ((i = UiModel_1.UiModel.NormalStack.Peek()) && i.AddChild(e)));
  }
  TryCatchViewDestroyCompatible(e) {
    try {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiViewContainer",
          11,
          "[Clear] 尝试执行销毁的界面",
          ["Name", e.constructor.name],
          ["ComponentId", e.ComponentId],
        ),
        e.ClearAsync();
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "UiViewContainer",
            11,
            "界面同步关闭异常,业务变量可能未初始化完成,需要关注",
            e,
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiViewContainer",
            11,
            "界面同步关闭异常,业务变量可能未初始化完成,需要关注",
            ["error", e],
          );
    }
  }
}
exports.UiViewContainer = UiViewContainer;
// # sourceMappingURL=UiViewContainer.js.map
