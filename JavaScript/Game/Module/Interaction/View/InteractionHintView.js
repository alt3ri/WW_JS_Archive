"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractionHintView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
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
  InteractionHint_1 = require("./InteractionHint"),
  LONG_PRESS_SHOW_TIME = 100;
class InteractionHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.Eui = 0),
      (this.Sui = void 0),
      (this.yui = 1),
      (this.Iui = 0),
      (this.Tui = 0),
      (this.Lui = 0),
      (this.Dui = 0),
      (this.Rui = InteractionDefine_1.LERP_TIME),
      (this.hLt = -1),
      (this.Uui = 0),
      (this.Aui = void 0),
      (this.Pui = []),
      (this.xui = 0),
      (this.wui = !1),
      (this.Bui = void 0),
      (this.bui = void 0),
      (this.qui = void 0),
      (this.xut = 0),
      (this.Gui = !1),
      (this.Nui = 0),
      (this.Oui = 0),
      (this.kui = 0),
      (this.Fui = !1),
      (this.Vui = 0),
      (this.Hui = void 0),
      (this.jui = !1),
      (this.IsHoverHint = !1),
      (this.Wui = !1),
      (this.YJs = !1),
      (this.XHa = !1),
      (this.Kui = !1),
      (this.nla = !1),
      (this.lqt = () => {
        this.eci(), this.Jla(), this.zla();
      }),
      (this.Mzt = () => {
        this.Lri();
      }),
      (this.Qui = () => {
        this.CloseMe();
      }),
      (this.Yui = () => {
        var t = new InteractionHint_1.InteractionHint();
        return (
          t.BindOnHover(this.Jui),
          t.BindOnUnHover(this.zui),
          t.BindOnToggleStateChanged(this.sui),
          t
        );
      }),
      (this.Jui = (t) => {
        this.IsHoverHint = !0;
        t = t.ActorIndex;
        this.Oei(t);
      }),
      (this.zui = (t) => {
        (this.IsHoverHint = !1), this.Hui?.SetSelected(!0);
      }),
      (this.sui = (t, i) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Test",
            8,
            "[InteractionView]自动拾取-----当ExtendToggle状态改变时，会打断自动拾取",
          ),
          (this.Gui = !1),
          this.Zui(),
          this.InteractPawn(i, !0);
      }),
      (this.fZt = (t) => {
        t || (this.IsHoverHint = !1);
      }),
      (this.tci = () => {
        Info_1.Info.IsInTouch() && this.ici() && this.oci();
      }),
      (this.rci = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----成功拾取", [
            "IsAutoPicked",
            this.Gui,
          ]),
          this.Gui ? this.nci() : (this.wui = !1);
      }),
      (this.sci = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Test", 8, "[InteractionView]刷新交互选项时"),
          (this.wui = !1),
          this.wui
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Test",
                8,
                "[InteractionView]刷新交互选项 - 自动拾取中",
                ["Count", this.Pui?.length],
              )
            : this.bui
              ? Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Test",
                  8,
                  "[InteractionView]刷新交互选项 - 下一帧会刷新交互选项",
                )
              : (this.bui = TimerSystem_1.TimerSystem.Next(this.h5a));
      }),
      (this.h5a = () => {
        this.aci(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Test",
              8,
              "[InteractionView]刷新交互选项 - 开始刷新交互选项",
              ["Count", this.Pui?.length],
            ),
          this._5a(this.Pui).then(
            () => {
              this.vci(), this.lci();
            },
            () => {},
          ),
          (this.bui = void 0);
      }),
      (this.bMe = (t, i) => {
        0 === i
          ? this._ci()
          : 1 === i && (this.Hui ? this.$ui() : (this.jui = !0));
      }),
      (this.Oit = () => {
        this.oci();
      }),
      (this.uci = (t, i) => {
        0 === i && this.cci(void 0, -1);
      }),
      (this.cci = (t, i) => {
        0 === i ||
          this.IsHoverHint ||
          (1 !== this.Sui.GetDisplayGridNum() && this.SelectHint(0 < i));
      }),
      (this.mci = (t, i) => {
        0 === i && this.SelectHint(!0);
      }),
      (this.dci = (t, i) => {
        0 === i && this.SelectHint(!1);
      }),
      (this.Eqt = (t, i) => {
        (i = i.TouchType),
          (t = Number(t)),
          (t = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(t));
        t &&
          (0 === i
            ? (this.Fui = t.IsTouchComponentContainTag(
                InteractionDefine_1.autoPickUpTag,
              ))
            : 1 === i &&
              (this.Fui &&
                t.IsTouchComponentContainTag(
                  InteractionDefine_1.autoPickUpTag,
                ) &&
                this.oci(),
              (this.Fui = !1)));
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
      (this.BtnBindInfo = [[4, this.tci]]);
  }
  OnAddEventListener() {
    this.zla(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InteractionViewUpdate,
        this.sci,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HideInteractView,
        this.Qui,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnShowMouseCursor,
        this.fZt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInteractDropItemSuccess,
        this.rci,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
        19,
        this.Mzt,
      );
  }
  zla() {
    InputDistributeController_1.InputDistributeController.BindAxis(
      InputMappingsDefine_1.axisMappings.WheelAxis,
      this.cci,
    ),
      void 0 !==
      ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity
        ? ((this.Kui = !0),
          Info_1.Info.IsInGamepad()
            ? ((this.nla = !0),
              InputDistributeController_1.InputDistributeController.BindAction(
                InputMappingsDefine_1.actionMappings.UI左摇杆上,
                this.mci,
              ),
              InputDistributeController_1.InputDistributeController.BindAction(
                InputMappingsDefine_1.actionMappings.UI左摇杆下,
                this.dci,
              ))
            : (InputDistributeController_1.InputDistributeController.BindAction(
                InputMappingsDefine_1.actionMappings.Ui方向上,
                this.mci,
              ),
              InputDistributeController_1.InputDistributeController.BindAction(
                InputMappingsDefine_1.actionMappings.Ui方向下,
                this.dci,
              )),
          InputDistributeController_1.InputDistributeController.BindAction(
            InputMappingsDefine_1.actionMappings.UI键盘F手柄A,
            this.bMe,
          ))
        : (InputDistributeController_1.InputDistributeController.BindAction(
            InputMappingsDefine_1.actionMappings.通用交互,
            this.bMe,
          ),
          InputDistributeController_1.InputDistributeController.BindAction(
            InputMappingsDefine_1.actionMappings.切换交互,
            this.uci,
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
        this.Eqt,
      );
  }
  OnRemoveEventListener() {
    this.Jla(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InteractionViewUpdate,
        this.sci,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HideInteractView,
        this.Qui,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnShowMouseCursor,
        this.fZt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInteractDropItemSuccess,
        this.rci,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        19,
        this.Mzt,
      );
  }
  Jla() {
    InputDistributeController_1.InputDistributeController.UnBindAxis(
      InputMappingsDefine_1.axisMappings.WheelAxis,
      this.cci,
    ),
      this.Kui
        ? ((this.Kui = !1),
          this.nla
            ? ((this.nla = !1),
              InputDistributeController_1.InputDistributeController.UnBindAction(
                InputMappingsDefine_1.actionMappings.UI左摇杆上,
                this.mci,
              ),
              InputDistributeController_1.InputDistributeController.UnBindAction(
                InputMappingsDefine_1.actionMappings.UI左摇杆下,
                this.dci,
              ))
            : (InputDistributeController_1.InputDistributeController.UnBindAction(
                InputMappingsDefine_1.actionMappings.Ui方向上,
                this.mci,
              ),
              InputDistributeController_1.InputDistributeController.UnBindAction(
                InputMappingsDefine_1.actionMappings.Ui方向下,
                this.dci,
              )),
          InputDistributeController_1.InputDistributeController.UnBindAction(
            InputMappingsDefine_1.actionMappings.UI键盘F手柄A,
            this.bMe,
          ))
        : (InputDistributeController_1.InputDistributeController.UnBindAction(
            InputMappingsDefine_1.actionMappings.通用交互,
            this.bMe,
          ),
          InputDistributeController_1.InputDistributeController.UnBindAction(
            InputMappingsDefine_1.actionMappings.切换交互,
            this.uci,
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
        this.Eqt,
      );
  }
  Lri() {
    var t =
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
        19,
      );
    this.SetUiActive(t),
      t &&
        !ModelManager_1.ModelManager.InteractionModel.LockInteractionEntity &&
        ((this.jui = !1),
        InputDistributeController_1.InputDistributeController.ExecuteDelayInputAction(
          InputMappingsDefine_1.actionMappings.通用交互,
        ));
  }
  async OnBeforeStartAsync() {
    (this.xqe = this.GetScrollViewWithScrollbar(2)),
      (this.Aui = this.GetItem(3)),
      (this.Eui = this.xqe.ScrollSensitivity),
      (this.Vui = this.Aui.GetAnchorOffsetY()),
      (this.Tui = this.Aui.GetAnchorOffsetY());
    var t = this.GetItem(1),
      t =
        ((this.Sui = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(0),
          this.Yui,
          t?.GetOwner(),
        )),
        (this.Dui = t.GetHeight()),
        (this.Iui = this.Aui.GetHeight() / this.Dui),
        ModelManager_1.ModelManager.InteractionModel);
    (this.xut =
      t.AutoLongPressTime + t.ShowLongPressTime + LONG_PRESS_SHOW_TIME),
      this.aci(),
      await this._5a(this.Pui);
  }
  OnAfterShow() {
    this.lci(), this.Lri(), this.Oei(0);
  }
  OnAfterHide() {
    this.Hui = void 0;
  }
  oci() {
    (this.Gui = !0),
      (this.wui = !0),
      (this.kui = this.Pui.length),
      (this.Nui = 0),
      (this.Oui = 0);
    var t = ModelManager_1.ModelManager.InteractionModel;
    Info_1.Info.IsInTouch()
      ? t.SaveTriggerMobileGuide(!0)
      : t.SaveTriggerDesktopGuide(!0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----开始", [
          "AutoPickLength",
          this.kui,
        ]),
      this.nci();
  }
  nci() {
    this.Oui++;
    var t = this.Pui[this.Nui];
    (!t?.Valid ||
      (ModelManager_1.ModelManager.InteractionModel.CanAutoPickUp(t) ||
        (this.Nui++, this.nci()),
      this.InteractPawn(this.Nui)
        ? (this.Pui.splice(this.Nui, 1), this._5a(this.Pui))
        : (this.Nui++, this.nci()),
      this.Oui >= this.kui)) &&
      this.Cci();
  }
  Cci() {
    this.aci(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Test", 8, "[InteractionView]自动拾取-----结束", [
          "InteractLength",
          this.Pui.length,
        ]),
      this._5a(this.Pui),
      (this.wui = !1);
  }
  InteractPawn(t, i = !1) {
    if (this.YJs) return !1;
    var e = this.Pui[t];
    if (!e?.Valid) return !1;
    e = e.GetComponent(106);
    if (!e?.IsPawnInteractive()) return !1;
    if (this.Hui)
      if (i) {
        if (this.Hui)
          (this.YJs = !0),
            this.Hui.PlayReleaseSequence().then(
              () => {
                this.YJs = !1;
              },
              () => {},
            ),
            (i =
              ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(
                t,
              )),
            e.InteractPawn(i);
      } else {
        (this.YJs = !1),
          this.Hui?.PlayReleaseSequence().then(
            () => {},
            () => {},
          );
        var i =
          ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(
            t,
          );
        e.InteractPawn(i);
      }
    else
      (i =
        ModelManager_1.ModelManager.InteractionModel.GetOptionInstanceIdByIndex(
          t,
        )),
        e.InteractPawn(i);
    return !0;
  }
  OnBeforeDestroy() {
    this.Sui && (this.Sui.ClearChildren(), (this.Sui = void 0)),
      this.qui?.Destroy(),
      (this.qui = void 0),
      (this.Hui = void 0),
      this.Aui?.SetAnchorOffsetY(this.Vui),
      (this.Aui = void 0),
      this.xqe && (this.xqe.ScrollSensitivity = this.Eui),
      (this.Eui = 0),
      (this.xqe = void 0),
      (this.wui = !1),
      (this.qui = void 0),
      (this.Pui.length = 0),
      (this.Fui = !1),
      (this.XHa = !1),
      this.Zui(),
      this.gci();
  }
  gci() {
    this.bui &&
      TimerSystem_1.TimerSystem.Has(this.bui) &&
      (TimerSystem_1.TimerSystem.Remove(this.bui), (this.bui = void 0));
  }
  async _5a(t) {
    var i;
    await this.Sui.RefreshByDataAsync(t),
      this.Sui &&
        ((t = MathUtils_1.MathUtils.Clamp(this.hLt, 0, t.length - 1)),
        this.Oei(t, !1),
        this.Hui && this.jui && ((this.jui = !1), this.$ui()),
        (t = this.Sui.GetDisplayGridNum()),
        (i = this.yui > this.Iui ? this.Iui : this.yui),
        (this.yui = t),
        i !== (t = this.yui > this.Iui ? this.Iui : this.yui)) &&
        ((this.Lui = this.Tui + this.Dui * ((t - 1) / 2)),
        (this.Rui = 0),
        (this.Wui = !0));
  }
  aci() {
    (this.Pui.length = 0), (this.xui = this.pci(this.Pui));
  }
  pci(t) {
    return ModelManager_1.ModelManager.InteractionModel.RefreshInteractEntities(
      t,
    );
  }
  OnTick(t) {
    this.Wui &&
      (this.Rui < InteractionDefine_1.LERP_TIME
        ? ((this.Rui += t),
          (t = this.Aui.GetAnchorOffsetY()),
          (t = MathUtils_1.MathUtils.Lerp(
            t,
            this.Lui,
            Math.min(this.Rui / InteractionDefine_1.LERP_TIME, 1),
          )),
          this.Aui.SetAnchorOffsetY(t))
        : (this.Wui = !1)),
      this.qui?.InAsyncLoading() || this.qui?.RefreshTextWidth();
  }
  _ci() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Test",
        8,
        "[InteractionView]自动拾取-----当玩家按下通用交互，会打断自动拾取",
      ),
      (this.Gui = !1),
      (this.XHa = !0),
      this.Hui &&
        !Info_1.Info.IsInTouch() &&
        this.ici() &&
        this.GetActive() &&
        (this.Zui(),
        (this.Bui = TimerSystem_1.TimerSystem.Delay(this.Oit, this.xut)));
  }
  Zui() {
    this.Bui &&
      TimerSystem_1.TimerSystem.Has(this.Bui) &&
      (TimerSystem_1.TimerSystem.Remove(this.Bui), (this.Bui = void 0));
  }
  $ui() {
    var t;
    this.Zui(),
      this.XHa &&
        ((this.XHa = !1),
        this.Gui ||
          ModelManager_1.ModelManager.InteractionModel.InInteractCd() ||
          (this.GetActive() &&
            this.Hui &&
            this.InteractPawn(this.Hui.ActorIndex, !0) &&
            (AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_option"),
            (t = Math.max(this.Pui.length - 1, 0)),
            (this.hLt = Math.min(this.hLt, t)))));
  }
  SelectHint(t) {
    let i = -1;
    var e = this.Pui.length - 1;
    (i = t
      ? (i = this.hLt - 1) < 0
        ? e
        : i
      : (i = this.hLt + 1) > e
        ? 0
        : i) < 0 || ((this.Uui = i), this.Oei(this.Uui));
  }
  Oei(i, t = !0) {
    if ((!t || i !== this.hLt) && !Info_1.Info.IsInTouch() && this.Sui) {
      let t = this.Sui.GetLayoutItemByIndex(i);
      (t = t || this.Sui.GetLayoutItemByIndex(0)) &&
        (this.Hui?.SetSelected(!1),
        (this.Hui = t),
        (this.hLt = i),
        (this.Uui = -1),
        this.vci(),
        this.Sui.SelectGridProxy(i),
        this.xqe.ScrollTo(t.GetRootItem()));
    }
  }
  vci() {
    var t;
    this.ici()
      ? ((t = ModelManager_1.ModelManager.InteractionModel),
        this.Hui?.SetLongPressTime(t.AutoLongPressTime))
      : this.Hui?.SetLongPressTime(0);
  }
  lci() {
    var t = ModelManager_1.ModelManager.InteractionModel;
    if (t.IsInShowAutoInteractionGuideCountLimit()) {
      var i = Info_1.Info.IsInTouch();
      if (i) {
        if (t.IsTriggerMobileGuide) return;
      } else if (t.IsTriggerDesktopGuide) return;
      this.xui <= t.ActiveInteractGuideCount ||
        this.qui ||
        (i
          ? this.Mci().then(
              (t) => {
                t.Refresh("MobileAutoPickUpText");
              },
              () => {},
            )
          : this.Mci().then(
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
  async Mci() {
    var t = this.GetItem(5);
    return (
      (this.qui = new InteractionGuide_1.InteractionGuide()),
      await this.qui.CreateThenShowByResourceIdAsync(
        "UiItem_GuideNPCActScroll",
        t,
        !1,
      ),
      this.qui
    );
  }
  eci() {
    this.qui &&
      (Info_1.Info.IsInTouch()
        ? this.qui.Refresh("MobileAutoPickUpText")
        : this.qui.Refresh("DesktopAutoPickUpText"));
  }
  ici() {
    return 0 < this.xui;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (2 === t.length && t[0] === GuideConfig_1.GuideConfig.TabTag)
      return (i = this.Sui.GetLayoutItemList()).length <= 0
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
exports.InteractionHintView = InteractionHintView;
//# sourceMappingURL=InteractionHintView.js.map
