"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AimHandle = void 0);
const UE = require("ue");
const Stats_1 = require("../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const ArmUnit_1 = require("../HudUnit/ArmUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const MAX_AIM_DISTANCE = 5e3;
const aimTagId = -1058855731;
const PROFILE_AIM_TRACE = "ProfileAimTrace";
class AimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.rii = !1),
      (this.nii = void 0),
      (this.sii = Vector_1.Vector.Create()),
      (this.aii = Vector_1.Vector.Create()),
      (this.hii = void 0),
      (this.lii = !1),
      (this._ii = !1),
      (this.o7e = () => {
        this.uii();
      }),
      (this.cii = () => {
        this.mii(), this.dii();
      });
  }
  OnInitialize() {
    super.OnInitialize(), this.uii();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.o7e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAimStateChanged,
        this.cii,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.o7e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAimStateChanged,
        this.cii,
      );
  }
  OnTick(t) {
    this.dii();
  }
  OnShowHud() {
    super.OnShowHud(), this.mii(), this.dii();
  }
  mii() {
    if (this.nii && this.lii) {
      const e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (e?.Valid) {
        let t =
          e.Entity.GetComponent(158).DirectionState ===
          CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection;
        !t && this._ii && (t = e.Entity.GetComponent(185).HasTag(aimTagId)),
          this.nii.SetTargetVisible(t, !1);
      } else this.nii.SetTargetVisible(!1, !0);
    }
  }
  dii() {
    if (this.nii && this.nii.GetTargetVisible() && this.nii.GetActive()) {
      const t = this.Cii();
      if (t) {
        const e = t.Actors;
        const i = e.Num();
        if (!(i <= 0)) {
          const r = t.Components;
          for (let t = 0; t < i; t++) {
            let s = e.Get(t);
            if (!s?.IsValid()) return void this.nii.SetAimStatus(1);
            s = ActorUtils_1.ActorUtils.GetEntityByActor(s, !1);
            if (!s) return void this.nii.SetAimStatus(1);
            const o = s.Entity.GetComponent(0);
            let n = o?.GetEntityType();
            if (n === Protocol_1.Aki.Protocol.HBs.Proto_Npc)
              return void this.nii.SetAimStatus(1);
            if (
              n === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem ||
              n === Protocol_1.Aki.Protocol.HBs.Proto_Animal
            )
              return void (this.gii(o.GetBaseInfo().Camp)
                ? this.nii.SetAimStatus(1)
                : this.nii.SetAimStatus(2));
            if (n !== Protocol_1.Aki.Protocol.HBs.Proto_Monster)
              return void this.nii.SetAimStatus(1);
            n = r.Get(t);
            if (n?.IsValid()) {
              n = n.GetName();
              if (n !== "CollisionCylinder")
                return this.gii(o.GetBaseInfo().Camp)
                  ? void this.nii.SetAimStatus(1)
                  : s.Entity.GetComponent(58)?.IsWeakness(n)
                    ? void this.nii.SetAimStatus(3)
                    : void this.nii.SetAimStatus(2);
            }
          }
        }
      }
      this.nii.SetAimStatus(1);
    }
  }
  gii(t) {
    return t === 0 || t === 2 || t === 4;
  }
  uii() {
    this.lii = !1;
    let t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t?.Valid &&
    (t = t.Entity.GetComponent(0)) &&
    ((t = t.GetRoleConfig()),
    (this._ii = t.RoleType === 2),
    t.IsAim || this._ii)
      ? ((this.lii = !0), this.fii())
      : this.pii();
  }
  fii() {
    this.nii
      ? (this.mii(), this.dii())
      : this.rii ||
        ((this.rii = !0),
        this.NewHudUnit(ArmUnit_1.AimUnit, "UiItem_Aim")
          .then((t) => {
            (this.nii = t),
              this.lii
                ? (this.mii(), this.dii())
                : this.nii.SetTargetVisible(!1, !0);
          })
          .finally(() => {
            this.rii = !1;
          }));
  }
  pii() {
    this.nii && this.nii.SetTargetVisible(!1, !0);
  }
  Cii() {
    var t = Global_1.Global.CharacterCameraManager;
    const e = this.sii;
    const i = this.aii;
    var t =
      (e.FromUeVector(t.GetCameraLocation()),
      i.FromUeVector(t.GetActorForwardVector()),
      i.MultiplyEqual(MAX_AIM_DISTANCE),
      i.AdditionEqual(e),
      (this.hii =
        this.hii ??
        ModelManager_1.ModelManager.BulletModel.NewTraceElement(
          UE.TraceLineElement.StaticClass(),
          ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim,
        )),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hii, e),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hii, i),
      TraceElementCommon_1.TraceElementCommon.LineTrace(
        this.hii,
        PROFILE_AIM_TRACE,
      ));
    if (t) return this.hii.HitResult;
  }
}
(exports.AimHandle = AimHandle).ght = void 0;
// # sourceMappingURL=AimHandle.js.map
