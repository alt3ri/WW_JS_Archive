"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceAllView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  AdviceController_1 = require("../AdviceController"),
  AdivceSelectItem_1 = require("./AdivceSelectItem"),
  AdviceAllViewShowContent_1 = require("./AdviceAllViewShowContent"),
  AdviceSelectMotionItem_1 = require("./AdviceSelectMotionItem"),
  CHECKTIMEER = 1e3,
  ANIMATIONGAP = 5e3;
class AdviceAllView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.c7e = 0),
      (this.m7e = void 0),
      (this.d7e = void 0),
      (this.C7e = void 0),
      (this.g7e = void 0),
      (this.K9e = void 0),
      (this.j3 = void 0),
      (this.Uqe = -0),
      (this.f7e = void 0),
      (this.p7e = !1),
      (this.v7e = (e, t) => {
        (this.p7e = t) && this.CloseMe();
      }),
      (this.M7e = () => {
        AdviceController_1.AdviceController.OpenAdviceView();
      }),
      (this.E7e = () => {
        var e, t, i;
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
      (this.S7e = (e) => {
        this.y7e(e);
      }),
      (this.I7e = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId,
          e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e),
          t = ModelManager_1.ModelManager.RoleModel.GetRoleList(),
          e = new TeamRoleSelectView_1.TeamRoleSelectViewData(
            1,
            e.GetRoleId(),
            t,
            this.S7e,
            void 0,
          );
        RoleController_1.RoleController.OpenTeamRoleSelectView(e);
      }),
      (this.T7e = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.PreSelectAdviceItemId;
        0 === e
          ? this.L7e(0)
          : 1 === e
            ? this.D7e()
            : 2 === e
              ? this.L7e(1)
              : 3 === e
                ? this.R7e()
                : 5 === e
                  ? this.U7e()
                  : 6 === e && this.A7e(),
          this.P7e();
      }),
      (this.R7e = () => {
        AdviceController_1.AdviceController.OpenAdviceExpressionView();
      }),
      (this.x7e = () => {
        (this.Uqe = 0),
          ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId ===
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()
            ? this.K9e.HideAnimation()
            : this.K9e.PlayAnimation(
                ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId,
              );
      }),
      (this.w7e = () => {
        this.Og(), this.B7e(), this.P7e();
      }),
      (this.y7e = (e) => {
        (ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId = e),
          (ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()),
          (ModelManager_1.ModelManager.AdviceModel.CurrentSelectMotionId =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()),
          this.C7e.RefreshView(
            ModelManager_1.ModelManager.AdviceModel.GetMotionSelectData(),
          ),
          this.x7e(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnChangeAdviceRole,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceMotion,
          );
      }),
      (this.b7e = () => {
        0 === this.m7e ? (this.m7e = 1) : (this.m7e = 0),
          0 === this.m7e ? this.K9e.HideAnimation() : this.x7e(),
          this.Og();
      }),
      (this.P7e = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray(),
          t =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "AdviceCreateLimit",
            ) ?? 0,
          e = e.length >= t,
          t = ModelManager_1.ModelManager.AdviceModel.GetIfCanCreateAdvice(
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
        [1, this.b7e],
        [2, this.b7e],
        [5, this.M7e],
        [4, this.E7e],
      ]);
  }
  OnStart() {
    (this.d7e = new AdivceSelectItem_1.AdviceSelectItem(this.GetItem(6))),
      (this.C7e = new AdviceSelectMotionItem_1.AdviceSelectMotionItem(
        this.GetItem(7),
      )),
      this.C7e.SetClickChangeRoleCall(this.I7e),
      (this.g7e = new AdviceAllViewShowContent_1.AdviceAllViewShowContent(
        this.GetItem(8),
      )),
      (this.j3 = TimerSystem_1.TimerSystem.Forever(() => {
        this.q7e();
      }, CHECKTIMEER)),
      this.G7e();
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem.SetHelpButtonActive(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceSelectItem,
      this.T7e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClickAdviceMotion,
        this.x7e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnDeleteAdviceSuccess,
        this.w7e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.P7e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.P7e,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceSelectItem,
      this.T7e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClickAdviceMotion,
        this.x7e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnDeleteAdviceSuccess,
        this.w7e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.P7e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.P7e,
      );
  }
  G7e() {
    var e,
      t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t.Valid &&
      ((e = t.Entity.GetComponent(188)),
      (this.p7e = e.HasTag(1996802261)),
      this.N7e(),
      this.p7e ? this.CloseMe() : this.O7e(t));
  }
  N7e() {
    this.f7e?.EndTask(), (this.f7e = void 0);
  }
  O7e(e) {
    e = e.Entity.GetComponent(188);
    this.f7e = e.ListenForTagAddOrRemove(1996802261, this.v7e);
  }
  L7e(e) {
    AdviceController_1.AdviceController.OpenAdviceWordSelectView(e);
  }
  U7e() {
    AdviceController_1.AdviceController.OpenAdviceSentenceSelectView();
  }
  D7e() {
    AdviceController_1.AdviceController.OpenAdviceConjunctionSelectView();
  }
  A7e() {
    0 === ModelManager_1.ModelManager.AdviceModel.CurrentLineModel
      ? (ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 1)
      : ((ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 0),
        ModelManager_1.ModelManager.AdviceModel.OnChangeSentence(1),
        (ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId = 0)),
      this.Og();
  }
  OnAfterShow() {
    (this.m7e = 0),
      (ModelManager_1.ModelManager.AdviceModel.CurrentLineModel = 0),
      this.Og(),
      this.k7e(),
      this.mGe();
  }
  mGe() {
    this.ChildPopView?.SetTitleByTextIdAndArg("AdviceName");
  }
  q7e() {
    (this.Uqe += CHECKTIMEER),
      this.Uqe >= ANIMATIONGAP && 0 !== this.m7e && this.x7e();
  }
  k7e() {
    this.F7e(),
      (this.c7e =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.Disable(
          "[AdviceCreate DisableCharacter]",
        )),
      (this.K9e =
        ModelManager_1.ModelManager.AdviceModel.GetAdviceCreateActor());
  }
  F7e() {
    0 < this.c7e &&
      (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.Enable(
        this.c7e,
        "AdviceAllView.TryEnableEntity",
      ),
      (this.c7e = 0));
  }
  Og() {
    this.V7e(), this.H7e(), this.B7e(), this.P7e(), this.g7e.RefreshView();
  }
  H7e() {
    1 === this.m7e
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "Motion")
      : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "TextAndExpression");
  }
  V7e() {
    let e = !1;
    var t;
    ModelManager_1.ModelManager.AdviceModel.GetCreateConditionState() ||
      ((t = ModelManager_1.ModelManager.AdviceModel.CheckIfMaxAdvice()),
      (e =
        !t &&
        (this.GetItem(0).SetUIActive(!0),
        this.GetItem(9).SetUIActive(!1),
        this.GetItem(12).SetUIActive(!1),
        this.GetButton(4).RootUIComp.SetUIActive(!1),
        this.g7e.SetActive(!1),
        this.j7e(),
        !0))),
      e ||
        (this.GetItem(12).SetUIActive(!0),
        this.GetItem(0).SetUIActive(!1),
        this.GetItem(9).SetUIActive(!0),
        this.GetButton(4).RootUIComp.SetUIActive(!0),
        this.g7e.SetActive(!0),
        1 === this.m7e
          ? (this.d7e.SetActive(!1),
            this.C7e.SetActive(!0),
            this.GetItem(13).SetUIActive(!0),
            this.C7e.RefreshView(
              ModelManager_1.ModelManager.AdviceModel.GetMotionSelectData(),
            ))
          : (this.GetItem(13).SetUIActive(!1),
            this.C7e.SetActive(!1),
            this.d7e.SetActive(!0),
            this.d7e.RefreshView(
              ModelManager_1.ModelManager.AdviceModel.GetAdviceSelectData(
                ModelManager_1.ModelManager.AdviceModel.CurrentLineModel,
              ),
            )));
  }
  j7e() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(14),
      ModelManager_1.ModelManager.AdviceModel.GetCreateConditionFailText(),
    );
  }
  B7e() {
    var e = ModelManager_1.ModelManager.AdviceModel.GetAdviceArray(),
      t =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "AdviceCreateLimit",
        ) ?? 0;
    this.GetItem(10).SetUIActive(e.length >= t);
  }
  OnBeforeDestroy() {
    this.K9e.Destroy(),
      this.F7e(),
      void 0 !== this.j3 && TimerSystem_1.TimerSystem.Remove(this.j3);
  }
}
exports.AdviceAllView = AdviceAllView;
//# sourceMappingURL=AdviceAllView.js.map
