"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeographyHandBookChildItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class GeographyHandBookChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = void 0) {
    super(),
      (this.kzt = void 0),
      (this.mZt = (e) => {
        const i = this.kzt.Config;
        if (this.kzt.IsLock)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "CurGeographyHandBookLock",
          ),
            this.SetToggleState(0);
        else {
          this.dZt();
          const o = ConfigCommon_1.ConfigCommon.ToList(
            ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig(),
          );
          const t = (o.sort(this.aZt), o.length);
          const n = [];
          const a = [];
          const s = [];
          const l = [];
          const h = [];
          const g = [];
          let r = 0;
          for (let e = 0; e < t; e++) {
            const d = o[e];
            let u = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              2,
              d.Id,
            );
            u &&
              (n.push(d.Texture),
              h.push(u.CreateTime),
              a.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  d.Descrtption,
                ),
              ),
              s.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(d.Name),
              ),
              (u =
                ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfig(
                  d.Type,
                )),
              l.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  u.TypeDescription,
                ),
              ),
              g.push(d.Id),
              d.Id === i.Id) &&
              (r = n.length - 1);
          }
          const _ = new HandBookDefine_1.HandBookPhotoData();
          (_.DescrtptionText = a),
            (_.TypeText = l),
            (_.NameText = s),
            (_.HandBookType = 2),
            (_.Index = r),
            (_.TextureList = n),
            (_.DateText = h),
            (_.ConfigId = g),
            UiManager_1.UiManager.OpenView("HandBookPhotoView", _);
        }
      }),
      (this.aZt = (e, r) =>
        e.Type === r.Type ? e.Id - r.Id : e.Type - r.Type),
      e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[4, this.mZt]]);
  }
  Refresh(e, r, i) {
    this.kzt = e;
    const o = this.kzt.Config;
    const t = e.IsNew;
    var e = e.IsLock;
    this.SetTextureByPath(o.Texture, this.GetTexture(0)),
      this.GetText(1).ShowTextNew(o.Name),
      this.GetItem(2).SetUIActive(t),
      this.GetTexture(0).SetUIActive(!e),
      this.GetItem(3).SetUIActive(e),
      this.GetTog()?.SetEnable(!e);
  }
  GetData() {
    return this.kzt;
  }
  SetNewState(e) {
    this.GetItem(2).SetUIActive(e);
  }
  SetToggleState(e) {
    this.GetExtendToggle(4).SetToggleStateForce(e, !1, !0),
      e === 1 && this.dZt();
  }
  dZt() {
    let e;
    this.kzt.IsNew &&
      ((e = this.kzt.Config),
      HandBookController_1.HandBookController.SendIllustratedReadRequest(
        2,
        e.Id,
      ));
  }
  OnBeforeDestroy() {
    this.kzt = void 0;
  }
  GetTog() {
    return this.GetExtendToggle(4);
  }
  GetIsUnlock() {
    return !!this.kzt && !this.kzt.IsLock;
  }
}
exports.GeographyHandBookChildItem = GeographyHandBookChildItem;
// # sourceMappingURL=GeographyHandBookChildItem.js.map
