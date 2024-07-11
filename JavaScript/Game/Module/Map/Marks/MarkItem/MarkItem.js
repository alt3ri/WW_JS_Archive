"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapController_1 = require("../../Controller/MapController"),
  MapDefine_1 = require("../../MapDefine"),
  MapUtil_1 = require("../../MapUtil");
class MarkItem {
  constructor(t, e, i, s = 1) {
    (this.MapType = 2),
      (this.kDi = 1),
      (this.ShowPriority = 0),
      (this.IsDestroy = !1),
      (this.IsIgnoreScaleShow = !1),
      (this.ConfigScale = 1),
      (this.FDi = void 0),
      (this.WorldPositionVector = void 0),
      (this.VDi = !1),
      (this.GridId = 0),
      (this.MapId = 0),
      (this.NeedPlayShowOrHideSeq = void 0),
      (this.pta = 1),
      (this.HDi = () => {
        this.VDi = !0;
      }),
      (this.jDi = () => {
        this.VDi = !1;
      }),
      (this.WDi = !1),
      (this.KDi = !1),
      (this.TrackTarget = void 0),
      (this.TrackSourceInner = 2),
      (this.QDi = void 0),
      (this.InnerView = void 0),
      (this.xbt = ""),
      (this.IsOutOfBound = !1),
      (this.XDi = !1),
      (this.IsCanShowViewFinally = !1),
      (this.MapType = e),
      (this.kDi = i),
      (this.QDi = t),
      (this.TrackSourceInner = s),
      (this.IsOutOfBound = !1),
      (this.IsInAoiRange = !1),
      (this.FDi = Vector_1.Vector.Create()),
      (this.WorldPositionVector = Vector_1.Vector.Create()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.HDi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.jDi,
      );
  }
  get LogicWorldScale() {
    return this.pta;
  }
  set LogicWorldScale(t) {
    this.pta = t;
  }
  get MarkScale() {
    return this.kDi;
  }
  get UiPosition() {
    return this.WorldPosition
      ? MapUtil_1.MapUtil.WorldPosition2UiPosition(this.WorldPosition, this.FDi)
      : Vector_1.Vector.ZeroVectorProxy;
  }
  get IsViewCreate() {
    return !!this.InnerView && this.InnerView.IsShowOrShowing;
  }
  $Di(t, e) {
    (e = e.Tuple), (t = t.Tuple);
    return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
  }
  get WorldPosition() {
    2 !== this.MapType &&
      this.TrackTarget instanceof Vector2D_1.Vector2D &&
      ((t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()),
      this.$Di(t, this.TrackTarget) *
        MapDefine_1.FLOAT_0_01 *
        MapDefine_1.FLOAT_0_01 <
        3600) &&
      !this.VDi &&
      ((t = MapUtil_1.MapUtil.WorldPosition2UiPosition(
        Vector_1.Vector.Create(this.TrackTarget.X, this.TrackTarget.Y, 0),
      )),
      (t = MapController_1.MapController.GetMarkPosition(t.X, -t.Y))
        ? this.UpdateCustomMapMarkPosition(t)
        : (this.TrackTarget = Vector_1.Vector.Create(
            this.TrackTarget.X,
            this.TrackTarget.Y,
            0,
          )));
    var t =
      this.MapId === ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(
      this.TrackTarget,
      !1,
      this.WorldPositionVector,
      t,
    );
  }
  UpdateCustomMapMarkPosition(t) {
    var e;
    9 === this.MarkType &&
      ((e = Vector_1.Vector.Create(t.X, -t.Y, t.Z)),
      (t = Vector_1.Vector.Create(t.X, t.Y, t.Z)),
      (e = MapUtil_1.MapUtil.UiPosition2WorldPosition(e)),
      (this.TrackTarget = e),
      MapController_1.MapController.UpdateCustomMapMarkPosition(this.MarkId, t),
      (e = Vector_1.Vector.Create()),
      this.TrackTarget.Multiply(MapDefine_1.FLOAT_0_01, e),
      ModelManager_1.ModelManager.MapModel.UpdateCustomMarkInfo(this.MarkId, e),
      ModelManager_1.ModelManager.TrackModel.UpdateTrackData(
        this.TrackSourceInner,
        this.MarkId,
        this.TrackTarget,
      ));
  }
  SetTrackData(t) {
    this.TrackTarget = t;
  }
  LogicUpdate(t) {
    this.OnUpdate(t), this.UpdateTrackState();
  }
  ViewUpdate(t, e = !1, i = !1) {
    this.InnerView?.OnUpdate(t, e, i);
  }
  async ViewUpdateAsync(t, e = !1) {
    await this.View?.LoadingPromise, this.InnerView?.OnUpdate(t, e);
  }
  Destroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TeleportStart,
      this.HDi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.jDi,
      ),
      (this.IsDestroy = !0),
      this.OnDestroy(),
      this.ClearView(!0),
      (this.QDi = void 0);
  }
  get IsInAoiRange() {
    return this.WDi;
  }
  set IsInAoiRange(t) {
    (this.WDi = t) ? this.YDi() : this.ClearView();
  }
  YDi() {
    this.View ||
      (this.IsCanShowView &&
        (this.IsTracked || this.IsInAoiRange) &&
        (this.OnCreateView(),
        this.InnerView && (this.InnerView.EnableActorPoolReleaseLog = !1),
        this.InnerView?.InitializeMarkItemViewAsync()));
  }
  ClearView(t = !1) {
    !this.InnerView ||
      (!t && (this.IsTracked || this.IsInAoiRange)) ||
      (this.InnerView.IsHideOrHiding ||
        this.InnerView.IsDestroyOrDestroying ||
        this.InnerView.Destroy(),
      (this.InnerView = void 0));
  }
  get TrackSource() {
    return this.TrackSourceInner;
  }
  get IsTracked() {
    return this.KDi;
  }
  set IsTracked(t) {
    var e = this.KDi;
    (this.KDi = t) && this.YDi(),
      e !== this.KDi && (t ? this.OnStartTrack() : this.OnEndTrack());
  }
  UpdateTrackState() {
    (this.IsCanShowView = this.CheckCanShowView()),
      (this.IsTracked = ModelManager_1.ModelManager.TrackModel.IsTracking(
        this.TrackSource,
        this.MarkId,
      )),
      (1 === this.MapType && !this.IsTracked) || (this.IsInAoiRange = !0);
  }
  OnStartTrack() {
    this.View?.OnStartTrack();
  }
  OnEndTrack() {
    this.View?.OnEndTrack();
  }
  OnUpdate(t) {}
  OnDestroy() {}
  get ViewRoot() {
    return this.QDi;
  }
  get View() {
    return this.InnerView;
  }
  get IconPath() {
    return this.xbt;
  }
  set IconPath(t) {
    this.xbt !== t && (this.xbt = t);
  }
  SetSelected(t) {
    this.InnerView && (this.View.IsSelected = t);
  }
  async GetRootItemAsync() {
    if (this.View)
      return (
        this.View.IsCreating && (await this.View.LoadingPromise),
        this.View.GetRootItem()
      );
  }
  GetTitleText() {}
  GetLocaleDesc() {}
  SetConfigScale(t) {
    this.ConfigScale = t;
  }
  get JDi() {
    return ModelManager_1.ModelManager.MapModel.GetMarkForceVisible(
      this.MarkType,
      this.MarkId,
    );
  }
  get IsCanShowViewIntermediately() {
    return this.XDi && this.JDi;
  }
  get IsCanShowView() {
    return this.IsCanShowViewIntermediately || this.IsCanShowViewFinally;
  }
  set IsCanShowView(t) {
    (this.XDi = t) && this.JDi && this.YDi();
  }
  CheckCanShowView() {
    return 2 === this.MapType;
  }
  GetShowScale() {
    var t = this.GetCurrentMapShowScale();
    return Math.max(0, t);
  }
  GetCurrentMapShowScale() {
    return 100 * ModelManager_1.ModelManager.WorldMapModel.MapScale - 100;
  }
  OnLevelSequenceStart(t) {
    ("ShowView" !== t && "HideView" !== t) || (this.IsCanShowViewFinally = !0);
  }
  OnLevelSequenceStop(t) {
    ("ShowView" !== t && "HideView" !== t) || (this.IsCanShowViewFinally = !1);
  }
}
exports.MarkItem = MarkItem;
//# sourceMappingURL=MarkItem.js.map
