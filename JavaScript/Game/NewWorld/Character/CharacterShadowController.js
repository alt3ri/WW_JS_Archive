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
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  ModelManager_1 = require("../../Manager/ModelManager");
class CharacterShadowController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.EKo(), this.OnAddEvents(), (this.Uqn = new Date()), !0;
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
    (this.yKo =
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMaxRoleShadowDistance()),
      (this.IKo =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMaxRoleShadowNum()),
      (this.TKo =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMaxDecalShadowDistance()),
      (this.LKo =
        0 !==
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMainPlayerUseRealRoleShadow());
  }
  static async xqn() {
    var e,
      t = new Date();
    3 <= (t.getTime() - this.Uqn.getTime()) / 1e3 / 60 &&
      ((this.Uqn = t),
      (t = UE.Guid.NewGuid()),
      cpp_1.KuroCharacterShadowLibrary.Set(t),
      ((e = new Protocol_1.Aki.Protocol.CombatMessage.Vfs()).s5n =
        t.ToString()),
      (t = await Net_1.Net.CallAsync(24130, e))) &&
      cpp_1.KuroCharacterShadowLibrary.SetR(t.YLs);
  }
  static OnTick(e) {
    if (
      (Net_1.Net.IsFinishLogin() && this.xqn(),
      !(TickSystem_1.TickSystem.IsPaused || Time_1.Time.Frame - this.MDa < 15))
    ) {
      if (
        (this.RKo &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            55,
            "[CharacterShadowController]UpdateFrame",
            ["Time.Frame", Time_1.Time.Frame],
            ["this.LastUpdateFrame", this.MDa],
          ),
        (this.MDa = Time_1.Time.Frame),
        !ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() &&
          0 < this.TKo)
      ) {
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          this.TKo,
          62,
          this.DKo,
        );
        let e = 0;
        this.dya.clear(), this.Cya.clear();
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
                this.dya.add(o),
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
                  this.Cya.add(o)),
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
        for (const i of this.gya) {
          var r;
          !i.Valid ||
            this.dya.has(i) ||
            this.Cya.has(i) ||
            ((r = i.Entity.GetComponent(2)) &&
              r.Actor &&
              r.Actor.CharRenderingComponent?.DisableAllShadowByDecalShadowComponent());
        }
      }
      this.gya = this.Cya;
      for (const n of this.AKo) {
        var a;
        n.Valid &&
          (a = n.Entity.GetComponent(2)) &&
          a.Actor &&
          (n.Entity?.Active
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
            ["Active", n.Entity?.Active],
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
  (CharacterShadowController.MDa = 0),
  (CharacterShadowController.LKo = !1),
  (CharacterShadowController.AKo = new Set()),
  (CharacterShadowController.DKo = []),
  (CharacterShadowController.Cya = new Set()),
  (CharacterShadowController.dya = new Set()),
  (CharacterShadowController.gya = new Set()),
  (CharacterShadowController.RKo = !1),
  (CharacterShadowController.Uqn = void 0),
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
