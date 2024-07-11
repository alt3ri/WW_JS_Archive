"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RolePreviewAttributeTabView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  RoleController_1 = require("../RoleController"),
  RoleFavorUtil_1 = require("../RoleFavor/RoleFavorUtil"),
  RoleLevelUpSuccessAttributeView_1 = require("../RoleLevel/RoleLevelUpSuccessAttributeView");
class RolePreviewAttributeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.RoleViewAgent = void 0),
      (this.RoleInstance = void 0),
      (this.nvt = void 0),
      (this.Kco = (e) => {
        this.PlayMontageStartWithReLoop(), this.VC(e);
      }),
      (this.iCo = (e, t, i) => {
        var r = new RoleLevelUpSuccessAttributeView_1.RoleAttributeItem();
        return (
          r.SetRootActor(t.GetOwner(), !0), r.Refresh(e), { Key: i, Value: r }
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIText],
    ];
  }
  OnStart() {
    (this.RoleViewAgent = this.ExtraParams),
      void 0 === this.RoleViewAgent
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RolePreviewAttributeTabView",
          ])
        : (this.nvt = new GenericLayoutNew_1.GenericLayoutNew(
            this.GetVerticalLayout(3),
            this.iCo,
          ));
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Kco,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Kco,
    );
  }
  OnBeforeShow() {
    this.PlayMontageStart();
    var e = this.RoleViewAgent.GetCurSelectRoleId();
    this.VC(e);
  }
  OnBeforeDestroy() {
    (this.RoleInstance = void 0),
      this.nvt?.ClearChildren(),
      (this.nvt = void 0);
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(3);
  }
  PlayMontageStartWithReLoop() {
    RoleController_1.RoleController.PlayRoleMontage(3, !1, !0, !1);
  }
  VC(e) {
    (this.RoleInstance =
      ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
      this.oCo(),
      this.rCo(),
      this.nCo(),
      this.sCo();
  }
  rCo() {
    var e = this.RoleInstance.GetElementInfo(),
      e =
        (this.SetElementIcon(
          e.Icon,
          this.GetTexture(1),
          this.RoleInstance.GetRoleConfig().ElementId,
        ),
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(
          e.Name,
        ));
    this.GetText(2).SetText(e);
  }
  oCo() {
    this.GetText(0).SetText(this.RoleInstance.GetName());
  }
  nCo() {
    var e =
        ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
          this.RoleInstance.GetRoleId(),
        ),
      t = this.RoleInstance.GetRoleConfig(),
      i = [],
      t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
        t.WeaponType,
      ),
      e =
        (i.push({ Name: "Text_Weapon_Text", CurText: t }),
        e &&
          ((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Sex)),
          i.push({ Name: "PrefabTextItem_3159729083_Text", CurText: t }),
          (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Country)),
          i.push({ Name: "PrefabTextItem_3969856612_Text", CurText: t }),
          (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            e.Influence,
          )),
          i.push({ Name: "PrefabTextItem_152395022_Text", CurText: t })),
        RoleFavorUtil_1.RoleFavorUtil.GetCurLanguageCvName(
          this.RoleInstance.GetRoleId(),
        )),
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    i.push({ Name: "Text_CharacterVoice_Text", CurText: t });
    let r = !0;
    for (const o of i) (o.ShowArrow = !1), (r = !(o.InnerShowBg = r));
    this.nvt?.RebuildLayoutByDataNew(i);
  }
  sCo() {
    var e = this.RoleInstance.GetRoleConfig();
    this.GetText(4).ShowTextNew(e.Introduction);
  }
}
exports.RolePreviewAttributeTabView = RolePreviewAttributeTabView;
//# sourceMappingURL=RolePreviewAttributeTabView.js.map
