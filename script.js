// script.js

const apiUrl = 'http://localhost:5000/api/recycling-items';

// 항목 목록을 가져와서 테이블에 표시하는 함수
async function fetchRecyclingItems() {
    try {
        const response = await fetch(apiUrl);
        const items = await response.json();
        displayItems(items);
    } catch (error) {
        console.error('항목을 가져오는 중 오류 발생:', error);
    }
}

// 항목을 테이블에 표시하는 함수
function displayItems(items) {
    const tableBody = document.getElementById('itemsTableBody');
    tableBody.innerHTML = ''; // 기존 내용 초기화

    items.forEach(item => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);
        
        const categoryCell = document.createElement('td');
        categoryCell.textContent = item.category;
        row.appendChild(categoryCell);
        
        const disposalMethodCell = document.createElement('td');
        disposalMethodCell.textContent = item.disposalMethod;
        row.appendChild(disposalMethodCell);
        
        const collectionDayCell = document.createElement('td');
        collectionDayCell.textContent = item.collectionDay;
        row.appendChild(collectionDayCell);
        
        tableBody.appendChild(row);
    });
}

// 항목 추가 폼 제출 시 실행되는 함수
document.getElementById('addRecyclingForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작 방지

    const formData = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        disposalMethod: document.getElementById('disposalMethod').value,
        collectionDay: document.getElementById('collectionDay').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // 폼 초기화
            document.getElementById('addRecyclingForm').reset();
            // 항목 목록 다시 가져오기
            fetchRecyclingItems();
        } else {
            const errorData = await response.json();
            alert('항목 추가 실패: ' + errorData.message);
        }
    } catch (error) {
        console.error('항목 추가 중 오류 발생:', error);
    }
});

// 검색 기능
document.getElementById('search').addEventListener('input', async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    try {
        const response = await fetch(apiUrl);
        const items = await response.json();
        const filteredItems = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
        displayItems(filteredItems);
    } catch (error) {
        console.error('검색 중 오류 발생:', error);
    }
});

// 페이지 로드 시 항목 목록 가져오기
fetchRecyclingItems();