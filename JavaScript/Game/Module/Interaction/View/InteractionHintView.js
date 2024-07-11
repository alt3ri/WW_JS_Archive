"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractionHintView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  GuideConfig_1 = require("../../Guide/GuideConfig"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  InteractionDefine_1 = require("../InteractionDefine"),
  InteractionGuide_1 = require("./InteractionGuide"),
  InteractionHint_1 = require("./InteractionHint");
class InteractionHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.S_i = 0),
      (this.E_i = void 0),
      (this.y_i = 1),
      (this.I_i = 0),
      (this.T_i = 0),
      (this.L_i = 0),
      (this.D_i = 0),
      (this.R_i = InteractionDefine_1.LERP_TIME),
      (this.oTt = -1),
      (this.U_i = 0),
      (this.A_i = void 0),
      (this.P_i = []),
      (this.x_i = 0),
      (this.w_i = !1),
      (this.B_i = void 0),
      (this.b_i = void 0),
      (this.q_i = void 0),
      (this.g_t = 0),
      (this.G_i = !1),
      (this.N_i = 0),
      (this.O_i = 0),
      (this.k_i = 0),
      (this.F_i = !1),
      (this.V_i = 0),
      (this.H_i = void 0),
      (this.j_i = !1),
      (this.IsHoverHint = !1),
      (this.W_i = !1),
      (this.K_i = !1),
      (this.MJt = () => {
        this.Ioi();
      }),
      (this.Q_i = () => {
        this.CloseMe();
      }),
      (this.X_i = (t) => {
        0 <= this.U_i && this.OZt(this.U_i),
          this.H_i && this.j_i && ((this.j_i = !1), this.$_i());
        var i = this.E_i.GetDisplayGridNum(),
          e = this.y_i > this.I_i ? this.I_i : this.y_i,
          i = ((this.y_i = i), this.y_i > this.I_i ? this.I_i : this.y_i);
        e !== i &&
          ((this.L_i = this.T_i + this.D_i * ((i - 1) / 2)),
          (this.R_i = 0),
          (this.W_i = !0));
      }),
      (this.Y_i = () => {
        var t = new InteractionHint_1.InteractionHint();
        return (
          t.BindOnHover(this.J_i),
          t.BindOnUnHover(this.z_i),
          t.BindOnToggleStateChanged(this.s_i),
          t
        );
      }),
      (this.J_i = (t) => {
        this.IsHoverHint = !0;
        t = t.ActorIndex;
        this.OZt(t);
      }),
      (this.z_i = (t) => {
        this.IsHoverHint = !1;
      }),
      (this.s_i = (t, i) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Test",
            8,
            "[InteractionView]自动拾取-----当ExtendToggle状态改变时，会打断自动拾取",
          ),
          (this.G_i = !1),
          this.Z_i(),
          this.InteractPawn(i);
      }),
      (this.fzt = (t) => {
        t || (this.IsHoverHint = !1);
      }),
      (this.dKe = () => {
        this.eui();
      }),
      (this.tui = () => {
        ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
          this.iui() &&
          this.oui();
      }),
      (this.rui = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----成功拾取", [
            "IsAutoPicked",
            this.G_i,
          ]),
          this.G_i ? this.nui() : (this.w_i = !1);
      }),
      (this.sui = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 8, "[InteractionView]刷新交互选项时"),
          (this.w_i = !1),
          this.w_i
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Test",
                8,
                "[InteractionView]刷新交互选项 - 自动拾取中",
                ["Count", this.P_i?.length],
              )
            : this.b_i
              ? Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Test",
                  8,
                  "[InteractionView]刷新交互选项 - 下一帧会刷新交互选项",
                )
              : (this.b_i = TimerSystem_1.TimerSystem.Next(() => {
                  this.aui(),
                    Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "Test",
                        8,
                        "[InteractionView]刷新交互选项 - 开始刷新交互选项",
                        ["Count", this.P_i?.length],
                      ),
                    this.hui(this.P_i),
                    this.lui(),
                    (this.b_i = void 0);
                }));
      }),
      (this.bMe = (t, i) => {
        0 === i
          ? this._ui()
          : 1 === i && (this.H_i ? this.$_i() : (this.j_i = !0));
      }),
      (this.Ltt = () => {
        this.oui();
      }),
      (this.uui = (t, i) => {
        0 === i && this.cui(void 0, -1);
      }),
      (this.cui = (t, i) => {
        0 === i ||
          this.IsHoverHint ||
          (1 !== this.E_i.GetDisplayGridNum() && this.SelectHint(0 < i));
      }),
      (this.mui = (t, i) => {
        0 === i && this.SelectHint(!0);
      }),
      (this.dui = (t, i) => {
        0 === i && this.SelectHint(!1);
      }),
      (this.pbt = (t, i) => {
        (i = i.TouchType),
          (t = Number(t)),
          (t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(t));
        t &&
          (0 === i
            ? (this.F_i = t.IsTouchComponentContainTag(
                InteractionDefine_1.autoPickUpTag,
              ))
            : 1 === i &&
              (this.F_i &&
                t.IsTouchComponentContainTag(
                  InteractionDefine_1.autoPickUpTag,
                ) &&
                this.oui(),
              (this.F_i = !1)));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.tui]]);
  }
  OnAddEventListener() {
    InputDistributeController_1.InputDistributeController.BindAction(
      InputMappingsDefine_1.actionMappings.通用交互,
      this.bMe,
    ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.切换交互,
        this.uui,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.WheelAxis,
        this.cui,
      ),
      void 0 !==
        ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity &&
        ((this.K_i = !0),
        InputDistributeController_1.InputDistributeController.BindAction(
          InputMappingsDefine_1.actionMappings.Ui方向上,
          this.mui,
        ),
        InputDistributeController_1.InputDistributeController.BindAction(
          InputMappingsDefine_1.actionMappings.Ui方向下,
          this.dui,
        )),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.pbt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InteractionViewUpdate,
        this.sui,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HideInteractView,
        this.Q_i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnShowMouseCursor,
        this.fzt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInteractDropItemSuccess,
        this.rui,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
        19,
        this.MJt,
      );
  }
  OnRemoveEventListener() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.通用交互,
      this.bMe,
    ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.切换交互,
        this.uui,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.WheelAxis,
        this.cui,
      ),
      this.K_i &&
        ((this.K_i = !1),
        InputDistributeController_1.InputDistributeController.UnBindAction(
          InputMappingsDefine_1.actionMappings.Ui方向上,
          this.mui,
        ),
        InputDistributeController_1.InputDistributeController.UnBindAction(
          InputMappingsDefine_1.actionMappings.Ui方向下,
          this.dui,
        )),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.pbt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InteractionViewUpdate,
        this.sui,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HideInteractView,
        this.Q_i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnShowMouseCursor,
        this.fzt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInteractDropItemSuccess,
        this.rui,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        19,
        this.MJt,
      );
  }
  Ioi() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
        19,
      );
    this.SetUiActive(t),
      t &&
        !ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity &&
        ((this.j_i = !1),
        InputDistributeController_1.InputDistributeController.ExecuteDelayInputAction(
          InputMappingsDefine_1.actionMappings.通用交互,
        ));
  }
  OnAfterShow() {
    this.aui(), this.hui(this.P_i), this.lui(), this.Ioi(), this.OZt(0);
  }
  OnAfterHide() {
    this.H_i = void 0;
  }
  OnStart() {
    (this.xqe = this.GetScrollViewWithScrollbar(2)),
      (this.A_i = this.GetItem(3)),
      (this.S_i = this.xqe.ScrollSensitivity),
      (this.V_i = this.A_i.GetAnchorOffsetY()),
      (this.T_i = this.A_i.GetAnchorOffsetY());
    var t = this.GetItem(1),
      t =
        ((this.E_i = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(0),
          this.Y_i,
          t?.GetOwner(),
        )),
        (this.D_i = t.GetHeight()),
        (this.I_i = this.A_i.GetHeight() / this.D_i),
        ModelManager_1.ModelManager.InteractionModel);
    (this.g_t = t.AutoLongPressTime + t.ShowLongPressTime),
      this.xqe.OnLateUpdate.Bind(this.X_i);
  }
  oui() {
    (this.G_i = !0),
      (this.w_i = !0),
      (this.k_i = this.P_i.length),
      (this.N_i = 0),
      (this.O_i = 0);
    var t = ModelManager_1.ModelManager.InteractionModel;
    ModelManager_1.ModelManager.PlatformModel.IsMobile()
      ? t.SaveTriggerMobileGuide(!0)
      : t.SaveTriggerDesktopGuide(!0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----开始", [
          "AutoPickLength",
          this.k_i,
        ]),
      this.nui();
  }
  nui() {
    this.O_i++;
    var t = this.P_i[this.N_i];
    (!t?.Valid ||
      (ModelManager_1.ModelManager.InteractionModel.CanAutoPickUp(t) ||
        (this.N_i++, this.nui()),
      this.InteractPawn(this.N_i)
        ? (this.P_i.splice(this.N_i, 1), this.hui(this.P_i))
        : (this.N_i++, this.nui()),
      this.O_i >= this.k_i)) &&
      this.Cui();
  }
  Cui() {
    this.aui(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----结束", [
          "InteractLength",
          this.P_i.length,
        ]),
      this.hui(this.P_i),
      (this.w_i = !1);
  }
  InteractPawn(t) {
    var i = this.P_i[t];
    return (
      !!i?.Valid &&
      !!(i = i.GetComponent(103))?.IsPawnInteractive() &&
      ((t =
        ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(
          t,
        )),
      i.InteractPawn(t),
      !0)
    );
  }
  OnBeforeDestroy() {
    this.E_i && (this.E_i.ClearChildren(), (this.E_i = void 0)),
      this.q_i?.Destroy(),
      (this.q_i = void 0),
      (this.H_i = void 0),
      this.A_i?.SetAnchorOffsetY(this.V_i),
      (this.A_i = void 0),
      this.xqe &&
        ((this.xqe.ScrollSensitivity = this.S_i),
        this.xqe.OnLateUpdate.Unbind()),
      (this.S_i = 0),
      (this.xqe = void 0),
      (this.w_i = !1),
      (this.q_i = void 0),
      (this.P_i.length = 0),
      (this.F_i = !1),
      this.Z_i(),
      this.gui();
  }
  gui() {
    this.b_i &&
      TimerSystem_1.TimerSystem.Has(this.b_i) &&
      (TimerSystem_1.TimerSystem.Remove(this.b_i), (this.b_i = void 0));
  }
  hui(t) {
    this.E_i.RefreshByData(t);
    t = MathUtils_1.MathUtils.Clamp(this.oTt, 0, t.length - 1);
    this.OZt(t);
  }
  aui() {
    (this.P_i.length = 0), (this.x_i = this.pui(this.P_i));
  }
  pui(t) {
    return ModelManager_1.ModelManager.InteractionModel.RefreshInteractEntities(
      t,
    );
  }
  OnTick(t) {
    this.W_i &&
      (this.R_i < InteractionDefine_1.LERP_TIME
        ? ((this.R_i += t),
          (t = this.A_i.GetAnchorOffsetY()),
          (t = MathUtils_1.MathUtils.Lerp(
            t,
            this.L_i,
            Math.min(this.R_i / InteractionDefine_1.LERP_TIME, 1),
          )),
          this.A_i.SetAnchorOffsetY(t))
        : (this.W_i = !1)),
      this.q_i?.InAsyncLoading() || this.q_i?.RefreshTextWidth();
  }
  _ui() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Test",
        8,
        "[InteractionView]自动拾取-----当玩家按下通用交互，会打断自动拾取",
      ),
      (this.G_i = !1),
      this.H_i &&
        !ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
        this.iui() &&
        this.GetActive() &&
        (this.Z_i(),
        (this.B_i = TimerSystem_1.TimerSystem.Delay(this.Ltt, this.g_t)));
  }
  Z_i() {
    this.B_i &&
      TimerSystem_1.TimerSystem.Has(this.B_i) &&
      (TimerSystem_1.TimerSystem.Remove(this.B_i), (this.B_i = void 0));
  }
  $_i() {
    var t;
    this.Z_i(),
      this.G_i ||
        ModelManager_1.ModelManager.InteractionModel.InInteractCd() ||
        (this.GetActive() &&
          this.H_i &&
          this.InteractPawn(this.H_i.ActorIndex) &&
          (AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_option"),
          (t = Math.max(this.P_i.length - 1, 0)),
          (this.oTt = Math.min(this.oTt, t))));
  }
  SelectHint(t) {
    let i = -1;
    var e = this.P_i.length - 1;
    (i = t
      ? (i = this.oTt - 1) < 0
        ? e
        : i
      : (i = this.oTt + 1) > e
        ? 0
        : i) < 0 || ((this.U_i = i), this.OZt(this.U_i));
  }
  OZt(i) {
    if (
      i !== this.oTt &&
      !ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
      this.E_i
    ) {
      let t = this.E_i.GetLayoutItemByIndex(i);
      (t = t || this.E_i.GetLayoutItemByIndex(0)) &&
        (this.H_i?.SetSelected(!1),
        (this.H_i = t),
        (this.oTt = i),
        (this.U_i = -1),
        this.vui(i),
        this.E_i.SelectGridProxy(i),
        this.xqe.ScrollTo(t.GetRootItem()));
    }
  }
  vui(t) {
    var i;
    this.iui() &&
    ((i = ModelManager_1.ModelManager.InteractionModel),
    (t = this.P_i[t]),
    i.CanAutoPickUp(t))
      ? this.H_i?.SetLongPressTime(i.AutoLongPressTime)
      : this.H_i?.SetLongPressTime(0);
  }
  lui() {
    var t = ModelManager_1.ModelManager.InteractionModel;
    if (t.IsInShowAutoInteractionGuideCountLimit()) {
      var i = ModelManager_1.ModelManager.PlatformModel.IsMobile();
      if (i) {
        if (t.IsTriggerMobileGuide) return;
      } else if (t.IsTriggerDesktopGuide) return;
      this.x_i <= t.ActiveInteractGuideCount ||
        this.q_i ||
        (i
          ? this.Mui().then(
              (t) => {
                t.Refresh("MobileAutoPickUpText");
              },
              () => {},
            )
          : this.Mui().then(
              (t) => {
                t.Refresh("DesktopAutoPickUpText");
              },
              () => {},
            ),
        t.SaveAutoInteractionGuideAppearCount(
          t.AutoInteractionGuideAppearCount + 1,
        ));
    }
  }
  async Mui() {
    var t = this.GetItem(5);
    return (
      (this.q_i = new InteractionGuide_1.InteractionGuide()),
      await this.q_i.CreateThenShowByResourceIdAsync(
        "UiItem_GuideNPCActScroll",
        t,
        !1,
      ),
      this.q_i
    );
  }
  eui() {
    this.q_i &&
      (ModelManager_1.ModelManager.PlatformModel.IsMobile()
        ? this.q_i.Refresh("MobileAutoPickUpText")
        : this.q_i.Refresh("DesktopAutoPickUpText"));
  }
  iui() {
    return 0 < this.x_i;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (2 === t.length && t[0] === GuideConfig_1.GuideConfig.TabTag)
      return (i = this.E_i.GetLayoutItemList()).length <= 0
        ? void 0
        : [(i = i[0].GetButtonForGuide()), i];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        t,
      ]);
  }
  OnGetLayer() {
    return UiLayerType_1.ELayerType.Normal;
  }
}
(exports.InteractionHintView = InteractionHintView).fui = void 0;
//# sourceMappingURL=InteractionHintView.js.map
