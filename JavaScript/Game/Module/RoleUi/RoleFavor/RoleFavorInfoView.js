"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorInfoView = exports.initClassifyItem = void 0);
const UE = require("ue"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  MenuController_1 = require("../../Menu/MenuController"),
  MotionController_1 = require("../../Motion/MotionController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoleController_1 = require("../RoleController"),
  RoleFavorBaseInfoComponent_1 = require("./RoleFavorBaseInfoComponent"),
  RoleFavorClassifyItem_1 = require("./RoleFavorClassifyItem"),
  RoleFavorDefine_1 = require("./RoleFavorDefine"),
  RoleFavorDescComponent_1 = require("./RoleFavorDescComponent"),
  RoleFavorLockComponent_1 = require("./RoleFavorLockComponent"),
  RoleFavorPowerInfoComponent_1 = require("./RoleFavorPowerInfoComponent"),
  RoleFavorPreciousItemComponent_1 = require("./RoleFavorPreciousItemComponent"),
  RoleFavorUtil_1 = require("./RoleFavorUtil"),
  initClassifyItem = (e, i, t) => {
    return {
      Key: t,
      Value: new RoleFavorClassifyItem_1.RoleFavorClassifyItem(e, i),
    };
  };
exports.initClassifyItem = initClassifyItem;
class RoleFavorInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.j1o = void 0),
      (this.p1o = []),
      (this.W1o = []),
      (this.K1o = void 0),
      (this.Q1o = void 0),
      (this.X1o = void 0),
      (this.$1o = void 0),
      (this.$zt = 1),
      (this.Y1o = void 0),
      (this.J1o = void 0),
      (this.z1o = void 0),
      (this.Z1o = void 0),
      (this.e_o = void 0),
      (this.t_o = new AudioController_1.PlayResult()),
      (this.i_o = () => {
        this.GetItem(5).SetUIActive(!1),
          this.GetItem(6).SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!1),
          this.GetItem(9).SetUIActive(!1);
      }),
      (this.o_o = () => {
        var i = this.W1o.length;
        for (let e = 0; e < i; e++) {
          var t = this.W1o[e];
          RoleFavorUtil_1.RoleFavorUtil.IsSameContentItemData(
            this.K1o,
            t.ContentItemData,
          )
            ? (t.SetToggleState(1), t.SetButtonActive(!0), (this.Q1o = t))
            : (t.SetToggleState(0), t.SetButtonActive(!1));
        }
      }),
      (this.I4t = () => {
        this.CloseMe();
      }),
      (this.bl = () => {
        this.ILt(),
          this.r_o(),
          this.ClearVerticalLayout(),
          (this.j1o = new GenericLayoutNew_1.GenericLayoutNew(
            this.GetVerticalLayout(1),
            exports.initClassifyItem,
          )),
          this.j1o.RebuildLayoutByDataNew(this.p1o),
          this.n_o(),
          this.i_o(),
          this.o_o(),
          this.K1o ? this.ShowItemByData(this.K1o) : this.ShowDefaultItem();
      }),
      (this.ILt = () => {
        let e = void 0;
        var i = this.GetText(3);
        switch (this.K1o.FavorTabType) {
          case 2:
            e = "FavorAction";
            break;
          case 1:
            e = "FavorExperience";
            break;
          case 3:
            e = "FavorPreciousItem";
            break;
          case 0:
            e = "FavorVoice";
        }
        LguiUtil_1.LguiUtil.SetLocalText(i, e);
      }),
      (this.r_o = () => {
        switch (this.K1o.FavorTabType) {
          case 2:
            this.p1o = this.s_o();
            break;
          case 1:
            this.p1o = this.a_o();
            break;
          case 3:
            this.p1o = this.h_o();
            break;
          case 0:
            this.p1o = this.l_o();
        }
      }),
      (this.s_o = () => {
        var e = [],
          i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            this.K1o.RoleId,
          ).GetRoleId(),
          t = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
            i,
            1,
          ),
          o = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
            i,
            2,
          );
        return (
          t &&
            0 < t.length &&
            ((t = new RoleFavorDefine_1.ClassifyItemData(
              "FavorIdleAction",
              2,
              i,
              1,
            )),
            e.push(t)),
          o &&
            0 < o.length &&
            ((t = new RoleFavorDefine_1.ClassifyItemData(
              "FavorFightAction",
              2,
              i,
              2,
            )),
            e.push(t)),
          e
        );
      }),
      (this.a_o = () => {
        var e = [],
          i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            this.K1o.RoleId,
          ).GetRoleId(),
          t = new RoleFavorDefine_1.ClassifyItemData("FavorRoleInfo", 1, i, 1),
          i = new RoleFavorDefine_1.ClassifyItemData("FavorRoleStory", 1, i, 3);
        return e.push(t, i), e;
      }),
      (this.h_o = () => {
        var e = [],
          i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            this.K1o.RoleId,
          ).GetRoleId(),
          i = new RoleFavorDefine_1.ClassifyItemData(
            "FavorPreciousItem",
            3,
            i,
            void 0,
          );
        return e.push(i), e;
      }),
      (this.l_o = () => {
        var e = [],
          i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            this.K1o.RoleId,
          ).GetRoleId(),
          t = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
            i,
            1,
          ),
          o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
            i,
            2,
          );
        return (
          t &&
            0 < t.length &&
            ((t = new RoleFavorDefine_1.ClassifyItemData(
              "FavorNatureVoice",
              0,
              i,
              1,
            )),
            e.push(t)),
          o &&
            0 < o.length &&
            ((t = new RoleFavorDefine_1.ClassifyItemData(
              "FavorFightVoice",
              0,
              i,
              2,
            )),
            e.push(t)),
          e
        );
      }),
      (this.n_o = () => {
        for (const e of this.j1o.GetLayoutItemList())
          for (const i of e.ContentGenericLayout.GetLayoutItemList())
            i.SetToggleFunction(this.U4e),
              i.SetButtonFunction(this.Qyt),
              this.W1o.push(i);
      }),
      (this.U4e = (e, i, t) => {
        e &&
          (this.i_o(),
          (this.K1o = i),
          (this.X1o = this.Q1o),
          this.o_o(),
          this.OnToggleClick(t, this.K1o));
      }),
      (this.Qyt = (e, i) => {
        var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            this.K1o.RoleId,
          ),
          o = t.GetFavorData();
        let r = 0;
        (r =
          2 === e.FavorTabType
            ? ((t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
                t.GetRoleId(),
                e.Config.Id,
              )),
              Number(t))
            : o.GetFavorItemState(e.Config.Id, e.FavorTabType)),
          (!RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(e) && 2 !== r) ||
            (0 === e.FavorTabType
              ? this.PlayVoice(i)
              : 2 === e.FavorTabType && this.__o(i));
      }),
      (this.u_o = (e, i) => {
        if (e === this.K1o.RoleId) {
          for (const t of this.W1o)
            t.ContentItemData.Config.Id === i &&
              (t.Refresh(), this.U4e(!0, t.ContentItemData, t));
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "30001",
          );
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIDraggableComponent],
      [11, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.I4t]]);
  }
  OnStart() {
    (this.K1o = this.OpenParam), this.bl();
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
      ?.Model?.CheckGetComponent(1)
      ?.SetTransformByTag("RoleCase");
  }
  OnBeforeShow() {
    this.K1o &&
      3 === this.K1o.FavorTabType &&
      UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.SetActorHiddenInGame(
        !0,
      );
  }
  OnAfterHide() {
    this.K1o &&
      3 === this.K1o.FavorTabType &&
      UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.SetActorHiddenInGame(
        !1,
      );
  }
  ClearVerticalLayout() {
    this.j1o && (this.j1o.ClearChildren(), (this.j1o = void 0));
  }
  OnBeforeDestroy() {
    this.Y1o && (this.Y1o.Destroy(), (this.Y1o = void 0)),
      this.J1o && (this.J1o.Destroy(), (this.J1o = void 0)),
      this.z1o && (this.z1o.Destroy(), (this.z1o = void 0)),
      this.Z1o && (this.Z1o.Destroy(), (this.Z1o = void 0)),
      this.e_o && (this.e_o.Destroy(), (this.e_o = void 0)),
      this.ClearVerticalLayout(),
      (this.p1o = []),
      (this.K1o = void 0),
      AudioController_1.AudioController.StopEvent(this.t_o);
  }
  OnToggleClick(e, i) {
    var t = this.GetItemState(i);
    if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(i) || 2 === t)
      switch (i.FavorTabType) {
        case 2:
          this.ShowActionItem(), this.__o(e);
          break;
        case 1:
          this.ShowExperienceItem();
          break;
        case 3:
          this.ShowPreciousItem();
          break;
        case 0:
          this.ShowVoiceItem(), this.PlayVoice(e);
      }
    else this.HandleLockItemData();
  }
  HandleLockItemData() {
    var e = this.K1o.Config.Id,
      i = this.K1o.FavorTabType;
    let t = void 0;
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        this.K1o.RoleId,
      ),
      r = o.GetFavorData();
    if (1 === i) t = Protocol_1.Aki.Protocol.dks.Proto_Story;
    else {
      if (2 === i)
        return (
          this.X1o && this.ClearRoleMontage(this.X1o),
          (s = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
            o.GetRoleId(),
            e,
          )),
          void (1 === (s = Number(s))
            ? MotionController_1.MotionController.RequestUnlockMotion(
                o.GetRoleId(),
                e,
              )
            : 0 === s && this.ShowLockItem())
        );
      3 === i
        ? (t = Protocol_1.Aki.Protocol.dks.Proto_Goods)
        : 0 === i &&
          ((t = Protocol_1.Aki.Protocol.dks.I3n), this.X1o) &&
          this.ClearAudio(this.X1o);
    }
    var s = r.GetFavorItemState(this.K1o.Config.Id, i);
    1 === s
      ? RoleController_1.RoleController.SendRoleFavorUnLockRequest(
          t,
          o.GetRoleId(),
          e,
        )
      : 0 === s && this.ShowLockItem();
  }
  ClearAudio(e) {
    AudioController_1.AudioController.StopEvent(this.t_o), e.EndPlay();
  }
  ClearRoleMontage(e) {
    var i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    i &&
      ((i = i.Model),
      UiModelUtil_1.UiModelUtil.SetVisible(i, !0),
      (i = i.CheckGetComponent(1)?.MainMeshComponent)) &&
      ((i = i
        .GetAnimInstance()
        .GetLinkedAnimGraphInstanceByTag(
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
        )).StopSlotAnimation(),
      e.OnMontageCompleted && i.OnMontageEnded.Remove(e.OnMontageCompleted),
      e.EndPlay());
  }
  ShowDefaultItem() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        this.K1o.RoleId,
      ).GetRoleId(),
      i =
        ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(e),
      e = new RoleFavorDefine_1.ContentItemData(1, e, i, 1);
    this.ShowItemByData(e);
  }
  GetItemState(e) {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        this.K1o.RoleId,
      ),
      t = i.GetFavorData();
    let o = 0;
    return (o =
      2 === e.FavorTabType
        ? ((i = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
            i.GetRoleId(),
            e.Config.Id,
          )),
          Number(i))
        : t.GetFavorItemState(e.Config.Id, e.FavorTabType));
  }
  ShowItemByData(e) {
    this.i_o();
    var i = this.GetItemState(e);
    if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(e) || 2 === i)
      switch (e.FavorTabType) {
        case 2:
          this.ShowActionItem();
          break;
        case 1:
          this.ShowExperienceItem();
          break;
        case 3:
          this.ShowPreciousItem();
          break;
        case 0:
          this.ShowVoiceItem();
      }
    else this.HandleLockItemData();
  }
  ShowActionItem() {
    var e = this.GetItem(6),
      i =
        (e.SetUIActive(!0), this.GetText(11)?.SetUIActive(!1), this.K1o.Config),
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title);
    let o = StringUtils_1.EMPTY_STRING;
    i.Content !== StringUtils_1.EMPTY_STRING &&
      (o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Content));
    i = new RoleFavorDefine_1.RoleFavorDescComponentData(t, o);
    this.Y1o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, i);
  }
  ShowExperienceItem() {
    this.GetText(11)?.SetUIActive(!1);
    var e = this.K1o.TypeParam;
    1 === e
      ? this.ShowBaseInfoItem()
      : 2 === e
        ? this.ShowRolePowerFileItem()
        : 3 === e && this.ShowRoleExperienceItem();
  }
  ShowBaseInfoItem() {
    var e = this.GetItem(7);
    e.SetUIActive(!0),
      (this.J1o = new RoleFavorBaseInfoComponent_1.RoleFavorBaseInfoComponent(
        e,
        this.K1o.RoleId,
      ));
  }
  ShowRolePowerFileItem() {
    var e = this.GetItem(8);
    e.SetUIActive(!0),
      (this.z1o = new RoleFavorPowerInfoComponent_1.RoleFavorPowerInfoComponent(
        e,
        this.K1o.Config,
      ));
  }
  ShowRoleExperienceItem() {
    var e = this.GetItem(6),
      i = (e.SetUIActive(!0), this.K1o.Config),
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title),
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Content),
      t = new RoleFavorDefine_1.RoleFavorDescComponentData(t, i);
    this.Y1o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, t);
  }
  ShowPreciousItem() {
    this.GetText(11)?.SetUIActive(!1);
    var e = this.GetItem(9),
      i = (e.SetUIActive(!0), this.GetItem(6)),
      t = (i.SetUIActive(!0), this.K1o.Config),
      o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title),
      r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Content),
      o = new RoleFavorDefine_1.RoleFavorDescComponentData(o, r);
    (this.Y1o = new RoleFavorDescComponent_1.RoleFavorDescComponent(i, o)),
      (this.Z1o =
        new RoleFavorPreciousItemComponent_1.RoleFavorPreciousItemComponent(
          e,
          t,
          !1,
        ));
  }
  ShowVoiceItem() {
    var e = this.GetItem(6),
      i = (e.SetUIActive(!0), this.K1o.Config),
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title),
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Content),
      o = RoleFavorUtil_1.RoleFavorUtil.GetCurLanguageCvName(this.K1o.RoleId),
      r = this.GetText(11),
      r =
        (o === StringUtils_1.EMPTY_STRING
          ? r?.SetUIActive(!1)
          : (r?.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(r, o)),
        new RoleFavorDefine_1.RoleFavorDescComponentData(t, i));
    this.Y1o = new RoleFavorDescComponent_1.RoleFavorDescComponent(e, r);
  }
  ShowLockItem() {
    this.i_o();
    var e,
      i = this.GetItem(5);
    i.SetUIActive(!0),
      this.e_o
        ? this.e_o.Refresh(this.K1o)
        : (this.e_o = new RoleFavorLockComponent_1.RoleFavorLockComponent(
            i,
            this.K1o,
          )),
      3 === this.K1o.FavorTabType &&
        ((i = this.K1o.Config),
        (e = this.GetItem(9)).SetUIActive(!0),
        this.Z1o
          ? this.Z1o.Refresh(i, !0)
          : (this.Z1o =
              new RoleFavorPreciousItemComponent_1.RoleFavorPreciousItemComponent(
                e,
                i,
                !0,
              )));
  }
  PlayVoice(i) {
    if (0 === i.GetCurVoiceState())
      this.ClearAudio(i),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Role", 44, "关闭当前选项正在播放的语音");
    else {
      this.X1o &&
        0 === this.X1o.GetCurVoiceState() &&
        (this.ClearAudio(this.X1o), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Role", 44, "关闭上个选项播放的语音");
      var e = MenuController_1.MenuController.GetTargetConfig(1),
        t = MenuController_1.MenuController.GetTargetConfig(2);
      if (0 === e || 0 === t)
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "FavorVolume",
        );
      else {
        e = this.K1o.Config;
        if (
          ((this.$1o = e.Voice),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Role", 44, "播放当前点击的语音", [
              "this.VoicePath",
              this.$1o,
            ]),
          "" === this.$1o)
        )
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Role", 44, "配置的语音路径为空", [
              "this.VoicePath",
              this.$1o,
            ]);
        else {
          const o = this.$1o,
            r = this.t_o,
            s = this.$zt;
          AudioController_1.AudioController.LoadAndAddCallback(
            this.$1o,
            function e() {
              i.StartPlay(),
                AudioController_1.AudioController.PostEventByUi(
                  o,
                  r,
                  s,
                  i.CloseAudioDelegate,
                );
            },
            this.t_o,
          );
        }
      }
    }
  }
  __o(t) {
    var e = this.K1o.Config;
    0 === t.GetCurVoiceState()
      ? this.ClearRoleMontage(t)
      : (this.X1o &&
          0 === this.X1o.GetCurVoiceState() &&
          this.ClearRoleMontage(this.X1o),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          e.AniMontage,
          UE.AnimMontage,
          (e) => {
            var i;
            e?.IsValid() &&
              (i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()) &&
              ((i = i.Model),
              UiModelUtil_1.UiModelUtil.SetVisible(i, !0),
              (i = i.CheckGetComponent(1)?.MainMeshComponent)) &&
              (t.StartPlay(),
              (i = i
                .GetAnimInstance()
                .GetLinkedAnimGraphInstanceByTag(
                  CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
                )).Montage_Play(e),
              i.OnMontageEnded.Add(t.OnMontageCompleted));
          },
        ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UnLockRoleFavorItem,
      this.u_o,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UnLockRoleFavorItem,
      this.u_o,
    );
  }
}
exports.RoleFavorInfoView = RoleFavorInfoView;
//# sourceMappingURL=RoleFavorInfoView.js.map
