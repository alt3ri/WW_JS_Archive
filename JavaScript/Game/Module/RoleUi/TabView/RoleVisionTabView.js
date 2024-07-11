"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionTabView = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const RoleController_1 = require("../RoleController");
const RoleVisionDragHeadItem_1 = require("./VisionSubView/RoleVisionDragHeadItem");
const RoleVisionInfoPanel_1 = require("./VisionSubView/RoleVisionInfoPanel");
const VisionCommonDragItem_1 = require("./VisionSubView/VisionCommonDragItem");
const INVALIDINDEX = 999;
class RoleVisionTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.L8i = void 0),
      (this.udo = !1),
      (this.cdo = !1),
      (this.mdo = !1),
      (this.P8i = -1),
      (this.x8i = -1),
      (this.ddo = 0),
      (this.Uqe = 0),
      (this.F8i = INVALIDINDEX),
      (this.Cdo = void 0),
      (this.plo = void 0),
      (this.w8i = new Array()),
      (this.$8i = new Array()),
      (this.q8i = 0),
      (this.gdo = !1),
      (this.fdo = () => {
        this.pdo = !1;
      }),
      (this.vdo = () => {
        this.$8t();
      }),
      (this.pdo = !1),
      (this.OnChangeRole = (i) => {
        this.Og(),
          (this.pdo = !0),
          this.PlayMontageStart(!0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
            i,
          );
      }),
      (this.RefreshPhantom = () => {
        const t = this.plo?.GetCurSelectRoleData();
        const e =
          ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
            t,
          );
        const s = this.w8i.length;
        for (let i = 0; i < s; i++) {
          const h = e.length > i ? e[i] : void 0;
          this.w8i[i].UpdateItem(h), this.$8i[i].Refresh(h, t.IsTrialRole());
        }
        this.Tqt();
      }),
      (this.OnEquipError = () => {
        this.T9i();
      }),
      (this.OnClickFailVision = (i) => {
        this.Mdo() && this.T9i();
      }),
      (this.OnClickVision = (i) => {
        let t;
        this.Mdo() &&
          (this.T9i(),
          (t = this.plo.GetCurSelectRoleData()).IsTrialRole()
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "RolePhantomTrialTips",
              )
            : ((this.q8i = i),
              (ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex =
                i),
              (i =
                ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
                  t.GetRoleId(),
                  i,
                )),
              (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId =
                i),
              this.Sdo(!0),
              this.c7i(),
              this.T9i(),
              AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_click"),
              UiManager_1.UiManager.OpenView(
                "VisionEquipmentView",
                t.GetRoleId(),
              ),
              this.UiViewSequence.PlaySequencePurely("HideView")));
      }),
      (this.OnPointerDownCallBack = (i) => {
        if (this.Mdo()) {
          this.GetItem(7).SetRaycastTarget(!0);
          const t = this.$8i.length;
          for (let i = 0; i < t; i++) this.$8i[i].StartClickCheckTimer();
          this.F8i = INVALIDINDEX;
        }
      }),
      (this.OnBeginDrag = (i) => {
        this.F8i = i;
        const t = this.plo.GetCurSelectRoleData().IsTrialRole();
        if (!t) {
          this.$8i.forEach((i) => {
            i.StartDragState();
          });
          const e = this.$8i.length;
          for (let i = 0; i < e; i++)
            ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
              this.$8i[i].GetCurrentIndex(),
            ) && this.$8i[i].SetDragItemHierarchyMax();
          this.$8i[i].SetItemToPointerPosition(),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
        }
      }),
      (this.OnDragEndCallBack = (i, t) => {
        let e, s;
        t.length >= 1
          ? ((e = i.GetCurrentIndex()),
            (i = VisionCommonDragItem_1.VisionCommonDragItem.GetOverlapIndex(
              i,
              t,
            )),
            (t = this.plo.GetCurSelectRoleData()),
            (s =
              ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
                t.GetRoleId(),
              ).GetIncrIdList()),
            this.$9i(e, !0),
            this.$9i(i, !0),
            this.Y9i(e, !0),
            this.Y9i(i, !0),
            ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
              s[e],
              t.GetRoleId(),
              i,
              e,
              !0,
            ))
          : (this.T9i(),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop"));
      }),
      (this.J9i = (i, t, e) => {
        e
          ? (UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !0),
            (this.udo = !1),
            (this.Uqe = 0),
            (e = this.$8i[t].GetAnimationTargetPos()),
            this.$8i[i].SetDragComponentToTargetPositionParam(e),
            (e = this.$8i[i].GetAnimationTargetPos()),
            this.$8i[t].SetDragComponentToTargetPositionParam(e),
            (this.P8i = i),
            (this.x8i = t),
            this.$9i(this.P8i, !0),
            this.$9i(this.x8i, !0),
            this.Y9i(this.P8i, !0),
            this.Y9i(this.x8i, !0),
            (this.udo = !0),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"))
          : this.RefreshPhantom();
      }),
      (this.Sdo = (i) => {
        i &&
          (UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor(),
          (this.gdo = !0));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [[6, this.vdo]]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.OnChangeRole,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
        this.J9i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomPersonalSkillActive,
        this.RefreshPhantom,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomEquipError,
        this.OnEquipError,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetRoleFlag,
        this.fdo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.OnChangeRole,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
        this.J9i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomPersonalSkillActive,
        this.RefreshPhantom,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomEquipError,
        this.OnEquipError,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetRoleFlag,
        this.fdo,
      );
  }
  async $8t() {
    await ControllerHolder_1.ControllerHolder.PhantomBattleController.OpenPhantomBattleFetterView(),
      this.Sdo(!0);
  }
  async OnBeforeStartAsync() {
    (this.plo = this.ExtraParams),
      void 0 === this.plo
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleVisionTabView",
          ])
        : ((this.Cdo = new RoleVisionInfoPanel_1.RoleVisionInfoPanel(
            this.GetItem(5),
          )),
          await this.Cdo.Init(),
          await this.Edo());
  }
  OnStart() {
    this.GetItem(7).SetUIActive(!0),
      this.GetItem(7).SetRaycastTarget(!1),
      this.Cdo.SetActive(!0),
      this.Cdo.SetConfirmButtonCall(() => {
        this.OnClickVision(this.q8i);
      }),
      this.GetButton(6).RootUIComp.SetUIActive(!0),
      (this.ddo =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurveTime());
  }
  async Edo() {
    for (let i = 0; i <= 4; i++) {
      const t = this.plo.GetCurSelectRoleId();
      this.w8i.push(
        new RoleVisionDragHeadItem_1.RoleVisionDragHeadItem(
          this.GetItem(i),
          0 + i,
          t,
          !0,
        ),
      );
    }
    await Promise.all([...this.w8i.map(async (i) => i.Init())]),
      this.w8i.forEach((i) => {
        const t = new VisionCommonDragItem_1.VisionCommonDragItem(
          i.GetRootItem(),
          i.GetDragComponent(),
          this.GetItem(7),
          i.GetCurrentIndex(),
        );
        this.$8i.push(t),
          t.SetOnDragAnimationStartFunction(i.OnDragItemDragBegin),
          t.SetOnDragAnimationEndFunction(i.OnDragItemDragEnd),
          t.SetOnOverlayCallBack(i.OnOverlay),
          t.SetOnUnOverlayCallBack(i.OnUnOverlay);
      }),
      this.$8i.forEach((i) => {
        i.SetOnClickCallBack(this.OnClickVision),
          i.SetOnClickFailCallBack(this.OnClickFailVision),
          i.SetDragCheckItem(this.$8i),
          i.SetDragSuccessCallBack(this.OnDragEndCallBack),
          i.SetPointerDownCallBack(this.OnPointerDownCallBack),
          i.SetOnBeginDragCall(this.OnBeginDrag);
      });
  }
  PlayMontageStart(i = !1) {
    RoleController_1.RoleController.PlayRoleMontage(8, i);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex(),
      this.pdo
        ? (UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor(),
          this.PlayMontageStart(!0),
          (this.pdo = !1))
        : this.gdo
          ? (UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor(),
            this.PlayMontageStart(!0),
            (this.gdo = !1))
          : this.PlayMontageStart(),
      (this.q8i = 0),
      this.Og(),
      this.ydo(),
      this.c7i(),
      (this.F8i = INVALIDINDEX),
      this.T9i();
    const i = this.plo.GetCurSelectRoleId();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
      i,
    );
  }
  Og() {
    this.RefreshPhantom();
    const i = this.plo.GetCurSelectRoleData();
    const t = i.IsTrialRole();
    ControllerHolder_1.ControllerHolder.PhantomBattleController.ChangeRoleEvent(
      i.GetDataId(),
    ),
      this.Cdo.RefreshView(this.plo),
      this.GetButton(6).RootUIComp.SetUIActive(!t),
      this.Tqt();
  }
  Tqt() {
    let i = this.plo.GetCurSelectRoleData();
    let t = 0;
    let e = 0;
    (e = i?.IsTrialRole()
      ? ((t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(
            i.GetDataId(),
          )),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionReachableCostMax())
      : ((t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetRoleCurrentPhantomCost(
            i.GetRoleId(),
          )),
        this.d7i())),
      this.GetText(8).SetText(
        StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), e.toString()),
      );
    i = i.GetRoleId();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
      i,
    );
  }
  d7i() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
  }
  OnBeforeHide() {
    UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", !1),
      UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
  }
  ydo() {
    const t = this.w8i.length;
    for (let i = 0; i < t; i++) this.w8i[i].SetToggleState(2);
  }
  c7i() {
    const t = this.w8i.length;
    for (let i = 0; i < t; i++) this.w8i[i].SetToggleState(0);
  }
  $9i(i, t) {
    i >= 0 && this.$8i[i].SetMovingState(t);
  }
  Y9i(i, t) {
    i >= 0 && this.w8i[i].SetAnimationState(t);
  }
  OnTickUiTabViewBase(i) {
    this.Ido(i), this.Tdo(i);
  }
  Tdo(t) {
    if (this.udo) {
      this.Uqe += t;
      let i = this.Uqe / this.ddo;
      i >= 1 && (i = 1),
        this.$8i[this.P8i].TickDoCeaseAnimation(i),
        this.$8i[this.x8i].TickDoCeaseAnimation(i),
        i >= 1 && (this.t7i(), (this.udo = !1));
    }
  }
  Ido(t) {
    if (this.cdo) {
      this.Uqe += t;
      let i = this.Uqe / this.ddo;
      i >= 1 && (i = 1),
        this.$8i[this.F8i].TickDoCeaseAnimation(i),
        i >= 1 && (this.W9i(this.F8i), (this.cdo = !1));
    }
  }
  Mdo() {
    return !(this.udo || this.cdo || this.mdo);
  }
  async t7i() {
    (this.mdo = !0),
      this.$9i(this.P8i, !1),
      this.$9i(this.x8i, !1),
      await this.I7i(this.P8i),
      this.Y9i(this.P8i, !1),
      this.Y9i(this.x8i, !1),
      await this.T9i(!1),
      this.RefreshPhantom(),
      (this.mdo = !1),
      UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1),
      (this.F8i = INVALIDINDEX);
  }
  async W9i(i) {
    (this.x8i = i),
      (this.mdo = !0),
      this.$9i(this.P8i, !1),
      this.$9i(this.x8i, !1),
      await this.I7i(i),
      this.Y9i(this.P8i, !1),
      this.Y9i(this.x8i, !1),
      this.T9i(!1),
      (this.mdo = !1),
      this.L8i.SetResult(!0),
      (this.F8i = INVALIDINDEX);
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
  async T9i(i = !0) {
    const t = this.plo.GetCurSelectRoleData().IsTrialRole();
    i &&
      !t &&
      this.F8i !== INVALIDINDEX &&
      (UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !0,
      ),
      (this.cdo = !0),
      (this.Uqe = 0),
      (this.L8i = new CustomPromise_1.CustomPromise()),
      (i = this.$8i[this.F8i].GetAnimationTargetPos()),
      this.$8i[this.F8i].SetDragComponentToTargetPositionParam(i),
      this.$9i(this.F8i, !0),
      await this.L8i.Promise,
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !1,
      )),
      this.GetItem(7).SetRaycastTarget(!1),
      this.$8i.forEach((i) => {
        i.ResetPosition();
      }),
      this.w8i.forEach((i) => {
        i.ResetPosition();
      }),
      (this.P8i = -1),
      (this.x8i = -1);
  }
  Ldo(i) {
    if (this.Mdo() && i >= 0) {
      i = this.w8i[i]?.GetDragComponent()?.RootUIComp;
      if (i) return [i, i];
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length === 1) {
      if (i[0] === "Equipped")
        return (
          (t = this.plo.GetCurSelectRoleData()),
          (t =
            ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
              t,
            ).findIndex((i) => i)),
          this.Ldo(t)
        );
      if (i[0] === "First") return this.Ldo(0);
      var t = this.Cdo?.GetTxtItemByIndex(Number(i[0]));
      if (t) return [t, t];
    }
  }
  OnBeforeDestroy() {
    this.udo = !1;
  }
}
exports.RoleVisionTabView = RoleVisionTabView;
// # sourceMappingURL=RoleVisionTabView.js.map
