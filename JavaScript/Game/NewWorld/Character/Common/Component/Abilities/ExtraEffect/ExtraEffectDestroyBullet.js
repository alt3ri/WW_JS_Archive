"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtraEffectDestroyBullet = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectDestroyBullet extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.XDl = void 0),
      (this.YDl = 0),
      (this.zDl = !1),
      (this.TVc = 0),
      (this.Tq_ = 0);
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? !1;
  }
  InitParameters(t) {
    var e;
    void 0 === t.ExtraEffectParameters
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 20, "销毁子弹额外效果参数为空", [
          "Buff",
          this.BuffId,
        ])
      : !(e = Number(t.ExtraEffectParameters[0])) || isNaN(e)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "第一个参数错误",
            ["Buff", this.BuffId],
            ["Param", e],
          )
        : StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[1])
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 20, "第二个参数为空", [
              "Buff",
              this.BuffId,
            ])
          : ((this.YDl = Number(t.ExtraEffectParameters[0])),
            (this.XDl = t.ExtraEffectParameters[1].split("#")),
            StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[2]) ||
              (this.zDl = 1 === Number(t.ExtraEffectParameters[2])),
            StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[3]) ||
              ((e = Number(t.ExtraEffectParameters[3])), (this.Tq_ = e * e)),
            StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[4]) ||
              (this.TVc = Number(t.ExtraEffectParameters[4])));
  }
  OnExecute() {}
  OnRemoved() {
    if (0 !== this.YDl && this.XDl) {
      var t = 1 === this.YDl ? this.InstigatorEntity?.Entity : this.OwnerEntity,
        e = t?.Id;
      if (e) {
        var s = ModelManager_1.ModelManager.BulletModel,
          e = s.GetBulletSetByAttacker(e);
        if (e) {
          var i,
            r = (
              0 === this.TVc
                ? t.GetComponent(1)
                : ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
                    1,
                  )
            )?.ActorLocationProxy;
          if (this.Tq_ <= 0 || !r)
            for (const o of e)
              o?.Valid &&
                this.XDl.includes(o.GetBulletInfo().BulletRowName) &&
                s.DestroyBullet(o.Id, this.zDl, 4);
          else
            for (const a of e)
              a?.Valid &&
                this.XDl.includes(a.GetBulletInfo().BulletRowName) &&
                (i = a.GetComponent(1)?.ActorLocationProxy) &&
                Vector_1.Vector.DistSquared(i, r) <= this.Tq_ &&
                s.DestroyBullet(a.Id, this.zDl, 4);
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Battle", 20, "无法获取子弹集合", [
              "Buff",
              this.BuffId,
            ]);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 20, "无法获取子弹拥有者", [
            "Buff",
            this.BuffId,
          ]);
    }
  }
}
exports.ExtraEffectDestroyBullet = ExtraEffectDestroyBullet;
//# sourceMappingURL=ExtraEffectDestroyBullet.js.map
