"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookQuestChildItem = void 0);
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
class HandBookQuestChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.kzt = void 0),
      (this.LZt = 0),
      (this.mZt = () => {
        const e = this.kzt?.Config;
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
    var i = this.kzt.Config;
    const r = e.IsNew;
    var e = e.IsLock;
    const o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.SetTextureByPath(
      o === 1 ? i.MaleTexture : i.FemaleTexture,
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
      e === 1 && this.dZt();
  }
  dZt() {
    let e, t;
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
    const t = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
        e,
      ),
    );
    const i =
      (t.sort(this.aZt),
      ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(e));
    const r = t.length;
    const o = [];
    const n = [];
    const a = [];
    const s = [];
    const h = [];
    const g = [];
    for (let e = 0; e < r; e++) {
      var _;
      const l = t[e];
      const u = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
        7,
        l.Id,
      );
      u &&
        ((_ = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
        o.push(_ === 1 ? l.MaleTexture : l.FemaleTexture),
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
    const t = this.kzt?.Config.QuestId;
    const i = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
        e,
      ),
    );
    const r =
      (i?.sort((e, t) => e.Id - t.Id),
      ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(e));
    const o = i.length;
    const n = [];
    const a = new HandBookDefine_1.HandBookQuestViewOpenParam();
    for (let e = 0; e < o; e++) {
      const s = i[e];
      ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(r.Type, s.Id) &&
        (n.push(s.Id), t === s.QuestId) &&
        (a.Index = n.indexOf(s.Id));
    }
    (a.ConfigIdList = n),
      UiManager_1.UiManager.OpenView("HandBookQuestPlotView", a);
  }
}
exports.HandBookQuestChildItem = HandBookQuestChildItem;
// # sourceMappingURL=HandBookQuestChildItem.js.map
