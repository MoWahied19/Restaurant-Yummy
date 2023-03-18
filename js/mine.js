let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

// ================================== document ready ===============================================================
$(document).ready(() => {
    searchname("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
// ================================== document ready done ===============================================================

// ================================== navbar ===============================================================


function opennav() {

    $(".side-nav-menu").animate({left: 0}, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: 0}, (i + 5) * 100)
}
}

function closenav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({left: -boxWidth}, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({top: 300}, 500)
}

closenav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closenav()
    } else {
        opennav()
    }
})

// ================================== navbar ===============================================================





// ================================== show as defoult ===============================================================


function showMeals(array)
{
    let = hasala = ""
    for(let i = 0 ; i < array.length ; i++ )
    {
        hasala += `
        <div class="col-md-3">
        <div onclick="mealdetail('${array[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${array[i].strMealThumb}" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${array[i].strMeal}</h3>
            </div>
        </div>
        </div>
        `
   
      

    }
    rowData.innerHTML = hasala

}

// ================================== get data categories  ===============================================================


async function fetchcategories()
{
    rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(500)
  searchContainer.innerHTML = "";



  let datacat = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

  let apicat = await datacat.json()



// ================================== display categories  ===============================================================


  displaycat(apicat.categories)
  $(".inner-loading-screen").fadeOut(500)

}


function displaycat(arrayofcat)
{
  let hasala = ``

  for( let i = 0 ; i < arrayofcat.length ; i++ )
  {
    hasala += 

    `
    <div class="col-md-3">
    <div onclick="fetchcatmeals('${arrayofcat[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${arrayofcat[i].strCategoryThumb}" alt="" srcset="">
        <div class="meal-layer position-absolute text-center text-black p-2">
            <h3>${arrayofcat[i].strCategory}</h3>
            <p>${arrayofcat[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>
</div>

    `

  }

  rowData.innerHTML = hasala

}

// ================================== display categories meals  ===============================================================

async function fetchcatmeals(category)
{
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500)

    let datameal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
   let apimeals = await datameal.json()

   showMeals(apimeals.meals.slice(0, 20))

    $(".inner-loading-screen").fadeOut(300)

}

// ================================== get data area  ===============================================================


async function getarea()
{
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500)
    searchContainer.innerHTML = "";


    let areadata = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)

    let apiarea = await areadata.json()

    showarea(apiarea.meals)
    $(".inner-loading-screen").fadeOut(500)


}

// ================================== display area  ===============================================================

function showarea(arr)
{
    let hasala = ""
    for( let i = 0 ; i < arr.length ; i++)
    {
        hasala += 
        `
        <div class="col-md-3">
        <div onclick="makanmeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
        </div>
        </div>
        `
    }

    rowData.innerHTML = hasala

}

// ================================== display area meals  ===============================================================


async function makanmeals(area)
{
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500)

    let dataarea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let apiareaofmakan = await dataarea.json()

    let numberofarea = apiareaofmakan.meals.slice(0, 20)

    showMeals(numberofarea)
    $(".inner-loading-screen").fadeOut(500)

}

// ================================== get data ingredients  ===============================================================

async function fetchingredients()
{
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500)
    searchContainer.innerHTML = "";


    let dataingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)

   let apiingredients = await dataingredients.json()


   showingredients(apiingredients.meals.slice(0, 20))
   console.log(apiingredients.meals.slice(0, 20));
        $(".inner-loading-screen").fadeOut(500)
}

// ================================== display ingredients  ===============================================================


function showingredients(arr)
{
    let hasala = "";

    for (let i = 0; i < arr.length; i++) {
        hasala += `
        <div class="col-md-3">
                <div onclick="compingredientsmeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
}

rowData.innerHTML = hasala

}

// ================================== display ingredients meals  ===============================================================

async function compingredientsmeals(ingredients)
{
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500)

    let ingredientsmeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let apiingredientsmeals = await ingredientsmeals.json()


    showMeals(apiingredientsmeals.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(500)

}

// ================================== get detail id of meals  ===============================================================


async function mealdetail(id)
{
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500)
    searchContainer.innerHTML = "";


    let datadis = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    apiid = await datadis.json();


    displaymeal(apiid.meals[0])
    console.log(apiid.meals[0]);

    $(".inner-loading-screen").fadeOut(500)
}

// ================================== display details meals  ===============================================================


function displaymeal(meal) 
{
    
    searchContainer.innerHTML = "";
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) 
        {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }


    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let hasala = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = hasala
}


// ================================== display Search meals  ===============================================================

function searchinput() 
{
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchname(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchcharacter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

// ================================== display Search by name of meals  ===============================================================

async function searchname(name)
{
    closenav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500)
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    response.meals ? showMeals(response.meals) : showMeals([])
    $(".inner-loading-screen").fadeOut(500)
}

// ================================== display Search by character or latter of meals  ===============================================================

async function searchcharacter(charat) 
{
    closenav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(500)

    charat == "" ? charat = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${charat}`)
    response = await response.json()

    response.meals ? showMeals(response.meals) : showMeals([])
    $(".inner-loading-screen").fadeOut(500)

}


