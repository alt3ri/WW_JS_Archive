"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneBattleInteractModel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  FlySceneInteract_1 = require("./FlySceneInteract"),
  SceneBattleInteractDefine_1 = require("./SceneBattleInteractDefine"),
  SceneBattleInteractEffect_1 = require("./SceneBattleInteractEffect");
class SceneBattleInteractModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.GOc = !1),
      (this.FOc = 0),
      (this.EffectMap = new Map()),
      (this.DefaultWeaponInteractConfig = void 0),
      (this.Zn1 = void 0);
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.mTa(), !0;
  }
  CreateSceneBattleInteract(e, t = 0, r = 0) {
    var n;
    if (this.Open)
      return (
        (n = new SceneBattleInteractEffect_1.SceneBattleInteractEffect()),
        SceneBattleInteractModel.NOc++,
        (n.Id = SceneBattleInteractModel.NOc),
        n.Init(e, t, r),
        this.EffectMap.set(n.Id, n),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 17, "CreateSceneBattleInteract", [
            "id",
            n.Id,
          ]),
        n
      );
  }
  DestroySceneBattleInteract(e) {
    var t = this.EffectMap.get(e);
    t && (t.Destroy(), this.EffectMap.delete(e));
  }
  SetSceneBattleInteractEnable(e, t, r = 0) {
    e = this.EffectMap.get(e);
    return !!e && (e.SetEnable(t, r), !0);
  }
  GetSceneBattleInteract(e) {
    return this.EffectMap.get(e);
  }
  GetDefaultWeaponInteractConfig() {
    if (this.Open)
      return (
        this.DefaultWeaponInteractConfig ||
          (this.DefaultWeaponInteractConfig =
            ResourceSystem_1.ResourceSystem.Load(
              SceneBattleInteractDefine_1.WEAPON_INTERACT_CONFIG_PATH,
              UE.BP_SceneBattleInteract_C,
            )),
        this.DefaultWeaponInteractConfig
      );
  }
  get Open() {
    return this.GOc;
  }
  set Open(e) {
    this.GOc !== e && ((this.GOc = e), this.GOc ? this.es1() : this.mTa());
  }
  get Debug() {
    return this.FOc;
  }
  set Debug(e) {
    if (this.FOc !== e) {
      this.FOc = e;
      for (const t of this.EffectMap.values()) t.SetDebug(this.FOc);
    }
  }
  mTa() {
    for (const e of this.EffectMap.values()) e.Destroy();
    this.EffectMap.clear(),
      this.Zn1 && (this.Zn1.Destroy(), (this.Zn1 = void 0));
  }
  es1() {
    this.Zn1 ||
      ((this.Zn1 = new FlySceneInteract_1.FlySceneInteract()), this.Zn1.Init());
  }
}
(exports.SceneBattleInteractModel = SceneBattleInteractModel).NOc = 0;
//# sourceMappingURL=SceneBattleInteractModel.js.map
