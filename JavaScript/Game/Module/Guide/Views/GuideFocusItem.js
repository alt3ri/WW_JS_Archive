"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideFocusItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
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
      (this.PJt = void 0),
      (this.Owner = void 0),
      (this.xJt = void 0),
      (this.wJt = void 0),
      (this.HXe = void 0),
      (this.RectItem = void 0),
      (this.Config = void 0),
      (this.BJt = !1),
      (this.bJt = !1),
      (this.qJt = !1),
      (this.GJt = void 0),
      (this.NJt = void 0),
      (this.OJt = void 0),
      (this.Fr = () => {
        GuideFocusItem.IsOpenLog &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Guide", 17, "OnButtonClick enter");
        var e,
          i = this.NJt;
        this.kJt(),
          i?.IsInteractable() &&
            this.xJt.bIsUIActive &&
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
      (this.FJt = () => {
        var e, i;
        this.BJt ||
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Guide", 17, "OnButtonPointerDownCallBack enter"),
          (e = this.NJt)?.IsValid() &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnButtonPointerDownCallBack execute self",
              ),
            (this.qJt = !0),
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
      (this.VJt = () => {
        GuideFocusItem.IsOpenLog &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Guide", 17, "OnButtonPointerUpCallBack enter");
        var e,
          i = this.NJt;
        i?.IsValid() &&
          ((this.qJt = !1),
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
              this.kJt(),
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
              this.kJt(),
              e.OnPointUpCallBack.Execute(1)));
      }),
      (this.HJt = (e) => {
        var i;
        this.BJt ||
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Guide", 17, "OnDraggablePointerDownCallBack enter"),
          (i = this.GJt)?.IsValid() &&
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
      (this.jJt = (e) => {
        var i;
        this.BJt ||
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnDraggablePointerBeginDragCallBack enter",
            ),
          (i = this.GJt)?.IsValid() &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnDraggablePointerBeginDragCallBack execute self",
              ),
            (this.bJt = !0),
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
      (this.WJt = (e) => {
        var i;
        this.BJt ||
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Guide", 17, "OnDraggablePointerDragCallBack enter"),
          (i = this.GJt)?.IsValid() &&
            (GuideFocusItem.IsOpenLog &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "OnDraggablePointerDragCallBack execute self",
              ),
            (this.OJt = e),
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
      (this.KJt = (e) => {
        GuideFocusItem.IsOpenLog &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Guide",
            17,
            "OnDraggablePointerEndDragCallBack enter",
          );
        var i = this.GJt;
        i?.IsValid() &&
          (GuideFocusItem.IsOpenLog &&
            Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "OnDraggablePointerEndDragCallBack execute self",
            ),
          (this.bJt = !1),
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
      (this.QJt = (e) => {
        GuideFocusItem.IsOpenLog &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Guide", 17, "OnDraggablePointerUpCallBack enter");
        var i = this.GJt;
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
          this.kJt());
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
            this.xJt.GetOwner(),
          );
      }),
      (this.Owner = t),
      (this.Config = this.Owner.GetGuideStepInfo().ViewData.ViewConf),
      (this.xJt = e),
      (this.wJt = i);
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
    (this.PJt = new GuideFocusItemText_1.FocusItemText(this)),
      await this.PJt.OnlyCreateByActorAsync(e.GetOwner()),
      this.AddChild(this.PJt);
  }
  OnStart() {
    this.Config.OnlyFrame
      ? this.GetItem(3).SetUIActive(!1)
      : (this.GetItem(3).SetUIActive(!0), this.PJt.ShowText()),
      this.Config.OnlyText
        ? this.GetItem(2).SetUIActive(!1)
        : this.GetItem(2).SetUIActive(!0),
      (this.HXe = this.GetItem(1)),
      (this.RectItem = this.GetItem(2)),
      this.GetItem(1).SetUIActive(this.Config.UseMask),
      (this.NJt = this.xJt
        .GetOwner()
        .GetComponentByClass(UE.UISelectableComponent.StaticClass()));
    const e = this.GetButton(0),
      i =
        (e.OnPointDownCallBack.Bind(this.FJt),
        e.OnPointUpCallBack.Bind(this.VJt),
        this.GetItem(3));
    i.SetUIActive(!1),
      this.Config.ClickAnywhere &&
        0 < (t = this.Config.ClickAnywhereShowTime) &&
        (e.RootUIComp.SetRaycastTarget(!1),
        TimerSystem_1.TimerSystem.Delay(() => {
          i.SetUIActive(!0), e.RootUIComp.SetRaycastTarget(!0);
        }, t)),
      (this.GJt = this.xJt
        .GetOwner()
        .GetComponentByClass(UE.UIDraggableComponent.StaticClass()));
    var t = e.RootUIComp.GetOwner().GetComponentByClass(
      UE.UIDraggableComponent.StaticClass(),
    );
    t.OnPointerDownCallBack.Bind((e) => {
      this.HJt(e);
    }),
      t.OnPointerBeginDragCallBack.Bind((e) => {
        this.jJt(e);
      }),
      t.OnPointerDragCallBack.Bind((e) => {
        this.WJt(e);
      }),
      t.OnPointerEndDragCallBack.Bind((e) => {
        this.KJt(e);
      }),
      t.OnPointerUpCallBack.Bind((e) => {
        this.QJt(e);
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
      ? (UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForGuide(
          this.xJt,
        ),
        UiNavigationGlobalData_1.UiNavigationGlobalData.AddBlockListenerFocusTag(
          "GuideFocus",
        ))
      : this.NJt?.FocusListenerDelegate.Bind(() => {
          this.kJt();
        });
  }
  OnAfterHide() {
    this.Owner?.Config?.UseMask
      ? (UiNavigationGlobalData_1.UiNavigationGlobalData.DeleteBlockListenerFocusTag(
          "GuideFocus",
        ),
        UiNavigationNewController_1.UiNavigationNewController.ResetNavigationFocusForGuide())
      : this.NJt?.FocusListenerDelegate.Unbind();
  }
  OnAfterShow() {
    this.Owner.ReadyToShow = !0;
  }
  kJt() {
    !this.Config.UseClick ||
      this.BJt ||
      ((this.BJt = !0),
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
    this.PJt.OnBaseViewCloseWhenFinish();
  }
  OnBeforeDestroy() {
    (this.BJt = !0),
      this.bJt &&
        (this.KJt(this.OJt),
        this.QJt(this.OJt),
        (this.bJt = !1),
        (this.OJt = void 0)),
      this.qJt && (this.VJt(), (this.qJt = !1)),
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
      this.xJt?.IsValid() &&
      (this.ApplyButtonFollow(), this.ApplyBgFollow(), this.PJt?.OnTick(e));
  }
  OnDurationChange(e) {
    this.GetActive() && this.PJt?.OnDurationChange(e);
  }
  ApplyButtonFollow() {
    var e = this.wJt,
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
        this.xJt),
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
      ((e = this.HXe).K2_SetWorldLocation(
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
