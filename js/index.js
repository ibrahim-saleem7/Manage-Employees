let formAdd = document.forms.add
let formEdit = document.forms.edit
let tbody = document.querySelector('tbody')
let table = document.querySelector('table')
let alertEle = document.querySelectorAll('.alert')
let employees =[]



Array.prototype.move = function(from,to){
    this.splice(to,0,this.splice(from,1)[0]);
    return this;
};

function loodData(){
    employees.splice(0 ,employees.length )
    Object.keys(localStorage).forEach((key) => {
        employees.push(JSON.parse(localStorage[key]))
    });
    createTable()
}

loodData()

function createTable(){
    
    tbody.innerHTML =""
    for(let i = 0; i < employees.length ; i++) {
        let tr = document.createElement('tr')
        tr.innerHTML = 
        `
        <th scope="row">${i+1}</th>
        <td class="name">${employees[i].name}</td>
        <td class="date">${employees[i].date}</td>
        <td class="skllis">${employees[i].skllis}</td>
        <td class="d-flex justify-content-around align-items-center">
            <div><span onclick="getIndex(${i}),up()">&uarr;</span> <span onclick="getIndex(${i}),down()">&darr;</span> </div>
            <div> <button class="btn btn-success" onclick="getId('${employees[i].id}'),dataEmployee()" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button> <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="getId('${employees[i].id}')">delete</button></div>
            </td>
        `
        tbody.appendChild(tr)
    }
}

function addEmploy(){
    let name = false;
    let date = false;
    let skllis = false;
    if (formAdd.name.value != "" && formAdd.name.value.length > 2){
        name =true
    }

    if (formAdd.date.value != "" ){
        date =true
    }

    if (formAdd.skllis.value != "" && formAdd.name.value.length > 2){
        skllis =true
    }

    if(name === false || date === false|| skllis=== false){
        alertMassage("Please Enter Data " , 0 , "alert-danger")

    }else{
        if(cheackEmpolyee(formAdd.name.value) === false){

            let model = {
                "id" : formAdd.name.value.trim(),
                "name": formAdd.name.value.trim(),
                "date": formAdd.date.value.trim(),
                "skllis": formAdd.skllis.value.trim(),
            }
            
            window.localStorage.setItem(formAdd.name.value, JSON.stringify(model))
            alertMassage("Success Add Employee",0, 'alert-success')
            loodData()

        }else{
            alertMassage("This Employee Has Already Been Added",0,'alert-danger')
        }
        
    }
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

let idEmployee
function getId(id){
    idEmployee = id
}

function deleteEmployee(){
    localStorage.removeItem(idEmployee)
    loodData()
    alertMassage("Success Delete Employee" , 1 ,'alert-success')

} 

let infoEmployee
function dataEmployee(){
    infoEmployee = JSON.parse(localStorage.getItem(idEmployee)) 
    formEdit.name.value = infoEmployee.name;
    formEdit.date.value  = infoEmployee.date;
    formEdit.skllis.value= infoEmployee.skllis
}

function editEmployee(){
    let model = {
        "id" : infoEmployee.id,
        "name": formEdit.name.value.trim(),
        "date": formEdit.date.value.trim(),
        "skllis": formEdit.skllis.value.trim(),
    }
    localStorage.setItem(infoEmployee.id , JSON.stringify(model))
    loodData()
    alertMassage("Success Edit Employee" , 2 ,'alert-success')
}

let index 
function getIndex(i){
    index = i
}

function up(){
    employees.move(index ,index-1).join(',')
    createTable()
}

function down(){
    employees.move(index ,index+1).join(',')
    createTable()
}

function cheackEmpolyee(name){
    let cheack
    cheack = employees.some((e)=>{
        return e.name ==  name
    })
    return cheack
}


