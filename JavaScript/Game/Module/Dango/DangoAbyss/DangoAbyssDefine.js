"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.iconSizeBySlotType =
    exports.EquipViewAttributeData =
    exports.ROLE_ATTRIBUTE_LENGTH =
    exports.RECOVERY_NEEDS_COUNT =
    exports.TEXT_RECOVERY_TIMES =
    exports.TEXT_RECOVERY_SELECT =
    exports.TEXT_PLUGIN_COUNT =
    exports.TEXT_DANGO_LEVEL =
    exports.TEXT_EQUIP_REPEAT =
    exports.TEXT_EQUIP_SAME =
    exports.TEXT_EQUIP_ERROR_DANGO =
    exports.textPluginType =
    exports.textSlotType =
    exports.DangoAbyssTagData =
    exports.CURRENCY_ITEM_KEY_ID =
    exports.CURRENCY_ITEM_TOKEN_ID =
    exports.CURRENCY_ITEM_EXP_ID =
    exports.SLOT_COUNT =
    exports.DangoListRoleData =
    exports.BADDANGOID =
      void 0),
  (exports.BADDANGOID = 999);
class DangoListRoleData {
  constructor() {
    (this.Id = 0), (this.Data = void 0), (this.OnClickCallBack = () => {});
  }
}
(exports.DangoListRoleData = DangoListRoleData),
  (exports.SLOT_COUNT = 9),
  (exports.CURRENCY_ITEM_EXP_ID = 80200001),
  (exports.CURRENCY_ITEM_TOKEN_ID = 80200002),
  (exports.CURRENCY_ITEM_KEY_ID = 80200003);
class DangoAbyssTagData {
  constructor() {
    (this.TagId = 0), (this.Value = 0);
  }
}
(exports.DangoAbyssTagData = DangoAbyssTagData),
  (exports.textSlotType = new Map([
    [0, "Text_NormalPlugin_Text"],
    [1, "Text_CorePlugin_Text"],
    [2, "Text_PassivePlugin_Text"],
  ])),
  (exports.textPluginType = new Map([
    [0, "Text_NormalPluginType_Text"],
    [1, "Text_CorePluginType_Text"],
    [2, "Text_PassivePluginType_Text"],
  ])),
  (exports.TEXT_EQUIP_ERROR_DANGO = "Text_DangoEquipErrorDango_Text"),
  (exports.TEXT_EQUIP_SAME = "Text_DangoEquipSame_Text"),
  (exports.TEXT_EQUIP_REPEAT = "Text_DangoEquipRepeat_Text"),
  (exports.TEXT_DANGO_LEVEL = "Text_DangoLevel_Text"),
  (exports.TEXT_PLUGIN_COUNT = "Text_DangoPluginCount_Text"),
  (exports.TEXT_RECOVERY_SELECT = "Text_RecoverySelect_Text"),
  (exports.TEXT_RECOVERY_TIMES = "Text_RecoveryTimes_Text"),
  (exports.RECOVERY_NEEDS_COUNT = 1),
  (exports.ROLE_ATTRIBUTE_LENGTH = 6);
class EquipViewAttributeData {
  constructor() {
    (this.IsValid = !1),
      (this.Attribute = void 0),
      (this.Tag = void 0),
      (this.IsChange = !1);
  }
}
(exports.EquipViewAttributeData = EquipViewAttributeData),
  (exports.iconSizeBySlotType = new Map([
    [0, 64],
    [1, 96],
    [2, 87],
  ]));
//# sourceMappingURL=DangoAbyssDefine.js.map
