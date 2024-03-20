// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, query, getDocs } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrZ7SU9psOi9ZM0Ouu4lD3EUZPJEPmCkk",
    authDomain: "astatsai.firebaseapp.com",
    projectId: "astatsai",
    storageBucket: "astatsai.appspot.com",
    messagingSenderId: "201985546239",
    appId: "1:201985546239:web:46479942f309de44a779ca"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Accessing Database
const db = getFirestore();

// Read all job postings
async function getJobs() {
    try {
        const jobsCol = collection(db, "jobs");
        const jobsSnapshot = await getDocs(jobsCol);
        const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(jobs);
        jobs.forEach((job) => {
            const jobRow = document.createElement("tr");
            jobRow.setAttribute("data-id", job.id); // Add document ID as an attribute

            // Create table cells (TD) for title and location
            const jobTitleCell = document.createElement("td");
            jobTitleCell.classList.add("col-8"); // Add class for styling
            const jobTitleLink = document.createElement("a");
            jobTitleLink.href = "#"; // Set a placeholder href for now (replace with actual link if needed)
            jobTitleLink.textContent = job.name;
            jobTitleCell.appendChild(jobTitleLink);

            const jobLocationCell = document.createElement("td");
            jobLocationCell.classList.add("col-4"); // Add class for styling
            jobLocationCell.textContent = job.location || "Remote"; // Display "Remote" if location is missing

            // Append cells to the row and row to the table body
            jobRow.appendChild(jobTitleCell);
            jobRow.appendChild(jobLocationCell);
            jobsList.appendChild(jobRow);
        })
        // return jobs;
    } catch (error) {
        console.error('Error getting jobs: ', error);
    }
}

getJobs().then(() => {
    console.log('promise resolved');
});