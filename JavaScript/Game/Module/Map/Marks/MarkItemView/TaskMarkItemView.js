"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskMarkItemView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("../../MapDefine"),
  MarkRangeImageComponent_1 = require("./Components/MarkRangeImageComponent"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class TaskMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor() {
    super(...arguments),
      (this.QuestStepId = 0),
      (this.NDi = !1),
      (this.ODi = !1),
      (this.ige = !1),
      (this.kDi = void 0),
      (this.FDi = void 0);
  }
  OnInitialize() {
    super.OnInitialize(),
      this.VDi(),
      this.OnIconPathChanged(this.Holder.IconPath);
  }
  VDi() {
    var e = this.Holder.MarkRange;
    (this.NDi = 0 < e),
      e &&
        ((this.kDi = new UE.Vector2D(
          this.Holder.UiPosition.X,
          this.Holder.UiPosition.Y,
        )),
        this.HDi(
          GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ??
            Vector_1.Vector.ZeroVectorProxy,
        ),
        (this.ige = !0));
  }
  async GetRangeComponentAsync() {
    var e;
    return (
      this.RangeComponentInternal ||
        ((this.RangeComponentInternal =
          new MarkRangeImageComponent_1.MarkRangeImageComponent()),
        await this.RangeComponentInternal.CreateThenShowByResourceIdAsync(
          "UiItem_MarkArea_Prefab",
          this.RootItem.GetParentAsUIItem(),
          !0,
        ),
        this.RangeComponentInternal?.GetRootItem().SetAnchorOffset(
          this.RootItem.GetAnchorOffset(),
        ),
        this.RangeComponentInternal?.GetRootItem().SetAsFirstHierarchy(),
        this.SetScale(this.Holder.MarkScale),
        (e = this.Holder.MarkRange),
        this.RangeComponentInternal.RangeImage.SetWidth(2 * e),
        this.RangeComponentInternal.RangeImage.SetHeight(2 * e)),
      this.RangeComponentInternal
    );
  }
  OnUpdate(e, t = !1) {
    void 0 === this.Holder
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Map",
          35,
          "Holder is undefined in TaskMarkItemView.OnUpdate()",
        )
      : (super.OnUpdate(e, t), this.HDi(e, t));
  }
  IsRangeImageActive() {
    return this.FDi;
  }
  HDi(s, e = 0) {
    if (this.NDi)
      if (this.Holder.IsCanShowView) {
        var r,
          h = this.Holder,
          n = h.RangeMarkShowDis,
          a = n + 2;
        let e = 0,
          t = !1,
          i = !0;
        (t =
          0 !== h.RangeMarkShowDisUp || 0 !== h.RangeMarkShowDisDown
            ? ((r =
                (s.Z - this.Holder.WorldPosition.Z) * MapDefine_1.FLOAT_0_01),
              (e =
                Vector_1.Vector.Dist2D(s, this.Holder.WorldPosition) *
                MapDefine_1.FLOAT_0_01),
              (i = r < h.RangeMarkShowDisUp && r > h.RangeMarkShowDisDown),
              e > n && r > h.RangeMarkShowDisUp && r < h.RangeMarkShowDisDown)
            : (e =
                Vector_1.Vector.Dist(s, this.Holder.WorldPosition) *
                MapDefine_1.FLOAT_0_01) > n),
          this.GetTrackComponentAsync().then((e) => {
            e.SetActive(t && this.Holder.IsTracked);
          }),
          this.ige ? (this.jDi(!t), (this.ige = !1)) : this.jDi(e < a && i);
      } else this.jDi(!1);
  }
  jDi(e) {
    var t;
    this.NDi &&
      this.ODi !== e &&
      ((this.ODi = e),
      (void 0 !== this.FDi && this.FDi === e) ||
        (this.GetRangeComponentAsync().then((e) => {
          e.SetActive(this.FDi),
            this.RangeComponentInternal?.GetRootItem()?.SetAnchorOffset(
              this.kDi,
            );
        }),
        (this.FDi = e),
        1 === this.Holder.MapType &&
          ((t = this.Holder),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TaskRangeTrackStateChange,
            t.TrackSource,
            t.TreeIncId,
            t.NodeId,
            t.MarkId,
            e,
          ))),
      (t = this.Holder.IsOutOfBound || !e),
      this.GetSprite(1).SetUIActive(t),
      (this.IsShowIcon = t));
  }
  OnBeforeDestroy() {
    this.RangeComponentInternal?.Destroy(), super.OnBeforeDestroy();
  }
}
exports.TaskMarkItemView = TaskMarkItemView;
//# sourceMappingURL=TaskMarkItemView.js.map
