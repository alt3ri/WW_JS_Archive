"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackMarkExpressController = exports.TrackVision = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterController_1 = require("../../../../NewWorld/Character/CharacterController"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MapDefine_1 = require("../../../Map/MapDefine"),
  TrackController_1 = require("../../../Track/TrackController"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
  INVALID_MARKID = 0;
class TrackVision {
  constructor() {
    (this.VisionOwnerId = 0),
      (this.DungeonId = 0),
      (this.ConfigIndex = 0),
      (this.EntityId = 0);
  }
}
exports.TrackVision = TrackVision;
class TrackMarkExpressController {
  constructor(t) {
    (this.JQt = void 0),
      (this.Yre = void 0),
      (this.Yre = t),
      (this.JQt = new Map());
  }
  Clear() {
    for (var [, t] of this.JQt) t.Destroy();
    this.JQt.clear();
  }
  NodeTrackMarkStart(t, e, i, s) {
    this.FQt(t, e, i).OnNodeStart(s);
  }
  NodeTrackMarkEnd(t) {
    this.GetNodeTrackMarkCreator(t)?.OnNodeEnd(), this.JQt.delete(t);
  }
  FQt(t, e, i) {
    var s = this.GetNodeTrackMarkCreator(t);
    return (
      s ||
      ((s = new NodeTrackMark(e, e.TreeIncId, e.TreeConfigId, t)).Init(i),
      this.JQt.set(t, s),
      s)
    );
  }
  GetNodeTrackMarkCreator(t) {
    return this.JQt.get(t);
  }
  DestroyNodeTrackMarkCreator(t) {
    this.GetNodeTrackMarkCreator(t)?.Destroy(), this.JQt.delete(t);
  }
  EnableTrack(t) {
    for (var [, e] of this.JQt) e.EnableTrack(t);
  }
  CreateMapMarks() {
    for (var [, t] of this.JQt) t.CreateMapMarks();
  }
  UpdateTrackMarkExpression(t, e, i) {
    switch (i) {
      case Protocol_1.Aki.Protocol.DNs.t5n:
        var s;
        "ChildQuest" !== e.NodeType &&
          (s = e.TrackTarget) &&
          e.ContainTag(0) &&
          this.NodeTrackMarkStart(e.NodeId, t, s, t.IsOccupied);
        break;
      case Protocol_1.Aki.Protocol.DNs.Proto_CompletedSuccess:
      case Protocol_1.Aki.Protocol.DNs.Proto_CompletedFailed:
        ("ChildQuest" === e.NodeType && e.IsFinished) ||
          this.NodeTrackMarkEnd(e.NodeId);
        break;
      case Protocol_1.Aki.Protocol.DNs.Proto_Destroy:
        this.DestroyNodeTrackMarkCreator(e.NodeId);
    }
  }
  OnBtApplyExpressionOccupation(t) {
    if (!t) for (var [, e] of this.JQt) e.OnExpressOccupied();
  }
  OnBtReleaseExpressionOccupation(t) {
    if (!t) for (var [, e] of this.JQt) e.OnExpressOccupationRelease();
  }
  OnSuspend(t) {
    this.OnBtApplyExpressionOccupation(!1);
  }
  OnCancelSuspend() {
    this.Yre.IsOccupied || this.OnBtReleaseExpressionOccupation(!1);
  }
}
exports.TrackMarkExpressController = TrackMarkExpressController;
class NodeTrackMark {
  constructor(t, e, i, s) {
    (this.zQt = void 0),
      (this.TrackEffectOption = void 0),
      (this.ZQt = void 0),
      (this.MarkRange = 0),
      (this.RangeMarkShowDis = 0),
      (this.$mt = BigInt(0)),
      (this.Yut = 0),
      (this.Jut = 0),
      (this.eXt = void 0),
      (this.tXt = void 0),
      (this.iXt = void 0),
      (this.oXt = void 0),
      (this.rXt = !1),
      (this.nXt = !1),
      (this.sXt = (t, e) => {
        this.ZQt?.size &&
          (t = this.ZQt.get(t)) &&
          (EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
            this.aXt,
          ) ||
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
              this.aXt,
            ),
          this.eXt?.IsOccupied ||
            (this.eXt?.IsTracking &&
              ((t.EntityId = e),
              (e = this.hXt(t.DungeonId, t, "CaptureVisions")),
              this.oXt.set(t.ConfigIndex, e),
              ModelManager_1.ModelManager.MapModel.SetTrackMark(
                this.MarkType,
                e,
                !0,
              ))));
      }),
      (this.aXt = (t) => {
        var e;
        this.ZQt?.size &&
          (e = this.ZQt.get(t)) &&
          (this.ZQt.delete(t),
          this.ZQt.size ||
            (EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
              this.aXt,
            ) ||
              EventSystem_1.EventSystem.Remove(
                EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
                this.aXt,
              ),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
              this.sXt,
            )) ||
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
              this.sXt,
            ),
          (t = this.oXt.get(e.ConfigIndex)),
          this.iXt.set(e.ConfigIndex, !0),
          t) &&
          (this.lXt(t), this.oXt.delete(e.ConfigIndex));
      }),
      (this.egt = (t, e, i, s, r) => {
        e === this.$mt &&
          i === this.Jut &&
          (this.tXt.set(s, r),
          this.DefaultMapMarkId
            ? (i = this.tXt.get(this.DefaultMapMarkId)) !==
                this.eXt.ContainTag(12) &&
              (i ? this.eXt.AddTag(12) : this.eXt.RemoveTag(12),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RangeTrackStateChanged,
                e,
              ))
            : this.eXt.RemoveTag(12));
      }),
      (this.$mt = e),
      (this.Yut = i),
      (this.Jut = s),
      (this.eXt = t),
      (this.oXt = new Map()),
      (this.tXt = new Map()),
      (this.iXt = new Map());
  }
  get TaskMarkTableId() {
    return this.eXt.TaskMarkTableId;
  }
  get MarkType() {
    return this.eXt.MarkType;
  }
  get TrackSource() {
    return this.eXt.TrackSource;
  }
  get DungeonId() {
    return this.eXt.DungeonId;
  }
  get DefaultMapMarkId() {
    return this.oXt.get(0);
  }
  Init(t) {
    switch (((this.zQt = []), (this.ZQt = new Map()), t.TrackType.Type)) {
      case "Locations":
        for (const i of t.TrackType.Locations)
          this.zQt.push(Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0));
        break;
      case "Entities":
        for (const s of t.TrackType.EntityIds) this.zQt.push(s);
        break;
      case "CaptureVisions":
        for (const r of t.TrackType.VisionDropEntities) {
          var e = new TrackVision();
          (e.VisionOwnerId = r), this.zQt.push(e);
        }
    }
    (this.TrackEffectOption = t.EffectOption),
      (this.MarkRange = t.Range ?? 0),
      (this.RangeMarkShowDis = t.ViewRange ?? 1.3 * t.Range),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TaskRangeTrackStateChange,
        this.egt,
      );
  }
  Destroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TaskRangeTrackStateChange,
      this.egt,
    ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
        this.aXt,
      ) ||
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
          this.aXt,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.sXt,
      ) ||
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
          this.sXt,
        ),
      this._Xt(),
      (this.oXt = void 0),
      this.ZQt?.clear(),
      (this.ZQt = void 0),
      this.zQt?.splice(0, this.zQt.length),
      (this.zQt = void 0);
  }
  OnNodeStart(t) {
    t ||
      ((this.rXt = !0),
      this.eXt.MapMarkResident && this.CreateMapMarks(),
      this.eXt.IsTracking && this.EnableTrack(!0));
  }
  OnNodeEnd() {
    this._Xt(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TaskRangeTrackStateChange,
        this.egt,
      ),
      (this.rXt = !1);
  }
  OnNodeProgressChanged(i) {
    if (this.zQt && i)
      for (let e = 0; e < this.zQt.length; e++) {
        const r = this.zQt[e];
        var s = i.findIndex((t) => t === r);
        let t = this.oXt.get(e);
        s < 0
          ? (this.iXt.delete(e),
            this.nXt &&
              !t &&
              ((t = this.uXt(e)), this.eXt.IsTracking) &&
              ModelManager_1.ModelManager.MapModel.SetTrackMark(
                this.MarkType,
                t,
                !0,
              ))
          : (this.iXt.set(e, !0), t && (this.lXt(t), this.oXt.delete(e)));
      }
  }
  CreateMapMarks() {
    this.zQt.forEach((t, e) => {
      this.uXt(e);
    }),
      (this.nXt = !0);
  }
  uXt(t) {
    if (!this.iXt.get(t) && this.zQt && !(this.zQt.length <= t)) {
      var e = this.cXt(0, this.zQt[t]);
      if (e) {
        var i = e[0],
          e = e[1],
          s = this.oXt.get(t);
        if (s) {
          var r = ModelManager_1.ModelManager.MapModel.GetMark(
            this.MarkType,
            s,
          );
          if (this.mXt(r, i, e)) return s;
          this.lXt(r.MarkId), this.oXt.delete(t);
        }
        if (e instanceof Vector_1.Vector) {
          const a = this.hXt(i, e, "Locations");
          return this.oXt.set(t, a), a;
        }
        if (e instanceof TrackVision) {
          s = ModelManager_1.ModelManager.VisionCaptureModel?.GetVisionCapture(
            e.VisionOwnerId,
          );
          if (s) {
            e.EntityId = s;
            const a = this.hXt(i, e, "CaptureVisions");
            return (
              this.oXt.set(t, a),
              this.ZQt?.set(e.VisionOwnerId, e),
              EventSystem_1.EventSystem.Has(
                EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
                this.aXt,
              ) ||
                EventSystem_1.EventSystem.Add(
                  EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
                  this.aXt,
                ),
              a
            );
          }
          (e.DungeonId = i),
            (e.ConfigIndex = t),
            this.ZQt?.set(e.VisionOwnerId, e),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
              this.sXt,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
                this.sXt,
              );
        } else {
          r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i);
          if (r) {
            if (
              ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
                e,
                r.MapConfigId,
              )
            ) {
              const a = this.hXt(i, e, "Entities");
              return this.oXt.set(t, a), a;
            }
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                19,
                "追踪实体数据为空，请检查本地配置",
                ["行为树Id", this.Yut],
                ["节点Id", this.Jut],
                ["实体Id", e],
                ["副本Id", i],
              );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                19,
                "GeneralLogicTree：找不到副本的配置",
                ["行为树Id", this.Yut],
                ["节点Id", this.Jut],
                ["副本Id", i],
              );
        }
      }
    }
  }
  hXt(t, e, i) {
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            19,
            "添加追踪标记时，追踪坐标为空，请检查配置",
            ["行为树Id", this.Yut],
            ["节点Id", this.Jut],
          ),
        INVALID_MARKID
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Quest",
        19,
        "行为树添加追踪标记",
        ["行为树Id", this.Yut],
        ["节点Id", this.Jut],
        ["追踪目标副本Id", t],
        ["追踪目标", e],
      );
    t = new MapDefine_1.QuestMarkCreateInfo(
      t,
      this.$mt,
      this.Jut,
      this.dXt(e),
      this.TaskMarkTableId,
      this.MarkType,
      0,
      this.TrackSource,
    );
    return ModelManager_1.ModelManager.MapModel.CreateMapMark(t);
  }
  dXt(t) {
    return t instanceof TrackVision ? t.EntityId : t;
  }
  _Xt() {
    this.CXt(!1);
    for (var [, t] of this.oXt)
      ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, t);
    this.oXt.clear(),
      (this.nXt = !1),
      this.tXt.clear(),
      this.eXt.RemoveTag(12),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RangeTrackStateChanged,
        this.$mt,
      );
  }
  lXt(t) {
    ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, t),
      TrackController_1.TrackController.EndTrack(this.TrackSource, t);
  }
  EnableTrack(t) {
    this.rXt &&
      (t
        ? (this.CreateMapMarks(),
          this.CXt(!0),
          this.eXt?.IsOccupied && this.OnExpressOccupied())
        : this.eXt.MapMarkResident
          ? this.CXt(!1)
          : this._Xt());
  }
  CXt(t) {
    for (var [i, s] of this.oXt) {
      var r = ModelManager_1.ModelManager.MapModel.GetMark(this.MarkType, s);
      if (r)
        if (t) {
          (i = this.zQt[i]), (i = this.cXt(1, i));
          if (i) {
            let t = void 0,
              e = !1;
            "Nearest" === this.eXt.TrackViewModel && (t = this.Yut);
            var a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
                this.Yut,
              ),
              a =
                (a && (e = a.AutoHideTrackMark),
                {
                  TrackSource: this.TrackSource,
                  Id: s,
                  IconPath:
                    ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
                      r.MarkConfigId,
                    ).MarkPic,
                  TrackTarget: this.dXt(i[1]),
                  ShowGroupId: t,
                  AutoHideTrack: e,
                  IsInTrackRange: this.eXt.ContainTag(12),
                  IsSubTrack: this.eXt.IsNeedScaledTrackMark(this.Jut),
                });
            TrackController_1.TrackController.StartTrack(a);
          }
        } else TrackController_1.TrackController.EndTrack(this.TrackSource, s);
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            19,
            "BehaviorTree:创建追踪标记时找不到地图标记数据",
            ["行为树Id", this.Yut],
            ["节点Id", this.Jut],
            ["markId", s],
          );
    }
  }
  cXt(i, s) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r);
    if (a) {
      var o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.DungeonId,
      );
      if (o) {
        if (r === this.DungeonId)
          return this.eXt.BtType !==
            Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest ||
            13 === a.InstSubType ||
            0 !== i ||
            a.EntranceEntities?.length
            ? [r, s]
            : void 0;
        var h = a.InstSubType,
          n = o.InstSubType;
        let t = void 0,
          e = 0;
        switch (h) {
          case 13:
            13 !== n &&
              (_ = o.EntranceEntities)?.length &&
              ((t = _[0].EntranceEntityId), (e = _[0].DungeonId));
            break;
          case 12:
            if (0 === i) {
              if (13 !== n) {
                var _ = o.EntranceEntities;
                if (!_?.length) break;
                (t = _[0].EntranceEntityId), (e = _[0].DungeonId);
                break;
              }
              (t = s), (e = this.DungeonId);
            } else if (1 === i) {
              if (!a.ExitEntities?.length) break;
              (t = a.ExitEntities[0]), (e = r);
            }
            break;
          default:
            if (1 !== i)
              if (13 === n) (e = this.DungeonId), (t = s);
              else {
                _ = o.EntranceEntities;
                if (!_?.length) break;
                (e = _[0].DungeonId), (t = _[0].EntranceEntityId);
              }
        }
        return t && e ? [e, t] : void 0;
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GeneralLogicTree",
          19,
          "GeneralLogicTree：找不到追踪目标副本的配置",
          ["行为树Id", this.Yut],
          ["副本Id", this.DungeonId],
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GeneralLogicTree",
          19,
          "GeneralLogicTree：找不到当前副本的配置",
          ["行为树Id", this.Yut],
          ["副本Id", r],
        );
  }
  GetTrackPosition(e = !1) {
    let i = void 0;
    if (
      (i =
        (void 0 !== this.DefaultMapMarkId &&
          ((r = ModelManager_1.ModelManager.TrackModel.GetTrackData(
            this.TrackSource,
            this.DefaultMapMarkId,
          )),
          (i = r?.TrackTarget))) ||
        this.gXt())
    ) {
      if (i instanceof Vector_1.Vector) return i;
      let t = void 0;
      if (i instanceof TrackVision)
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i.EntityId);
      else if (
        !(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i))
      )
        return ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(
          i,
        ) || e
          ? GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetEntityConfigPosition(
              i,
            )
          : void 0;
      if (t) {
        var s,
          r = CharacterController_1.CharacterController.GetActorComponent(t);
        if (r && ObjectUtils_1.ObjectUtils.IsValid(r.Owner))
          return (
            (e = Vector_1.Vector.Create(r.ActorLocationProxy)),
            (s = t.Entity.GetComponent(0)) &&
              ((s = s.GetPbModelConfig())?.TrackHeight
                ? (e.Z += s.TrackHeight)
                : (0, RegisterComponent_1.isComponentInstance)(r, 3) &&
                  (e.Z += r.ScaledHalfHeight)),
            e
          );
      }
    }
  }
  GetDefaultMark() {
    return this.DefaultMapMarkId;
  }
  gXt() {
    var t;
    if (this.zQt && this.zQt.length)
      return (
        (t = this.zQt.find((t, e) => !this.iXt.get(e))), this.cXt(1, t)?.[1]
      );
  }
  mXt(t, e, i) {
    return (
      t.MapId === e &&
      (t.TrackTarget instanceof Vector_1.Vector && i instanceof Vector_1.Vector
        ? t.TrackTarget.Equality(i)
        : t.TrackTarget === i)
    );
  }
  OnExpressOccupied() {
    if (0 !== this.oXt.size)
      for (var [, t] of this.oXt)
        TrackController_1.TrackController.SetTrackMarkOccupied(
          this.TrackSource,
          t,
          !0,
        ),
          MapController_1.MapController.ForceSetMarkVisible(
            this.MarkType,
            t,
            !1,
          );
  }
  OnExpressOccupationRelease() {
    if (this.rXt) {
      if (0 !== this.oXt.size)
        for (var [, t] of this.oXt)
          ModelManager_1.ModelManager.TrackModel.IsTracking(
            this.TrackSource,
            t,
          ) &&
            TrackController_1.TrackController.SetTrackMarkOccupied(
              this.TrackSource,
              t,
              !1,
            ),
            MapController_1.MapController.ForceSetMarkVisible(
              this.MarkType,
              t,
              !0,
            );
    } else this.OnNodeStart(!1);
  }
}
//# sourceMappingURL=TrackMarkExpressController.js.map
