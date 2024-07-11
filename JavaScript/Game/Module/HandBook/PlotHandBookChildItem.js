"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotHandBookChildItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const HandBookController_1 = require("./HandBookController");
const HandBookDefine_1 = require("./HandBookDefine");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class PlotHandBookChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = void 0) {
    super(),
      (this.kzt = void 0),
      (this.LZt = 0),
      (this.aei = (e) => {
        const t = this.kzt.Config;
        if (this.kzt.IsLock)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "CurPlotHandBookLock",
          ),
            this.GetTog()?.SetToggleStateForce(0, !1, !0);
        else {
          this.kzt.IsNew &&
            HandBookController_1.HandBookController.SendIllustratedReadRequest(
              7,
              t.Id,
            );
          let i = t.Type;
          const o = ConfigCommon_1.ConfigCommon.ToList(
            ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
              i,
            ),
          );
          const r =
            (o.sort(this.aZt),
            ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(i));
          const n = o.length;
          const s = [];
          const a = [];
          const l = [];
          const h = [];
          const g = [];
          const _ = [];
          for (let e = 0; e < n; e++) {
            const t = o[e];
            var u;
            const d = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
              7,
              t.Id,
            );
            d &&
              ((u =
                ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
              s.push(u === 1 ? t.MaleTexture : t.FemaleTexture),
              g.push(d.CreateTime),
              a.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  t.Descrtption,
                ),
              ),
              l.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name),
              ),
              h.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  r.TypeDescription,
                ),
              ),
              _.push(t.Id));
          }
          i = new HandBookDefine_1.HandBookPhotoData();
          (i.DescrtptionText = a),
            (i.TypeText = h),
            (i.NameText = l),
            (i.HandBookType = 7),
            (i.Index = this.LZt),
            (i.TextureList = s),
            (i.DateText = g),
            (i.ConfigId = _),
            UiManager_1.UiManager.OpenView("HandBookPhotoView", i);
        }
      }),
      (this.OnHandBookRead = (e, t) => {
        e === 7 &&
          t === this.kzt?.Config?.Id &&
          this.GetItem(2)?.SetUIActive(!1);
      }),
      (this.aZt = (e, t) => e.Id - t.Id),
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
      (this.BtnBindInfo = [[4, this.aei]]),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  Refresh(e, t, i) {
    (this.kzt = e), (this.LZt = i);
    var i = this.kzt.Config;
    const o = e.IsNew;
    var e = e.IsLock;
    const r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.SetTextureByPath(
      r === 1 ? i.MaleTexture : i.FemaleTexture,
      this.GetTexture(0),
    ),
      this.GetText(1).ShowTextNew(i.Name),
      this.GetItem(2).SetUIActive(o),
      this.GetItem(3).SetUIActive(e),
      this.GetTexture(0).SetUIActive(!e),
      this.GetTog()?.SetEnable(!e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHandBookRead,
      this.OnHandBookRead,
    ),
      (this.kzt = void 0),
      (this.LZt = 0);
  }
  GetTog() {
    return this.GetExtendToggle(4);
  }
  GetData() {
    return this.kzt;
  }
  GetIsUnlock() {
    return !!this.kzt && !this.kzt.IsLock;
  }
}
exports.PlotHandBookChildItem = PlotHandBookChildItem;
// # sourceMappingURL=PlotHandBookChildItem.js.map
