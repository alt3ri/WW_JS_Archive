"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleRootView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../Core/Audio/AudioController"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Queue_1 = require("../../../Core/Container/Queue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  GlobalData_1 = require("../../GlobalData"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RedDotController_1 = require("../../RedDot/RedDotController"),
  RenderModuleController_1 = require("../../Render/Manager/RenderModuleController"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerDefine_1 = require("../../Ui/TouchFinger/TouchFingerDefine"),
  TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  EffectUtil_1 = require("../../Utils/EffectUtil"),
  CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
  RoleTabItem_1 = require("../Common/TabComponent/TabItem/RoleTabItem"),
  TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent"),
  GuideConfig_1 = require("../Guide/GuideConfig"),
  UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  RoleListComponent_1 = require("./Component/RoleListComponent"),
  RoleDefine_1 = require("./RoleDefine"),
  RenderUtil_1 = require("../../Render/Utils/RenderUtil");
class OperationParam {
  constructor(e, t) {
    (this.OperationType = e), (this.Param = t);
  }
}
class RoleRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleListComponent = void 0),
      (this.TabViewComponent = void 0),
      (this.TabComponent = void 0),
      (this.dmo = void 0),
      (this.TabDataList = []),
      (this.Nlo = 0),
      (this.RoleRootUiCameraHandleData = void 0),
      (this.I6e = 0),
      (this.rmo = void 0),
      (this.RHt = void 0),
      (this.nmo = 0),
      (this.L6e = void 0),
      (this.smo = !0),
      (this.cVi = new Map()),
      (this.amo = new Map()),
      (this.U8i = !1),
      (this.A8i = void 0),
      (this.d1o = void 0),
      (this.hmo = new Queue_1.Queue()),
      (this.pjt = !1),
      (this.RDn = !0),
      (this.OnRoleSelect = () => {
        var e;
        this.Rjt
          ? ((e = new OperationParam(2)), this.hmo.Push(e))
          : (this.Ujt(),
            this.OnRoleSelectAsync().finally(() => {
              this.Jft();
            }));
      }),
      (this.OnSelectRoleTabOutside = (e) => {
        this.Ujt(),
          this.SelectRoleTabOutSide(e).finally(() => {
            this.Jft();
          });
      }),
      (this.CanToggleChange = (e) => {
        var t;
        return (
          !!Info_1.Info.IsInGamepad() ||
          ((t = CommonParamById_1.configCommonParamById.GetIntConfig(
            "panel_interval_time",
          )),
          !this.L6e) ||
          Time_1.Time.Now - this.L6e >= t
        );
      }),
      (this.R6e = (e, t) => {
        return new RoleTabItem_1.RoleTabItem();
      }),
      (this.pqe = (e) => {
        this.nmo++, (this.L6e = Time_1.Time.Now);
        var t = this.TabDataList[e],
          i = t.ChildViewName,
          s = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, s, this.d1o),
          (this.I6e = e),
          (this.rmo = i),
          this.lmo(e, this.nmo),
          (this.U8i = this.P8i());
      }),
      (this.q8i = (e) => {
        0 !== e &&
          this.U8i &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddPitchInput(-e);
      }),
      (this.G8i = (e) => {
        0 !== e &&
          this.U8i &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddYawInput(e);
      }),
      (this.PUn = (e, t) => {
        0 !== t &&
          this.U8i &&
          Info_1.Info.IsInGamepad() &&
          this.A8i.AddZoomInput(t);
      }),
      (this._mo = () => {
        var e;
        this.U8i &&
          (e =
            UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()) &&
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            e.HandleName,
            !0,
            !0,
            "1001",
          );
      }),
      (this.Eqt = (e, t) => {
        this.U8i && 2 === t.TouchType && this.Egt();
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.CloseClick = () => {
        this.CloseMe();
      }),
      (this.OnInternalViewQuit = () => {
        (this.d1o.RoleViewState = 0), this._Vi(), this.TabComponent.ShowItem();
      }),
      (this.OnInternalViewEnter = () => {
        (this.d1o.RoleViewState = 1), this.umo(), this.TabComponent.HideItem();
      }),
      (this.RoleListClick = () => {
        UiManager_1.UiManager.OpenView("RoleSelectionView", this.d1o);
      }),
      (this.x8i = void 0),
      (this.w8i = (e) => {
        this.U8i && (this.x8i = e.GetLocalPointInPlane());
      }),
      (this.B8i = (e) => {
        var t;
        !this.U8i ||
        1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() ||
        InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")
          ? (this.x8i = void 0)
          : ((t = this.x8i),
            (this.x8i = e.GetLocalPointInPlane()),
            t &&
              ((e = this.x8i.X - t.X),
              (t = this.x8i.Y - t.Y),
              0 != e && this.A8i.AddYawInput(e),
              0 != t) &&
              this.A8i.AddPitchInput(t));
      }),
      (this.b8i = (e) => {
        this.U8i && (this.x8i = void 0);
      }),
      (this.N8i = (e) => {
        this.U8i &&
          0 !== e.scrollAxisValue &&
          this.A8i.AddZoomInput(-e.scrollAxisValue);
      }),
      (this.cmo = () => {
        (this.U8i = !1), this.A8i?.PauseTick();
      }),
      (this.mmo = () => {
        var e,
          t = UiCameraManager_1.UiCameraManager.Get(),
          t =
            ((this.A8i = t.AddUiCameraComponent(
              UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
              !1,
            )),
            ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetDefaultRoleCameraConfig());
        this.A8i.InitDataByConfig(t),
          (this.U8i = this.P8i()),
          this.U8i &&
            ((e = (t = this.dmo).K2_GetActorLocation()),
            (t = (t.Model?.CheckGetComponent(11)).RoleConfigId),
            (t =
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
                t,
              ).RoleBody),
            (t =
              ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(
                t,
              )),
            this.A8i.UpdateData(
              e,
              t.镜头浮动最大高度,
              t.镜头浮动最低高度,
              t.镜头浮动最长臂长,
              t.镜头浮动最短臂长,
            ),
            this.A8i.Activate(),
            this.A8i.ResumeTick());
      }),
      (this.Cmo = (e) => {
        this.GetItem(2).SetUIActive(e);
      }),
      (this.gmo = (e) => {
        this.UiViewSequence.PlaySequencePurely(e ? "hide" : "show");
      }),
      (this.fmo = () => {
        var e;
        this.smo &&
          ((e = UiSceneManager_1.UiSceneManager.GetUiStartSequenceFrame()),
          (e = new UE.FrameNumber(e)),
          (e = new UE.FrameTime(e, 0)),
          (e = new UE.MovieSceneSequencePlaybackParams(e, 0, "", 0, 1)),
          this.RHt.SetPlaybackPosition(e));
      });
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = !0;
  }
  Jft() {
    if (((this.pjt = !1), 0 !== this.hmo.Size)) {
      var e = this.hmo.Pop();
      if (e)
        switch (e.OperationType) {
          case 0:
            this.RefreshRoleList();
            break;
          case 1:
            this.RefreshTabList();
            break;
          case 2:
            this.OnRoleSelect();
        }
    }
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [6, UE.UIDraggableComponent],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.RoleListClick]]);
  }
  async OnBeforeStartAsync() {
    (this.d1o = this.OpenParam),
      void 0 === this.d1o
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleRootView",
          ])
        : (RenderUtil_1.RenderUtil.BeginPSOSyncMode(),
          (this.RoleListComponent =
            new RoleListComponent_1.RoleListComponent()),
          await this.RoleListComponent.CreateThenShowByActorAsync(
            this.GetItem(3).GetOwner(),
            this.d1o,
          ),
          this.InitTabComponent(),
          (this.d1o.RoleViewState = 0),
          (this.dmo =
            UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
          AudioController_1.AudioController.SetSwitch(
            "actor_ui_switch",
            "sys_ui",
            this.dmo,
          ),
          (this.rmo = this.d1o.GetCurSelectTabName()),
          this.RefreshRoleSystemModeUiParam());
  }
  ADn() {
    this.RDn &&
      ((this.RDn = !1),
      this.dmo ||
        (this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
      this.LoadFloorEffect(),
      this.dmo.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"));
  }
  OnHandleLoadScene() {
    this.ADn();
  }
  OnBeforeShow() {
    this.ADn(), this.RefreshRoleList();
  }
  RefreshRoleList() {
    var e;
    this.Rjt
      ? ((e = new OperationParam(0)), this.hmo.Push(e))
      : (this.Ujt(),
        this.RefreshRoleListAsync().finally(() => {
          this.Jft();
        }));
  }
  async RefreshRoleListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshRoleListAsync", !0);
    var e = this.d1o.GetRoleIdList(),
      e =
        (await this.RoleListComponent.UpdateComponent(e).finally(() => {
          UiLayer_1.UiLayer.SetShowMaskLayer("RefreshRoleListAsync", !1);
        }),
        this.d1o.GetCurSelectRoleId());
    this.RoleListComponent?.SetCurSelection(e);
  }
  RefreshTabList() {
    var e;
    this.Rjt
      ? ((e = new OperationParam(1)), this.hmo.Push(e))
      : (this.Ujt(),
        this.RefreshTabListAsync().finally(() => {
          this.Jft();
        }));
  }
  async RefreshTabListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", !0);
    var e = this.d1o.GetRoleTabDataList(),
      t = this.TabDataList.toString() !== e.toString(),
      i = ((this.TabDataList = e), this.TabDataList.length),
      s = this.TabComponent.CreateTabItemDataByLength(i);
    if (this.d1o.GetRoleSystemUiParams().TabRedDot) {
      var n = this.d1o?.GetCurSelectRoleData();
      for (let e = 0; e < i; e++) {
        var o = this.TabDataList[e].ChildViewName,
          o = this.GetRedDotName(o);
        o && ((s[e].RedDotName = o), (s[e].RedDotUid = n.GetDataId()));
      }
    }
    if (
      (await this.TabComponent.RefreshTabItemAsync(s, t).finally(() => {
        UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", !1);
      }),
      t)
    ) {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++)
        if (this.TabDataList[e].ChildViewName === this.rmo) {
          t = e;
          break;
        }
      this.TabComponent.SelectToggleByIndex(t, !0);
    } else
      this.TabViewComponent?.SetCurrentTabViewState(!0),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetRoleFlag);
  }
  async OnRoleSelectAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("SelectRoleByDataIdAsync", !0),
      this.RefreshUiMode(),
      await this.RefreshTabListAsync().finally(() => {
        UiLayer_1.UiLayer.SetShowMaskLayer("SelectRoleByDataIdAsync", !1);
      });
  }
  async SelectRoleTabOutSide(t) {
    var e = new CustomPromise_1.CustomPromise(),
      e =
        (await Promise.all([
          this.UiViewSequence.PlaySequenceAsync("RoleListStart", e),
          this.TabComponent.ShowItemAsync(),
        ]),
        (this.d1o.RoleViewState = 0),
        this.TabDataList.findIndex((e) => e.ChildViewName === t));
    this.TabComponent.SelectToggleByIndex(e);
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(2),
        e,
        this.CloseClick,
      )),
      (this.L6e = void 0),
      this.TabComponent.SetCanChange(this.CanToggleChange),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(4),
      ));
  }
  lmo(s, e) {
    const n = this.TabDataList[s].LightSequence;
    var t = this.cVi.get(s);
    t
      ? (this.RHt && (this.RHt.Stop(), (this.smo = !1), (this.RHt = void 0)),
        (t = t.SequencePlayer).Play(),
        (this.smo = !0),
        (this.RHt = t))
      : 1 !== this.amo.get(s) &&
        (this.amo.set(s, 1),
        ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.LevelSequence, (e) => {
          var t, i;
          ObjectUtils_1.ObjectUtils.IsValid(e)
            ? ((e = e),
              ((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
                !0),
              (i = (0, puerts_1.$ref)(void 0)),
              UE.LevelSequencePlayer.CreateLevelSequencePlayer(
                GlobalData_1.GlobalData.World,
                e,
                new UE.MovieSceneSequencePlaybackSettings(),
                i,
              ),
              ((i = (0, puerts_1.$unref)(i)).PlaybackSettings = t),
              i.SetSequence(e),
              this.cVi.set(s, i),
              this.RHt &&
                (this.RHt.Stop(), (this.smo = !1), (this.RHt = void 0)),
              this.I6e === s &&
                ((this.RHt = i.SequencePlayer),
                (i.bOverrideInstanceData = !0),
                (i.DefaultInstanceData.TransformOrigin =
                  RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform()),
                this.RHt.Play(),
                (this.smo = !0)))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Role", 44, "加载level sequence失败:", [
                "sequencePath",
                n,
              ]),
            this.amo.set(s, 0);
        }));
  }
  Egt() {
    var e;
    1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() &&
      ((e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      )),
      this.A8i.AddZoomInput(-e));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (this.Rjt)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 44, "异步操作执行过程中不能触发引导");
    else {
      if (2 === e.length && e[0] === GuideConfig_1.GuideConfig.TabTag) {
        this.TabComponent ||
          ((t = new CommonTabComponentData_1.CommonTabComponentData(
            this.R6e,
            this.pqe,
            this.yqe,
          )),
          (this.TabComponent =
            new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
              this.GetItem(2),
              t,
              this.CloseClick,
            )));
        var t = this.TabComponent.GetTabComponent().GetLayout();
        if (!t)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Guide",
              17,
              "角色界面聚焦引导的额外参数配置有误, 找不到Layout",
              ["configParams", e],
            )
          );
        const s = Number(e[1]);
        t = t.GetLayoutItemByIndex(s);
        return t
          ? [t.GetRootItem(), t.GetIconSprite()]
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Guide", 44, "Layout加载未完成")
            );
      }
      if (2 === e.length && e[0] === GuideConfig_1.GuideConfig.SlotTag) {
        const s = Number(e[1]);
        t = this.RoleListComponent.GetSelfScrollView()
          .GetScrollItemByIndex(s)
          .GetToggleForGuide().RootUIComp;
        return t ? [t, t] : void 0;
      }
      t =
        2 !== e.length
          ? e[0]
          : e.find(
              (e) =>
                Number(e) ===
                ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId(),
            );
      const i = Number(t);
      e = this.d1o.GetRoleIdList();
      const s = e.findIndex((e) => e === i);
      if (s < 0 || s >= e.length)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "角色界面聚焦引导的额外参数配置有误, 找不到角色Id",
            ["roleId", i],
          );
      else {
        const n =
          this.RoleListComponent?.GetSelfScrollView()?.GetScrollItemByIndex(s);
        if (n) {
          TimerSystem_1.TimerSystem.Next(() => {
            this.RoleListComponent.GetSelfScrollView().ScrollTo(
              n.GetRootItem(),
            );
          });
          t = n.RoleIconItem?.GetRootItem();
          if (t) return [t, t];
        }
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            44,
            "角色界面聚焦引导的额外参数配置有误, 找不到角色Id",
            ["roleId", i],
          );
      }
    }
  }
  _Vi() {
    this.UiViewSequence.PlaySequence("RoleListStart");
  }
  umo() {
    this.UiViewSequence.PlaySequence("RoleListClose");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SwitchRootTabState,
      this.Cmo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AttributeComponentEvent,
        this.gmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame,
        this.fmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SelectRoleTab,
        this.pqe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SelectRoleTabOutside,
        this.OnSelectRoleTabOutside,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleInternalViewEnter,
        this.OnInternalViewEnter,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.OnInternalViewQuit,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayCameraAnimationStart,
        this.cmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.OnRoleSelect,
      );
    var e = this.GetDraggable(6);
    e.OnPointerBeginDragCallBack.Bind(this.w8i),
      e.OnPointerDragCallBack.Bind(this.B8i),
      e.OnPointerEndDragCallBack.Bind(this.b8i),
      e.OnPointerScrollCallBack.Bind(this.N8i),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
        this.q8i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleTurn,
        this.G8i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleZoom,
        this.PUn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleReset,
        this._mo,
      ),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SwitchRootTabState,
      this.Cmo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AttributeComponentEvent,
        this.gmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame,
        this.fmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SelectRoleTab,
        this.pqe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SelectRoleTabOutside,
        this.OnSelectRoleTabOutside,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleInternalViewEnter,
        this.OnInternalViewEnter,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleInternalViewQuit,
        this.OnInternalViewQuit,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.OnRoleSelect,
      );
  }
  pmo() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayCameraAnimationStart,
      this.cmo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.mmo,
      );
    var e = this.GetDraggable(6);
    e.OnPointerBeginDragCallBack.Unbind(),
      e.OnPointerDragCallBack.Unbind(),
      e.OnPointerEndDragCallBack.Unbind(),
      e.OnPointerScrollCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
        this.q8i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleTurn,
        this.G8i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleZoom,
        this.PUn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleReset,
        this._mo,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.Eqt,
      );
  }
  P8i() {
    if (
      UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation()
    )
      return !1;
    const t = this.TabViewComponent.GetCurrentTabViewName();
    let i = !1;
    return (
      RoleDefine_1.UI_ROLE_CAN_ROTATE_TABVIEW.forEach((e) => {
        t === e && (i = !0);
      }),
      i
    );
  }
  RefreshUiMode() {
    this.RefreshRoleSystemModeUiParam();
  }
  RefreshRoleSystemModeUiParam() {
    var e = this.d1o.GetRoleSystemUiParams();
    this.BindRedDot(e.RoleListButtonRedDot),
      this.SetRoleListButtonVisible(e.RoleListButton),
      this.RoleListComponent.SetRoleSystemUiParams(e);
  }
  LoadFloorEffect() {
    var e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase");
    e &&
      (this.Nlo = EffectUtil_1.EffectUtil.SpawnUiEffect(
        "RoleSystemFloorEffect",
        "[RoleRootView.LoadFloorEffect]",
        e.GetTransform(),
        new EffectContext_1.EffectContext(void 0, e),
      ));
  }
  GetRedDotName(e) {
    return "RoleAttributeTabView" === e
      ? "RoleAttributeTab"
      : "RoleResonanceTabNewView" === e
        ? "RoleResonanceTab"
        : "RolePhantomTabView" === e
          ? "VisionOneKeyEquip"
          : void 0;
  }
  BindRedDot(e) {
    e
      ? RedDotController_1.RedDotController.BindRedDot(
          "RoleSelectionList",
          this.GetItem(8),
        )
      : (RedDotController_1.RedDotController.UnBindGivenUi(
          "RoleSelectionList",
          this.GetItem(8),
        ),
        this.GetItem(8).SetUIActive(!1));
  }
  UnBindRedDot() {
    for (const e of this.TabComponent.GetTabItemMap().values())
      e.UnBindRedDot();
    RedDotController_1.RedDotController.UnBindRedDot("RoleSelectionList");
  }
  SetRoleListButtonVisible(e) {
    this.GetButton(1).RootUIComp.SetUIActive(e);
  }
  SetRoleListVisible(e) {
    this.GetItem(3).SetUIActive(e);
  }
  OnBeforeHide() {
    this.pmo(),
      (this.U8i = !1),
      this.RHt && ((this.smo = !1), this.RHt.Stop(), (this.RHt = void 0)),
      UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
        UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
      ),
      (this.A8i = void 0);
  }
  OnHandleReleaseScene() {
    this.UDn();
  }
  OnAfterHide() {
    this.RoleListComponent.UnBindRedDot(),
      this.TabViewComponent.SetCurrentTabViewState(!1);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot(),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Role", 44, "角色界面关闭");
  }
  UDn() {
    this.RDn ||
      ((this.RDn = !0),
      EffectSystem_1.EffectSystem.IsValid(this.Nlo) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.Nlo,
          "[RoleRootView.HandleReleaseScene]",
          !1,
        ),
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo),
      (this.dmo = void 0),
      UiSceneManager_1.UiSceneManager.ClearUiSequenceFrame(),
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0),
      RenderUtil_1.RenderUtil.EndPSOSyncMode());
  }
  OnBeforeDestroyImplement() {
    this.UDn(),
      this.ClearData(),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Role", 44, "角色界面销毁");
  }
  ClearData() {
    this.TabViewComponent &&
      (this.TabViewComponent.DestroyTabViewComponent(),
      (this.TabViewComponent = void 0)),
      EffectSystem_1.EffectSystem.IsValid(this.Nlo) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.Nlo,
          "[RoleRootView.ClearData]",
          !0,
        ),
        (this.Nlo = 0));
    for (const e of this.cVi.values()) e.SetShouldLatentDestroy(!0);
    this.cVi.clear(),
      (this.I6e = 0),
      (this.nmo = 0),
      UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
        UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
      );
  }
}
exports.RoleRootView = RoleRootView;
//# sourceMappingURL=RoleRootView.js.map
