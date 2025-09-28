const closeButton = document.getElementById('closeBtn')
const C_closeButton = document.getElementById('C-closeBtn')
const M_closeButton = document.getElementById('M-closeBtn')
const defilter = document.getElementById('defilter')
const addButton = document.getElementById('add')
const addFormat = document.getElementById('addformat')
const addCat= document.getElementById('addcat')
const form = document.getElementById('form')
const mAdd = document.getElementById('m-add')
const cAdd = document.getElementById('C-add')
const submit = document.getElementById('send')
const Csubmit = document.getElementById('Csend')
const msubmit = document.getElementById('msend')
//Variables
const mediaForm = document.getElementById('media')
const category = document.getElementById('category') 
const pricing = document.getElementById('price') 
const amount = document.getElementById('amount') 
const Productname = document.getElementById('name') 
const mName = document.getElementById('mName') 
const cName = document.getElementById('cName') 
const searchBar = document.getElementById('searchBar') 

//display
const showCat = document.getElementById('categories')
const showFormat = document.getElementById('formats')
const container = document.getElementById('container')
const MODEL ={
   categories:[],
    media :[],
    products : []
}
const productModel = {
    prodName:'',
    prodPrice:'',
    prodCurrency:'',
    prodCat:'',
    prodFormat:''
}

// Dark mode toggle
const toggleDark = document.getElementById("toggleDark");
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleDark.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

searchBar.addEventListener('input',(e)=>{
     e.preventDefault()
            
            if(sessionStorage.getItem('filter')){
                const filter = JSON.parse(sessionStorage.getItem('filter'))
                filter.z = searchBar.value
                sessionStorage.setItem('filter',JSON.stringify(filter))
                if(searchBar.value =='') { 
                        location.reload()
                return } 
                showProduct(filter)

            }
            else{
                const filter ={
                    x:'',
                    y:'',
                    z:searchBar.value,
                    timeStamp:Date.now()
                }
                sessionStorage.setItem('filter',JSON.stringify(filter))
                if(searchBar.value =='') {
                
location.reload()
                return } 
                showProduct(filter)
            }
})

addCat.addEventListener('click',(e)=>{
    e.preventDefault()
    cAdd.style.display="inline-flex"
})
addFormat.addEventListener('click',(e)=>{
    e.preventDefault()
    mAdd.style.display="inline-flex"
})

defilter.addEventListener('click',(e)=>{
    e.preventDefault()
    sessionStorage.removeItem('filter')
    container.innerHTML=""
    location.reload()
})
addButton.addEventListener('click',(e)=>{
    e.preventDefault()
    form.style.display="inline-flex"
      const userTyping = {
        Productname: Productname.value,
        pricing: pricing.value,
        amount: amount.value,
        category: category.value,
        mediaForm: mediaForm.value
    }
  console.log(JSON.stringify(userTyping))
    
    if(!userTyping.Productname||!userTyping.pricing||!userTyping.amount||!userTyping.category||!userTyping.mediaForm){
        const data = JSON.parse(sessionStorage.getItem('active'))
        Productname.value = data.Productname
        pricing.value = data.pricing
        amount.value = data.amount
        category.value = data.category
        mediaForm.value = data.mediaForm
    }

})
closeButton.addEventListener('click',(e)=>{
    e.preventDefault()
        form.style.display="none"
})
C_closeButton.addEventListener('click',(e)=>{
    e.preventDefault()
        cAdd.style.display="none"
})
M_closeButton.addEventListener('click',(e)=>{
    e.preventDefault()
        mAdd.style.display="none"
})
submit.addEventListener('click',(e)=>{
    e.preventDefault()
    DataAdd()
})
Csubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    CAdding()
})
msubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    Madding()
})

document.getElementById('fashion').addEventListener('click',(e)=>{
     e.preventDefault()
            console.log('fashion')
            if(sessionStorage.getItem('filter')){
                const filter = JSON.parse(sessionStorage.getItem('filter'))
                filter.x = 'fashion'
                sessionStorage.setItem('filter',JSON.stringify(filter))
                showProduct(filter)
            }
            else{
                const filter ={
                    x:'fashion',
                    y:'',
                    z:'',
              timeStamp:Date.now()
                }
                sessionStorage.setItem('filter',JSON.stringify(filter))
                showProduct(filter)
            }
        })
    

