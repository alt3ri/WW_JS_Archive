"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RangeComponentConfigHelper = void 0);
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
class CompConfig {
  constructor() {
    (this.NeedReqEntityAccessRange = !1),
      (this.NeedReqPlayerAccessRange = !1),
      (this.NeedPendingEmitEvent = !1),
      (this.NeedDisablePassiveCollision = !1),
      (this.NeedUseFullCollisionPreset = !1);
  }
}
class RangeComponentConfigHelper {
  constructor() {
    (this.Bql = new Map()),
      (this.bql = (t) => {
        t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "TriggerComponent",
        );
        return !(
          !t ||
          (t.Match.OnlyPlayer &&
            !t.ChangeRoleTrigger &&
            !t.Match.AllCharacter &&
            !t.Match.Categories?.length)
        );
      });
  }
  static get Instance() {
    return (
      void 0 === this.cj &&
        ((this.cj = new RangeComponentConfigHelper()), this.cj.Init()),
      this.cj
    );
  }
  get CompConfig() {
    return this.Bql;
  }
  qql(t, o, n) {
    let e = this.Bql.get(t);
    e || ((e = new CompConfig()), this.Bql.set(t, e)),
      (e.NeedReqEntityAccessRange = o),
      (e.NeedReqPlayerAccessRange = n);
  }
  Gql(t, o) {
    let n = this.Bql.get(t);
    n || ((n = new CompConfig()), this.Bql.set(t, n)),
      (n.NeedPendingEmitEvent = o);
  }
  QKl(t, o, n) {
    let e = this.Bql.get(t);
    e || ((e = new CompConfig()), this.Bql.set(t, e)),
      (e.NeedDisablePassiveCollision = o),
      (e.NeedUseFullCollisionPreset = n);
  }
  Init() {
    this.kql(), this.Oql(), this.KKl();
  }
  kql() {
    this.qql("TrampleComponent", !0, !1),
      this.qql("EffectAreaComponent", !1, !0),
      this.qql("SkyboxComponent", !1, !1),
      this.qql("ProgressBarControlComponent", !1, !1),
      this.qql("EntityStateAudioComponent", !1, !1),
      this.qql("TriggerComponent", this.bql, !0),
      this.qql("ClientTriggerComponent", !1, !1),
      this.qql("AirPassageComponent", !1, !0),
      this.qql("PortalComponent", !1, !0),
      this.qql("LocationSafetyComponent", !1, !1),
      this.qql("FanComponent", !1, !1),
      this.qql("BeamCastComponent", !1, !1),
      this.qql("MonitorComponent", !1, !1),
      this.qql("LiftComponent", !1, !1),
      this.qql("ExploreSkillInteractComponent", !1, !1),
      this.qql("BuffProducerComponent", !1, !1),
      this.qql("BuffConsumerComponent", !1, !1),
      this.qql("SceneItemAiComponent", !1, !1),
      this.qql("AiAlertNotifyComponent", !1, !1),
      this.qql("ConveyorBeltComponent", !1, !1),
      this.qql("SceneBulletComponent", !1, !1),
      this.qql("ItemFoundation2", !1, !1),
      this.qql("EntityCustomAudioComponent", !1, !1);
  }
  Oql() {
    this.Gql("TrampleComponent", !1),
      this.Gql("EffectAreaComponent", !1),
      this.Gql("SkyboxComponent", !1),
      this.Gql("ProgressBarControlComponent", !1),
      this.Gql("EntityStateAudioComponent", !1),
      this.Gql("TriggerComponent", !1),
      this.Gql("ClientTriggerComponent", !1),
      this.Gql("AirPassageComponent", !1),
      this.Gql("PortalComponent", !1),
      this.Gql("LocationSafetyComponent", !1),
      this.Gql("FanComponent", !1),
      this.Gql("BeamCastComponent", !0),
      this.Gql("MonitorComponent", !1),
      this.Gql("LiftComponent", !1),
      this.Gql("ExploreSkillInteractComponent", !1),
      this.Gql("BuffProducerComponent", !1),
      this.Gql("BuffConsumerComponent", !1),
      this.Gql("SceneItemAiComponent", !1),
      this.Gql("AiAlertNotifyComponent", !1),
      this.Gql("ConveyorBeltComponent", !1),
      this.Gql("SceneBulletComponent", !1),
      this.Gql("ItemFoundation2", !1),
      this.Gql("EntityCustomAudioComponent", !1);
  }
  KKl() {
    this.QKl("TrampleComponent", !1, !0),
      this.QKl("EffectAreaComponent", !1, !1),
      this.QKl("SkyboxComponent", !1, !1),
      this.QKl("ProgressBarControlComponent", !1, !0),
      this.QKl("EntityStateAudioComponent", !1, !1),
      this.QKl("TriggerComponent", !1, this.bql),
      this.QKl("ClientTriggerComponent", !1, !0),
      this.QKl("AirPassageComponent", !1, !1),
      this.QKl("PortalComponent", !1, !1),
      this.QKl("LocationSafetyComponent", !1, !1),
      this.QKl("FanComponent", !0, !0),
      this.QKl("BeamCastComponent", !1, !0),
      this.QKl("MonitorComponent", !0, !1),
      this.QKl("LiftComponent", !0, !0),
      this.QKl("ExploreSkillInteractComponent", !1, !1),
      this.QKl("BuffProducerComponent", !1, !1),
      this.QKl("BuffConsumerComponent", !1, !1),
      this.QKl("SceneItemAiComponent", !1, !1),
      this.QKl("AiAlertNotifyComponent", !1, !0),
      this.QKl("ConveyorBeltComponent", !1, !0),
      this.QKl("SceneBulletComponent", !1, !0),
      this.QKl("ItemFoundation2", !1, !0),
      this.QKl("EntityCustomAudioComponent", !1, !1),
      this.QKl("SceneItemMovementComponent", !0, !1),
      this.QKl("RotatorComponent2", !0, !1),
      this.QKl("AttachTargetComponent", !0, !1);
  }
}
(exports.RangeComponentConfigHelper = RangeComponentConfigHelper).cj = void 0;
//# sourceMappingURL=RangeComponentConfigHelper.js.map
