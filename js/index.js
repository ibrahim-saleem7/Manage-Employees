let formAdd = document.forms.add
let formEdit = document.forms.edit
let tbody = document.querySelector('tbody')
let table = document.querySelector('table')
let alertEle = document.querySelectorAll('.alert')
let employees =[]

function loodData(){
    employees = JSON.parse(localStorage.getItem("Employees")) ?? []
    createTable()
}

loodData()

function createTable(){

    tbody.innerHTML =""
    for(let i = 0; i < employees?.length ; i++) {
        let tr = document.createElement('tr')
        tr.innerHTML = 
        `
        <th scope="row">${i+1}</th>
        <td class="name">${employees[i].name}</td>
        <td class="date">${employees[i].date}</td>
        <td class="skllis">${employees[i].skllis}</td>
        <td class="d-flex justify-content-around align-items-center">
            <div>
                <button class='arrow arrowUp'  onclick="up(${i})"> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
                </button>
                <button class='arrow arrowDown'  onclick="down(${i})"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                </button>
            </div>
            <div>
                <button class="btn btn-success" onclick="dataEmployee('${i}')" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="dataEmployee('${i}')">delete</button>
            </div>
        </td>
        `
        
        tbody.appendChild(tr)
    }
    let arrowUp = document.querySelectorAll('.arrowUp')
    let arrowDown = document.querySelectorAll('.arrowDown')
    arrowUp[0]?.setAttribute("disabled" ,true)
    arrowDown[arrowDown.length-1]?.setAttribute("disabled" , true)
}

function alertMassage(massage,type,className){
    alertEle[type].classList.add(className)
    alertEle[type].classList.remove('d-none')
    alertEle[type].innerHTML=` ${massage} `
    setTimeout(()=>{
        alertEle[type].classList.add('d-none')
        alertEle[type].classList.remove(className)
    },3000)
}

let dbEmployees = []
function addEmploy(){
    if (validation(formAdd) == true) {
        if(cheackEmpolyee(formAdd.name.value.trim()) === false){
            let model = {
                "name": formAdd.name.value.trim(),
                "date": formAdd.date.value,
                "skllis": formAdd.skllis.value.trim(),
            }
            dbEmployees = [...employees , model]
            window.localStorage.setItem("Employees", JSON.stringify(dbEmployees))
            alertMassage("Success Add Employee",0, 'alert-success')
            loodData()
        } else {
            alertMassage("This Employee Has Already Been Added",0,'alert-danger')
        }
    }else{
        alertMassage("Please Enter Data " , 0 , "alert-danger")
    }
}

function deleteEmployee(){
    employees.splice(indexEmployee , 1)
    dbEmployees = [...employees]
    localStorage.setItem("Employees" , JSON.stringify(dbEmployees))
    loodData()
    alertMassage("Success Delete Employee" , 1 ,'alert-success')

} 

let infoEmployee
let indexEmployee
function dataEmployee(index){
            infoEmployee  = employees[index]
            indexEmployee = index
            formEdit.name.value   = employees[index]?.name;
            formEdit.date.value   = employees[index]?.date;
            formEdit.skllis.value = employees[index]?.skllis
}

function editEmployee(){
    
    if(validation(formEdit) == true) {
        let model = {
            "name": formEdit.name.value.trim(),
            "date": formEdit.date.value,
            "skllis": formEdit.skllis.value.trim(),
        }
        employees[indexEmployee] = model;
        dbEmployees = [...employees]
        localStorage.setItem("Employees" , JSON.stringify(dbEmployees))
        loodData()
        alertMassage("Success Edit Employee" , 2 ,'alert-success')
    }else {
        alertMassage("Invalid Data " , 2 ,'alert-danger')
    }
}

function up(i){
    [employees[i] , employees[i-1]] = [employees[i-1] , employees[i]]
    createTable()
}

function down(i){
    [employees[i] , employees[i+1]] = [employees[i+1] , employees[i]]
    createTable()
}

function cheackEmpolyee(name){
    let cheack
    cheack = employees?.some((e)=>{
        return e.name ==  name
    })
    return cheack
}

function validation(form){
    let name   = false,
        date   = false,
        skllis = false,
        valid  = false;

    form.name.value.trim() != "" && form.name.value.trim().length > 2 ? name =true : name =false

    form.date.value != "" ? date =true : date =false

    form.skllis.value.trim() != "" && form.skllis.value.trim().length > 2 ? skllis =true : skllis =false

    valid = ( name === false || date === false|| skllis=== false ) ? false : true;
    return valid
}
