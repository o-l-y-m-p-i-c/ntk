let mainCity, 
    mainCityZoom,
    select = document.querySelector('.main-city'),
    options = document.querySelectorAll('.city-coords')  

let vacancyChoose = document.querySelectorAll(".vacancy-item"),
    vacancyTitle = document.querySelector(".vacancy-select"),
    vacancyList = document.querySelector(".vacancy-list"),
    vacancySelect = document.querySelector(".form-inner__left-side__select-wrapper")


vacancyTitle.onclick = (e)=> {
    vacancySelect.classList.toggle("active")
}
vacancyChoose.forEach(el => {
    el.onclick = (e)=> {
        vacancyTitle.setAttribute('chosen',e.target.innerHTML)
        vacancyTitle.children[0].innerText = e.target.innerHTML
        vacancySelect.classList.remove("active")

    }
    
})

select.onclick= (e)=>{
    e.target.parentNode.classList.toggle("active")
}

function setOption(){
    options.forEach(element => {
        if (element.hasAttribute("selected")) {
            mainCity = element.attributes.coordinates.value.split(',')
            mainCityZoom = element.attributes.zoom.value
        }
        
    })
}

options.forEach(el => {
    if (el.hasAttribute("selected")) {
        mainCity = el.attributes.coordinates.value.split(',')
        mainCityZoom = el.attributes.zoom.value
        select.value= el.innerText
        select.innerText= el.innerText
        select.attributes.coordinates.value = el.attributes.coordinates.value
        setOption()
    }
    
})

let theMain = {
    x:getAtr(mainCity,0) || 55.7522,
    y:getAtr(mainCity,1) || 37.6156,
    zoom: mainCityZoom || 12,
}
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        center: [theMain.x, theMain.y],
        zoom: theMain.zoom,
        controls: []
    });
    myMap.behaviors.disable('scrollZoom'); 
    select.onchange = (e) =>{
        myMap.destroy();
        for (let index = 0; index < e.target.children.length; index++) {
            e.target.children[index].removeAttribute('selected')
            
        }
        let item = e.target.selectedOptions[0]
        item.setAttribute('selected','')
        let newCoords = item.attributes.coordinates.value.split(',')
        let newZoom = item.attributes.zoom.value
        theMain.x = newCoords[0]
        theMain.y = newCoords[1]
        theMain.zoom = newZoom || theMain.zoom
        ymaps.ready(init);
    }

    options.forEach(el=>{
        el.onclick = (e)=>{
            e.target.parentNode.parentNode.classList.toggle("active")
            select.value= e.target.innerText
            select.innerText= e.target.innerText
            select.attributes.coordinates.value = e.target.attributes.coordinates.value
            select.attributes.zoom.value = e.target.attributes.zoom.value
            myMap.destroy();
            for (let index = 0; index < options.length; index++) {
                options[index].removeAttribute('selected')  
            }
            let item = e.target
            mainCityZoom = item.attributes.zoom.value
            item.setAttribute('selected','')
            setOption()
            theMain.x = getAtr(mainCity,0)
            theMain.y = getAtr(mainCity,1)
            theMain.zoom = mainCityZoom || theMain.zoom
            ymaps.ready(init);
        }
    })
    


    var NN = new ymaps.Placemark([56.2973,43.946], {   
        iconContent: '<div class="file-wrap">Комсомольская площадь, 2</div>',
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'assets/ntk.png',
        iconOffset: [-45.5,-90] ,
        iconImageSize: [91, 100],
        iconContentOffset:[-80,120],
        iconContentSize:[250]
    });
    var MOS = new ymaps.Placemark([55.7522,37.6156], {   
        iconContent: '<div class="file-wrap">Комсомольская площадь, 2</div>',
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'assets/ntk.png',
        iconOffset: [-45.5,-90] ,
        iconImageSize: [91, 100],
        iconContentOffset:[-80,120],
        iconContentSize:[250]
    });
    var KAZ = new ymaps.Placemark([55.7887, 49.1221], {   
        iconContent: '<div class="file-wrap">Комсомольская площадь, 2</div>',
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'assets/ntk.png',
        iconOffset: [-45.5,-90] ,
        iconImageSize: [91, 100],
        iconContentOffset:[-80,120],
        iconContentSize:[250]
    });
    var KRAS = new ymaps.Placemark([45.0448, 38.976], {   
        iconContent: '<div class="file-wrap">Красная улица, 132</div>',
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'assets/ntk.png',
        iconOffset: [-45.5,-90] ,
        iconImageSize: [91, 100],
        iconContentOffset:[-80,120],
        iconContentSize:[250]
    });
    myMap.geoObjects
        .add(NN)
        .add(MOS)
        .add(KAZ)
        .add(KRAS)
}
let fileState = {
    childTakeFile: document.querySelector(".form-inner__left-side__file"),
    childCollectFiles :document.querySelector(".form-inner__left-side__file-list") ,
    fileMass : [],
    newFileMass : [],
    childLayout: (e)=>{
        return `<p>${e}</p><span class="form-inner__left-side__file-list__trash" onclick="deleteItem(this)"><svg width="24" height="25" style="fill: transparent;"><use xlink:href="#trash"></use></svg></span>`
    },
}
fileState.childTakeFile.addEventListener("change", (e)=>{
    // check data and put it in arr
    // CHECkED
    for (let index = 0; index < e.target.files.length; index++) {
        if (fileState.fileMass.length > 0) {
            let flag = true
            for (let i = 0; i < fileState.fileMass.length; i++) {
                if (e.target.files[index].name === fileState.fileMass[i].name) {
                    flag = false
                }
            }
            if (flag) {
                fileState.fileMass.push(e.target.files[index])
            } 
        }else{
            fileState.fileMass.push(e.target.files[index])
        }
    }
    fileState.childTakeFile.files = new FileListItems(fileState.fileMass)
    // delete all list from HTML
    for (let index = 0; index < fileState.childCollectFiles.children.length; index++) {
        // fileState.childCollectFiles.children[index].remove()
    }
    // add to list HTML
    for (let index = 0; index < fileState.fileMass.length; index++) {
        let item = document.createElement('dd')
        item.classList.add("form-inner__left-side__file-list-item")
        // the name of file we can encrypt 
        item.setAttribute("ident", fileState.fileMass[index].name)
        let flag = false
        for (let i = 0; i < fileState.childCollectFiles.children.length; i++) {
            if (fileState.childCollectFiles.children[i].attributes.ident.value == fileState.fileMass[index].name) {
                flag = true
            }
        }
        if (!flag) {
            item.innerHTML = fileState.childLayout(fileState.fileMass[index].name)
            fileState.childCollectFiles.appendChild(item)
        }
        
 
    }
})
function deleteItem(e){
    
    let firstPromise = new Promise((resolve, reject) =>{
        let itemTitles = e.parentNode.childNodes[0].innerHTML
        let itemParent = e.parentNode
        if(itemParent && itemTitles) {
            
            
            let i = fileState.fileMass.find(function(item, index, array) {
                if (item.name !== itemTitles) {
                    fileState.newFileMass.push(item)
                }
                if (index == array.length - 1) {
                    return true
                }
            })
            if (i) {
                resolve(i)
            }
        }
        else{
            reject(new Error('Не существует элемента'))
        }
    })
    firstPromise.catch(
        e=>{
            console.log(e)
        }
    )
    firstPromise.then(
        resolve => {
            fileState.childTakeFile.files = new FileListItems(fileState.newFileMass)
            fileState.fileMass = fileState.newFileMass
            fileState.newFileMass = []
            e.parentNode.remove()
        }
    )
}
function FileListItems (files) {
    var b = new ClipboardEvent("").clipboardData || new DataTransfer()
    for (var i = 0, len = files.length; i<len; i++) {
        b.items.add(files[i])
    }
    return b.files
}

