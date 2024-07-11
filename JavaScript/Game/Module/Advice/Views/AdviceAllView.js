"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceAllView = void 0);
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView");
const RoleController_1 = require("../../RoleUi/RoleController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AdviceController_1 = require("../AdviceController");
const AdivceSelectItem_1 = require("./AdivceSelectItem");
const AdviceAllViewShowContent_1 = require("./AdviceAllViewShowContent");
const AdviceSelectMotionItem_1 = require("./AdviceSelectMotionItem");
const CHECKTIMEER = 1e3;
const ANIMATIONGAP = 5e3;
class AdviceAllView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.z8e = 0),
      (this.Z8e = void 0),
      (this.e9e = void 0),
      (this.t9e = void 0),
      (this.i9e = void 0),
      (this.x8e = void 0),
      (this.j3 = void 0),
      (this.Uqe = -0),
      (this.o9e = void 0),
      (this.r9e = !1),
      (this.n9e = (e, t) => {
        (this.r9e = t) && this.CloseMe();
      }),
      (this.s9e = () => {
        AdviceController_1.AdviceController.OpenAdviceView();
      }),
      (this.a9e = () => {
        let e, t, i;
        ModelManager_1.ModelManager.AdviceModel.GetIfCanCreateAdvice(
          ModelManager_1.ModelManager.AdviceModel.CurrentLineModel,
        )
          ? ((e = Vector_1.Vector.Create()),
            (t = Rotator_1.Rotator.Create()),
            e.DeepCopy(
              Global_1.Global.BaseCharacter.CharacterActorComponent
                .ActorLocationProxy,
            ),
            (e.Z =
              e.Z -
              Global_1.Global.BaseCharacter.CharacterActorComponent.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
            t.DeepCopy(
              Global_1.Global.BaseCharacter.CharacterActorComponent
                .ActorRotationProxy,
            ),
            (i = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor),
            (t.Yaw = i.GetTransform().Rotator().Yaw + 90),
            AdviceController_1.AdviceController.RequestCreateAdvice(
              e,
              t,
              ModelManager_1.ModelManager.AdviceModel.GetCreateAdviceContent(),
              () => {
                this.CloseMe();
              },
            ))
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "AdviceNeedFull",
            );
      }),
      (this.h9e = (e) => {
        this.l9e(e);
      }),
      (this._9e = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId;
        var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
        const t = ModelManager_1.ModelManager.RoleModel.GetRoleList();
        var e = new TeamRoleSelectView_1.TeamRoleSelectViewData(
          1,
          e.GetRoleId(),
          t,
          this.h9e,
          void 0,
        );
        RoleController_1.RoleController.OpenTeamRoleSelectView(e);
      }),
      (this.u9e = () => {
        const e = ModelManager_1.ModelManager.AdviceModel.PreSelectAdviceItemId;
        e === 0
          ? this.c9e(0)
          : e === 1
            ? this.m9e()
            : e === 2
              ? this.c9e(1)
              : e === 3
                ? this.d9e()
                : e === 5
                  ? this.C9e()
                  : e === 6 && this.g9e(),
          this.f9e();
      }),
      (this.d9e = () => {
        AdviceController_1.AdviceController.OpenAdviceExpressionView();
      }),
      (this.p9e = () => {
        (this.Uqe = 0),
          ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId ===
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
            ? this.x8e.HideAnimation()
            : this.x8e.PlayAnimation(
                ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId,
              );
      }),
      (this.v9e = () => {
        this.Og(), this.M9e(), this.f9e();
      }),
      (this.l9e = (e) => {
        (ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId = e),
          (ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()),
          (ModelManager_1.ModelManager.AdviceModel.CurrentSelectMotionId =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()),
          this.t9e.RefreshView(
            ModelManager_1.ModelManager.AdviceModel.GetMotionSelectData(),
          ),
          this.p9e(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnChangeAdviceRole,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceMotion,
          );
      }),
      (this.S9e = () => {
        this.Z8e === 0 ? (this.Z8e = 1) : (this.Z8e = 0),
          this.Z8e === 0 ? this.x8e.HideAnimation() : this.p9e(),
          this.Og();
      }),
      (this.f9e = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
        var t =
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "AdviceCreateLimit",
          ) ?? 0;
        var e = e.length >= t;
        var t = ModelManager_1.ModelManager.AdviceModel.GetIfCanCreateAdvice(
          ModelManager_1.ModelManager.AdviceModel.CurrentLineModel,
        );
        e || !t
          ? this.GetButton(4).SetSelfInteractive(!1)
          : this.GetButton(4).SetSelfInteractive(!0),
          e
            ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(11), "Advice_Max")
            : t
              ? LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(11),
                  "Advice_Publish",
                )
              : LguiUtil_1.LguiUtil.SetLocalText(
                  this.GetText(11),
                  "AdviceNotFull",
                );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.S9e],
        [2, this.S9e],
        [5, this.s9e],
        [4, this.a9e],
      ]);
  }
  OnStart() {
    (this.e9e = new AdivceSelectItem_1.AdviceSelectItem(this.GetItem(6))),
      (this.t9e = new AdviceSelectMotionItem_1.AdviceSelectMotionItem(
        this.GetItem(7),
      )),
      this.t9e.SetClickChangeRoleCall(this._9e),
      (this.i9e = new AdviceAllViewShowContent_1.AdviceAllViewShowContent(
        this.GetItem(8),
      )),
      (this.j3 = TimerSystem_1.TimerSystem.Forever(() => {
        this.E9e();
      }, CHECKTIMEER)),
      this.y9e();
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem.SetHelpButtonActive(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceSelectItem,
      this.u9e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClickAdviceMotion,
        this.p9e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnDeleteAdviceSuccess,
        this.v9e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.f9e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.f9e,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceSelectItem,
      this.u9e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClickAdviceMotion,
        this.p9e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnDeleteAdviceSuccess,
        this.v9e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.f9e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.f9e,
      );
  }
  y9e() {
    let e;
    const t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t.Valid &&
      ((e = t.Entity.GetComponent(185)),
      (this.r9e = e.HasTag(1996802261)),
      this.I9e(),
      this.r9e ? this.CloseMe() : this.T9e(t));
  }
  I9e() {
    this.o9e?.EndTask(), (this.o9e = void 0);
  }
  T9e(e) {
    e = e.Entity.GetComponent(185);
    this.o9e = e.ListenForTagAddOrRemove(1996802261, this.n9e);
  }
  c9e(e) {
    AdviceController_1.AdviceController.OpenAdviceWordSelectView(e);
  }
  C9e() {
    AdviceController_1.AdviceController.OpenAdviceSentenceSelectView();
  }
  m9e() {
    AdviceController_1.AdviceController.OpenAdviceConjunctionSelectView();
  }
  g9e() {
    ModelManager_1.ModelManager.AdviceModel.CurrentLineModel === 0
      ? (ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 1)
      : ((ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 0),
        ModelManager_1.ModelManager.AdviceModel.OnChangeSentence(1),
        (ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId = 0)),
      this.Og();
  }
  OnAfterShow() {
    (this.Z8e = 0),
      (ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 0),
      this.Og(),
      this.L9e(),
      this.mGe();
  }
  mGe() {
    this.ChildPopView?.SetTitleByTextIdAndArg("AdviceName");
  }
  E9e() {
    (this.Uqe += CHECKTIMEER),
      this.Uqe >= ANIMATIONGAP && this.Z8e !== 0 && this.p9e();
  }
  L9e() {
    this.D9e(),
      (this.z8e =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.Disable(
          "[AdviceCreate DisableCharacter]",
        )),
      (this.x8e =
        ModelManager_1.ModelManager.AdviceModel.GetAdviceCreateActor());
  }
  D9e() {
    this.z8e > 0 &&
      (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.Enable(
        this.z8e,
        "AdviceAllView.TryEnableEntity",
      ),
      (this.z8e = 0));
  }
  Og() {
    this.R9e(), this.U9e(), this.M9e(), this.f9e(), this.i9e.RefreshView();
  }
  U9e() {
    this.Z8e === 1
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "Motion")
      : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "TextAndExpression");
  }
  R9e() {
    let e = !1;
    let t;
    ModelManager_1.ModelManager.AdviceModel.GetCreateConditionState() ||
      ((t = ModelManager_1.ModelManager.AdviceModel.CheckIfMaxAdvice()),
      (e =
        !t &&
        (this.GetItem(0).SetUIActive(!0),
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(12).SetUIActive(!1),
        this.GetButton(4).RootUIComp.SetUIActive(!1),
        this.i9e.SetActive(!1),
        this.A9e(),
        !0))),
      e ||
        (this.GetItem(12).SetUIActive(!0),
        this.GetItem(0).SetUIActive(!1),
        this.GetItem(9).SetUIActive(!0),
        this.GetButton(4).RootUIComp.SetUIActive(!0),
        this.i9e.SetActive(!0),
        this.Z8e === 1
          ? (this.e9e.SetActive(!1),
            this.t9e.SetActive(!0),
            this.GetItem(13).SetUIActive(!0),
            this.t9e.RefreshView(
              ModelManager_1.ModelManager.AdviceModel.GetMotionSelectData(),
            ))
          : (this.GetItem(13).SetUIActive(!1),
            this.t9e.SetActive(!1),
            this.e9e.SetActive(!0),
            this.e9e.RefreshView(
              ModelManager_1.ModelManager.AdviceModel.GetAdviceSelectData(
                ModelManager_1.ModelManager.AdviceModel.CurrentLineModel,
              ),
            )));
  }
  A9e() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(14),
      ModelManager_1.ModelManager.AdviceModel.GetCreateConditionFailText(),
    );
  }
  M9e() {
    const e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray();
    const t =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "AdviceCreateLimit",
      ) ?? 0;
    this.GetItem(10).SetUIActive(e.length >= t);
  }
  OnBeforeDestroy() {
    this.x8e.Destroy(),
      this.D9e(),
      void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3);
  }
}
exports.AdviceAllView = AdviceAllView;
// # sourceMappingURL=AdviceAllView.js.map
