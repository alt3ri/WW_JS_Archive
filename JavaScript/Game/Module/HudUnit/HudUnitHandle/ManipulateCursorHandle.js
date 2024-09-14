"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateCursorHandle = void 0);
const puerts_1 = require("puerts"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager"),
  PortalUtils_1 = require("../../../Utils/PortalUtils"),
  ManipulateCursorUnit_1 = require("../HudUnit/ManipulateCursorUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  COMPLETE_ANIM_TIME = 500,
  INTERRUPT_ANIM_TIME = 200;
class ManipulateCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.ac = 0),
      (this.hri = void 0),
      (this.lri = void 0),
      (this._ri = void 0),
      (this.cri = void 0),
      (this.mri = (0, puerts_1.$ref)(void 0)),
      (this.rii = !1),
      (this.X9e = void 0),
      (this.dri = void 0),
      (this.Cri = void 0),
      (this.gri = void 0),
      (this.fri = void 0),
      (this.pri = []),
      (this.vri = []),
      (this.Mri = !0),
      (this.fHe = (t, i) => {
        (this.X9e = t),
          (this.dri = this.X9e.Entity.GetComponent(1)),
          (this.Cri = this.X9e.Entity.GetComponent(57)),
          (this.fri = t.Entity.GetComponent(190)),
          this.Eri();
        for (const s of this.pri) {
          var e = this.fri.ListenForTagAddOrRemove(
            s,
            this.Sri,
            ManipulateCursorHandle.SYe,
          );
          this.vri.push(e);
        }
      }),
      (this.Zoi = (t, i) => {
        (this.Mri = !i || 0 === i.length),
          this.yri(2),
          this.hri?.StartProcess(t);
      }),
      (this.Iri = () => {
        this.yri(0);
      }),
      (this.Tri = () => {
        this.yri(3);
      }),
      (this.rri = (t, i) => {
        t?.Valid
          ? ((this.rii = !0), this.Mri ? this.foi(t) : this.yri(3))
          : ((this.rii = !1), this.yri(0));
      }),
      (this.nri = () => {
        (this.rii = !1), this.yri(0);
      }),
      (this.sri = () => {
        this.yri(0);
      }),
      (this.zoi = (t, i, e) => {
        (this.rii = e),
          t
            ? i?.Valid
              ? this.rii && !this.Mri
                ? this.yri(3)
                : this.foi(i)
              : e
                ? this.yri(3)
                : this.yri(0)
            : this.yri(0);
      }),
      (this.Sri = (t, i) => {
        i ? this.hri?.SetActive(!1) : this.Lri();
      });
  }
  OnInitialize() {
    if (
      (this.InitCursorAxis(),
      (this.X9e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
      this.X9e?.Valid)
    ) {
      (this.fri = this.X9e.Entity.GetComponent(190)),
        (this.dri = this.X9e.Entity.GetComponent(1)),
        (this.Cri = this.X9e.Entity.GetComponent(57)),
        (this.gri =
          CameraController_1.CameraController.FightCamera.GetComponent(5));
      var t = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulateAimVisibleTags",
      );
      if (t)
        for (const e of t.split(",")) {
          var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
          i && this.pri.push(i);
        }
    }
  }
  OnDestroyed() {
    this.poi(),
      this.Eri(),
      (this.mri = void 0),
      (this.X9e = void 0),
      (this.dri = void 0),
      (this.Cri = void 0),
      (this.fri = void 0),
      (this.pri.length = 0);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
        this.zoi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateStartChanting,
        this.Zoi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateCancelChanting,
        this.Iri,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateCompleteChanting,
        this.Tri,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ManipulateStartLockCastTarget,
        this.rri,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ManipulateEndLockCastTarget,
        this.nri,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HiddenManipulateUI,
        this.sri,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
        this.zoi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateStartChanting,
        this.Zoi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateCancelChanting,
        this.Iri,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateCompleteChanting,
        this.Tri,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ManipulateStartLockCastTarget,
        this.rri,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ManipulateEndLockCastTarget,
        this.nri,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HiddenManipulateUI,
        this.sri,
      );
  }
  OnInputControllerChanged(t, i) {
    !this.hri ||
      t === i ||
      (5 !== t && 5 !== i) ||
      (this.DestroyHudUnit(this.hri), (this.hri = void 0), this.Uri());
  }
  OnAfterTick(t) {
    this.bl();
  }
  Lri() {
    var t;
    return (
      !!this.hri &&
      !this.hri.InAsyncLoading() &&
      ((t = !this.Dri()),
      this.hri.GetActive() !== t && this.hri.SetActive(t),
      t)
    );
  }
  Dri() {
    if (0 !== this.pri.length)
      for (const t of this.pri) if (this.fri.HasTag(t)) return !0;
    return !1;
  }
  Rri() {
    this.hri?.PlayActivateEffect();
  }
  foi(t) {
    (this.lri = t),
      (this._ri = t.GetComponent(1)),
      ((0, RegisterComponent_1.isComponentInstance)(this._ri, 187) &&
        ((this.cri =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
            this._ri.GetSceneInteractionLevelHandleId(),
          )),
        this.cri?.IsValid())) ||
        (this.cri = this._ri.Owner),
      this.yri(1),
      this.hri ? (this.bl(), this.Lri(), this.Rri()) : this.Uri();
  }
  poi() {
    this.DestroyHudUnit(this.hri),
      (this.hri = void 0),
      (this.lri = void 0),
      (this._ri = void 0),
      (this.cri = void 0);
  }
  Eri() {
    for (const t of this.vri) t.EndTask();
    this.vri.length = 0;
  }
  bl() {
    if (this.hri && !this.hri.InAsyncLoading() && this.hri.GetActive()) {
      var i = this.Ari();
      if (i) {
        var e = this.j$e(),
          [e, i] = this.GetInEllipsePosition(e, i.ToUeVector());
        let t = !1;
        i &&
          (t = this.gri.GetScreenPositionIsInRange(
            i,
            this.gri.CameraAdjustController.CheckInScreenMinX,
            this.gri.CameraAdjustController.CheckInScreenMaxX,
            this.gri.CameraAdjustController.CheckInScreenMinY,
            this.gri.CameraAdjustController.CheckInScreenMaxY,
          )),
          this.hri.Refresh(t, e, this.rii);
      }
    }
  }
  j$e() {
    return this.dri.ActorLocationProxy;
  }
  Ari() {
    if (this.lri?.Valid && this.cri?.IsValid()) {
      this.cri.GetActorBounds(!1, this.mri, void 0);
      let t = Vector_1.Vector.Create((0, puerts_1.$unref)(this.mri));
      var i = this.lri.GetComponent(143),
        i =
          (void 0 !== i &&
            0 !== i.GetPassThroughPortalType() &&
            PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
              t,
              i.GetPassThroughPortalId(),
              1 === i.GetPassThroughPortalType(),
              t,
            ),
          ModelManager_1.ModelManager.ManipulaterModel.GetTargetPartLocation()),
        i =
          (i !== Vector_1.Vector.ZeroVectorProxy && (t = i),
          this.lri.GetComponent(135)),
        i =
          (void 0 !== i && this.rii && (t = i.GetHitPoint()),
          this.lri.GetComponent(148)),
        i =
          (void 0 !== i &&
            this.rii &&
            (t = i.GetSocketLocation(this.Cri.GetHoldingEntity())),
          this.lri.GetComponent(127)),
        i =
          (void 0 !== i && this.rii && (t = i.GetHitPoint()),
          this.lri.GetComponent(137));
      return (t = void 0 !== i ? i.Location : t);
    }
  }
  Uri() {
    this.hri = this.NewHudUnitWithReturn(
      ManipulateCursorUnit_1.ManipulateCursorUnit,
      "UiItem_ObjControl",
      !0,
      () => {
        0 === this.ac
          ? this.poi()
          : (this.hri?.SetCloseAnimCallback(() => {
              this.poi();
            }),
            this.bl(),
            this.Lri(),
            this.Rri());
      },
    );
  }
  yri(t) {
    if (this.ac !== t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "控物UI状态改变", ["", t]);
      var i = this.ac;
      if (((this.ac = t), this.hri))
        switch (this.ac) {
          case 0:
            1 === i
              ? (this.hri.EndProcess(!0), this.hri.PlayCloseAnim(0))
              : 2 === i &&
                (this.hri.EndProcess(!0),
                this.hri.PlayInterruptedAnim(),
                this.hri.PlayCloseAnim(INTERRUPT_ANIM_TIME));
            break;
          case 1:
            this.hri.StopCloseAnim(),
              this.hri.EndProcess(!0),
              this.hri.Appear();
            break;
          case 2:
            this.hri.PlayStartAnim(), this.hri.PlayProcessAnim();
            break;
          case 3:
            2 === i
              ? (this.hri.EndProcess(!1),
                this.hri.PlayCompleteAnim(),
                this.hri.PlayCloseAnim(COMPLETE_ANIM_TIME))
              : this.hri.PlayCloseAnim(0);
        }
    }
  }
}
(exports.ManipulateCursorHandle = ManipulateCursorHandle).SYe =
  Stats_1.Stat.Create("[ManipulateCursorHandle]ListenTag");
//# sourceMappingURL=ManipulateCursorHandle.js.map
