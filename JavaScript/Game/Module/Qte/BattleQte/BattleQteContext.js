"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleQteContext = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BattleQteCustomAction_1 = require("./BattleQteCustomAction"),
  TARGET_QTE_SOURCER = 0,
  TARGET_PLAYER_SELF = 1;
class BattleQteContext {
  constructor() {
    (this.BattleQteHandleId = -1),
      (this.BattleQteId = 0),
      (this.CommonQteHandleId = -1),
      (this.CommonQteId = 0),
      (this.BattleQteSource = void 0),
      (this.MessageId = void 0),
      (this.EntityHandle = void 0);
  }
  QteSuccess() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "CommonQte",
        67,
        "战斗Qte触发成功",
        ["BattleQteHandleId", this.BattleQteHandleId],
        ["BattleQteId", this.BattleQteId],
      ),
      this.kUe(!0);
  }
  QteFail() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "CommonQte",
        67,
        "战斗Qte触发失败",
        ["BattleQteHandleId", this.BattleQteHandleId],
        ["BattleQteId", this.BattleQteId],
      ),
      this.kUe(!1);
  }
  kUe(t) {
    var o = ModelManager_1.ModelManager.BattleQteModel?.GetBattleQteConfig(
      this.BattleQteId,
    );
    if (o) {
      var a = this.EntityHandle?.Entity,
        r =
          ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity,
        i = t ? o.SuccessActions : o.FailActions,
        s = i.Num();
      let e = void 0;
      for (let t = 0; t < s; t++) {
        var l = i.Get(t);
        (e =
          l.Target === TARGET_QTE_SOURCER
            ? a
            : l.Target === TARGET_PLAYER_SELF
              ? r
              : void 0)
          ? this.jUe(e, l)
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "CommonQte",
              67,
              "战斗Qte行为执行失败, 目标配置错误",
              ["HandleId", this.BattleQteHandleId],
              ["BattleQteId", this.BattleQteId],
              ["ActionIndex", t],
              ["Target", l.Target],
            );
      }
    }
  }
  jUe(a, t) {
    if (this.MessageId) {
      var r = a.GetComponent(203);
      let e = !0,
        o = void 0;
      if (r) {
        var i = t.TagConditions,
          s = i.Num();
        for (let t = 0; t < s; t++) {
          var l = i.Get(t);
          if (!r.HasTag(l.TagId)) {
            (e = !1), (o = l);
            break;
          }
        }
      }
      if (r && e) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "CommonQte",
            67,
            "战斗Qte行为开始执行",
            ["HandleId", this.BattleQteHandleId],
            ["BattleQteId", this.BattleQteId],
            ["MessageId", this.MessageId],
          );
        var n = t.AddTags,
          d = n.Num();
        for (let t = 0; t < d; t++) r.AddTag(n.Get(t).TagId);
        var _ = t.RemoveTags,
          Q = _.Num();
        for (let t = 0; t < Q; t++) r.RemoveTag(_.Get(t).TagId);
        let e = void 0;
        var h = t.AddBuffs,
          v = h.Num();
        if (0 < v && (e = e ?? a.GetComponent(172)))
          for (let t = 0; t < v; t++) {
            var g = Number(h.Get(t));
            e.AddBuff(g, {
              InstigatorId: e.CreatureDataId,
              Reason: "战斗Qte结束时添加buff",
              PreMessageId: this.MessageId,
            });
          }
        var m = t.RemoveBuffs,
          I = m.Num();
        if (0 < I && (e = e ?? a.GetComponent(172)))
          for (let t = 0; t < I; t++) {
            var C = Number(m.Get(t));
            e.RemoveBuff(C, -1, "战斗Qte结束时移除buff", this.MessageId);
          }
        var c = t.AddBullets,
          f = c.Num();
        for (let t = 0; t < f; t++) {
          var u = Number(c.Get(t));
          ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(
            a,
            u.toString(),
            void 0,
            {},
            this.MessageId,
          );
        }
        var L,
          B = t.UseSkillId,
          A =
            (B &&
              (L = a.GetComponent(39)) &&
              (-1 !== t.ChangeMainSkillPriority &&
                (A = L?.CurrentSkill) &&
                3 !== A.SkillInfo?.SkillGenre &&
                L.SetSkillPriority(A.SkillId, t.ChangeMainSkillPriority),
              L.BeginSkill(B, {
                Reason: "BattleQteContext.HandleActionInternal",
              })),
            t.CustomAction);
        if (0 < A)
          switch (A) {
            case 1:
              (0, BattleQteCustomAction_1.battleQteChangeRole)();
              break;
            case 2:
              var M = Number(t.CustomActionParam);
              M && (0, BattleQteCustomAction_1.battleQteChangeRole)(M);
          }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "CommonQte",
            67,
            "战斗Qte行为执行失败, tag条件不满足",
            ["HandleId", this.BattleQteHandleId],
            ["BattleQteId", this.BattleQteId],
            ["TagName", o?.TagName],
          );
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "CommonQte",
          67,
          "战斗Qte执行行为失败, 上下文Id不合法",
          ["HandleId", this.BattleQteHandleId],
          ["BattleQteId", this.BattleQteId],
          ["MessageId", this.MessageId],
        );
  }
}
exports.BattleQteContext = BattleQteContext;
//# sourceMappingURL=BattleQteContext.js.map
