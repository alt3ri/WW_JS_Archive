"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewPlotContainer = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiViewPending_1 = require("../Base/UiViewPending"),
  UiManager_1 = require("../UiManager"),
  UiModel_1 = require("../UiModel"),
  UiViewContainer_1 = require("./UiViewContainer");
class UiViewPlotContainer extends UiViewContainer_1.UiViewContainer {
  constructor(e) {
    super(),
      (this.v9 = void 0),
      (this.QRl = void 0),
      (this.pjt = !1),
      (this.Ocr = new Array()),
      (this.v9 = e);
  }
  Hcr(e) {
    this.v9.Push(e);
  }
  jcr() {
    var e = this.v9.Pop();
    if (void 0 !== e) return e;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("PlotContainer", 10, "PlotContainer_PopView 出栈失败");
  }
  Mcr(e) {
    var i = this.v9.Delete(e);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "PlotContainer",
            10,
            "PlotContainer_DeleteView删除界面不在栈内",
            ["ViewName", e.Info.Name],
          )),
      i
    );
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    (this.pjt = !0), (this.QRl = new CustomPromise_1.CustomPromise());
  }
  Jft(e = !0) {
    (this.pjt = !1),
      this.QRl?.SetResult(void 0),
      (this.QRl = void 0),
      e && this.Vcr();
  }
  Wcr(e, i) {
    var t = new UiViewPending_1.UiViewPending(e, i);
    if (0 < this.Ocr.length) {
      var o = this.Ocr[this.Ocr.length - 1];
      if (o.Equal(t))
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("PlotContainer", 10, "界面缓存操做重复", [
              "ViewName",
              e.Info.Name,
            ]),
          t.ExecutePromise?.SetResult(!0),
          t
        );
      if (o.IsPairWith(t))
        return (
          this.Ocr.pop(),
          UiManager_1.UiManager.RemoveView(e.GetViewId()),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "PlotContainer",
              10,
              "界面缓存操作成对, 自动移除上一个",
              ["ViewName", e.Info.Name],
            ),
          t.ExecutePromise?.SetResult(!0),
          t
        );
    }
    return (
      this.Ocr.push(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "PlotContainer",
          10,
          "缓存界面操作",
          ["界面", e.Info.Name],
          ["操作类型", i],
        ),
      t
    );
  }
  async Vcr() {
    if (this.Ocr.length) {
      var e = this.Ocr.shift();
      switch (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "PlotContainer",
            10,
            "[ProcessViewPending]执行已缓存的界面操作",
            ["界面", e.View.Info.Name],
            ["操作类型", e.PendingType],
          ),
        e.PendingType)
      ) {
        case 1:
          await this.OpenViewAsync(e.View);
          break;
        case 2:
          await this.CloseViewAsync(e.View);
          break;
        case 3:
          this.Ujt(), await this.gpi(e.View, void 0), this.Jft();
      }
      e.ExecutePromise?.SetResult(!0);
    }
  }
  async Qcr(e, i) {
    var t = async () => {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "PlotContainer",
          10,
          "OpenViewImplement 界面打开开始",
          ["ViewName", e.Info?.Name],
          ["path", e.Info.UiPath],
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenView,
          e.Info.Name,
          e.GetViewId(),
        ),
        (await e.CreateAsync())
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "PlotContainer",
                10,
                "OpenViewImplement 界面Start",
                ["ViewName", e.Info?.Name],
              ),
            await e.StartAsync())
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "PlotContainer",
              10,
              "[OpenStackViewAsync] CreateAsync failed",
              ["ViewName", e.Info.Name],
            );
    };
    i
      ? (await t(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "PlotContainer",
            10,
            "OpenViewImplement 界面Show,上个界面Hide",
            ["ViewName", e.Info?.Name],
            ["LastViewName", i?.Info?.Name],
          ),
        await Promise.all([i?.HideAsync(), e.ShowAsync()]))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "PlotContainer",
            10,
            "OpenViewImplement 界面Show,栈容器界面Hide",
            ["ViewName", e.Info?.Name],
          ),
        await UiManager_1.UiManager.PauseNormalContainer(t, async () => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("PlotContainer", 10, "OpenViewImplement 界面Show", [
              "ViewName",
              e.Info?.Name,
            ]),
            await e.ShowAsync();
        })),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("PlotContainer", 10, "界面打开完成", [
          "path",
          e.Info.UiPath,
        ]);
  }
  async gpi(i, e) {
    var t = this.Ocr.findIndex((e) => e.View === i && 1 === e.PendingType);
    if ((0 <= t && this.Ocr.splice(t, 1), void 0 !== e)) {
      const o = async () => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "PlotContainer",
              10,
              "CloseViewImplement 界面Destroy",
              ["ViewName", i.Info?.Name],
            ),
            await i.DestroyAsync();
        },
        a = async () => {
          i.IsShowOrShowing &&
            ((i.LastHide = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "PlotContainer",
                10,
                "CloseViewImplement 界面Hide",
                ["ViewName", i.Info?.Name],
              ),
            await i.HideAsync());
        };
      await Promise.all([
        (async () => {
          await a(), await o();
        })(),
        (async () => {
          e.IsShowOrShowing ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "PlotContainer",
                10,
                "CloseViewImplement 下个界面Show",
                ["NextViewName", e.Info?.Name],
              ),
            await e.ShowAsync());
        })(),
      ]),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "PlotContainer",
            10,
            "CloseViewImplement 界面关闭完成",
            ["ViewName", i.Info?.Name],
            ["path", i.Info.UiPath],
            ["NextViewName", e.Info?.Name],
          );
    } else {
      const n = async () => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "PlotContainer",
              10,
              "CloseViewImplement 界面Destroy",
              ["ViewName", i.Info?.Name],
            ),
            await i.DestroyAsync();
        },
        s = async () => {
          i.IsShowOrShowing &&
            ((i.LastHide = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "PlotContainer",
                10,
                "CloseViewImplement 界面Hide",
                ["ViewName", i.Info?.Name],
              ),
            await i.HideAsync());
        };
      t = async () => {
        await s(), await n();
      };
      this.v9.Empty
        ? (await UiManager_1.UiManager.ResumeNormalContainer(t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "PlotContainer",
              10,
              "CloseViewImplement 界面关闭完成,栈容器界面Show",
              ["ViewName", i.Info?.Name],
              ["path", i.Info.UiPath],
            ))
        : (await t(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "PlotContainer",
              10,
              "CloseViewImplement 界面关闭完成",
              ["ViewName", i.Info?.Name],
              ["path", i.Info.UiPath],
            ));
    }
  }
  async OpenViewAsync(e) {
    var i;
    this.Rjt
      ? this.Wcr(e, 1)
      : ((i = this.v9.Peek()),
        this.Ujt(),
        this.OpenViewMask.SetMask(e.MaskTag, !0),
        this.Hcr(e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("PlotContainer", 10, "OpenViewAsync 入栈", [
            "ViewName",
            e.Info.Name,
          ]),
        await this.Qcr(e, i),
        this.OpenViewMask.SetMask(e.MaskTag, !1),
        this.Jft());
  }
  async PreOpenViewAsync(e) {
    return (
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiCore",
          10,
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
          10,
          "此类型容器不支持预打开界面",
          ["name", e.Info.Name],
          ["type", e.Info.Type],
        ),
      Promise.reject(TypeError("此类型容器不支持预打开界面"))
    );
  }
  async CloseViewAsync(e) {
    this.Rjt
      ? this.Wcr(e, 2)
      : (this.Ujt(),
        this.v9.Peek() === e
          ? (this.jcr(), await this.gpi(e, this.v9.Peek()))
          : this.Mcr(e) && (await this.gpi(e, void 0)),
        this.Jft());
  }
  ClearContainer(e) {
    var i = [];
    for (let e = this.Ocr.length - 1; 0 <= e; --e) {
      var t = this.Ocr[e].View;
      (t.IsExistInLeaveLevel = !0),
        t.Info.IsPermanent ||
          (t.OpenPromise?.SetResult(!1),
          UiManager_1.UiManager.RemoveView(t.GetViewId()),
          this.Ocr.pop(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "PlotContainer",
              10,
              "[Clear] 清理缓存的界面数据",
              ["Name", t.constructor.name],
              ["ComponentId", t.ComponentId],
            ));
    }
    i.length = 0;
    for (const o of this.v9)
      (o.IsExistInLeaveLevel = !0),
        o.Info.IsPermanent ||
          (e && UiModel_1.UiModel.SeamlessStackWhileList.has(o.Info.Name)) ||
          (this.TryCatchViewDestroyCompatible(o), i.push(o));
    for (const a of i) this.Mcr(a);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("PlotContainer", 10, "ClearContainer 清栈");
  }
}
exports.UiViewPlotContainer = UiViewPlotContainer;
//# sourceMappingURL=UiViewPlotStackContainer.js.map
