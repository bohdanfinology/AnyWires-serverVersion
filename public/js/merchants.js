const USERS = [{
    Name: "Interabrokers",
    Created_By: "Rayan Le Blank",
    Promo: "544",
    Aff: "Rotem", 
    In_Persent: "0.04",
    Turnover_month: "1 112"
},{
    Name: "Imperial",
    Created_By: "AW_Technical",
    Promo: "509",
    Aff: "or", 
    In_Persent: "0.08",
    Turnover_month: "2 325"
},{
    Name: "Ainvestments",
    Created_By: "William",
    Promo: "531",
    Aff: "Dan Bitsale", 
    In_Persent: "0.1",
    Turnover_month: "5 214"
},{
    Name: "Imperial",
    Created_By: "AW_Technical",
    Promo: "509",
    Aff: "or", 
    In_Persent: "0.08",
    Turnover_month: "2 325"
},{
    Name: "Ainvestments",
    Created_By: "William",
    Promo: "531",
    Aff: "Dan Bitsale", 
    In_Persent: "0.1",
    Turnover_month: "5 214"
},{
    Name: "Imperial",
    Created_By: "AW_Technical",
    Promo: "509",
    Aff: "or", 
    In_Persent: "0.08",
    Turnover_month: "2 325"
},{
    Name: "Ainvestments",
    Created_By: "William",
    Promo: "531",
    Aff: "Dan Bitsale", 
    In_Persent: "0.1",
    Turnover_month: "5 214"
},{
    Name: "Imperial",
    Created_By: "AW_Technical",
    Promo: "509",
    Aff: "or", 
    In_Persent: "0.08",
    Turnover_month: "2 325"
},{
    Name: "Ainvestments",
    Created_By: "William",
    Promo: "531",
    Aff: "Dan Bitsale", 
    In_Persent: "0.1",
    Turnover_month: "5 214"
}];

class UsersList {
    constructor(){
        this.btnExel = document.querySelector("#dowloadXls");
        this.buttonSearch = document.getElementById("search-button");
        this.render();
    }

    saveXls = () => {
        // For hide not useless element XLS
        let col6 = document.querySelectorAll(".column6");
        col6.forEach((item) => item.style.display = "none");
        setTimeout(() => {
            col6.forEach((item) => item.style.display = "table-cell");
        },10);
        // For hide not useless element XLS

        var tbl = document.getElementById('main-table');
        var wb = XLSX.utils.table_to_book(tbl, {
            sheet: "Merchants table",
            display: true
        });

        var wbout = XLSX.write(wb, {bookType: "xlsx", bookSST: true, type: "binary"});
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'merchants_table.xlsx');
    }

    searchFunction(){
        var phrase = document.getElementById('search-input');
        var table = document.getElementById('main-table');
        var regPhrase = new RegExp(phrase.value, 'i');
        var flag = false;
        for (var i = 1; i < table.rows.length; i++) {
            flag = false;
            for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
                flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
                if (flag) break;
            }
            if (flag) {
                table.rows[i].style.display = "";
            } else {
                table.rows[i].style.display = "none";
            }
        }
    }

    loadUsers(arr){
        var size = 15;
        this.container = document.getElementById("table-list");
        arr.slice(0, size).forEach((item) => {
            item === "" ? item = "—" : "";
            this.userList = document.createElement("tr");
            this.userList.innerHTML =  `
                    <td class="column1">${item.Name}</td> 
                    <td class="column2">${item.Created_By}</td> 
                    <td class="column3">${item.Promo}</td> 
                    <td class="column4">${item.Aff}</td> 
                    <td class="column5">${item.In_Persent}</td>
                    <td class="column5">${item.Turnover_month}</td>
                    <td class="column6"> 
                        <div id="merchantButtons">
                            <button class="buttonView">View</button> 
                            <button class="buttonAddSettle">Add Settle</button>
                        </div>
                    </td>
               
            `;
        this.container.appendChild(this.userList);
        })
    }

    render(){
        this.loadUsers(USERS);
        this.buttonSearch.addEventListener("click", this.searchFunction);
        this.btnExel.addEventListener("click", this.saveXls);
    }
};

const userList = new UsersList();






class view {
    constructor(){
        this.render();
    }

