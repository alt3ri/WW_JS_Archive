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
  MARK_CUE_ID = 1105001040,
  LINE_CUE_ID = 1105001041;
class SpecialSkillZheZhi extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments),
      (this.f2a = void 0),
      (this.n$t = void 0),
      (this.M2a = new Map()),
      (this.S2a = new Set()),
      (this.Xte = void 0),
      (this.E2a = void 0),
      (this.y2a = !1),
      (this.I2a = void 0),
      (this.T2a = 0),
      (this.gU = !1),
      (this.fii = (0, puerts_1.$ref)(void 0)),
      (this.L2a = Vector2D_1.Vector2D.Create()),
      (this.N2a = (0, puerts_1.$ref)(0)),
      (this.F2a = (0, puerts_1.$ref)(0)),
      (this.D2a = 0),
      (this.A2a = 0);
  }
  OnStart() {
    (this.f2a = this.SpecialSkillComponent.Entity),
      (this.n$t = this.f2a.GetComponent(3));
    var e = this.f2a.GetComponent(0);
    if (
      e.GetPlayerId() ===
      ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
    ) {
      this.Xte = this.f2a?.GetComponent(203);
      for (let t = 1; t < HE_MAX_COUNT + 1; t++) {
        const s = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          this.f2a,
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
          t,
        );
        if (!s)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              4,
              "折枝伴生物初始化失败",
              ["CurGetPosition", t],
              ["ZhezhiEntityId", this.f2a.Id],
              ["ZhezhiCreatureDataId", e?.GetCreatureDataId()],
              ["CustomServerEntityIds", e?.CustomServerEntityIds],
            )
          );
        this.M2a.set(t, s);
        var i = s.Entity.GetComponent(119);
        i.SetLogicRange(HE_ACTIVE_DIS),
          i.CreatePerceptionEvent(
            HE_ACTIVE_DIS,
            s.Entity?.GameBudgetManagedToken,
            () => {
              this.S2a.add(s);
            },
            () => {
              this.S2a.has(s) && this.S2a.delete(s);
            },
          );
      }
      this.gU = !0;
    }
  }
  OnDisable() {
    this.R2a();
  }
  OnTick(t) {
    this.gU && this.U2a();
  }
  U2a() {
    if (this.M2a) {
      let r = Number.MAX_VALUE,
        h = 0,
        a = Number.MAX_VALUE,
        o = 0;
      this.V2a(),
        this.M2a.forEach((t, e) => {
          var i = t.Entity,
            s = i?.GetComponent(203);
          i &&
            i.Active &&
            this.S2a.has(t) &&
            s?.HasTag(activeTag) &&
            ((t = i.GetComponent(3)),
            (s = UE.GameplayStatics.D_ProjectWorldToScreen(
              Global_1.Global.CharacterController,
              t.ActorLocationProxy.ToUeVector(),
              this.fii,
              !0,
            )),
            (i = (0, puerts_1.$unref)(this.fii)),
            s && 0 < i.X && i.X < this.D2a && 0 < i.Y && i.Y < this.A2a
              ? (this.L2a.Set(i.X - this.D2a / 2, (i.Y - this.A2a / 2) / 10),
                (s = this.L2a.SizeSquared()) < r && ((h = e), (r = s)))
              : (i = Vector_1.Vector.DistSquared(
                  t.ActorLocationProxy,
                  this.n$t.ActorLocationProxy,
                )) < a && ((o = e), (a = i)));
        });
      var t = 0 < h ? h : o;
      0 === t && 0 !== this.T2a && this.R2a(),
        0 !== t && (this.T2a === t ? this.x2a() : this.P2a(t));
    }
  }
  V2a() {
    Global_1.Global.CharacterController?.GetViewportSize(this.N2a, this.F2a),
      (this.D2a = (0, puerts_1.$unref)(this.N2a)),
      (this.A2a = (0, puerts_1.$unref)(this.F2a));
  }
  P2a(t) {
    var e = this.M2a.get(t),
      e =
        (e &&
          (this.w2a(e),
          this.H2a(e),
          BlackboardController_1.BlackboardController.SetIntValueByEntity(
            this.f2a.Id,
            BLACKBOARD_KEY,
            e.Entity.Id,
          )),
        this.Xte?.HasTag(activeTag) || this.Xte?.AddTag(activeTag),
        this.f2a.GetComponent(39));
    e?.Valid && e.CallAnimBreakPoint(), (this.T2a = t);
  }
  R2a() {
    0 !== this.T2a &&
      (BlackboardController_1.BlackboardController.SetIntValueByEntity(
        this.f2a.Id,
        BLACKBOARD_KEY,
        0,
      ),
      this.Xte?.HasTag(activeTag) && this.Xte?.RemoveTag(activeTag),
      this.E2a?.Destroy(),
      this.I2a?.Destroy(),
      (this.T2a = 0));
  }
  w2a(t) {
    this.E2a?.Destroy();
    var t = t.Entity.GetComponent(21),
      e = t.AddCue(MARK_CUE_ID);
    this.E2a = t.GetCueByHandle(e);
  }
  H2a(t) {
    this.I2a?.Destroy();
    var e = this.f2a.GetComponent(21),
      t = e.AddCue(LINE_CUE_ID, { Instigator: t });
    this.I2a = e.GetCueByHandle(t);
  }
  x2a() {
    var t;
    this.E2a &&
      EffectSystem_1.EffectSystem.IsValid(this.E2a.EffectViewHandle) &&
      (t = EffectSystem_1.EffectSystem.GetSureEffectActor(
        this.E2a.EffectViewHandle,
      ))?.IsValid() &&
      ((t = t.WasRecentlyRenderedOnScreen()),
      !this.y2a &&
        t &&
        EffectSystem_1.EffectSystem.ReplayEffect(
          this.E2a.EffectViewHandle,
          "UpdateHeSelectMark",
        ),
      (this.y2a = t));
  }
}
exports.SpecialSkillZheZhi = SpecialSkillZheZhi;
//# sourceMappingURL=SpecialSkillZheZhi.js.map
