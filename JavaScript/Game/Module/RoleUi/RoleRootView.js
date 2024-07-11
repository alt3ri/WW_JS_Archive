"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleRootView = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const RoleTabItem_1 = require("../Common/TabComponent/TabItem/RoleTabItem");
const TabViewComponent_1 = require("../Common/TabComponent/TabViewComponent");
const GuideConfig_1 = require("../Guide/GuideConfig");
const UiCameraControlRotationComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraControlRotationComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const RoleListComponent_1 = require("./Component/RoleListComponent");
const RoleDefine_1 = require("./RoleDefine");
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
      (this.pco = void 0),
      (this.TabDataList = []),
      (this.Fho = 0),
      (this.RoleRootUiCameraHandleData = void 0),
      (this._Ve = 0),
      (this.hco = void 0),
      (this.R7t = void 0),
      (this.lco = 0),
      (this.cVe = void 0),
      (this._co = !0),
      (this.m5i = new Map()),
      (this.uco = new Map()),
      (this.A6i = !1),
      (this.P6i = void 0),
      (this.plo = void 0),
      (this.cco = new Queue_1.Queue()),
      (this.pHt = !1),
      (this.NLn = !0),
      (this.OnRoleSelect = () => {
        let e;
        this.RHt
          ? ((e = new OperationParam(2)), this.cco.Push(e))
          : (this.UHt(),
            this.OnRoleSelectAsync().finally(() => {
              this.O0t();
            }));
      }),
      (this.OnSelectRoleTabOutside = (e) => {
        this.UHt(),
          this.SelectRoleTabOutSide(e).finally(() => {
            this.O0t();
          });
      }),
      (this.CanToggleChange = (e) => {
        let t;
        return (
          !!ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
          ((t = CommonParamById_1.configCommonParamById.GetIntConfig(
            "panel_interval_time",
          )),
          !this.cVe) ||
          Time_1.Time.Now - this.cVe >= t
        );
      }),
      (this.dVe = (e, t) => {
        return new RoleTabItem_1.RoleTabItem();
      }),
      (this.pqe = (e) => {
        this.lco++, (this.cVe = Time_1.Time.Now);
        const t = this.TabDataList[e];
        const i = t.ChildViewName;
        const s = this.TabComponent.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(t, i, s, this.plo),
          (this._Ve = e),
          (this.hco = i),
          this.mco(e, this.lco),
          (this.A6i = this.x6i());
      }),
      (this.G6i = (e) => {
        e !== 0 &&
          this.A6i &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.P6i.AddPitchInput(-e);
      }),
      (this.N6i = (e) => {
        e !== 0 &&
          this.A6i &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.P6i.AddYawInput(e);
      }),
      (this.wDn = (e, t) => {
        t !== 0 &&
          this.A6i &&
          ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
          this.P6i.AddZoomInput(t);
      }),
      (this.dco = () => {
        let e;
        this.A6i &&
          (e =
            UiCameraAnimationManager_1.UiCameraAnimationManager.GetLastHandleData()) &&
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            e.HandleName,
            !0,
            !0,
            "1001",
          );
      }),
      (this.pbt = (e, t) => {
        this.A6i && t.TouchType === 2 && this.lCt();
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
        (this.plo.RoleViewState = 0), this.u5i(), this.TabComponent.ShowItem();
      }),
      (this.OnInternalViewEnter = () => {
        (this.plo.RoleViewState = 1), this.Cco(), this.TabComponent.HideItem();
      }),
      (this.RoleListClick = () => {
        UiManager_1.UiManager.OpenView("RoleSelectionView", this.plo);
      }),
      (this.w6i = void 0),
      (this.B6i = (e) => {
        this.A6i && (this.w6i = e.GetLocalPointInPlane());
      }),
      (this.b6i = (e) => {
        let t;
        !this.A6i ||
        TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 ||
        InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton")
          ? (this.w6i = void 0)
          : ((t = this.w6i),
            (this.w6i = e.GetLocalPointInPlane()),
            t &&
              ((e = this.w6i.X - t.X),
              (t = this.w6i.Y - t.Y),
              e != 0 && this.P6i.AddYawInput(e),
              t != 0) &&
              this.P6i.AddPitchInput(t));
      }),
      (this.q6i = (e) => {
        this.A6i && (this.w6i = void 0);
      }),
      (this.O6i = (e) => {
        this.A6i &&
          e.scrollAxisValue !== 0 &&
          this.P6i.AddZoomInput(-e.scrollAxisValue);
      }),
      (this.gco = () => {
        (this.A6i = !1), this.P6i?.PauseTick();
      }),
      (this.fco = () => {
        let e;
        var t = UiCameraManager_1.UiCameraManager.Get();
        var t =
          ((this.P6i = t.AddUiCameraComponent(
            UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
            !1,
          )),
          ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetDefaultRoleCameraConfig());
        this.P6i.InitDataByConfig(t),
          (this.A6i = this.x6i()),
          this.A6i &&
            ((e = (t = this.pco).K2_GetActorLocation()),
            (t = (t.Model?.CheckGetComponent(11)).RoleConfigId),
            (t =
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
                t,
              ).RoleBody),
            (t =
              ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraOffsetConfig(
                t,
              )),
            this.P6i.UpdateData(
              e,
              t.镜头浮动最大高度,
              t.镜头浮动最低高度,
              t.镜头浮动最长臂长,
              t.镜头浮动最短臂长,
            ),
            this.P6i.Activate(),
            this.P6i.ResumeTick());
      }),
      (this.vco = (e) => {
        this.GetItem(2).SetUIActive(e);
      }),
      (this.Mco = (e) => {
        this.UiViewSequence.PlaySequencePurely(e ? "hide" : "show");
      }),
      (this.Sco = () => {
        let e;
        this._co &&
          ((e = UiSceneManager_1.UiSceneManager.GetUiStartSequenceFrame()),
          (e = new UE.FrameNumber(e)),
          (e = new UE.FrameTime(e, 0)),
          (e = new UE.MovieSceneSequencePlaybackParams(e, 0, "", 0, 1)),
          this.R7t.SetPlaybackPosition(e));
      });
  }
  get RHt() {
    return this.pHt;
  }
  UHt() {
    this.pHt = !0;
  }
  O0t() {
    if (((this.pHt = !1), this.cco.Size !== 0)) {
      const e = this.cco.Pop();
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
    (this.plo = this.OpenParam),
      void 0 === this.plo
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleRootView",
          ])
        : ((this.RoleListComponent =
            new RoleListComponent_1.RoleListComponent()),
          await this.RoleListComponent.CreateThenShowByActorAsync(
            this.GetItem(3).GetOwner(),
            this.plo,
          ),
          this.InitTabComponent(),
          (this.plo.RoleViewState = 0),
          (this.pco =
            UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
          AudioController_1.AudioController.SetSwitch(
            "actor_ui_switch",
            "sys_ui",
            this.pco,
          ),
          (this.hco = this.plo.GetCurSelectTabName()),
          this.RefreshRoleSystemModeUiParam());
  }
  OLn() {
    this.NLn &&
      ((this.NLn = !1),
      this.pco ||
        (this.pco = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
      this.LoadFloorEffect(),
      this.pco.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"));
  }
  OnHandleLoadScene() {
    this.OLn();
  }
  OnBeforeShow() {
    this.OLn(), this.RefreshRoleList();
  }
  RefreshRoleList() {
    let e;
    this.RHt
      ? ((e = new OperationParam(0)), this.cco.Push(e))
      : (this.UHt(),
        this.RefreshRoleListAsync().finally(() => {
          this.O0t();
        }));
  }
  async RefreshRoleListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshRoleListAsync", !0);
    var e = this.plo.GetRoleIdList();
    var e =
      (await this.RoleListComponent.UpdateComponent(e).finally(() => {
        UiLayer_1.UiLayer.SetShowMaskLayer("RefreshRoleListAsync", !1);
      }),
      this.plo.GetCurSelectRoleId());
    this.RoleListComponent?.SetCurSelection(e);
  }
  RefreshTabList() {
    let e;
    this.RHt
      ? ((e = new OperationParam(1)), this.cco.Push(e))
      : (this.UHt(),
        this.RefreshTabListAsync().finally(() => {
          this.O0t();
        }));
  }
  async RefreshTabListAsync() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RefreshTabListAsync", !0);
    const e = this.plo.GetRoleTabDataList();
    const t = this.TabDataList.toString() !== e.toString();
    const i = ((this.TabDataList = e), this.TabDataList.length);
    const s = this.TabComponent.CreateTabItemDataByLength(i);
    if (this.plo.GetRoleSystemUiParams().TabRedDot) {
      const n = this.plo?.GetCurSelectRoleData();
      for (let e = 0; e < i; e++) {
        var o = this.TabDataList[e].ChildViewName;
        var o = this.GetRedDotName(o);
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
        if (this.TabDataList[e].ChildViewName === this.hco) {
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
    var e = new CustomPromise_1.CustomPromise();
    var e =
      (await Promise.all([
        this.UiViewSequence.PlaySequenceAsync("RoleListStart", e),
        this.TabComponent.ShowItemAsync(),
      ]),
      (this.plo.RoleViewState = 0),
      this.TabDataList.findIndex((e) => e.ChildViewName === t));
    this.TabComponent.SelectToggleByIndex(e);
  }
  InitTabComponent() {
    const e = new CommonTabComponentData_1.CommonTabComponentData(
      this.dVe,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(2),
        e,
        this.CloseClick,
      )),
      (this.cVe = void 0),
      this.TabComponent.SetCanChange(this.CanToggleChange),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(4),
      ));
  }
  mco(s, e) {
    const n = this.TabDataList[s].LightSequence;
    let t = this.m5i.get(s);
    t
      ? (this.R7t && (this.R7t.Stop(), (this._co = !1), (this.R7t = void 0)),
        (t = t.SequencePlayer).Play(),
        (this._co = !0),
        (this.R7t = t))
      : this.uco.get(s) !== 1 &&
        (this.uco.set(s, 1),
        ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.LevelSequence, (e) => {
          let t, i;
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
              this.m5i.set(s, i),
              this.R7t &&
                (this.R7t.Stop(), (this._co = !1), (this.R7t = void 0)),
              this._Ve === s &&
                ((this.R7t = i.SequencePlayer),
                (i.bOverrideInstanceData = !0),
                (i.DefaultInstanceData.TransformOrigin =
                  RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform()),
                this.R7t.Play(),
                (this._co = !0)))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Role", 44, "加载level sequence失败:", [
                "sequencePath",
                n,
              ]),
            this.uco.set(s, 0);
        }));
  }
  lCt() {
    let e;
    TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 &&
      ((e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
        TouchFingerDefine_1.EFingerIndex.One,
        TouchFingerDefine_1.EFingerIndex.Two,
      )),
      this.P6i.AddZoomInput(-e));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (this.RHt)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 44, "异步操作执行过程中不能触发引导");
    else {
      if (e.length === 2 && e[0] === GuideConfig_1.GuideConfig.TabTag) {
        this.TabComponent ||
          ((t = new CommonTabComponentData_1.CommonTabComponentData(
            this.dVe,
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
      if (e.length === 2 && e[0] === GuideConfig_1.GuideConfig.SlotTag) {
        const s = Number(e[1]);
        t = this.RoleListComponent.GetSelfScrollView()
          .GetScrollItemByIndex(s)
          .GetToggleForGuide().RootUIComp;
        return t ? [t, t] : void 0;
      }
      t =
        e.length !== 2
          ? e[0]
          : e.find(
              (e) =>
                Number(e) ===
                ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId(),
            );
      const i = Number(t);
      e = this.plo.GetRoleIdList();
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
  u5i() {
    this.UiViewSequence.PlaySequence("RoleListStart");
  }
  Cco() {
    this.UiViewSequence.PlaySequence("RoleListClose");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SwitchRootTabState,
      this.vco,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AttributeComponentEvent,
        this.Mco,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame,
        this.Sco,
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
        this.gco,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.fco,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.OnRoleSelect,
      );
    const e = this.GetDraggable(6);
    e.OnPointerBeginDragCallBack.Bind(this.B6i),
      e.OnPointerDragCallBack.Bind(this.b6i),
      e.OnPointerEndDragCallBack.Bind(this.q6i),
      e.OnPointerScrollCallBack.Bind(this.O6i),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
        this.G6i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleTurn,
        this.N6i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleZoom,
        this.wDn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NavigationTriggerRoleReset,
        this.dco,
      ),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.pbt,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SwitchRootTabState,
      this.vco,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AttributeComponentEvent,
        this.Mco,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame,
        this.Sco,
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
  Eco() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayCameraAnimationStart,
      this.gco,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
        this.fco,
      );
    const e = this.GetDraggable(6);
    e.OnPointerBeginDragCallBack.Unbind(),
      e.OnPointerDragCallBack.Unbind(),
      e.OnPointerEndDragCallBack.Unbind(),
      e.OnPointerScrollCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
        this.G6i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleTurn,
        this.N6i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleZoom,
        this.wDn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NavigationTriggerRoleReset,
        this.dco,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
        ],
        this.pbt,
      );
  }
  x6i() {
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
    const e = this.plo.GetRoleSystemUiParams();
    this.BindRedDot(e.RoleListButtonRedDot),
      this.SetRoleListButtonVisible(e.RoleListButton),
      this.RoleListComponent.SetRoleSystemUiParams(e);
  }
  LoadFloorEffect() {
    const e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase");
    e &&
      (this.Fho = EffectUtil_1.EffectUtil.SpawnUiEffect(
        "RoleSystemFloorEffect",
        "[RoleRootView.LoadFloorEffect]",
        e.GetTransform(),
        new EffectContext_1.EffectContext(void 0, e),
      ));
  }
  GetRedDotName(e) {
    return e === "RoleAttributeTabView"
      ? "RoleAttributeTab"
      : e === "RoleResonanceTabNewView"
        ? "RoleResonanceTab"
        : e === "RolePhantomTabView"
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
    this.Eco(),
      (this.A6i = !1),
      this.R7t && ((this._co = !1), this.R7t.Stop(), (this.R7t = void 0)),
      UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
        UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
      ),
      (this.P6i = void 0);
  }
  OnHandleReleaseScene() {
    this.kLn();
  }
  OnAfterHide() {
    this.RoleListComponent.UnBindRedDot(),
      this.TabViewComponent.SetCurrentTabViewState(!1);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot(),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Role", 44, "角色界面关闭");
  }
  kLn() {
    this.NLn ||
      ((this.NLn = !0),
      EffectSystem_1.EffectSystem.IsValid(this.Fho) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.Fho,
          "[RoleRootView.HandleReleaseScene]",
          !1,
        ),
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.pco),
      (this.pco = void 0),
      UiSceneManager_1.UiSceneManager.ClearUiSequenceFrame(),
      ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0));
  }
  OnBeforeDestroyImplement() {
    this.kLn(),
      this.ClearData(),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Role", 44, "角色界面销毁");
  }
  ClearData() {
    this.TabViewComponent &&
      (this.TabViewComponent.DestroyTabViewComponent(),
      (this.TabViewComponent = void 0)),
      EffectSystem_1.EffectSystem.IsValid(this.Fho) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.Fho,
          "[RoleRootView.ClearData]",
          !0,
        ),
        (this.Fho = 0));
    for (const e of this.m5i.values()) e.SetShouldLatentDestroy(!0);
    this.m5i.clear(),
      (this._Ve = 0),
      (this.lco = 0),
      UiCameraManager_1.UiCameraManager.Get().DestroyUiCameraComponent(
        UiCameraControlRotationComponent_1.UiCameraControlRotationComponent,
      );
  }
}
exports.RoleRootView = RoleRootView;
// # sourceMappingURL=RoleRootView.js.map
