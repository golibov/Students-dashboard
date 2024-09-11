function addNewStudentBtn() {
    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="w-[470px] h-[550px] bg-white rounded-[20px] text-center flex flex-col justify-center shadow-inputShadow p-6">
            <label for="rasmTanlash" class="cursor-pointer flex justify-center items-center mx-auto w-[90px] h-[90px] rounded-full bg-gray-100">
                <img id="previewImage" src="./images/enter-img.svg" alt="enter-image" width="90" height="90">
            </label>
            <input type="file" id="rasmTanlash"  required accept="image/*" class="hidden">
            <input id="name" autocomplete="off" required class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="text" placeholder="Enter your name">
            <input id="email" autocomplete="off" required class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="email" placeholder="Enter your email">
            <input maxlength="10" minlength="10" required id="phone" autocomplete="off" class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="number" placeholder="Enter your phone">
            <input id="EnrollNumber" autocomplete="off" required class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="text" placeholder="Enroll Number">
            <input id="admissionDate" autocomplete="off" required class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="text" placeholder="Date of admission (e.g., 25-Dec-2006)">
            
            <div class="flex gap-[10px] mt-[10px] justify-center">
                <button onclick="add()" class="bg-[#FEAF00] text-white rounded-[4px] px-[20px] py-[10px]">Add</button>
                <button onclick="closeModal()" class="bg-gray-500 text-white rounded-[4px] px-[20px] py-[10px]">Close</button>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');

    const fileInput = document.getElementById('rasmTanlash');
    const previewImage = document.getElementById('previewImage');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}



function closeModal() {
    const modal = document.getElementById('modal');
    const userList = document.querySelector('.user-list');

    modal.classList.add('hidden');
    userList.classList.remove('hidden');
}



function add() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const EnrollNumber = document.getElementById('EnrollNumber').value.trim();
    const admissionDate = document.getElementById('admissionDate').value.trim();
    const previewImage = document.getElementById('previewImage').src;

    if (!name || !email || !phone || !EnrollNumber || !admissionDate) {
        alert('Iltimos, barcha maydonlarni toʻldiring.');
        return;
    }

    const studentData = {
        name: name,
        email: email,
        phone: phone,
        EnrollNumber: EnrollNumber,
        admissionDate: admissionDate,
        image: previewImage
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(studentData);
    localStorage.setItem('students', JSON.stringify(students));

    renderUserList();
    closeModal();
}


function renderUserList() {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; 

    let students = JSON.parse(localStorage.getItem('students')) || [];

    students.forEach((student, index) => { 
        userList.innerHTML += `
            <div class="w-full p-2 bg-white shadow rounded-[8px] h-[85px] flex items-center justify-between">
                <div class="w-[55px] h-[55px] rounded-[50%] overflow-hidden flex-shrink-0">
                    <img src="${student.image}" alt="student-image" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col w-[20%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.name}</p>
                </div>
                <div class="flex flex-col w-[20%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.email}</p>
                </div>
                <div class="flex flex-col w-[15%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.phone}</p>
                </div>
                <div class="flex flex-col w-[15%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.EnrollNumber}</p>
                </div>
                <div class="flex flex-col w-[15%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.admissionDate}</p>
                </div>
                <div class="flex items-center gap-[10px]">
                    <button onclick="more(${index})"><img src="./images/more.svg" alt="more"></button>
                    <button onclick="edit(${index})"><img src="./images/edit.svg" alt="edit"></button>
                    <button onclick="deleteStudent(${index})"><img src="./images/delete.svg" alt="delete"></button>
                </div>     
            </div>
        `;
    });
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    

    students.splice(index, 1);
    
   
    localStorage.setItem('students', JSON.stringify(students));
    
  
    renderUserList();
}
function showLogoutConfirmationModal() {
    const logoutModal = document.getElementById('logout-modal');
    logoutModal.classList.remove('hidden');
}

function closeLogoutModal() {
    const logoutModal = document.getElementById('logout-modal');
    logoutModal.classList.add('hidden');
}

function confirmLogout() {
    window.location.href = 'index.html'; 
}



