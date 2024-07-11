"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipmentView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CalabashController_1 = require("../../../Calabash/CalabashController"),
  CommonDropDown_1 = require("../../../Common/DropDown/CommonDropDown"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  StaticTabComponent_1 = require("../../../Common/TabComponent/StaticTabComponent"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  RoleVisionDragHeadItem_1 = require("../../../RoleUi/TabView/VisionSubView/RoleVisionDragHeadItem"),
  VisionCommonDragItem_1 = require("../../../RoleUi/TabView/VisionSubView/VisionCommonDragItem"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  PhantomBattleController_1 = require("../../PhantomBattle/PhantomBattleController"),
  CostTabItem_1 = require("./CostTabItem"),
  VisionDetailComponent_1 = require("./VisionDetailComponent"),
  VisionEquipmentDragItem_1 = require("./VisionEquipmentDragItem"),
  VisionEquipmentDropDownItem_1 = require("./VisionEquipmentDropDownItem"),
  VisionEquipmentDropDownTitleItem_1 = require("./VisionEquipmentDropDownTitleItem"),
  VisionMediumItemGrid_1 = require("./VisionMediumItemGrid"),
  ANIMATIONTIME = 300,
  INVALIDINDEX = 999;
class VisionEquipmentView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Z6i = 10),
      (this.T9i = void 0),
      (this.L9i = TickSystem_1.TickSystem.InvalidId),
      (this.D9i = TickSystem_1.TickSystem.InvalidId),
      (this.R9i = TickSystem_1.TickSystem.InvalidId),
      (this.U9i = TickSystem_1.TickSystem.InvalidId),
      (this.dFe = 0),
      (this.A9i = 0),
      (this.P9i = 0),
      (this.Uqe = 0),
      (this.x9i = new Array()),
      (this.lqe = void 0),
      (this.LoopScrollView = void 0),
      (this.w9i = new Array()),
      (this.B9i = void 0),
      (this.b9i = 0),
      (this.q9i = void 0),
      (this.G9i = void 0),
      (this.N9i = 0),
      (this.vpt = void 0),
      (this.Mpt = void 0),
      (this.O9i = void 0),
      (this.k9i = INVALIDINDEX),
      (this.rut = 0),
      (this.F9i = 0),
      (this.V9i = !1),
      (this.H9i = !1),
      (this.j9i = 0),
      (this.W9i = 0),
      (this.K9i = TickSystem_1.TickSystem.InvalidId),
      (this.Q9i = void 0),
      (this.VisionEquipmentDragItem = void 0),
      (this.X9i = new Array()),
      (this.$9i = void 0),
      (this.xut = 0),
      (this.Y9i = 0),
      (this.J9i = 0),
      (this.z9i = 0),
      (this.Z9i = 0),
      (this.e7i = void 0),
      (this.O5t = 0),
      (this.t7i = new Array()),
      (this.h8e = void 0),
      (this.i7i = new Array()),
      (this.Ife = !1),
      (this.H8i = !1),
      (this.o7i = !1),
      (this.r7i = 0),
      (this.n7i = !0),
      (this.s7i = !1),
      (this.eoa = 0),
      (this.JTt = (i) => {
        "ContrastSwitch" === i && this.GetItem(11).SetUIActive(this.o7i);
      }),
      (this.C8e = (i) => {
        (this.Z9i = i), this.Ife && this.a7i();
      }),
      (this.g8e = (i) => {
        return Number(i);
      }),
      (this.m8e = (i) =>
        new VisionEquipmentDropDownItem_1.VisionEquipmentDropDownItem(i)),
      (this.c8e = (i) =>
        new VisionEquipmentDropDownTitleItem_1.VisionEquipmentDropDownTitleItem(
          i,
        )),
      (this.fqe = (i, t) => {
        i = new CostTabItem_1.CostTabItem(i);
        return i.Init(), i;
      }),
      (this.pqe = (i) => {
        (this.O5t = this.t7i[i]), this.Ife && this.a7i();
      }),
      (this.h7i = (i) => {
        ModelManager_1.ModelManager.PhantomBattleModel.SaveIfSimpleState(1, !i);
      }),
      (this.Cpt = () => {
        UiManager_1.UiManager.OpenView(
          "VisionSkinView",
          this.B9i?.GetUniqueId(),
        );
      }),
      (this.l7i = (i) => {
        "VisionEquipmentView" === i.ToHandleData.ViewName &&
          this.IsShowOrShowing &&
          !this.n7i &&
          ((this.n7i = !0), this._7i(this.B9i?.GetUniqueId() ?? 0));
      }),
      (this.Hqn = (i) => {
        i && ((i = this.N9i), (this.N9i = 0), this._7i(i, !1));
      }),
      (this.u7i = () => {
        const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.dFe,
        );
        this.c7i(this.B9i, this.b9i, () => {
          ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
            this.B9i.GetUniqueId(),
            i.GetRoleId(),
            this.b9i,
          );
        });
      }),
      (this.m7i = () => {
        UiManager_1.UiManager.OpenView(
          "VisionIntensifyView",
          this.B9i.GetUniqueId(),
        );
      }),
      (this.toa = () => {
        (this.eoa = this.N9i),
          this.CHi(),
          CalabashController_1.CalabashController.JumpToCalabashRootView(
            "VisionRecoveryTabView",
          );
      }),
      (this.d7i = () => {
        this.H8i = !this.H8i;
        var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            this.dFe,
          ),
          i =
            ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(
              i.GetRoleId(),
              this.b9i,
            );
        0 < i
          ? this.H8i
            ? (this.GetItem(11).SetUIActive(!0),
              this.O9i.StopSequenceByKey("ContrastSwitch", !1, !1),
              this.O9i.PlaySequencePurely("ContrastSwitch", !1, !1),
              (this.o7i = !0))
            : (this.o7i &&
                (this.O9i.StopSequenceByKey("ContrastSwitch", !1, !1),
                this.O9i.PlaySequencePurely("ContrastSwitch", !1, !0),
                (this.H8i = !1)),
              (this.o7i = !1))
          : (this.H8i = !1),
          this.GetItem(14).SetUIActive(this.H8i && 0 < i),
          this.C7i();
      }),
      (this.sGe = () => {
        var i = new VisionMediumItemGrid_1.VisionMediumItemGrid();
        return (
          i.SetClickToggleEvent(this.g7i),
          i.SetOnRefreshEvent(this.f7i),
          i.SetOnPointDownCallBack(this.p7i),
          i.SetOnPointUpCallBack(this.v7i),
          i
        );
      }),
      (this.f7i = (i) => {
        i.CheckSelectedState(this.B9i) &&
          (this.LoopScrollView.DeselectCurrentGridProxy(),
          this.LoopScrollView.SelectGridProxy(i.GridIndex, !1));
      }),
      (this.p7i = (i, t) => {
        this.M7i(),
          (this.rut = 0),
          (this.F9i = 0),
          (this.V9i = !0),
          (this.Q9i = i);
        i =
          LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
            0,
          ).GetWorldPointInPlane();
        (this.j9i = i.X),
          (this.W9i = i.Z),
          (this.H9i = !1),
          this.VisionEquipmentDragItem.UpdateItem(t),
          this.$9i.Refresh(t, !1),
          this.E7i(!0),
          this.S7i(0),
          (this.k9i = -1),
          this.GetSprite(19).SetFillAmount(0),
          (this.D9i = TickSystem_1.TickSystem.Add(
            this.y7i,
            "RoleVisionAnimation",
            0,
            !0,
          ).Id);
      }),
      (this.v7i = (i, t) => {
        this.M7i(),
          this.GetLoopScrollViewComponent(6).SetEnable(!0),
          this.$9i?.ClearStayingItem(),
          this.VisionEquipmentDragItem.SetActive(!1),
          this.E7i(!1),
          (this.k9i = INVALIDINDEX),
          i || t || this.I7i();
      }),
      (this.y7i = () => {
        var i, t;
        (this.rut += Time_1.Time.DeltaTime),
          this.H9i && this.$9i.TickCheckDrag(),
          this.V9i &&
            (this.rut > this.Y9i &&
              0 === this.J9i &&
              (this.T7i(), this.S7i(1), (this.F9i = 0)),
            0 < this.J9i && (this.F9i += Time_1.Time.DeltaTime),
            this.Q9i &&
              ((t =
                LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
                  0,
                ).GetWorldPointInPlane()),
              (i = this.j9i - t.X),
              (t = this.W9i - t.Z),
              Math.abs(i) + Math.abs(t) > this.z9i) &&
              (this.E7i(!1), (this.V9i = !1)),
            this.F9i > this.xut
              ? (this.GetLoopScrollViewComponent(6).SetEnable(!1),
                this.E7i(!1),
                (this.V9i = !1),
                (this.H9i = !0),
                this.VisionEquipmentDragItem.SetActive(!0),
                this.$9i.StartDragState(),
                this.$9i.SetItemToPointerPosition(),
                this.OnPointerDownCallBack(this.$9i.GetCurrentIndex()),
                this.$9i.SetDragItemHierarchyMax(),
                AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag"),
                (this.U9i = TickSystem_1.TickSystem.Add(
                  this.L7i,
                  "RoleVisionAnimation",
                  0,
                  !0,
                ).Id))
              : this.GetSprite(19).SetFillAmount(this.F9i / this.xut));
      }),
      (this.L7i = () => {
        var i =
            LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
              0,
            ),
          t =
            LguiEventSystemManager_1.LguiEventSystemManager.IsNowTriggerPressed(
              0,
            ),
          s = this.$9i.GetStayingItem();
        i ||
          t ||
          (0 === s?.length
            ? (this.v7i(void 0, void 0),
              AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop"))
            : (this.OnDragEndCallBack(this.$9i, this.$9i.GetStayingItem()),
              this.v7i(void 0, void 0)),
          this.D7i());
      }),
      (this.g7i = (i, t) => {
        this.R7i(i),
          this.LoopScrollView.DeselectCurrentGridProxy(),
          this.LoopScrollView.SelectGridProxy(t),
          this.U7i(i),
          (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectData =
            this.A7i(t)),
          (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId =
            i.GetUniqueId()),
          this._7i(this.B9i.GetUniqueId()),
          this.P7i();
      }),
      (this.TryEquip = (i, t, s) => {
        var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.dFe,
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
            if (-1 === t) return;
            this.x7i(t);
            break;
          case 1:
          case 2:
            this.w7i(i, t, s);
        }
      }),
      (this.OnClickFailVision = (i) => {
        this.I7i();
      }),
      (this.OnClickVisionAndRefreshVisionView = (i) => {
        this.GetItem(15).SetRaycastTarget(!1), this.B7i(i), this.b7i(!1, !1);
        var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.dFe,
        );
        0 ===
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
            t.GetRoleId(),
            i,
          ) && this.LoopScrollView.ResetGridController(),
          this.q7i(),
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_click");
      }),
      (this.Og = (i) => {
        this.G7i(), this.q7i(), this.P7i(), this.N7i(i?.GetUniqueId() ?? 0);
      }),
      (this.O7i = () => {
        this.LoopScrollView.DeselectCurrentGridProxy(),
          0 < this.w9i.length
            ? (this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!0),
              this.LoopScrollView.RefreshAllGridProxies())
            : this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!1);
      }),
      (this.k7i = () => {
        this.LoopScrollView.RefreshAllGridProxies();
      }),
      (this.F7i = () => {
        this.LoopScrollView.DeselectCurrentGridProxy(),
          0 < this.w9i.length
            ? (this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!0),
              this.LoopScrollView.ReloadData(this.w9i))
            : this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(!1);
      }),
      (this.G7i = () => {
        var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            this.dFe,
          ),
          t =
            ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
              i,
            ),
          s = this.x9i.length;
        for (let i = 0; i < s; i++) {
          var e = t.length > i ? t[i] : void 0;
          this.x9i[i].UpdateItem(e), this.X9i[i].Refresh(e, !1);
        }
        this.V7i();
      }),
      (this.OnBeginDrag = (i) => {
        var t = this.X9i.length;
        for (let i = 0; i < t; i++) this.X9i[i].StartDragState();
        for (let i = 0; i < t; i++)
          ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
            this.X9i[i].GetCurrentIndex(),
          ) && this.X9i[i].SetDragItemHierarchyMax();
        this.X9i[i].SetItemToPointerPosition(),
          (this.k9i = i),
          AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
      }),
      (this.OnPointerDownCallBack = (i) => {
        this.GetItem(15).SetRaycastTarget(!0);
        var t = this.X9i.length;
        for (let i = 0; i < t; i++) this.X9i[i].StartClickCheckTimer();
      }),
      (this.H7i = () => {
        this.Uqe += Time_1.Time.DeltaTime;
        let i = this.Uqe / ANIMATIONTIME;
        1 <= i && (i = 1),
          this.X9i[this.k9i].TickDoCeaseAnimation(i),
          1 <= i && (this.j7i(this.k9i), this.W7i());
      }),
      (this.OnEquipError = () => {
        this.I7i();
      }),
      (this.OnPhantomEquip = () => {
        this.C7i();
      }),
      (this.OnVisionFilterMonster = () => {
        this.K7i();
      }),
      (this.Q7i = (i, t) => {
        this.W7i(),
          (this.Uqe = 0),
          (this.k9i = INVALIDINDEX),
          this.X9i[i].SetActive(!1),
          this.X9i[i].ResetPosition(),
          this.x9i[i].ResetPosition(),
          this.GetItem(15).SetRaycastTarget(!1);
        const s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.dFe,
        );
        this.c7i(t, i, () => {
          ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
            t.GetUniqueId(),
            s.GetRoleId(),
            i,
          );
        });
      }),
      (this.OnDragEndCallBack = (i, t) => {
        if (t.length < 1)
          this.I7i(),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop");
        else {
          const s = VisionCommonDragItem_1.VisionCommonDragItem.GetOverlapIndex(
            i,
            t,
          );
          if (-1 === s) this.I7i();
          else {
            -1 === i.GetCurrentIndex() && this.I7i();
            const e = i.GetCurrentIndex(),
              h = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
                this.dFe,
              ),
              r = -1 !== e;
            this.c7i(i.GetCurrentData(), s, () => {
              this.X7i(e, !0),
                this.X7i(s, !0),
                this.$7i(e, !0),
                this.$7i(s, !0),
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
      (this.Y7i = (i, t, s) => {
        (this.k9i = INVALIDINDEX),
          0 <= i &&
            (this.X9i[i].SetActive(!0), this.x9i[i].SetAniLightState(!1)),
          s && -1 !== i
            ? (UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !0),
              this.J7i(),
              (this.Uqe = 0),
              (s = this.X9i[t].GetAnimationTargetPos()),
              this.X9i[i].SetDragComponentToTargetPositionParam(s),
              (s = this.X9i[i].GetAnimationTargetPos()),
              this.X9i[t].SetDragComponentToTargetPositionParam(s),
              (this.A9i = i),
              (this.P9i = t),
              this.X7i(this.A9i, !0),
              this.X7i(this.P9i, !0),
              this.$7i(this.A9i, !0),
              this.$7i(this.P9i, !0),
              (this.L9i = TickSystem_1.TickSystem.Add(
                this.J_,
                "RoleVisionAnimation",
                0,
                !0,
              ).Id))
            : (this.X7i(i, !1),
              this.X7i(t, !1),
              this.$7i(i, !1),
              this.$7i(t, !1),
              this.z7i(),
              this.B7i(t),
              this.b7i(!0, !1, !1),
              this.x9i[t].GetCurrentData() && this.Z7i(t),
              0 <= i
                ? AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_off")
                : AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"));
      }),
      (this.J_ = () => {
        this.Uqe += Time_1.Time.DeltaTime;
        let i = this.Uqe / ANIMATIONTIME;
        1 <= i && (i = 1),
          this.X9i[this.A9i].TickDoCeaseAnimation(i),
          this.X9i[this.P9i].TickDoCeaseAnimation(i),
          1 <= i &&
            (this.eHi(),
            this.J7i(),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"));
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.tHi = void 0),
      (this.Qvt = (i, t, s) => {
        var e = i;
        const h = new Array();
        e.forEach((i) => {
          h.push(
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              i.Id,
            ),
          );
        }),
          (this.w9i = h),
          this.F7i();
        i = 0 < i?.length;
        this.GetLoopScrollViewComponent(6).RootUIComp.SetUIActive(i),
          this.iHi(e, t, s);
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
      [32, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [21, this.h7i],
        [27, this.Cpt],
        [29, this.d7i],
        [32, this.toa],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.F7i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemLock,
        this.k7i,
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
        this.Y7i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.VisionFilterMonster,
        this.OnVisionFilterMonster,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
        this.l7i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.VisionSkinViewClose,
        this.Hqn,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.F7i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemLock,
        this.k7i,
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
        this.Y7i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.VisionFilterMonster,
        this.OnVisionFilterMonster,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayCameraAnimationFinish,
        this.l7i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.VisionSkinViewClose,
        this.Hqn,
      );
  }
  OnStart() {
    (this.n7i = !1),
      this.GetItem(15).SetUIActive(!0),
      this.GetItem(15).SetRaycastTarget(!1),
      this.GetItem(9).SetUIActive(!0),
      (this.vpt = new FilterEntrance_1.FilterEntrance(
        this.GetItem(12),
        this.Qvt,
      )),
      (this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(13), this.Qvt)),
      (this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(6),
        this.GetItem(8).GetOwner(),
        this.sGe,
      )),
      this.oHi(),
      (this.O9i = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.O9i.BindSequenceCloseEvent(this.JTt),
      this.GetItem(14).SetUIActive(!1),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7))),
      this.lqe.SetCloseCallBack(this.Awe),
      (this.xut =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerPressTime()),
      (this.z9i =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerMoveDistance()),
      (this.Y9i =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionBeforeScrollerLongPressTime()),
      this.rHi(),
      this.nHi(),
      this.E7i(!1),
      this.GetVerticalLayout(17).SetEnable(!1),
      this.G9i.RefreshViewByCompareState(!0),
      this.sHi(),
      this.aHi(),
      (this.Ife = !0);
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1)
      ? 0
      : 1;
    this.GetExtendToggle(21)?.SetToggleState(i),
      this.O9i.PlaySequencePurely("ContrastSwitch", !1, !0),
      (this.o7i = !1),
      this.GetButton(32).RootUIComp.SetUIActive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10024001),
      );
  }
  OnHandleLoadScene() {
    this._7i(this.eoa),
      PhantomBattleController_1.PhantomBattleController.SetMeshTransform(
        this.tHi,
      );
  }
  async OnBeforeStartAsync() {
    (this.dFe = this.OpenParam),
      (this.q9i = new VisionDetailComponent_1.VisionDetailComponent(
        this.GetItem(10),
      )),
      await this.q9i.Init(),
      (this.G9i = new VisionDetailComponent_1.VisionDetailComponent(
        this.GetItem(11),
      )),
      await this.G9i.Init(),
      await this.hHi(),
      (this.h8e = new CommonDropDown_1.CommonDropDown(
        this.GetItem(22),
        this.m8e,
        this.c8e,
      )),
      await this.h8e.Init();
  }
  oHi() {
    this.q9i.GetDetailUnderComponent().SetRightButtonClick(this.m7i),
      this.q9i.GetDetailUnderComponent().SetLeftButtonClick(this.u7i),
      this.q9i.SetActive(!1),
      this.G9i.SetButtonPanelShowState(!0),
      this.G9i.SetActive(!0);
  }
  async hHi() {
    for (let i = 0; i <= 4; i++)
      this.x9i.push(
        new RoleVisionDragHeadItem_1.RoleVisionDragHeadItem(
          this.GetItem(i),
          0 + i,
          this.dFe,
        ),
      );
    (this.VisionEquipmentDragItem =
      new VisionEquipmentDragItem_1.VisionEquipmentDragItem(this.GetItem(16))),
      await this.VisionEquipmentDragItem.Init(),
      this.VisionEquipmentDragItem.SetActive(!1),
      (this.$9i = new VisionCommonDragItem_1.VisionCommonDragItem(
        this.VisionEquipmentDragItem.GetRootItem(),
        this.VisionEquipmentDragItem.GetDragComponent(),
        this.GetItem(15),
        -1,
      )),
      this.GetItem(16).SetUIActive(!1),
      await Promise.all([...this.x9i.map(async (i) => i.Init())]),
      this.x9i.forEach((i) => {
        var t = new VisionCommonDragItem_1.VisionCommonDragItem(
          i.GetRootItem(),
          i.GetDragComponent(),
          this.GetItem(15),
          i.GetCurrentIndex(),
        );
        this.X9i.push(t),
          t.SetOnDragAnimationStartFunction(i.OnDragItemDragBegin),
          t.SetOnDragAnimationEndFunction(i.OnDragItemDragEnd),
          t.SetOnOverlayCallBack(i.OnOverlay),
          t.SetOnUnOverlayCallBack(i.OnUnOverlay),
          t.SetMoveToScrollViewCallBack(i.OnScrollToScrollView),
          t.SetRemoveFromScrollViewCallBack(i.OnRemoveFromScrollView),
          i.SetShowType(1);
      }),
      this.X9i.forEach((i) => {
        i.SetOnClickCallBack(this.OnClickVisionAndRefreshVisionView),
          i.SetOnClickFailCallBack(this.OnClickFailVision),
          i.SetDragCheckItem(this.X9i),
          i.SetDragSuccessCallBack(this.OnDragEndCallBack),
          i.SetPointerDownCallBack(this.OnPointerDownCallBack),
          i.SetOnBeginDragCall(this.OnBeginDrag),
          i.SetEndDragWhenOnScrollViewCallBack(this.Q7i);
      }),
      this.$9i.SetDragCheckItem(this.X9i);
  }
  aHi() {
    var i =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray();
    this.i7i.push(0),
      i.forEach((i) => {
        this.i7i.push(i.Id);
      }),
      this.h8e.SetOnSelectCall(this.C8e),
      this.h8e.SetShowType(0),
      this.h8e.InitScroll(this.i7i, this.g8e, this.Z9i);
  }
  sHi() {
    var t = new Array();
    for (let i = 23; i <= 26; i++) {
      var s = this.GetItem(i);
      t.push(s);
    }
    var i = this.GetItem(20);
    (this.e7i = new StaticTabComponent_1.StaticTabComponent(
      this.fqe,
      this.pqe,
    )),
      this.e7i.Init(t);
    var e = i.GetAttachUIChildren().Num();
    for (let t = 0; t < e; t++) {
      let i = t;
      1 < t && (i += 1), this.t7i.push(i);
    }
    this.e7i.SelectToggleByIndex(0, !0);
  }
  rHi() {
    this.b9i =
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex;
    var i =
        ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId,
      t =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i);
    0 < i && t ? this.R7i(t) : this.R7i(this.A7i(this.b9i));
  }
  lHi() {
    0 < this.r7i &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        "IdentifyTab",
        this.GetItem(28),
        this.r7i,
      ),
      (this.r7i = 0));
  }
  _Hi() {
    this.lHi(),
      this.B9i &&
        ((this.r7i = this.B9i.GetUniqueId()),
        RedDotController_1.RedDotController.BindRedDot(
          "IdentifyTab",
          this.GetItem(28),
          void 0,
          this.r7i,
        ));
  }
  nHi() {
    this.Og(this.B9i), this._7i(this.B9i?.GetUniqueId() ?? 0), this.uHi();
  }
  S7i(i) {
    this.GetItem(18).SetAlpha(i), (this.J9i = i);
  }
  E7i(i) {
    this.GetItem(18).SetUIActive(i);
  }
  c7i(i, t, s) {
    this.cHi(i, t) ? this.TryEquip(i, t, s) : this.I7i();
  }
  cHi(i, t) {
    var s =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
          i.GetUniqueId(),
        ),
      e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe),
      h = ModelManager_1.ModelManager.PhantomBattleModel,
      t = h.GetRoleIndexPhantomId(e.GetRoleId(), t),
      t = h.GetPhantomBattleData(t) ? h.GetPhantomBattleData(t).GetCost() : 0,
      r = h.GetRoleCurrentPhantomCost(e.GetRoleId());
    if (s && s !== e.GetRoleId()) {
      var h = h.GetRoleCurrentPhantomCost(s) - i.GetCost() + t,
        n = r - t + i.GetCost();
      if (h > this.mHi() || n > this.mHi()) return this.dHi(), !1;
    } else {
      if (s && s === e.GetRoleId()) return !0;
      if (r - t + i.GetCost() > this.mHi()) return this.dHi(), !1;
    }
    return !0;
  }
  dHi() {
    var i;
    this.mHi() <
    ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionReachableCostMax()
      ? ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(157)).FunctionMap.set(
          1,
          () => {
            this.CHi(),
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
  q7i() {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    let t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(
        i.GetRoleId(),
      );
    var s =
        ModelManager_1.ModelManager.PhantomBattleModel?.GetRoleIndexPhantomId(
          i.GetRoleId(),
          this.b9i,
        ),
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
        i.GetRoleId(),
      ).GetIncrIdList(),
      e = this.B9i ? this.B9i.GetUniqueId() : 0,
      i = i.includes(e);
    s &&
      0 < s &&
      !i &&
      ((e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(s)),
      (t -= e.GetCost())),
      i || (t += this.B9i ? this.B9i.GetCost() : 0);
    let h = "",
      r = "";
    t > this.mHi()
      ? ((h =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorAlert()),
        (r =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull()),
        this.s7i || (this.O9i.PlaySequencePurely("CostBlink"), (this.s7i = !0)))
      : ((r =
          t === this.mHi()
            ? ((h =
                ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull()),
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorFull())
            : ((h =
                ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorBase()),
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionCostColorBase())),
        this.O9i.StopSequenceByKey("CostBlink", !1, !0),
        (this.s7i = !1)),
      this.GetText(5).SetText(
        StringUtils_1.StringUtils.Format("/{0}", this.mHi().toString()),
      ),
      this.GetText(30).SetText(
        StringUtils_1.StringUtils.Format("{0}", t.toString()),
      ),
      this.GetText(30).SetColor(UE.Color.FromHex(h)),
      this.GetText(5).SetColor(UE.Color.FromHex(r));
  }
  C7i() {
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
      this.dFe,
    );
    var t =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
          i.GetRoleId(),
          this.b9i,
        ),
      t =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    if (t) this.G9i.Update(t, this.dFe, !0);
    else {
      const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        this.dFe,
      );
      0 ===
        ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(
          i.GetRoleId(),
          this.b9i,
        ) &&
        this.o7i &&
        (this.O9i.PlaySequencePurely("ContrastSwitch", !1, !0),
        (this.o7i = !1),
        (this.H8i = !1));
    }
  }
  R7i(i) {
    (this.B9i = i), this.gHi(), this.q7i(), this._Hi();
  }
  M7i() {
    this.D9i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.D9i),
      (this.D9i = TickSystem_1.TickSystem.InvalidId));
  }
  T7i() {
    var i =
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
          0,
        ),
      i = Vector2D_1.Vector2D.Create(i.X, i.Y),
      t =
        (i.FromUeVector2D(
          UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
            i.ToUeVector2D(!0),
          ),
        ),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() *
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir()),
      s =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() *
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir(),
      t = i.X + t,
      i = i.Y + s;
    this.GetItem(18).SetLGUISpaceAbsolutePosition(new UE.Vector(t, i, 0));
  }
  fHi() {
    this.K9i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.K9i),
      (this.K9i = TickSystem_1.TickSystem.InvalidId));
  }
  D7i() {
    this.U9i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.U9i),
      (this.U9i = TickSystem_1.TickSystem.InvalidId));
  }
  x7i(i) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
      0,
      t.GetRoleId(),
      i,
      i,
    );
  }
  w7i(i, t, s) {
    var i =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(
          i.GetUniqueId(),
        ),
      e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
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
  B7i(i) {
    this.b9i !== i &&
      ((this.b9i = i),
      (ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex =
        i));
  }
  b7i(i = !1, t = !0, s = !0) {
    this.pHi(t, s), this.vHi(i);
  }
  pHi(i = !0, t = !0) {
    var s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe),
      s =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
          s.GetRoleId(),
          this.b9i,
        );
    0 !== s
      ? (this.N7i(s, t), (s = this.A7i(this.b9i)), this.R7i(s))
      : i &&
        (this.R7i(this.A7i(this.b9i)),
        this.LoopScrollView.ResetGridController(),
        this.N7i(this.B9i?.GetUniqueId() ?? 0, t));
  }
  vHi(i = !1) {
    this.U7i(this.B9i),
      this.V7i(),
      this.C7i(),
      this._7i(this.B9i?.GetUniqueId() ?? 0, i),
      this.P7i(),
      this.uHi(),
      this.I7i();
  }
  MHi() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++) this.x9i[i].SetToggleState(0, !1, !0);
  }
  uHi() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++)
      this.x9i[i].SetToggleState(this.b9i === i ? 1 : 0);
  }
  A7i(i) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe),
      t =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
          t.GetRoleId(),
          i,
        );
    let s =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    return (s = s || (0 < this.w9i.length ? this.w9i[0] : void 0));
  }
  U7i(i, t = 0) {
    i
      ? (this.q9i.SetActive(!0), this.q9i.Update(i, this.dFe, !1))
      : this.q9i.SetActive(!1);
  }
  N7i(i, t = !0) {
    this.LoopScrollView.DeselectCurrentGridProxy();
    let s = !1,
      e = 0;
    for (const h of this.w9i) {
      if (h.GetUniqueId() === i) {
        s = !0;
        break;
      }
      e++;
    }
    s || (e = 0),
      0 < this.w9i.length &&
        s &&
        (t && this.LoopScrollView.ScrollToGridIndex(e, !1),
        this.LoopScrollView.SelectGridProxy(e));
  }
  OnBeforeShow() {
    var i;
    0 < this.N9i &&
      !UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() &&
      ((i = this.N9i), (this.N9i = 0), this._7i(i, !1)),
      ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex(),
      this.U7i(this.B9i),
      this.C7i(),
      ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpTag()
        ? (this.a7i(),
          ModelManager_1.ModelManager.PhantomBattleModel.ClearVisionLevelUp())
        : 0 <
            ModelManager_1.ModelManager.PhantomBattleModel
              .CurrentSelectFetterGroupId
          ? ((this.Z9i = this.i7i.indexOf(
              ModelManager_1.ModelManager.PhantomBattleModel
                .CurrentSelectFetterGroupId,
            )),
            (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId = 0),
            this.h8e.SetSelectedIndex(this.Z9i))
          : this.a7i(),
      this.K7i(),
      this.MHi(),
      this.uHi(),
      this.P7i(),
      this.G7i();
  }
  K7i() {
    ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter &&
      (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter =
        void 0);
  }
  a7i() {
    var i = this.i7i[this.Z9i],
      i =
        ModelManager_1.ModelManager.PhantomBattleModel.GetVisionSortUseDataList(
          i,
          this.O5t,
        );
    this.vpt.UpdateData(this.Z6i, i, this.dFe),
      this.Mpt.UpdateData(this.Z6i, i, this.dFe);
  }
  OnAfterShow() {
    this.X9i.forEach((i) => {
      i.SetScrollViewItem(this.GetLoopScrollViewComponent(6).RootUIComp);
    });
  }
  OnAfterHide() {
    this.I7i(),
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !1,
      ),
      UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
  }
  _7i(i, t = !1) {
    var s;
    this.n7i &&
      (s =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          i,
        )) &&
      this.N9i !== s.GetUniqueId() &&
      (this.SHi(),
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SetMeshShow(
        s.GetConfigId(!0),
        () => {
          this.EHi(t);
        },
        this.tHi,
      ),
      (this.N9i = i));
  }
  EHi(s = !1) {
    if (this.tHi) {
      var e = this.tHi.Model;
      let i = void 0,
        t = void 0;
      (t = s
        ? ((i = "VisionChangeEffect"), "VisionChangeController")
        : ((i = "VisionLevelUpEffect"), "VisionStepupController")),
        UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(e, i),
        UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e, t);
    }
  }
  gHi() {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe);
    let t = "";
    switch (
      this.B9i
        ? ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipState(
            i.GetRoleId(),
            this.b9i,
            this.B9i.GetUniqueId(),
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
    this.q9i.SetUnderLeftButtonText(t);
  }
  V7i() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++)
      i === this.b9i ? this.x9i[i].SetSelected() : this.x9i[i].SetUnSelected();
  }
  async j7i(i) {
    (this.P9i = i),
      this.X7i(this.A9i, !1),
      this.X7i(this.P9i, !1),
      await this.yHi(i),
      this.$7i(this.A9i, !1),
      this.$7i(this.P9i, !1),
      this.I7i(!1),
      this.T9i.SetResult(!0);
  }
  async yHi(i) {
    this.X9i[i].SetToTargetParentAndSetStretch(
      this.x9i[this.P9i].GetRootItem(),
    ),
      this.X9i[this.P9i].SetToTargetParentAndSetStretch(
        this.x9i[i].GetRootItem(),
      ),
      this.X9i[i].DoCeaseSequence(),
      this.P9i !== i &&
        this.X9i[this.P9i].GetCurrentData() &&
        this.X9i[this.P9i].DoCeaseSequence(),
      await this.X9i[i].GetCeaseAnimationPromise()?.Promise;
  }
  W7i() {
    this.R9i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.R9i),
      (this.R9i = TickSystem_1.TickSystem.InvalidId));
  }
  async I7i(i = !0) {
    i &&
      this.k9i !== INVALIDINDEX &&
      -1 !== this.k9i &&
      (this.W7i(),
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !0,
      ),
      (this.Uqe = 0),
      (this.T9i = new CustomPromise_1.CustomPromise()),
      (i = this.X9i[this.k9i].GetAnimationTargetPos()),
      this.X9i[this.k9i].SetDragComponentToTargetPositionParam(i),
      (this.R9i = TickSystem_1.TickSystem.Add(
        this.H7i,
        "OnFailAnimationTick",
        0,
        !0,
      ).Id),
      this.X7i(this.k9i, !0),
      await this.T9i.Promise,
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !1,
      ),
      (this.k9i = INVALIDINDEX)),
      this.X9i.forEach((i) => {
        i.ResetPosition(), i.SetActive(!0);
      }),
      this.x9i.forEach((i) => {
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
  X7i(i, t) {
    0 <= i && this.X9i[i].SetMovingState(t);
  }
  $7i(i, t) {
    0 <= i && this.x9i[i].SetAnimationState(t);
  }
  async Z7i(i) {
    return (
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !0,
      ),
      this.X9i[i].DoCeaseSequence(),
      await this.X9i[i].GetCeaseAnimationPromise()?.Promise,
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !1,
      ),
      Promise.resolve()
    );
  }
  async eHi() {
    this.x9i[this.P9i].GetRootItem().SetAsFirstHierarchy(),
      this.X9i[this.A9i].SetToNormalParent(),
      this.X7i(this.A9i, !1),
      this.X7i(this.P9i, !1),
      await this.yHi(this.A9i),
      this.$7i(this.A9i, !1),
      this.$7i(this.P9i, !1),
      await this.I7i(!1),
      this.z7i(),
      this.B7i(this.P9i),
      this.b7i(!0, !0, !1),
      UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
  }
  z7i() {
    this.O7i(), this.G7i(), this.C7i(), this.q7i(), this.gHi(), this.I7i();
  }
  J7i() {
    this.L9i !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.L9i),
      (this.L9i = TickSystem_1.TickSystem.InvalidId));
  }
  mHi() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
  }
  SHi() {
    UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() ||
      UiSceneManager_1.UiSceneManager.InitVisionSkeletalHandle(),
      (this.tHi = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle());
  }
  CHi() {
    UiSceneManager_1.UiSceneManager.DestroyVisionSkeletalHandle(),
      (this.tHi = void 0),
      (this.N9i = 0);
  }
  OnBeforePlayCloseSequence() {
    this.CHi();
  }
  OnBeforeDestroy() {
    this.CHi(),
      (this.tHi = void 0),
      this.fHi(),
      this.lHi(),
      this.LoopScrollView.ClearGridProxies(),
      this.M7i(),
      this.J7i(),
      this.W7i(),
      this.e7i.Destroy();
  }
  iHi(s, i, e) {
    if (0 < s?.length) {
      let t = 0;
      if (1 !== e || i) {
        var h = s.length;
        for (let i = 0; i < h; i++)
          if (s[i].Id === this.B9i?.GetUniqueId()) {
            t = this.B9i?.GetUniqueId();
            break;
          }
        0 === t && (t = s[0].Id);
      } else t = s[0].Id;
      e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
      this.R7i(e),
        this.N7i(t),
        this.U7i(this.B9i),
        this.C7i(),
        this._7i(t),
        this.P7i(),
        this.uHi();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t = this.w9i;
    if (0 !== t.length)
      if (2 !== i.length)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Guide", 17, "声骸聚焦引导extraParam配置错误");
      else {
        if ("txt" === i[0]) {
          var s = this.q9i?.GetTxtItemByIndex(Number(i[1]));
          if (s) return [s, s];
        }
        if ("item" === i[0]) {
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
  P7i() {
    var i = this.B9i?.GetMonsterId();
    (i =
      i &&
      ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
        i,
      ))
      ? ((i = 1 < i.length),
        this.GetButton(27).RootUIComp.SetUIActive(i),
        (i =
          ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(
            this.B9i.GetConfigId(),
          )),
        this.GetItem(31).SetUIActive(i))
      : this.GetButton(27).RootUIComp.SetUIActive(!1);
  }
}
exports.VisionEquipmentView = VisionEquipmentView;
//# sourceMappingURL=VisionEquipmentView.js.map
