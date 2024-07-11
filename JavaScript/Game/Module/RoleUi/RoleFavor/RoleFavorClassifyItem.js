"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorClassifyItem = exports.initContentItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoleFavorContentItem_1 = require("./RoleFavorContentItem"),
  RoleFavorDefine_1 = require("./RoleFavorDefine"),
  RoleFavorUtil_1 = require("./RoleFavorUtil"),
  initContentItem = (e, t, i) => {
    return {
      Key: i,
      Value: new RoleFavorContentItem_1.RoleFavorContentItem(e, t),
    };
  };
exports.initContentItem = initContentItem;
class RoleFavorClassifyItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.ContentGenericLayout = void 0),
      (this.u_o = []),
      (this.c_o = () => {
        this.u_o = this.m_o();
      }),
      (this.d_o = e),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(e, this.d_o.TitleTableId),
      this.c_o(),
      (this.ContentGenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(0),
        exports.initContentItem,
      )),
      this.ContentGenericLayout.RebuildLayoutByDataNew(this.u_o);
  }
  OnBeforeDestroy() {
    (this.d_o = void 0), (this.u_o = []);
  }
  m_o() {
    if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(this.d_o)) return this.C_o();
    var t = [],
      i = this.d_o.RoleId,
      r = this.d_o.TypeParam,
      a = this.d_o.FavorTabType;
    let o = void 0;
    switch (this.d_o.FavorTabType) {
      case 2:
        o = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
          i,
          r,
        );
        break;
      case 1:
        o =
          ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorStoryConfig(i);
        break;
      case 3:
        o =
          ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorGoodsConfig(i);
        break;
      case 0:
        o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
          i,
          r,
        );
    }
    var n = o.length;
    for (let e = 0; e < n; e++) {
      var s = o[e],
        s = new RoleFavorDefine_1.ContentItemData(a, i, s, r);
      t.push(s);
    }
    return t;
  }
  C_o() {
    var e = [],
      t = this.g_o(1),
      i = this.g_o(2);
    return e.push(t, i), e;
  }
  g_o(e) {
    var t = this.d_o.RoleId,
      i =
        ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(t);
    return new RoleFavorDefine_1.ContentItemData(1, t, i, e);
  }
}
exports.RoleFavorClassifyItem = RoleFavorClassifyItem;
//# sourceMappingURL=RoleFavorClassifyItem.js.map
