"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipmentView = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const StaticTabComponent_1 = require("../../../Common/TabComponent/StaticTabComponent");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const RoleVisionDragHeadItem_1 = require("../../../RoleUi/TabView/VisionSubView/RoleVisionDragHeadItem");
const VisionCommonDragItem_1 = require("../../../RoleUi/TabView/VisionSubView/VisionCommonDragItem");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const PhantomBattleController_1 = require("../../PhantomBattle/PhantomBattleController");
const CostTabItem_1 = require("./CostTabItem");
const VisionDetailComponent_1 = require("./VisionDetailComponent");
const VisionEquipmentDragItem_1 = require("./VisionEquipmentDragItem");
const VisionEquipmentDropDownItem_1 = require("./VisionEquipmentDropDownItem");
const VisionEquipmentDropDownTitleItem_1 = require("./VisionEquipmentDropDownTitleItem");
const VisionMediumItemGrid_1 = require("./VisionMediumItemGrid");
const ANIMATIONTIME = 300;
const INVALIDINDEX = 999;
class VisionEquipmentView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.e6i = 10),
      (this.L8i = void 0),
      (this.D8i = TickSystem_1.TickSystem.InvalidId),
      (this.R8i = TickSystem_1.TickSystem.InvalidId),
      (this.U8i = TickSystem_1.TickSystem.InvalidId),
      (this.A8i = TickSystem_1.TickSystem.InvalidId),
      (this.zke = 0),
      (this.P8i = 0),
      (this.x8i = 0),
      (this.Uqe = 0),
      (this.w8i = new Array()),
      (this.lqe = void 0),
      (this.LoopScrollView = void 0),
      (this.B8i = new Array()),
      (this.b8i = void 0),
      (this.q8i = 0),
      (this.G8i = void 0),
      (this.N8i = void 0),
      (this.O8i = 0),
      (this.aft = void 0),
      (this.hft = void 0),
      (this.k8i = void 0),
      (this.F8i = INVALIDINDEX),
      (this.K1t = 0),
      (this.V8i = 0),
      (this.H8i = !1),
      (this.j8i = !1),
      (this.W8i = 0),
      (this.K8i = 0),
      (this.Q8i = TickSystem_1.TickSystem.InvalidId),
      (this.X8i = void 0),
      (this.VisionEquipmentDragItem = void 0),
      (this.$8i = new Array()),
      (this.Y8i = void 0),
      (this.g_t = 0),
      (this.J8i = 0),
      (this.z8i = 0),
      (this.Z8i = 0),
      (this.e9i = 0),
      (this.t9i = void 0),
      (this.O4t = 0),
      (this.i9i = new Array()),
      (this.XVe = void 0),
      (this.o9i = new Array()),
      (this.Ife = !1),
      (this.j6i = !1),
      (this.r9i = !1),
      (this.n9i = 0),
      (this.s9i = !0),
      (this.a9i = !1),
      (this.KIt = (i) => {
        i === "ContrastSwitch" && this.GetItem(11).SetUIActive(this.r9i);
      }),
      (this.t6e = (i) => {
        (this.e9i = i), this.Ife && this.h9i();
      }),
      (this.i6e = (i) => {
        return Number(i);
      }),
      (this.ZVe = (i) =>
        new VisionEquipmentDropDownItem_1.VisionEquipmentDropDownItem(i)),
      (this.zVe = (i) =>
        new VisionEquipmentDropDownTitleItem_1.VisionEquipmentDropDownTitleItem(
          i,
        )),
      (this.fqe = (i, t) => {
        i = new CostTabItem_1.CostTabItem(i);
        return i.Init(), i;
      }),
      (this.pqe = (i) => {
        (this.O4t = this.i9i[i]), this.Ife && this.h9i();
      }),
      (this.l9i = (i) => {
        ModelManager_1.ModelManager.PhantomBattleModel.SaveIfSimpleState(1, !i);
      }),
      (this.oft = () => {
        UiManager_1.UiManager.OpenView(
          "VisionSkinView",
          this.b8i?.GetUniqueId(),
        );
      }),
      (this._9i = (i) => {
        i.ToHandleData.ViewName === "VisionEquipmentView" &&
          this.IsShowOrShowing &&
          !this.s9i &&
          ((this.s9i = !0), this.u9i(this.b8i?.GetUniqueId() ?? 0));
      }),
      (this.ABn = (i) => {
        i && ((i = this.O8i), (this.O8i = 0), this.u9i(i, !1));
      }),
      (this.c9i = () => {
        const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.zke,
        );
        this.m9i(this.b8i, this.q8i, () => {
          ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
            this.b8i.GetUniqueId(),
            i.GetRoleId(),
            this.q8i,
          );
        });
      }),
      (this.d9i = () => {
        UiManager_1.UiManager.OpenView(
          "VisionIntensifyView",
          this.b8i.GetUniqueId(),
        );
      }),
      (this.C9i = () => {
        this.j6i = !this.j6i;
        var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.zke,
        );
        var i =
          ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(
            i.GetRoleId(),
            this.q8i,
          );
        i > 0
          ? this.j6i
            ? (this.GetItem(11).SetUIActive(!0),
              this.k8i.StopSequenceByKey("ContrastSwitch", !1, !1),
              this.k8i.PlaySequencePurely("ContrastSwitch", !1, !1),
              (this.r9i = !0))
            : (this.r9i &&
                (this.k8i.StopSequenceByKey("ContrastSwitch", !1, !1),
                this.k8i.PlaySequencePurely("ContrastSwitch", !1, !0),
                (this.j6i = !1)),
              (this.r9i = !1))
          : (this.j6i = !1),
          this.GetItem(14).SetUIActive(this.j6i && i > 0),
          this.g9i();
      }),
      (this.sGe = () => {
        const i = new VisionMediumItemGrid_1.VisionMediumItemGrid();
        return (
          i.SetClickToggleEvent(this.f9i),
          i.SetOnRefreshEvent(this.p9i),
          i.SetOnPointDownCallBack(this.v9i),
          i.SetOnPointUpCallBack(this.M9i),
          i
        );
      }),
      (this.p9i = (i) => {
        i.CheckSelectedState(this.b8i) &&
          (this.LoopScrollView.DeselectCurrentGridProxy(),
          this.LoopScrollView.SelectGridProxy(i.GridIndex, !1));
      }),
      (this.v9i = (i, t) => {
        this.S9i(),
          (this.K1t = 0),
          (this.V8i = 0),
          (this.H8i = !0),
          (this.X8i = i);
        i =
          LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
            0,
          ).GetWorldPointInPlane();
        (this.W8i = i.X),
          (this.K8i = i.Z),
          (this.j8i = !1),
          this.VisionEquipmentDragItem.UpdateItem(t),
          this.Y8i.Refresh(t, !1),
          this.E9i(!0),
          this.y9i(0),
          (this.F8i = -1),
          this.GetSprite(19).SetFillAmount(0),
          (this.R8i = TickSystem_1.TickSystem.Add(
            this.I9i,
            "RoleVisionAnimation",
            0,
            !0,
          ).Id);
      }),
      (this.M9i = (i, t) => {
        this.S9i(),
          this.GetLoopScrollViewComponent(6).SetEnable(!0),
          this.Y8i?.ClearStayingItem(),
          this.VisionEquipmentDragItem.SetActive(!1),
          this.E9i(!1),
          (this.F8i = INVALIDINDEX),
          i || t || this.T9i();
      }),
      (this.I9i = () => {
        let i, t;
        (this.K1t += Time_1.Time.DeltaTime),
          this.j8i && this.Y8i.TickCheckDrag(),
          this.H8i &&
            (this.K1t > this.J8i &&
              this.z8i === 0 &&
              (this.L9i(), this.y9i(1), (this.V8i = 0)),
            this.z8i > 0 && (this.V8i += Time_1.Time.DeltaTime),
            this.X8i &&
              ((t =
                LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
                  0,
                ).GetWorldPointInPlane()),
              (i = this.W8i - t.X),
              (t = this.K8i - t.Z),
              Math.abs(i) + Math.abs(t) > this.Z8i) &&
              (this.E9i(!1), (this.H8i = !1)),
            this.V8i > this.g_t
              ? (this.GetLoopScrollViewComponent(6).SetEnable(!1),
                this.E9i(!1),
                (this.H8i = !1),
                (this.j8i = !0),
                this.VisionEquipmentDragItem.SetActive(!0),
                this.Y8i.StartDragState(),
                this.Y8i.SetItemToPointerPosition(),
                this.OnPointerDownCallBack(this.Y8i.GetCurrentIndex()),
                this.Y8i.SetDragItemHierarchyMax(),
                AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag"),
                (this.A8i = TickSystem_1.TickSystem.Add(
                  this.D9i,
                  "RoleVisionAnimation",
                  0,
                  !0,
                ).Id))
              : this.GetSprite(19).SetFillAmount(this.V8i / this.g_t));
      }),
      (this.D9i = () => {
        const i =
          LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
            0,
          );
        const t =
          LguiEventSystemManager_1.LguiEventSystemManager.IsNowTriggerPressed(
            0,
          );
        const s = this.Y8i.GetStayingItem();
        i ||
          t ||
          (s?.length === 0
            ? (this.M9i(void 0, void 0),
              AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop"))
            : (this.OnDragEndCallBack(this.Y8i, this.Y8i.GetStayingItem()),
              this.M9i(void 0, void 0)),
          this.R9i());
      }),
      (this.f9i = (i, t) => {
        this.U9i(i),
          this.LoopScrollView.DeselectCurrentGridProxy(),
          this.LoopScrollView.SelectGridProxy(t),
          this.A9i(i),
          (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectData =
            this.P9i(t)),
          (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId =
            i.GetUniqueId()),
          this.u9i(this.b8i.GetUniqueId()),
          this.x9i();
      }),
      (this.TryEquip = (i, t, s) => {
        const e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.zke,
        );
        switch (
          i
            ? ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipState(
                e.GetRoleId(),
                t,
                i.GetUniqueId(),
              )
            : 1
        ) {
          case 0:
            if (t === -1) return;
            this.w9i(t);
            break;
          case 1:
          case 2:
            this.B9i(i, t, s);
        }
      }),
      (this.OnClickFailVision = (i) => {
        this.T9i();
      }),
      (this.OnClickVisionAndRefreshVisionView = (i) => {
        this.GetItem(15).SetRaycastTarget(!1), this.b9i(i), this.q9i(!1, !1);
        const t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.zke,
        );
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
          t.GetRoleId(),
          i,
        ) === 0 && this.LoopScrollView.ResetGridController(),
          this.G9i(),
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_click");
      }),
      (this.Og = (i) => {
        this.N9i(), this.G9i(), this.x9i(), this.O9i(i?.GetUniqueId() ?? 0);
      }),
      (this.k9i = () => {
        this.LoopScrollView.DeselectCurrentGridProxy(),
          this.B8i.length > 0
            ? (this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!0),
              this.LoopScrollView.RefreshAllGridProxies())
            : this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!1);
      }),
      (this.F9i = () => {
        this.LoopScrollView.RefreshAllGridProxies();
      }),
      (this.V9i = () => {
        this.LoopScrollView.DeselectCurrentGridProxy(),
          this.B8i.length > 0
            ? (this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!0),
              this.LoopScrollView.ReloadData(this.B8i))
            : this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!1);
      }),
      (this.N9i = () => {
        const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.zke,
        );
        const t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
            i,
          );
        const s = this.w8i.length;
        for (let i = 0; i < s; i++) {
          const e = t.length > i ? t[i] : void 0;
          this.w8i[i].UpdateItem(e), this.$8i[i].Refresh(e, !1);
        }
        this.H9i();
      }),
      (this.OnBeginDrag = (i) => {
        const t = this.$8i.length;
        for (let i = 0; i < t; i++) this.$8i[i].StartDragState();
        for (let i = 0; i < t; i++)
          ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
            this.$8i[i].GetCurrentIndex(),
          ) && this.$8i[i].SetDragItemHierarchyMax();
        this.$8i[i].SetItemToPointerPosition(),
          (this.F8i = i),
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
      }),
      (this.OnPointerDownCallBack = (i) => {
        this.GetItem(15).SetRaycastTarget(!0);
        const t = this.$8i.length;
        for (let i = 0; i < t; i++) this.$8i[i].StartClickCheckTimer();
      }),
      (this.j9i = () => {
        this.Uqe += Time_1.Time.DeltaTime;
        let i = this.Uqe / ANIMATIONTIME;
        i >= 1 && (i = 1),
          this.$8i[this.F8i].TickDoCeaseAnimation(i),
          i >= 1 && (this.W9i(this.F8i), this.K9i());
      }),
      (this.OnEquipError = () => {
        this.T9i();
      }),
      (this.OnPhantomEquip = () => {
        this.g9i();
      }),
      (this.OnVisionFilterMonster = () => {
        this.Q9i();
      }),
      (this.X9i = (i, t) => {
        this.K9i(),
          (this.Uqe = 0),
          (this.F8i = INVALIDINDEX),
          this.$8i[i].SetActive(!1),
          this.$8i[i].ResetPosition(),
          this.w8i[i].ResetPosition(),
          this.GetItem(15).SetRaycastTarget(!1);
        const s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.zke,
        );
        this.m9i(t, i, () => {
          ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
            t.GetUniqueId(),
            s.GetRoleId(),
            i,
          );
        });
      }),
      (this.OnDragEndCallBack = (i, t) => {
        if (t.length < 1)
          this.T9i(),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop");
        else {
          const s = VisionCommonDragItem_1.VisionCommonDragItem.GetOverlapIndex(
            i,
            t,
          );
          if (s === -1) this.T9i();
          else {
            i.GetCurrentIndex() === -1 && this.T9i();
            const e = i.GetCurrentIndex();
            const h = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
              this.zke,
            );
            const r = e !== -1;
            this.m9i(i.GetCurrentData(), s, () => {
              this.$9i(e, !0),
                this.$9i(s, !0),
                this.Y9i(e, !0),
                this.Y9i(s, !0),
                ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
                  i.GetCurrentData().GetUniqueId(),
                  h.GetRoleId(),
                  s,
                  e,
                  r,
                );
            });
          }
        }
      }),
      (this.J9i = (i, t, s) => {
        (this.F8i = INVALIDINDEX),
          i >= 0 &&
            (this.$8i[i].SetActive(!0), this.w8i[i].SetAniLightState(!1)),
          s && i !== -1
            ? (UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !0),
              this.z9i(),
              (this.Uqe = 0),
              (s = this.$8i[t].GetAnimationTargetPos()),
              this.$8i[i].SetDragComponentToTargetPositionParam(s),
              (s = this.$8i[i].GetAnimationTargetPos()),
              this.$8i[t].SetDragComponentToTargetPositionParam(s),
              (this.P8i = i),
              (this.x8i = t),
              this.$9i(this.P8i, !0),
              this.$9i(this.x8i, !0),
              this.Y9i(this.P8i, !0),
              this.Y9i(this.x8i, !0),
              (this.D8i = TickSystem_1.TickSystem.Add(
                this.J_,
                "RoleVisionAnimation",
                0,
                !0,
              ).Id))
            : (this.$9i(i, !1),
              this.$9i(t, !1),
              this.Y9i(i, !1),
              this.Y9i(t, !1),
              this.Z9i(),
              this.b9i(t),
              this.q9i(!0, !1, !1),
              this.w8i[t].GetCurrentData() && this.e7i(t),
              i >= 0
                ? AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_off")
                : AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"));
      }),
      (this.J_ = () => {
        this.Uqe += Time_1.Time.DeltaTime;
        let i = this.Uqe / ANIMATIONTIME;
        i >= 1 && (i = 1),
          this.$8i[this.P8i].TickDoCeaseAnimation(i),
          this.$8i[this.x8i].TickDoCeaseAnimation(i),
          i >= 1 &&
            (this.t7i(),
            this.z9i(),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"));
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.i7i = void 0),
      (this.bpt = (i, t, s) => {
        const e = i;
        const h = new Array();
        e.forEach((i) => {
          h.push(
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              i.Id,
            ),
          );
        }),
          (this.B8i = h),
          this.V9i();
        i = i?.length > 0;
        this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(i),
          this.o7i(e, t, s);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UILoopScrollViewComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [16, UE.UIItem],
      [15, UE.UIItem],
      [17, UE.UIVerticalLayout],
      [18, UE.UIItem],
      [19, UE.UISprite],
      [20, UE.UIItem],
      [21, UE.UIExtendToggle],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIButtonComponent],
      [28, UE.UIItem],
      [29, UE.UIButtonComponent],
      [30, UE.UIText],
      [31, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [21, this.l9i],
        [27, this.oft],
        [29, this.C9i],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.V9i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemLock,
        this.F9i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomEquipError,
        this.OnEquipError,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomEquip,
        this.OnPhantomEquip,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
        this.J9i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.VisionFilterMonster,
        this.OnVisionFilterMonster,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
        this._9i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.VisionSkinViewClose,
        this.ABn,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.V9i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemLock,
        this.F9i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomEquipError,
        this.OnEquipError,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomEquip,
        this.OnPhantomEquip,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
        this.J9i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.VisionFilterMonster,
        this.OnVisionFilterMonster,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
        this._9i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.VisionSkinViewClose,
        this.ABn,
      );
  }
  OnStart() {
    (this.s9i = !1),
      this.GetItem(15).SetUIActive(!0),
      this.GetItem(15).SetRaycastTarget(!1),
      this.GetItem(9).SetUIActive(!0),
      (this.aft = new FilterEntrance_1.FilterEntrance(
        this.GetItem(12),
        this.bpt,
      )),
      (this.hft = new SortEntrance_1.SortEntrance(this.GetItem(13), this.bpt)),
      (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(6),
        this.GetItem(8).GetOwner(),
        this.sGe,
      )),
      this.r7i(),
      (this.k8i = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.k8i.BindSequenceCloseEvent(this.KIt),
      this.GetItem(14).SetUIActive(!1),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7))),
      this.lqe.SetCloseCallBack(this.Awe),
      (this.g_t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerPressTime()),
      (this.Z8i =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerMoveDistance()),
      (this.J8i =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionBeforeScrollerLongPressTime()),
      this.n7i(),
      this.s7i(),
      this.E9i(!1),
      this.GetVerticalLayout(17).SetEnable(!1),
      this.N8i.RefreshViewByCompareState(!0),
      this.a7i(),
      this.h7i(),
      (this.Ife = !0);
    const i = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1)
      ? 0
      : 1;
    this.GetExtendToggle(21)?.SetToggleState(i),
      this.k8i.PlaySequencePurely("ContrastSwitch", !1, !0),
      (this.r9i = !1);
  }
  OnHandleLoadScene() {
    PhantomBattleController_1.PhantomBattleController.SetMeshTransform(
      this.i7i,
    );
  }
  async OnBeforeStartAsync() {
    (this.zke = this.OpenParam),
      (this.G8i = new VisionDetailComponent_1.VisionDetailComponent(
        this.GetItem(10),
      )),
      await this.G8i.Init(),
      (this.N8i = new VisionDetailComponent_1.VisionDetailComponent(
        this.GetItem(11),
      )),
      await this.N8i.Init(),
      await this.l7i(),
      (this.XVe = new CommonDropDown_1.CommonDropDown(
        this.GetItem(22),
        this.ZVe,
        this.zVe,
      )),
      await this.XVe.Init();
  }
  r7i() {
    this.G8i.GetDetailUnderComponent().SetRightButtonClick(this.d9i),
      this.G8i.GetDetailUnderComponent().SetLeftButtonClick(this.c9i),
      this.G8i.SetActive(!1),
      this.N8i.SetButtonPanelShowState(!0),
      this.N8i.SetActive(!0);
  }
  async l7i() {
    for (let i = 0; i <= 4; i++)
      this.w8i.push(
        new RoleVisionDragHeadItem_1.RoleVisionDragHeadItem(
          this.GetItem(i),
          0 + i,
          this.zke,
        ),
      );
    (this.VisionEquipmentDragItem =
      new VisionEquipmentDragItem_1.VisionEquipmentDragItem(this.GetItem(16))),
      await this.VisionEquipmentDragItem.Init(),
      this.VisionEquipmentDragItem.SetActive(!1),
      (this.Y8i = new VisionCommonDragItem_1.VisionCommonDragItem(
        this.VisionEquipmentDragItem.GetRootItem(),
        this.VisionEquipmentDragItem.GetDragComponent(),
        this.GetItem(15),
        -1,
      )),
      this.GetItem(16).SetUIActive(!1),
      await Promise.all([...this.w8i.map(async (i) => i.Init())]),
      this.w8i.forEach((i) => {
        const t = new VisionCommonDragItem_1.VisionCommonDragItem(
          i.GetRootItem(),
          i.GetDragComponent(),
          this.GetItem(15),
          i.GetCurrentIndex(),
        );
        this.$8i.push(t),
          t.SetOnDragAnimationStartFunction(i.OnDragItemDragBegin),
          t.SetOnDragAnimationEndFunction(i.OnDragItemDragEnd),
          t.SetOnOverlayCallBack(i.OnOverlay),
          t.SetOnUnOverlayCallBack(i.OnUnOverlay),
          t.SetMoveToScrollViewCallBack(i.OnScrollToScrollView),
          t.SetRemoveFromScrollViewCallBack(i.OnRemoveFromScrollView),
          i.SetShowType(1);
      }),
      this.$8i.forEach((i) => {
        i.SetOnClickCallBack(this.OnClickVisionAndRefreshVisionView),
          i.SetOnClickFailCallBack(this.OnClickFailVision),
          i.SetDragCheckItem(this.$8i),
          i.SetDragSuccessCallBack(this.OnDragEndCallBack),
          i.SetPointerDownCallBack(this.OnPointerDownCallBack),
          i.SetOnBeginDragCall(this.OnBeginDrag),
          i.SetEndDragWhenOnScrollViewCallBack(this.X9i);
      }),
      this.Y8i.SetDragCheckItem(this.$8i);
  }
  h7i() {
    const i =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray();
    this.o9i.push(0),
      i.forEach((i) => {
        this.o9i.push(i.Id);
      }),
      this.XVe.SetOnSelectCall(this.t6e),
      this.XVe.SetShowType(0),
      this.XVe.InitScroll(this.o9i, this.i6e, this.e9i);
  }
  a7i() {
    const t = new Array();
    for (let i = 23; i <= 26; i++) {
      const s = this.GetItem(i);
      t.push(s);
    }
    const i = this.GetItem(20);
    (this.t9i = new StaticTabComponent_1.StaticTabComponent(
      this.fqe,
      this.pqe,
    )),
      this.t9i.Init(t);
    const e = i.GetAttachUIChildren().Num();
    for (let t = 0; t < e; t++) {
      let i = t;
      t > 1 && (i += 1), this.i9i.push(i);
    }
    this.t9i.SelectToggleByIndex(0, !0);
  }
  n7i() {
    this.q8i =
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex;
    const i =
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId;
    const t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i);
    i > 0 && t ? this.U9i(t) : this.U9i(this.P9i(this.q8i));
  }
  _7i() {
    this.n9i > 0 &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        "IdentifyTab",
        this.GetItem(28),
        this.n9i,
      ),
      (this.n9i = 0));
  }
  u7i() {
    this._7i(),
      this.b8i &&
        ((this.n9i = this.b8i.GetUniqueId()),
        RedDotController_1.RedDotController.BindRedDot(
          "IdentifyTab",
          this.GetItem(28),
          void 0,
          this.n9i,
        ));
  }
  s7i() {
    this.Og(this.b8i), this.u9i(this.b8i?.GetUniqueId() ?? 0), this.c7i();
  }
  y9i(i) {
    this.GetItem(18).SetAlpha(i), (this.z8i = i);
  }
  E9i(i) {
    this.GetItem(18).SetUIActive(i);
  }
  m9i(i, t, s) {
    this.m7i(i, t) ? this.TryEquip(i, t, s) : this.T9i();
  }
  m7i(i, t) {
    const s =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
        i.GetUniqueId(),
      );
    const e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
      this.zke,
    );
    var h = ModelManager_1.ModelManager.PhantomBattleModel;
    var t = h.GetRoleIndexPhantomId(e.GetRoleId(), t);
    var t = h.GetPhantomBattleData(t) ? h.GetPhantomBattleData(t).GetCost() : 0;
    const r = h.GetRoleCurrentPhantomCost(e.GetRoleId());
    if (s && s !== e.GetRoleId()) {
      var h = h.GetRoleCurrentPhantomCost(s) - i.GetCost() + t;
      const n = r - t + i.GetCost();
      if (h > this.d7i() || n > this.d7i()) return this.C7i(), !1;
    } else {
      if (s && s === e.GetRoleId()) return !0;
      if (r - t + i.GetCost() > this.d7i()) return this.C7i(), !1;
    }
    return !0;
  }
  C7i() {
    let i;
    this.d7i() <
    ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionReachableCostMax()
      ? ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(157)).FunctionMap.set(
          1,
          () => {
            this.g7i(),
              UiManager_1.UiManager.OpenView(
                "CalabashRootView",
                void 0,
                (i) => {
                  i &&
                    (UiManager_1.UiManager.CloseView("VisionEquipmentView"),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.PhantomCostInsufficient,
                    ));
                },
              );
          },
        ),
        (i.IsEscViewTriggerCallBack = !1),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          i,
        ))
      : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(158)),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          i,
        ));
  }
  G9i() {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
    let t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(
        i.GetRoleId(),
      );
    const s =
      ModelManager_1.ModelManager.PhantomBattleModel?.GetRoleIndexPhantomId(
        i.GetRoleId(),
        this.q8i,
      );
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
      i.GetRoleId(),
    ).GetIncrIdList();
    let e = this.b8i ? this.b8i.GetUniqueId() : 0;
    var i = i.includes(e);
    s &&
      s > 0 &&
      !i &&
      ((e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(s)),
      (t -= e.GetCost())),
      i || (t += this.b8i ? this.b8i.GetCost() : 0);
    let h = "";
    let r = "";
    t > this.d7i()
      ? ((h =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorAlert()),
        (r =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull()),
        this.a9i || (this.k8i.PlaySequencePurely("CostBlink"), (this.a9i = !0)))
      : ((r =
          t === this.d7i()
            ? ((h =
                ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull()),
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull())
            : ((h =
                ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorBase()),
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorBase())),
        this.k8i.StopSequenceByKey("CostBlink", !1, !0),
        (this.a9i = !1)),
      this.GetText(5).SetText(
        StringUtils_1.StringUtils.Format("/{0}", this.d7i().toString()),
      ),
      this.GetText(30).SetText(
        StringUtils_1.StringUtils.Format("{0}", t.toString()),
      ),
      this.GetText(30).SetColor(UE.Color.FromHex(h)),
      this.GetText(5).SetColor(UE.Color.FromHex(r));
  }
  g9i() {
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
      this.zke,
    );
    var t =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
        i.GetRoleId(),
        this.q8i,
      );
    var t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    if (t) this.N8i.Update(t, this.zke, !0);
    else {
      const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        this.zke,
      );
      ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(
        i.GetRoleId(),
        this.q8i,
      ) === 0 &&
        this.r9i &&
        (this.k8i.PlaySequencePurely("ContrastSwitch", !1, !0),
        (this.r9i = !1),
        (this.j6i = !1));
    }
  }
  U9i(i) {
    (this.b8i = i), this.f7i(), this.G9i(), this.u7i();
  }
  S9i() {
    this.R8i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.R8i),
      (this.R8i = TickSystem_1.TickSystem.InvalidId));
  }
  L9i() {
    var i =
      LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
        0,
      );
    var i = Vector2D_1.Vector2D.Create(i.X, i.Y);
    var t =
      (i.FromUeVector2D(
        UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
          i.ToUeVector2D(!0),
        ),
      ),
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() *
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir());
    const s =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() *
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir();
    var t = i.X + t;
    var i = i.Y + s;
    this.GetItem(18).SetLGUISpaceAbsolutePosition(new UE.Vector(t, i, 0));
  }
  p7i() {
    this.Q8i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.Q8i),
      (this.Q8i = TickSystem_1.TickSystem.InvalidId));
  }
  R9i() {
    this.A8i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.A8i),
      (this.A8i = TickSystem_1.TickSystem.InvalidId));
  }
  w9i(i) {
    const t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
      this.zke,
    );
    ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
      0,
      t.GetRoleId(),
      i,
      i,
    );
  }
  B9i(i, t, s) {
    var i =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
        i.GetUniqueId(),
      );
    let e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
    i && i !== e.GetRoleId()
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(31)),
        (i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i)),
        e.SetTextArgs(i.GetName()),
        e.FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        }),
        e.FunctionMap.set(2, () => {
          s();
        }),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        ))
      : s();
  }
  b9i(i) {
    this.q8i !== i &&
      ((this.q8i = i),
      (ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex =
        i));
  }
  q9i(i = !1, t = !0, s = !0) {
    this.v7i(t, s), this.M7i(i);
  }
  v7i(i = !0, t = !0) {
    var s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
    var s =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
        s.GetRoleId(),
        this.q8i,
      );
    s !== 0
      ? (this.O9i(s, t), (s = this.P9i(this.q8i)), this.U9i(s))
      : i &&
        (this.U9i(this.P9i(this.q8i)),
        this.LoopScrollView.ResetGridController(),
        this.O9i(this.b8i?.GetUniqueId() ?? 0, t));
  }
  M7i(i = !1) {
    this.A9i(this.b8i),
      this.H9i(),
      this.g9i(),
      this.u9i(this.b8i?.GetUniqueId() ?? 0, i),
      this.x9i(),
      this.c7i(),
      this.T9i();
  }
  S7i() {
    const t = this.w8i.length;
    for (let i = 0; i < t; i++) this.w8i[i].SetToggleState(0, !1, !0);
  }
  c7i() {
    const t = this.w8i.length;
    for (let i = 0; i < t; i++)
      this.w8i[i].SetToggleState(this.q8i === i ? 1 : 0);
  }
  P9i(i) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke);
    var t =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
        t.GetRoleId(),
        i,
      );
    let s =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    return (s = s || (this.B8i.length > 0 ? this.B8i[0] : void 0));
  }
  A9i(i, t = 0) {
    i
      ? (this.G8i.SetActive(!0), this.G8i.Update(i, this.zke, !1))
      : this.G8i.SetActive(!1);
  }
  O9i(i, t = !0) {
    this.LoopScrollView.DeselectCurrentGridProxy();
    let s = !1;
    let e = 0;
    for (const h of this.B8i) {
      if (h.GetUniqueId() === i) {
        s = !0;
        break;
      }
      e++;
    }
    s || (e = 0),
      this.B8i.length > 0 &&
        s &&
        (t && this.LoopScrollView.ScrollToGridIndex(e, !1),
        this.LoopScrollView.SelectGridProxy(e));
  }
  OnBeforeShow() {
    let i;
    this.O8i > 0 &&
      !UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() &&
      ((i = this.O8i), (this.O8i = 0), this.u9i(i, !1)),
      ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex(),
      this.A9i(this.b8i),
      this.g9i(),
      ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpTag()
        ? (this.h9i(),
          ModelManager_1.ModelManager.PhantomBattleModel.ClearVisionLevelUp())
        : ModelManager_1.ModelManager.PhantomBattleModel
              .CurrentSelectFetterGroupId > 0
          ? ((this.e9i = this.o9i.indexOf(
              ModelManager_1.ModelManager.PhantomBattleModel
                .CurrentSelectFetterGroupId,
            )),
            (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId = 0),
            this.XVe.SetSelectedIndex(this.e9i))
          : this.h9i(),
      this.Q9i(),
      this.S7i(),
      this.c7i(),
      this.x9i(),
      this.N9i();
  }
  Q9i() {
    ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter &&
      (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter =
        void 0);
  }
  h9i() {
    var i = this.o9i[this.e9i];
    var i =
      ModelManager_1.ModelManager.PhantomBattleModel.GetVisionSortUseDataList(
        i,
        this.O4t,
      );
    this.aft.UpdateData(this.e6i, i, this.zke),
      this.hft.UpdateData(this.e6i, i, this.zke);
  }
  OnAfterShow() {
    this.$8i.forEach((i) => {
      i.SetScrollViewItem(this.GetLoopScrollViewComponent(6).RootUIComp);
    });
  }
  OnAfterHide() {
    this.T9i(),
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !1,
      ),
      UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
  }
  u9i(i, t = !1) {
    let s;
    this.s9i &&
      (s =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          i,
        )) &&
      this.O8i !== s.GetUniqueId() &&
      (this.y7i(),
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
        s.GetConfigId(!0),
        () => {
          this.E7i(t);
        },
        this.i7i,
      ),
      (this.O8i = i));
  }
  E7i(s = !1) {
    if (this.i7i) {
      const e = this.i7i.Model;
      let i = void 0;
      let t = void 0;
      (t = s
        ? ((i = "VisionChangeEffect"), "VisionChangeController")
        : ((i = "VisionLevelUpEffect"), "VisionStepupController")),
        UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, i),
        UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e, t);
    }
  }
  f7i() {
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
      this.zke,
    );
    let t = "";
    switch (
      this.b8i
        ? ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipState(
            i.GetRoleId(),
            this.q8i,
            this.b8i.GetUniqueId(),
          )
        : 1
    ) {
      case 0:
        t = "PhantomTakeOff";
        break;
      case 1:
        t = "PhantomPutOn";
        break;
      case 2:
        t = "PhantomReplace";
    }
    this.G8i.SetUnderLeftButtonText(t);
  }
  H9i() {
    const t = this.w8i.length;
    for (let i = 0; i < t; i++)
      i === this.q8i ? this.w8i[i].SetSelected() : this.w8i[i].SetUnSelected();
  }
  async W9i(i) {
    (this.x8i = i),
      this.$9i(this.P8i, !1),
      this.$9i(this.x8i, !1),
      await this.I7i(i),
      this.Y9i(this.P8i, !1),
      this.Y9i(this.x8i, !1),
      this.T9i(!1),
      this.L8i.SetResult(!0);
  }
  async I7i(i) {
    this.$8i[i].SetToTargetParentAndSetStretch(
      this.w8i[this.x8i].GetRootItem(),
    ),
      this.$8i[this.x8i].SetToTargetParentAndSetStretch(
        this.w8i[i].GetRootItem(),
      ),
      this.$8i[i].DoCeaseSequence(),
      this.x8i !== i &&
        this.$8i[this.x8i].GetCurrentData() &&
        this.$8i[this.x8i].DoCeaseSequence(),
      await this.$8i[i].GetCeaseAnimationPromise()?.Promise;
  }
  K9i() {
    this.U8i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.U8i),
      (this.U8i = TickSystem_1.TickSystem.InvalidId));
  }
  async T9i(i = !0) {
    i &&
      this.F8i !== INVALIDINDEX &&
      this.F8i !== -1 &&
      (this.K9i(),
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !0,
      ),
      (this.Uqe = 0),
      (this.L8i = new CustomPromise_1.CustomPromise()),
      (i = this.$8i[this.F8i].GetAnimationTargetPos()),
      this.$8i[this.F8i].SetDragComponentToTargetPositionParam(i),
      (this.U8i = TickSystem_1.TickSystem.Add(
        this.j9i,
        "OnFailAnimationTick",
        0,
        !0,
      ).Id),
      this.$9i(this.F8i, !0),
      await this.L8i.Promise,
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !1,
      ),
      (this.F8i = INVALIDINDEX)),
      this.$8i.forEach((i) => {
        i.ResetPosition(), i.SetActive(!0);
      }),
      this.w8i.forEach((i) => {
        i.ResetPosition();
      }),
      this.GetItem(15).SetRaycastTarget(!1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiCommon",
          28,
          "this.GetItem(EComponent.DragPanel)!.SetRaycastTar",
        );
  }
  $9i(i, t) {
    i >= 0 && this.$8i[i].SetMovingState(t);
  }
  Y9i(i, t) {
    i >= 0 && this.w8i[i].SetAnimationState(t);
  }
  async e7i(i) {
    return (
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !0,
      ),
      this.$8i[i].DoCeaseSequence(),
      await this.$8i[i].GetCeaseAnimationPromise()?.Promise,
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !1,
      ),
      Promise.resolve()
    );
  }
  async t7i() {
    this.w8i[this.x8i].GetRootItem().SetAsFirstHierarchy(),
      this.$8i[this.P8i].SetToNormalParent(),
      this.$9i(this.P8i, !1),
      this.$9i(this.x8i, !1),
      await this.I7i(this.P8i),
      this.Y9i(this.P8i, !1),
      this.Y9i(this.x8i, !1),
      await this.T9i(!1),
      this.Z9i(),
      this.b9i(this.x8i),
      this.q9i(!0, !0, !1),
      UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
  }
  Z9i() {
    this.k9i(), this.N9i(), this.g9i(), this.G9i(), this.f7i(), this.T9i();
  }
  z9i() {
    this.D8i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.D8i),
      (this.D8i = TickSystem_1.TickSystem.InvalidId));
  }
  d7i() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
  }
  y7i() {
    UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
      UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
      (this.i7i = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
  }
  g7i() {
    UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle(),
      (this.i7i = void 0);
  }
  OnBeforePlayCloseSequence() {
    this.g7i();
  }
  OnBeforeDestroy() {
    this.g7i(),
      (this.i7i = void 0),
      this.p7i(),
      this._7i(),
      this.LoopScrollView.ClearGridProxies(),
      this.S9i(),
      this.z9i(),
      this.K9i(),
      this.t9i.Destroy();
  }
  o7i(s, i, e) {
    if (s?.length > 0) {
      let t = 0;
      if (e !== 1 || i) {
        const h = s.length;
        for (let i = 0; i < h; i++)
          if (s[i].Id === this.b8i?.GetUniqueId()) {
            t = this.b8i?.GetUniqueId();
            break;
          }
        t === 0 && (t = s[0].Id);
      } else t = s[0].Id;
      e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
      this.U9i(e),
        this.O9i(t),
        this.A9i(this.b8i),
        this.g9i(),
        this.u9i(t),
        this.x9i(),
        this.c7i();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    let t = this.B8i;
    if (t.length !== 0)
      if (i.length !== 2)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Guide", 17, "声骸聚焦引导extraParam配置错误");
      else {
        if (i[0] === "txt") {
          var s = this.G8i?.GetTxtItemByIndex(Number(i[1]));
          if (s) return [s, s];
        }
        if (i[0] === "item") {
          const e = Number(i[1]);
          return e
            ? ((s = t.findIndex((i) => i.GetMonsterId(!0) === e)),
              this.LoopScrollView.ScrollToGridIndex(s),
              [(t = this.LoopScrollView.GetGrid(s)), t])
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Guide",
                  17,
                  "声骸聚焦引导extraParam字段配置错误",
                  ["configParams", i],
                )
              );
        }
      }
  }
  x9i() {
    let i = this.b8i?.GetMonsterId();
    (i =
      i &&
      ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
        i,
      ))
      ? ((i = i.length > 1),
        this.GetButton(27).RootUIComp.SetUIActive(i),
        (i =
          ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
            this.b8i.GetConfigId(),
          )),
        this.GetItem(31).SetUIActive(i))
      : this.GetButton(27).RootUIComp.SetUIActive(!1);
  }
}
exports.VisionEquipmentView = VisionEquipmentView;
// # sourceMappingURL=VisionEquipmentView.js.map