function edit(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="w-[470px] h-[550px] bg-white rounded-[20px] text-center flex flex-col justify-center shadow-inputShadow p-6">
            <label for="rasmTanlash" class="cursor-pointer flex justify-center items-center mx-auto w-[90px] h-[90px] rounded-full bg-gray-100">
                <img id="previewImage" src="${student.image}" alt="enter-image" width="90" height="90">
            </label>
            <input type="file" id="rasmTanlash" accept="image/*" class="hidden">
            <input id="name" value="${student.name}" autocomplete="off" class="w-full  h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="text" placeholder="Enter your name">
            <input id="email" value="${student.email}" autocomplete="off" class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="text" placeholder="Enter your email">
            <input maxlength="10" minlength="10" value="${student.phone}" id="phone" autocomplete="off" class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="number" placeholder="Enter your phone">
            <input maxlength="1" minlength="20" id="EnrollNumber" value="${student.EnrollNumber}" autocomplete="off" class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="number" placeholder="Enroll Number">
            <input id="admissionDate" value="${student.admissionDate}" autocomplete="off" class="w-full h-[44px] pl-[12px] mt-[10px] outline-none rounded-[4px] border-[1px] border-[#E5E5E5] font-semibold text-[15px]" type="text" placeholder="Date of admission (e.g., 25-Dec-2006)">
            
            <div class="flex gap-[10px] mt-[10px] justify-center">
                <button onclick="update(${index})" class="bg-[#FEAF00] text-white rounded-[4px] px-[20px] py-[10px]">Update</button>
                <button onclick="closeModal()" class="bg-gray-500 text-white rounded-[4px] px-[20px] py-[10px]">Close</button>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');

    const fileInput = document.getElementById('rasmTanlash');
    const previewImage = document.getElementById('previewImage');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

function update(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const EnrollNumber = document.getElementById('EnrollNumber').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const previewImage = document.getElementById('previewImage').src;

    students[index] = {
        name: name,
        email: email,
        phone: phone,
        EnrollNumber: EnrollNumber,
        admissionDate: admissionDate,
        image: previewImage
    };

    localStorage.setItem('students', JSON.stringify(students));
    renderUserList();
    closeModal();
}




function more(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

 
    localStorage.setItem('selectedStudent', JSON.stringify(student));
    
    window.location.href = 'about.html';
}

let sortOrder = 'abc'; 


function sortStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];

    students.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    localStorage.setItem('students', JSON.stringify(students));
    renderUserList();
}


function sortBtn() {

    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    sortStudents();
}
function searchStudents() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const userList = document.querySelector('.user-list');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const filteredStudents = students.filter(student => {
        return student.name.toLowerCase().includes(searchTerm) ||
               student.email.toLowerCase().includes(searchTerm) ||
               student.phone.toLowerCase().includes(searchTerm) ||
               student.EnrollNumber.toLowerCase().includes(searchTerm) ||
               student.admissionDate.toLowerCase().includes(searchTerm);
    });

    userList.innerHTML = ''; 

    filteredStudents.forEach((student, index) => {
        userList.innerHTML += `
            <div class="w-full p-2 bg-white shadow rounded-[8px] h-[85px] flex items-center justify-between">
                <div class="w-[55px] h-[55px] rounded-[50%] overflow-hidden flex-shrink-0">
                    <img src="${student.image}" alt="student-image" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col w-[20%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.name}</p>
                </div>
                <div class="flex flex-col w-[20%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.email}</p>
                </div>
                <div class="flex flex-col w-[15%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.phone}</p>
                </div>
                <div class="flex flex-col w-[15%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.EnrollNumber}</p>
                </div>
                <div class="flex flex-col w-[15%] text-center">
                    <p class="text-[#000] text-[14px] font-semibold">${student.admissionDate}</p>
                </div>
                <div class="flex items-center gap-[10px]">
                    <button onclick="more(${index})"><img src="./images/more.svg" alt="more"></button>
                    <button onclick="edit(${index})"><img src="./images/edit.svg" alt="edit"></button>
                    <button onclick="deleteStudent(${index})"><img src="./images/delete.svg" alt="delete"></button>
                </div>     
            </div>
        `;
    });
}

