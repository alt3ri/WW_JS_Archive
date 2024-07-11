"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionTabView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  RoleController_1 = require("../RoleController"),
  RoleVisionDragHeadItem_1 = require("./VisionSubView/RoleVisionDragHeadItem"),
  RoleVisionInfoPanel_1 = require("./VisionSubView/RoleVisionInfoPanel"),
  VisionCommonDragItem_1 = require("./VisionSubView/VisionCommonDragItem"),
  INVALIDINDEX = 999;
class RoleVisionTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.T9i = void 0),
      (this.hCo = !1),
      (this.lCo = !1),
      (this._Co = !1),
      (this.A9i = -1),
      (this.P9i = -1),
      (this.uCo = 0),
      (this.Uqe = 0),
      (this.k9i = INVALIDINDEX),
      (this.cCo = void 0),
      (this.d1o = void 0),
      (this.x9i = new Array()),
      (this.X9i = new Array()),
      (this.b9i = 0),
      (this.mCo = !1),
      (this.dCo = () => {
        this.CCo = !1;
      }),
      (this.gCo = () => {
        this.$9t();
      }),
      (this.CCo = !1),
      (this.OnChangeRole = (i) => {
        this.Og(),
          (this.CCo = !0),
          this.PlayMontageStart(!0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
            i,
          );
      }),
      (this.RefreshPhantom = () => {
        var t = this.d1o?.GetCurSelectRoleData(),
          e =
            ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
              t,
            ),
          s = this.x9i.length;
        for (let i = 0; i < s; i++) {
          var h = e.length > i ? e[i] : void 0;
          this.x9i[i].UpdateItem(h), this.X9i[i].Refresh(h, t.IsTrialRole());
        }
        this.RGt();
      }),
      (this.OnEquipError = () => {
        this.I7i();
      }),
      (this.OnClickFailVision = (i) => {
        this.fCo() && this.I7i();
      }),
      (this.OnClickVision = (i) => {
        var t;
        this.fCo() &&
          (this.I7i(),
          (t = this.d1o.GetCurSelectRoleData()).IsTrialRole()
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "RolePhantomTrialTips",
              )
            : ((this.b9i = i),
              (ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex =
                i),
              (i =
                ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
                  t.GetRoleId(),
                  i,
                )),
              (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId =
                i),
              this.pCo(!0),
              this.uHi(),
              this.I7i(),
              AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_click"),
              UiManager_1.UiManager.OpenView(
                "VisionEquipmentView",
                t.GetRoleId(),
              ),
              this.UiViewSequence.PlaySequencePurely("HideView")));
      }),
      (this.OnPointerDownCallBack = (i) => {
        if (this.fCo()) {
          this.GetItem(7).SetRaycastTarget(!0);
          var t = this.X9i.length;
          for (let i = 0; i < t; i++) this.X9i[i].StartClickCheckTimer();
          this.k9i = INVALIDINDEX;
        }
      }),
      (this.OnBeginDrag = (i) => {
        this.k9i = i;
        var t = this.d1o.GetCurSelectRoleData().IsTrialRole();
        if (!t) {
          this.X9i.forEach((i) => {
            i.StartDragState();
          });
          var e = this.X9i.length;
          for (let i = 0; i < e; i++)
            ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
              this.X9i[i].GetCurrentIndex(),
            ) && this.X9i[i].SetDragItemHierarchyMax();
          this.X9i[i].SetItemToPointerPosition(),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drag");
        }
      }),
      (this.OnDragEndCallBack = (i, t) => {
        var e, s;
        1 <= t.length
          ? ((e = i.GetCurrentIndex()),
            (i = VisionCommonDragItem_1.VisionCommonDragItem.GetOverlapIndex(
              i,
              t,
            )),
            (t = this.d1o.GetCurSelectRoleData()),
            (s =
              ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
                t.GetRoleId(),
              ).GetIncrIdList()),
            this.X7i(e, !0),
            this.X7i(i, !0),
            this.$7i(e, !0),
            this.$7i(i, !0),
            ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomPutOnRequest(
              s[e],
              t.GetRoleId(),
              i,
              e,
              !0,
            ))
          : (this.I7i(),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_item_drop"));
      }),
      (this.Y7i = (i, t, e) => {
        e
          ? (UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !0),
            (this.hCo = !1),
            (this.Uqe = 0),
            (e = this.X9i[t].GetAnimationTargetPos()),
            this.X9i[i].SetDragComponentToTargetPositionParam(e),
            (e = this.X9i[i].GetAnimationTargetPos()),
            this.X9i[t].SetDragComponentToTargetPositionParam(e),
            (this.A9i = i),
            (this.P9i = t),
            this.X7i(this.A9i, !0),
            this.X7i(this.P9i, !0),
            this.$7i(this.A9i, !0),
            this.$7i(this.P9i, !0),
            (this.hCo = !0),
            AudioSystem_1.AudioSystem.PostEvent("ui_vision_equip_on"))
          : this.RefreshPhantom();
      }),
      (this.pCo = (i) => {
        i &&
          (UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor(),
          (this.mCo = !0));
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
      (this.BtnBindInfo = [[6, this.gCo]]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.OnChangeRole,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
        this.Y7i,
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
        this.dCo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.OnChangeRole,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos,
        this.Y7i,
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
        this.dCo,
      );
  }
  async $9t() {
    var i = this.d1o.GetCurSelectRoleId();
    await ControllerHolder_1.ControllerHolder.PhantomBattleController.OpenPhantomBattleFetterView(
      0,
      i,
    ),
      this.pCo(!0);
  }
  async OnBeforeStartAsync() {
    (this.d1o = this.ExtraParams),
      void 0 === this.d1o
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleVisionTabView",
          ])
        : ((this.cCo = new RoleVisionInfoPanel_1.RoleVisionInfoPanel(
            this.GetItem(5),
          )),
          await this.cCo.Init(),
          await this.vCo());
  }
  OnStart() {
    this.GetItem(7).SetUIActive(!0),
      this.GetItem(7).SetRaycastTarget(!1),
      this.cCo.SetActive(!0),
      this.cCo.SetConfirmButtonCall(() => {
        this.OnClickVision(this.b9i);
      }),
      this.GetButton(6).RootUIComp.SetUIActive(!0),
      (this.uCo =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionDragCurveTime());
  }
  async vCo() {
    for (let i = 0; i <= 4; i++) {
      var t = this.d1o.GetCurSelectRoleId();
      this.x9i.push(
        new RoleVisionDragHeadItem_1.RoleVisionDragHeadItem(
          this.GetItem(i),
          0 + i,
          t,
          !0,
        ),
      );
    }
    await Promise.all([...this.x9i.map(async (i) => i.Init())]),
      this.x9i.forEach((i) => {
        var t = new VisionCommonDragItem_1.VisionCommonDragItem(
          i.GetRootItem(),
          i.GetDragComponent(),
          this.GetItem(7),
          i.GetCurrentIndex(),
        );
        this.X9i.push(t),
          t.SetOnDragAnimationStartFunction(i.OnDragItemDragBegin),
          t.SetOnDragAnimationEndFunction(i.OnDragItemDragEnd),
          t.SetOnOverlayCallBack(i.OnOverlay),
          t.SetOnUnOverlayCallBack(i.OnUnOverlay);
      }),
      this.X9i.forEach((i) => {
        i.SetOnClickCallBack(this.OnClickVision),
          i.SetOnClickFailCallBack(this.OnClickFailVision),
          i.SetDragCheckItem(this.X9i),
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
      this.CCo
        ? (UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor(),
          this.PlayMontageStart(!0),
          (this.CCo = !1))
        : this.mCo
          ? (UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor(),
            this.PlayMontageStart(!0),
            (this.mCo = !1))
          : this.PlayMontageStart(),
      (this.b9i = 0),
      this.Og(),
      this.MCo(),
      this.uHi(),
      (this.k9i = INVALIDINDEX),
      this.I7i();
    var i = this.d1o.GetCurSelectRoleId();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
      i,
    );
  }
  Og() {
    this.RefreshPhantom();
    var i = this.d1o.GetCurSelectRoleData(),
      t = i.IsTrialRole();
    ControllerHolder_1.ControllerHolder.PhantomBattleController.ChangeRoleEvent(
      i.GetDataId(),
    ),
      this.cCo.RefreshView(this.d1o),
      this.GetButton(6).RootUIComp.SetUIActive(!t),
      this.RGt();
  }
  RGt() {
    var i = this.d1o.GetCurSelectRoleData();
    let t = 0,
      e = 0;
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
        this.mHi())),
      this.GetText(8).SetText(
        StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), e.toString()),
      );
    i = i.GetRoleId();
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshVisionEquipRedPoint,
      i,
    );
  }
  mHi() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
  }
  OnBeforeHide() {
    UiLayer_1.UiLayer.SetShowMaskLayer("playBackToStartPositionAnimation", !1),
      UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1);
  }
  MCo() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++) this.x9i[i].SetToggleState(2);
  }
  uHi() {
    var t = this.x9i.length;
    for (let i = 0; i < t; i++) this.x9i[i].SetToggleState(0);
  }
  X7i(i, t) {
    0 <= i && this.X9i[i].SetMovingState(t);
  }
  $7i(i, t) {
    0 <= i && this.x9i[i].SetAnimationState(t);
  }
  OnTickUiTabViewBase(i) {
    this.ECo(i), this.SCo(i);
  }
  SCo(t) {
    if (this.hCo) {
      this.Uqe += t;
      let i = this.Uqe / this.uCo;
      1 <= i && (i = 1),
        this.X9i[this.A9i].TickDoCeaseAnimation(i),
        this.X9i[this.P9i].TickDoCeaseAnimation(i),
        1 <= i && (this.eHi(), (this.hCo = !1));
    }
  }
  ECo(t) {
    if (this.lCo) {
      this.Uqe += t;
      let i = this.Uqe / this.uCo;
      1 <= i && (i = 1),
        this.X9i[this.k9i].TickDoCeaseAnimation(i),
        1 <= i && (this.j7i(this.k9i), (this.lCo = !1));
    }
  }
  fCo() {
    return !(this.hCo || this.lCo || this._Co);
  }
  async eHi() {
    (this._Co = !0),
      this.X7i(this.A9i, !1),
      this.X7i(this.P9i, !1),
      await this.yHi(this.A9i),
      this.$7i(this.A9i, !1),
      this.$7i(this.P9i, !1),
      await this.I7i(!1),
      this.RefreshPhantom(),
      (this._Co = !1),
      UiLayer_1.UiLayer.SetShowMaskLayer("OnEquipVision", !1),
      (this.k9i = INVALIDINDEX);
  }
  async j7i(i) {
    (this.P9i = i),
      (this._Co = !0),
      this.X7i(this.A9i, !1),
      this.X7i(this.P9i, !1),
      await this.yHi(i),
      this.$7i(this.A9i, !1),
      this.$7i(this.P9i, !1),
      this.I7i(!1),
      (this._Co = !1),
      this.T9i.SetResult(!0),
      (this.k9i = INVALIDINDEX);
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
  async I7i(i = !0) {
    var t = this.d1o.GetCurSelectRoleData().IsTrialRole();
    i &&
      !t &&
      this.k9i !== INVALIDINDEX &&
      (UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !0,
      ),
      (this.lCo = !0),
      (this.Uqe = 0),
      (this.T9i = new CustomPromise_1.CustomPromise()),
      (i = this.X9i[this.k9i].GetAnimationTargetPos()),
      this.X9i[this.k9i].SetDragComponentToTargetPositionParam(i),
      this.X7i(this.k9i, !0),
      await this.T9i.Promise,
      UiLayer_1.UiLayer.SetShowMaskLayer(
        "playBackToStartPositionAnimation",
        !1,
      )),
      this.GetItem(7).SetRaycastTarget(!1),
      this.X9i.forEach((i) => {
        i.ResetPosition();
      }),
      this.x9i.forEach((i) => {
        i.ResetPosition();
      }),
      (this.A9i = -1),
      (this.P9i = -1);
  }
  yCo(i) {
    if (this.fCo() && 0 <= i) {
      i = this.x9i[i]?.GetDragComponent()?.RootUIComp;
      if (i) return [i, i];
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (1 === i.length) {
      if ("Equipped" === i[0])
        return (
          (t = this.d1o.GetCurSelectRoleData()),
          (t =
            ModelManager_1.ModelManager.PhantomBattleModel.GetCurrentViewShowPhantomList(
              t,
            ).findIndex((i) => i)),
          this.yCo(t)
        );
      if ("First" === i[0]) return this.yCo(0);
      var t = this.cCo?.GetTxtItemByIndex(Number(i[0]));
      if (t) return [t, t];
    }
  }
  OnBeforeDestroy() {
    this.hCo = !1;
  }
}
exports.RoleVisionTabView = RoleVisionTabView;
//# sourceMappingURL=RoleVisionTabView.js.map
