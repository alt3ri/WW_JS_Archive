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
    (this.JKt = void 0),
      (this.Yre = void 0),
      (this.Yre = t),
      (this.JKt = new Map());
  }
  Clear() {
    for (var [, t] of this.JKt) t.Destroy();
    this.JKt.clear();
  }
  NodeTrackMarkStart(t, e, i, s) {
    this.FKt(t, e, i).OnNodeStart(s);
  }
  NodeTrackMarkEnd(t) {
    this.GetNodeTrackMarkCreator(t)?.OnNodeEnd(), this.JKt.delete(t);
  }
  FKt(t, e, i) {
    var s = this.GetNodeTrackMarkCreator(t);
    return (
      s ||
      ((s = new NodeTrackMark(e, e.TreeIncId, e.TreeConfigId, t)).Init(i),
      this.JKt.set(t, s),
      s)
    );
  }
  GetNodeTrackMarkCreator(t) {
    return this.JKt.get(t);
  }
  DestroyNodeTrackMarkCreator(t) {
    this.GetNodeTrackMarkCreator(t)?.Destroy(), this.JKt.delete(t);
  }
  EnableTrack(t) {
    for (var [, e] of this.JKt) e.EnableTrack(t);
  }
  CreateMapMarks() {
    for (var [, t] of this.JKt) t.CreateMapMarks();
  }
  UpdateTrackMarkExpression(t, e, i) {
    switch (i) {
      case Protocol_1.Aki.Protocol.N2s.Lkn:
        var s;
        "ChildQuest" !== e.NodeType &&
          (s = e.TrackTarget) &&
          e.ContainTag(0) &&
          this.NodeTrackMarkStart(e.NodeId, t, s, t.IsOccupied);
        break;
      case Protocol_1.Aki.Protocol.N2s.Proto_CompletedSuccess:
      case Protocol_1.Aki.Protocol.N2s.Proto_CompletedFailed:
        ("ChildQuest" === e.NodeType && e.IsFinished) ||
          this.NodeTrackMarkEnd(e.NodeId);
        break;
      case Protocol_1.Aki.Protocol.N2s.Proto_Destroy:
        this.DestroyNodeTrackMarkCreator(e.NodeId);
    }
  }
  OnBtApplyExpressionOccupation(t) {
    if (!t) for (var [, e] of this.JKt) e.OnExpressOccupied();
  }
  OnBtReleaseExpressionOccupation(t) {
    if (!t) for (var [, e] of this.JKt) e.OnExpressOccupationRelease();
  }
  OnSuspend(t) {
    1 === t && this.OnBtApplyExpressionOccupation(!1);
  }
  OnCancelSuspend() {
    this.Yre.IsOccupied || this.OnBtReleaseExpressionOccupation(!1);
  }
}
exports.TrackMarkExpressController = TrackMarkExpressController;
class NodeTrackMark {
  constructor(t, e, i, s) {
    (this.zKt = void 0),
      (this.TrackEffectOption = void 0),
      (this.ZKt = void 0),
      (this.MarkRange = 0),
      (this.RangeMarkShowDis = 0),
      (this.Gct = BigInt(0)),
      (this.B_t = 0),
      (this.b_t = 0),
      (this.eQt = void 0),
      (this.tQt = void 0),
      (this.iQt = void 0),
      (this.oQt = void 0),
      (this.rQt = !1),
      (this.nQt = !1),
      (this.sQt = (t, e) => {
        this.ZKt?.size &&
          (t = this.ZKt.get(t)) &&
          (EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
            this.aQt,
          ) ||
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
              this.aQt,
            ),
          this.eQt?.IsOccupied ||
            (this.eQt?.IsTracking &&
              ((t.EntityId = e),
              (e = this.hQt(t.DungeonId, t, "CaptureVisions")),
              this.oQt.set(t.ConfigIndex, e),
              ModelManager_1.ModelManager.MapModel.SetTrackMark(
                this.MarkType,
                e,
                !0,
              ))));
      }),
      (this.aQt = (t) => {
        var e;
        this.ZKt?.size &&
          (e = this.ZKt.get(t)) &&
          (this.ZKt.delete(t),
          this.ZKt.size ||
            (EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
              this.aQt,
            ) ||
              EventSystem_1.EventSystem.Remove(
                EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
                this.aQt,
              ),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
              this.sQt,
            )) ||
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
              this.sQt,
            ),
          (t = this.oQt.get(e.ConfigIndex)),
          this.iQt.set(e.ConfigIndex, !0),
          t) &&
          (this.lQt(t), this.oQt.delete(e.ConfigIndex));
      }),
      (this.Vdt = (t, e, i, s, r) => {
        e === this.Gct &&
          i === this.b_t &&
          (this.tQt.set(s, r),
          this.DefaultMapMarkId
            ? (i = this.tQt.get(this.DefaultMapMarkId)) !==
                this.eQt.ContainTag(11) &&
              (i ? this.eQt.AddTag(11) : this.eQt.RemoveTag(11),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RangeTrackStateChanged,
                e,
              ))
            : this.eQt.RemoveTag(11));
      }),
      (this.Gct = e),
      (this.B_t = i),
      (this.b_t = s),
      (this.eQt = t),
      (this.oQt = new Map()),
      (this.tQt = new Map()),
      (this.iQt = new Map());
  }
  get TaskMarkTableId() {
    return this.eQt.TaskMarkTableId;
  }
  get MarkType() {
    return this.eQt.MarkType;
  }
  get TrackSource() {
    return this.eQt.TrackSource;
  }
  get DungeonId() {
    return this.eQt.DungeonId;
  }
  get DefaultMapMarkId() {
    return this.oQt.get(0);
  }
  Init(t) {
    switch (((this.zKt = []), (this.ZKt = new Map()), t.TrackType.Type)) {
      case "Locations":
        for (const i of t.TrackType.Locations)
          this.zKt.push(Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0));
        break;
      case "Entities":
        for (const s of t.TrackType.EntityIds) this.zKt.push(s);
        break;
      case "CaptureVisions":
        for (const r of t.TrackType.VisionDropEntities) {
          var e = new TrackVision();
          (e.VisionOwnerId = r), this.zKt.push(e);
        }
    }
    (this.TrackEffectOption = t.EffectOption),
      (this.MarkRange = t.Range ?? 0),
      (this.RangeMarkShowDis = t.ViewRange ?? 1.3 * t.Range),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TaskRangeTrackStateChange,
        this.Vdt,
      );
  }
  Destroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TaskRangeTrackStateChange,
      this.Vdt,
    ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
        this.aQt,
      ) ||
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
          this.aQt,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
        this.sQt,
      ) ||
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
          this.sQt,
        ),
      this._Qt(),
      (this.oQt = void 0),
      this.ZKt?.clear(),
      (this.ZKt = void 0),
      this.zKt?.splice(0, this.zKt.length),
      (this.zKt = void 0);
  }
  OnNodeStart(t) {
    t ||
      ((this.rQt = !0),
      this.eQt.MapMarkResident && this.CreateMapMarks(),
      this.eQt.IsTracking && this.EnableTrack(!0));
  }
  OnNodeEnd() {
    this._Qt(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TaskRangeTrackStateChange,
        this.Vdt,
      ),
      (this.rQt = !1);
  }
  OnNodeProgressChanged(i) {
    if (this.zKt && i)
      for (let e = 0; e < this.zKt.length; e++) {
        const r = this.zKt[e];
        var s = i.findIndex((t) => t === r);
        let t = this.oQt.get(e);
        s < 0
          ? (this.iQt.delete(e),
            this.nQt &&
              !t &&
              ((t = this.uQt(e)), this.eQt.IsTracking) &&
              ModelManager_1.ModelManager.MapModel.SetTrackMark(
                this.MarkType,
                t,
                !0,
              ))
          : (this.iQt.set(e, !0), t && (this.lQt(t), this.oQt.delete(e)));
      }
  }
  CreateMapMarks() {
    this.zKt.forEach((t, e) => {
      this.uQt(e);
    }),
      (this.nQt = !0);
  }
  uQt(t) {
    if (!this.iQt.get(t) && this.zKt && !(this.zKt.length <= t)) {
      var e = this.cQt(0, this.zKt[t]);
      if (e) {
        var i = e[0],
          e = e[1],
          s = this.oQt.get(t);
        if (s) {
          var r = ModelManager_1.ModelManager.MapModel.GetMark(
            this.MarkType,
            s,
          );
          if (this.mQt(r, i, e)) return s;
          this.lQt(r.MarkId), this.oQt.delete(t);
        }
        if (e instanceof Vector_1.Vector) {
          const a = this.hQt(i, e, "Locations");
          return this.oQt.set(t, a), a;
        }
        if (e instanceof TrackVision) {
          s = ModelManager_1.ModelManager.VisionCaptureModel?.GetVisionCapture(
            e.VisionOwnerId,
          );
          if (s) {
            e.EntityId = s;
            const a = this.hQt(i, e, "CaptureVisions");
            return (
              this.oQt.set(t, a),
              this.ZKt?.set(e.VisionOwnerId, e),
              EventSystem_1.EventSystem.Has(
                EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
                this.aQt,
              ) ||
                EventSystem_1.EventSystem.Add(
                  EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove,
                  this.aQt,
                ),
              a
            );
          }
          (e.DungeonId = i),
            (e.ConfigIndex = t),
            this.ZKt?.set(e.VisionOwnerId, e),
            EventSystem_1.EventSystem.Has(
              EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
              this.sQt,
            ) ||
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd,
                this.sQt,
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
              const a = this.hQt(i, e, "Entities");
              return this.oQt.set(t, a), a;
            }
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                19,
                "追踪实体数据为空，请检查本地配置",
                ["行为树Id", this.B_t],
                ["节点Id", this.b_t],
                ["实体Id", e],
                ["副本Id", i],
              );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                19,
                "GeneralLogicTree：找不到副本的配置",
                ["行为树Id", this.B_t],
                ["节点Id", this.b_t],
                ["副本Id", i],
              );
        }
      }
    }
  }
  hQt(t, e, i) {
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            19,
            "添加追踪标记时，追踪坐标为空，请检查配置",
            ["行为树Id", this.B_t],
            ["节点Id", this.b_t],
          ),
        INVALID_MARKID
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Quest",
        19,
        "行为树添加追踪标记",
        ["行为树Id", this.B_t],
        ["节点Id", this.b_t],
        ["追踪目标副本Id", t],
        ["追踪目标", e],
      );
    t = new MapDefine_1.QuestMarkCreateInfo(
      t,
      this.Gct,
      this.b_t,
      this.dQt(e),
      this.TaskMarkTableId,
      this.MarkType,
      0,
      this.TrackSource,
    );
    return ModelManager_1.ModelManager.MapModel.CreateMapMark(t);
  }
  dQt(t) {
    return t instanceof TrackVision ? t.EntityId : t;
  }
  _Qt() {
    this.CQt(!1);
    for (var [, t] of this.oQt)
      ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, t);
    this.oQt.clear(),
      (this.nQt = !1),
      this.tQt.clear(),
      this.eQt.RemoveTag(11),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RangeTrackStateChanged,
        this.Gct,
      );
  }
  lQt(t) {
    ModelManager_1.ModelManager.MapModel.RemoveMapMark(this.MarkType, t),
      TrackController_1.TrackController.EndTrack(this.TrackSource, t);
  }
  EnableTrack(t) {
    this.rQt &&
      (t
        ? (this.CreateMapMarks(),
          this.CQt(!0),
          this.eQt?.IsOccupied && this.OnExpressOccupied())
        : this.eQt.MapMarkResident
          ? this.CQt(!1)
          : this._Qt());
  }
  CQt(t) {
    for (var [i, s] of this.oQt) {
      var r = ModelManager_1.ModelManager.MapModel.GetMark(this.MarkType, s);
      if (r)
        if (t) {
          (i = this.zKt[i]), (i = this.cQt(1, i));
          if (i) {
            let t = void 0,
              e = !1;
            "Nearest" === this.eQt.TrackViewModel && (t = this.B_t);
            var a = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
                this.B_t,
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
                  TrackTarget: this.dQt(i[1]),
                  ShowGroupId: t,
                  AutoHideTrack: e,
                  IsInTrackRange: this.eQt.ContainTag(11),
                  IsSubTrack: this.eQt.IsNeedScaledTrackMark(this.b_t),
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
            ["行为树Id", this.B_t],
            ["节点Id", this.b_t],
            ["markId", s],
          );
    }
  }
  cQt(i, s) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r);
    if (a) {
      var o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.DungeonId,
      );
      if (o) {
        if (r === this.DungeonId)
          return this.eQt.BtType ===
            Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
            13 !== a.InstSubType &&
            0 === i
            ? (h = a.EntranceEntities)?.length
              ? [h[0].DungeonId, h[0].EntranceEntityId]
              : void 0
            : [r, s];
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
          ["行为树Id", this.B_t],
          ["副本Id", this.DungeonId],
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GeneralLogicTree",
          19,
          "GeneralLogicTree：找不到当前副本的配置",
          ["行为树Id", this.B_t],
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
        this.gQt())
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
  gQt() {
    var t;
    if (this.zKt && this.zKt.length)
      return (
        (t = this.zKt.find((t, e) => !this.iQt.get(e))), this.cQt(1, t)?.[1]
      );
  }
  mQt(t, e, i) {
    return (
      t.MapId === e &&
      (t.TrackTarget instanceof Vector_1.Vector && i instanceof Vector_1.Vector
        ? t.TrackTarget.Equality(i)
        : t.TrackTarget === i)
    );
  }
  OnExpressOccupied() {
    if (0 !== this.oQt.size)
      for (var [, t] of this.oQt)
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
    if (this.rQt) {
      if (0 !== this.oQt.size)
        for (var [, t] of this.oQt)
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
