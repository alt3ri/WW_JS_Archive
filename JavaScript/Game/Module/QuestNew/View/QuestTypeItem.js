
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.QuestTypeItem=void 0;const UE=require("ue"),StringUtils_1=require("../../../../Core/Utils/StringUtils"),ConfigManager_1=require("../../../Manager/ConfigManager"),ModelManager_1=require("../../../Manager/ModelManager"),UiPanelBase_1=require("../../../Ui/Base/UiPanelBase"),LguiUtil_1=require("../../Util/LguiUtil"),QuestChapterItem_1=require("./QuestChapterItem"),QuestItem_1=require("./QuestItem");class QuestItemData{constructor(t,i){this.QuestId=t,this.QuestType=i}}class QuestTypeItem extends UiPanelBase_1.UiPanelBase{constructor(){super(...arguments),this.vro=void 0,this.QuestType=0,this.bro=void 0,this.qro=void 0,this.Gro=void 0,this.Nro=void 0,this.Oro=()=>{var t=this.GetItem(1);t.SetUIActive(!t.bIsUIActive)}}Init(t,i,s){this.QuestType=i,this.vro=s,t.SetUIActive(!0),this.CreateThenShowByActor(t.GetOwner())}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UIButtonComponent],[1,UE.UIItem],[2,UE.UIText],[3,UE.UISprite],[4,UE.UIItem],[5,UE.UIItem],[6,UE.UIItem],[7,UE.UISprite]],this.BtnBindInfo=[[0,this.Oro]]}OnStart(){this.GetItem(4).SetUIActive(!0);var t=ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(this.QuestType);StringUtils_1.StringUtils.IsEmpty(t?.TypeColor)||this.GetSprite(7).SetColor(UE.Color.FromHex(t?.TypeColor??""));this.GetText(2).SetText(ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeName(this.QuestType));var i,t=t.QuestTypeTitleIcon;0!==t?.length&&(i=this.GetSprite(3),this.SetSpriteByPath(t,i,!1)),this.bro=[],this.qro=[],this.UpdateList()}OnTick(t){if(this.qro)for(const i of this.qro)i.OnTick(t);if(this.bro)for(const s of this.bro)s.OnTick(t)}UpdateList(){this.kro();const s=this.Gro,e=this.Nro;let i=0;for(const o of e){let t=void 0;var r;i<this.qro.length?(t=this.qro[i]).UpdateItem(o.ChapterId,o.QuestType,o.QuestList):(r=LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6),this.GetItem(1)),(t=new QuestChapterItem_1.QuestChapterItem).Init(r,o.ChapterId,o.QuestType,o.QuestList,this.vro),this.qro.push(t)),i++}this.qro.forEach((t,i)=>{t.SetActive(i<e.length)}),i=0;for(const a of s){let t=void 0;var h;i<this.bro.length?t=this.bro[i]:(h=LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5),this.GetItem(1)),(t=new QuestItem_1.QuestItem(this.vro)).SetRootActor(h.GetOwner(),!0),this.bro.push(t)),t.UpdateItem(a.QuestId,a.QuestType),i++}this.bro.forEach((t,i)=>{t.SetActiveItem(i<s.length)})}UpdateItem(i){let t=this.bro.find(t=>t.QuestId===i);if(!t)for(const e of this.qro){var s=e.FindByQuestId(i);if(s){t=s;break}}t&&t.UpdateItem(t.QuestId,t.QuestType)}OnSelect(t){let s=t;t||(t=this.GetDefaultItem(),s=t?.QuestId??0),this.bro.forEach(t=>{t.SetSelected(t.QuestId===s),t.SetNotAllowNoneSelect()});for(const e of this.qro){let i=!1;e.QuestList.forEach(t=>{t.SetSelected(t.QuestId===s),t.SetNotAllowNoneSelect(),t.QuestId===s&&(i=!0)}),e.SetSelected(i)}}GetDefaultItem(){if(0!==this.bro.length||0!==this.qro.length)return(0!==this.qro.length?this.qro[0].QuestList:this.bro)[0]}IsQuestEmpty(){return 0===this.Gro?.length&&0===this.qro?.length}UpdateListTrackState(){for(const s of this.bro){s.UpdateTrackIconActive();var t=ModelManager_1.ModelManager.QuestNewModel.GetQuest(s.QuestId);t&&s.UpdateFunctionIcon(t)}for(const e of this.qro)for(const r of e.QuestList){r.UpdateTrackIconActive();var i=ModelManager_1.ModelManager.QuestNewModel.GetQuest(r.QuestId);i&&r.UpdateFunctionIcon(i)}}GetQuestItem(i){for(const s of this.qro){var t=s.QuestList.find(t=>t.QuestId===i);if(t)return t}return this.bro.find(t=>t.QuestId===i)}kro(){this.Gro=[],this.Nro=[];for(const i of ConfigManager_1.ConfigManager.QuestNewConfig.GetQuesTypesByMainType(this.QuestType)){var t=ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(i.Id);if(t){t.sort((t,i)=>t.Id-i.Id);for(const s of t)s.CanShowInUiPanel()&&(s.ChapterId?this.Fro(s.ChapterId,s.Type,s.Id):this.Gro.push(new QuestItemData(s.Id,s.Type)))}}}Fro(t,i,s){for(const e of this.Nro)if(e.ChapterId===t)return void e.QuestList.push(s);this.Nro.push({ChapterId:t,QuestType:i,QuestList:[s]})}}exports.QuestTypeItem=QuestTypeItem;
//# sourceMappingURL=QuestTypeItem.js.map