// ================================== display Contacts  ===============================================================

function displayContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="namewrong" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailwrong" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phonewrong" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="agewrong" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6 position-relative">
                <input  id="password" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <span class="icon">
                <i id="eyee"  onclick="eyeupp()" class="fa-solid fa-eye d-block"></i>
                <i id="eyee_slash" onclick="eyeslashupp()" class="fa-solid fa-eye-slash d-none"></i>
                </span>
                <div id="passwordwrong" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6 position-relative">
                <input  id="repassword" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <span class="icon">
                <i id="eye"  onclick="eyeup()" class="fa-solid fa-eye d-block"></i>
                <i id="eye_slash" onclick="eyeslashup()" class="fa-solid fa-eye-slash d-none"></i>
                </span>
                <div id="repasswordwrong" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        <div id="done" class="text-success " >Done</dive>




    </div>
</div> `
    submitBtn = document.getElementById("submit")


    document.getElementById("name").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("email").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phone").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("age").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("password").addEventListener("focus", () => {

        passwordInputTouched = true

        // eyeupp()
        // eyeslashupp()


    })

    document.getElementById("repassword").addEventListener("focus", () => {

        repasswordInputTouched = true

        // eyeup()
        // eyeslashup()


    })
}

// ================================== display eye in password  and  repassword ===============================================================


function eyeup()
{

    var rePassword =  document.querySelector("#repassword");




    var eye = document.querySelector("#eye");
    var eye_slash = document.querySelector("#eye_slash");


    if(  rePassword.type = "Password")
    {
        rePassword.type ="text"
        eye.classList.replace("d-block" , "d-none")
        eye_slash.classList.replace("d-none" , "d-block" )
        
    }
    else 
    {
        rePassword.type ="Password"
        eye.classList.replace("d-none" , "d-block" )
        eye_slash.classList.replace("d-block" , "d-none")

    }
}


function eyeslashup()
{

    var rePassword =  document.querySelector("#repassword");


    var eye = document.querySelector("#eye");
    var eye_slash = document.querySelector("#eye_slash");


    if(  rePassword.type = "text" )
    {
        rePassword.type = "Password"
        eye.classList.replace("d-none" , "d-block" )
        eye_slash.classList.replace("d-block" , "d-none")

    }
    else 
    {

        rePassword.type ="text"
        eye.classList.replace("d-block" , "d-none")
        eye_slash.classList.replace("d-none" , "d-block" )

    }
}


function eyeupp()
{

    var Password =  document.querySelector("#password");




    var eye = document.querySelector("#eyee");
    var eye_slash = document.querySelector("#eyee_slash");


    if(  Password.type = "Password"     )
    {
        Password.type ="text"
        eye.classList.replace("d-block" , "d-none")
        eye_slash.classList.replace("d-none" , "d-block" )
        
    }
    else 
    {
        Password.type ="Password"
        eye.classList.replace("d-none" , "d-block" )
        eye_slash.classList.replace("d-block" , "d-none")

    }
}


function eyeslashupp()
{

    var Password =  document.querySelector("#password");

    var eye = document.querySelector("#eyee");
    var eye_slash = document.querySelector("#eyee_slash");


    if(  Password.type = "text" )
    {
        Password.type = "Password"
        eye.classList.replace("d-none" , "d-block" )
        eye_slash.classList.replace("d-block" , "d-none")

    }
    else 
    {

        rePassword.type ="text"
        eye.classList.replace("d-block" , "d-none")
        eye_slash.classList.replace("d-none" , "d-block" )

    }
}

// ================================== clear all input ===============================================================


function clear(){
    let name = document.getElementById("name")
    let email = document.getElementById("email")
    let phone =  document.getElementById("phone")
    let age =  document.getElementById("age")
    let password = document.getElementById("password")  
    let repassword =  document.getElementById("repassword")


    name.value =""
    email.value =""
    phone.value =""
    age.value=""
    password.value=""
    repassword.value=""
    
}

// ================================== inputsValidation ===============================================================

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("namewrong").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("namewrong").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailwrong").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailwrong").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phonewrong").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phonewrong").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("agewrong").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("agewrong").classList.replace("d-none", "d-block")

        }
    }    


    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordwrong").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordwrong").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordwrong").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordwrong").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) 
    {
        submitBtn.removeAttribute("disabled")

        
    document.getElementById("submit").addEventListener("click"  , function()
     {
        clear()

        document.querySelector("#done").classList.replace("d-none" , "d-block")

        $("#done").toggle(1000)
        $("#done").fadeOut(1000)

     })



  
        
 

    } 

    else {
        submitBtn.setAttribute("disabled", true)

        
    }
}

// ================================== rajax ===============================================================


function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("name").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

function repasswordValidation() {
    return document.getElementById("repassword").value == document.getElementById("password").value
}



