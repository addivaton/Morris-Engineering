document.addEventListener('DOMContentLoaded', () => {
    const loadJobsBtn = document.getElementById('loadJobsBtn');
    const jobsSection = document.getElementById('jobsSection');

    // Function to fetch jobs from the backend
    async function fetchJobs() {
        try {
            const response = await fetch('/api/jobs'); // Fetch jobs from backend
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const jobs = await response.json(); // Parse JSON response
            populateJobs(jobs); // Populate the section with jobs
        } catch (err) {
            console.error('Error:', err.message);
            alert('Failed to load jobs. Please try again.');
        }
    }

    // Function to populate the jobs section with data
    function populateJobs(jobs) {
        const jobsTableBody = document.getElementById('jobsTableBody');
        jobsTableBody.innerHTML = ''; // Clear existing rows
    
        jobs.forEach(job => {
            const row = document.createElement('tr');
    
            row.innerHTML = `
                <td>${job.site}</td>
                <td>${job.location}</td>
                <td>${job.owner}</td>
                <td>${job.year}</td>
                <td>${job.type}</td>
            `;
    
            jobsTableBody.appendChild(row);
        });
    }

    // Attach event listener to the button
    loadJobsBtn.addEventListener('click', fetchJobs);
});
