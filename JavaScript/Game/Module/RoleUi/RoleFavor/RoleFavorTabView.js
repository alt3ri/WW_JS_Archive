"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorTabView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../../NewWorld/Character/Common/CharacterNameDefines");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleController_1 = require("../RoleController");
const RoleFavorDefine_1 = require("./RoleFavorDefine");
class RoleFavorTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.plo = void 0),
      (this.bl = () => {
        var e = this.plo.GetCurSelectRoleId();
        var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
        var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
        var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
        let t = this.GetText(1);
        const o = this.GetText(2);
        var a = this.GetText(0);
        var e = e.PartyId !== 9;
        var e =
          (t.SetUIActive(e),
          o.SetUIActive(e),
          this.GetButton(6).RootUIComp.SetUIActive(e),
          this.GetButton(3).RootUIComp.SetUIActive(e),
          e ? a.SetText(r) : a.SetText(i.GetName()),
          i.GetFavorData());
        var r = e.GetFavorLevel();
        var a =
          (LguiUtil_1.LguiUtil.SetLocalText(t, "FavorLevel", r),
          ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorLevelConfig(r));
        var i = e.GetFavorExp();
        a
          ? LguiUtil_1.LguiUtil.SetLocalText(o, "RoleExp", i, a.LevelUpExp)
          : ((t =
              ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorLevelConfig(
                r - 1,
              ).LevelUpExp),
            LguiUtil_1.LguiUtil.SetLocalText(o, "RoleExp", t, t)),
          this.BNe();
      }),
      (this.BNe = () => {
        const e = this.plo.GetCurSelectRoleData().GetFavorData();
        this.GetItem(7).SetUIActive(e.IsFavorItemCanUnlock(1)),
          this.GetItem(8).SetUIActive(e.IsFavorItemCanUnlock(0)),
          this.GetItem(9).SetUIActive(e.IsFavorItemCanUnlock(2)),
          this.GetItem(10).SetUIActive(e.IsFavorItemCanUnlock(3));
      }),
      (this.OnClickExperienceButton = () => {
        const e = this.plo.GetCurSelectRoleId();
        let i =
          ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
            e,
          );
        i
          ? ((i = new RoleFavorDefine_1.ContentItemData(1, e, i, 1)),
            UiManager_1.UiManager.OpenView("RoleFavorInfoView", i))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Role",
              44,
              "该角色的好感度配置FavorRoleInfo找不到！！！",
              ["角色Id", e],
            );
      }),
      (this.OnClickVoiceButton = () => {
        let e = this.BuildContentItemData(0, 1);
        e.Config
          ? UiManager_1.UiManager.OpenView("RoleFavorInfoView", e)
          : ((e = this.plo.GetCurSelectRoleId()),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Role",
                44,
                "该角色的好感度配置FavorWord找不到！！！",
                ["角色Id", e],
              ));
      }),
      (this.OnClickActionButton = () => {
        let e = this.BuildContentItemData(2, 1);
        e.Config
          ? UiManager_1.UiManager.OpenView("RoleFavorInfoView", e)
          : ((e = this.plo.GetCurSelectRoleId()),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Role",
                44,
                "该角色的好感度配置Motion找不到！！！",
                ["角色Id", e],
              ));
      }),
      (this.OnClickPreciousItemButton = () => {
        let e = this.BuildContentItemData(3, void 0);
        e.Config
          ? UiManager_1.UiManager.OpenView("RoleFavorInfoView", e)
          : ((e = this.plo.GetCurSelectRoleId()),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Role",
                44,
                "该角色的好感度配置FavorGoods找不到！！！",
                ["角色Id", e],
              ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.OnClickExperienceButton],
        [4, this.OnClickVoiceButton],
        [5, this.OnClickActionButton],
        [6, this.OnClickPreciousItemButton],
      ]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateRoleFavorData,
      this.bl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.bl,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateRoleFavorData,
      this.bl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.bl,
      );
  }
  OnStart() {
    (this.plo = this.ExtraParams),
      void 0 === this.plo
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleFavorTabView",
          ])
        : RoleController_1.RoleController.SendRoleFavorListRequest();
  }
  OnBeforeShow() {
    this.PlayMontageStart(), this.BNe();
    const e = this.L_o();
    e && e.Montage_Stop(0), this.bl();
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(13);
  }
  D_o() {
    let e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      e = e.Model?.CheckGetComponent(1)?.MainMeshComponent;
      if (e) return e;
    }
  }
  L_o() {
    const e = this.D_o();
    if (e)
      return e
        .GetAnimInstance()
        .GetLinkedAnimGraphInstanceByTag(
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
        );
  }
  BuildContentItemData(e, i) {
    const r = this.plo.GetCurSelectRoleId();
    const t = this.GetConfigByFavorTabType(e);
    return new RoleFavorDefine_1.ContentItemData(e, r, t, i);
  }
  GetConfigByFavorTabType(e) {
    const i = this.plo.GetCurSelectRoleId();
    let r = void 0;
    switch (e) {
      case 2:
        r = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
          i,
          1,
        )[0];
        break;
      case 1:
        r =
          ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
            i,
          );
        break;
      case 3:
        r =
          ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorGoodsConfig(
            i,
          )[0];
        break;
      case 0:
        r = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
          i,
          1,
        )[0];
    }
    return r;
  }
}
exports.RoleFavorTabView = RoleFavorTabView;
// # sourceMappingURL=RoleFavorTabView.js.map
