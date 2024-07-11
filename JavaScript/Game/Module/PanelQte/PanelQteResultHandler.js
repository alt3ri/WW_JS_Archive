"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PanelQteResultHandler = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneTeamController_1 = require("../SceneTeam/SceneTeamController");
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
    const a = r.Success ? r.Config.SuccessActions : r.Config.FailActions;
    const t = a.Num();
    for (let e = 0; e < t; e++) {
      const o = a.Get(e);
      this.kUe(o, r);
    }
  }
  kUe(e, t) {
    let o = void 0;
    if ((o = e.Target === 0 ? t.GetSourceEntity() : this.TNi())) {
      let r = void 0;
      let a = void 0;
      const l = e.AddTags;
      const n = l.Num();
      for (let e = 0; e < n; e++) {
        const i = l.Get(e);
        (r = r ?? o.GetComponent(185)).AddTag(i.TagId);
      }
      const s = e.RemoveTags;
      const v = s.Num();
      for (let e = 0; e < v; e++) {
        const _ = s.Get(e);
        (r = r ?? o.GetComponent(185)).RemoveTag(_.TagId);
      }
      const d = e.AddBuffs;
      const c = d.Num();
      if (c > 0) {
        const f = t.GetSourceEntity()?.GetComponent(0).GetCreatureDataId();
        const u = t.PreMessageId;
        if (f)
          for (let e = 0; e < c; e++) {
            const g = d.Get(e);
            (a = a ?? o.GetComponent(157)).AddBuff(g, {
              InstigatorId: f,
              Reason: "界面QTE结算时添加",
              PreMessageId: u,
            });
          }
      }
      const M = e.CustomActions;
      const T = M.Num();
      for (let e = 0; e < T; e++) {
        const m = M.Get(e);
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
    const e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (e?.CanGoDown(!0) === 0) {
      const a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      const t = a.length;
      const o = a.indexOf(e);
      for (let r = 1; r < t; r++) {
        let e = o + r;
        e >= t && (e -= t);
        const l = a[e];
        if (l?.CanGoBattle() === 0)
          return void SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(
            l.GetCreatureDataId(),
          );
      }
    }
  }
  TNi() {
    const e = Global_1.Global.BaseCharacter;
    if (e?.IsValid()) return e.CharacterActorComponent?.Entity;
  }
}
exports.PanelQteResultHandler = PanelQteResultHandler;
// # sourceMappingURL=PanelQteResultHandler.js.map
