"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterShadowController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class CharacterShadowController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.EKo(), this.OnAddEvents(), (this.Mqn = new Date()), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SetImageQuality,
      this.SKo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SetImageQuality,
      this.SKo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      );
  }
  static EKo() {
    var e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    (this.yKo = e.GetMaxRoleShadowDistance()),
      (this.IKo = e.GetMaxRoleShadowNum()),
      (this.TKo = e.GetMaxDecalShadowDistance()),
      (this.LKo = 0 !== e.IsMainPlayerUseRealRoleShadow());
  }
  static async Eqn() {
    var e,
      t = new Date();
    3 <= (t.getTime() - this.Mqn.getTime()) / 1e3 / 60 &&
      ((this.Mqn = t),
      (t = UE.Guid.NewGuid()),
      cpp_1.KuroCharacterShadowLibrary.Set(t),
      ((e = new Protocol_1.Aki.Protocol.CombatMessage.Bfs()).J4n =
        t.ToString()),
      (t = await Net_1.Net.CallAsync(2289, e))) &&
      cpp_1.KuroCharacterShadowLibrary.SetR(t.$Ls);
  }
  static OnTick(e) {
    if (
      (Net_1.Net.IsFinishLogin() && this.Eqn(),
      !(TickSystem_1.TickSystem.IsPaused || Time_1.Time.Frame - this.uIa < 15))
    ) {
      if (
        (this.RKo &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            55,
            "[CharacterShadowController]UpdateFrame",
            ["Time.Frame", Time_1.Time.Frame],
            ["this.LastUpdateFrame", this.uIa],
          ),
        (this.uIa = Time_1.Time.Frame),
        !ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() &&
          0 < this.TKo)
      ) {
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          this.TKo,
          2,
          this.DKo,
        );
        let e = 0;
        this.aMa.clear(), this.hMa.clear();
        for (const o of this.DKo) {
          var t;
          o.Valid &&
            (t = o.Entity.GetComponent(2)) &&
            t.Actor &&
            t.Owner?.WasRecentlyRenderedOnScreen &&
            (0 < this.IKo &&
            e < this.IKo &&
            o.Entity.DistanceWithCamera < this.yKo
              ? (t.Actor.CharRenderingComponent?.SetDecalShadowEnabled(!1),
                t.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(!0),
                this.aMa.add(o),
                e++,
                this.RKo &&
                  Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Character",
                    25,
                    "[CharacterShadowController] Enable Character Real Shadow",
                    ["EnableRealShadowDistance:", this.yKo],
                    ["EnableRealShadowNum:", this.IKo],
                    ["Distance:", o.Entity.DistanceWithCamera],
                    ["ActorLabel", t.Actor.ActorLabel],
                    ["i", e],
                  ))
              : (e >= this.IKo &&
                  (t.Actor.CharRenderingComponent?.SetDecalShadowEnabled(!0),
                  t.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(!1),
                  this.hMa.add(o)),
                this.RKo &&
                  Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Character",
                    25,
                    "[CharacterShadowController] Enable Decal Shadow",
                    ["MaxDecalShadowDistance:", this.TKo],
                    ["Distance:", o.Entity.DistanceWithCamera],
                    ["ActorLabel", t.Actor.ActorLabel],
                    ["i", e],
                  )));
        }
        for (const i of this.lMa) {
          var r;
          !i.Valid ||
            this.aMa.has(i) ||
            this.hMa.has(i) ||
            ((r = i.Entity.GetComponent(2)) &&
              r.Actor &&
              r.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent());
        }
      }
      this.lMa = this.hMa;
      for (const h of this.AKo) {
        var a;
        h.Valid &&
          (a = h.Entity.GetComponent(2)) &&
          a.Actor &&
          (h.Entity?.Active
            ? this.LKo
              ? (a.Actor.CharRenderingComponent?.SetDecalShadowEnabled(!1),
                a.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(!0))
              : (a.Actor.CharRenderingComponent?.SetDecalShadowEnabled(!0),
                a.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(!1))
            : a.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent(),
          this.RKo) &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            25,
            "[CharacterShadowController] Set Role Shadow",
            ["Active", h.Entity?.Active],
            ["IsMainPlayerUseRealRoleShadow", this.LKo],
            ["ActorLabel", a.Actor.ActorLabel],
            ["type", a.Actor.CharRenderingComponent?.RenderType],
          );
      }
    }
  }
}
(exports.CharacterShadowController = CharacterShadowController),
  ((_a = CharacterShadowController).IsTickEvenPausedInternal = !0),
  (CharacterShadowController.yKo = 0),
  (CharacterShadowController.IKo = 0),
  (CharacterShadowController.TKo = 0),
  (CharacterShadowController.uIa = 0),
  (CharacterShadowController.LKo = !1),
  (CharacterShadowController.AKo = new Set()),
  (CharacterShadowController.DKo = []),
  (CharacterShadowController.hMa = new Set()),
  (CharacterShadowController.aMa = new Set()),
  (CharacterShadowController.lMa = new Set()),
  (CharacterShadowController.RKo = !1),
  (CharacterShadowController.Mqn = void 0),
  (CharacterShadowController.SKo = () => {
    _a.EKo();
  }),
  (CharacterShadowController.GUe = (e, t, r) => {
    var a = t.Entity?.GetComponent(0);
    a &&
      a.IsCharacter() &&
      (a.IsRole() || 0 !== a.GetSummonerPlayerId() || a.IsVision()
        ? _a.AKo.add(t)
        : (a = t.Entity.GetComponent(2)) &&
          a.Actor &&
          0 === _a.IKo &&
          a.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent());
  });
//# sourceMappingURL=CharacterShadowController.js.map
