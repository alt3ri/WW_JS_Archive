"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterShadowController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
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
    return this.IWo(), this.OnAddEvents(), (this.sBn = new Date()), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SetImageQuality,
      this.TWo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SetImageQuality,
      this.TWo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  static IWo() {
    var e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get();
    (this.LWo = e.GetMaxRoleShadowDistance()),
      (this.DWo = e.GetMaxRoleShadowNum()),
      (this.RWo = e.GetMaxDecalShadowDistance()),
      (this.UWo = 0 !== e.IsMainPlayerUseRealRoleShadow());
  }
  static async hBn() {
    var e,
      t = new Date();
    3 <= (t.getTime() - this.sBn.getTime()) / 1e3 / 60 &&
      ((this.sBn = t),
      (t = UE.Guid.NewGuid()),
      cpp_1.KuroCharacterShadowLibrary.Set(t),
      ((e = new Protocol_1.Aki.Protocol.CombatMessage.yms()).Ekn =
        t.ToString()),
      (t = await Net_1.Net.CallAsync(22205, e))) &&
      cpp_1.KuroCharacterShadowLibrary.SetR(t.IEs);
  }
  static OnTick(e) {
    if (
      (Net_1.Net.IsFinishLogin() && this.hBn(),
      !TickSystem_1.TickSystem.IsPaused &&
        !ModelManager_1.ModelManager.PlotModel.IsInPlot)
    ) {
      var t,
        r,
        a = new Set();
      if (0 < this.LWo && 0 < this.DWo) {
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          this.LWo,
          2,
          this.AWo,
        );
        let e = 0;
        for (const i of this.AWo)
          if (i.Valid) {
            var o = i.Entity.GetComponent(2);
            if (
              (o &&
                o.Actor &&
                (o.Actor.CharRenderingComponent?.SetDecalShadowEnabled(!1),
                o.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(!0),
                a.add(i),
                e++,
                this.PWo) &&
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Character",
                  25,
                  "[CharacterShadowController] Enable Character Real Shadow",
                  ["EnableRealShadowDistance:", this.LWo],
                  ["EnableRealShadowNum:", this.DWo],
                  ["Distance:", i.Entity.DistanceWithCamera],
                  ["ActorLabel", o.Actor.ActorLabel],
                  ["i", e],
                ),
              e >= this.DWo)
            )
              break;
          }
      }
      for (const n of this.xWo)
        !n.Valid ||
          a.has(n) ||
          ((t = n.Entity.GetComponent(2)) &&
            t.Actor &&
            (n.Entity.DistanceWithCamera >= this.RWo
              ? t.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent()
              : (t.Actor.CharRenderingComponent?.SetDecalShadowEnabled(!0),
                t.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(!1)),
            this.PWo) &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              25,
              "[CharacterShadowController] Disable Character Real Shadow",
              ["DistanceWithCamera", n.Entity.DistanceWithCamera],
              ["MaxDecalShadowDistance", this.RWo],
              ["ActorLabel", t.Actor.ActorLabel],
            ));
      for (const s of this.wWo)
        s.Valid &&
          (r = s.Entity.GetComponent(2)) &&
          r.Actor &&
          (s.Entity?.Active
            ? this.UWo
              ? (r.Actor.CharRenderingComponent?.SetDecalShadowEnabled(!1),
                r.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(!0))
              : (r.Actor.CharRenderingComponent?.SetDecalShadowEnabled(!0),
                r.Actor.CharRenderingComponent?.SetRealtimeShadowEnabled(!1))
            : r.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent(),
          this.PWo) &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            25,
            "[CharacterShadowController] Set Role Shadow",
            ["Active", s.Entity?.Active],
            ["IsMainPlayerUseRealRoleShadow", this.UWo],
            ["ActorLabel", r.Actor.ActorLabel],
            ["type", r.Actor.CharRenderingComponent?.RenderType],
          );
    }
  }
}
(exports.CharacterShadowController = CharacterShadowController),
  ((_a = CharacterShadowController).IsTickEvenPausedInternal = !0),
  (CharacterShadowController.LWo = 0),
  (CharacterShadowController.DWo = 0),
  (CharacterShadowController.RWo = 0),
  (CharacterShadowController.UWo = !1),
  (CharacterShadowController.wWo = new Set()),
  (CharacterShadowController.xWo = new Set()),
  (CharacterShadowController.AWo = []),
  (CharacterShadowController.PWo = !1),
  (CharacterShadowController.sBn = void 0),
  (CharacterShadowController.TWo = () => {
    _a.IWo();
  }),
  (CharacterShadowController.GUe = (e, t, r) => {
    var a = t.Entity?.GetComponent(0);
    a &&
      a.IsCharacter() &&
      (a.IsRole() || 0 !== a.GetSummonerPlayerId() || a.IsVision()
        ? _a.wWo
        : _a.xWo
      ).add(t);
  }),
  (CharacterShadowController.zpe = (e, t) => {
    _a.xWo.delete(t);
  });
//# sourceMappingURL=CharacterShadowController.js.map
