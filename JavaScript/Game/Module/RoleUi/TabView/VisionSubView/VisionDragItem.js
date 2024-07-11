"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDragItem = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const CLICKTIME = 300;
const CLICKCALLGAP = 1;
const MOVEPARENTDELAYTIME = 1;
class VisionDragItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s, e, h) {
    super(),
      (this.CeaseAnimationPromise = void 0),
      (this.Zdo = void 0),
      (this.ngo = void 0),
      (this.sgo = void 0),
      (this.Xy = -1),
      (this.Y6i = void 0),
      (this.eCo = void 0),
      (this.OnOverlayCallBack = void 0),
      (this.OnUnOverlayCallBack = void 0),
      (this.ClickFunction = void 0),
      (this.ClickFailFunction = void 0),
      (this.aCo = void 0),
      (this.SCo = new Vector2D_1.Vector2D(0, 0)),
      (this.ECo = new Vector2D_1.Vector2D(0, 0)),
      (this.EPe = void 0),
      (this.DCo = void 0),
      (this.ago = void 0),
      (this.RCo = void 0),
      (this.LEt = TickSystem_1.TickSystem.InvalidId),
      (this.gCo = TickSystem_1.TickSystem.InvalidId),
      (this.uCo = void 0),
      (this.yCo = new Array()),
      (this.Uqe = 0),
      (this.pCo = void 0),
      (this._Co = void 0),
      (this.hCo = void 0),
      (this.lCo = void 0),
      (this.ACo = void 0),
      (this.fCo = Vector_1.Vector.Create()),
      (this.hgo = Vector_1.Vector.Create()),
      (this.xCo = void 0),
      (this.TCo = !1),
      (this.mCo = !1),
      (this.cCo = !1),
      (this.cVe = 0),
      (this.dCo = !1),
      (this.ICo = !1),
      (this.PCo = void 0),
      (this.wqe = void 0),
      (this.vCo = 0),
      (this.MCo = 0),
      (this.LCo = 0),
      (this.WFt = (t) => {
        t === "Cease" &&
          (this.CeaseAnimationPromise.SetResult(!0),
          this.lCo?.(this.GetCurrentIndex()));
      }),
      (this.OnDragBegin = (t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
          this.Xy,
        ) &&
          ((this.hgo.X = this.Zdo.RootUIComp.GetAnchorOffsetX()),
          (this.hgo.Y = this.Zdo.RootUIComp.GetAnchorOffsetY()),
          (this.yCo = []),
          (this.mCo = !0),
          this.OnBeginDrag());
      }),
      (this.OnPointerDown = (t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
          (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
            ModelManager_1.ModelManager.PhantomBattleModel.SetCurrentDragIndex(
              this.Xy,
            ),
          (this.cCo = !1),
          (this.Uqe = 0),
          (this.dCo = !1),
          (this.mCo = !1),
          (this.CeaseAnimationPromise = void 0),
          (this.uCo = void 0),
          (this.CCo = !1),
          (this.LEt = TickSystem_1.TickSystem.Add(
            () => {
              this.VCo(), (this.Uqe += Time_1.Time.DeltaTime);
            },
            "DragTick",
            0,
            !0,
          ).Id),
          this.Y6i) &&
          this.eCo?.(this.GetCurrentIndex());
      }),
      (this.OnPointUp = (t) => {
        let i;
        this.jCo(),
          this.WCo(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
              "OnPointUp",
              this.Xy,
            ]),
          ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
            this.Xy,
          ) &&
            (ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex(),
            this.Y6i
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
                    "this.IfBeginDrag",
                    this.CCo,
                  ]),
                (i = this.Uqe < CLICKTIME),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
                    "timeState",
                    i,
                  ]),
                this.CCo || this.QCo())
              : this.XCo() && this.QCo(!0));
      }),
      (this.CCo = !1),
      (this.OnDragEnd = (t) => {
        this.Y6i &&
          this.mCo &&
          (this.Uqe < CLICKTIME ? this.QCo() : this._Co?.(this, this.yCo),
          (this.mCo = !1));
      }),
      (this.pCt = (t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
          this.Xy,
        ) &&
          this.Y6i &&
          ((this.uCo = t), this.Uqe < CLICKTIME || this.TickCheckDrag());
      }),
      (this.Zdo = i),
      (this.xCo = this.Zdo.GetOwner().GetComponentByClass(
        UE.UIItem.StaticClass(),
      )),
      (this.ngo = s),
      (this.sgo = e),
      (this.Xy = h),
      (this.ACo = t),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.xCo)),
      this.EPe.BindSequenceCloseEvent(this.WFt),
      (this.wqe = t),
      (this.PCo = Vector2D_1.Vector2D.Create(0, 0).ToUeVector2D()),
      (this.vCo = t.Width),
      (this.MCo = t.Width);
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  SetDragItemHierarchyMax() {
    this.GetDragRoot().SetAsLastHierarchy();
  }
  GetDragRoot() {
    return this.xCo;
  }
  SetDragCheckItem(t) {
    this.pCo = t;
  }
  SetDraggingParent(t) {
    this.ago = t;
  }
  SetOnDragAnimationStartFunction(t) {
    this.hCo = t;
  }
  SetOnDragAnimationEndFunction(t) {
    this.lCo = t;
  }
  SetOnClickCallBack(t) {
    this.ClickFunction = t;
  }
  SetOnClickFailCallBack(t) {
    this.ClickFailFunction = t;
  }
  SetOnBeginDragCall(t) {
    this.aCo = t;
  }
  QCo(t = !1) {
    return t || this.XCo()
      ? (this.ClickFunction?.(this.Xy),
        (this.cVe = TimeUtil_1.TimeUtil.GetServerTime()),
        (this.cCo = !0))
      : ((this.cCo = !1), this.ClickFailFunction?.(this.Xy), !1);
  }
  CheckAndGetCurrentClickState() {
    return this.cCo;
  }
  SetDragSuccessCallBack(t) {
    this._Co = t;
  }
  GetAnimationTargetPos() {
    return this.RCo;
  }
  ClearStayingItem() {
    this.yCo = [];
  }
  GetStayingItem() {
    return this.yCo;
  }
  DoDragSequence() {
    this.TickCheckDrag(),
      this.EPe.PlayLevelSequenceByName("Drag"),
      (this.ICo = !0),
      this.hCo?.(this.GetCurrentIndex());
  }
  DoCeaseSequence() {
    (this.ICo = !1),
      (this.CeaseAnimationPromise = new CustomPromise_1.CustomPromise()),
      this.EPe.PlayLevelSequenceByName("Cease");
  }
  zCo() {
    this.ICo &&
      (this.EPe.PlayLevelSequenceByName("Fail"),
      this.lCo?.(this.GetCurrentIndex()));
  }
  ResetPositionThenStartDragState() {
    this.ResetPosition(), this.StartDragState();
  }
  CacheStartDragPosition() {
    this.Zdo.RootUIComp.SetAnchorAlign(2, 2);
    const t = this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition();
    var i =
      (this.Zdo.RootUIComp.SetUIParent(this.ago, !0),
      this.Zdo.RootUIComp.SetLGUISpaceAbsolutePosition(t),
      this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition());
    var i =
      ((this.DCo = new Vector2D_1.Vector2D(i.X, i.Y)),
      (this.RCo = new Vector2D_1.Vector2D(t.X, t.Y)),
      this.JCo(),
      new UE.Vector(1, 1, 1));
    this.Zdo.RootUIComp.SetUIItemScale(i);
  }
  StartDragState() {
    (this.TCo = !0), this.Zdo.RootUIComp.SetAnchorAlign(2, 2);
    const t = this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition();
    this.Zdo.RootUIComp.SetUIParent(this.ago, !0),
      this.Zdo.RootUIComp.SetLGUISpaceAbsolutePosition(t),
      (this.LCo = 0);
  }
  SetItemToSourceSize() {
    this.Zdo.RootUIComp.SetWidth(this.vCo),
      this.Zdo.RootUIComp.SetHeight(this.MCo);
  }
  StartClickCheckTimer() {
    this.WCo(),
      (this.gCo = TickSystem_1.TickSystem.Add(
        () => {
          this.lgo() === 0 && (this.OnPointUp(void 0), this.WCo());
        },
        "DragTick",
        0,
        !0,
      ).Id);
  }
  SetPointerDownCallBack(t) {
    this.eCo = t;
  }
  YCo() {
    const t =
      LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
        0,
      );
    const i =
      LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
        1,
      );
    let s = 0;
    return t && s++, i && s++, s;
  }
  VCo() {
    this.YCo() >= 2 || this.YCo() === 0
      ? this.jCo()
      : this.Uqe >= CLICKTIME &&
        (this.jCo(), this.Y6i) &&
        (this.dCo || (this.DoDragSequence(), (this.dCo = !0)),
        this.aCo && this.aCo(this.Xy),
        this.uCo) &&
        this.pCt(this.uCo);
  }
  lgo() {
    const t =
      LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
        0,
      );
    const i =
      LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
        1,
      );
    let s = 0;
    return t && s++, i && s++, s;
  }
  SetToTargetParentAndSetStretch(t) {
    this.Zdo.RootUIComp.SetAnchorAlign(4, 4),
      this.Zdo.RootUIComp.SetUIParent(t, !0),
      this.Zdo.RootUIComp.SetVerticalStretch(this.PCo),
      this.Zdo.RootUIComp.SetHorizontalStretch(this.PCo);
  }
  SetToNormalParent() {
    this.SetToTargetParentAndSetStretch(this.ACo);
  }
  ResetPosition() {
    this.ICo && this.zCo(),
      (this.ICo = !1),
      this.TCo &&
        (this._go(),
        this.DCo && this.Zdo.RootUIComp.SetAnchorOffset(this.PCo),
        (this.TCo = !1));
  }
  _go() {
    this.JCo();
  }
  JCo() {
    this.Zdo.RootUIComp.SetAnchorAlign(4, 4),
      this.Zdo.RootUIComp.SetUIParent(this.ACo, !0);
    const t = new UE.Vector(1, 1, 1);
    this.Zdo.RootUIComp.SetUIItemScale(t),
      this.Zdo.RootUIComp.SetHorizontalStretch(this.PCo),
      this.Zdo.RootUIComp.SetVerticalStretch(this.PCo);
  }
  XCo() {
    return this.Uqe < CLICKTIME && this.KCo();
  }
  KCo() {
    return (
      !!ModelManager_1.ModelManager.PlatformModel.IsInGamepad() ||
      TimeUtil_1.TimeUtil.GetServerTime() - this.cVe > CLICKCALLGAP
    );
  }
  OnBeginDrag() {
    this.CCo = !0;
  }
  WCo() {
    this.gCo !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.gCo),
      (this.gCo = TickSystem_1.TickSystem.InvalidId));
  }
  jCo() {
    this.LEt !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.LEt),
      (this.LEt = TickSystem_1.TickSystem.InvalidId));
  }
  SetItemToPointerPosition() {
    let t, i, s;
    this.TCo &&
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
      (this.fCo.X === i && this.fCo.Y === s) ||
        ((this.fCo.X = i),
        (this.fCo.Y = s),
        this.Zdo.RootUIComp.SetAnchorOffsetX(this.fCo.X),
        this.Zdo.RootUIComp.SetAnchorOffsetY(this.fCo.Y)));
  }
  TickCheckDrag() {
    this.LCo <= MOVEPARENTDELAYTIME
      ? this.LCo++
      : (this.SetItemToPointerPosition(), this.ZCo());
  }
  GetMiddlePosition() {
    return [
      this.Zdo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X,
      this.Zdo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y,
    ];
  }
  ZCo() {
    const i = new Array();
    this.pCo?.forEach((t) => {
      t.CheckIfSelfItem(this.Xy) ||
        (t.CheckOverlap(this.tgo(), this.igo()) && i.push(t));
    }),
      this.yCo.forEach((t) => {
        i.includes(t) || t.OnUnOverlay();
      }),
      i.forEach((t) => {
        this.yCo.includes(t) || t.OnOverlay();
      }),
      (this.yCo = i);
  }
  CheckIfSelfItem(t) {
    return t === this.Xy;
  }
  GetCurrentIndex() {
    return this.Xy;
  }
  Refresh(t) {
    (this.Y6i = t), this.Kbe(t), this.Pqt(t);
  }
  GetCurrentData() {
    return this.Y6i;
  }
  OnUnOverlay() {
    this.OnUnOverlayCallBack?.();
  }
  OnOverlay() {
    this.OnOverlayCallBack?.();
  }
  CheckOverlap(t, i) {
    const s = t.X;
    var t = t.Y;
    const e = i.X;
    var i = i.Y;
    const h = this.tgo().X;
    const r = this.tgo().Y;
    const a = this.igo().X;
    const n = this.igo().Y;
    return s < r && h < t && e < n && a < i;
  }
  Kbe(t) {
    this.sgo.SetUIActive(void 0 !== t),
      t &&
        ((t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          t.GetConfigId(!0),
        )),
        this.SetTextureByPath(t.IconMiddle, this.sgo, "VisionEquipmentView"));
  }
  Pqt(t) {
    this.ngo.SetUIActive(void 0 !== t);
  }
  tgo() {
    var t = this.Zdo.RootUIComp;
    const i = this.vCo / 2;
    const s = t.GetLGUISpaceCenterAbsolutePosition().X - i;
    var t = t.GetLGUISpaceCenterAbsolutePosition().X + i;
    return (this.SCo.X = s), (this.SCo.Y = t), this.SCo;
  }
  igo() {
    var t = this.Zdo.RootUIComp;
    const i = this.MCo / 2;
    const s = t.GetLGUISpaceCenterAbsolutePosition().Y - i;
    var t = t.GetLGUISpaceCenterAbsolutePosition().Y + i;
    return (this.ECo.X = s), (this.ECo.Y = t), this.ECo;
  }
}
exports.VisionDragItem = VisionDragItem;
// # sourceMappingURL=VisionDragItem.js.map
