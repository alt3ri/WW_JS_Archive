"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  MapDefine_1 = require("../MapDefine"),
  MapUtil_1 = require("../MapUtil"),
  MarkItemDataUtil_1 = require("../Marks/MarkItemDataUtil");
class MarkAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.FTi = 0),
      (this.Jpe = (e, o, t) => {
        var r = o.Entity.GetComponent(0),
          a = r.GetPbEntityInitData();
        r.GetEntityConfigType() ===
          Protocol_1.Aki.Protocol.USs.Proto_Character ||
          MapUtil_1.MapUtil.IsTemporaryTeleportEntity(a) ||
          ((a = r.GetBaseInfo())?.MapIcon &&
            ModelManager_1.ModelManager.MapModel.AddEntityIdToPendingList(
              o.Id,
              a.MapIcon,
            ));
      }),
      (this.zpe = (e, o) => {
        ModelManager_1.ModelManager.MapModel.RemoveEntityIdToPendingList(o.Id);
      }),
      (this.VTi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.G6n, !0);
      }),
      (this.HTi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.G6n, !1);
      }),
      (this.jTi = (e) => {
        ModelManager_1.ModelManager.MapModel.ResetDynamicMarkData();
        for (const t of e.kAs) {
          var o =
              0 === t.O6n
                ? Vector2D_1.Vector2D.Create(t.N6n, t.k6n)
                : Vector_1.Vector.Create(t.N6n, t.k6n, t.O6n),
            o = new MapDefine_1.DynamicMarkCreateInfo(
              o,
              t.R5n,
              MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
                t.F6n,
              ),
              t.G6n,
              void 0,
              !1,
              void 0,
              t.jkn,
            );
          ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o),
            0 === this.FTi &&
              t.F6n === Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_SoundBox &&
              (this.FTi = o.MarkId ?? 0);
        }
        for (const r of e.NAs)
          ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
            r.G6n,
            r.zkn,
            !1,
            r.VAs,
          );
        for (const a of e.jAs)
          ModelManager_1.ModelManager.MapModel.SetMarkServerOpenState(a, !0);
      }),
      (this.WTi = (o) => {
        if (
          !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() ||
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
          (o.a5n.F6n !==
            Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TreasureBoxPoint &&
            o.a5n.F6n !== Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_SoundBox &&
            o.a5n.F6n !==
              Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_CalmingWindBell)
        ) {
          var e = o.a5n,
            t = this.KTi(e);
          if (
            (ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(t),
            o.a5n.F6n ===
              Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TreasureBoxPoint && o.WAs)
          )
            for (const a of o.WAs.OAs) {
              var r = this.KTi(a);
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Map",
                  50,
                  "添加物资箱标记",
                  ["pointInfo.Proto_MarkId", a.G6n],
                  ["pointInfo.Proto_ConfigId", a.R5n],
                ),
                ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(r);
            }
          switch (
            MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
              o.a5n.F6n,
            )
          ) {
            case 15:
              break;
            case 17:
              this.QTi(
                17,
                e.G6n,
                (e) => {
                  e &&
                    0 === o.WAs.OAs.length &&
                    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                      "ExploreBoxUnfindable",
                    );
                },
                !1,
                MapDefine_1.WORLD_MAP_MAX_SCALE,
              );
              break;
            case 16:
            case 21:
              this.QTi(16, e.G6n, void 0, !1, MapDefine_1.WORLD_MAP_MAX_SCALE),
                (this.FTi = e.G6n);
          }
        }
      }),
      (this.XTi = (e) => {
        ModelManager_1.ModelManager.MapModel?.SetMarkServerOpenState(e.G6n, !0);
      }),
      (this.$Ti = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Map", 50, "移除标记", ["notify.Proto_MarkId", e.G6n]),
          ModelManager_1.ModelManager.MapModel?.RemoveDynamicMapMark(
            MathUtils_1.MathUtils.LongToNumber(e.G6n),
          ),
          e.G6n === this.FTi && (this.FTi = 0);
      }),
      (this.YTi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
          e.G6n,
          e.zkn,
          e.$As,
          e.VAs,
        );
      }),
      (this.JTi = (e) => {
        for (const t of e.Nxs)
          if (0 === t.G6n) {
            if (
              ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
              !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
            )
              return;
            this.RequestCreateTemporaryTeleport(
              Vector_1.Vector.Create(t.M3n),
              MathUtils_1.MathUtils.LongToNumber(t.V6n),
            );
          } else {
            var o = new MapDefine_1.DynamicMarkCreateInfo(
              Vector_1.Vector.Create(t.M3n),
              ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
              15,
              t.G6n ?? void 0,
              void 0,
              !1,
              MathUtils_1.MathUtils.LongToNumber(t.V6n),
            );
            ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o);
          }
      }),
      (this.zTi = (e) => {
        var o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e.Fxs.G6n);
        void 0 !== o &&
          ((e = MathUtils_1.MathUtils.LongToNumber(e.Fxs.V6n)),
          (o.TeleportId = e));
      }),
      (this.ZTi = (e) => {
        (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
          !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
          this.RequestCreateTemporaryTeleport(
            Vector_1.Vector.Create(e.Fxs.M3n),
            MathUtils_1.MathUtils.LongToNumber(e.Fxs.V6n),
          );
      }),
      (this.eLi = (e) => {}),
      (this.tLi = (e) => {
        for (const o of e.Ffs)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(o);
      }),
      (this.iLi = (e) => {
        for (const o of e.Ffs)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(o),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(
              o,
            );
      }),
      (this.oLi = (e) => {
        for (const o of e.dvs)
          ModelManager_1.ModelManager.MapModel.RemoveOccupationInfo(o),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveOccupationInfo(
              o,
            );
      }),
      (this.rLi = (e, o) => {
        (void 0 === o || void 0 === o.pLs) && 0 < this.FTi
          ? this.QTi(16, this.FTi, void 0, !1)
          : this.UseExploreToolCall(
              Vector_1.Vector.Create(e.Pos),
              Rotator_1.Rotator.Create(e.Rot),
              e.PhantomSkillId,
              o,
            );
      });
  }
  nLi(e, o, t) {
    var r = Protocol_1.Aki.Protocol.H6n.create();
    return (
      (r.N6n = e.X),
      (r.k6n = e.Y),
      (r.O6n = e.Z),
      (r.R5n = t),
      (r.F6n = o),
      (r.j6n = !1),
      (r.W6n = ""),
      (r.K6n = 0),
      r
    );
  }
  sLi(e, o, t) {
    var r = Protocol_1.Aki.Protocol.Qis.create(),
      e = this.nLi(e, o, t);
    return (r.H6n = e), r;
  }
  KTi(e) {
    let o = void 0;
    return (
      (o =
        0 === e.O6n
          ? Vector2D_1.Vector2D.Create(e.N6n, e.k6n)
          : Vector_1.Vector.Create(e.N6n, e.k6n, e.O6n)),
      new MapDefine_1.DynamicMarkCreateInfo(
        o,
        e.R5n,
        MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.F6n),
        e.G6n ?? void 0,
        void 0,
        !1,
        void 0,
        e.jkn,
      )
    );
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(17530, this.VTi),
      Net_1.Net.Register(2894, this.HTi),
      Net_1.Net.Register(10990, this.jTi),
      Net_1.Net.Register(8504, this.WTi),
      Net_1.Net.Register(20058, this.XTi),
      Net_1.Net.Register(11420, this.$Ti),
      Net_1.Net.Register(10760, this.JTi),
      Net_1.Net.Register(4742, this.ZTi),
      Net_1.Net.Register(25737, this.zTi),
      Net_1.Net.Register(28437, this.eLi),
      Net_1.Net.Register(7458, this.YTi),
      Net_1.Net.Register(8549, this.tLi),
      Net_1.Net.Register(11795, this.iLi),
      Net_1.Net.Register(27382, this.oLi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17530),
      Net_1.Net.UnRegister(2894),
      Net_1.Net.UnRegister(10990),
      Net_1.Net.UnRegister(8504),
      Net_1.Net.UnRegister(11420),
      Net_1.Net.UnRegister(20058),
      Net_1.Net.UnRegister(10760),
      Net_1.Net.UnRegister(4742),
      Net_1.Net.UnRegister(25737),
      Net_1.Net.UnRegister(28437),
      Net_1.Net.UnRegister(7458),
      Net_1.Net.UnRegister(8549);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Jpe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        this.rLi,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AddEntity,
      this.Jpe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        this.rLi,
      );
  }
  UseExploreToolCall(e, o, t, r) {
    switch (t) {
      case 1011:
        0 !== r.pLs.length &&
          this.aLi(Vector_1.Vector.Create(r.pLs[0].M3n), r.pLs[0].R5n);
        break;
      case 1012:
        this.hLi(e, r.Q6n, r.pLs);
    }
  }
  async RequestUseDetectionSkill(e, o, t) {
    var r = Protocol_1.Aki.Protocol.SJn.create(),
      e =
        ((r.$6n = !0),
        (r.M3n = e),
        (r.S3n = o),
        (r.vkn = t),
        await Net_1.Net.CallAsync(22248, r));
    if (e) {
      if (e.Kms === Protocol_1.Aki.Protocol.lkn.Sys) return e;
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Kms,
        4212,
      );
    }
  }
  hLi(e, o, t) {
    var r = this.sLi(
      e,
      Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TreasureBoxPoint,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
    );
    (r.X6n = Protocol_1.Aki.Protocol.X6n.create()),
      (r.X6n.Q6n = o),
      (r.X6n.Y6n = []);
    for (const _ of t) {
      var a = this.nLi(
        Vector_1.Vector.Create(_.M3n),
        Protocol_1.Aki.Protocol.qNs.ENUMS.Y6n,
        ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
      );
      (a.jkn = _.R5n), r.X6n.Y6n.push(a);
    }
    Net_1.Net.Call(17129, r, (e) => {
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          3209,
        );
    });
  }
  aLi(e, o) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o);
    let r = Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_SoundBox,
      a =
        ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId();
    t &&
      (t = t.ComponentsData) &&
      16 ===
        (0, IComponent_1.getComponent)(t, "BaseInfoComponent")?.Category
          .ExploratoryDegree &&
      ((r = Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_CalmingWindBell),
      (a = MapDefine_1.CALMING_WIND_BELL_MARKID));
    t = this.sLi(e, r, a);
    (t.H6n.jkn = o),
      Net_1.Net.Call(17129, t, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            3209,
          );
      });
  }
  QTi(e, o, t, r = !0, a = 1) {
    (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
      ((o = {
        MarkId: o,
        MarkType: e,
        OpenAreaId: 0,
        IsNotFocusTween: !r,
        StartScale: a,
      }),
      WorldMapController_1.WorldMapController.OpenView(2, !1, o, t));
  }
  async RequestTrackInfo() {
    var e = Protocol_1.Aki.Protocol.Zis.create(),
      e = await Net_1.Net.CallAsync(28003, e);
    if (e)
      if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          22827,
        );
      else
        for (const r of e.HAs) {
          var o =
              ConfigManager_1.ConfigManager.MapConfig.SearchGetMarkConfig(r),
            t = this.lLi(r),
            o = {
              TrackSource: 1,
              MarkType: o?.ObjectType,
              Id: r,
              IconPath: t.Icon,
              TrackTarget: t.TrackTarget,
            };
          ModelManager_1.ModelManager.TrackModel.AddTrackData(o),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TrackMark,
              o,
            );
        }
  }
  lLi(o) {
    var t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o);
    if (t)
      return {
        Icon: MarkItemDataUtil_1.MarkItemDataUtil.GetMarkIcon(o) ?? "",
        TrackTarget: t.EntityConfigId ?? Vector_1.Vector.Create(t.MarkVector),
      };
    t = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(o);
    if (t) {
      (o = ConfigManager_1.ConfigManager.MapConfig.GetCustomMarkConfig(
        t.MarkConfigId,
      )),
        (t = t.TrackTarget);
      let e = void 0;
      return (
        t instanceof Vector_1.Vector
          ? (e = MapUtil_1.MapUtil.UiPosition2WorldPosition(t))
          : t instanceof Vector2D_1.Vector2D &&
            ((t = Vector_1.Vector.Create(t.X, -t.Y, 0)),
            (e = MapUtil_1.MapUtil.UiPosition2WorldPosition(t))),
        { Icon: o.MarkPic, TrackTarget: e }
      );
    }
    return { Icon: "", TrackTarget: Vector_1.Vector.Create(0, 0, 0) };
  }
  RequestMapMarkReplace(e, o) {
    e = Protocol_1.Aki.Protocol.nrs.create({ G6n: e, R5n: o });
    Net_1.Net.Call(14261, e, (e) => {
      ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(e.G6n, e.R5n);
    });
  }
  RequestCreateCustomMark(e, o) {
    var t;
    e
      ? ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) >=
          ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize ||
        ((t = e instanceof Vector_1.Vector ? e.Z : 0),
        (e = this.sLi(
          Vector_1.Vector.Create(e.X, e.Y, t),
          Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_Custom,
          o,
        )),
        Net_1.Net.Call(17129, e, (e) => {
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              3209,
            );
        }))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 19, "向服务器请求创建标记时，坐标不存在");
  }
  RequestCreateTemporaryTeleport(e, o = void 0) {
    e = this.sLi(
      e,
      Protocol_1.Aki.Protocol.qNs.ENUMS.Proto_TemporaryTeleport,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultTemporaryTeleportMarkConfigId(),
    );
    void 0 !== o && (e.J6n = { V6n: o }),
      Net_1.Net.Call(17129, e, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            3209,
          );
      });
  }
  RequestRemoveMapMark(o, e) {
    e = Protocol_1.Aki.Protocol.Yis.create({ G6n: e });
    Net_1.Net.Call(4673, e, (e) => {
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            21719,
          )
        : ModelManager_1.ModelManager.MapModel.RemoveMapMark(o, e.G6n);
    });
  }
  RequestRemoveDynamicMapMark(e) {
    var o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e);
    void 0 === o
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 50, "找不到对应mark id:", ["markId", e])
      : this.RequestRemoveMapMark(o.MarkType, o.MarkId);
  }
  RequestTrackMapMark(o, t) {
    var e;
    t < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "markId小于0, 请求追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(o, t, !0))
      : ((e = Protocol_1.Aki.Protocol.trs.create({ G6n: t })),
        Net_1.Net.Call(23109, e, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Map", 50, "向服务端请求追踪标记: 标记id:", [
              "markId",
              t,
            ]),
            e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  26248,
                )
              : ModelManager_1.ModelManager.MapModel.SetTrackMark(o, e.G6n, !0);
        }));
  }
  RequestCancelTrackMapMark(o, t) {
    var e;
    t < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "markId小于0, 请求取消追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(o, t, !1))
      : ((e = Protocol_1.Aki.Protocol.rrs.create({ G6n: t })),
        Net_1.Net.Call(3033, e, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Map", 50, "向服务端请求取消追踪标记: 标记id:", [
              "markId",
              t,
            ]),
            e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.lkn,
                  9003,
                )
              : ModelManager_1.ModelManager.MapModel.SetTrackMark(o, e.G6n, !1);
        }));
  }
  RequestTeleportToTargetByTemporaryTeleport(e, o) {
    var t = Protocol_1.Aki.Protocol.Pus.create(),
      r = Protocol_1.Aki.Protocol.iws.create();
    (r.Pitch = o.Pitch),
      (r.Roll = o.Roll),
      (r.Yaw = o.Yaw),
      (t.V6n = e),
      (t.S3n = r),
      Net_1.Net.Call(12834, t, (e) => {
        e.X5n !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.X5n,
            9003,
          );
      });
  }
  UpdateCustomMapMarkPosition(e, o) {
    e = Protocol_1.Aki.Protocol.mrs.create({ G6n: e, O6n: o });
    Net_1.Net.Call(2187, e, (e) => {
      e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          10484,
        );
    });
  }
}
exports.MarkAssistant = MarkAssistant;
//# sourceMappingURL=MarkAssistant.js.map
