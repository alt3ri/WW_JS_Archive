"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RolePreviewAttributeTabView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const RoleController_1 = require("../RoleController");
const RoleFavorUtil_1 = require("../RoleFavor/RoleFavorUtil");
const RoleLevelUpSuccessAttributeView_1 = require("../RoleLevel/RoleLevelUpSuccessAttributeView");
const Log_1 = require("../../../../Core/Common/Log");
class RolePreviewAttributeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.RoleViewAgent = void 0),
      (this.RoleInstance = void 0),
      (this.Qft = void 0),
      (this.Yuo = (e) => {
        this.PlayMontageStartWithReLoop(), this.VC(e);
      }),
      (this.ndo = (e, t, i) => {
        const r = new RoleLevelUpSuccessAttributeView_1.RoleAttributeItem();
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
        : (this.Qft = new GenericLayoutNew_1.GenericLayoutNew(
            this.GetVerticalLayout(3),
            this.ndo,
          ));
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Yuo,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleSystemChangeRole,
      this.Yuo,
    );
  }
  OnBeforeShow() {
    this.PlayMontageStart();
    const e = this.RoleViewAgent.GetCurSelectRoleId();
    this.VC(e);
  }
  OnBeforeDestroy() {
    (this.RoleInstance = void 0),
      this.Qft?.ClearChildren(),
      (this.Qft = void 0);
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
      this.sdo(),
      this.ado(),
      this.hdo(),
      this.ldo();
  }
  ado() {
    var e = this.RoleInstance.GetElementInfo();
    var e =
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
  sdo() {
    this.GetText(0).SetText(this.RoleInstance.GetName());
  }
  hdo() {
    var e =
      ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(
        this.RoleInstance.GetRoleId(),
      );
    var t = this.RoleInstance.GetRoleConfig();
    const i = [];
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(
      t.WeaponType,
    );
    var e =
      (i.push({ Name: "Text_Weapon_Text", CurText: t }),
      e &&
        ((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Sex)),
        i.push({ Name: "PrefabTextItem_3159729083_Text", CurText: t }),
        (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Country)),
        i.push({ Name: "PrefabTextItem_3969856612_Text", CurText: t }),
        (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Influence)),
        i.push({ Name: "PrefabTextItem_152395022_Text", CurText: t })),
      RoleFavorUtil_1.RoleFavorUtil.GetCurLanguageCvName(
        this.RoleInstance.GetRoleId(),
      ));
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    i.push({ Name: "Text_CharacterVoice_Text", CurText: t });
    let r = !0;
    for (const o of i) (o.ShowArrow = !1), (r = !(o.InnerShowBg = r));
    this.Qft?.RebuildLayoutByDataNew(i);
  }
  ldo() {
    const e = this.RoleInstance.GetRoleConfig();
    this.GetText(4).ShowTextNew(e.Introduction);
  }
}
exports.RolePreviewAttributeTabView = RolePreviewAttributeTabView;
// # sourceMappingURL=RolePreviewAttributeTabView.js.map
