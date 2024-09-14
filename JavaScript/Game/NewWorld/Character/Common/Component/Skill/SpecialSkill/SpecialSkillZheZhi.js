"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialSkillZheZhi = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D"),
  EffectSystem_1 = require("../../../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../../../Global"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController"),
  SpecialSkillBase_1 = require("./SpecialSkillBase"),
  HE_MAX_COUNT = 3,
  HE_ACTIVE_DIS = 3e3,
  BLACKBOARD_KEY = "FlyTargetHe",
  activeTag = -1285044114,
  markCueId = 1105001040n,
  lineCueId = 1105001041n;
class SpecialSkillZheZhi extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments),
      (this.Fqa = void 0),
      (this.n$t = void 0),
      (this.Hqa = new Map()),
      (this.jqa = new Set()),
      (this.Xte = void 0),
      (this.Wqa = void 0),
      (this.Qqa = !1),
      (this.Kqa = void 0),
      (this.$qa = 0),
      (this.gU = !1),
      (this.fii = (0, puerts_1.$ref)(void 0)),
      (this.Xqa = Vector2D_1.Vector2D.Create()),
      (this.l2a = (0, puerts_1.$ref)(0)),
      (this._2a = (0, puerts_1.$ref)(0)),
      (this.Yqa = 0),
      (this.zqa = 0);
  }
  OnStart() {
    (this.Fqa = this.SpecialSkillComponent.Entity),
      (this.n$t = this.Fqa.GetComponent(3));
    var t = this.Fqa.GetComponent(0);
    if (
      t.GetPlayerId() ===
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
    ) {
      this.Xte = this.Fqa?.GetComponent(190);
      for (let t = 1; t < HE_MAX_COUNT + 1; t++) {
        const i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          this.Fqa,
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
          t,
        );
        if (!i)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 4, "折枝伴生物初始化失败")
          );
        this.Hqa.set(t, i);
        var e = i.Entity.GetComponent(109);
        e.SetLogicRange(HE_ACTIVE_DIS),
          e.CreatePerceptionEvent().Init(
            HE_ACTIVE_DIS,
            i.Entity?.GameBudgetManagedToken,
            () => {
              this.jqa.add(i);
            },
            () => {
              this.jqa.has(i) && this.jqa.delete(i);
            },
          );
      }
      this.gU = !0;
    }
  }
  OnDisable() {
    this.Jqa();
  }
  OnTick(t) {
    this.gU && this.Zqa();
  }
  Zqa() {
    if (this.Hqa) {
      let r = Number.MAX_VALUE,
        h = 0,
        a = Number.MAX_VALUE,
        o = 0;
      this.u2a(),
        this.Hqa.forEach((t, e) => {
          var i = t.Entity,
            s = i?.GetComponent(190);
          i &&
            i.Active &&
            this.jqa.has(t) &&
            s?.HasTag(activeTag) &&
            ((t = i.GetComponent(3)),
            (s = UE.GameplayStatics.ProjectWorldToScreen(
              Global_1.Global.CharacterController,
              t.ActorLocationProxy.ToUeVector(),
              this.fii,
              !0,
            )),
            (i = (0, puerts_1.$unref)(this.fii)),
            s && 0 < i.X && i.X < this.Yqa && 0 < i.Y && i.Y < this.zqa
              ? (this.Xqa.Set(i.X - this.Yqa / 2, (i.Y - this.zqa / 2) / 10),
                (s = this.Xqa.SizeSquared()) < r && ((h = e), (r = s)))
              : (i = Vector_1.Vector.DistSquared(
                  t.ActorLocationProxy,
                  this.n$t.ActorLocationProxy,
                )) < a && ((o = e), (a = i)));
        });
      var t = 0 < h ? h : o;
      0 === t && 0 !== this.$qa && this.Jqa(),
        0 !== t && (this.$qa === t ? this.e2a() : this.t2a(t));
    }
  }
  u2a() {
    Global_1.Global.CharacterController?.GetViewportSize(this.l2a, this._2a),
      (this.Yqa = (0, puerts_1.$unref)(this.l2a)),
      (this.zqa = (0, puerts_1.$unref)(this._2a));
  }
  t2a(t) {
    var e = this.Hqa.get(t),
      e =
        (e &&
          (this.i2a(e),
          this.c2a(e),
          BlackboardController_1.BlackboardController.SetIntValueByEntity(
            this.Fqa.Id,
            BLACKBOARD_KEY,
            e.Entity.Id,
          )),
        this.Xte?.HasTag(activeTag) || this.Xte?.AddTag(activeTag),
        this.Fqa.GetComponent(34));
    e?.Valid && e.CallAnimBreakPoint(), (this.$qa = t);
  }
  Jqa() {
    0 !== this.$qa &&
      (BlackboardController_1.BlackboardController.SetIntValueByEntity(
        this.Fqa.Id,
        BLACKBOARD_KEY,
        0,
      ),
      this.Xte?.HasTag(activeTag) && this.Xte?.RemoveTag(activeTag),
      this.Wqa?.Destroy(),
      this.Kqa?.Destroy(),
      (this.$qa = 0));
  }
  i2a(t) {
    this.Wqa?.Destroy();
    var t = t.Entity.GetComponent(19),
      e = t.CreateGameplayCue(markCueId);
    this.Wqa = t.GetCueByHandle(e);
  }
  c2a(t) {
    this.Kqa?.Destroy();
    var e = this.Fqa.GetComponent(19),
      t = e.CreateGameplayCue(lineCueId, { Instigator: t });
    this.Kqa = e.GetCueByHandle(t);
  }
  e2a() {
    var t;
    this.Wqa &&
      EffectSystem_1.EffectSystem.IsValid(this.Wqa.EffectViewHandle) &&
      (t = EffectSystem_1.EffectSystem.GetEffectActor(
        this.Wqa.EffectViewHandle,
      ))?.IsValid() &&
      t instanceof UE.Actor &&
      ((t = t.WasRecentlyRenderedOnScreen()),
      !this.Qqa &&
        t &&
        EffectSystem_1.EffectSystem.ReplayEffect(
          this.Wqa.EffectViewHandle,
          "UpdateHeSelectMark",
        ),
      (this.Qqa = t));
  }
}
exports.SpecialSkillZheZhi = SpecialSkillZheZhi;
//# sourceMappingURL=SpecialSkillZheZhi.js.map
