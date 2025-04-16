"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewStackContainer = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  DoublyList_1 = require("../../../Core/Container/DoublyList"),
  Stack_1 = require("../../../Core/Container/Stack"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController"),
  UiCameraAnimationController_1 = require("../../Module/UiCameraAnimation/UiCameraAnimationController"),
  UiViewPending_1 = require("../Base/UiViewPending"),
  UiManager_1 = require("../UiManager"),
  UiModel_1 = require("../UiModel"),
  UiViewContainer_1 = require("./UiViewContainer");
class UiViewStackContainer extends UiViewContainer_1.UiViewContainer {
  constructor(e) {
    super(),
      (this.v9 = void 0),
      (this.Ncr = new Map()),
      (this.pjt = !1),
      (this.tza = void 0),
      (this.QRl = void 0),
      (this.Ocr = new Array()),
      (this.kcr = new DoublyList_1.default(void 0)),
      (this.Fcr = new Map()),
      (this.v9 = e);
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
  Hcr(e) {
    this.v9.Push(e);
    var i = e.Info.Name;
    let t = this.Ncr.get(i);
    t || ((t = new Set()), this.Ncr.set(i, t)), t.add(e);
  }
  jcr() {
    var e,
      i,
      t = this.v9.Pop();
    if (void 0 !== t)
      return (
        (e = t.Info.Name),
        (i = this.Ncr.get(e)) &&
          (i.delete(t), i.size <= 0) &&
          this.Ncr.delete(e),
        t
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiCore", 16, "StackContainer_PopView 出栈失败");
  }
  Mcr(e) {
    var i = e.Info.Name,
      t = this.Ncr.get(i),
      t =
        (t && (t.delete(e), t.size <= 0) && this.Ncr.delete(i),
        this.v9.Delete(e));
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCore",
            16,
            "StackContainer_DeleteView删除界面不在栈内",
            ["ViewName", e.Info.Name],
          )),
      t
    );
  }
  async Vcr() {
    if (this.Ocr.length) {
      var e = this.Ocr.shift();
      switch (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            16,
            "[ProcessViewPending]执行已缓存的界面操作",
            ["界面", e.View.Info.Name],
            ["操作类型", e.PendingType],
          ),
        e.PendingType)
      ) {
        case 0:
          await this.OpenViewAfterPreOpenedAsync(e.View);
          break;
        case 1:
          await this.OpenViewAsync(e.View);
          break;
        case 2:
          await this.CloseViewAsync(e.View);
          break;
        case 3:
          this.Ujt(), await this.gpi(e.View, void 0), this.Jft();
          break;
        case 4:
          await this.ResetToViewAsync(e.View);
      }
      e.ExecutePromise?.SetResult(!0);
    }
  }
  async OpenViewAsync(e) {
    if (this.Rjt) this.Wcr(e, 1);
    else {
      var i = this.v9.Peek();
      if (e.IsQueueView) {
        if (i?.IsQueueView) return this.Kcr(e), void this.Vcr();
        if (UiModel_1.UiModel.InNormalQueue)
          return this.Kcr(e), void this.Vcr();
      }
      this.Ujt(),
        this.IsIgnoreOpenViewMask(e) ||
          this.OpenViewMask.SetMask(e.MaskTag, !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.StackPreOpenView,
          e.Info.Name,
        ),
        this.Hcr(e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 16, "OpenViewAsync 入栈", [
            "ViewName",
            e.Info.Name,
          ]),
        await this.Qcr(e, i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.StackOpenView,
          e.GetViewId(),
          i?.Info,
        ),
        this.IsIgnoreOpenViewMask(e) ||
          this.OpenViewMask.SetMask(e.MaskTag, !1),
        this.Jft();
    }
  }
  async PreOpenViewAsync(e) {
    (await e.CreateAsync()) ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiCore", 16, "[PreOpenViewAsync] CreateAsync failed", [
          "ViewName",
          e.Info.Name,
        ]));
  }
  async OpenViewAfterPreOpenedAsync(e) {
    if (this.Rjt) this.Wcr(e, 0);
    else {
      var i = this.v9.Peek();
      if (e.IsQueueView) {
        if (i?.IsQueueView) return void this.Kcr(e);
        if (UiModel_1.UiModel.InNormalQueue) return void this.Kcr(e);
      }
      this.Ujt(),
        this.IsIgnoreOpenViewMask(e) ||
          this.OpenViewMask.SetMask(e.MaskTag, !0),
        e.OnOpenAfterPreOpened(),
        this.Hcr(e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 16, "OpenViewAfterPreOpenedAsync 入栈", [
            "ViewName",
            e.Info.Name,
          ]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenView,
          e.Info.Name,
          e.GetViewId(),
        ),
        await e.StartAsync(),
        i?.Hide(),
        await e.ShowAsync(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.StackOpenView,
          e.GetViewId(),
          i?.Info,
        ),
        this.IsIgnoreOpenViewMask(e) ||
          this.OpenViewMask.SetMask(e.MaskTag, !1),
        this.Jft();
    }
  }
  async Qcr(e, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiCore",
        10,
        "OpenViewImplement 界面打开开始",
        ["ViewName", e.Info?.Name],
        ["path", e.Info.UiPath],
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OpenView,
        e.Info.Name,
        e.GetViewId(),
      );
    var t = i?.Info.ScenePath,
      t =
        (t &&
          e.Info.ScenePath === t &&
          ((e.SkipLoadScene = !0),
          (e.SceneLoaded = !0),
          (i.SkipReleaseScene = !0)),
        e.WillLoadScene()),
      o =
        (t &&
          (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
            "Start",
            e.Info.Name,
          )),
        ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(
          e.Info.Name,
        ));
    o.StartBlackScreen &&
      !StringUtils_1.StringUtils.IsBlank(o.StartBlackScreen.ShowAnimName) &&
      (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
        o.StartBlackScreen.ShowAnimName,
        e.Info.Name,
      )),
      (await e.CreateAsync())
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 16, "OpenViewImplement 界面Start", [
              "ViewName",
              e.Info?.Name,
            ]),
          await e.StartAsync(),
          o.StartBlackScreen &&
            !StringUtils_1.StringUtils.IsBlank(
              o.StartBlackScreen.HideAnimName,
            ) &&
            BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
              o.StartBlackScreen.HideAnimName,
              e.Info.Name,
            ),
          i?.WillReleaseScene() || t
            ? (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
                "Start",
                e.Info.Name,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 16, "OpenViewImplement 上个界面Hide", [
                  "LastViewName",
                  i?.Info?.Name,
                ]),
              await i.HideAsync(),
              BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                "Close",
                e.Info.Name,
              ),
              this.xxc(e, !1),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 16, "OpenViewImplement 界面Show", [
                  "ViewName",
                  e.Info?.Name,
                ]),
              await e.ShowAsync())
            : (this.xxc(e, !0),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiCore",
                  16,
                  "OpenViewImplement 界面Show,上个界面Hide",
                  ["ViewName", e.Info?.Name],
                  ["LastViewName", i?.Info?.Name],
                ),
              await Promise.all([i?.HideAsync(), e.ShowAsync()])),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 10, "界面打开完成", [
              "path",
              e.Info.UiPath,
            ]))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            10,
            "[OpenStackViewAsync] CreateAsync failed",
            ["ViewName", e.Info.Name],
          );
  }
  async CloseViewAsync(i) {
    if (this.Rjt) this.Wcr(i, 2);
    else if (UiModel_1.UiModel.InNormalQueue) {
      this.Ujt();
      const i = this.v9.Peek();
      this.jcr();
      let e = this.v9.Peek();
      if (0 < this.Fcr.size) {
        var t = this.kcr.GetHeadNode().Next;
        if (
          ((e = t.Element),
          this.Hcr(e),
          this.$cr(t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OpenView,
            e.Info.Name,
            e.GetViewId(),
          ),
          !(await e.CreateAsync()))
        )
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiCore",
                10,
                "[CloseViewAsync] CreateAsync failed",
                ["ViewName", e.Info.Name],
              ),
            void this.Jft()
          );
        await e.StartAsync();
      }
      await this.gpi(i, e), void this.Jft();
    } else
      this.Ujt(),
        this.v9.Peek() === i
          ? (this.jcr(), await this.gpi(i, this.v9.Peek()))
          : this.Mcr(i) && (await this.gpi(i, void 0)),
        this.Jft();
  }
  async CloseAndOpenNewAsync(e, i) {
    if (this.Rjt)
      i.IsQueueView
        ? (this.Wcr(e, 2), this.Kcr(i))
        : (this.Wcr(e, 3), this.Wcr(i, 1));
    else {
      if ((this.Ujt(), e === this.v9.Peek())) {
        if (
          (this.jcr(),
          this.Hcr(i),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 16, "CloseAndOpenNewAsync 入栈", [
              "ViewName",
              i.Info.Name,
            ]),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OpenView,
            i.Info.Name,
            i.GetViewId(),
          ),
          !(await i.CreateAsync()))
        )
          return void (
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "UiCore",
              10,
              "[CloseAndOpenNewAsync] CreateAsync failed",
              ["ViewName", i.Info.Name],
            )
          );
        await i.StartAsync(), await this.gpi(e, i);
      } else
        this.Mcr(e) && (await this.gpi(e, void 0)),
          this.Hcr(i),
          await this.Qcr(i, void 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 16, "CloseAndOpenNewAsync 入栈", [
              "ViewName",
              i.Info.Name,
            ]);
      this.Jft();
    }
  }
  async ResetToViewAsync(e) {
    if (this.Rjt) await this.Wcr(e, 4)?.ExecutePromise?.Promise;
    else {
      var i = new Array();
      for (const a of this.Ocr)
        UiModel_1.UiModel.ResetToViewWhiteSet.has(a.View.Info.Name) ||
        5 === a.PendingType
          ? i.push(a)
          : 1 === a.PendingType && a.View.Destroy();
      if (((this.Ocr = i), UiModel_1.UiModel.InNormalQueue)) this.Wcr(e, 4);
      else if (!this.v9.Empty) {
        this.Ujt(), (this.tza = new CustomPromise_1.CustomPromise());
        var t = e.Info.Name;
        const s = this.v9.Peek();
        if (s.Info.Name !== t) {
          this.jcr();
          let e = void 0;
          for (
            var o = new Stack_1.Stack();
            0 < this.v9.Size && t !== (e = this.v9.Peek()).Info.Name;

          )
            UiModel_1.UiModel.ResetToViewWhiteSet.has(e.Info.Name)
              ? (o.Push(e), this.jcr())
              : (this.jcr(), await this.gpi(e, void 0));
          for (; 0 < o.Size; ) {
            const s = o.Pop();
            this.Hcr(s);
          }
          "BattleView" === (e = this.v9.Peek()).Info.Name &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ResetModuleByResetToBattleView,
            ),
            await this.gpi(s, e),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("UiCore", 16, "重置回到界面成功", [
                "ViewName",
                e.Info.Name,
              ]),
            "BattleView" === e.Info.Name &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ResetModuleAfterResetToBattleView,
              );
        } else {
          e = this.v9.Peek();
          "BattleView" === e.Info.Name &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ResetModuleByResetToBattleView,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ResetModuleAfterResetToBattleView,
            )),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("UiCore", 16, "重置回到界面成功", [
                "ViewName",
                e.Info.Name,
              ]);
        }
        this.tza.SetResult(), (this.tza = void 0), this.Jft();
      }
    }
  }
  async gpi(i, e) {
    var t = this.Fcr.get(i),
      t =
        (t && this.$cr(t),
        this.Ocr.findIndex((e) => e.View === i && 1 === e.PendingType));
    if ((0 <= t && this.Ocr.splice(t, 1), void 0 !== e)) {
      t = e?.Info.ScenePath;
      t &&
        i.Info.ScenePath === t &&
        ((i.SkipReleaseScene = !0), (e.SkipLoadScene = !0));
      const a = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(
          i.Info.Name,
        ),
        s = e?.WillLoadScene(),
        r = i.WillReleaseScene(),
        n =
          a.CloseBlackScreen &&
          !StringUtils_1.StringUtils.IsBlank(a.CloseBlackScreen.ShowAnimName);
      const _ = async () => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面Destroy", [
              "ViewName",
              i.Info?.Name,
            ]),
            await i.DestroyAsync();
        },
        h = async () => {
          i.IsShowOrShowing &&
            ((i.LastHide = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面Hide", [
                "ViewName",
                i.Info?.Name,
              ]),
            await i.HideAsync());
        };
      var t = async () => {
          await h(), await _();
        },
        o = async () => {
          e.IsShowOrShowing ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("UiCore", 16, "CloseViewImplement 下个界面Show", [
                "NextViewName",
                e.Info?.Name,
              ]),
            await e.ShowAsync());
        };
      s || r || n
        ? (await Promise.all([
            (async () => {
              n
                ? await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
                    a.CloseBlackScreen.ShowAnimName,
                    i.Info.Name,
                  )
                : r
                  ? await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
                      "Start",
                      i.Info.Name,
                    )
                  : s &&
                    (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
                      "Start",
                      e.Info.Name,
                    ));
            })(),
            t(),
          ]),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCore", 16, "#######黑屏+销毁", [
              "ViewName",
              i.Info.Name,
            ]),
          this.Dxc(i, e?.Info),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCore", 16, "#######镜头Pop", [
              "ViewName",
              i.Info.Name,
            ]),
          this.xxc(e, !1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCore", 16, "#######镜头Push", [
              "ViewName",
              i.Info.Name,
            ]),
          e &&
            ((e.ShowPromise = new CustomPromise_1.CustomPromise()),
            s &&
              ((e.LoadScenePromise = new CustomPromise_1.CustomPromise()),
              (e.SkipRemoveBlackScreen = !0)),
            o(),
            await e?.LoadScenePromise?.Promise,
            (e.SkipRemoveBlackScreen = !1),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("UiCore", 16, "#######加载场景", [
                "ViewName",
                i.Info.Name,
              ]),
            n
              ? BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                  a.CloseBlackScreen.HideAnimName,
                  i.Info.Name,
                )
              : r
                ? BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                    "Close",
                    i.Info.Name,
                  )
                : s &&
                  BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                    "Close",
                    e.Info.Name,
                  ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("UiCore", 16, "#######黑屏移除", [
                "ViewName",
                i.Info.Name,
              ]),
            await e.ShowPromise?.Promise,
            (e.ShowPromise = void 0),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug("UiCore", 16, "#######界面显示", [
              "ViewName",
              e?.Info.Name,
            ]))
        : (this.Dxc(i, e?.Info), this.xxc(e), await Promise.all([t(), o()])),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            16,
            "CloseViewImplement 界面关闭完成",
            ["ViewName", i.Info?.Name],
            ["path", i.Info.UiPath],
            ["NextViewName", e.Info?.Name],
          );
    } else {
      t = this.v9.Size <= 0;
      this.Dxc(i, void 0, t),
        i.IsShowOrShowing &&
          ((i.LastHide = !0), await i.HideAsync(), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面Hide", [
            "ViewName",
            i.Info?.Name,
          ]),
        await i.DestroyAsync(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面Destroy", [
            "ViewName",
            i.Info?.Name,
          ]),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            16,
            "CloseViewImplement 界面关闭完成",
            ["ViewName", i.Info?.Name],
            ["path", i.Info.UiPath],
          );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.StackCloseView,
      i.GetViewId(),
      i.Info.Name,
      this.v9.Peek()?.Info,
    );
  }
  async CloseHistoryRingViewAsync(e) {
    if (this.Ycr(e)) {
      var i = new Array();
      let e = 0;
      var t = [];
      for (const o of this.v9)
        0 === e || e === this.v9.Size - 1 || t.push(o), e++;
      for (const a of t) i.push(this.CloseViewAsync(a));
      await Promise.all(i);
    }
  }
  xxc(e, i = !0) {
    this.ExecuteInterfaceMethod(
      e,
      "PushCameraHandle",
      e.Info.Name,
      e.GetViewId(),
      i,
    ) ||
      UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
        e.Info.Name,
        e.GetViewId(),
        i,
      );
  }
  Dxc(e, i, t = !0) {
    this.ExecuteInterfaceMethod(
      e,
      "PopCameraHandle",
      e.Info.Name,
      i,
      e.GetViewId(),
      t,
    ) ||
      UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
        e.Info.Name,
        i,
        e.GetViewId(),
        t,
      );
  }
  ExecuteInterfaceMethod(e, i, ...t) {
    return i in e && "function" == typeof e[i] && (e[i](...t), !0);
  }
  Ycr(e) {
    return this.Ncr.has(e);
  }
  ClearContainer(e) {
    var i = [];
    for (const t of this.v9)
      (t.IsExistInLeaveLevel = !0),
        t.Info.IsPermanent ||
          (e && UiModel_1.UiModel.SeamlessStackWhileList.has(t.Info.Name)) ||
          (this.TryCatchViewDestroyCompatible(t), i.push(t));
    for (const o of i) this.Mcr(o);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 16, "ClearContainer 清栈");
  }
  async BeforeClearContainerAsync(e) {
    var i = [];
    for (const a of this.Fcr.values()) {
      var t = a.Element;
      (t.IsExistInLeaveLevel = !0),
        t.Info.IsPermanent ||
          (e && UiModel_1.UiModel.SeamlessStackWhileList.has(t.Info.Name)) ||
          (this.TryCatchViewDestroyCompatible(t),
          this.kcr.Remove(a),
          i.push(t));
    }
    for (const s of i)
      this.Fcr.delete(s), UiManager_1.UiManager.RemoveView(s.GetViewId());
    for (let e = this.Ocr.length - 1; 0 <= e; --e) {
      var o = this.Ocr[e].View;
      (o.IsExistInLeaveLevel = !0),
        o.Info.IsPermanent ||
          (o.OpenPromise?.SetResult(!1),
          UiManager_1.UiManager.RemoveView(o.GetViewId()),
          this.Ocr.pop(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              10,
              "[Clear] 清理缓存的界面数据",
              ["Name", o.constructor.name],
              ["ComponentId", o.ComponentId],
            ));
    }
    this.tza && (await this.tza.Promise), this.QRl && (await this.QRl.Promise);
  }
  async HideViewByPlot() {
    var e = this.v9.Peek();
    e &&
      (this.Ujt(),
      e.WillReleaseScene()
        ? (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
            "Start",
            e.Info.Name,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 10, "隐藏界面", ["ViewName", e.Info.Name]),
          await e.HideAsync(),
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
            "Close",
            e.Info.Name,
          ))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 10, "隐藏界面", ["ViewName", e.Info.Name]),
          await e.HideAsync()));
  }
  async ShowViewByPlot(e) {
    var i = this.v9.Peek();
    i &&
      (i?.WillLoadScene()
        ? (await Promise.all([
            BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
              "None",
              i.Info.Name,
            ),
            e?.(),
          ]),
          (i.ShowPromise = new CustomPromise_1.CustomPromise()),
          (i.LoadScenePromise = new CustomPromise_1.CustomPromise()),
          (i.SkipRemoveBlackScreen = !0),
          i.ShowAsync(),
          this.xxc(i),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCore", 10, "#######加载场景", [
              "ViewName",
              i.Info.Name,
            ]),
          await i.LoadScenePromise.Promise,
          (i.SkipRemoveBlackScreen = !1),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCore", 10, "#######黑屏移除", [
              "ViewName",
              i.Info.Name,
            ]),
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
            "Close",
            i.Info.Name,
          ),
          await i.ShowPromise.Promise,
          (i.ShowPromise = void 0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCore", 16, "#######界面显示", [
              "ViewName",
              i?.Info.Name,
            ]))
        : (this.xxc(i), await Promise.all([e?.(), i.ShowAsync()])),
      this.Jft());
  }
  async WaitSwitchToPlotPending() {
    var e;
    this.Rjt &&
      ((e = this.v9.Peek()), await this.Wcr(e, 5)?.ExecutePromise?.Promise);
  }
  TryUnlock() {
    this.pjt && this.Jft();
  }
  Wcr(e, i) {
    var t = new UiViewPending_1.UiViewPending(e, i);
    if (0 < this.Ocr.length) {
      var o = this.Ocr[this.Ocr.length - 1];
      if (o.Equal(t))
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("UiCore", 16, "界面缓存操做重复", [
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
            Log_1.Log.Warn("UiCore", 16, "界面缓存操作成对, 自动移除上一个", [
              "ViewName",
              e.Info.Name,
            ]),
          t.ExecutePromise?.SetResult(!0),
          t
        );
    }
    return (
      this.Ocr.push(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          16,
          "缓存界面操作",
          ["界面", e.Info.Name],
          ["操作类型", i],
        ),
      t
    );
  }
  $cr(e) {
    e &&
      (this.kcr.Remove(e), this.Fcr.delete(e.Element), 0 === this.Fcr.size) &&
      ((UiModel_1.UiModel.InNormalQueue = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ExitNormalQueueState,
      ));
  }
  Kcr(i) {
    let e = void 0;
    var t = this.kcr.Find(
      (e) => !e.Element || i.Info.SortIndex < e.Element.Info.SortIndex,
    );
    (e = t.Pre ? this.kcr.Insert(i, t.Pre) : this.kcr.AddTail(i)),
      this.Fcr.set(i, e),
      (UiModel_1.UiModel.InNormalQueue = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 16, "缓存界面进入等待队列", [
          "ViewName",
          i.Info.Name,
        ]);
  }
  IsViewPendingListEmpty() {
    return 0 === this.Ocr.length;
  }
}
exports.UiViewStackContainer = UiViewStackContainer;
//# sourceMappingURL=UiViewStackContainer.js.map