function getAtr (arr=null , atr=0) {
    if(arr == null ) {
        return false
    }
    return arr[atr]
}

function messageMake(arr=messageA , a, b=null){
    arr[a] = b
}
function errorF(label){
    if (document.querySelector(".error")) {
        document.querySelector(".error").innerHTML = label
    }else{
        let err = document.createElement("span")
        err.className = "error"
        err.innerHTML = label
        document.querySelector(".form-inner__left-side__check-err").appendChild(err)
    }
}
function deleteErr(){
    if (document.querySelector(".error")) {
        document.querySelector(".error").remove()
    }
}
let submitForm = document.querySelector(".form-submit");
submitForm.onclick = (event) =>{
    let messageA = {

    }
    let form = document.querySelector('.form')
    if (form.elements.agreement.checked) {
        let errMes = false
        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].name !== "submit" && form.elements[i].name !== "agreement") {
                if (form.elements[i].value && form.elements[i].value.length >0 && form.elements[i].name !== "file" ) {
                        messageMake(messageA,form.elements[i].name, form.elements[i].value)
                }else if(form.elements[i].name == "file") {
                    messageMake(messageA,form.elements[i].name, form.elements[i].files)
                }else{
                    errMes = true
                }

            }
        }
        if (errMes){
            errorF(`Заполните все поля`)
            return false
        }
        deleteErr()
        // ВЫПОЛНЕНА ОТПРАВКА
        console.log("ОТПРАВКА ДАННЫХ в виде объекта \n", messageA)
    }else{
        errorF('Нужно соглаиться с правилами или заполнить все поля, иначе форма не будет отправлена!')
    }
    event.preventDefault();         
    return false;

    
}