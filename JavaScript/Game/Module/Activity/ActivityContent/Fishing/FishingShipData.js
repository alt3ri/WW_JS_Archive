"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingShipData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  MapDefine_1 = require("../../../Map/MapDefine");
class FishingShipData {
  constructor() {
    (this.dh_ = 1),
      (this.mh_ = !1),
      (this.Ch_ = !1),
      (this.yx_ = !1),
      (this.Wpo = 0),
      (this.sDe = void 0),
      (this.osn = void 0),
      (this.Uk_ = 0),
      (this.gh_ = () => {
        var e = this.sDe;
        e &&
          EventSystem_1.EventSystem.HasWithTarget(
            e,
            EventDefine_1.EEventName.RemoveEntity,
            this.gh_,
          ) &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            e,
            EventDefine_1.EEventName.RemoveEntity,
            this.gh_,
          ),
          ModelManager_1.ModelManager.MapModel.SyncLocalShipLocationToCacheInfo(),
          ModelManager_1.ModelManager.MapModel.RemoveMapMarkByType(31),
          ModelManager_1.ModelManager.MapModel.TryRecreateShipMark()),
          e &&
            e.Entity &&
            (EventSystem_1.EventSystem.HasWithTarget(
              e.Entity,
              EventDefine_1.EEventName.OnVehicleBeenEntered,
              this.M6l,
            ) &&
              EventSystem_1.EventSystem.RemoveWithTarget(
                e.Entity,
                EventDefine_1.EEventName.OnVehicleBeenEntered,
                this.M6l,
              ),
            EventSystem_1.EventSystem.HasWithTarget(
              e.Entity,
              EventDefine_1.EEventName.OnVehicleBeenLeaved,
              this.E6l,
            )) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              e.Entity,
              EventDefine_1.EEventName.OnVehicleBeenLeaved,
              this.E6l,
            ),
          this.Sx_(!1),
          (this.sDe = void 0),
          (this.osn = void 0);
      }),
      (this.M6l = () => {
        this.Sx_(!0);
      }),
      (this.E6l = () => {
        this.Sx_(!1);
      });
  }
  RefreshData(e) {
    (this.dh_ = e.Z7n),
      (this.Ch_ = e.qT_),
      (this.mh_ = e.GT_),
      (this.Wpo = MathUtils_1.MathUtils.LongToNumber(e.F4n)),
      (this.Uk_ = e.XP_),
      this.RefreshShipEntity(this.Wpo);
  }
  SetLastPortId(e) {
    this.Uk_ = e;
  }
  SetIsInPortInternal(e) {
    this.mh_ = e;
  }
  RefreshShipEntity(t) {
    if (t === this.Wpo) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo),
        i = t?.Entity;
      if (t?.Valid && i?.IsStart && t.Id !== this.sDe?.Id) {
        this.gh_(), (this.sDe = t), (this.osn = i.GetComponent(170));
        var r = i.GetComponent(1)?.Owner,
          r =
            (r?.IsValid() &&
              GlobalData_1.GlobalData.BpEventManager.当捕鱼船创建时.Broadcast(
                r,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.FishingShipDataRefresh,
            ),
            i.GetComponent(230)),
          n =
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
        let e = !1;
        r && n && (e = r.IsDriver(n)),
          this.Sx_(e),
          EventSystem_1.EventSystem.AddWithTarget(
            t,
            EventDefine_1.EEventName.RemoveEntity,
            this.gh_,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            i,
            EventDefine_1.EEventName.OnVehicleBeenEntered,
            this.M6l,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            i,
            EventDefine_1.EEventName.OnVehicleBeenLeaved,
            this.E6l,
          ),
          this.xuc(this.sDe);
      }
    }
  }
  xuc(e) {
    (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
        ModelManager_1.ModelManager.OnlineModel.OwnerId) ||
      ((e = new MapDefine_1.FishingShipMarkCreateInfo({
        TrackTarget: e.Id,
        MarkConfigId: MapDefine_1.FISHING_SHIP_MARK_ID,
        MarkType: 31,
        TrackSource: 1,
        EntityConfigId: e.PbDataId,
        MapAndDungeonInfo: { MapConfigId: MapDefine_1.BIG_WORLD_MAP_ID },
      })),
      ModelManager_1.ModelManager.MapModel.RemoveMapMarkByType(31),
      ModelManager_1.ModelManager.MapModel.CreateMapMark(e));
  }
  Sx_(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Fishing", 48, "驾驶捕鱼船状态改变", ["isDriving", e]),
      (this.yx_ = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        e,
      );
  }
  GetCreatureDataId() {
    return this.Wpo;
  }
  GetEntityHandle() {
    var e = this.sDe;
    if (e?.Valid) return e;
  }
  GetCurrentHp() {
    return (
      this.osn?.GetCurrentValue(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
      ) ?? 0
    );
  }
  GetMaxHp() {
    return (
      this.osn?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n) ?? 0
    );
  }
  GetCurrentSkinId() {
    return this.dh_;
  }
  AddAttributeListener(e, t) {
    this.osn?.AddListener(e, t);
  }
  RemoveAttributeListener(e, t) {
    this.osn?.RemoveListener(e, t);
  }
  GetAttributeValue(e) {
    return this.osn?.GetCurrentValue(e) ?? 0;
  }
  IsShipInPort() {
    return this.mh_;
  }
  IsShipSailing() {
    return this.Ch_;
  }
  IsShipDriving() {
    return this.yx_;
  }
  GetLastPortId() {
    return this.Uk_;
  }
}
exports.FishingShipData = FishingShipData;
//# sourceMappingURL=FishingShipData.js.map
