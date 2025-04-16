"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskMarkItemView = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("../../MapDefine"),
  TaskMarkItemRangeHandle_1 = require("./Handles/TaskMarkItemRangeHandle"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class TaskMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor() {
    super(...arguments),
      (this.QuestStepId = 0),
      (this.NRi = !1),
      (this.ORi = !1),
      (this.ige = !1);
  }
  OnInitialize() {
    super.OnInitialize(), this.bl();
  }
  bl() {
    this.VRi(), this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnReset() {
    super.OnReset(),
      this.GetSprite(1).SetUIActive(!0),
      this.MarkItemRangeHandle.SetVisible(!1),
      this.bl();
  }
  VRi() {
    this.ORi = !1;
    var e = this.Holder.MarkItemEntity.Resource.RangeSize;
    (this.NRi = 0 < e),
      e &&
        (this.HRi(
          GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ??
            Vector_1.Vector.ZeroVectorProxy,
        ),
        (this.ige = !0));
  }
  CreateRangeHandle(e) {
    return new TaskMarkItemRangeHandle_1.TaskMarkItemRangeHandle(e);
  }
  OnSafeUpdate(e, t = !1) {
    this.HRi(e, t);
  }
  IsRangeImageActive() {
    return this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(2);
  }
  HRi(s, e = !1) {
    if (this.NRi)
      if (this.Holder.IsCanShowView) {
        var r,
          a = this.Holder,
          n = a.RangeMarkShowDis,
          h = n + 2;
        let e = 0,
          t = !1,
          i = !0;
        (t =
          0 !== a.RangeMarkShowDisUp || 0 !== a.RangeMarkShowDisDown
            ? ((r =
                (s.Z - this.Holder.WorldPosition.Z) * MapDefine_1.FLOAT_0_01),
              (e =
                Vector_1.Vector.Dist2D(s, this.Holder.WorldPosition) *
                MapDefine_1.FLOAT_0_01),
              (i = r < a.RangeMarkShowDisUp && r > a.RangeMarkShowDisDown),
              e > n && r > a.RangeMarkShowDisUp && r < a.RangeMarkShowDisDown)
            : (e =
                Vector_1.Vector.Dist(s, this.Holder.WorldPosition) *
                MapDefine_1.FLOAT_0_01) > n),
          this.MarkItemTrackHandle.SetVisible(t && this.Holder.IsTracked),
          this.ige ? (this.HQl(!t), (this.ige = !1)) : this.HQl(e < h && i);
      } else this.HQl(!1);
    else this.MarkItemTrackHandle.SetVisible(this.Holder.IsTracked && !e);
  }
  HQl(e) {
    var t =
      this.Holder?.RawInstanceDungeonId !==
      ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    this.jRi(e && !t);
  }
  jRi(e) {
    var t;
    this.NRi &&
      this.ORi !== e &&
      ((this.ORi = e),
      this.MarkItemRangeHandle.SetVisible(e),
      this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewStateDirty(2) &&
        1 === this.Holder.MapType &&
        ((t = this.Holder),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TaskRangeTrackStateChange,
          t.TrackSource,
          t.TreeIncId,
          t.NodeId,
          t.MarkId,
          e,
        )),
      (t = this.Holder.IsOutOfBound || !e),
      this.GetSprite(1).SetUIActive(t),
      (this.IsShowIcon = t));
  }
}
exports.TaskMarkItemView = TaskMarkItemView;
//# sourceMappingURL=TaskMarkItemView.js.map
