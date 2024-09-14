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
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  TeleportController_1 = require("../../Teleport/TeleportController"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  MapDefine_1 = require("../MapDefine"),
  MapUtil_1 = require("../MapUtil"),
  MarkItemDataUtil_1 = require("../Marks/MarkItemDataUtil");
class MarkAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.rGa = 0),
      (this.oGa = 0),
      (this.Jpe = (e, o, t) => {
        var r = o.Entity.GetComponent(0),
          a = r.GetPbEntityInitData();
        r.GetEntityConfigType() ===
          Protocol_1.Aki.Protocol.rLs.Proto_Character ||
          MapUtil_1.MapUtil.IsTemporaryTeleportEntity(a) ||
          ((a = r.GetBaseInfo())?.MapIcon &&
            (ModelManager_1.ModelManager.MapModel.AddEntityIdToPendingList(
              o.Id,
              a.MapIcon,
            ),
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
              this,
              o,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            )));
      }),
      (this.zpe = (e, o) => {
        ModelManager_1.ModelManager.MapModel.RemoveEntityIdToPendingList(o.Id),
          ModelManager_1.ModelManager.MapModel.GetEntityPendingList()?.has(
            o.Id,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTargetUseKey(
              this,
              o,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            );
      }),
      (this.VLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.T7n, !0);
      }),
      (this.HLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetTrackMark(0, e.T7n, !1);
      }),
      (this.jLi = (e) => {
        ModelManager_1.ModelManager.MapModel.ResetDynamicMarkData();
        for (const t of e.cbs) {
          var o =
              0 === t.L7n
                ? Vector2D_1.Vector2D.Create(t.D7n, t.A7n)
                : Vector_1.Vector.Create(t.D7n, t.A7n, t.L7n),
            o = new MapDefine_1.DynamicMarkCreateInfo(
              o,
              t.v9n,
              MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
                t.U7n,
              ),
              t.T7n,
              void 0,
              !1,
              void 0,
              t.A5n,
              t.Lrh,
              t.w7n,
            );
          ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o),
            0 === this.rGa &&
              (t.U7n === Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_SoundBox &&
                ((this.rGa = o.MarkId ?? 0), (this.oGa = 16)),
              t.U7n ===
                Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_CalmingWindBell) &&
              ((this.rGa = o.MarkId ?? 0), (this.oGa = 21));
        }
        for (const r of e.dbs)
          ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
            r.T7n,
            r.q5n,
            !1,
            r.Cbs,
          );
        for (const a of e.vbs)
          ModelManager_1.ModelManager.MapModel.SetMarkServerOpenState(a, !0);
      }),
      (this.WLi = (e) => {
        if (
          !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() ||
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
          (e.YVn.U7n !==
            Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint &&
            e.YVn.U7n !== Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_SoundBox &&
            e.YVn.U7n !==
              Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_CalmingWindBell)
        ) {
          if (e.Rrh) for (const o of e.Rrh.ubs) this.nGa(o);
          this.nGa(e.YVn, e.pbs);
        }
      }),
      (this.UQa = (e) => {
        var o = e.T7n,
          e = e.Lrh,
          t = ModelManager_1.ModelManager.MapModel.GetDynamicMark(o);
        t
          ? (t.IsServerDisable = e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Map",
              64,
              "[地图系统]->MarkAssistant动态标记状态更新失败，没找到标记",
              ["markId", o],
              ["isDisable", e],
            );
      }),
      (this.XLi = (e) => {
        ModelManager_1.ModelManager.MapModel?.SetMarkServerOpenState(e.T7n, !0);
      }),
      (this.$Li = (e) => {
        var o;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Map", 64, "移除标记列表", [
            "notify.Proto_MarkIds",
            e.EOa,
          ]),
          1 === e.EOa.length && ((o = e.EOa[0]), this.QKa(o));
        for (const t of e.EOa)
          ModelManager_1.ModelManager.MapModel?.RemoveDynamicMapMark(
            MathUtils_1.MathUtils.LongToNumber(t),
          ),
            t === this.rGa && ((this.rGa = 0), (this.oGa = 0));
      }),
      (this.YLi = (e) => {
        ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
          e.T7n,
          e.q5n,
          e.gbs,
          e.Cbs,
        );
      }),
      (this.JLi = (e) => {
        for (const t of e.cGs)
          if (0 === t.T7n) {
            if (
              ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
              !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
            )
              return;
            this.RequestCreateTemporaryTeleport(
              Vector_1.Vector.Create(t.l8n),
              t.w7n,
              MathUtils_1.MathUtils.LongToNumber(t.R7n),
            );
          } else {
            var o = new MapDefine_1.DynamicMarkCreateInfo(
              Vector_1.Vector.Create(t.l8n),
              ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
              15,
              t.T7n ?? void 0,
              void 0,
              !1,
              MathUtils_1.MathUtils.LongToNumber(t.R7n),
              void 0,
              void 0,
              t.w7n,
            );
            ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o);
          }
      }),
      (this.zLi = (e) => {
        var o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e.dGs.T7n);
        void 0 !== o &&
          ((e = MathUtils_1.MathUtils.LongToNumber(e.dGs.R7n)),
          (o.TeleportId = e));
      }),
      (this.ZLi = (e) => {
        (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
          !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
          this.RequestCreateTemporaryTeleport(
            Vector_1.Vector.Create(e.dGs.l8n),
            e.dGs.w7n,
            MathUtils_1.MathUtils.LongToNumber(e.dGs.R7n),
          );
      }),
      (this.eDi = (e) => {}),
      (this.tDi = (e) => {
        for (const o of e.uEs)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(o),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(
              o,
            );
      }),
      (this.iDi = (e) => {
        for (const o of e.uEs)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(o),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(
              o,
            );
      }),
      (this.oDi = (e) => {
        for (const o of e.GEs)
          ModelManager_1.ModelManager.MapModel.RemoveOccupationInfo(o),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveOccupationInfo(
              o,
            );
      }),
      (this.rDi = (e, o) => {
        (void 0 === o || void 0 === o.jPs) && 0 < this.rGa
          ? this.OpenMapViewAndFocus(this.oGa, this.rGa, void 0, !1)
          : void 0 !== o &&
            this.UseExploreToolCall(
              Vector_1.Vector.Create(e.Pos),
              Rotator_1.Rotator.Create(e.Rot),
              e.PhantomSkillId,
              o,
            );
      }),
      (this.jka = !1);
  }
  nDi(e, o, t, r) {
    var a = Protocol_1.Aki.Protocol.x7n.create();
    return (
      (a.D7n = e.X),
      (a.A7n = e.Y),
      (a.L7n = e.Z),
      (a.v9n = t),
      (a.U7n = o),
      (a.P7n = !1),
      (a.w7n = r),
      a
    );
  }
  sDi(e, o, t, r) {
    var a = Protocol_1.Aki.Protocol.Jss.create(),
      e = this.nDi(e, o, t, r);
    return (a.x7n = e), a;
  }
  KLi(e) {
    let o = void 0;
    return (
      (o =
        0 === e.L7n
          ? Vector2D_1.Vector2D.Create(e.D7n, e.A7n)
          : Vector_1.Vector.Create(e.D7n, e.A7n, e.L7n)),
      new MapDefine_1.DynamicMarkCreateInfo(
        o,
        e.v9n,
        MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(e.U7n),
        e.T7n ?? void 0,
        void 0,
        !1,
        void 0,
        e.A5n,
        e.Lrh,
        e.w7n,
      )
    );
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(27194, this.VLi),
      Net_1.Net.Register(28852, this.HLi),
      Net_1.Net.Register(15157, this.jLi),
      Net_1.Net.Register(27466, this.WLi),
      Net_1.Net.Register(28590, this.UQa),
      Net_1.Net.Register(19835, this.XLi),
      Net_1.Net.Register(20468, this.$Li),
      Net_1.Net.Register(25239, this.JLi),
      Net_1.Net.Register(16811, this.ZLi),
      Net_1.Net.Register(16927, this.zLi),
      Net_1.Net.Register(16069, this.eDi),
      Net_1.Net.Register(25887, this.YLi),
      Net_1.Net.Register(17988, this.tDi),
      Net_1.Net.Register(24534, this.iDi),
      Net_1.Net.Register(20571, this.oDi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27194),
      Net_1.Net.UnRegister(28852),
      Net_1.Net.UnRegister(15157),
      Net_1.Net.UnRegister(27466),
      Net_1.Net.UnRegister(25887),
      Net_1.Net.UnRegister(20468),
      Net_1.Net.UnRegister(19835),
      Net_1.Net.UnRegister(25239),
      Net_1.Net.UnRegister(16811),
      Net_1.Net.UnRegister(16927),
      Net_1.Net.UnRegister(16069),
      Net_1.Net.UnRegister(25887),
      Net_1.Net.UnRegister(17988);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Jpe),
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
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUseMapExploreToolSuccess,
        this.rDi,
      );
  }
  nGa(e, o) {
    var t = this.KLi(e);
    if (
      (ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(t),
      e.U7n === Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint &&
        void 0 !== o)
    )
      for (const _ of o.ubs) {
        var r = this.KLi(_);
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            50,
            "添加物资箱标记",
            ["pointInfo.Proto_MarkId", _.T7n],
            ["pointInfo.Proto_ConfigId", _.v9n],
          ),
          ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(r);
      }
    var a = MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
      e.U7n,
    );
    switch (a) {
      case 17:
        this.OpenMapViewAndFocus(
          a,
          e.T7n,
          (e) => {
            e &&
              0 === o.ubs.length &&
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
        this.OpenMapViewAndFocus(
          a,
          e.T7n,
          void 0,
          !1,
          MapDefine_1.WORLD_MAP_MAX_SCALE,
        ),
          (this.rGa = e.T7n),
          (this.oGa = a);
        break;
      case 22:
        this.OpenMapViewAndFocus(
          a,
          e.T7n,
          void 0,
          !1,
          MapDefine_1.WORLD_MAP_MAX_SCALE,
        );
    }
  }
  UseExploreToolCall(e, o, t, r) {
    switch (t) {
      case 1011:
        0 !== r.jPs.length &&
          this.aDi(Vector_1.Vector.Create(r.jPs[0].l8n), r.jPs[0].v9n);
        break;
      case 1012:
        this.hDi(e, r.b7n, r.jPs);
    }
  }
  async RequestUseDetectionSkill(e, o, t) {
    var r = Protocol_1.Aki.Protocol.Ets.create(),
      e =
        ((r.q7n = !0),
        (r.l8n = e),
        (r._8n = o),
        (r.r5n = t),
        await Net_1.Net.CallAsync(23511, r));
    if (e) {
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) return e;
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Cvs,
        15746,
      );
    }
  }
  hDi(e, o, t) {
    var r = this.sDi(
      e,
      Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
      MapUtil_1.MapUtil.GetCurrentBigMapId(),
    );
    (r.G7n = Protocol_1.Aki.Protocol.G7n.create()),
      (r.G7n.b7n = o),
      (r.G7n.O7n = []);
    for (const _ of t) {
      var a = this.nDi(
        Vector_1.Vector.Create(_.l8n),
        Protocol_1.Aki.Protocol.w5s.ENUMS.O7n,
        ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId(),
        MapUtil_1.MapUtil.GetCurrentBigMapId(),
      );
      (a.A5n = _.v9n), r.G7n.O7n.push(a);
    }
    Net_1.Net.Call(19676, r, (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          26188,
        );
    });
  }
  aDi(e, o) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(o);
    let r = Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_SoundBox,
      a =
        ConfigManager_1.ConfigManager.MapConfig.GetDefaultDetectorMarkConfigId();
    t &&
      (t = t.ComponentsData) &&
      16 ===
        (0, IComponent_1.getComponent)(t, "BaseInfoComponent")?.Category
          .ExploratoryDegree &&
      ((r = Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_CalmingWindBell),
      (a = MapDefine_1.CALMING_WIND_BELL_MARKID));
    t = this.sDi(e, r, a, MapUtil_1.MapUtil.GetCurrentBigMapId());
    (t.x7n.A5n = o),
      Net_1.Net.Call(19676, t, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26188,
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
    var e = Protocol_1.Aki.Protocol.ias.create(),
      e = await Net_1.Net.CallAsync(15424, e);
    if (e)
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          20901,
        );
      else
        for (const r of e.fbs) {
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
    e = Protocol_1.Aki.Protocol.las.create({ T7n: e, v9n: o });
    Net_1.Net.Call(21854, e, (e) => {
      ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(e.T7n, e.v9n);
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
          Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_Custom,
          o,
          MapUtil_1.MapUtil.GetCurrentBigMapOrWorldMapId(),
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
        Net_1.Net.Call(19676, t, (e) => {
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              26188,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Map",
                64,
                "[CustomMarkItem Debug]MarkAssistant.response->",
                ["response.Info", e?.YVn],
              );
        }))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 19, "向服务器请求创建标记时，坐标不存在");
  }
  RequestCreateTemporaryTeleport(e, o, t = void 0) {
    e = this.sDi(
      e,
      Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TemporaryTeleport,
      ConfigManager_1.ConfigManager.MapConfig.GetDefaultTemporaryTeleportMarkConfigId(),
      o,
    );
    void 0 !== t && (e.N7n = { R7n: t }),
      Net_1.Net.Call(19676, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26188,
          );
      });
  }
  RequestTrackEnrichmentArea(e, o) {
    var t;
    this.jka
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Map",
          64,
          "[地图系统]->过滤本次请求富集区信息,未收到上次返回",
          ["锁定状态：", this.jka],
        )
      : (((t = Protocol_1.Aki.Protocol.Weh.create()).L8n = e ?? 0),
        (this.jka = !0),
        Net_1.Net.Call(20976, t, (e) => {
          (this.jka = !1),
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                24122,
              ),
            e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs && o?.();
        }));
  }
  QKa(e) {
    var o,
      e = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e);
    e &&
      23 === e.MarkType &&
      ((e = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(23)),
      (o = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(22)),
      1 === e) &&
      1 === o &&
      1 ===
        (e = ModelManager_1.ModelManager.MapModel.GetMarkByType(22))?.size &&
      ((o = e.values().next().value),
      (e =
        ConfigManager_1.ConfigManager.MapConfig.GetEnrichmentAreaConfigByEnrichmentId(
          o.EntityConfigId,
        ))
        ? this.RequestTrackEnrichmentArea(e.ItemId, () => {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "SearchNextRichArea",
            );
          })
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            64,
            "[地图系统]富集区连续追踪找不到富集区配置",
            ["EnrichmentAreaId:", o.EntityConfigId],
          ));
  }
  RequestRemoveMapMarks(t, e) {
    e = Protocol_1.Aki.Protocol.Zss.create({ EOa: e });
    Net_1.Net.Call(23940, e, (e) => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          15117,
        );
      else
        for (const o of e.EOa)
          ModelManager_1.ModelManager.MapModel.RemoveMapMark(t, o);
    });
  }
  RequestRemoveDynamicMapMark(e) {
    var o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e);
    void 0 === o
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 50, "找不到对应mark id:", ["markId", e])
      : this.RequestRemoveMapMarks(o.MarkType, [o.MarkId]);
  }
  RequestTrackMapMark(o, t) {
    var e;
    t < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "markId小于0, 请求追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(o, t, !0))
      : ((e = Protocol_1.Aki.Protocol.oas.create({ T7n: t })),
        Net_1.Net.Call(19027, e, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Map", 50, "向服务端请求追踪标记: 标记id:", [
              "markId",
              t,
            ]),
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  26444,
                )
              : ModelManager_1.ModelManager.MapModel.SetTrackMark(o, e.T7n, !0);
        }));
  }
  RequestCancelTrackMapMark(o, t) {
    var e;
    t < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 50, "markId小于0, 请求取消追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(o, t, !1))
      : ((e = Protocol_1.Aki.Protocol.sas.create({ T7n: t })),
        Net_1.Net.Call(26461, e, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Map", 50, "向服务端请求取消追踪标记: 标记id:", [
              "markId",
              t,
            ]),
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Map",
                  64,
                  "取消追踪标记失败: ",
                  ["标记id:", t],
                  ["错误码:", e.Q4n],
                )
              : ModelManager_1.ModelManager.MapModel.SetTrackMark(o, e.T7n, !1);
        }));
  }
  RequestTeleportToTargetByTemporaryTeleport(e, o, t) {
    var r, a;
    TeleportController_1.TeleportController.CheckCanTeleport()
      ? ((r = Protocol_1.Aki.Protocol.wCs.create()),
        ((a = Protocol_1.Aki.Protocol.D2s.create()).Pitch = o.Pitch),
        (a.Roll = o.Roll),
        (a.Yaw = o.Yaw),
        (r.R7n = e),
        (r._8n = a),
        Net_1.Net.Call(17750, r, (e) => {
          e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.G9n,
              21516,
            );
        }),
        t?.())
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleTransmitLimit",
        );
  }
  UpdateCustomMapMarkPosition(e, o) {
    e = Protocol_1.Aki.Protocol.vas.create({ T7n: e, l8n: o });
    Net_1.Net.Call(22344, e, (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          27721,
        );
    });
  }
}
exports.MarkAssistant = MarkAssistant;
//# sourceMappingURL=MarkAssistant.js.map
