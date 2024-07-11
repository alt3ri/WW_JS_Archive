"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PanelQteResultHandler = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneTeamController_1 = require("../SceneTeam/SceneTeamController");
class PanelQteResultHandler {
  Handle(r) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "PanelQte",
        18,
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
    if ((o = 0 === e.Target ? t.GetSourceEntity() : this.TNi())) {
      let r = void 0,
        a = void 0;
      var l = e.AddTags,
        n = l.Num();
      for (let e = 0; e < n; e++) {
        var i = l.Get(e);
        (r = r ?? o.GetComponent(185)).AddTag(i.TagId);
      }
      var s = e.RemoveTags,
        v = s.Num();
      for (let e = 0; e < v; e++) {
        var _ = s.Get(e);
        (r = r ?? o.GetComponent(185)).RemoveTag(_.TagId);
      }
      var d = e.AddBuffs,
        c = d.Num();
      if (0 < c) {
        var f = t.GetSourceEntity()?.GetComponent(0).GetCreatureDataId(),
          u = t.PreMessageId;
        if (f)
          for (let e = 0; e < c; e++) {
            var g = d.Get(e);
            (a = a ?? o.GetComponent(157)).AddBuff(g, {
              InstigatorId: f,
              Reason: "界面QTE结算时添加",
              PreMessageId: u,
            });
          }
      }
      var M = e.CustomActions,
        T = M.Num();
      for (let e = 0; e < T; e++) {
        var m = M.Get(e);
        this.LNi(m, t, o);
      }
    }
  }
  LNi(e, r, a) {
    switch (e) {
      case 0:
        var t = a.GetComponent(157);
        t && t.RemoveBuffByEffectType(36, "界面QTE解除冰冻buff");
        break;
      case 1:
        this.DNi();
    }
  }
  DNi() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (0 === e?.CanGoDown(!0)) {
      var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(),
        t = a.length,
        o = a.indexOf(e);
      for (let r = 1; r < t; r++) {
        let e = o + r;
        e >= t && (e -= t);
        var l = a[e];
        if (0 === l?.CanGoBattle())
          return void SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(
            l.GetCreatureDataId(),
          );
      }
    }
  }
  TNi() {
    var e = Global_1.Global.BaseCharacter;
    if (e?.IsValid()) return e.CharacterActorComponent?.Entity;
  }
}
exports.PanelQteResultHandler = PanelQteResultHandler;
//# sourceMappingURL=PanelQteResultHandler.js.map
