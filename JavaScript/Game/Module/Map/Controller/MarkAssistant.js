"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  TeleportController_1 = require("../../Teleport/TeleportController"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  MapOperationQueue_1 = require("../Container/MapOperation/MapOperationQueue"),
  MapDefine_1 = require("../MapDefine"),
  MapUtil_1 = require("../MapUtil"),
  MarkItemDataUtil_1 = require("../Marks/MarkItemDataUtil");
class MarkAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.Jpe = (e, r, o) => {
        var a = r.Entity.GetComponent(0),
          t = a.GetPbEntityInitData();
        a.GetEntityConfigType() ===
          Protocol_1.Aki.Protocol.rLs.Proto_Character ||
          MapUtil_1.MapUtil.IsTemporaryTeleportEntity(t) ||
          ((t = a.GetBaseInfo())?.MapIcon &&
            (ModelManager_1.ModelManager.MapModel.AddEntityIdToPendingList(
              r.Id,
              t.MapIcon,
            ),
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
              this,
              r,
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            )));
      }),
      (this.zpe = (e, r) => {
        ModelManager_1.ModelManager.MapModel.RemoveEntityIdToPendingList(r.Id),
          ModelManager_1.ModelManager.MapModel.GetEntityPendingList()?.has(
            r.Id,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTargetUseKey(
              this,
              r,
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
        for (const o of e.cbs) {
          var r =
              0 === o.L7n
                ? Vector2D_1.Vector2D.Create(o.D7n, o.A7n)
                : Vector_1.Vector.Create(o.D7n, o.A7n, o.L7n),
            r = new MapDefine_1.DynamicMarkCreateInfo({
              TrackTarget: r,
              MarkConfigId: o.v9n,
              MarkType:
                MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
                  o.U7n,
                ),
              MarkId: o.T7n,
              DestroyOnUnTrack: !1,
              EntityConfigId: o.A5n,
              IsServerDisable: o.Kb_,
              MapAndDungeonInfo: { MapConfigId: o.w7n },
            });
          ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(r);
        }
        for (const a of e.dbs)
          ModelManager_1.ModelManager.MapModel.SetMarkExtraShowState(
            a.T7n,
            a.q5n,
            !1,
            a.Cbs,
          );
        for (const t of e.vbs)
          ModelManager_1.ModelManager.MapModel.SetMarkServerOpenState(t, !0);
        ModelManager_1.ModelManager.MapModel.ClearMarkHideInfo();
        for (const n of e.Zu1)
          ModelManager_1.ModelManager.MapModel.AddMarkHideInfo(n);
        this.qCc(e);
      }),
      (this.Bd1 = (e) => {
        for (const r of e.Zu1)
          ModelManager_1.ModelManager.MapModel.AddMarkHideInfo(r);
      }),
      (this.WLi = (e) => {
        if (
          !ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() ||
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
          !MapDefine_1.addMarkFilterInTeamModeSet.has(e.YVn.U7n)
        ) {
          if (e.Xb_) for (const r of e.Xb_.ubs) this.cNa(r);
          this.cNa(e.YVn, e.pbs);
        }
      }),
      (this.tYa = (e) => {
        var r = e.T7n,
          e = e.Kb_,
          o = ModelManager_1.ModelManager.MapModel.GetDynamicMark(r);
        o
          ? (o.IsServerDisable = e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Map",
              63,
              "[地图系统]->MarkAssistant动态标记状态更新失败，没找到标记",
              ["markId", r],
              ["isDisable", e],
            );
      }),
      (this.XLi = (e) => {
        ModelManager_1.ModelManager.MapModel?.SetMarkServerOpenState(e.T7n, !0);
      }),
      (this.$Li = (e) => {
        var r;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Map", 63, "移除标记列表", [
            "notify.Proto_MarkIds",
            e.Ika,
          ]),
          1 === e.Ika.length && ((r = e.Ika[0]), this.cza(r));
        for (const o of e.Ika)
          ModelManager_1.ModelManager.MapModel?.RemoveDynamicMapMark(
            MathUtils_1.MathUtils.LongToNumber(o),
          );
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
        ModelManager_1.ModelManager.MapModel.FullUpdateTemporaryTeleportInfo(
          e.cGs,
        );
      }),
      (this.ZLi = (e) => {
        ModelManager_1.ModelManager.MapModel.UpdateTemporaryTeleportInfo(e.dGs);
      }),
      (this.jcl = (e) => {
        ModelManager_1.ModelManager.MapModel.FullUpdateBoxSlotInfo(e.ET_);
      }),
      (this.tDi = (e) => {
        for (const r of e.uEs)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(r),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(
              r,
            );
      }),
      (this.iDi = (e) => {
        for (const r of e.uEs)
          ModelManager_1.ModelManager.MapModel.AddOccupationInfo(r),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.AddOccupationInfo(
              r,
            );
      }),
      (this.oDi = (e) => {
        for (const r of e.GEs)
          ModelManager_1.ModelManager.MapModel.RemoveOccupationInfo(r),
            ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveOccupationInfo(
              r,
            );
      }),
      (this.rDi = (e, r) => {
        r &&
          (e.MarkId
            ? this.OpenMapViewAndFocus(e.MarkType, e.MarkId, void 0, !1)
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Phantom",
                63,
                "[探索工具]->聚焦地图失败，不存在探索工具标记Id",
                ["MarkId", e.MarkId],
                ["useAgain", r],
                ["usingInfo", e],
              ));
      }),
      (this.KFa = !1);
  }
  nDi(e, r, o, a) {
    var t = Protocol_1.Aki.Protocol.x7n.create();
    return (
      (t.D7n = e.X),
      (t.A7n = e.Y),
      (t.L7n = e.Z),
      (t.v9n = o),
      (t.U7n = r),
      (t.P7n = !1),
      (t.w7n = a),
      t
    );
  }
  sDi(e, r, o, a) {
    var t = Protocol_1.Aki.Protocol.Jss.create(),
      e = this.nDi(e, r, o, a);
    return (t.x7n = e), t;
  }
  KLi(e) {
    let r = void 0;
    return (
      (r =
        0 === e.L7n
          ? Vector2D_1.Vector2D.Create(e.D7n, e.A7n)
          : Vector_1.Vector.Create(e.D7n, e.A7n, e.L7n)),
      new MapDefine_1.DynamicMarkCreateInfo({
        TrackTarget: r,
        MarkConfigId: e.v9n,
        MarkType: MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
          e.U7n,
        ),
        MarkId: e.T7n ?? void 0,
        DestroyOnUnTrack: !1,
        EntityConfigId: e.A5n,
        IsServerDisable: e.Kb_,
        MapAndDungeonInfo: { MapConfigId: e.w7n },
      })
    );
  }
  OnDestroy() {
    MapOperationQueue_1.MapOperationQueue.Clear();
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(17426, this.VLi),
      Net_1.Net.Register(27913, this.HLi),
      Net_1.Net.Register(18281, this.jLi),
      Net_1.Net.Register(25917, this.Bd1),
      Net_1.Net.Register(16907, this.WLi),
      Net_1.Net.Register(19481, this.tYa),
      Net_1.Net.Register(18874, this.XLi),
      Net_1.Net.Register(29474, this.$Li),
      Net_1.Net.Register(27569, this.JLi),
      Net_1.Net.Register(29503, this.ZLi),
      Net_1.Net.Register(24876, this.jcl),
      Net_1.Net.Register(17961, this.YLi),
      Net_1.Net.Register(28932, this.tDi),
      Net_1.Net.Register(16229, this.iDi),
      Net_1.Net.Register(29940, this.oDi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17426),
      Net_1.Net.UnRegister(27913),
      Net_1.Net.UnRegister(18281),
      Net_1.Net.UnRegister(16907),
      Net_1.Net.UnRegister(25917),
      Net_1.Net.UnRegister(19481),
      Net_1.Net.UnRegister(18874),
      Net_1.Net.UnRegister(29474),
      Net_1.Net.UnRegister(27569),
      Net_1.Net.UnRegister(29503),
      Net_1.Net.UnRegister(24876),
      Net_1.Net.UnRegister(17961),
      Net_1.Net.UnRegister(28932),
      Net_1.Net.UnRegister(16229),
      Net_1.Net.UnRegister(29940);
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
  qCc(e) {
    ModelManager_1.ModelManager.MapModel.CacheMapFishingShipMark(e.Xsc);
  }
  cNa(e, r) {
    var o = this.KLi(e);
    if (
      (ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(o),
      e.U7n === Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint &&
        void 0 !== r)
    )
      for (const n of r.ubs) {
        var a = this.KLi(n);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Map",
            63,
            "添加物资箱标记",
            ["pointInfo.Proto_MarkId", n.T7n],
            ["pointInfo.Proto_ConfigId", n.v9n],
          ),
          ModelManager_1.ModelManager.MapModel.CreateServerSaveMark(a);
      }
    var t = MarkItemDataUtil_1.MarkItemDataUtil.TransformMarkTypeToClient(
      e.U7n,
    );
    if (void 0 === ModelManager_1.ModelManager.GameModeModel.InstanceDungeon)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 63, "副本数据为空，屏蔽开启地图界面");
    else
      switch (t) {
        case 17:
          this.OpenMapViewAndFocus(
            t,
            e.T7n,
            (e) => {
              e &&
                0 === r.ubs.length &&
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
            t,
            e.T7n,
            void 0,
            !1,
            MapDefine_1.WORLD_MAP_MAX_SCALE,
          );
          break;
        case 22:
          this.OpenMapViewAndFocus(
            t,
            e.T7n,
            void 0,
            !1,
            MapDefine_1.WORLD_MAP_MAX_SCALE,
            !0,
          );
      }
  }
  OpenMapViewAndFocus(e, r, o, a = !0, t = 1, n = !1) {
    (!n &&
      ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
      ((n = {
        MarkId: r,
        MarkType: e,
        OpenAreaId: 0,
        IsNotFocusTween: !a,
        StartScale: t,
      }),
      WorldMapController_1.WorldMapController.OpenView(2, !1, n, o));
  }
  async RequestTrackInfo() {
    var e = Protocol_1.Aki.Protocol.ias.create(),
      e = await Net_1.Net.CallAsync(22793, e);
    if (e)
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          29157,
        );
      else {
        for (const t of e.fbs) {
          var r = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(t),
            o = this.lDi(t),
            r = {
              TrackSource: 1,
              MarkType: r?.ObjectType,
              Id: t,
              IconPath: o.Icon,
              TrackTarget: o.TrackTarget,
              TrackInstanceId: o.TargetInstanceOrMapId,
              TrackHudEnable: o.TrackHudEnable,
              TrackAutoCancelDistance: o.TrackAutoCancelDistance,
            };
          ControllerHolder_1.ControllerHolder.TrackController.StartTrack(r);
        }
        var a,
          e = ModelManager_1.ModelManager.MapModel.GetCurTrackMark();
        0 === e?.TrackMode &&
          ((a = e.MarkId),
          void 0 !==
          (a = ModelManager_1.ModelManager.TrackModel.GetTrackData(1, a))
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.TrackMark,
                a,
              )
            : ((a = this.lDi(e.MarkId)),
              (e = {
                TrackSource: 1,
                MarkType: e.MarkType,
                Id: e.MarkId,
                IconPath: a.Icon,
                TrackTarget: a.TrackTarget,
                TrackInstanceId: a.TargetInstanceOrMapId,
                TrackHudEnable: a.TrackHudEnable,
                TrackAutoCancelDistance: a.TrackAutoCancelDistance,
              }),
              ControllerHolder_1.ControllerHolder.TrackController.StartTrack(
                e,
              )));
      }
  }
  lDi(r) {
    var o = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(r);
    if (o)
      return {
        Icon: MarkItemDataUtil_1.MarkItemDataUtil.GetMarkIcon(r) ?? "",
        TrackTarget: o.EntityConfigId ?? Vector_1.Vector.Create(o.MarkVector),
        TargetInstanceOrMapId: o.RelativeDungeonId,
        TrackHudEnable: 1 === o.TrackHudEnable,
        TrackAutoCancelDistance: o.TrackAutoCancelDistance,
      };
    o = ModelManager_1.ModelManager.MapModel.GetDynamicMarkInfoById(r);
    if (o) {
      var r = ConfigManager_1.ConfigManager.MapConfig.GetCustomMarkConfig(
          o.MarkConfigId,
        ),
        a = o.TrackTarget;
      let e = void 0;
      return (
        a instanceof Vector_1.Vector
          ? (e = MapUtil_1.MapUtil.UiPosition2WorldPosition(a))
          : a instanceof Vector2D_1.Vector2D &&
            ((a = Vector_1.Vector.Create(a.X, -a.Y, 0)),
            (e = MapUtil_1.MapUtil.UiPosition2WorldPosition(a))),
        {
          Icon: r.MarkPic,
          TrackTarget: e,
          TargetInstanceOrMapId: o.MapId,
          TrackHudEnable: 1 === r?.TrackHudEnable,
          TrackAutoCancelDistance: r?.TrackAutoCancelDistance,
        }
      );
    }
    return {
      Icon: "",
      TrackTarget: Vector_1.Vector.Create(0, 0, 0),
      TargetInstanceOrMapId: 0,
    };
  }
  RequestMapMarkReplace(e, r) {
    ModelManager_1.ModelManager.MapModel.IsMarkIdExist(9, e)
      ? ((r = Protocol_1.Aki.Protocol.las.create({ T7n: e, v9n: r })),
        Net_1.Net.Call(21865, r, (e) => {
          ModelManager_1.ModelManager.MapModel.ReplaceCustomMarkIcon(
            e.T7n,
            e.v9n,
          );
        }))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 63, "试图更换不存在的自定义标记样式", [
          "MarkId",
          e,
        ]);
  }
  RequestCreateCustomMark(e, r) {
    var o;
    e
      ? ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9) >=
          ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize ||
        ((o = e instanceof Vector_1.Vector ? e.Z : 0),
        (o = this.sDi(
          Vector_1.Vector.Create(e.X, e.Y, o),
          Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_Custom,
          r,
          ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId,
        )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            63,
            "[CustomMarkItem Debug]MarkAssistant.RequestCreateCustomMark->",
            ["trackPosition", e],
            ["configId", r],
            ["request", o],
          ),
        Net_1.Net.Call(16211, o, (e) => {
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              18215,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Map",
                63,
                "[CustomMarkItem Debug]MarkAssistant.response->",
                ["response.Info", e?.YVn],
              );
        }))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Map", 63, "向服务器请求创建标记时，坐标不存在");
  }
  RequestTrackEnrichmentArea(e, r) {
    var o;
    this.KFa
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Map",
          63,
          "[地图系统]->过滤本次请求富集区信息,未收到上次返回",
          ["锁定状态：", this.KFa],
        )
      : (((o = Protocol_1.Aki.Protocol.Jm_.create()).L8n = e ?? 0),
        (this.KFa = !0),
        Net_1.Net.Call(28920, o, (e) => {
          (this.KFa = !1),
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                27796,
              ),
            e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs && r?.();
        }));
  }
  cza(e) {
    var r,
      e = ModelManager_1.ModelManager.MapModel.GetDynamicMark(e);
    e &&
      23 === e.MarkType &&
      ((e = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(23)),
      (r = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(22)),
      1 === e) &&
      1 === r &&
      1 ===
        (e = ModelManager_1.ModelManager.MapModel.GetMarkByType(22))?.size &&
      ((r = e.values().next().value),
      (e =
        ConfigManager_1.ConfigManager.MapConfig.GetEnrichmentAreaConfigByEnrichmentId(
          r.EntityConfigId,
        ))
        ? this.RequestTrackEnrichmentArea(e.ItemId, () => {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "SearchNextRichArea",
            );
          })
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Map",
            63,
            "[地图系统]富集区连续追踪找不到富集区配置",
            ["EnrichmentAreaId:", r.EntityConfigId],
          ));
  }
  RequestRemoveMapMarks(o, e) {
    e = Protocol_1.Aki.Protocol.Zss.create({ Ika: e });
    Net_1.Net.Call(17315, e, (e) => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          18868,
        );
      else
        for (const r of e.Ika)
          ModelManager_1.ModelManager.MapModel.RemoveMapMark(o, r);
    });
  }
  RequestTrackMapMark(r, o, a) {
    var e;
    o < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 63, "markId小于0, 请求追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(r, o, !0),
        a?.(0, !0))
      : ((e = {
          Type: 0,
          MarkType: r,
          MarkId: o,
          IsValidate: () => {
            return ModelManager_1.ModelManager.MapModel.IsMarkIdExist(r, o)
              ? !ModelManager_1.ModelManager.TrackModel.IsTracking(1, o) ||
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Map", 63, "试图重复追踪标记", [
                      "MarkId",
                      o,
                    ]),
                  !1)
              : (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Map", 63, "试图追踪不存在的标记", [
                    "MarkId",
                    o,
                  ]),
                !1);
          },
          Execute: async () => {
            var e = Protocol_1.Aki.Protocol.oas.create({ T7n: o }),
              e = await Net_1.Net.CallAsync(22781, e);
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Map", 63, "向服务端请求追踪标记: 标记id:", [
                "markId",
                o,
              ]),
              e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
                ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.Q4n,
                    18918,
                  ),
                  a?.(1, !0))
                : (ModelManager_1.ModelManager.MapModel.SetTrackMark(
                    r,
                    e.T7n,
                    !0,
                  ),
                  a?.(0, !0));
          },
        }),
        MapOperationQueue_1.MapOperationQueue.RunMapMark(e));
  }
  RequestCancelTrackMapMark(r, o, a) {
    var e;
    o < 0
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 63, "markId小于0, 请求取消追踪信息未发给后端"),
        ModelManager_1.ModelManager.MapModel.SetTrackMark(r, o, !1),
        a?.(0, !1))
      : ((e = {
          Type: 1,
          MarkType: r,
          MarkId: o,
          IsValidate: () => {
            return ModelManager_1.ModelManager.MapModel.IsMarkIdExist(r, o)
              ? !!ModelManager_1.ModelManager.TrackModel.IsTracking(1, o) ||
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Map", 63, "试图重复取消追踪标记", [
                      "MarkId",
                      o,
                    ]),
                  !1)
              : (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Map", 63, "试图取消追踪不存在的标记", [
                    "MarkId",
                    o,
                  ]),
                !1);
          },
          Execute: async () => {
            var e = Protocol_1.Aki.Protocol.sas.create({ T7n: o }),
              e = await Net_1.Net.CallAsync(16932, e);
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Map", 63, "向服务端请求取消追踪标记: 标记id:", [
                "markId",
                o,
              ]),
              e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
                ? (Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Map",
                      63,
                      "取消追踪标记失败: ",
                      ["标记id:", o],
                      ["错误码:", e.Q4n],
                    ),
                  a?.(1, !1))
                : (ModelManager_1.ModelManager.MapModel.SetTrackMark(
                    r,
                    e.T7n,
                    !1,
                  ),
                  a?.(0, !1));
          },
        }),
        MapOperationQueue_1.MapOperationQueue.RunMapMark(e));
  }
  RequestTeleportToTargetByTemporaryTeleport(e, r, o) {
    TeleportController_1.TeleportController.CheckCanTeleport()
      ? ControllerHolder_1.ControllerHolder.TeleportController.ShowTeleportConfirmBox(
          () => {
            ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo(),
              this.FCc(e, r, o);
          },
        ) || this.FCc(e, r, o)
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleTransmitLimit",
        );
  }
  FCc(e, r, o) {
    var a = Protocol_1.Aki.Protocol.wCs.create(),
      t = Protocol_1.Aki.Protocol.D2s.create();
    (t.Pitch = r.Pitch),
      (t.Roll = r.Roll),
      (t.Yaw = r.Yaw),
      (a.R7n = e),
      (a._8n = t),
      Net_1.Net.Call(16957, a, (e) => {
        e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.G9n,
            26268,
          );
      }),
      o?.();
  }
  UpdateCustomMapMarkPosition(e, r) {
    e = Protocol_1.Aki.Protocol.vas.create({ T7n: e, l8n: r });
    Net_1.Net.Call(21262, e, (e) => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          25408,
        );
    });
  }
}
exports.MarkAssistant = MarkAssistant;
//# sourceMappingURL=MarkAssistant.js.map
