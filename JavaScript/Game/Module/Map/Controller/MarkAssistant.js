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
  TeleportController_1 = require("../../Teleport/TeleportController"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  MapDefine_1 = require("../MapDefine"),
  MapUtil_1 = require("../MapUtil"),
  MarkItemDataUtil_1 = require("../Marks/MarkItemDataUtil");
class MarkAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.Ada = 0),
      (this.Uda = 0),
      (this.Jpe = (e, o, t) => {
        var r = o.Entity.GetComponent(0),
          a = r.GetPbEntityInitData();
        r.GetEntityConfigType() ===
          Protocol_1.Aki.Protocol.YTs.Proto_Character ||
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
      (this.VLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.g7n, !0);
      }),
      (this.HLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.g7n, !1);
      }),
      (this.jLi = (e) => {
        ModelManager_1.ModelManager.MapModel.ResetDynamicMarkData();
        for (const t of e.obs) {
          var o =
              0 === t.f7n
                ? Vector2D_1.Vector2D.Create(t.p7n, t.v7n)
                : Vector_1.Vector.Create(t.p7n, t.v7n, t.f7n),
            o = new MapDefine_1.DynamicMarkCreateInfo(
              o,
              t._9n,
              MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
                t.M7n,
              ),
              t.g7n,
              void 0,
              !1,
              void 0,
              t.v5n,
            );
          ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o),
            0 === this.Ada &&
              (t.M7n === Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_SoundBox &&
                ((this.Ada = o.MarkId ?? 0), (this.Uda = 16)),
              t.M7n ===
                Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_CalmingWindBell) &&
              ((this.Ada = o.MarkId ?? 0), (this.Uda = 21));
        }
        for (const r of e.nbs)
          ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
            r.g7n,
            r.D5n,
            !1,
            r.hbs,
          );
        for (const a of e.ubs)
          ModelManager_1.ModelManager.MapModel.SetMarkServerOpenState(a, !0);
      }),
      (this.WLi = (o) => {
        if (
          !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() ||
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
          (o.FVn.M7n !==
            Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_TreasureBoxPoint &&
            o.FVn.M7n !== Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_SoundBox &&
            o.FVn.M7n !==
              Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_CalmingWindBell)
        ) {
          var e = o.FVn,
            t = this.KLi(e);
          if (
            (ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(t),
            o.FVn.M7n ===
              Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_TreasureBoxPoint && o.cbs)
          )
            for (const a of o.cbs.rbs) {
              var r = this.KLi(a);
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Map",
                  50,
                  "添加物资箱标记",
                  ["pointInfo.Proto_MarkId", a.g7n],
                  ["pointInfo.Proto_ConfigId", a._9n],
                ),
                ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(r);
            }
          switch (
            MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
              o.FVn.M7n,
            )
          ) {
            case 15:
              break;
            case 17:
              this.OpenMapViewAndFocus(
                17,
                e.g7n,
                (e) => {
                  e &&
                    0 === o.cbs.rbs.length &&
                    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                      "ExploreBoxUnfindable",
                    );
                },
                !1,
                MapDefine_1.WORLD_MAP_MAX_SCALE,
              );
              break;
            case 16:
              this.OpenMapViewAndFocus(
                16,
                e.g7n,
                void 0,
                !1,
                MapDefine_1.WORLD_MAP_MAX_SCALE,
              ),
                (this.Ada = e.g7n),
                (this.Uda = 16);
              break;
            case 21:
              this.OpenMapViewAndFocus(
                21,
                e.g7n,
                void 0,
                !1,
                MapDefine_1.WORLD_MAP_MAX_SCALE,
              ),
                (this.Ada = e.g7n),
                (this.Uda = 21);
          }
        }
      }),
      (this.XLi = (e) => {
        ModelManager_1.ModelManager.MapModel?.SetMarkServerOpenState(e.g7n, !0);
      }),
      (this.$Li = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Map", 50, "移除标记", ["notify.Proto_MarkId", e.g7n]),
          ModelManager_1.ModelManager.MapModel?.RemoveDynamicMapMark(
            MathUtils_1.MathUtils.LongToNumber(e.g7n),
          ),
          e.g7n === this.Ada && ((this.Ada = 0), (this.Uda = 0));
      }),
      (this.YLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
          e.g7n,
          e.D5n,
          e.lbs,
          e.hbs,
        );
      }),
      (this.JLi = (e) => {
        for (const t of e.nGs)
          if (0 === t.g7n) {
            if (
              ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
              !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
            )
              return;
            this.RequestCreateTemporaryTeleport(
              Vector_1.Vector.Create(t.e8n),
              MathUtils_1.MathUtils.LongToNumber(t.S7n),
            );
          } else {
            var o = new MapDefine_1.DynamicMarkCreateInfo(
              Vector_1.Vector.Create(t.e8n),
              ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
              15,
              t.g7n ?? void 0,
              void 0,
              !1,
              MathUtils_1.MathUtils.LongToNumber(t.S7n),
            );
            ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o);
          }
      }),
      (this.zLi = (e) => {
        var o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e.sGs.g7n);
        void 0 !== o &&
          ((e = MathUtils_1.MathUtils.LongToNumber(e.sGs.S7n)),
          (o.TeleportId = e));
      }),
      (this.ZLi = (e) => {
        (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
          !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
          this.RequestCreateTemporaryTeleport(
            Vector_1.Vector.Create(e.sGs.e8n),
            MathUtils_1.MathUtils.LongToNumber(e.sGs.S7n),
          );
      }),
      (this.eDi = (e) => {}),
      (this.tDi = (e) => {
        for (const o of e.oEs)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(o);
      }),
      (this.iDi = (e) => {
        for (const o of e.oEs)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(o),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(
              o,
            );
      }),
      (this.oDi = (e) => {
        for (const o of e.PEs)
          ModelManager_1.ModelManager.MapModel.RemoveOccupationInfo(o),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveOccupationInfo(
              o,
            );
      }),
      (this.rDi = (e, o) => {
        (void 0 === o || void 0 === o.OPs) && 0 < this.Ada
          ? this.OpenMapViewAndFocus(this.Uda, this.Ada, void 0, !1)
          : void 0 !== o &&
            this.UseExploreToolCall(
              Vector_1.Vector.Create(e.Pos),
              Rotator_1.Rotator.Create(e.Rot),
              e.PhantomSkillId,
              o,
            );
      });
  }
  nDi(e, o, t) {
    var r = Protocol_1.Aki.Protocol.E7n.create();
    return (
      (r.p7n = e.X),
      (r.v7n = e.Y),
      (r.f7n = e.Z),
      (r._9n = t),
      (r.M7n = o),
      (r.y7n = !1),
      (r.T7n = 0),
      r
    );
  }
  sDi(e, o, t) {
    var r = Protocol_1.Aki.Protocol.Hss.create(),
      e = this.nDi(e, o, t);
    return (r.E7n = e), r;
  }
  KLi(e) {
    let o = void 0;
    return (
      (o =
        0 === e.f7n
          ? Vector2D_1.Vector2D.Create(e.p7n, e.v7n)
          : Vector_1.Vector.Create(e.p7n, e.v7n, e.f7n)),
      new MapDefine_1.DynamicMarkCreateInfo(
        o,
        e._9n,
        MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.M7n),
        e.g7n ?? void 0,
        void 0,
        !1,
        void 0,
        e.v5n,
      )
    );
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(10659, this.VLi),
      Net_1.Net.Register(11610, this.HLi),
      Net_1.Net.Register(17658, this.jLi),
      Net_1.Net.Register(22055, this.WLi),
      Net_1.Net.Register(19320, this.XLi),
      Net_1.Net.Register(18984, this.$Li),
      Net_1.Net.Register(25472, this.JLi),
      Net_1.Net.Register(27183, this.ZLi),
      Net_1.Net.Register(29347, this.zLi),
      Net_1.Net.Register(2081, this.eDi),
      Net_1.Net.Register(14786, this.YLi),
      Net_1.Net.Register(24063, this.tDi),
      Net_1.Net.Register(23442, this.iDi),
      Net_1.Net.Register(8546, this.oDi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(10659),
      Net_1.Net.UnRegister(11610),
      Net_1.Net.UnRegister(17658),
      Net_1.Net.UnRegister(22055),
      Net_1.Net.UnRegister(18984),
      Net_1.Net.UnRegister(19320),
      Net_1.Net.UnRegister(25472),
      Net_1.Net.UnRegister(27183),
      Net_1.Net.UnRegister(29347),
      Net_1.Net.UnRegister(2081),
      Net_1.Net.UnRegister(14786),
      Net_1.Net.UnRegister(24063);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Jpe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        this.rDi,
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
        this.rDi,
      );
  }
  UseExploreToolCall(e, o, t, r) {
    switch (t) {
      case 1011:
        0 !== r.OPs.length &&
          this.aDi(Vector_1.Vector.Create(r.OPs[0].e8n), r.OPs[0]._9n);
        break;
      case 1012:
        this.hDi(e, r.L7n, r.OPs);
    }
  }
  async RequestUseDetectionSkill(e, o, t) {
    var r = Protocol_1.Aki.Protocol.Cts.create(),
      e =
        ((r.D7n = !0),
        (r.e8n = e),
        (r.t8n = o),
        (r.X4n = t),
        await Net_1.Net.CallAsync(17233, r));
    if (e) {
      if (e.hvs === Protocol_1.Aki.Protocol.O4n.NRs) return e;
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.hvs,
        16154,
      );
    }
  }
  hDi(e, o, t) {
    var r = this.sDi(
      e,
      Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_TreasureBoxPoint,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
    );
    (r.A7n = Protocol_1.Aki.Protocol.A7n.create()),
      (r.A7n.L7n = o),
      (r.A7n.U7n = []);
    for (const _ of t) {
      var a = this.nDi(
        Vector_1.Vector.Create(_.e8n),
        Protocol_1.Aki.Protocol.T6s.ENUMS.U7n,
        ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
      );
      (a.v5n = _._9n), r.A7n.U7n.push(a);
    }
    Net_1.Net.Call(26576, r, (e) => {
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          7033,
        );
    });
  }
  aDi(e, o) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o);
    let r = Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_SoundBox,
      a =
        ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId();
    t &&
      (t = t.ComponentsData) &&
      16 ===
        (0, IComponent_1.getComponent)(t, "BaseInfoComponent")?.Category
          .ExploratoryDegree &&
      ((r = Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_CalmingWindBell),
      (a = MapDefine_1.CALMING_WIND_BELL_MARKID));
    t = this.sDi(e, r, a);
    (t.E7n.v5n = o),
      Net_1.Net.Call(26576, t, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            7033,
          );
      });
  }
  OpenMapViewAndFocus(e, o, t, r = !0, a = 1) {
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
    var e = Protocol_1.Aki.Protocol.Xss.create(),
      e = await Net_1.Net.CallAsync(6818, e);
    if (e)
      if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          17619,
        );
      else
        for (const r of e._bs) {
          var o =
              ConfigManager_1.ConfigManager.MapConfig.SearchGetMarkConfig(r),
            t = this.lDi(r),
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
  lDi(o) {
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
    e = Protocol_1.Aki.Protocol.tas.create({ g7n: e, _9n: o });
    Net_1.Net.Call(24091, e, (e) => {
      ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(e.g7n, e._9n);
    });
  }
  RequestCreateCustomMark(e, o) {
    var t;
    e
      ? ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) >=
          ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize ||
        ((t = e instanceof Vector_1.Vector ? e.Z : 0),
        (t = this.sDi(
          Vector_1.Vector.Create(e.X, e.Y, t),
          Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_Custom,
          o,
        )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            64,
            "[CustomMarkItem Debug]MarkAssistant.RequestCreateCustomMark->",
            ["trackPosition", e],
            ["configId", o],
            ["request", t],
          ),
        Net_1.Net.Call(26576, t, (e) => {
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              7033,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Map",
                64,
                "[CustomMarkItem Debug]MarkAssistant.response->",
                ["response.Info", e?.FVn],
              );
        }))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 19, "向服务器请求创建标记时，坐标不存在");
  }
  RequestCreateTemporaryTeleport(e, o = void 0) {
    e = this.sDi(
      e,
      Protocol_1.Aki.Protocol.T6s.ENUMS.Proto_TemporaryTeleport,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultTemporaryTeleportMarkConfigId(),
    );
    void 0 !== o && (e.R7n = { S7n: o }),
      Net_1.Net.Call(26576, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            7033,
          );
      });
  }
  RequestRemoveMapMark(o, e) {
    e = Protocol_1.Aki.Protocol.Wss.create({ g7n: e });
    Net_1.Net.Call(22079, e, (e) => {
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            4552,
          )
        : ModelManager_1.ModelManager.MapModel.RemoveMapMark(o, e.g7n);
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
      : ((e = Protocol_1.Aki.Protocol.Jss.create({ g7n: t })),
        Net_1.Net.Call(10553, e, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Map", 50, "向服务端请求追踪标记: 标记id:", [
              "markId",
              t,
            ]),
            e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  20121,
                )
              : ModelManager_1.ModelManager.MapModel.SetTrackMark(o, e.g7n, !0);
        }));
  }
  RequestCancelTrackMapMark(o, t) {
    var e;
    t < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "markId小于0, 请求取消追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(o, t, !1))
      : ((e = Protocol_1.Aki.Protocol.Zss.create({ g7n: t })),
        Net_1.Net.Call(14023, e, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Map", 50, "向服务端请求取消追踪标记: 标记id:", [
              "markId",
              t,
            ]),
            e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
              ? Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Map",
                  64,
                  "取消追踪标记失败: ",
                  ["标记id:", t],
                  ["错误码:", e.O4n],
                )
              : ModelManager_1.ModelManager.MapModel.SetTrackMark(o, e.g7n, !1);
        }));
  }
  RequestTeleportToTargetByTemporaryTeleport(e, o) {
    var t, r;
    TeleportController_1.TeleportController.CheckCanTeleport()
      ? ((t = Protocol_1.Aki.Protocol.TCs.create()),
        ((r = Protocol_1.Aki.Protocol.S2s.create()).Pitch = o.Pitch),
        (r.Roll = o.Roll),
        (r.Yaw = o.Yaw),
        (t.S7n = e),
        (t.t8n = r),
        Net_1.Net.Call(5509, t, (e) => {
          e.A9n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.A9n,
              3677,
            );
        }))
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleTransmitLimit",
        );
  }
  UpdateCustomMapMarkPosition(e, o) {
    e = Protocol_1.Aki.Protocol.uas.create({ g7n: e, e8n: o });
    Net_1.Net.Call(4154, e, (e) => {
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          27784,
        );
    });
  }
}
exports.MarkAssistant = MarkAssistant;
//# sourceMappingURL=MarkAssistant.js.map
