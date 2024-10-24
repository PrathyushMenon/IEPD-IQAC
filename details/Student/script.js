document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission

    const studentName = document.getElementById('studentName').value;
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '';

    try {
        // Send a GET request to the server
        const response = await fetch(`/students/search?name=${encodeURIComponent(studentName)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if any students were found
        if (data.length === 0) {
            resultsDiv.innerHTML = '<p>No students found.</p>';
            return;
        }

        // Display the results
        data.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.classList.add('result-item');
            studentDiv.innerHTML = `
                <h3>${student.name}</h3>
                <p>Email: ${student.email}</p>
                <p>Phone: ${student.phone}</p>
                <h4>Accomplishments:</h4>
                <ul>
                    ${student.accomplishments ? student.accomplishments.map(acc => `<li>${acc.description} (Date: ${acc.date_achieved})</li>`).join('') : '<li>No accomplishments found.</li>'}
                </ul>
            `;
            resultsDiv.appendChild(studentDiv);
        });

    } catch (error) {
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
