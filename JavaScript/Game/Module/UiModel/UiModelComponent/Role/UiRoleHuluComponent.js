"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    var n,
      h = arguments.length,
      o =
        h < 3
          ? t
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(t, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, i, s);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (n = e[r]) && (o = (h < 3 ? n(o) : 3 < h ? n(t, i, o) : n(t, i)) || o);
    return 3 < h && o && Object.defineProperty(t, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleHuluComponent = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines"),
  SkeletalObserverManager_1 = require("../../../SkeletalObserver/SkeletalObserverManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase"),
  HULU_BASE_ID = 2e7,
  HULU_PARTY_ID = 1e5;
let UiRoleHuluComponent = class UiRoleHuluComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ywr = void 0),
      (this.mBr = void 0),
      (this.n$t = void 0),
      (this.Jwr = void 0),
      (this.dBr = void 0),
      (this.g1t = CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME),
      (this._ii = 0),
      (this.Twr = (e) => {
        e || 2 !== this._ii || this.SetActive(!1);
      }),
      (this.CBr = () => {
        this.Refresh();
      }),
      (this.Dwr = (e) => {
        this.dBr?.Model?.CheckGetComponent(0)?.SetDitherEffect(e);
      }),
      (this.OnRoleMeshLoadComplete = () => {
        this.gBr();
      }),
      (this.OnAnsBegin = (e) => {
        this.SetActive(!0),
          e.IsRotate && this.StartHuluRotate(),
          (e = e.Socket);
        e && this.AttachHuluToRole(e);
      }),
      (this.OnAnsEnd = (e) => {
        this.dBr?.Model?.CheckGetComponent(9)?.StopRotate(), this.SetActive(!1);
      });
  }
  OnInit() {
    (this.mBr = this.Owner.CheckGetComponent(11)),
      (this.ywr = this.Owner.CheckGetComponent(0)),
      (this.n$t = this.Owner.CheckGetComponent(1)),
      (this.Jwr = this.Owner.CheckGetComponent(6)),
      (this.dBr =
        SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(
          5,
        )),
      this.SetActive(!1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnRoleMeshLoadComplete,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelRoleConfigIdChange,
        this.CBr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelVisibleChange,
        this.Twr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.Dwr,
      ),
      this.Jwr?.RegisterAnsTrigger(
        "UiCalabashAnsContext",
        this.OnAnsBegin,
        this.OnAnsEnd,
      );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnRoleMeshLoadComplete,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelRoleConfigIdChange,
        this.CBr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelVisibleChange,
        this.Twr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.Dwr,
      ),
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        this.dBr,
      );
  }
  GetHuluHandle() {
    return this.dBr;
  }
  Refresh() {
    var e = this.mBr.RoleConfigId,
      e =
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).PartyId *
          HULU_PARTY_ID +
        HULU_BASE_ID +
        1;
    this.dBr.Model.CheckGetComponent(2)?.LoadModelByModelId(e);
  }
  SetActive(e) {
    (e && 2 === this._ii) ||
      (!e && 1 === this._ii) ||
      (this.dBr?.Model?.CheckGetComponent(0)?.SetVisible(e),
      (this._ii = e ? 2 : 1));
  }
  StartHuluRotate() {
    var e, t;
    this.dBr &&
      ((e =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "hulu_rotate_time",
        )),
      (t = this.dBr?.Model?.CheckGetComponent(9))?.SetRotateParam(e, 2, !1),
      t?.StartRotate());
  }
  AttachHuluToRole(e = CharacterNameDefines_1.CharacterNameDefines.HULU_CASE) {
    (this.g1t = e), this.gBr();
  }
  gBr() {
    var e, t;
    2 === this.ywr.GetModelLoadState() &&
      ((e = this.n$t.MainMeshComponent),
      (t = this.dBr?.Model?.CheckGetComponent(1))?.Actor?.K2_AttachToComponent(
        e,
        this.g1t,
        0,
        0,
        0,
        !1,
      ),
      t?.Actor?.K2_SetActorRelativeTransform(
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
        void 0,
        !1,
      ));
  }
};
(UiRoleHuluComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(15)],
  UiRoleHuluComponent,
)),
  (exports.UiRoleHuluComponent = UiRoleHuluComponent);
//# sourceMappingURL=UiRoleHuluComponent.js.map