document.getElementById('video').addEventListener('click',(e)=>{
     e.preventDefault()
            console.log('video')
            if(sessionStorage.getItem('filter')){
                const filter = JSON.parse(sessionStorage.getItem('filter'))
                filter.y = 'video'
                sessionStorage.setItem('filter',JSON.stringify(filter))
                showProduct(filter)
            }
            else{
                const filter ={
                    x:'',
                    y:'video',
                    z:'',
                    timeStamp:Date.now()
                }
                sessionStorage.setItem('filter',JSON.stringify(filter))
                showProduct(filter)
            }

})


function DataAdd(){
    
    const userTyping = {
        Productname: Productname.value,
        pricing: pricing.value,
        amount: amount.value,
        category: category.value,
        mediaForm: mediaForm.value
    }
  console.log(JSON.stringify(userTyping))
    
    if(!userTyping.Productname||!userTyping.pricing||!userTyping.amount||!userTyping.category||!userTyping.mediaForm){
        return alert('enter data')
    }
      sessionStorage.setItem('active',JSON.stringify(userTyping))
    
    if(userTyping.category=="new"){
        cAdd.style.display="inline-flex"
        
       return 
    }
    if(userTyping.category=="default"){
        return alert("select Category")
    }
    if(userTyping.mediaForm=="new"){
        mAdd.style.display="inline-flex"
        
       return 
    }
    if(userTyping.mediaForm=="default"){
        return alert("select media")
    }

    const data = JSON.parse(sessionStorage.getItem('appData'))
    if(data){
        const product = {
    prodName:userTyping.Productname,
    prodPrice:userTyping.amount,
    prodCurrency:userTyping.pricing,
    prodCat:userTyping.category,
    prodFormat:userTyping.mediaForm
} 
data.products.push(JSON.stringify(product))
sessionStorage.setItem('appData',JSON.stringify(data))
 const make = document.createElement('div')
                    make.id=product.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${userTyping.Productname}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${userTyping.pricing}</span>
                    <span>${userTyping.amount}</span>
                    </label>
                    <span>#${userTyping.category}</span>
                    `
                    container.append(make)
        
    }
    else{

        const product = {
    prodName:userTyping.Productname,
    prodPrice:userTyping.amount,
    prodCurrency:userTyping.pricing,
    prodCat:userTyping.category,
    prodFormat:userTyping.mediaForm
} 
MODEL.products.push(JSON.stringify(product))
sessionStorage.setItem('appData',JSON.stringify(MODEL))
 const make = document.createElement('div')
                    make.id=product.prodName
                    make.className="allProducts"
                     make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${userTyping.Productname}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${userTyping.pricing}</span>
                    <span>${userTyping.amount}</span>
                    </label>
                    <span>#${userTyping.category}</span>
                    `
                    container.append(make)
    }
}
function CAdding(){
    if(!cName.value) return alert('enter category name')
if(!sessionStorage.getItem('appData')){
    MODEL.categories.push(cName.value)
    sessionStorage.setItem('appData',JSON.stringify(MODEL))
}
else{
    const data = JSON.parse(sessionStorage.getItem('appData'))
   
    data.categories.push(cName.value)
    const saveas ={
         categories:data.categories,
    media :data.media,
    products : data.products
    }
    sessionStorage.setItem('appData',JSON.stringify(saveas))
    location.reload()
}
}
function Madding(){
 if(!mName.value) return alert('enter media name')
if(!sessionStorage.getItem('appData')){
    MODEL.media.push(mName.value)
    sessionStorage.setItem('appData',JSON.stringify(MODEL))
}
else{
    const data = JSON.parse(sessionStorage.getItem('appData'))
    
    data.media.push(mName.value)
    const saveas ={
         categories:data.categories,
    media :data.media,
    products : data.products
    }
    sessionStorage.setItem('appData',JSON.stringify(saveas))
    location.reload()
}
}
function population(){
   
    if(!sessionStorage.getItem('appData')){
        
                    const make = document.createElement('h1')
                    make.textContent = "Making Biscuits is hard "
                    container.append(make)
                
        return} 
        const data = JSON.parse(sessionStorage.getItem('appData'))
    //categories
    data.categories.forEach(element => {
        const make = document.createElement('option')
        const item = document.createElement('button')
        item.textContent=element
        item.id=element
        item.className="sort"
        make.value=element
        make.textContent=element
        category.append(make)
        showCat.append(item)
        item.addEventListener('click',(e)=>{
            e.preventDefault()
            console.log(item.id)
            if(sessionStorage.getItem('filter')){
                const filter = JSON.parse(sessionStorage.getItem('filter'))
                filter.x = item.id
                sessionStorage.setItem('filter',JSON.stringify(filter))
                showProduct(filter)
            }
            else{
                const filter ={
                    x:item.id,
                    y:'',
                    z:'',
                    timeStamp:Date.now()
                }
                sessionStorage.setItem('filter',JSON.stringify(filter))
                showProduct(filter)
            }
        })
    });
    data.media.forEach(element => {
        const make = document.createElement('option')
        const item = document.createElement('button')
        item.textContent=element
        item.id=element
        item.className="sort"
        make.value=element
        make.textContent=element
        mediaForm.append(make)
        showFormat.append(item)

        item.addEventListener('click',(e)=>{
            e.preventDefault()
            console.log(item.id)
            if(sessionStorage.getItem('filter')){
                const filter = JSON.parse(sessionStorage.getItem('filter'))
                filter.y = item.id
                sessionStorage.setItem('filter',JSON.stringify(filter))
                showProduct(filter)
            }
            else{
                const filter ={
                    x:'',
                    y:item.id,
                    z:'',
                    timeStamp:Date.now()
                }
                sessionStorage.setItem('filter',JSON.stringify(filter))
                showProduct(filter)
            }
        })
    });
    if(!data.products){
        
                    const make = document.createElement('h1')
                    make.textContent = "404 Content not found"
                    container.append(make)
              
    }

    data.products.forEach(element => {
                const dataref = JSON.parse(element)
                
                    const make = document.createElement('div')
                    make.id=dataref.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${dataref.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${dataref.prodCurrency}</span>
                    <span>${dataref.prodPrice}</span>
                    </label>
                    <span>#${dataref.prodCat}</span>
                    `
                    container.append(make)
                
            })

}
function showProduct(item={x,y,z}){
    console.log(item)
    const referenceData = JSON.parse(sessionStorage.getItem('appData'))
    if (!referenceData) return alert('no data')
    if (!referenceData.products) return alert('no data')
    if (item.z){
        const searching = []
        referenceData.products.forEach(element => {
            const data = JSON.parse(element)
            if(data.prodName.toLowerCase().includes(item.z.toLowerCase())){
                searching.push(data)
            }    
        });
        if(searching==''){
                container.innerHTML=''
                const make = document.createElement('h1')
                    make.textContent = "No data found"
                    container.append(make)
                if (sessionStorage.getItem('filter')){
                    const remove = JSON.parse(sessionStorage.getItem('filter'))
                    remove.z = ''
                    sessionStorage.setItem('filter',JSON.stringify(remove))
                }
                return
                        }
                        container.innerHTML=''
        searching.forEach(element => {
             const make = document.createElement('div')
                    make.id=element.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${element.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${element.prodCurrency}</span>
                    <span>${element.prodPrice}</span>
                    </label>
                    <span>#${element.prodCat}</span>
                    `
                    container.append(make)
        });

        if(item.x || item.y){
            if (item.x&&item.y){
            container.innerHTML=""
            searching.forEach(element => {
                const data = element
                if(data.prodCat == item.x && data.prodFormat == item.y){
                    const make = document.createElement('div')
                    make.id=data.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${data.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${data.prodCurrency}</span>
                    <span>${data.prodPrice}</span>
                    </label>
                    <span>#${data.prodCat}</span>
                    `
                    container.append(make)
                }
                
            });
            return
        }
            if (item.x&&!item.y){
            container.innerHTML=""
             searching.forEach(element => {
                const data = element
                if(data.prodCat == item.x ){
                    const make = document.createElement('div')
                    make.id=data.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${data.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${data.prodCurrency}</span>
                    <span>${data.prodPrice}</span>
                    </label>
                    <span>#${data.prodCat}</span>
                    `
                    container.append(make)
                }
                
            });
            return
        }
            if (!item.x&&item.y){
            container.innerHTML=""
             searching.products.forEach(element => {
                const data = element
                if(data.prodFormat == item.y){
                    const make = document.createElement('div')
                    make.id=data.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${data.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${data.prodCurrency}</span>
                    <span>${data.prodPrice}</span>
                    </label>
                    <span>#${data.prodCat}</span>
                    `
                    container.append(make)
                }
                
            });
            return
        }
        }
        return
    }
        if (!item.x&&!item.y) return alert('error: server error')
        /* if (item.x&&item.y){
            container.innerHTML=""
            referenceData.products.forEach(element => {
                const data = JSON.parse(element)
                if(data.prodCat != item.x && data.prodFormat != item.y){
                    
                    const make = document.createElement('h1')
                    make.textContent = "404 Content not found"
                    container.append(make)
                }

                
            });
            return
        } */
        if (item.x&&item.y){
            container.innerHTML=""
            referenceData.products.forEach(element => {
                const data = JSON.parse(element)
                if(data.prodCat == item.x && data.prodFormat == item.y){
                    const make = document.createElement('div')
                    make.id=data.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${data.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${data.prodCurrency}</span>
                    <span>${data.prodPrice}</span>
                    </label>
                    <span>#${data.prodCat}</span>
                    `
                    container.append(make)
                }
                
            });
            return
        }
        if (!item.x&&item.y){
            container.innerHTML=""
             referenceData.products.forEach(element => {
                const data = JSON.parse(element)
                if(data.prodFormat == item.y){
                    const make = document.createElement('div')
                    make.id=data.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${data.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${data.prodCurrency}</span>
                    <span>${data.prodPrice}</span>
                    </label>
                    <span>#${data.prodCat}</span>
                    `
                    container.append(make)
                }
                
            });
            return
        }
        if (item.x&&!item.y){
            container.innerHTML=""
             referenceData.products.forEach(element => {
                const data = JSON.parse(element)
                if(data.prodCat == item.x ){
                    const make = document.createElement('div')
                    make.id=data.prodName
                    make.className="allProducts"
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${data.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${data.prodCurrency}</span>
                    <span>${data.prodPrice}</span>
                    </label>
                    <span>#${data.prodCat}</span>
                    `
                    container.append(make)
                }
                
            });
            return
        }
        else{
                    const make = document.createElement('h1')
                    make.textContent = "No products"
                    container.append(make)
                }
}

/* function searching(x){
    const referenceData = JSON.parse(sessionStorage.getItem('appData'))
    if(!referenceData){
        const make = document.createElement('h1')
                    make.textContent = "No products"
                    container.append(make)

        return
    }
    const searchValue = x;
     container.innerHTML=""
             referenceData.products.forEach(element => {
                const data = JSON.parse(element)
                if(data.Productname.inlcudes(searchValue)){
                    const make = document.createElement('div')
                    make.id=data.prodName
                    make.className="allProducts".search
                    make.innerHTML=`
                    <label>
                    <span>Name:</span>
                    <span>${data.prodName}</span>
                    </label>
                     <label>
                    <span>Price:</span>
                    <span>${data.prodCurrency}</span>
                    <span>${data.prodPrice}</span>
                    </label>
                    <span>#${data.prodCat}</span>
                    `
                    container.append(make)
                }
                
            });
    sessionStorage.setItem('searchValue',searchValue)
    
}
function algorithm(item1={x,y,z}){}
 */
document.addEventListener('DOMContentLoaded',()=>{
    population()
})