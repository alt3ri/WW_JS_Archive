"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalInfoTabView = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController"),
  GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PersonalController_1 = require("../Controller/PersonalController"),
  PersonalRoleDisplayMediumItemGrid_1 = require("./PersonalRoleDisplayMediumItemGrid"),
  CAMERA_TAG = new UE.FName("SequenceCamera");
class PersonalInfoTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.l5i = void 0),
      (this._5i = void 0),
      (this.u5i = []),
      (this.c5i = 0),
      (this.m5i = new Map()),
      (this.bzt = void 0),
      (this.v4i = void 0),
      (this.GPe = UE.NewArray(UE.Actor)),
      (this.d5i = 2),
      (this.C5i = void 0),
      (this.z9t = () => {
        ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        this.v4i.PlayerId
          ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "CopiedMyUid",
            )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "CopyOtherUID",
            ),
          UE.LGUIBPLibrary.ClipBoardCopy(this.v4i.PlayerId.toString());
      }),
      (this.CloseClick = () => {
        UiManager_1.UiManager.CloseView("PersonalRootView");
      }),
      (this.OnBirthChange = () => {
        this.g5i();
      }),
      (this.Hke = () => {
        var e =
          new PersonalRoleDisplayMediumItemGrid_1.PersonalRoleDisplayMediumItemGrid();
        return (
          e.BindOnCanExecuteChange(() => !1),
          e.BindOnExtendToggleRelease(this.OnRoleItemClick),
          e.BindEmptySlotButtonCallback(this.V3t),
          e
        );
      }),
      (this.OnRoleItemClick = (e) => {
        var i = e.Data,
          e = e.MediumItemGrid.GridIndex;
        this.v4i.IsOtherData ||
          (-1 === i
            ? UiManager_1.UiManager.OpenView("PersonalRoleShowView")
            : UiManager_1.UiManager.OpenView("PersonalRoleShowView", i)),
          this.c5i !== e && ((this.c5i = e), this.f5i(i), this.p5i());
      }),
      (this.V3t = () => {
        UiManager_1.UiManager.OpenView("PersonalRoleShowView");
      }),
      (this.OnArrowItemClick = (e, i) => {
        (this.c5i = i), this._5i && this._5i.Stop();
        let t = e;
        if (!t || t <= 0) {
          var r = this.l5i.GetLayoutItemMap();
          for (let e = i; 0 <= e; e--) {
            var s = r.get(e);
            if ((t = s.RoleId) && 0 < t) {
              this.c5i = e;
              break;
            }
          }
        }
        this.f5i(t);
      }),
      (this.OnSignChange = () => {
        this.v5i();
      }),
      (this.OnNameChange = () => {
        this.M5i();
      }),
      (this.OnRoleShowListChange = () => {
        this.RefreshRoleShowList();
      }),
      (this.OnHeadIconChange = () => {
        this.S5i();
      }),
      (this.OnCardChange = () => {
        this.RefreshCard();
      }),
      (this.OnClickDetailButton = () => {
        this.v4i.IsOtherData ||
          UiManager_1.UiManager.OpenView("PersonalOptionView");
      }),
      (this.OnClickLeftButton = () => {
        0 < this.c5i && this.c5i--, this.E5i(this.c5i), this.p5i();
      }),
      (this.OnClickRightButton = () => {
        var e = this.v4i.RoleShowList;
        this.c5i < e.length - 1 && this.c5i++, this.E5i(this.c5i), this.p5i();
      }),
      (this.OnClickSignButton = () => {
        this.v4i.IsOtherData ||
          CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UITexture],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [13, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.OnClickDetailButton],
        [11, this.OnClickLeftButton],
        [12, this.OnClickRightButton],
        [13, this.OnClickSignButton],
        [0, this.z9t],
      ]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSignChange,
      this.OnSignChange,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnNameChange,
        this.OnNameChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleShowListChange,
        this.OnRoleShowListChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHeadIconChange,
        this.OnHeadIconChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCardChange,
        this.OnCardChange,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBirthChange,
        this.OnBirthChange,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSignChange,
      this.OnSignChange,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnNameChange,
        this.OnNameChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleShowListChange,
        this.OnRoleShowListChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnHeadIconChange,
        this.OnHeadIconChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCardChange,
        this.OnCardChange,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBirthChange,
        this.OnBirthChange,
      );
  }
  OnStart() {
    (this.C5i = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
      (this.v4i = this.ExtraParams),
      this.y5i(),
      this.I5i(),
      this.T5i(),
      this.g5i(),
      this.M5i(),
      this.v5i(),
      this.S5i(),
      this.RefreshCard();
  }
  OnBeforeShow() {
    this.RefreshRoleShowList();
  }
  RefreshRoleShowList() {
    this.l5i ||
      (this.l5i = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(10),
        this.Hke,
      ));
    var e,
      i,
      t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "role_show_list_max_count",
      ),
      r = this.v4i.RoleShowList;
    if (this.v4i.IsOtherData || 0 !== r.length) {
      this.u5i = [];
      for (let e = 0; e < t; e++)
        e < r.length
          ? ((i = r[e]), this.u5i.push(i.l3n))
          : this.v4i.IsOtherData || this.u5i.push(-1);
      this.l5i.RefreshByData(this.u5i, () => {
        0 < this.u5i.length &&
          (this.E5i(this.c5i), this.GetButton(11).RootUIComp.SetUIActive(!1)),
          this.p5i();
      });
    } else
      (e = []).push(
        ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId(),
      ),
        PersonalController_1.PersonalController.SendRoleShowListUpdateRequest(
          e,
        );
  }
  RefreshCard() {
    var e = this.v4i.CurCardId;
    e &&
      (e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e)) &&
      this.SetTextureByPath(e.CardPath, this.GetTexture(3));
  }
  f5i(v) {
    if (v && !(v <= 0)) {
      var e = this.C5i.Model,
        i = e.CheckGetComponent(11),
        t = e.CheckGetComponent(12);
      if (ModelManager_1.ModelManager.RoleModel.IsMainRole(v))
        this._5i && this._5i.Stop(),
          i.RoleConfigId === v
            ? UiModelUtil_1.UiModelUtil.SetVisible(e, !0)
            : t.LoadModelByRoleConfigId(v),
          this.L5i(2);
      else {
        UiModelUtil_1.UiModelUtil.SetVisible(e, !1);
        i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(v);
        if (i && 0 !== i.ShowSequence)
          if (void 0 !== this.m5i.get(v)) {
            this._5i && this._5i.Stop(), this.L5i(1);
            var t = this.m5i.get(v),
              e = (t.SetTickableWhenPaused(!0), t.SequencePlayer),
              r =
                (e.Play(),
                (this._5i = e),
                t.GetBindingByTag(GachaScanView_1.SCENE_ROLE_TAG)),
              s = r.Num();
            for (let e = 0; e < s; e++) {
              var a = r.Get(e);
              if (a) {
                var o = a.K2_GetComponentsByClass(
                    UE.SkeletalMeshComponent.StaticClass(),
                  ),
                  h = o.Num();
                for (let e = 0; e < h; e++) {
                  var n = o.Get(e);
                  n && n.SetTickableWhenPaused(!0);
                }
              }
            }
          } else {
            e =
              ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
                i.ShowSequence,
              );
            ResourceSystem_1.ResourceSystem.LoadAsync(
              e.SequencePath,
              UE.LevelSequence,
              (e, i) => {
                var t = new UE.MovieSceneSequencePlaybackSettings(),
                  r =
                    ((t.bRestoreState = !1),
                    (t.bPauseAtEnd = !0),
                    this._5i && this._5i.Stop(),
                    CameraController_1.CameraController.SequenceCamera
                      .DisplayComponent.CineCamera),
                  s = ActorSystem_1.ActorSystem.Get(
                    UE.LevelSequenceActor.StaticClass(),
                    new UE.Transform(),
                    void 0,
                    !1,
                  );
                (s.PlaybackSettings = t),
                  s.SetSequence(e),
                  s.SetTickableWhenPaused(!0),
                  (this._5i = s.SequencePlayer),
                  this.GPe.Empty(),
                  this.GPe.Add(r),
                  (s.bOverrideInstanceData = !0);
                (s.DefaultInstanceData.TransformOrigin =
                  RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform()),
                  s.SetBindingByTag(CAMERA_TAG, this.GPe),
                  this.L5i(1),
                  this.m5i.set(v, s),
                  this._5i.Play();
                var a = s.GetBindingByTag(GachaScanView_1.SCENE_ROLE_TAG),
                  o = a.Num();
                for (let e = 0; e < o; e++) {
                  var h = a.Get(e);
                  if (h) {
                    var n = h.K2_GetComponentsByClass(
                        UE.SkeletalMeshComponent.StaticClass(),
                      ),
                      l = n.Num();
                    for (let e = 0; e < l; e++) {
                      var _ = n.Get(e);
                      _ && _.SetTickableWhenPaused(!0);
                    }
                  }
                }
              },
            );
          }
      }
    }
  }
  L5i(e) {
    this.d5i !== e &&
      (this.d5i && CameraController_1.CameraController.ExitCameraMode(this.d5i),
      (this.d5i = e),
      this.d5i) &&
      CameraController_1.CameraController.EnterCameraMode(this.d5i, 0.5);
  }
  OnShowUiTabViewFromToggle() {
    this.bzt =
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        "1066",
      );
  }
  OnBeforeHide() {
    this._5i?.Stop(),
      this.bzt &&
        UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
          this.bzt,
        );
    var e = this.C5i?.Model;
    e && UiModelUtil_1.UiModelUtil.SetVisible(e, !1);
  }
  OnBeforeDestroy() {
    1 === this.d5i && this.L5i(void 0),
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.C5i),
      TimerSystem_1.TimerSystem.Next(() => {
        for (var e of this.m5i.values())
          e?.SetTickableWhenPaused(!1),
            ActorSystem_1.ActorSystem.Put(e),
            (e = void 0);
      });
  }
  I5i() {
    var e = this.v4i.IsOtherData
      ? this.v4i.WorldLevel
      : ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    e && LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "WorldLevelNum", e);
  }
  T5i() {
    var e = this.v4i.IsOtherData
      ? this.v4i.Level
      : ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
    e && LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "PlayerLevelNum", e);
  }
  g5i() {
    var e,
      i,
      t,
      r = this.GetText(7);
    (this.v4i.IsOtherData && !this.v4i.IsBirthdayDisplay) ||
    ((e = this.v4i.Birthday), (i = Math.floor(e / 100)), (t = e % 100), 0 === e)
      ? LguiUtil_1.LguiUtil.SetLocalText(r, "BirthDay", "--", "--")
      : LguiUtil_1.LguiUtil.SetLocalText(r, "BirthDay", i, t);
  }
  M5i() {
    var e = this.v4i.IsOtherData
      ? this.v4i.Name
      : ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    e && this.GetText(5).SetText(e);
  }
  v5i() {
    var e = this.v4i.Signature,
      i = this.GetText(6);
    e ? i.SetText(e) : LguiUtil_1.LguiUtil.SetLocalText(i, "ClickToSetSign");
  }
  S5i() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    this.SetRoleIcon("", this.GetTexture(4), e);
  }
  y5i() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(1),
      "UserId",
      (this.v4i.IsOtherData
        ? this.v4i
        : ModelManager_1.ModelManager.FunctionModel
      ).PlayerId,
    );
  }
  p5i() {
    var e = this.GetButton(11),
      i = this.GetButton(12),
      t = this.v4i.RoleShowList;
    0 === t.length
      ? (e.RootUIComp.SetUIActive(!1), i.RootUIComp.SetUIActive(!1))
      : (e.RootUIComp.SetUIActive(0 < this.c5i && this.c5i < t.length),
        i.RootUIComp.SetUIActive(
          this.c5i < t.length - 1 && this.c5i < t.length,
        ));
  }
  E5i(e) {
    var i, t;
    for ([i, t] of this.l5i.GetLayoutItemMap())
      i === e && this.OnArrowItemClick(t.RoleId, t.GridIndex);
  }
}
exports.PersonalInfoTabView = PersonalInfoTabView;
//# sourceMappingURL=PersonalInfoTabView.js.map
