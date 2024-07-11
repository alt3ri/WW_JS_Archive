"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSelectSpecialItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
  RoguelikeSelectSpecialStarItem_1 = require("./RoguelikeSelectSpecialStarItem");
class RoguelikeSelectSpecialItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super(),
      (this.mho = void 0),
      (this.alo = void 0),
      (this.$be = void 0),
      (this.zbe = () =>
        new RoguelikeSelectSpecialStarItem_1.RoguelikeSelectSpecialStarItem()),
      (this.hlo = (e) => {
        this.alo && this.alo(this, this.mho);
      }),
      (this.alo = e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIExtendToggle],
      [10, UE.UINiagara],
      [11, UE.UINiagara],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[9, this.hlo]]);
  }
  OnBeforeShow() {
    this.$be = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(4),
      this.zbe,
    );
  }
  Refresh(e, i, t) {
    this.mho = e;
    var r =
      ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRoguelikeSpecialConfig(
        e.ConfigId,
      );
    if (void 0 !== r) {
      const o = this.GetTexture(1);
      o.SetUIActive(!1),
        this.SetTextureByPath(r.Icon, o, void 0, () => {
          o.SetUIActive(!0);
        });
      var s =
          0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
            ? r.BriefDescribe
            : r.Describe,
        s =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), s),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), r.Name),
          this.GetText(7)),
        s =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(
            s,
            "RogueSpecialRemainTime",
            e.RestCount,
          ),
          s.SetUIActive(0 !== e.RestCount),
          this.GetItem(12).SetUIActive(e.IsNew),
          0 < r.Level
            ? (this.GetItem(2).SetUIActive(!0),
              this.GetItem(3).SetUIActive(!1),
              this.Zbe(r.Level, r.MaxLevel))
            : (this.GetItem(2).SetUIActive(!1),
              this.GetItem(3).SetUIActive(!0)),
          e.IsValid
            ? (this.GetItem(8).SetUIActive(!1),
              this.GetTexture(0).SetAlpha(
                RoguelikeDefine_1.ROGUELIKE_SPECIAL_ITEM_UNLOCK_ALPHA,
              ))
            : (this.GetItem(8).SetUIActive(!0),
              this.GetTexture(0).SetAlpha(
                RoguelikeDefine_1.ROGUELIKE_SPECIAL_ITEM_LOCK_ALPHA,
              )),
          1 === r.Category ? "FFFFFF" : "FFC3CC"),
        e = 1 === r.Category ? "FFFFFF" : "FFEEF4";
      this.GetUiNiagara(10).SetColor(UE.Color.FromHex(s)),
        this.GetUiNiagara(11).SetColor(UE.Color.FromHex(e));
    }
  }
  Zbe(i, t) {
    var r = [];
    for (let e = 0; e < t; e++) {
      var s = i > e;
      r.push(s);
    }
    this.$be.RefreshByData(r);
  }
  SetSelect(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(9).SetToggleState(e);
  }
}
exports.RoguelikeSelectSpecialItem = RoguelikeSelectSpecialItem;
//# sourceMappingURL=RoguelikeSelectSpecialItem.js.map
