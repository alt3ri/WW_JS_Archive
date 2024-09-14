"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PanelQteResultHandler = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  InputController_1 = require("../../Input/InputController"),
  InputEnums_1 = require("../../Input/InputEnums"),
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
    var t = r.Success ? r.Config.SuccessActions : r.Config.FailActions,
      n = t.Num();
    for (let e = 0; e < n; e++) {
      var a = t.Get(e);
      this.kUe(a, r);
    }
  }
  kUe(e, n) {
    let a = void 0;
    if ((a = 0 === e.Target ? n.GetSourceEntity() : this.TOi())) {
      let r = void 0,
        t = void 0;
      var o = e.AddTags,
        l = o.Num();
      for (let e = 0; e < l; e++) {
        var s = o.Get(e);
        (r = r ?? a.GetComponent(190)).AddTag(s.TagId);
      }
      var u = e.RemoveTags,
        _ = u.Num();
      for (let e = 0; e < _; e++) {
        var i = u.Get(e);
        (r = r ?? a.GetComponent(190)).RemoveTag(i.TagId);
      }
      var v = e.AddBuffs,
        p = v.Num();
      if (0 < p) {
        var I = n.GetSourceEntity()?.GetComponent(0).GetCreatureDataId(),
          d = n.PreMessageId;
        if (I)
          if (0 <= n.BuffIndex) {
            var c = v.Get(n.BuffIndex);
            (t = t ?? a.GetComponent(160)).AddBuff(c, {
              InstigatorId: I,
              Reason: "界面QTE结算时添加",
              PreMessageId: d,
            });
          } else
            for (let e = 0; e < p; e++) {
              var f = v.Get(e);
              (t = t ?? a.GetComponent(160)).AddBuff(f, {
                InstigatorId: I,
                Reason: "界面QTE结算时添加",
                PreMessageId: d,
              });
            }
      }
      var m = e.CustomActions,
        C = m.Num();
      for (let e = 0; e < C; e++) {
        var g = m.Get(e);
        this.LOi(g, n, a);
      }
    }
  }
  LOi(e, r, t) {
    switch (e) {
      case 0:
        var n = t.GetComponent(160);
        n && n.RemoveBuffByEffectType(36, "界面QTE解除冰冻buff");
        break;
      case 1:
        this.DOi();
        break;
      case 2:
        InputController_1.InputController.InputAction(
          InputEnums_1.EInputAction.闪避,
          1,
        ),
          InputController_1.InputController.InputAction(
            InputEnums_1.EInputAction.闪避,
            2,
          );
        break;
      case 3:
        InputController_1.InputController.InputAction(
          InputEnums_1.EInputAction.幻象1,
          1,
        ),
          InputController_1.InputController.InputAction(
            InputEnums_1.EInputAction.幻象1,
            2,
          );
        break;
      case 4:
        InputController_1.InputController.InputAction(
          InputEnums_1.EInputAction.跳跃,
          1,
        ),
          InputController_1.InputController.InputAction(
            InputEnums_1.EInputAction.跳跃,
            2,
          );
    }
  }
  DOi() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (0 === e?.CanGoDown(!0)) {
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(),
        n = t.length,
        a = t.indexOf(e);
      for (let r = 1; r < n; r++) {
        let e = a + r;
        e >= n && (e -= n);
        var o = t[e];
        if (0 === o?.CanGoBattle())
          return void SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(
            o.GetCreatureDataId(),
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
