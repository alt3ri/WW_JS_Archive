"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionCommonDragItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  CLICKTIME = 300,
  CLICKCALLGAP = 1,
  MOVEPARENTDELAYTIME = 1,
  HEIGHTCANVASSORT = 100;
class VisionCommonDragItem {
  constructor(t, i, s, e) {
    (this.CeaseAnimationPromise = void 0),
      (this.Zdo = void 0),
      (this.Xy = -1),
      (this.eCo = void 0),
      (this.tCo = void 0),
      (this.iCo = void 0),
      (this.oCo = void 0),
      (this.rCo = void 0),
      (this.nCo = void 0),
      (this.EBt = void 0),
      (this.sCo = void 0),
      (this.aCo = void 0),
      (this.hCo = void 0),
      (this.lCo = void 0),
      (this._Co = void 0),
      (this.uCo = void 0),
      (this.cCo = !1),
      (this.Uqe = 0),
      (this.mCo = !1),
      (this.dCo = !1),
      (this.LEt = TickSystem_1.TickSystem.InvalidId),
      (this.CCo = !1),
      (this.gCo = TickSystem_1.TickSystem.InvalidId),
      (this.cVe = 0),
      (this.fCo = Vector_1.Vector.Create()),
      (this.pCo = void 0),
      (this.vCo = 0),
      (this.MCo = 0),
      (this.SCo = new Vector2D_1.Vector2D(0, 0)),
      (this.ECo = new Vector2D_1.Vector2D(0, 0)),
      (this.yCo = new Array()),
      (this.ICo = !1),
      (this.TCo = !1),
      (this.EPe = void 0),
      (this.LCo = 0),
      (this.Y6i = void 0),
      (this.DCo = void 0),
      (this.RCo = void 0),
      (this.UCo = void 0),
      (this.ACo = void 0),
      (this.PCo = void 0),
      (this.xCo = void 0),
      (this.wCo = new Vector2D_1.Vector2D(0, 0)),
      (this.BCo = new Vector2D_1.Vector2D(0, 0)),
      (this.bCo = !1),
      (this.qCo = new Vector2D_1.Vector2D(0, 0)),
      (this.GCo = !1),
      (this.NCo = new Vector2D_1.Vector2D(0, 0)),
      (this.OCo = !1),
      (this.cTt = void 0),
      (this.kCo = !1),
      (this.FCo = (t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
          !this.TCo &&
          (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
            ModelManager_1.ModelManager.PhantomBattleModel.SetCurrentDragIndex(
              this.Xy,
            ),
          (this.cCo = !1),
          (this.Uqe = 0),
          (this.dCo = !1),
          (this.mCo = !1),
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
      (this.HCo = (t) => {
        var i;
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
            this.kCo
              ? this.KCo()
                ? this.QCo(!0)
                : this.QCo()
              : this.Y6i
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
      (this.pCt = (t) => {
        this.kCo ||
          (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
            this.Xy,
          ) &&
            this.Y6i &&
            ((this.uCo = t), this.Uqe < CLICKTIME || this.TickCheckDrag()));
      }),
      (this.vCt = (t) => {
        this.kCo ||
          (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
            this.Xy,
          ) &&
            ((this.yCo = []), (this.mCo = !0), (this.CCo = !0)));
      }),
      (this.$Co = (t) => {
        this.kCo ||
          (this.Y6i &&
            (this.mCo &&
              (this.Uqe < CLICKTIME
                ? this.QCo()
                : this.bCo || this._Co?.(this, this.yCo, this.bCo),
              (this.mCo = !1)),
            this.bCo) &&
            ((this.bCo = !1),
            (this.ICo = !1),
            this.oCo?.(this.GetCurrentIndex(), this.Y6i)));
      }),
      (this.WFt = (t) => {
        "Cease" === t &&
          (this.CeaseAnimationPromise.SetResult(!0),
          this.lCo?.(this.GetCurrentIndex()));
      }),
      (this.TickDoCeaseAnimation = async (t) => {
        var i =
            await ControllerHolder_1.ControllerHolder.PhantomBattleController.GetProgressCurveValue(
              t,
              this.NCo.X,
              this.qCo.X,
            ),
          t =
            await ControllerHolder_1.ControllerHolder.PhantomBattleController.GetProgressCurveValue(
              t,
              this.NCo.Y,
              this.qCo.Y,
            );
        this.GCo &&
          this.OCo &&
          this.xCo.SetLGUISpaceAbsolutePosition(new UE.Vector(i, t, 0));
      }),
      (this.PCo = new UE.Vector2D(0, 0)),
      (this.ACo = t),
      (this.Zdo = i),
      (this.Xy = e),
      (this.UCo = i.RootUIComp.GetParentAsUIItem()),
      i.OnPointerDownCallBack.Bind(this.FCo),
      i.OnPointerUpCallBack.Bind(this.HCo),
      i.OnPointerDragCallBack.Bind(this.pCt),
      i.OnPointerBeginDragCallBack.Bind(this.vCt),
      i.OnPointerEndDragCallBack.Bind(this.$Co);
    t = this.Zdo.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
    (this.xCo = t),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
      this.EPe.BindSequenceCloseEvent(this.WFt),
      (this.cTt = i
        .GetOwner()
        .GetComponentByClass(UE.LGUICanvas.StaticClass()));
  }
  GetNormalParent() {
    return this.ACo;
  }
  SetActive(t) {
    this.Zdo?.RootUIComp.SetUIActive(t);
  }
  SetScrollViewItem(t) {
    var i = t.GetLGUISpaceAbsolutePositionByPivot(
        new Vector2D_1.Vector2D(0.5, 0.5).ToUeVector2D(),
      ),
      s = t.Width / 2,
      e = i.X - s,
      h = i.X + s,
      e = ((this.wCo.X = e), (this.wCo.Y = h), (s = t.Height / 2), i.Y - s),
      h = i.Y + s;
    (this.BCo.X = e), (this.BCo.Y = h);
  }
  Refresh(t, i) {
    (this.Y6i = t), (this.kCo = i);
  }
  StartClickCheckTimer() {
    this.WCo(),
      (this.gCo = TickSystem_1.TickSystem.Add(
        () => {
          0 === this.YCo() && (this.HCo(void 0), this.WCo());
        },
        "DragTick",
        0,
        !0,
      ).Id);
  }
  GetAnimationTargetPos() {
    return this.RCo;
  }
  SetDragItemHierarchyMax() {
    this.xCo.SetAsLastHierarchy(),
      this.cTt.SetSortOrder(HEIGHTCANVASSORT + 1, !0);
  }
  GetCurrentData() {
    return this.Y6i;
  }
  CacheStartDragPosition() {
    var t = this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition(),
      i = this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition();
    (this.DCo = new Vector2D_1.Vector2D(i.X, i.Y)),
      (this.RCo = new Vector2D_1.Vector2D(t.X, t.Y));
  }
  JCo() {
    this.Zdo.RootUIComp.SetAnchorAlign(4, 4);
    var t = new UE.Vector(1, 1, 1);
    this.Zdo.RootUIComp.SetUIItemScale(t),
      this.Zdo.RootUIComp.SetHorizontalStretch(this.PCo),
      this.Zdo.RootUIComp.SetVerticalStretch(this.PCo),
      this.cTt.SetSortOrder(0, !0),
      this.Zdo.RootUIComp.SetBubbleUpToParent(!0);
  }
  StartDragState() {
    this.CacheStartDragPosition(),
      (this.TCo = !0),
      (this.bCo = !1),
      this.Zdo.RootUIComp.SetAnchorAlign(2, 2),
      (this.vCo = this.Zdo.RootUIComp.Width),
      (this.MCo = this.Zdo.RootUIComp.Height),
      (this.LCo = 0),
      this.cTt.SetSortOrder(HEIGHTCANVASSORT, !0),
      this.Zdo.RootUIComp.SetBubbleUpToParent(!1);
  }
  ResetPosition() {
    this.EPe.StopSequenceByKey("Drag", !1, !0),
      this.ICo && this.zCo(),
      (this.ICo = !1),
      this.TCo &&
        (this.JCo(),
        this.DCo && this.Zdo.RootUIComp.SetAnchorOffset(this.PCo),
        (this.TCo = !1));
  }
  SetToTargetParentAndSetStretch(t) {}
  SetToNormalParent() {
    this.SetToTargetParentAndSetStretch(this.UCo);
  }
  SetDragSuccessCallBack(t) {
    this._Co = t;
  }
  SetMoveToScrollViewCallBack(t) {
    this.rCo = t;
  }
  SetRemoveFromScrollViewCallBack(t) {
    this.nCo = t;
  }
  SetEndDragWhenOnScrollViewCallBack(t) {
    this.oCo = t;
  }
  SetOnUnOverlayCallBack(t) {
    this.iCo = t;
  }
  SetOnOverlayCallBack(t) {
    this.tCo = t;
  }
  SetPointerDownCallBack(t) {
    this.eCo = t;
  }
  SetOnDragAnimationStartFunction(t) {
    this.hCo = t;
  }
  SetOnDragAnimationEndFunction(t) {
    this.lCo = t;
  }
  SetOnClickCallBack(t) {
    this.EBt = t;
  }
  SetOnClickFailCallBack(t) {
    this.sCo = t;
  }
  SetOnBeginDragCall(t) {
    this.aCo = t;
  }
  SetDragCheckItem(t) {
    this.pCo = t;
  }
  GetCurrentIndex() {
    return this.Xy;
  }
  TickCheckDrag() {
    this.LCo <= MOVEPARENTDELAYTIME
      ? this.LCo++
      : (this.SetItemToPointerPosition(), this.ZCo());
  }
  ClearStayingItem() {
    this.yCo = [];
  }
  GetStayingItem() {
    return this.yCo;
  }
  SetItemToPointerPosition() {
    var t, i, s;
    this.TCo &&
      ((s =
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
          0,
        )),
      (s = Vector2D_1.Vector2D.Create(s.X, s.Y)).FromUeVector2D(
        UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
          s.ToUeVector2D(!0),
        ),
      ),
      (i =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() *
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir()),
      (t =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() *
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir()),
      (i = s.X + i),
      (s = s.Y + t),
      (this.fCo.X === i && this.fCo.Y === s) ||
        ((this.fCo.X = i),
        (this.fCo.Y = s),
        this.Zdo.RootUIComp.SetLGUISpaceAbsolutePosition(
          new UE.Vector(i, s, 0),
        )));
  }
  WCo() {
    this.gCo !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.gCo),
      (this.gCo = TickSystem_1.TickSystem.InvalidId));
  }
  CheckAndGetCurrentClickState() {
    return this.cCo;
  }
  jCo() {
    this.LEt !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.LEt),
      (this.LEt = TickSystem_1.TickSystem.InvalidId));
  }
  YCo() {
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
  DoCeaseSequence() {
    (this.ICo = !1),
      (this.CeaseAnimationPromise = new CustomPromise_1.CustomPromise()),
      this.EPe.PlayLevelSequenceByName("Cease");
  }
  GetCeaseAnimationPromise() {
    return this.CeaseAnimationPromise;
  }
  zCo() {
    this.ICo &&
      (this.EPe.PlayLevelSequenceByName("Fail"),
      this.lCo?.(this.GetCurrentIndex()));
  }
  ego() {
    this.kCo ||
      (this.TickCheckDrag(),
      this.EPe.PlayLevelSequenceByName("Drag"),
      (this.ICo = !0),
      this.hCo?.(this.GetCurrentIndex()));
  }
  VCo() {
    2 <= this.YCo() || 0 === this.YCo()
      ? this.jCo()
      : this.Uqe >= CLICKTIME &&
        (this.jCo(), this.Y6i) &&
        (this.dCo || (this.ego(), (this.dCo = !0)),
        this.aCo && this.aCo(this.Xy),
        this.uCo) &&
        this.pCt(this.uCo);
  }
  QCo(t = !1) {
    return t || this.XCo()
      ? (this.EBt?.(this.Xy),
        (this.cVe = TimeUtil_1.TimeUtil.GetServerTime()),
        (this.cCo = !0))
      : ((this.cCo = !1), this.sCo?.(this.Xy), !1);
  }
  KCo() {
    return (
      !!ModelManager_1.ModelManager.PlatformModel.IsInGamepad() ||
      TimeUtil_1.TimeUtil.GetServerTime() - this.cVe > CLICKCALLGAP
    );
  }
  XCo() {
    return this.Uqe < CLICKTIME && this.KCo();
  }
  ZCo() {
    const i = new Array();
    this.pCo?.forEach((t) => {
      t.CheckIfSelfItem(this.Xy) ||
        (t.CheckOverlap(this.tgo(), this.igo()) && i.push(t));
    }),
      this.yCo.forEach((t) => {
        i.includes(t) || t.ogo();
      }),
      i.forEach((t) => {
        this.yCo.includes(t) || t.rgo();
      }),
      (this.yCo = i),
      0 !== this.wCo.X &&
        (this.CheckOverlap(this.wCo, this.BCo)
          ? this.bCo || (this.rCo?.(this.GetCurrentIndex()), (this.bCo = !0))
          : this.bCo && (this.nCo?.(this.GetCurrentIndex()), (this.bCo = !1)));
  }
  CheckIfSelfItem(t) {
    return t === this.Xy;
  }
  CheckOverlap(t, i) {
    var s = t.X,
      t = t.Y,
      e = i.X,
      i = i.Y,
      h = this.tgo().X,
      r = this.tgo().Y,
      a = this.igo().X,
      o = this.igo().Y;
    return s < r && h < t && e < o && a < i;
  }
  tgo() {
    var t = this.Zdo.RootUIComp,
      i = this.vCo / 2,
      s = t.GetLGUISpaceCenterAbsolutePosition().X - i,
      t = t.GetLGUISpaceCenterAbsolutePosition().X + i;
    return (this.SCo.X = s), (this.SCo.Y = t), this.SCo;
  }
  igo() {
    var t = this.Zdo.RootUIComp,
      i = this.MCo / 2,
      s = t.GetLGUISpaceCenterAbsolutePosition().Y - i,
      t = t.GetLGUISpaceCenterAbsolutePosition().Y + i;
    return (this.ECo.X = s), (this.ECo.Y = t), this.ECo;
  }
  ogo() {
    this.iCo?.(this.GetCurrentIndex());
  }
  rgo() {
    this.tCo?.(this.GetCurrentIndex());
  }
  GetMiddlePosition() {
    return [
      this.Zdo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X,
      this.Zdo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y,
    ];
  }
  static GetOverlapIndex(t, i) {
    var s = i.length,
      t = t.GetMiddlePosition();
    let e = i[0].GetCurrentIndex();
    var h = i[0].GetMiddlePosition(),
      r = t[0] * t[0],
      a = t[1] * t[1];
    let o = Math.abs(r - h[0] * h[0]) + Math.abs(a - h[1] * h[1]);
    for (let t = 0; t < s; t++) {
      var h = i[t].GetMiddlePosition(),
        n = Math.abs(r - h[0] * h[0]) + Math.abs(a - h[1] * h[1]);
      o > n && ((o = n), (e = i[t].GetCurrentIndex()));
    }
    return e;
  }
  SetDragComponentToTargetPositionParam(t) {
    (this.GCo = !0), (this.qCo.X = t.X), (this.qCo.Y = t.Y);
    t = this.xCo.GetLGUISpaceAbsolutePosition();
    (this.NCo.X = t.X), (this.NCo.Y = t.Y);
  }
  SetMovingState(t) {
    this.OCo = t;
  }
}
exports.VisionCommonDragItem = VisionCommonDragItem;
//# sourceMappingURL=VisionCommonDragItem.js.map
