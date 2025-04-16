"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, i) {
    var s,
      o = arguments.length,
      r =
        o < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, n))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, n, i);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (r = (o < 3 ? s(r) : 3 < o ? s(t, n, r) : s(t, n)) || r);
    return 3 < o && r && Object.defineProperty(t, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemFishingPointComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager");
let SceneItemFishingPointComponent = class SceneItemFishingPointComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.EIe = void 0),
      (this.FP_ = void 0),
      (this._H_ = (e) => {
        this.FP_?.EnableHeadInfo(e);
      });
  }
  OnStart() {
    var e;
    return (
      (this.EIe = this.Entity.GetComponent(0)),
      (this.FP_ = this.Entity.GetComponent(80)),
      "FishingPoint" !== this.EIe.GetBaseInfo()?.Category?.FishingMechanismType
        ? this.gn_(!0)
        : ((e = this.EIe.GetPbDataId()),
          (e =
            ModelManager_1.ModelManager.FishingModel.GetFishingPointDataByPbEntityId(
              e,
            ))
            ? this.gn_(0 < e.CurrentCount)
            : this.gn_(!1)),
      !0
    );
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this._H_,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.DriveFishingShipStateChanged,
          this._H_,
        ),
      !0
    );
  }
  RefreshFishingPoint(e) {
    this.gn_(0 < e.CurrentCount);
  }
  gn_(e) {
    e
      ? (this.Entity.EnableByKey(3),
        (e =
          ModelManager_1.ModelManager.FishingModel.GetShipData().IsShipDriving()),
        this._H_(e),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.DriveFishingShipStateChanged,
          this._H_,
        ) ||
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.DriveFishingShipStateChanged,
            this._H_,
          ))
      : (EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.DriveFishingShipStateChanged,
          this._H_,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.DriveFishingShipStateChanged,
            this._H_,
          ),
        this.Entity.DisableByKey(3),
        this._H_(!1));
  }
};
(SceneItemFishingPointComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(270)],
  SceneItemFishingPointComponent,
)),
  (exports.SceneItemFishingPointComponent = SceneItemFishingPointComponent);
//# sourceMappingURL=SceneItemFishingPointComponent.js.map
