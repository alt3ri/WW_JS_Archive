"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PanelQteResultHandler = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CooperationController_1 = require("../Battle/Cooperation/CooperationController"),
  RUSH_SKILL_ID = 100001,
  HOOK_SKILL_ID = 100020;
class PanelQteResultHandler {
  Handle(r) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "PanelQte",
        17,
        "通用界面QTE结算",
        ["qteId", r.QteId],
        ["success", r.Success],
      );
    var a = r.Success ? r.Config.SuccessActions : r.Config.FailActions,
      t = a.Num();
    for (let e = 0; e < t; e++) {
      var o = a.Get(e);
      this.kUe(o, r);
    }
  }
  kUe(e, t) {
    let o = void 0;
    if ((o = 0 === e.Target ? t.GetSourceEntity() : this.TOi())) {
      let r = void 0,
        a = void 0;
      var l = e.AddTags,
        i = l.Num();
      for (let e = 0; e < i; e++) {
        var n = l.Get(e);
        (r = r ?? o.GetComponent(203)).AddTag(n.TagId);
      }
      var s = e.RemoveTags,
        _ = s.Num();
      for (let e = 0; e < _; e++) {
        var d = s.Get(e);
        (r = r ?? o.GetComponent(203)).RemoveTag(d.TagId);
      }
      var v = e.AddBuffs,
        u = v.Num();
      if (0 < u) {
        var c = t.GetSourceEntity()?.GetComponent(0).GetCreatureDataId(),
          f = t.PreMessageId;
        if (c)
          if (0 <= t.BuffIndex) {
            var C = Number(v.Get(t.BuffIndex));
            (a = a ?? o.GetComponent(172)).AddBuff(C, {
              InstigatorId: c,
              Reason: "界面QTE结算时添加",
              PreMessageId: f,
            });
          } else
            for (let e = 0; e < u; e++) {
              var p = Number(v.Get(e));
              (a = a ?? o.GetComponent(172)).AddBuff(p, {
                InstigatorId: c,
                Reason: "界面QTE结算时添加",
                PreMessageId: f,
              });
            }
      }
      var I = e.CustomActions,
        g = I.Num();
      for (let e = 0; e < g; e++) {
        var h = I.Get(e);
        this.LOi(h, t, o);
      }
    }
  }
  LOi(e, r, a) {
    switch (e) {
      case 0:
        var t = a.GetComponent(172);
        t && t.RemoveBuffByEffectType(36, "界面QTE解除冰冻buff");
        break;
      case 1:
        this.DOi();
        break;
      case 2: {
        const a = this.TOi();
        a?.GetComponent(173)?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb
          ? (t = a?.GetComponent(175))?.Valid && t.ClimbDash()
          : a
              ?.GetComponent(39)
              ?.BeginSkill(RUSH_SKILL_ID, {
                Reason: "PanelQteResultHandler.HandleCustomAction.Rush",
              });
        break;
      }
      case 3:
        this.TOi()
          ?.GetComponent(39)
          ?.BeginSkill(HOOK_SKILL_ID, {
            Reason: "PanelQteResultHandler.HandleCustomAction.Hook",
          });
        break;
      case 4:
        this.TOi()?.GetComponent(176)?.TryJumpInFreeRunning();
    }
  }
  DOi() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (!e?.EntityHandle?.Entity?.GetComponent(203)?.HasTag(-1697149502)) {
      var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(),
        t = a.length,
        o = a.indexOf(e);
      for (let r = 1; r < t; r++) {
        let e = o + r;
        e >= t && (e -= t);
        var l = a[e];
        if (0 === l?.CanGoBattle())
          return void CooperationController_1.CooperationController.TryCooperate(
            l.GetCreatureDataId(),
          );
      }
    }
  }
  TOi() {
    var e = Global_1.Global.BaseCharacter;
    if (e?.IsValid()) return e.CharacterActorComponent?.Entity;
  }
}
exports.PanelQteResultHandler = PanelQteResultHandler;
//# sourceMappingURL=PanelQteResultHandler.js.map