    addMerchant = () => {
                    this.wrapper = document.querySelector("#wrapper");
                    this.wrapper.classList.add("opacityWrapper");

                    this.container = document.querySelector("#modal-view");
                    this.container.style.display = "flex";
                    this.container.classList.add("slide-top");


                    this.blockFirst = document.createElement("div");
                    this.container.appendChild(this.blockFirst);

                    this.labelName = document.createElement("p");
                    this.labelName.textContent = "Name:";
                    this.blockFirst.appendChild(this.labelName);
                    this.inputName = document.createElement("input");
                    this.inputName.classList.add("inputAdd");
                    this.inputName.setAttribute("type", "text");
                    this.inputName.classList.add("inputName");
                    this.inputName.placeholder = "Please enter your name";
                    this.blockFirst.appendChild(this.inputName);

                   
                    this.inputCreate = document.createElement("input");
                    this.inputCreate.value = "Admin";

                    this.labelPromo = document.createElement("p");
                    this.labelPromo.textContent = "Promo:";
                    this.blockFirst.appendChild(this.labelPromo);
                    this.inputPromo = document.createElement("input");
                    this.inputPromo.classList.add("inputAdd");
                    this.inputPromo.setAttribute("type", "text");
                    this.inputPromo.classList.add("inputName");
                    this.inputPromo.placeholder = "Promo";
                    this.blockFirst.appendChild(this.inputPromo);


                    this.blockSecond = document.createElement("div");
                    this.container.appendChild(this.blockSecond);

                    this.labelAff = document.createElement("p");
                    this.labelAff.textContent = "Affiliate:";
                    this.blockSecond.appendChild(this.labelAff);
                    this.inputAff = document.createElement("input");
                    this.inputAff.classList.add("inputAdd");
                    this.inputAff.setAttribute("type", "text");
                    this.inputAff.classList.add("inputName");
                    this.inputAff.placeholder = "Affiliate";
                    this.blockSecond.appendChild(this.inputAff);

                    this.labelIn = document.createElement("p");
                    this.labelIn.textContent = "In, %:";
                    this.blockSecond.appendChild(this.labelIn);
                    this.inputIn = document.createElement("input");
                    this.inputIn.classList.add("inputAdd");
                    this.inputIn.setAttribute("type", "number");
                    this.inputIn.setAttribute("title", "Only Digits");
                    this.inputIn.classList.add("inputName");
                    this.inputIn.placeholder = "In, %";
                    this.blockSecond.appendChild(this.inputIn);

                    
                    this.inputTurn = document.createElement("input");
                    this.inputTurn.value = "0";


                    this.buttonSave = document.createElement("button");
                    this.buttonSave.textContent = "Save";
                    this.buttonSave.classList.add("buttonSave");
                    this.buttonSave.classList.add("btnSaveCorrect");
                    this.container.appendChild(this.buttonSave);

                    

                    this.buttonSave.addEventListener("click", () => {
                        if (this.inputName.value.length && this.inputPromo.value.length && this.inputAff.value.length && this.inputIn.value.length){
                                USERS.push({
                                    Name: this.inputName.value,
                                    Created_By: this.inputCreate.value,
                                    Promo: this.inputPromo.value,
                                    Aff: this.inputAff.value, 
                                    Aff: this.inputAff.value, 
                                    Aff: this.inputAff.value, 
                                    In_Persent: this.inputIn.value,
                                    Turnover_month: this.inputTurn.value
                                });
                                this.tableMerch = document.querySelector("#table-list");
                                this.tableMerch.innerHTML = "";
                                userList.loadUsers(USERS);
                                this.viewMerchant();

                                this.modalFill = document.querySelector("#modal-pleaseFill");
                                this.modalFill.style.display = "none";

                                jQuery(function($){
                                    var div = $("#modal-view"); // тут указываем ID элемента
                                        div.hide(); // скрываем его
                                        $("#wrapper").removeClass("opacityWrapper");
                                        $("#modal-view").empty();
                                        $("#modal-pleaseFill").hide();
                                });
                                
                        } else {
                            this.inputsAdd = document.querySelectorAll(".inputAdd");
                            this.inputsAdd.forEach((item) => {
                               item.value==="" ? item.style.boxShadow="0px 0px 2px 2px #FF0000" : item.style.boxShadow="0px 0px 1px 1px #4BA100";
                            });

                            this.modalFill = document.querySelector("#modal-pleaseFill");
                            this.modalFill.classList.add("slide-top");
                            this.modalFill.style.display = "flex";
                        } 
                    })
    }

    hideBlock(){
        jQuery(function($){
            $(document).mouseup(function (e){ // событие клика по веб-документу
                var div = $("#modal-view"); // тут указываем ID элемента
                if (!div.is(e.target) // если клик был не по нашему блоку
                    && div.has(e.target).length === 0) { // и не по его дочерним элементам
                    div.hide(); // скрываем его
                    $("#wrapper").removeClass("opacityWrapper");
                    $("#modal-view").empty();
                    $("#modal-pleaseFill").hide();
                }
            });
        });
    };

