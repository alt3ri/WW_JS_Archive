"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateCursorHandle = void 0);
const puerts_1 = require("puerts");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager");
const ManipulateCursorUnit_1 = require("../HudUnit/ManipulateCursorUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const COMPLETE_ANIM_TIME = 500;
const INTERRUPT_ANIM_TIME = 200;
class ManipulateCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.ac = 0),
      (this.aoi = void 0),
      (this.hoi = void 0),
      (this.loi = void 0),
      (this._oi = void 0),
      (this.uoi = (0, puerts_1.$ref)(void 0)),
      (this.rti = !1),
      (this.B8e = void 0),
      (this.coi = void 0),
      (this.moi = void 0),
      (this.doi = void 0),
      (this.Coi = void 0),
      (this.goi = []),
      (this.foi = []),
      (this.poi = !0),
      (this.o7e = (t, i) => {
        (this.B8e = t),
          (this.coi = this.B8e.Entity.GetComponent(1)),
          (this.moi = this.B8e.Entity.GetComponent(55)),
          (this.Coi = t.Entity.GetComponent(185)),
          this.voi();
        for (const s of this.goi) {
          const e = this.Coi.ListenForTagAddOrRemove(
            s,
            this.Moi,
            ManipulateCursorHandle._$e,
          );
          this.foi.push(e);
        }
      }),
      (this.zii = (t, i) => {
        (this.poi = !i || i.length === 0),
          this.Soi(2),
          this.aoi?.StartProcess(t);
      }),
      (this.Eoi = () => {
        this.Soi(0);
      }),
      (this.yoi = () => {
        this.Soi(3);
      }),
      (this.ooi = (t, i) => {
        t?.Valid
          ? ((this.rti = !0), this.poi ? this.fii(t) : this.Soi(3))
          : ((this.rti = !1), this.Soi(0));
      }),
      (this.roi = () => {
        (this.rti = !1), this.Soi(0);
      }),
      (this.noi = () => {
        this.Soi(0);
      }),
      (this.dKe = () => {
        this.aoi?.RefreshKeyVisible();
      }),
      (this.Jii = (t, i, e) => {
        (this.rti = e),
          t
            ? i?.Valid
              ? this.rti && !this.poi
                ? this.Soi(3)
                : this.fii(i)
              : e
                ? this.Soi(3)
                : this.Soi(0)
            : this.Soi(0);
      }),
      (this.Moi = (t, i) => {
        i ? this.aoi?.SetActive(!1) : this.Ioi();
      });
  }
  OnInitialize() {
    if (
      ((this.B8e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
      this.B8e?.Valid)
    ) {
      (this.Coi = this.B8e.Entity.GetComponent(185)),
        (this.coi = this.B8e.Entity.GetComponent(1)),
        (this.moi = this.B8e.Entity.GetComponent(55)),
        (this.doi =
          CameraController_1.CameraController.FightCamera.GetComponent(5));
      const t = CommonParamById_1.configCommonParamById.GetStringConfig(
        "ManipulateAimVisibleTags",
      );
      if (t)
        for (const e of t.split(",")) {
          const i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
          i && this.goi.push(i);
        }
    }
  }
  OnDestroyed() {
    this.pii(),
      this.voi(),
      (this.uoi = void 0),
      (this.B8e = void 0),
      (this.coi = void 0),
      (this.moi = void 0),
      (this.Coi = void 0),
      (this.goi.length = 0);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.o7e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
        this.Jii,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateStartChanting,
        this.zii,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateCancelChanting,
        this.Eoi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnManipulateCompleteChanting,
        this.yoi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ManipulateStartLockCastTarget,
        this.ooi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ManipulateEndLockCastTarget,
        this.roi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HiddenManipulateUI,
        this.noi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.o7e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
        this.Jii,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateStartChanting,
        this.zii,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateCancelChanting,
        this.Eoi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnManipulateCompleteChanting,
        this.yoi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ManipulateStartLockCastTarget,
        this.ooi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ManipulateEndLockCastTarget,
        this.roi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HiddenManipulateUI,
        this.noi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      );
  }
  OnAfterTick(t) {
    this.bl();
  }
  Ioi() {
    let t;
    return (
      !!this.aoi &&
      !this.aoi.InAsyncLoading() &&
      ((t = !this.Toi()),
      this.aoi.GetActive() !== t && this.aoi.SetActive(t),
      t)
    );
  }
  Toi() {
    if (this.goi.length !== 0)
      for (const t of this.goi) if (this.Coi.HasTag(t)) return !0;
    return !1;
  }
  Loi() {
    this.aoi?.PlayActivateEffect();
  }
  fii(t) {
    (this.hoi = t),
      (this.loi = t.GetComponent(1)),
      ((0, RegisterComponent_1.isComponentInstance)(this.loi, 182) &&
        ((this._oi =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
            this.loi.GetSceneInteractionLevelHandleId(),
          )),
        this._oi?.IsValid())) ||
        (this._oi = this.loi.Owner),
      this.Soi(1),
      this.aoi ? (this.bl(), this.Ioi(), this.Loi()) : this.Doi();
  }
  pii() {
    this.DestroyHudUnit(this.aoi),
      (this.aoi = void 0),
      (this.hoi = void 0),
      (this.loi = void 0),
      (this._oi = void 0);
  }
  voi() {
    for (const t of this.foi) t.EndTask();
    this.foi.length = 0;
  }
  bl() {
    if (this.aoi && !this.aoi.InAsyncLoading() && this.aoi.GetActive()) {
      var i = this.Roi();
      if (i) {
        var e = this.xXe();
        var [e, i] = this.GetInEllipsePosition(e, i.ToUeVector());
        let t = !1;
        i &&
          (t = this.doi.GetScreenPositionIsInRange(
            i,
            this.doi.CameraAdjustController.CheckInScreenMinX,
            this.doi.CameraAdjustController.CheckInScreenMaxX,
            this.doi.CameraAdjustController.CheckInScreenMinY,
            this.doi.CameraAdjustController.CheckInScreenMaxY,
          )),
          this.aoi.Refresh(t, e, this.rti);
      }
    }
  }
  xXe() {
    return this.coi.ActorLocationProxy;
  }
  Roi() {
    if (this.hoi?.Valid && this._oi?.IsValid()) {
      this._oi.GetActorBounds(!1, this.uoi, void 0);
      let t = Vector_1.Vector.Create((0, puerts_1.$unref)(this.uoi));
      var i =
        ModelManager_1.ModelManager.ManipulaterModel.GetTargetPartLocation();
      var i =
        (i !== Vector_1.Vector.ZeroVectorProxy && (t = i),
        this.hoi.GetComponent(132));
      var i =
        (void 0 !== i && this.rti && (t = i.GetHitPoint()),
        this.hoi.GetComponent(145));
      var i =
        (void 0 !== i &&
          this.rti &&
          (t = i.GetSocketLocation(this.moi.GetHoldingEntity())),
        this.hoi.GetComponent(124));
      var i =
        (void 0 !== i && this.rti && (t = i.GetHitPoint()),
        this.hoi.GetComponent(134));
      return (t = void 0 !== i ? i.Location : t);
    }
  }
  Doi() {
    this.aoi = this.NewHudUnitWithReturn(
      ManipulateCursorUnit_1.ManipulateCursorUnit,
      "UiItem_ObjControl",
      !0,
      () => {
        this.ac === 0
          ? this.pii()
          : (this.aoi?.SetCloseAnimCallback(() => {
              this.pii();
            }),
            this.bl(),
            this.Ioi(),
            this.Loi());
      },
    );
  }
  Soi(t) {
    if (this.ac !== t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "控物UI状态改变", ["", t]);
      const i = this.ac;
      if (((this.ac = t), this.aoi))
        switch (this.ac) {
          case 0:
            i === 1
              ? (this.aoi.EndProcess(!0), this.aoi.PlayCloseAnim(0))
              : i === 2 &&
                (this.aoi.EndProcess(!0),
                this.aoi.PlayInterruptedAnim(),
                this.aoi.PlayCloseAnim(INTERRUPT_ANIM_TIME));
            break;
          case 1:
            this.aoi.StopCloseAnim(),
              this.aoi.EndProcess(!0),
              this.aoi.Appear();
            break;
          case 2:
            this.aoi.PlayStartAnim(), this.aoi.PlayProcessAnim();
            break;
          case 3:
            i === 2
              ? (this.aoi.EndProcess(!1),
                this.aoi.PlayCompleteAnim(),
                this.aoi.PlayCloseAnim(COMPLETE_ANIM_TIME))
              : this.aoi.PlayCloseAnim(0);
        }
    }
  }
}
(exports.ManipulateCursorHandle = ManipulateCursorHandle)._$e = void 0;
// # sourceMappingURL=ManipulateCursorHandle.js.map
