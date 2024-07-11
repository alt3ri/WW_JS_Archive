"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionCommonDragItem = void 0);
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
      (this.YCo = void 0),
      (this.Xy = -1),
      (this.JCo = void 0),
      (this.zCo = void 0),
      (this.ZCo = void 0),
      (this.ego = void 0),
      (this.tgo = void 0),
      (this.igo = void 0),
      (this.Tbt = void 0),
      (this.ogo = void 0),
      (this.rgo = void 0),
      (this.ngo = void 0),
      (this.sgo = void 0),
      (this.ago = void 0),
      (this.hgo = void 0),
      (this.lgo = !1),
      (this.Uqe = 0),
      (this._go = !1),
      (this.ugo = !1),
      (this.Gyt = TickSystem_1.TickSystem.InvalidId),
      (this.cgo = !1),
      (this.mgo = TickSystem_1.TickSystem.InvalidId),
      (this.L6e = 0),
      (this.dgo = Vector_1.Vector.Create()),
      (this.Cgo = void 0),
      (this.ggo = 0),
      (this.fgo = 0),
      (this.pgo = new Vector2D_1.Vector2D(0, 0)),
      (this.vgo = new Vector2D_1.Vector2D(0, 0)),
      (this.Mgo = new Array()),
      (this.Ego = !1),
      (this.Sgo = !1),
      (this.SPe = void 0),
      (this.ygo = 0),
      (this.$8i = void 0),
      (this.Igo = void 0),
      (this.Tgo = void 0),
      (this.Lgo = void 0),
      (this.Dgo = void 0),
      (this.Rgo = void 0),
      (this.Ugo = void 0),
      (this.Ago = new Vector2D_1.Vector2D(0, 0)),
      (this.Pgo = new Vector2D_1.Vector2D(0, 0)),
      (this.xgo = !1),
      (this.wgo = new Vector2D_1.Vector2D(0, 0)),
      (this.Bgo = !1),
      (this.bgo = new Vector2D_1.Vector2D(0, 0)),
      (this.qgo = !1),
      (this.fLt = void 0),
      (this.Ggo = !1),
      (this.Ngo = (t) => {
        ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
          !this.Sgo &&
          (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
            ModelManager_1.ModelManager.PhantomBattleModel.SetCurrentDragIndex(
              this.Xy,
            ),
          (this.lgo = !1),
          (this.Uqe = 0),
          (this.ugo = !1),
          (this._go = !1),
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
      (this.kgo = (t) => {
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
            this.Ggo
              ? this.Hgo()
                ? this.jgo(!0)
                : this.jgo()
              : this.$8i
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
      (this.Agt = (t) => {
        this.Ggo ||
          (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
            this.Xy,
          ) &&
            this.$8i &&
            ((this.hgo = t), this.Uqe < CLICKTIME || this.TickCheckDrag()));
      }),
      (this.Pgt = (t) => {
        this.Ggo ||
          (ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
            this.Xy,
          ) &&
            ((this.Mgo = []), (this._go = !0), (this.cgo = !0)));
      }),
      (this.Kgo = (t) => {
        this.Ggo ||
          (this.$8i &&
            (this._go &&
              (this.Uqe < CLICKTIME
                ? this.jgo()
                : this.xgo || this.ago?.(this, this.Mgo, this.xgo),
              (this._go = !1)),
            this.xgo) &&
            ((this.xgo = !1),
            (this.Ego = !1),
            this.ego?.(this.GetCurrentIndex(), this.$8i)));
      }),
      (this.K3t = (t) => {
        "Cease" === t &&
          (this.CeaseAnimationPromise.SetResult(!0),
          this.sgo?.(this.GetCurrentIndex()));
      }),
      (this.TickDoCeaseAnimation = async (t) => {
        var i =
            await ControllerHolder_1.ControllerHolder.PhantomBattleController.GetProgressCurveValue(
              t,
              this.bgo.X,
              this.wgo.X,
            ),
          t =
            await ControllerHolder_1.ControllerHolder.PhantomBattleController.GetProgressCurveValue(
              t,
              this.bgo.Y,
              this.wgo.Y,
            );
        this.Bgo &&
          this.qgo &&
          this.Ugo.SetLGUISpaceAbsolutePosition(new UE.Vector(i, t, 0));
      }),
      (this.Rgo = new UE.Vector2D(0, 0)),
      (this.Dgo = t),
      (this.YCo = i),
      (this.Xy = e),
      (this.Lgo = i.RootUIComp.GetParentAsUIItem()),
      i.OnPointerDownCallBack.Bind(this.Ngo),
      i.OnPointerUpCallBack.Bind(this.kgo),
      i.OnPointerDragCallBack.Bind(this.Agt),
      i.OnPointerBeginDragCallBack.Bind(this.Pgt),
      i.OnPointerEndDragCallBack.Bind(this.Kgo);
    t = this.YCo.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
    (this.Ugo = t),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
      this.SPe.BindSequenceCloseEvent(this.K3t),
      (this.fLt = i
        .GetOwner()
        .GetComponentByClass(UE.LGUICanvas.StaticClass()));
  }
  GetNormalParent() {
    return this.Dgo;
  }
  SetActive(t) {
    this.YCo?.RootUIComp.SetUIActive(t);
  }
  SetScrollViewItem(t) {
    var i = t.GetLGUISpaceAbsolutePositionByPivot(
        new Vector2D_1.Vector2D(0.5, 0.5).ToUeVector2D(),
      ),
      s = t.Width / 2,
      e = i.X - s,
      h = i.X + s,
      e = ((this.Ago.X = e), (this.Ago.Y = h), (s = t.Height / 2), i.Y - s),
      h = i.Y + s;
    (this.Pgo.X = e), (this.Pgo.Y = h);
  }
  Refresh(t, i) {
    (this.$8i = t), (this.Ggo = i);
  }
  StartClickCheckTimer() {
    this.Vgo(),
      (this.mgo = TickSystem_1.TickSystem.Add(
        () => {
          0 === this.Qgo() && (this.kgo(void 0), this.Vgo());
        },
        "DragTick",
        0,
        !0,
      ).Id);
  }
  GetAnimationTargetPos() {
    return this.Tgo;
  }
  SetDragItemHierarchyMax() {
    this.Ugo.SetAsLastHierarchy(),
      this.fLt.SetSortOrder(HEIGHTCANVASSORT + 1, !0);
  }
  GetCurrentData() {
    return this.$8i;
  }
  CacheStartDragPosition() {
    var t = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition(),
      i = this.YCo.RootUIComp.GetLGUISpaceAbsolutePosition();
    (this.Igo = new Vector2D_1.Vector2D(i.X, i.Y)),
      (this.Tgo = new Vector2D_1.Vector2D(t.X, t.Y));
  }
  Xgo() {
    this.YCo.RootUIComp.SetAnchorAlign(4, 4);
    var t = new UE.Vector(1, 1, 1);
    this.YCo.RootUIComp.SetUIItemScale(t),
      this.YCo.RootUIComp.SetHorizontalStretch(this.Rgo),
      this.YCo.RootUIComp.SetVerticalStretch(this.Rgo),
      this.fLt.SetSortOrder(0, !0),
      this.YCo.RootUIComp.SetBubbleUpToParent(!0);
  }
  StartDragState() {
    this.CacheStartDragPosition(),
      (this.Sgo = !0),
      (this.xgo = !1),
      this.YCo.RootUIComp.SetAnchorAlign(2, 2),
      (this.ggo = this.YCo.RootUIComp.Width),
      (this.fgo = this.YCo.RootUIComp.Height),
      (this.ygo = 0),
      this.fLt.SetSortOrder(HEIGHTCANVASSORT, !0),
      this.YCo.RootUIComp.SetBubbleUpToParent(!1);
  }
  ResetPosition() {
    this.SPe.StopSequenceByKey("Drag", !1, !0),
      this.Ego && this.$go(),
      (this.Ego = !1),
      this.Sgo &&
        (this.Xgo(),
        this.Igo && this.YCo.RootUIComp.SetAnchorOffset(this.Rgo),
        (this.Sgo = !1));
  }
  SetToTargetParentAndSetStretch(t) {}
  SetToNormalParent() {
    this.SetToTargetParentAndSetStretch(this.Lgo);
  }
  SetDragSuccessCallBack(t) {
    this.ago = t;
  }
  SetMoveToScrollViewCallBack(t) {
    this.tgo = t;
  }
  SetRemoveFromScrollViewCallBack(t) {
    this.igo = t;
  }
  SetEndDragWhenOnScrollViewCallBack(t) {
    this.ego = t;
  }
  SetOnUnOverlayCallBack(t) {
    this.ZCo = t;
  }
  SetOnOverlayCallBack(t) {
    this.zCo = t;
  }
  SetPointerDownCallBack(t) {
    this.JCo = t;
  }
  SetOnDragAnimationStartFunction(t) {
    this.ngo = t;
  }
  SetOnDragAnimationEndFunction(t) {
    this.sgo = t;
  }
  SetOnClickCallBack(t) {
    this.Tbt = t;
  }
  SetOnClickFailCallBack(t) {
    this.ogo = t;
  }
  SetOnBeginDragCall(t) {
    this.rgo = t;
  }
  SetDragCheckItem(t) {
    this.Cgo = t;
  }
  GetCurrentIndex() {
    return this.Xy;
  }
  TickCheckDrag() {
    this.ygo <= MOVEPARENTDELAYTIME
      ? this.ygo++
      : (this.SetItemToPointerPosition(), this.Ygo());
  }
  ClearStayingItem() {
    this.Mgo = [];
  }
  GetStayingItem() {
    return this.Mgo;
  }
  SetItemToPointerPosition() {
    var t, i, s;
    this.Sgo &&
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
      (this.dgo.X === i && this.dgo.Y === s) ||
        ((this.dgo.X = i),
        (this.dgo.Y = s),
        this.YCo.RootUIComp.SetLGUISpaceAbsolutePosition(
          new UE.Vector(i, s, 0),
        )));
  }
  Vgo() {
    this.mgo !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.mgo),
      (this.mgo = TickSystem_1.TickSystem.InvalidId));
  }
  CheckAndGetCurrentClickState() {
    return this.lgo;
  }
  Fgo() {
    this.Gyt !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.Gyt),
      (this.Gyt = TickSystem_1.TickSystem.InvalidId));
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
  DoCeaseSequence() {
    (this.Ego = !1),
      (this.CeaseAnimationPromise = new CustomPromise_1.CustomPromise()),
      this.SPe.PlayLevelSequenceByName("Cease");
  }
  GetCeaseAnimationPromise() {
    return this.CeaseAnimationPromise;
  }
  $go() {
    this.Ego &&
      (this.SPe.PlayLevelSequenceByName("Fail"),
      this.sgo?.(this.GetCurrentIndex()));
  }
  Jgo() {
    this.Ggo ||
      (this.TickCheckDrag(),
      this.SPe.PlayLevelSequenceByName("Drag"),
      (this.Ego = !0),
      this.ngo?.(this.GetCurrentIndex()));
  }
  Ogo() {
    2 <= this.Qgo() || 0 === this.Qgo()
      ? this.Fgo()
      : this.Uqe >= CLICKTIME &&
        (this.Fgo(), this.$8i) &&
        (this.ugo || (this.Jgo(), (this.ugo = !0)),
        this.rgo && this.rgo(this.Xy),
        this.hgo) &&
        this.Agt(this.hgo);
  }
  jgo(t = !1) {
    return t || this.Wgo()
      ? (this.Tbt?.(this.Xy),
        (this.L6e = TimeUtil_1.TimeUtil.GetServerTime()),
        (this.lgo = !0))
      : ((this.lgo = !1), this.ogo?.(this.Xy), !1);
  }
  Hgo() {
    return (
      !!Info_1.Info.IsInGamepad() ||
      TimeUtil_1.TimeUtil.GetServerTime() - this.L6e > CLICKCALLGAP
    );
  }
  Wgo() {
    return this.Uqe < CLICKTIME && this.Hgo();
  }
  Ygo() {
    const i = new Array();
    this.Cgo?.forEach((t) => {
      t.CheckIfSelfItem(this.Xy) ||
        (t.CheckOverlap(this.zgo(), this.Zgo()) && i.push(t));
    }),
      this.Mgo.forEach((t) => {
        i.includes(t) || t.e0o();
      }),
      i.forEach((t) => {
        this.Mgo.includes(t) || t.t0o();
      }),
      (this.Mgo = i),
      0 !== this.Ago.X &&
        (this.CheckOverlap(this.Ago, this.Pgo)
          ? this.xgo || (this.tgo?.(this.GetCurrentIndex()), (this.xgo = !0))
          : this.xgo && (this.igo?.(this.GetCurrentIndex()), (this.xgo = !1)));
  }
  CheckIfSelfItem(t) {
    return t === this.Xy;
  }
  CheckOverlap(t, i) {
    var s = t.X,
      t = t.Y,
      e = i.X,
      i = i.Y,
      h = this.zgo().X,
      r = this.zgo().Y,
      a = this.Zgo().X,
      o = this.Zgo().Y;
    return s < r && h < t && e < o && a < i;
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
  e0o() {
    this.ZCo?.(this.GetCurrentIndex());
  }
  t0o() {
    this.zCo?.(this.GetCurrentIndex());
  }
  GetMiddlePosition() {
    return [
      this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X,
      this.YCo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y,
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
    (this.Bgo = !0), (this.wgo.X = t.X), (this.wgo.Y = t.Y);
    t = this.Ugo.GetLGUISpaceAbsolutePosition();
    (this.bgo.X = t.X), (this.bgo.Y = t.Y);
  }
  SetMovingState(t) {
    this.qgo = t;
  }
}
exports.VisionCommonDragItem = VisionCommonDragItem;
//# sourceMappingURL=VisionCommonDragItem.js.map