    viewMerchant(){
        this.buttonView = document.querySelectorAll(".buttonView");
            for(let i = 0; i < this.buttonView.length; i++){
                this.buttonView[i].addEventListener("click", () => {
                    this.wrapper = document.querySelector("#wrapper");
                    this.wrapper.classList.add("opacityWrapper");
                    var value = this.buttonView[i].closest("tr");


                    this.container = document.querySelector("#modal-view");
                    this.container.style.display = "flex";
                    this.container.classList.add("slide-top");


                    this.blockFirst = document.createElement("div");
                    this.container.appendChild(this.blockFirst);

                    this.labelName = document.createElement("p");
                    this.labelName.textContent = "Name:";
                    this.blockFirst.appendChild(this.labelName);
                    this.inputName = document.createElement("input");
                    this.inputName.classList.add("inputsView");
                    this.inputName.classList.add("inputName");
                    this.inputName.value = value.children[0].textContent;
                    this.blockFirst.appendChild(this.inputName);

                    this.labelCreate = document.createElement("p");
                    this.labelCreate.textContent = "Create By:";
                    this.blockFirst.appendChild(this.labelCreate);
                    this.inputCreate = document.createElement("input");
                    this.inputCreate.classList.add("inputsView");
                    this.inputCreate.classList.add("inputName");
                    this.inputCreate.value = value.children[1].textContent;
                    this.blockFirst.appendChild(this.inputCreate);

                    this.labelPromo = document.createElement("p");
                    this.labelPromo.textContent = "Promo:";
                    this.blockFirst.appendChild(this.labelPromo);
                    this.inputPromo = document.createElement("input");
                    this.inputPromo.classList.add("inputsView");
                    this.inputPromo.classList.add("inputName");
                    this.inputPromo.value = value.children[2].textContent;
                    this.blockFirst.appendChild(this.inputPromo);


                    this.blockSecond = document.createElement("div");
                    this.container.appendChild(this.blockSecond);

                    this.labelAff = document.createElement("p");
                    this.labelAff.textContent = "Aff:";
                    this.blockSecond.appendChild(this.labelAff);
                    this.inputAff = document.createElement("input");
                    this.inputAff.classList.add("inputsView");
                    this.inputAff.classList.add("inputName");
                    this.inputAff.value = value.children[3].textContent;
                    this.blockSecond.appendChild(this.inputAff);

                    this.labelIn = document.createElement("p");
                    this.labelIn.textContent = "In, %:";
                    this.blockSecond.appendChild(this.labelIn);
                    this.inputIn = document.createElement("input");
                    this.inputIn.classList.add("inputsView");
                    this.inputIn.classList.add("inputName");
                    this.inputIn.value = value.children[4].textContent;
                    this.blockSecond.appendChild(this.inputIn);

                    this.labelTurn = document.createElement("p");
                    this.labelTurn.textContent = "Turnover, month:";
                    this.blockSecond.appendChild(this.labelTurn);
                    this.inputTurn = document.createElement("input");
                    this.inputTurn.classList.add("inputsView");
                    this.inputTurn.classList.add("inputName");
                    this.inputTurn.value = value.children[5].textContent;
                    this.blockSecond.appendChild(this.inputTurn);


                    this.buttonSave = document.createElement("button");
                    this.buttonSave.textContent = "Save";
                    this.buttonSave.classList.add("buttonSave");
                    this.container.appendChild(this.buttonSave);

                    this.buttonSave.addEventListener("click", () => {
                        if (this.inputName.value!="" && this.inputCreate.value!=""&& this.inputPromo.value!=""&& this.inputAff.value!="" && this.inputIn.value!="" && this.inputTurn.value != "") {
                            value.children[0].textContent = this.inputName.value;
                            value.children[1].textContent = this.inputCreate.value;
                            value.children[2].textContent = this.inputPromo.value;
                            value.children[3].textContent = this.inputAff.value;
                            value.children[4].textContent = this.inputIn.value;
                            value.children[5].textContent = this.inputTurn.value;

                            jQuery(function($){
                                    var div = $("#modal-view"); // тут указываем ID элемента
                                        div.hide(); // скрываем его
                                        $("#wrapper").removeClass("opacityWrapper");
                                        $("#modal-view").empty();
                                        $("#modal-pleaseFill").hide();
                            });

                            this.modalFill = document.querySelector("#modal-pleaseFill");
                            this.modalFill.style.display = "none";
                            
                        } else {
                            this.inputsView = document.querySelectorAll(".inputsView");
                            this.inputsView.forEach((item) => {
                                item.value==="" ? item.style.boxShadow="0px 0px 2px 2px #FF0000" : item.style.boxShadow="0px 0px 1px 1px #4BA100";
                             });

                            this.modalFill = document.querySelector("#modal-pleaseFill");
                            this.modalFill.classList.add("slide-top");
                            this.modalFill.style.display = "flex";
                        }
                    });
                })
            }
    }

    render(){
        this.viewMerchant();
        this.hideBlock();
        this.buutonCreateMerchant = document.querySelector("#create-button");
        this.buutonCreateMerchant.addEventListener("click", this.addMerchant);
    }
}

const View = new view();


// exportToExel = (tableID, filename="") => {
//     var downloadLink;
//     var dataType = "application/vnd.ms-excel";
//     var tableSelect = document.getElementById("main-table");
//     var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

//     filename = filename?filename+".xls":"merchants_table.xls";
    
//     downloadLink = document.createElement("a");
//     document.body.appendChild(downloadLink);

//     if(navigator.msSaveOrOpenBlob){
//         var blob = new Blob(["\ufeff", tableHTML],{
//             type: dataType
//         });
//         navigator.msSaveOrOpenBlob(blob, filename);
//     } else{
//         downloadLink.href = 'data:' + dataType + "," + tableHTML;

//         downloadLink.download = filename;

//         downloadLink.click();
//     }
// }

// var btnExel = document.querySelector("#dowloadXls");
// btnExel.addEventListener("click", () => {
//     exportToExel("main-table");
// });


