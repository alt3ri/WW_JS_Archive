"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideFocusItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiNavigationGlobalData_1 = require("../../UiNavigation/New/UiNavigationGlobalData"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
  GuideFocusItemText_1 = require("./GuideFocusItemText");
class GuideFocusItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t) {
    super(),
      (this.Pzt = void 0),
      (this.Owner = void 0),
      (this.xzt = void 0),
      (this.wzt = void 0),
      (this.tYe = void 0),
      (this.RectItem = void 0),
      (this.Config = void 0),
      (this.Bzt = !1),
      (this.bzt = !1),
      (this.qzt = !1),
      (this.Gzt = void 0),
      (this.Nzt = void 0),
      (this.Ozt = void 0),
      (this.Fr = () => {
        GuideFocusItem.IsOpenLog &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Guide", 17, "OnButtonClick enter");
        var e,
          i = this.Nzt;
        this.kzt(),
          i?.IsInteractable() &&
            this.xzt.bIsUIActive &&
            (i.IsA(UE.UIButtonComponent.StaticClass())
              ? (e = i).OnClickCallBack.IsBound() &&
                (GuideFocusItem.IsOpenLog &&
                  Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Guide",
                    17,
                    "OnButtonClick execute parent OnClickCallBack UIButtonComponent",
                  ),
                e.OnClickCallBack.Execute())
              : i.IsA(UE.UISelectableButtonComponent.StaticClass())
                ? (e = i).OnClickCallBack.IsBound() &&
                  (GuideFocusItem.IsOpenLog &&
                    Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Guide",
                      17,
                      "OnButtonClick execute parent OnClickCallBack UISelectableButtonComponent",
                    ),
                  e.OnClickCallBack.Execute())
                : i.IsA(UE.UIToggleComponent.StaticClass())
                  ? (i.SetState(!i.IsOn, !0),
                    GuideFocusItem.IsOpenLog &&
                      Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Guide",
                        17,
                        "OnButtonClick execute parent SetState UIToggleComponent",
                      ))
                  : i.IsA(UE.UIExtendToggle.StaticClass())
                    ? 0 === (e = i).GetToggleState() &&
                      (GuideFocusItem.IsOpenLog &&
                        Log_1.Log.CheckWarn() &&
                        Log_1.Log.Warn(
                          "Guide",
                          17,
                          "OnButtonClick execute parent SetToggleState ETT_Checked UIExtendToggle",
                        ),
                      e.SetToggleState(1, !0))
                    : i.IsA(UE.UISliderComponent.StaticClass()) &&
                      (e = i).OnValueChangeCb.IsBound() &&
                      (GuideFocusItem.IsOpenLog &&
                        Log_1.Log.CheckWarn() &&
                        Log_1.Log.Warn(
                          "Guide",
                          17,
                          "OnButtonClick execute parent OnValueChangeCb UISliderComponent",
                        ),
                      e.OnValueChangeCb.Execute(e.Value)));
      }),
      (this.Fzt = () => {
        var e, i;
        this.Bzt ||
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Guide", 17, "OnButtonPointerDownCallBack enter"),
          (e = this.Nzt)?.IsValid() &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnButtonPointerDownCallBack execute self",
              ),
            (this.qzt = !0),
            e.IsA(UE.UIButtonComponent.StaticClass())
              ? (i = e).OnPointDownCallBack.IsBound() &&
                (GuideFocusItem.IsOpenLog &&
                  Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Guide",
                    17,
                    "OnButtonPointerDownCallBack execute parent UIButtonComponent",
                  ),
                i.OnPointDownCallBack.Execute())
              : e.IsA(UE.UIExtendToggle.StaticClass()) &&
                (i = e).OnPointDownCallBack.IsBound() &&
                (GuideFocusItem.IsOpenLog &&
                  Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Guide",
                    17,
                    "OnButtonPointerDownCallBack execute parent UIExtendToggle",
                  ),
                i.OnPointDownCallBack.Execute(1))));
      }),
      (this.Vzt = () => {
        GuideFocusItem.IsOpenLog &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Guide", 17, "OnButtonPointerUpCallBack enter");
        var e,
          i = this.Nzt;
        i?.IsValid() &&
          ((this.qzt = !1),
          GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnButtonPointerUpCallBack execute self TryFinishByClick",
            ),
          i.IsA(UE.UIButtonComponent.StaticClass())
            ? (e = i).OnPointUpCallBack.IsBound() &&
              (GuideFocusItem.IsOpenLog &&
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Guide",
                  17,
                  "OnButtonPointerUpCallBack execute parent UIButtonComponent",
                ),
              this.kzt(),
              e.OnPointUpCallBack.Execute())
            : i.IsA(UE.UIExtendToggle.StaticClass()) &&
              (e = i).OnPointUpCallBack.IsBound() &&
              (GuideFocusItem.IsOpenLog &&
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Guide",
                  17,
                  "OnButtonPointerUpCallBack execute parent UIExtendToggle",
                ),
              this.kzt(),
              e.OnPointUpCallBack.Execute(1)));
      }),
      (this.Hzt = (e) => {
        var i;
        this.Bzt ||
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Guide", 17, "OnDraggablePointerDownCallBack enter"),
          (i = this.Gzt)?.IsValid() &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnDraggablePointerDownCallBack execute self",
              ),
            i.OnPointerDownCallBack.IsBound()) &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnDraggablePointerDownCallBack execute parent",
              ),
            i.OnPointerDownCallBack.Execute(e)));
      }),
      (this.jzt = (e) => {
        var i;
        this.Bzt ||
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnDraggablePointerBeginDragCallBack enter",
            ),
          (i = this.Gzt)?.IsValid() &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnDraggablePointerBeginDragCallBack execute self",
              ),
            (this.bzt = !0),
            i.OnPointerBeginDragCallBack.IsBound()) &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnDraggablePointerBeginDragCallBack execute parent",
              ),
            i.OnPointerBeginDragCallBack.Execute(e)));
      }),
      (this.Wzt = (e) => {
        var i;
        this.Bzt ||
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Guide", 17, "OnDraggablePointerDragCallBack enter"),
          (i = this.Gzt)?.IsValid() &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnDraggablePointerDragCallBack execute self",
              ),
            (this.Ozt = e),
            i.OnPointerDragCallBack.IsBound()) &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnDraggablePointerDragCallBack execute parent",
              ),
            i.OnPointerDragCallBack.Execute(e)));
      }),
      (this.Kzt = (e) => {
        GuideFocusItem.IsOpenLog &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Guide",
            17,
            "OnDraggablePointerEndDragCallBack enter",
          );
        var i = this.Gzt;
        i?.IsValid() &&
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnDraggablePointerEndDragCallBack execute self",
            ),
          (this.bzt = !1),
          i.OnPointerEndDragCallBack.IsBound()) &&
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnDraggablePointerEndDragCallBack execute parent",
            ),
          i.OnPointerEndDragCallBack.Execute(e));
      }),
      (this.Qzt = (e) => {
        GuideFocusItem.IsOpenLog &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Guide", 17, "OnDraggablePointerUpCallBack enter");
        var i = this.Gzt;
        i?.IsValid() &&
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnDraggablePointerUpCallBack execute self",
            ),
          i.OnPointerUpCallBack.IsBound()) &&
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnDraggablePointerUpCallBack execute parent",
            ),
          i.OnPointerUpCallBack.Execute(e),
          GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnDraggablePointerUpCallBack execute TryFinishByClick",
            ),
          this.kzt());
      }),
      (this.OnTouch = (e, i) => {
        var e = Number(e),
          t =
            TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(
              e,
            )?.GetPointerEventData()?.pressComponent;
        t &&
          t.GetOwner() === this.GetButton(0).GetOwner() &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.GuideTouchIdInject,
            e,
            this.xzt.GetOwner(),
          );
      }),
      (this.Owner = t),
      (this.Config = this.Owner.GetGuideStepInfo().ViewData.ViewConf),
      (this.xzt = e),
      (this.wzt = i);
  }
  Init(e) {
    e && this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Fr]]);
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(3);
    (this.Pzt = new GuideFocusItemText_1.FocusItemText(this)),
      await this.Pzt.OnlyCreateByActorAsync(e.GetOwner()),
      this.AddChild(this.Pzt);
  }
  OnStart() {
    this.Config.OnlyFrame
      ? this.GetItem(3).SetUIActive(!1)
      : (this.GetItem(3).SetUIActive(!0), this.Pzt.ShowText()),
      this.Config.OnlyText
        ? this.GetItem(2).SetUIActive(!1)
        : this.GetItem(2).SetUIActive(!0),
      (this.tYe = this.GetItem(1)),
      (this.RectItem = this.GetItem(2)),
      this.GetItem(1).SetUIActive(this.Config.UseMask),
      (this.Nzt = this.xzt
        .GetOwner()
        .GetComponentByClass(UE.UISelectableComponent.StaticClass()));
    const e = this.GetButton(0),
      i =
        (e.OnPointDownCallBack.Bind(this.Fzt),
        e.OnPointUpCallBack.Bind(this.Vzt),
        this.GetItem(3));
    i.SetUIActive(!1),
      this.Config.ClickAnywhere &&
        0 < (t = this.Config.ClickAnywhereShowTime) &&
        (e.RootUIComp.SetRaycastTarget(!1),
        TimerSystem_1.TimerSystem.Delay(() => {
          i.SetUIActive(!0), e.RootUIComp.SetRaycastTarget(!0);
        }, t)),
      (this.Gzt = this.xzt
        .GetOwner()
        .GetComponentByClass(UE.UIDraggableComponent.StaticClass()));
    var t = e.RootUIComp.GetOwner().GetComponentByClass(
      UE.UIDraggableComponent.StaticClass(),
    );
    t.OnPointerDownCallBack.Bind((e) => {
      this.Hzt(e);
    }),
      t.OnPointerBeginDragCallBack.Bind((e) => {
        this.jzt(e);
      }),
      t.OnPointerDragCallBack.Bind((e) => {
        this.Wzt(e);
      }),
      t.OnPointerEndDragCallBack.Bind((e) => {
        this.Kzt(e);
      }),
      t.OnPointerUpCallBack.Bind((e) => {
        this.Qzt(e);
      }),
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
        this.OnTouch,
      );
  }
  OnBeforeShow() {
    this.Owner?.Config?.UseMask
      ? (ControllerHolder_1.ControllerHolder.GuideController.CheckHasNewTagInHookNameForShow(
          this.Owner.Config,
        )
          ? UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForGuide(
              this.wzt,
            )
          : UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForGuide(
              this.xzt,
            ),
        UiNavigationGlobalData_1.UiNavigationGlobalData.AddBlockListenerFocusTag(
          "GuideFocus",
        ))
      : this.Nzt?.FocusListenerDelegate.Bind(() => {
          this.kzt();
        });
  }
  OnAfterHide() {
    this.Owner?.Config?.UseMask
      ? (UiNavigationGlobalData_1.UiNavigationGlobalData.DeleteBlockListenerFocusTag(
          "GuideFocus",
        ),
        UiNavigationNewController_1.UiNavigationNewController.ResetNavigationFocusForGuide())
      : this.Nzt?.FocusListenerDelegate.Unbind();
  }
  OnAfterShow() {
    this.Owner.ReadyToShow = !0;
  }
  kzt() {
    !this.Config.UseClick ||
      this.Bzt ||
      ((this.Bzt = !0),
      GuideFocusItem.IsOpenLog &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Guide", 17, "TryFinishByClick done"),
      this.Owner.DoCloseByFinished(),
      TimerSystem_1.TimerSystem.Next(() => {
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Guide", 17, "DoCloseByFinished");
      }));
  }
  OnBaseViewCloseWhenFinish() {
    this.Pzt.OnBaseViewCloseWhenFinish();
  }
  OnBeforeDestroy() {
    (this.Bzt = !0),
      this.bzt &&
        (this.Kzt(this.Ozt),
        this.Qzt(this.Ozt),
        (this.bzt = !1),
        (this.Ozt = void 0)),
      this.qzt && (this.Vzt(), (this.qzt = !1)),
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
        this.OnTouch,
      );
  }
  OnTick(e) {
    this.IsShowOrShowing &&
      this.RootItem?.IsValid() &&
      this.xzt?.IsValid() &&
      (this.ApplyButtonFollow(), this.ApplyBgFollow(), this.Pzt?.OnTick(e));
  }
  OnDurationChange(e) {
    this.GetActive() && this.Pzt?.OnDurationChange(e);
  }
  ApplyButtonFollow() {
    var e = this.wzt,
      i = e.K2_GetComponentScale(),
      e =
        (this.RootItem.K2_SetWorldLocation(
          e.K2_GetComponentLocation(),
          !1,
          void 0,
          !1,
        ),
        this.RootItem.SetPivot(e.GetPivot()),
        this.RootItem.SetHeight(e.Height * i.Y),
        this.RootItem.SetWidth(e.Width * i.X),
        this.xzt),
      i = this.GetButton(0).RootUIComp;
    this.Config.ClickAnywhere
      ? (i.K2_SetWorldLocation(
          UiLayer_1.UiLayer.UiRootItem.K2_GetComponentLocation(),
          !1,
          void 0,
          !1,
        ),
        i.SetPivot(UiLayer_1.UiLayer.UiRootItem.GetPivot()),
        i.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height),
        i.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width))
      : (i.SetPivot(e.GetPivot()),
        i.SetHeight(e.Height),
        i.SetWidth(e.Width),
        i.SetRelativeScale3D(e.K2_GetComponentScale()),
        i.K2_SetWorldLocation(e.K2_GetComponentLocation(), !1, void 0, !1));
  }
  ApplyBgFollow() {
    var e;
    this.Config.UseMask &&
      ((e = this.tYe).K2_SetWorldLocation(
        UiLayer_1.UiLayer.UiRootItem.K2_GetComponentLocation(),
        !1,
        void 0,
        !1,
      ),
      e.SetPivot(UiLayer_1.UiLayer.UiRootItem.GetPivot()),
      e.SetHeight(UiLayer_1.UiLayer.UiRootItem.Height),
      e.SetWidth(UiLayer_1.UiLayer.UiRootItem.Width));
  }
}
(exports.GuideFocusItem = GuideFocusItem).IsOpenLog = !1;
//# sourceMappingURL=GuideFocusItem.js.map
