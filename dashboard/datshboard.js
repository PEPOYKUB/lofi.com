var settings = {
    "url": "https://misty-sheath-dress-wasp.cyclic.app/get",
    "method": "GET",
    "timeout": 0,
};

const tblBod = document.getElementById('tblBod')

$.ajax(settings).done(function (response) {
    response.forEach(element => {

        // สร้าง element tr (แถวในตาราง)
        const trElement = document.createElement('tr');

        // สร้าง element td (เซลล์ของข้อมูล)
        const tdFirstName = document.createElement('td');
        tdFirstName.textContent = element.Email;

        const tdLastName = document.createElement('td');
        tdLastName.textContent = element.Password;

        const tdDeleteButton = document.createElement('td');
        const deleteForm = document.createElement('form');
        deleteForm.action = '/datshboard.html';
        deleteForm.method = 'get';

        const deleteButton = document.createElement('button');
        deleteButton.type = 'submit';
        deleteButton.name = 'Email';
        deleteButton.value = element.Email;
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'ลบข้อมูล';

        deleteForm.appendChild(deleteButton);
        tdDeleteButton.appendChild(deleteForm);

        // นำเอาเซลล์ของข้อมูลมาต่อกันในแถวเดียว
        trElement.appendChild(tdFirstName);
        trElement.appendChild(tdLastName);
        trElement.appendChild(tdDeleteButton);

        // เพิ่มแถวลงในตารางที่มี id="tblBod"
        const tableBody = document.getElementById('tblBod');
        tableBody.appendChild(trElement);


    });
});

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

if (urlParams.get('Email') !== null) {

    var delSetting = {
        "url": `https://misty-sheath-dress-wasp.cyclic.app/delete/?email=${urlParams.get('Email')}`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(delSetting).done(function (response) {
        console.log(response);
        setTimeout(() => {
            window.location = '/datshboard.html'
        }, 2000)
    });

}

function addUser() {
    const Email = $("#Email")
    const Password = $("#Password")

    var settings = {
        "url": `https://misty-sheath-dress-wasp.cyclic.app/insert/?email=${Email.val()},&password=${Password.val()}`,
        "method": "POST",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.Status == 400){
            alert("มีอีเมลนี้แล้ว")
        }else{
            window.location = '/datshboard.html'
        }
    });
}