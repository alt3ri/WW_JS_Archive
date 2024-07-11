"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookQuestChildItem = void 0);
const UE = require("ue"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine");
class HandBookQuestChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.kzt = void 0),
      (this.LZt = 0),
      (this.mZt = () => {
        var e = this.kzt?.Config;
        e.QuestId ? this.tPn(e.Type) : this.qAn(e.Type);
      }),
      (this.aZt = (e, t) => e.Id - t.Id);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UITexture],
      [3, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[3, this.mZt]]);
  }
  Refresh(e, t, i) {
    this.SetUiActive(!1), (this.kzt = e), (this.LZt = i);
    var i = this.kzt.Config,
      r = e.IsNew,
      e = e.IsLock,
      o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.SetTextureByPath(
      1 === o ? i.MaleTexture : i.FemaleTexture,
      this.GetTexture(0),
      void 0,
      () => {
        this.SetUiActive(!0);
      },
    ),
      this.GetText(1).ShowTextNew(i.Name),
      this.GetItem(2).SetUIActive(r),
      this.GetTexture(0).SetUIActive(!e),
      this.GetTog()?.SetEnable(!e),
      i.AreaIcon || i.AreaNumber
        ? (this.GetItem(4)?.SetUIActive(!0),
          this.SetSpriteByPath(i.AreaIcon, this.GetSprite(6), !1),
          this.SetTextureByPath(i.AreaNumber, this.GetTexture(7)))
        : this.GetItem(4)?.SetUIActive(!1),
      i.RoleName
        ? (this.GetText(5)?.SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.RoleName))
        : this.GetText(5)?.SetUIActive(!1);
  }
  GetData() {
    return this.kzt;
  }
  SetNewState(e) {
    this.GetItem(2).SetUIActive(e);
  }
  SetToggleState(e) {
    this.GetExtendToggle(3).SetToggleStateForce(e, !1, !0),
      1 === e && this.dZt();
  }
  dZt() {
    var e, t;
    this.kzt.IsNew &&
      ((t = (e = this.kzt.Config).Type),
      (t =
        ConfigManager_1.ConfigManager.HandBookConfig?.GetPlotTypeConfig(
          t,
        )?.Type),
      HandBookController_1.HandBookController.SendIllustratedReadRequest(
        t,
        e.Id,
      ));
  }
  OnBeforeDestroy() {
    this.kzt = void 0;
  }
  GetTog() {
    return this.GetExtendToggle(3);
  }
  GetIsUnlock() {
    return !!this.kzt && !this.kzt.IsLock;
  }
  qAn(e) {
    this.dZt();
    var t = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
          e,
        ),
      ),
      i =
        (t.sort(this.aZt),
        ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(e)),
      r = t.length,
      o = [],
      n = [],
      a = [],
      s = [],
      h = [],
      g = [];
    for (let e = 0; e < r; e++) {
      var _,
        l = t[e],
        u = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, l.Id);
      u &&
        ((_ = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
        o.push(1 === _ ? l.MaleTexture : l.FemaleTexture),
        h.push(u.CreateTime),
        n.push(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l.Descrtption),
        ),
        a.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l.Name)),
        s.push(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            i.TypeDescription,
          ),
        ),
        g.push(l.Id));
    }
    e = new HandBookDefine_1.HandBookPhotoData();
    (e.DescrtptionText = n),
      (e.TypeText = s),
      (e.NameText = a),
      (e.HandBookType = 7),
      (e.Index = this.LZt),
      (e.TextureList = o),
      (e.DateText = h),
      (e.ConfigId = g),
      UiManager_1.UiManager.OpenView("HandBookPhotoView", e);
  }
  tPn(e) {
    this.dZt();
    var t = this.kzt?.Config.QuestId,
      i = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
          e,
        ),
      ),
      r =
        (i?.sort((e, t) => e.Id - t.Id),
        ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(e)),
      o = i.length,
      n = [],
      a = new HandBookDefine_1.HandBookQuestViewOpenParam();
    for (let e = 0; e < o; e++) {
      var s = i[e];
      ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(r.Type, s.Id) &&
        (n.push(s.Id), t === s.QuestId) &&
        (a.Index = n.indexOf(s.Id));
    }
    (a.ConfigIdList = n),
      UiManager_1.UiManager.OpenView("HandBookQuestPlotView", a);
  }
}
exports.HandBookQuestChildItem = HandBookQuestChildItem;
//# sourceMappingURL=HandBookQuestChildItem.js.map
