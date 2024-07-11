"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDragItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  CLICKTIME = 300,
  CLICKCALLGAP = 1,
  MOVEPARENTDELAYTIME = 1;
class VisionDragItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s, e, h) {
    super(),
      (this.CeaseAnimationPromise = void 0),
      (this.YCo = void 0),
      (this.i0o = void 0),
      (this.o0o = void 0),
      (this.Xy = -1),
      (this.$8i = void 0),
      (this.JCo = void 0),
      (this.OnOverlayCallBack = void 0),
      (this.OnUnOverlayCallBack = void 0),
      (this.ClickFunction = void 0),
      (this.ClickFailFunction = void 0),
      (this.rgo = void 0),
      (this.pgo = new Vector2D_1.Vector2D(0, 0)),
      (this.vgo = new Vector2D_1.Vector2D(0, 0)),
      (this.SPe = void 0),
      (this.Igo = void 0),
      (this.r0o = void 0),
      (this.Tgo = void 0),
      (this.Gyt = TickSystem_1.TickSystem.InvalidId),
      (this.mgo = TickSystem_1.TickSystem.InvalidId),
      (this.hgo = void 0),
      (this.Mgo = new Array()),
      (this.Uqe = 0),
      (this.Cgo = void 0),
      (this.ago = void 0),
      (this.ngo = void 0),
      (this.sgo = void 0),
      (this.Dgo = void 0),
      (this.dgo = Vector_1.Vector.Create()),
      (this.n0o = Vector_1.Vector.Create()),
      (this.Ugo = void 0),
      (this.Sgo = !1),
      (this._go = !1),
      (this.lgo = !1),
      (this.L6e = 0),
      (this.ugo = !1),
      (this.Ego = !1),
      (this.Rgo = void 0),
      (this.wqe = void 0),
      (this.ggo = 0),
      (this.fgo = 0),
      (this.ygo = 0),
      (this.K3t = (t) => {
        "Cease" === t &&
          (this.CeaseAnimationPromise.SetResult(!0),
          this.sgo?.(this.GetCurrentIndex()));
      }),
      (this.OnDragBegin = (t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
          this.Xy,
        ) &&
          ((this.n0o.X = this.YCo.RootUIComp.GetAnchorOffsetX()),
          (this.n0o.Y = this.YCo.RootUIComp.GetAnchorOffsetY()),
          (this.Mgo = []),
          (this._go = !0),
          this.OnBeginDrag());
      }),
      (this.OnPointerDown = (t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
          (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
            ModelManager_1.ModelManager.PhantomBattleModel.SetCurrentDragIndex(
              this.Xy,
            ),
          (this.lgo = !1),
          (this.Uqe = 0),
          (this.ugo = !1),
          (this._go = !1),
          (this.CeaseAnimationPromise = void 0),
          (this.hgo = void 0),
          (this.cgo = !1),
          (this.Gyt = TickSystem_1.TickSystem.Add(
            () => {
              this.Ogo(), (this.Uqe += Time_1.Time.DeltaTime);
            },
            "DragTick",
            0,
            !0,
          ).Id),
          this.$8i) &&
          this.JCo?.(this.GetCurrentIndex());
      }),
      (this.OnPointUp = (t) => {
        var i;
        this.Fgo(),
          this.Vgo(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
              "OnPointUp",
              this.Xy,
            ]),
          ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
            this.Xy,
          ) &&
            (ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex(),
            this.$8i
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
                    "this.IfBeginDrag",
                    this.cgo,
                  ]),
                (i = this.Uqe < CLICKTIME),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
                    "timeState",
                    i,
                  ]),
                this.cgo || this.jgo())
              : this.Wgo() && this.jgo(!0));
      }),
      (this.cgo = !1),
      (this.OnDragEnd = (t) => {
        this.$8i &&
          this._go &&
          (this.Uqe < CLICKTIME ? this.jgo() : this.ago?.(this, this.Mgo),
          (this._go = !1));
      }),
      (this.Agt = (t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
          this.Xy,
        ) &&
          this.$8i &&
          ((this.hgo = t), this.Uqe < CLICKTIME || this.TickCheckDrag());
      }),
      (this.YCo = i),
      (this.Ugo = this.YCo.GetOwner().GetComponentByClass(
        UE.UIItem.StaticClass(),
      )),
      (this.i0o = s),
      (this.o0o = e),
      (this.Xy = h),
      (this.Dgo = t),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.Ugo)),
      this.SPe.BindSequenceCloseEvent(this.K3t),
      (this.wqe = t),
      (this.Rgo = Vector2D_1.Vector2D.Create(0, 0).ToUeVector2D()),
      (this.ggo = t.Width),
      (this.fgo = t.Width);
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  SetDragItemHierarchyMax() {
    this.GetDragRoot().SetAsLastHierarchy();
  }
  GetDragRoot() {
    return this.Ugo;
  }
  SetDragCheckItem(t) {
    this.Cgo = t;
  }
  SetDraggingParent(t) {
    this.r0o = t;
  }
  SetOnDragAnimationStartFunction(t) {
    this.ngo = t;
  }
  SetOnDragAnimationEndFunction(t) {
    this.sgo = t;
  }
  SetOnClickCallBack(t) {
    this.ClickFunction = t;
  }
  SetOnClickFailCallBack(t) {
    this.ClickFailFunction = t;
  }
  SetOnBeginDragCall(t) {
    this.rgo = t;
  }
  jgo(t = !1) {
    return t || this.Wgo()
      ? (this.ClickFunction?.(this.Xy),
        (this.L6e = TimeUtil_1.TimeUtil.GetServerTime()),
        (this.lgo = !0))
      : ((this.lgo = !1), this.ClickFailFunction?.(this.Xy), !1);
  }
  CheckAndGetCurrentClickState() {
    return this.lgo;
  }
  SetDragSuccessCallBack(t) {
    this.ago = t;
  }
  GetAnimationTargetPos() {
    return this.Tgo;
  }
  ClearStayingItem() {
    this.Mgo = [];
  }
  GetStayingItem() {
    return this.Mgo;
  }
  DoDragSequence() {
    this.TickCheckDrag(),
      this.SPe.PlayLevelSequenceByName("Drag"),
      (this.Ego = !0),
      this.ngo?.(this.GetCurrentIndex());
  }
  DoCeaseSequence() {
    (this.Ego = !1),
      (this.CeaseAnimationPromise = new CustomPromise_1.CustomPromise()),
      this.SPe.PlayLevelSequenceByName("Cease");
  }
  $go() {
    this.Ego &&
      (this.SPe.PlayLevelSequenceByName("Fail"),
      this.sgo?.(this.GetCurrentIndex()));
  }
  ResetPositionThenStartDragState() {
    this.ResetPosition(), this.StartDragState();
  }
  CacheStartDragPosition() {
    this.YCo.RootUIComp.SetAnchorAlign(2, 2);
    var t = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition(),
      i =
        (this.YCo.RootUIComp.SetUIParent(this.r0o, !0),
        this.YCo.RootUIComp.SetLGUISpaceAbsolutePosition(t),
        this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition()),
      i =
        ((this.Igo = new Vector2D_1.Vector2D(i.X, i.Y)),
        (this.Tgo = new Vector2D_1.Vector2D(t.X, t.Y)),
        this.Xgo(),
        new UE.Vector(1, 1, 1));
    this.YCo.RootUIComp.SetUIItemScale(i);
  }
  StartDragState() {
    (this.Sgo = !0), this.YCo.RootUIComp.SetAnchorAlign(2, 2);
    var t = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition();
    this.YCo.RootUIComp.SetUIParent(this.r0o, !0),
      this.YCo.RootUIComp.SetLGUISpaceAbsolutePosition(t),
      (this.ygo = 0);
  }
  SetItemToSourceSize() {
    this.YCo.RootUIComp.SetWidth(this.ggo),
      this.YCo.RootUIComp.SetHeight(this.fgo);
  }
  StartClickCheckTimer() {
    this.Vgo(),
      (this.mgo = TickSystem_1.TickSystem.Add(
        () => {
          0 === this.s0o() && (this.OnPointUp(void 0), this.Vgo());
        },
        "DragTick",
        0,
        !0,
      ).Id);
  }
  SetPointerDownCallBack(t) {
    this.JCo = t;
  }
  Qgo() {
    var t =
        LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
          0,
        ),
      i =
        LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
          1,
        );
    let s = 0;
    return t && s++, i && s++, s;
  }
  Ogo() {
    2 <= this.Qgo() || 0 === this.Qgo()
      ? this.Fgo()
      : this.Uqe >= CLICKTIME &&
        (this.Fgo(), this.$8i) &&
        (this.ugo || (this.DoDragSequence(), (this.ugo = !0)),
        this.rgo && this.rgo(this.Xy),
        this.hgo) &&
        this.Agt(this.hgo);
  }
  s0o() {
    var t =
        LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
          0,
        ),
      i =
        LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
          1,
        );
    let s = 0;
    return t && s++, i && s++, s;
  }
  SetToTargetParentAndSetStretch(t) {
    this.YCo.RootUIComp.SetAnchorAlign(4, 4),
      this.YCo.RootUIComp.SetUIParent(t, !0),
      this.YCo.RootUIComp.SetVerticalStretch(this.Rgo),
      this.YCo.RootUIComp.SetHorizontalStretch(this.Rgo);
  }
  SetToNormalParent() {
    this.SetToTargetParentAndSetStretch(this.Dgo);
  }
  ResetPosition() {
    this.Ego && this.$go(),
      (this.Ego = !1),
      this.Sgo &&
        (this.a0o(),
        this.Igo && this.YCo.RootUIComp.SetAnchorOffset(this.Rgo),
        (this.Sgo = !1));
  }
  a0o() {
    this.Xgo();
  }
  Xgo() {
    this.YCo.RootUIComp.SetAnchorAlign(4, 4),
      this.YCo.RootUIComp.SetUIParent(this.Dgo, !0);
    var t = new UE.Vector(1, 1, 1);
    this.YCo.RootUIComp.SetUIItemScale(t),
      this.YCo.RootUIComp.SetHorizontalStretch(this.Rgo),
      this.YCo.RootUIComp.SetVerticalStretch(this.Rgo);
  }
  Wgo() {
    return this.Uqe < CLICKTIME && this.Hgo();
  }
  Hgo() {
    return (
      !!Info_1.Info.IsInGamepad() ||
      TimeUtil_1.TimeUtil.GetServerTime() - this.L6e > CLICKCALLGAP
    );
  }
  OnBeginDrag() {
    this.cgo = !0;
  }
  Vgo() {
    this.mgo !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.mgo),
      (this.mgo = TickSystem_1.TickSystem.InvalidId));
  }
  Fgo() {
    this.Gyt !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.Gyt),
      (this.Gyt = TickSystem_1.TickSystem.InvalidId));
  }
  SetItemToPointerPosition() {
    var t, i, s;
    this.Sgo &&
      ((s =
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
          0,
        ).GetWorldPointInPlane()),
      (i =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() *
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir()),
      (t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() *
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir()),
      (i = s.X + i),
      (s = s.Z + t),
      (this.dgo.X === i && this.dgo.Y === s) ||
        ((this.dgo.X = i),
        (this.dgo.Y = s),
        this.YCo.RootUIComp.SetAnchorOffsetX(this.dgo.X),
        this.YCo.RootUIComp.SetAnchorOffsetY(this.dgo.Y)));
  }
  TickCheckDrag() {
    this.ygo <= MOVEPARENTDELAYTIME
      ? this.ygo++
      : (this.SetItemToPointerPosition(), this.Ygo());
  }
  GetMiddlePosition() {
    return [
      this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X,
      this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y,
    ];
  }
  Ygo() {
    const i = new Array();
    this.Cgo?.forEach((t) => {
      t.CheckIfSelfItem(this.Xy) ||
        (t.CheckOverlap(this.zgo(), this.Zgo()) && i.push(t));
    }),
      this.Mgo.forEach((t) => {
        i.includes(t) || t.OnUnOverlay();
      }),
      i.forEach((t) => {
        this.Mgo.includes(t) || t.OnOverlay();
      }),
      (this.Mgo = i);
  }
  CheckIfSelfItem(t) {
    return t === this.Xy;
  }
  GetCurrentIndex() {
    return this.Xy;
  }
  Refresh(t) {
    (this.$8i = t), this.Kbe(t), this.BGt(t);
  }
  GetCurrentData() {
    return this.$8i;
  }
  OnUnOverlay() {
    this.OnUnOverlayCallBack?.();
  }
  OnOverlay() {
    this.OnOverlayCallBack?.();
  }
  CheckOverlap(t, i) {
    var s = t.X,
      t = t.Y,
      e = i.X,
      i = i.Y,
      h = this.zgo().X,
      r = this.zgo().Y,
      a = this.Zgo().X,
      n = this.Zgo().Y;
    return s < r && h < t && e < n && a < i;
  }
  Kbe(t) {
    this.o0o.SetUIActive(void 0 !== t),
      t &&
        ((t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          t.GetConfigId(!0),
        )),
        this.SetTextureByPath(t.IconMiddle, this.o0o, "VisionEquipmentView"));
  }
  BGt(t) {
    this.i0o.SetUIActive(void 0 !== t);
  }
  zgo() {
    var t = this.YCo.RootUIComp,
      i = this.ggo / 2,
      s = t.GetLGUISpaceCenterAbsolutePosition().X - i,
      t = t.GetLGUISpaceCenterAbsolutePosition().X + i;
    return (this.pgo.X = s), (this.pgo.Y = t), this.pgo;
  }
  Zgo() {
    var t = this.YCo.RootUIComp,
      i = this.fgo / 2,
      s = t.GetLGUISpaceCenterAbsolutePosition().Y - i,
      t = t.GetLGUISpaceCenterAbsolutePosition().Y + i;
    return (this.vgo.X = s), (this.vgo.Y = t), this.vgo;
  }
}
exports.VisionDragItem = VisionDragItem;
//# sourceMappingURL=VisionDragItem.js.map
