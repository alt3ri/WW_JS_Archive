"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureCompassHandle = void 0);
const Stats_1 = require("../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TreasureCompassUnit_1 = require("../HudUnit/TreasureCompassUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class TreasureCompassHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.uHl = void 0),
      (this.dHl = !1),
      (this.A2n = 0),
      (this.mHl = (e) => {
        (this.dHl = e) || this.uHl?.SetActive(!1);
      });
  }
  OnInitialize() {
    super.OnInitialize(),
      (this.dHl =
        ModelManager_1.ModelManager.TreasureHuntModel.IsCompassActive()),
      (this.A2n = 0),
      this.CHl();
  }
  OnDestroyed() {
    this.uHl && (this.DestroyHudUnit(this.uHl), (this.uHl = void 0)),
      ControllerHolder_1.ControllerHolder.TreasureHuntController.ClearNearbyTrack();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnUpdateCompassActive,
      this.mHl,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnUpdateCompassActive,
      this.mHl,
    );
  }
  CHl() {
    this.uHl = this.NewHudUnitWithReturn(
      TreasureCompassUnit_1.TreasureCompassUnit,
      "UiItem_ShipRing",
      !1,
      () => {
        this.uHl?.InitHide();
      },
      !0,
    );
  }
  OnTick(e) {
    if (this.dHl) {
      TreasureCompassHandle.Ult.Start();
      var s = ModelManager_1.ModelManager.TreasureHuntModel.GetTreasureList();
      if (s && 0 !== s.length) {
        var t =
          Global_1.Global.BaseCharacter?.CharacterActorComponent
            ?.ActorLocationProxy;
        if (t) {
          let e = void 0;
          for (const r of s)
            if (r.IsEnableCompassTracking) {
              e = r;
              break;
            }
          e
            ? e.IsNearbyTracking
              ? e.DistSquared > e.NearbyTrackHideRangeSquared &&
                ((this.A2n = 0),
                ControllerHolder_1.ControllerHolder.TreasureHuntController.ClearNearbyTrack())
              : e.DistSquared < e.NearbyTrackShowRangeSquared &&
                e.EntityId !== this.A2n &&
                ((this.A2n = e.EntityId),
                ControllerHolder_1.ControllerHolder.TreasureHuntController.SetNearbyTrack(
                  e.EntityId,
                ))
            : ((this.A2n = 0),
              ControllerHolder_1.ControllerHolder.TreasureHuntController.ClearNearbyTrack()),
            this.uHl?.RefreshCompass(s, t);
        }
      }
      TreasureCompassHandle.Ult.Stop();
    }
  }
}
(exports.TreasureCompassHandle = TreasureCompassHandle).Ult =
  Stats_1.Stat.Create("TreasureCompassHandleTick");
//# sourceMappingURL=TreasureCompassHandle.js.map
