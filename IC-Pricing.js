
ICP = {
    init: function (settings) {

        ICP.scriptURL = '/';
        ICP.div = document.getElementById(settings.my_div);

        $.getScript(ICP.scriptURL + 'ICP-variables.js').done(function () {
            ICP.layout();
            ICP.generateTable();
            ICP.target();
            ICP.backButton();
            ICP.calculate();
            

        });

        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = ICP.scriptURL + 'ICP-CSS.css';
        link.media = 'all';
        head.appendChild(link);

        
    },

  
    calculate: function () {
        var cardCost;
        var props = ICP.vars.menu.techOptions;
        ICP.vars.totalCost = ICP.vars.menu.basic_card.cost;
        var slot = ICP.vars.menu.slot_punch;
        var colorBack = ICP.vars.menu.full_color_back;

        slot.forEach(selected => {
           if(selected.selected === true){
            ICP.vars.totalCost = ICP.vars.totalCost + selected.cost;
           }
       })

        
       colorBack.forEach(selected => {
        if(selected.selected === true){
         ICP.vars.totalCost = ICP.vars.totalCost + selected.cost;
        }
    })
     
    


        props.forEach(selected => {
            if (selected.selected === true) {
                ICP.vars.totalCost = ICP.vars.totalCost + selected.cost;


            }  //if selected, add cost

            
        })//calc total cost for each option selected
        
        cardCost = ICP.vars.totalCost / 100;
        var updateTotal = document.querySelector('#priceTotal');
        var mobileUpdateTotal = document.querySelector('#mobilePriceTotal');
        updateTotal.innerText = `$${cardCost.toFixed(2)}`
        mobileUpdateTotal.innerText = `$${cardCost.toFixed(2)}`

    },
    target: function () {

        var ndiv;
        var slotOpt = ICP.vars.menu.slot_punch;
        var colorBack = ICP.vars.menu.full_color_back;
        console.log(ICP.vars.cdiv);
        
        $('.ICP-next').mousedown(function (e) {
          e.preventDefault();

            if (ICP.vars.cdiv === 'cardNumbers') {
                ndiv = 'slotPunch';
                ICP.vars.cdiv = 'slotPunch';
            } else if (ICP.vars.cdiv === 'slotPunch') {

                $(`#noslot`).mousedown(function () {
                    $(`#trslot`).remove()
                    slotOpt[0].selected = false;
                    ICP.calculate();
                  

                })
                ndiv = 'techOptions';
                ICP.vars.cdiv = 'techOptions';
              
            } else if (ICP.vars.cdiv === 'techOptions') {
                ndiv = 'fullColorBack';
                ICP.vars.cdiv = 'fullColorBack';
            } else if (ICP.vars.cdiv === 'fullColorBack') {
                $(`#bnw_back`).mousedown(function () {
                    $(`#trcolor_back`).remove()
                    colorBack[0].selected = false;
                    ICP.calculate();                  

                })
                ndiv = 'ICP-CTA';
                ICP.vars.cdiv = 'ICP-CTA';
            }
            console.log(ICP.vars.cdiv)
            ICP.changeView(ndiv);
           

        })
      

         $('#slot').mousedown(function (e) {
             e.preventDefault();
             if (slotOpt[0].selected === false) {
                 ICP.makeTableRow({ id: ICP.vars.menu.slot_punch[0].id, title: ICP.vars.menu.slot_punch[0].title, disp_cost: ICP.vars.menu.slot_punch[0].disp_cost, selected: true, })
                 slotOpt[0].selected = true;
             }
         }) 
         
      
         $('#color_back').mousedown(function (e) {
            e.preventDefault();
            if (colorBack[0].selected === false) {
                ICP.makeTableRow({ id: ICP.vars.menu.full_color_back[0].id, title: ICP.vars.menu.full_color_back[0].title, disp_cost: ICP.vars.menu.full_color_back[0].disp_cost, selected: true, })
                colorBack[0].selected = true;
            }
        })

        

        $(".opselect").mousedown(function (e) {
            var target = e.currentTarget.id;
            //FIX for SP and full color
            var to = ICP.vars.menu.techOptions;
            to.forEach(selected => {
                if (selected.id === target && selected.notice === false) {
                    $(this).toggleClass('ICP-selected');
                    if (selected.selected === false) {
                        selected.selected = true;
                        ICP.makeTableRow(selected)
                        console.log(selected);
                    } else {
                        $(`#tr${selected.id}`).remove();

                        selected.selected = false;

                    }
                    ICP.calculate();
                }//if clicked, change option to selected and add cost to total
                if (selected.id === target && selected.notice === true) {
                    ICP.messages(ICP.vars.clamshellMsg);

                }

            })

        })

    },


    makeTableRow: function (i) {
        console.log('making table row');
        var table = document.getElementById('ICP-priceTable')
        var row_1 = document.createElement('tr');
        row_1.setAttribute('id', 'tr' + i.id);
        var cell_1 = document.createElement('td');
        cell_1.innerHTML = i.title;
        var cell_2 = document.createElement('td');
        cell_2.innerHTML = i.disp_cost;
        row_1.appendChild(cell_1);
        row_1.appendChild(cell_2);
        table.appendChild(row_1);



    },

    generateTable: function () {
        console.log('generating table');
        var dtPricePane = document.getElementById('dtPriceHead');
        var tbl = document.createElement('table');
        tbl.setAttribute('id', 'ICP-priceTable');
        tbl.setAttribute('class', 'ICP-price-table');
        dtPricePane.appendChild(tbl);

    },

    backButton: function () {

        var to = ICP.vars.menu.techOptions;
        var slotCard = ICP.vars.menu.slot_punch;
        var colorBack = ICP.vars.menu.full_color_back;
        var ndiv;

        $('.back-button').mousedown(function (e) {
            e.preventDefault();

            if (ICP.vars.cdiv === 'slotPunch') {

                if (slotCard[0].selected === true) {
                    $(`#trslot`).remove()
                    slotCard[0].selected = false;
                }
                ndiv = 'cardNumbers';
                ICP.vars.cdiv = 'cardNumbers';
            } else if (ICP.vars.cdiv === 'techOptions') {

                to.forEach(selected => {
                    if (selected.selected === true) {
                        $(`#${selected.id}`).removeClass('ICP-selected');
                        $(`#tr${selected.id}`).remove();
                        selected.selected = false;

                    }
                }),

                    ndiv = 'slotPunch';
                ICP.vars.cdiv = 'slotPunch';

            } else if (ICP.vars.cdiv === 'fullColorBack') {
                if (colorBack[0].selected === true) {
                    $(`#trcolor_back`).remove()
                    colorBack[0].selected = false;
                    
                }
                ndiv = 'techOptions';
                ICP.vars.cdiv = 'techOptions';
            } else if (ICP.vars.cdiv === 'ICP-CTA') {
                ndiv = 'fullColorBack';
                ICP.vars.cdiv = 'fullColorBack';
            }
            ICP.calculate();
            ICP.changeView(ndiv);

        })
    },

    layout: function () {
        ICP.div.setAttribute('class', 'ICP-parent');

        // mobile price pane
        let mpp = document.createElement('div');
        mpp.setAttribute('id', 'mobilePricePane-');
        mpp.setAttribute('class', 'price-pane mobile-price-pane');
        ICP.div.appendChild(mpp);

        //mobile price header (h2)
        let mobilePHead = document.createElement('h2');
        mobilePHead.setAttribute('id', 'mobile2Head');
        mobilePHead.setAttribute('class', 'price-head pricingHeaders')
        mpp.appendChild(mobilePHead);


        // Footer
        let footer = document.createElement('div');
        footer.setAttribute('id', 'pricingFooter-');
        footer.setAttribute('class', 'pricing-footer');
        ICP.div.appendChild(footer);


            //Back button in Footer
            let bdiv = document.createElement('div');
            bdiv.setAttribute('class', 'ICP-foot-obj');
            bdiv.style.maxWidth = '150px';
            let backButton = document.createElement('img');
            backButton.setAttribute('id', 'backButton');
            backButton.setAttribute('class', 'back-button ICPMO');
            backButton.setAttribute('src', '/img/back_btn.png');
            backButton.style.maxWidth = '100%';
            bdiv.appendChild(backButton);
            footer.appendChild(bdiv);

            

            //logo in Footer
            let ldiv = document.createElement('div');
            ldiv.setAttribute('class', 'ICP-foot-obj');
            let logo = document.createElement('img');
            logo.setAttribute('id', 'icpLogo');
            logo.setAttribute('class', 'ICPMO footer-logo');
            logo.setAttribute('src', '/img/white_logo.png');
            logo.onclick = function () {
                window.location.href = 'https://instantcard.net/';
            }
            ldiv.appendChild(logo);
            footer.appendChild(ldiv);

        // options box

        let ob = document.createElement('div');
        ob.setAttribute('id', 'optionsBox');
        ob.setAttribute('class', 'row option-box');
        ICP.div.appendChild(ob);

        // Desktop price pane
        let dtPricePane = document.createElement('div');
        dtPricePane.setAttribute('id', 'dtPricePane');
        dtPricePane.setAttribute('class', 'dt-price-pane price-pane');
        ob.appendChild(dtPricePane);

        // Desktop pre price
        let dtPrePrice = document.createElement('div');
        dtPrePrice.setAttribute('id', 'dtPrePane');
        dtPrePrice.setAttribute('class','price-pre-div ICP-priceTrans');
        
        dtPricePane.appendChild(dtPrePrice);

        //desktoppre price amount <p>

        let dtBase1 = document.createElement('p');
        dtBase1.setAttribute('class', 'basePText');
        dtBase1.appendChild(document.createTextNode(ICP.vars.base1));
        dtPrePrice.appendChild(dtBase1);


        let basecostHeader = document.createElement('p');

        basecostHeader.setAttribute('id', 'prepriceTotal');
        basecostHeader.setAttribute('class', 'pre-price-total');
        let basecostHeaderNode = document.createTextNode(ICP.vars.menu.basic_card.disp_cost);
        
        basecostHeader.appendChild(basecostHeaderNode);
        dtPrePrice.appendChild(basecostHeader);

        let dtpostbase = document.createElement('p');
        dtpostbase.setAttribute('class', 'basePText');
        dtpostbase.appendChild(document.createTextNode(ICP.vars.postPrice));
        dtPrePrice.appendChild(dtpostbase);

        let dtsupbase = document.createElement('p');
        dtsupbase.setAttribute('class', 'ICP-fine ICPMO');
        dtsupbase.setAttribute('id', 'ICPFine');
        dtsupbase.innerHTML = ICP.vars.baseSub;
        dtsupbase.setAttribute('onclick', 'ICP.messages(ICP.vars.prepaidMsg)');
        dtPrePrice.appendChild(dtsupbase);
        

        // Desktop calc price
        let dtCalcPrice = document.createElement('div');
        dtCalcPrice.setAttribute('id', 'dtCalcPane');
        dtCalcPrice.setAttribute('class','ICP-priceTrans')
        dtCalcPrice.style.maxHeight='0';
        dtCalcPrice.style.opacity = '0';
        dtPricePane.appendChild(dtCalcPrice);        

        //Desktop price Header (h2)
        var dtPriceHead = document.createElement('h2');
        dtPriceHead.setAttribute('id', 'dtPriceHead');
        dtPriceHead.setAttribute('class', 'price-head pricingHeaders');
        dtCalcPrice.appendChild(dtPriceHead);
        ICP.addTextClass(ICP.vars.pricingHead, 'price-head');




        //desktopprice amount <p>
        let dtPriceHeaderDiv = document.createElement('div');
        dtPriceHeaderDiv.setAttribute('class', 'price-total-div')


        let dtpreprice = document.createElement('p');
        dtpreprice.setAttribute('class', 'price-head pricingHeaders');
        dtpreprice.appendChild(document.createTextNode(ICP.vars.prePrice));
        dtPriceHeaderDiv.appendChild(dtpreprice);



        let costHeader = document.createElement('p');

        costHeader.setAttribute('id', 'priceTotal');
        costHeader.setAttribute('class', 'price-total');
        let costHeaderNode = document.createTextNode(`$${ICP.vars.totalCost}`);
        dtCalcPrice.appendChild(dtPriceHeaderDiv);
        costHeader.appendChild(costHeaderNode);
        dtPriceHeaderDiv.appendChild(costHeader);

        let dtpostprice = document.createElement('p');
        dtpostprice.setAttribute('class', 'price-head pricingHeaders');
        dtpostprice.appendChild(document.createTextNode(ICP.vars.postPrice));
        dtPriceHeaderDiv.appendChild(dtpostprice);

        let dtsupprice = document.createElement('p');
        dtsupprice.setAttribute('class', 'ICP-fine ICPMO');
        dtsupprice.setAttribute('id', 'ICPFine');
        dtsupprice.appendChild(document.createTextNode(ICP.vars.priceSub));
        dtsupprice.setAttribute('onclick', 'ICP.messages(ICP.vars.postageMsg)');
        dtPriceHeaderDiv.appendChild(dtsupprice);



        //mobileprice amount <p>
        let mobileCostHeader = document.createElement('p');
        mobileCostHeader.setAttribute('id', 'mobilePriceTotal');
        mobileCostHeader.setAttribute('class', 'price-total');
        let mobileCostHeaderNode = document.createTextNode(`$${ICP.vars.totalCost}`);
        mobileCostHeader.appendChild(mobileCostHeaderNode);
        mobilePHead.appendChild(mobileCostHeader);


        // Number of Cards
        let cardnumb = document.createElement('div');
        cardnumb.setAttribute('id', 'cardNumbers');
        cardnumb.setAttribute('class', 'ICP-sub-option');
        cardnumb.style.maxHeight = '1920px';
        cardnumb.style.opacity = '1';
        ob.appendChild(cardnumb);

        let p1Head = document.createElement('h2');
        p1Head.setAttribute('id', 'p1Head');
        p1Head.setAttribute('class', 'h2ICP')
        let p1HeadNode = document.createTextNode(ICP.vars.p1Head);
        p1Head.appendChild(p1HeadNode);
        cardnumb.appendChild(p1Head);

        let p1Sub = document.createElement('p');
        p1Sub.setAttribute('class', 'pICP');
        let p1SubNode = document.createTextNode(ICP.vars.p1Sub);
        p1Sub.appendChild(p1SubNode);
        cardnumb.appendChild(p1Sub);

        let numbopt = document.createElement('div');
        numbopt.setAttribute('id', 'numbopt');
        numbopt.setAttribute('class', 'card-tech');
        cardnumb.appendChild(numbopt);

        ICP.addTechOption(ICP.vars.menu.employees[0], numbopt, true, 'ICP-two-options');
        ICP.addTechOption(ICP.vars.menu.employees[1], numbopt, false, 'ICP-two-options');

        document.getElementById('more_500').onclick = function () {
            ICP.messages(ICP.vars.enterpriseMsg);
        }

        document.getElementById('500_few').onclick = function () {
            dtPrePrice.style.maxHeight = '0';
            dtPrePrice.style.opacity = '0';
            document.getElementById('dtCalcPane').style.maxHeight = '2000px';
            document.getElementById('dtCalcPane').style.opacity = '1';
        }

        // Slot punch     

        let slotPunch = document.createElement('div');
        slotPunch.setAttribute('id', 'slotPunch');
        slotPunch.setAttribute('class', 'ICP-sub-option');
        slotPunch.style.maxHeight = '0px';
        slotPunch.style.opacity = '0';
        ob.appendChild(slotPunch);

        let p2Head = document.createElement('h2');
        p2Head.setAttribute('id', 'p2Head');
        p2Head.setAttribute('class', 'h2ICP')
        let p2HeadNode = document.createTextNode(ICP.vars.p2Head);
        p2Head.appendChild(p2HeadNode);
        slotPunch.appendChild(p2Head);

        let p2Sub = document.createElement('p');
        p2Sub.setAttribute('class', 'pICP');
        let p2SubNode = document.createTextNode(ICP.vars.p2Sub);
        p2Sub.appendChild(p2SubNode);
        slotPunch.appendChild(p2Sub);

        let slotopt = document.createElement('div');
        slotopt.setAttribute('id', 'slotopt');
        slotopt.setAttribute('class', 'card-tech');
        slotPunch.appendChild(slotopt);


        ICP.addTechOption(ICP.vars.menu.slot_punch[0], slotopt, true, 'ICP-two-options');
        ICP.addTechOption(ICP.vars.menu.slot_punch[1], slotopt, true, 'ICP-two-options');

        document.getElementById('slot').onclick = function (){
            console.log(ICP.vars.menu.slot_punch[0].cost);
            ICP.vars.totalCost = ICP.vars.totalCost + ICP.vars.menu.slot_punch[0].cost;
            ICP.calculate();
            console.log(ICP.vars.totalCost);
        }

        // tech options

        let techop = document.createElement('div');
        techop.setAttribute('id', 'techOptions');
        techop.setAttribute('class', 'option-box ICP-sub-option');
        ob.appendChild(techop);
        techop.style.maxHeight = '0';
        techop.style.opacity = '0';

        let p3Head = document.createElement('h2');
        p3Head.setAttribute('id', 'p3Head');
        p3Head.setAttribute('class', 'h2ICP')
        let p3HeadNode = document.createTextNode(ICP.vars.p3Head);
        p3Head.appendChild(p3HeadNode);
        techop.appendChild(p3Head);

        let p3Sub = document.createElement('p');
        p3Sub.setAttribute('class', 'pICP');
        let p3SubNode = document.createTextNode(ICP.vars.p3Sub);
        p3Sub.appendChild(p3SubNode);
        techop.appendChild(p3Sub);


        //card tech options 1-8
        let cardTech = document.createElement('div');
        cardTech.setAttribute('id', 'cardTech');
        cardTech.setAttribute('class', 'card-tech');
        techop.appendChild(cardTech);

        

        var techVarL = ICP.vars.menu.techOptions.length;

        for (var i = 0; i < techVarL; i++) {

            ICP.addTechOption(ICP.vars.menu.techOptions[i], cardTech, false, 'tech-options');
        } // create tech options



        //create continue card option
        ICP.addTechOption(ICP.vars.continueCard, cardTech, true, 'tech-options');

        //add message to rfid card
       document.getElementById('contactless').onclick = function () {
            ICP.messages(ICP.vars.rfidMsg);
        }
        



           //Color Back option

           let fullColorBack = document.createElement('div');
           fullColorBack.setAttribute('id', 'fullColorBack');
           fullColorBack.setAttribute('class', 'ICP-sub-option');
           fullColorBack.style.maxHeight = '0';
           fullColorBack.style.opacity = '0';
           ob.appendChild(fullColorBack);
   
           let p4Head = document.createElement('h2');
           p4Head.setAttribute('id', 'p4Head');
           p4Head.setAttribute('class', 'h2ICP')
           let p4HeadNode = document.createTextNode(ICP.vars.p4Head);
           p4Head.appendChild(p4HeadNode);
           fullColorBack.appendChild(p4Head);
   
           let p4Sub = document.createElement('p');
           p4Sub.setAttribute('class', 'pICP');
           let p4SubNode = document.createTextNode(ICP.vars.p4Sub);
           p4Sub.appendChild(p4SubNode);
           fullColorBack.appendChild(p4Sub);
   
           let fullBackOpt = document.createElement('div');
           fullBackOpt.setAttribute('id', 'fullBackOpt');
           fullBackOpt.setAttribute('class', 'card-tech');
           fullColorBack.appendChild(fullBackOpt);
   

           ICP.addTechOption(ICP.vars.menu.full_color_back[1], fullBackOpt, true, 'ICP-two-options');
        ICP.addTechOption(ICP.vars.menu.full_color_back[0], fullBackOpt, true, 'ICP-two-options');
        

        var colorBack = ICP.vars.menu.full_color_back;

        

        document.getElementById('color_back').onclick = function () {
            console.log(colorBack[0]);
            ICP.vars.totalCost = ICP.vars.totalCost + ICP.vars.menu.full_color_back[0].cost;
            ICP.calculate();
        }
        if(colorBack[0].selected === true){
            document.getElementById('bnw_back').onclick = function () {
               
                ICP.vars.totalCost = ICP.vars.totalCost - ICP.vars.menu.full_color_back[0].cost;
                ICP.calculate();
            }
                    
        }
        
               
 //Call to action
        
        
         let cta = document.createElement('div');
           cta.setAttribute('id', 'ICP-CTA');
           cta.setAttribute('class', 'ICP-sub-option');
           cta.style.maxHeight = '0';
           cta.style.opacity = '0';
           ob.appendChild(cta);
   
           let p5Head = document.createElement('h2');
           p5Head.setAttribute('id', 'p5Head');
           p5Head.setAttribute('class', 'h2ICP')
           p5Head.style.paddingTop = '10%';
           let p5HeadNode = document.createTextNode(ICP.vars.p5Head);
           p5Head.appendChild(p5HeadNode);
           cta.appendChild(p5Head);

           let setUpBtn = document.createElement('div');
           setUpBtn.setAttribute('class', 'setup-btn ICPMO');
           let setUpBtnSpan = document.createElement('p');
           setUpBtnSpan.innerHTML = ICP.vars.setUp;
           setUpBtn.appendChild(setUpBtnSpan);
           cta.appendChild(setUpBtn);

           let p5Sub = document.createElement('p');
           p5Sub.setAttribute('class', 'h3ICP');
           let p5SubNode = document.createTextNode(ICP.vars.p5Sub);
           p5Sub.appendChild(p5SubNode);
           cta.appendChild(p5Sub);

           let cntctBtn = document.createElement('div');
           cntctBtn.setAttribute('class', 'cont-btn ICPMO');
           let cntctBtnSpan = document.createElement('p');
           cntctBtnSpan.innerHTML = ICP.vars.cta;
           cntctBtn.appendChild(cntctBtnSpan);
           cta.appendChild(cntctBtn);

      
        //modal
        let modal = document.createElement('div');
        modal.setAttribute('id', 'ICPmodal');
        modal.setAttribute('class', 'ICP-modal');

        let modalC = document.createElement('div');
        modalC.setAttribute('id', 'ICPmodalC');
        modalC.setAttribute('class', 'ICP-modal-cont');
        modal.appendChild(modalC);

        let modalX = document.createElement('span');
        modalX.setAttribute('class', 'ICPclose');
        modalX.appendChild(document.createTextNode('×'));
        modalC.appendChild(modalX);

        let modalT = document.createElement('p');
        modalT.setAttribute('class', 'ICP-mod-text');
        modalT.setAttribute('id', 'ICPModText');
        modalC.appendChild(modalT);

        let modalF = document.createElement ('p')
        modalF.setAttribute('class','ICPform');
        modalF.setAttribute('id','ICPform');
        modalF.appendChild(document.createTextNode('[ninja_form id=44]'));
        modalC.appendChild(modalF);

        document.body.appendChild(modal);

        ICP.modalHandling();


    },

    modalHandling: function () {

        // Get the modal
        var modal = document.getElementById('ICPmodal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName('ICPclose')[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = 'none';
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

    },
    messages: function (msg) {
        var modal = document.getElementById('ICPmodal');
        var modalTxt = document.getElementById('ICPModText');
        modalTxt.innerHTML = msg;
        modal.style.display = 'block';
    },


    addTechOption: function (i, d, c, cls) {
        // console.log(ICP.vars.menu.techOptions)

        // console.log(d);

        var to = document.createElement('div');
        to.setAttribute('id', i.id);
        if (c === false) {
            to.setAttribute('class', cls + ' opselect ICPMO');
        } else to.setAttribute('class', cls + ' ICP-next ICPMO');
        d.appendChild(to);

        let optionImg = document.createElement('img');
       
        optionImg.setAttribute('class', cls + '-img');
        optionImg.setAttribute('alt', i.title);
        optionImg.setAttribute('src', i.image);
        to.appendChild(optionImg);

    },

    addTextClass: function (s, c) {
        //s for "string" c for "class"

        pe = document.getElementsByClassName(c);
        for (var i = 0; i < pe.length; i++) {
            pe[i].appendChild(document.createTextNode(s));

        }
    },

    changeView: function (id) {
        var list = ['cardNumbers', 'slotPunch', 'techOptions', 'fullColorBack', 'ICP-CTA'];
        var l = list.length;

        for (var i = 0; i < l; i++) {
            var div = document.getElementById(list[i]);
            div.style.maxHeight = '0';
            div.style.opacity = '0';
            div.style.overflow = 'hidden';
            console.log(div.style.maxHeight);
        }

        var div2 = document.getElementById(id);
        div2.style.maxHeight = '1920px';
        div2.style.opacity = '1';
    },


}

