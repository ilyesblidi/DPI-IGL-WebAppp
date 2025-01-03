import{b as P,d as k,e as y,l as O}from"./chunk-SQZNF6FM.js";import{$a as v,Ia as u,Ma as x,Ta as l,Va as e,Wa as i,Xa as b,Ya as C,Za as c,_a as D,ab as n,bb as h,ca as m,cb as p,da as _,ib as I,wa as g,ya as o,za as f}from"./chunk-4TG77M4Z.js";var w=()=>({width:"100px",height:"100px",border:"2px solid black"});function N(a,r){if(a&1){let t=C();e(0,"li",5),c("click",function(){let s=m(t).$implicit,M=D();return _(M.viewDpiDetails(s.id_dpi))}),e(1,"div",6)(2,"h3"),n(3),i(),e(4,"p"),n(5),i(),e(6,"p"),n(7),i(),e(8,"p"),n(9),i(),b(10,"img",7),i()()}if(a&2){let t=r.$implicit;o(3),p("ID: ",t.id_dpi,""),o(2),p("Date Created: ",t.date_creation,""),o(2),p("Diagnostic: ",t.diagnostic||"N/A",""),o(2),h(t.commentaire_administratif),o(),v("alt","QR Code for DPI ",t.id_dpi,""),l("src",t.chemin_QR_code,g)("ngStyle",I(8,w))}}var S=class a{constructor(r){this.router=r}dpis=[];ngOnInit(){this.dpis=[{id_dpi:1,date_creation:"2024-01-01",commentaire_administratif:"Admin Comment 1",chemin_QR_code:"assets/qr_codes/qr_code_1.png"},{id_dpi:2,date_creation:"2024-01-02",commentaire_administratif:"Admin Comment 2",chemin_QR_code:"assets/qr_codes/qr_code_2.png"}]}viewDpiDetails(r){console.log("Navigate to DPI:",r)}searchDpis(){alert("Search functionality triggered.")}createNewDpi(){alert("Navigate to Create DPI page.")}static \u0275fac=function(t){return new(t||a)(f(O))};static \u0275cmp=u({type:a,selectors:[["app-dpi-list"]],decls:10,vars:1,consts:[[1,"dpi-list-container"],[1,"action-buttons"],[1,"btn",3,"click"],[1,"dpi-list"],["class","dpi-item",3,"click",4,"ngFor","ngForOf"],[1,"dpi-item",3,"click"],[1,"dpi-details"],[3,"src","alt","ngStyle"]],template:function(t,d){t&1&&(e(0,"div",0)(1,"h2"),n(2,"DPI List"),i(),e(3,"div",1)(4,"button",2),c("click",function(){return d.searchDpis()}),n(5,"Search DPI"),i(),e(6,"button",2),c("click",function(){return d.createNewDpi()}),n(7,"Create New DPI"),i()(),e(8,"ul",3),x(9,N,11,9,"li",4),i()()),t&2&&(o(9),l("ngForOf",d.dpis))},dependencies:[y,P,k],styles:[".dpi-list-container[_ngcontent-%COMP%]{max-width:800px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:8px;background-color:#f9f9f9}.action-buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:20px}.btn[_ngcontent-%COMP%]{padding:10px 20px;background-color:#007bff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:14px;transition:background-color .3s}.btn[_ngcontent-%COMP%]:hover{background-color:#0056b3}.dpi-list[_ngcontent-%COMP%]{list-style-type:none;padding:0}.dpi-item[_ngcontent-%COMP%]{padding:15px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;background-color:#fff;cursor:pointer;transition:background-color .3s}.dpi-item[_ngcontent-%COMP%]:hover{background-color:#f1f1f1}.dpi-details[_ngcontent-%COMP%]{display:flex;flex-direction:column}.dpi-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;color:#333}"]})};export{S as DpiListComponent};