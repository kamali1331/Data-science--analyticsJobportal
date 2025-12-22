document.addEventListener('DOMContentLoaded', () => {

  // --- Navigation & Scroll Animations ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('toggle');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks.classList.remove('active');
      if (hamburger) hamburger.classList.remove('toggle');
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // --- Job Board Logic ---
  const jobs = [
    { title: "Data Analyst", company: "Tech Corp", type: "Full-time", location: "Bangalore", role: "Entry Level" },
    { title: "Sr. Data Scientist", company: "AI Innovators", type: "Full-time", location: "Hyderabad", role: "Senior" },
    { title: "Python Developer", company: "Web Solutions", type: "Remote", location: "Remote", role: "Fresher" },
    { title: "Machine Learning Intern", company: "Future AI", type: "Internship", location: "Pune", role: "Intern" },
    { title: "Power BI Developer", company: "DataViz Inc.", type: "Full-time", location: "Mumbai", role: "Mid Level" },
    { title: "Big Data Engineer", company: "Cloud Systems", type: "Full-time", location: "Gurgaon", role: "Senior" }
  ];

  const jobListContainer = document.getElementById('job-list');
  const searchInput = document.getElementById('job-search');

  function renderJobs(filteredJobs) {
    jobListContainer.innerHTML = ''; // Clear current jobs

    if (filteredJobs.length === 0) {
      jobListContainer.innerHTML = '<p style="text-align:center; color:#666;">No jobs found. Try a different keyword.</p>';
      return;
    }

    filteredJobs.forEach(job => {
      const jobCard = document.createElement('div');
      jobCard.classList.add('job-card');
      jobCard.innerHTML = `
        <div class="job-info">
          <h3>${job.title}</h3>
          <p>${job.company} | ${job.location}</p>
          <small>${job.type} • ${job.role}</small>
        </div>
        <button onclick="openModal('${job.title}')">Apply Now</button>
      `;
      jobListContainer.appendChild(jobCard);
    });
  }

  // Initial Render
  renderJobs(jobs);

  // Search Logic
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.role.toLowerCase().includes(keyword)
      );
      renderJobs(filtered);
    });
  }

  // --- Modal Logic ---
  const modal = document.getElementById('apply-modal');
  const closeBtn = document.querySelector('.close-btn');
  const modalTitle = document.getElementById('modal-job-title');
  const form = document.getElementById('application-form');

  // Exposed function for HTML button to call
  window.openModal = function (jobTitle) {
    modalTitle.textContent = jobTitle;
    modal.style.display = 'flex';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      alert(`Thank you, ${name}! Your application for ${modalTitle.textContent} has been sent.`);
      modal.style.display = 'none';
      form.reset();
    });
  }

});
