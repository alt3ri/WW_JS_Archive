"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiViewStackContainer = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  DoublyList_1 = require("../../../Core/Container/DoublyList"),
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
      (this.Fur = new Map()),
      (this.pHt = !1),
      (this.Vur = new Array()),
      (this.Hur = new DoublyList_1.default(void 0)),
      (this.jur = new Map()),
      (this.v9 = e);
  }
  get RHt() {
    return this.pHt;
  }
  UHt() {
    this.pHt = !0;
  }
  O0t(e = !0) {
    (this.pHt = !1), e && this.Wur();
  }
  Kur(e) {
    this.v9.Push(e);
    var i = e.Info.Name;
    let t = this.Fur.get(i);
    t || ((t = new Set()), this.Fur.set(i, t)), t.add(e);
  }
  Qur() {
    var e,
      i,
      t = this.v9.Pop();
    if (void 0 !== t)
      return (
        (e = t.Info.Name),
        (i = this.Fur.get(e)) &&
          (i.delete(t), i.size <= 0) &&
          this.Fur.delete(e),
        t
      );
  }
  yur(e) {
    var i = e.Info.Name,
      t = this.Fur.get(i);
    return (
      t && (t.delete(e), t.size <= 0) && this.Fur.delete(i), this.v9.Delete(e)
    );
  }
  async Wur() {
    if (this.Vur.length) {
      var e = this.Vur.shift();
      switch (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCore",
            17,
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
          this.UHt(), await this.Cfi(e.View), this.O0t();
          break;
        case 4:
          await this.ResetToViewAsync(e.View);
      }
    }
  }
  async OpenViewAsync(e) {
    if (this.RHt) this.Xur(e, 1);
    else {
      var i = this.v9.Peek();
      if (e.IsQueueView) {
        if (i?.IsQueueView) return this.$ur(e), void this.Wur();
        if (UiModel_1.UiModel.InNormalQueue)
          return this.$ur(e), void this.Wur();
      }
      this.UHt(),
        this.IsIgnoreOpenViewMask(e) || this.OpenViewMask.SetMask(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.StackPreOpenView,
          e.Info.Name,
        ),
        this.Kur(e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "OpenViewAsync 入栈", [
            "ViewName",
            e.Info.Name,
          ]),
        await this.Yur(e, i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.StackOpenView,
          e.GetViewId(),
          i?.Info,
        ),
        this.IsIgnoreOpenViewMask(e) || this.OpenViewMask.SetMask(!1),
        this.O0t();
    }
  }
  async PreOpenViewAsync(e) {
    (await e.CreateAsync()) ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiCore", 17, "[PreOpenViewAsync] CreateAsync failed", [
          "ViewName",
          e.Info.Name,
        ]));
  }
  async OpenViewAfterPreOpenedAsync(e) {
    if (this.RHt) this.Xur(e, 0);
    else {
      var i = this.v9.Peek();
      if (e.IsQueueView) {
        if (i?.IsQueueView) return void this.$ur(e);
        if (UiModel_1.UiModel.InNormalQueue) return void this.$ur(e);
      }
      this.UHt(),
        this.IsIgnoreOpenViewMask(e) || this.OpenViewMask.SetMask(!0),
        e.OnOpenAfterPreOpened(),
        this.Kur(e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "OpenViewAfterPreOpenedAsync 入栈", [
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
        this.IsIgnoreOpenViewMask(e) || this.OpenViewMask.SetMask(!1),
        this.O0t();
    }
  }
  async Yur(e, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiCore",
        11,
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
      t =
        (t &&
          (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
            "Start",
            e.Info.Name,
          )),
        ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(
          e.Info.Name,
        ));
    t.StartBlackScreen &&
      !StringUtils_1.StringUtils.IsBlank(t.StartBlackScreen.ShowAnimName) &&
      (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
        t.StartBlackScreen.ShowAnimName,
        e.Info.Name,
      )),
      (await e.CreateAsync())
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 17, "OpenViewImplement 界面Start", [
              "ViewName",
              e.Info?.Name,
            ]),
          await e.StartAsync(),
          t.StartBlackScreen &&
            !StringUtils_1.StringUtils.IsBlank(
              t.StartBlackScreen.HideAnimName,
            ) &&
            BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
              t.StartBlackScreen.HideAnimName,
              e.Info.Name,
            ),
          i?.WillReleaseScene()
            ? (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
                "Start",
                e.Info.Name,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 17, "OpenViewImplement 上个界面Hide", [
                  "LastViewName",
                  i?.Info?.Name,
                ]),
              await i.HideAsync(),
              BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                "Close",
                e.Info.Name,
              ),
              UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
                e.Info.Name,
                e.GetViewId(),
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiCore", 17, "OpenViewImplement 界面Show", [
                  "ViewName",
                  e.Info?.Name,
                ]),
              await e.ShowAsync())
            : (UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
                e.Info.Name,
                e.GetViewId(),
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiCore",
                  17,
                  "OpenViewImplement 界面Show,上个界面Hide",
                  ["ViewName", e.Info?.Name],
                  ["LastViewName", i?.Info?.Name],
                ),
              await Promise.all([i?.HideAsync(), e.ShowAsync()])),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 11, "界面打开完成", [
              "path",
              e.Info.UiPath,
            ]))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            11,
            "[OpenStackViewAsync] CreateAsync failed",
            ["ViewName", e.Info.Name],
          );
  }
  async Jur() {
    var e;
    this.UHt(),
      0 < this.jur.size
        ? ((e = this.Hur.GetHeadNode().Next),
          this.Kur(e.Element),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 17, "OpenNextQueueViewInternal 入栈", [
              "ViewName",
              e.Element.Info.Name,
            ]),
          await this.Yur(e.Element, void 0),
          this.zur(e))
        : (e = this.v9.Peek()) && e.IsHideOrHiding && (await e.ShowAsync()),
      this.O0t();
  }
  async CloseViewAsync(e) {
    this.RHt
      ? this.Xur(e, 2)
      : UiModel_1.UiModel.InNormalQueue
        ? (this.UHt(), await this.Cfi(e), this.O0t(!1), this.Jur())
        : (this.UHt(), await this.Cfi(e, !0), this.O0t());
  }
  async CloseAndOpenNewAsync(e, i) {
    this.RHt
      ? i.IsQueueView
        ? (this.Xur(e, 2), this.$ur(i))
        : (this.Xur(e, 3), this.Xur(i, 1))
      : (this.UHt(),
        await this.Cfi(e),
        this.Kur(i),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "CloseAndOpenNewAsync 入栈", [
            "ViewName",
            i.Info.Name,
          ]),
        await this.Yur(i, void 0),
        this.O0t());
  }
  async ResetToViewAsync(e) {
    if (this.RHt) this.Xur(e, 4);
    else {
      for (const a of this.Vur) 1 === a.PendingType && a.View.Destroy();
      if (((this.Vur.length = 0), UiModel_1.UiModel.InNormalQueue))
        this.Xur(e, 4);
      else {
        this.UHt();
        for (var i = e.Info.Name, t = void 0; 0 < this.v9.Size; ) {
          var o = this.v9.Peek();
          if (i === o.Info.Name) break;
          (t = o).IsShowOrShowing
            ? await this.Cfi(t)
            : (await t.DestroyAsync(),
              this.Qur(),
              t &&
                ((o = this.v9.Peek()),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.StackCloseView,
                  t.GetViewId(),
                  t.Info.Name,
                  o?.Info,
                )));
        }
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "ResetToViewAsync 清栈"),
          "BattleView" === e.Info.Name &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ResetModuleByResetToBattleView,
            ),
          e.IsShowOrShowing || (await e.ShowAsync()),
          this.O0t(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 17, "重置回到界面成功", [
              "ViewName",
              e.Info.Name,
            ]);
      }
    }
  }
  async Cfi(i, e = !1) {
    var t = this.jur.get(i),
      t =
        (t && this.zur(t),
        this.Vur.findIndex((e) => e.View === i && 1 === e.PendingType));
    0 <= t && this.Vur.splice(t, 1);
    let o = !0;
    if (i === this.v9.Peek()) {
      this.Qur();
      const r = this.v9.Peek();
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 17, "CloseViewImplement 出栈", [
          "ViewName",
          i.Info.Name,
        ]);
      t = r?.Info.ScenePath;
      t &&
        i.Info.ScenePath === t &&
        ((i.SkipReleaseScene = !0), (r.SkipLoadScene = !0));
      const s = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(
          i.Info.Name,
        ),
        n = r?.WillLoadScene(),
        _ = i.WillReleaseScene(),
        h =
          s.CloseBlackScreen &&
          !StringUtils_1.StringUtils.IsBlank(s.CloseBlackScreen.ShowAnimName);
      const l = async () => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiCore", 17, "CloseViewImplement 界面Destroy", [
              "ViewName",
              i.Info?.Name,
            ]),
            await i.DestroyAsync();
        },
        w = async () => {
          i.IsShowOrShowing &&
            ((i.LastHide = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("UiCore", 17, "CloseViewImplement 界面Hide", [
                "ViewName",
                i.Info?.Name,
              ]),
            await i.HideAsync());
        };
      var t = async () => {
          await w(), await l();
        },
        a = async () => {
          e &&
            r &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("UiCore", 17, "CloseViewImplement 下个界面Show", [
                "NextViewName",
                r.Info?.Name,
              ]),
            await r.ShowAsync());
        };
      n || _ || h
        ? e
          ? (await Promise.all([
              (async () => {
                h
                  ? await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
                      s.CloseBlackScreen.ShowAnimName,
                      i.Info.Name,
                    )
                  : _
                    ? await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
                        "Start",
                        i.Info.Name,
                      )
                    : n &&
                      (await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
                        "Start",
                        r.Info.Name,
                      ));
              })(),
              t(),
            ]),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("UiCore", 17, "#######黑屏+销毁", [
                "ViewName",
                i.Info.Name,
              ]),
            UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
              i.Info.Name,
              r?.Info,
              i.GetViewId(),
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("UiCore", 17, "#######镜头Pop", [
                "ViewName",
                i.Info.Name,
              ]),
            r &&
              ((r.ShowPromise = new CustomPromise_1.CustomPromise()),
              n &&
                ((r.LoadScenePromise = new CustomPromise_1.CustomPromise()),
                (r.SkipRemoveBlackScreen = !0)),
              a(),
              await r?.LoadScenePromise?.Promise,
              (r.SkipRemoveBlackScreen = !1),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("UiCore", 17, "#######加载场景", [
                  "ViewName",
                  i.Info.Name,
                ]),
              UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
                r.Info.Name,
                r.GetViewId(),
                !1,
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("UiCore", 17, "#######镜头Push", [
                  "ViewName",
                  i.Info.Name,
                ]),
              h
                ? BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                    s.CloseBlackScreen.HideAnimName,
                    i.Info.Name,
                  )
                : _
                  ? BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                      "Close",
                      i.Info.Name,
                    )
                  : n &&
                    BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                      "Close",
                      r.Info.Name,
                    ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("UiCore", 17, "#######黑屏移除", [
                  "ViewName",
                  i.Info.Name,
                ]),
              await !(e && r && (await r.ShowPromise?.Promise)),
              Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug("UiCore", 17, "#######界面显示", [
                "ViewName",
                r?.Info.Name,
              ]))
          : (await t(),
            UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
              i.Info.Name,
              void 0,
              i.GetViewId(),
              !0,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("UiCore", 17, "#######销毁", [
                "ViewName",
                i.Info.Name,
              ]))
        : (UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
            i.Info.Name,
            r?.Info,
            i.GetViewId(),
          ),
          r &&
            UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
              r.Info.Name,
              r.GetViewId(),
            ),
          await Promise.all([w(), a()]),
          await l());
    } else
      this.yur(i)
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "CloseViewImplement 删除", [
            "ViewName",
            i.Info.Name,
          ])
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiCore",
              17,
              "CloseViewImplement 删除界面不在栈内",
              ["ViewName", i.Info.Name],
            ),
          (o = !1)),
        UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
          i.Info.Name,
          void 0,
          i.GetViewId(),
          !1,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiCore", 17, "CloseViewImplement 界面Destroy", [
            "ViewName",
            i.Info?.Name,
          ]),
        await i.DestroyAsync();
    o &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          17,
          "CloseViewImplement 界面关闭完成",
          ["ViewName", i.Info?.Name],
          ["path", i.Info.UiPath],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.StackCloseView,
        i.GetViewId(),
        i.Info.Name,
        this.v9.Peek()?.Info,
      ));
  }
  async CloseHistoryRingViewAsync(e) {
    if (this.Zur(e)) {
      var i = new Array();
      let e = 0;
      var t = [];
      for (const o of this.v9)
        0 === e || e === this.v9.Size - 1 || t.push(o), e++;
      for (const a of t) i.push(this.CloseViewAsync(a));
      await Promise.all(i);
    }
  }
  Zur(e) {
    return this.Fur.has(e);
  }
  ClearContainer() {
    var e = [];
    for (const o of this.jur.values()) {
      var i = o.Element;
      (i.IsExistInLeaveLevel = !0),
        i.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(i),
          this.Hur.Remove(o),
          e.push(i));
    }
    for (const a of e) this.jur.delete(a);
    for (let e = this.Vur.length - 1; 0 <= e; --e) {
      var t = this.Vur[e].View;
      (t.IsExistInLeaveLevel = !0),
        t.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(t), this.Vur.pop());
    }
    e.length = 0;
    for (const r of this.v9)
      (r.IsExistInLeaveLevel = !0),
        r.Info.IsPermanent ||
          (this.TryCatchViewDestroyCompatible(r), e.push(r));
    for (const s of e) this.yur(s);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiCore", 17, "ClearContainer 清栈");
  }
  Xur(e, i) {
    var t = new UiViewPending_1.UiViewPending(e, i);
    if (0 < this.Vur.length) {
      var o = this.Vur[this.Vur.length - 1];
      if (o.Equal(t))
        return void (
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("UiCore", 17, "界面缓存操做重复", [
            "ViewName",
            e.Info.Name,
          ])
        );
      if (o.IsPairWith(t))
        return (
          this.Vur.pop(),
          UiManager_1.UiManager.RemoveView(e.GetViewId()),
          void (
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("UiCore", 17, "界面缓存操作成对, 自动移除上一个", [
              "ViewName",
              e.Info.Name,
            ])
          )
        );
    }
    this.Vur.push(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiCore",
          17,
          "缓存界面操作",
          ["界面", e.Info.Name],
          ["操作类型", i],
        );
  }
  zur(e) {
    e &&
      (this.Hur.Remove(e), this.jur.delete(e.Element), 0 === this.jur.size) &&
      ((UiModel_1.UiModel.InNormalQueue = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ExitNormalQueueState,
      ));
  }
  $ur(i) {
    let e = void 0;
    var t = this.Hur.Find(
      (e) => !e.Element || i.Info.SortIndex < e.Element.Info.SortIndex,
    );
    (e = t.Pre ? this.Hur.Insert(i, t.Pre) : this.Hur.AddTail(i)),
      this.jur.set(i, e),
      (UiModel_1.UiModel.InNormalQueue = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCore", 17, "缓存界面进入等待队列", [
          "ViewName",
          i.Info.Name,
        ]);
  }
}
exports.UiViewStackContainer = UiViewStackContainer;
//# sourceMappingURL=UiViewStackContainer.js.map
