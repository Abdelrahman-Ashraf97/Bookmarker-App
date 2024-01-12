"use strict"
var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var siteList=[];
var site={};
var collector="";
var searhItems=[];
var updateindex=0;
if(localStorage.getItem("Site") !=null){
    siteList= JSON.parse (localStorage.getItem("Site"));
    displaySite(siteList);
}

document.getElementById("submitButton").addEventListener("click",function(){
    addSite();
})
document.getElementById("updateButton").addEventListener("click",function(){
    update();
})
document.getElementById("searchSite").addEventListener("input",function(e){
    searchSite(e.target.value)
})
function addSite(){
    if(validatename()==true &&validateUrl()==true){
        site={
            Name:siteNameInput.value,
            Url:siteUrlInput.value
         };
        //  validation if site name is already used and give alert.
         for(let i=0;i<siteList.length;i++){
            if( siteNameInput.value==siteList[i].Name){
                swal({
                    title: " repeated site Name",
                    icon: "warning",
                    button: "Ok got it"                      
                        
                        
                }
                
                )
                break;
            }}
           
     siteList.push(site);
     localStorage.setItem("Site",JSON.stringify(siteList) )
     displaySite(siteList);
     clearform ()
     siteNameInput.classList.remove("is-valid")
     siteUrlInput.classList.remove("is-valid")

            
      
     
      } 
      else if( validateUrl()!=true && validatename()==true){
        swal("URL MUST START WITH:","HTTP:// or ftp:// and ends with at least 2 character after dott'.' ")
      }
      else if(validatename()!=true &&validateUrl()!=true){
        swal("validation rules:", " url starts with HTTP:// or ftp:// and ends with at least 2 character after dott'.' & site name at least 3 character")


      }
    }
function clearform () {
siteNameInput.value="";
siteUrlInput.value="";

  }
function displaySite(arr){
    collector="";
    for(let i=0;i<arr.length;i++){
        collector+=`
        <tr>
        <td>${i}</td>
        <td> ${arr[i].Name}</td>
        <td> <button class="btn  btn-secondary" ><a href="${arr[i].Url}"  target="_blank"> <i class="fa-solid fa-eye pe-1"></i> Visit</a> </button></td>
        <td> <button onclick="setdata(${i})" class="btn  btn-warning" ><a> <i class="fa-solid fa-pen pe-1"></i> Update</a> </button></td>
        <td> <button onclick="deleteSite(${i})" class="btn  btn-danger" ><i class="fa-solid fa-trash pe-1"></i>Delete</a> </button></td>
        </tr>`

       
    }
    document.getElementById("tableBody").innerHTML=collector;

}
 






function deleteSite(index){
    siteList.splice(index,1);
    localStorage.setItem("Site",JSON.stringify(siteList) )

    displaySite(siteList);


}
function searchSite(term){
    
    searhItems=[];
    for(let i=0;i<siteList.length;i++){
        if(siteList[i].Name.toLowerCase().includes(term.toLowerCase())){
            document.querySelector(".container div:nth-child(2) input").classList.remove("is-invalid")
            document.querySelector(".container div:nth-child(2) input").classList.add("is-valid")
            document.querySelector(".container .search + p").classList.add("d-none")
            document.querySelector(".container .search + p").classList.remove("d-block")

            searhItems.push(siteList[i]);
        }
        else if(term==""){
            document.querySelector(".container .search + p").classList.add("d-none")
            document.querySelector(".container .search + p").classList.remove("d-block")
        }
        else{
            document.querySelector(".container div:nth-child(2) input").classList.add("is-invalid")
            document.querySelector(".container .search + p").classList.add("d-block")
            document.querySelector(".container .search + p").classList.remove("d-none")
        }
    }
    displaySite(searhItems);

    if(term==""){
        document.querySelector(".container div:nth-child(2) input").classList.remove("is-valid")
        

    }
    
}
function setdata(index){
    siteNameInput.value=siteList[index].Name;
    siteUrlInput.value=siteList[index].Url;
    document.getElementById("submitButton").classList.add("d-none"); 
    document.getElementById("updateButton").classList.remove("d-none");
    updateindex=index;
    

}
function update(){
    site={
        Name:siteNameInput.value,
        Url:siteUrlInput.value
     }
     if(validatename()==true &&validateUrl()==true){
        siteList.splice(updateindex,1,site);
        displaySite(siteList);
        localStorage.setItem("Site",JSON.stringify(siteList));
        clearform();
        document.getElementById("submitButton").classList.remove("d-none"); 
        document.getElementById("updateButton").classList.add("d-none");
       
         }
         else if( validateUrl()!=true && validatename()==true){
            swal("URL MUST START WITH:","HTTP:// or ftp:// and ends with at least 2 character after dott'.' ")
          }
          else if(validatename()!=true &&validateUrl()!=true){
            swal("validation rules:", " url starts with HTTP:// or ftp:// and ends with at least 2 character after dott'.' & site name at least 3 character")
    
    
          }
       
    
}
function validatename(){

    var regexName=/^[A-z]\w{2,}$/;
    if(regexName.test(siteNameInput.value)){
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
    }
    else{
        siteNameInput.classList.remove("is-valid")
        siteNameInput.classList.add("is-invalid")

    }
    return regexName.test(siteNameInput.value);

}
function validateUrl(){
    var regexUrl=/^(https?|ftp):\/\/[^\s\/$.?].[\S]*\.[^\s$.?]{2,}$/;
    if(regexUrl.test(siteUrlInput.value)){
        siteUrlInput.classList.add("is-valid")
        siteUrlInput.classList.remove("is-invalid")
        document.querySelector(".container input + p").classList.add("d-none")
        document.querySelector(".container  input + p").classList.remove("d-block")
    }
    else if(siteUrlInput.value==""){
        document.querySelector(".container input + p").classList.add("d-none")
        


    }
    else{
        siteUrlInput.classList.remove("is-valid")
        siteUrlInput.classList.add("is-invalid")
        document.querySelector(".container input + p").classList.add("d-block")
        document.querySelector(".container input + p").classList.remove("d-none")
        

        
    }
    return regexUrl.test(siteUrlInput.value);

}
