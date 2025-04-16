"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskTrackedMarkItem = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("../../MapDefine"),
  MapUtil_1 = require("../../MapUtil"),
  ONE_HUNDRED = 100;
class TaskTrackedMarkItem {
  constructor(t, i) {
    if (
      ((this.MarkRange = 0),
      (this.RangeMarkShowDisUp = 0),
      (this.RangeMarkShowDisDown = 0),
      (this.RangeMarkShowDis = 0),
      (this.BtType = void 0),
      (this.TreeIncId = void 0),
      (this.TreeConfigId = 0),
      (this.Tree = void 0),
      (this.NodeId = 0),
      (this.TrackTarget = void 0),
      (this.MarkPointInfo = void 0),
      (this.Qza = !1),
      (this.ECt = 2),
      (this.NRi = !1),
      (this.ige = !1),
      (this.MarkPointInfo = t),
      (this.TrackTarget = t.TrackTarget),
      (this.NodeId = t.NodeId),
      (this.ECt = i),
      this.NodeId)
    ) {
      if (
        ((this.TreeIncId = t.TreeId),
        (this.Tree =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            this.TreeIncId,
          )),
        !this.Tree)
      )
        return;
      (this.BtType = this.Tree.BtType),
        (this.TreeConfigId = this.Tree.TreeConfigId);
      (i = this.Tree.GetNode(this.NodeId)),
        (i =
          (i?.TrackTarget &&
            i.TrackTarget.ZaxisViewRange &&
            ((this.RangeMarkShowDisUp =
              i.TrackTarget.ZaxisViewRange.Up / ONE_HUNDRED),
            (this.RangeMarkShowDisDown =
              -i.TrackTarget.ZaxisViewRange.Down / ONE_HUNDRED)),
          this.Tree.GetRangeMarkSize(this.NodeId))),
        (i =
          (i && (this.MarkRange = i / ONE_HUNDRED),
          this.Tree.GetRangeMarkShowDis(this.NodeId)));
      i && (this.RangeMarkShowDis = i / ONE_HUNDRED);
    } else
      (this.BtType = Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest),
        (this.TreeConfigId = t.TreeId);
    i = this.MarkRange;
    (this.NRi = 0 < i),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TaskRangeTrackStateChange,
        this.ECt,
        this.TreeIncId,
        this.MarkPointInfo.NodeId,
        this.MarkPointInfo.MarkId,
        !1,
      );
  }
  Update() {
    var t;
    this.NRi &&
      !this.TargetInDiffWorld() &&
      (t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()) &&
      this.HRi(t);
  }
  HRi(s) {
    if (this.NRi) {
      var h,
        r = this.RangeMarkShowDis,
        n = r + 2;
      let t = 0,
        i = !1,
        e = !0;
      (i =
        0 !== this.RangeMarkShowDisUp || 0 !== this.RangeMarkShowDisDown
          ? ((h = (s.Z - this.WorldPosition.Z) * MapDefine_1.FLOAT_0_01),
            (t =
              Vector_1.Vector.Dist2D(s, this.WorldPosition) *
              MapDefine_1.FLOAT_0_01),
            (e = h < this.RangeMarkShowDisUp && h > this.RangeMarkShowDisDown),
            t > r &&
              h > this.RangeMarkShowDisUp &&
              h < this.RangeMarkShowDisDown)
          : (t =
              Vector_1.Vector.Dist(s, this.WorldPosition) *
              MapDefine_1.FLOAT_0_01) > r),
        this.ige ? (this.vNa(!i), (this.ige = !1)) : this.vNa(t < n && e);
    }
  }
  get WorldPosition() {
    return MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(
      this.TrackTarget,
      !1,
      void 0,
      this.MarkPointInfo.MapId,
    );
  }
  get InstanceDungeonId() {
    if (this.Tree) return this.Tree.GetNodeDungeonId();
  }
  vNa(t) {
    this.NRi &&
      this.Qza !== t &&
      ((this.Qza = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TaskRangeTrackStateChange,
        this.ECt,
        this.TreeIncId,
        this.MarkPointInfo.NodeId,
        this.MarkPointInfo.MarkId,
        t,
      ));
  }
  TargetInDiffWorld() {
    var t, i;
    return (
      !!this.Tree &&
      ((t = this.Tree.GetNodeDungeonId()),
      (i = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      !(
        !ModelManager_1.ModelManager.WorldMapModel.IsPlayerInStoryInstanceDungeon() ||
        !this.AW_()
      ) || !0 === MapUtil_1.MapUtil.IsDungeonDiffWorld(i, t))
    );
  }
  AW_() {
    return (
      0 !== this.InstanceDungeonId &&
      void 0 !== this.InstanceDungeonId &&
      this.InstanceDungeonId !==
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
    );
  }
}
exports.TaskTrackedMarkItem = TaskTrackedMarkItem;
//# sourceMappingURL=TaskTrackedMarkItem.js.map
