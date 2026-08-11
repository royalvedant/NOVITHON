// Novithon Hackathon Redesign Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Seeding mock registrations if none exist
  if (!localStorage.getItem('novithon_registrations')) {
    const seedRegistrations = [
      {
        id: 'NOV-482910',
        name: 'Aravind Kumar',
        email: 'aravind.k@iitb.ac.in',
        phone: '+91 98765 43210',
        college: 'IIT Bombay',
        department: 'Computer Science',
        year: '3',
        teamType: 'Team of 3',
        github: 'https://github.com/aravindk',
        linkedin: 'https://linkedin.com/in/aravindk',
        date: '11/08/2026',
        status: 'Paid'
      },
      {
        id: 'NOV-291048',
        name: 'Sushma Rao',
        email: 'sushmarao@bits-pilani.ac.in',
        phone: '+91 87654 32109',
        college: 'BITS Pilani',
        department: 'Electronics & Communication',
        year: '4',
        teamType: 'Solo (Individual)',
        github: 'https://github.com/sushmarao',
        linkedin: 'https://linkedin.com/in/sushmarao',
        date: '10/08/2026',
        status: 'Paid'
      },
      {
        id: 'NOV-104829',
        name: 'Vikram Aditya',
        email: 'vikram.aditya@rvce.edu.in',
        phone: '+91 76543 21098',
        college: 'RV College of Engineering',
        department: 'Information Science',
        year: '2',
        teamType: 'Team of 4',
        github: 'https://github.com/vikramaditya',
        linkedin: 'https://linkedin.com/in/vikramaditya',
        date: '09/08/2026',
        status: 'Paid'
      },
      {
        id: 'NOV-948271',
        name: 'Priyanka Sen',
        email: 'priyanka.sen@srmist.edu.in',
        phone: '+91 65432 10987',
        college: 'SRM Institute of Science and Technology',
        department: 'Software Engineering',
        year: '3',
        teamType: 'Team of 2',
        github: 'https://github.com/priyankasen',
        linkedin: 'https://linkedin.com/in/priyankasen',
        date: '08/08/2026',
        status: 'Paid'
      }
    ];
    localStorage.setItem('novithon_registrations', JSON.stringify(seedRegistrations));
  }

  // --- FORCE AUTOPLAY BACKGROUND VIDEO ---
  const bgVideo = document.querySelector('.video-bg');
  if (bgVideo) {
    bgVideo.muted = true; // Essential for autoplay browser requirements
    bgVideo.play().catch(err => {
      console.warn("Background video autoplay blocked by browser policy, waiting for user interaction:", err);
      const playOnInteract = () => {
        bgVideo.play();
        window.removeEventListener('click', playOnInteract);
        window.removeEventListener('scroll', playOnInteract);
      };
      window.addEventListener('click', playOnInteract);
      window.addEventListener('scroll', playOnInteract);
    });
  }

  // --- 1. THEME TOGGLE LOGIC ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check persisted theme or system setting
  const savedTheme = localStorage.getItem('novithon-theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('novithon-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // --- 2. NAVBAR SCROLL EFFECT ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 3. COUNTDOWN TIMER LOGIC ---
  // Set launch date to 15 days from current date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 15);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // Run immediately

  // --- 4. FAQ ACCORDION LOGIC ---
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all open FAQs
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-content').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- 5. REGISTRATION MODAL & STEP FLOW ---
  const modalOverlay = document.getElementById('reg-modal');
  const openModalBtns = document.querySelectorAll('.open-reg-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const regForm = document.getElementById('reg-form');
  const btnNext = document.getElementById('btn-next');
  const btnBack = document.getElementById('btn-back');
  const actionsContainer = document.getElementById('modal-actions-container');
  
  let currentStep = 1;
  const totalSteps = 4;

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
      resetFormWizard();
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = 'auto'; // Enable scrolling
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      // Validate inputs in current step before moving
      if (validateCurrentStepInputs()) {
        currentStep++;
        updateStepUI();
      }
    } else if (currentStep === totalSteps) {
      // Finalize Registration (Trigger Payment Simulation)
      processSimulatedPayment();
    }
  });

  btnBack.addEventListener('click', () => {
    if (currentStep > 1 && currentStep <= totalSteps) {
      currentStep--;
      updateStepUI();
    }
  });

  function validateCurrentStepInputs() {
    const activeStepEl = document.querySelector(`.modal-form-step[data-step="${currentStep}"]`);
    const requiredInputs = activeStepEl.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
      if (!input.value.trim() || (input.type === 'email' && !input.validity.valid) || (input.type === 'url' && !input.validity.valid)) {
        input.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        input.style.borderColor = 'var(--glass-border)';
      }
    });

    if (!isValid) {
      // Provide subtle shake effect to modal on failed validation
      const modalContainer = modalOverlay.querySelector('.modal-container');
      modalContainer.style.animation = 'shake 0.4s ease';
      setTimeout(() => {
        modalContainer.style.animation = '';
      }, 400);
    }
    
    return isValid;
  }

  function updateStepUI() {
    // Hide all steps
    document.querySelectorAll('.modal-form-step').forEach(step => {
      step.classList.remove('active');
    });
    
    // Show current step
    const currentStepEl = document.querySelector(`.modal-form-step[data-step="${currentStep}"]`);
    currentStepEl.classList.add('active');

    // Update progress indicator dots
    document.querySelectorAll('.modal-step-dot').forEach((dot, idx) => {
      if (idx < currentStep) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Control visibility of Back button
    if (currentStep === 1) {
      btnBack.style.visibility = 'hidden';
    } else {
      btnBack.style.visibility = 'visible';
    }

    // Control Next Button design / text
    if (currentStep === totalSteps) {
      btnNext.querySelector('span').textContent = 'Pay & Register (₹99)';
      btnNext.querySelector('i').className = 'fa-solid fa-credit-card';
    } else {
      btnNext.querySelector('span').textContent = 'Next';
      btnNext.querySelector('i').className = 'fa-solid fa-chevron-right';
    }
  }

  function processSimulatedPayment() {
    // Collect data to display on ticket
    const name = document.getElementById('reg-name').value;
    const college = document.getElementById('reg-college').value;
    const teamType = document.getElementById('reg-teamsize').options[document.getElementById('reg-teamsize').selectedIndex].text;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const dept = document.getElementById('reg-dept').value;
    const year = document.getElementById('reg-year').value;
    const github = document.getElementById('reg-github').value;
    const linkedin = document.getElementById('reg-linkedin').value;
    const ticketId = `NOV-${Math.floor(100000 + Math.random() * 900000)}`;

    // Show processing status
    btnNext.disabled = true;
    btnNext.querySelector('span').textContent = 'Verifying UPI...';
    btnNext.querySelector('i').className = 'fa-solid fa-spinner fa-spin';

    setTimeout(() => {
      // Save registration data to localStorage
      const newRegistration = {
        id: ticketId,
        name: name,
        email: email,
        phone: phone,
        college: college,
        department: dept,
        year: year,
        teamType: teamType,
        github: github,
        linkedin: linkedin,
        date: new Date().toLocaleDateString('en-GB'),
        status: 'Paid'
      };

      try {
        let currentRegs = JSON.parse(localStorage.getItem('novithon_registrations') || '[]');
        currentRegs.unshift(newRegistration);
        localStorage.setItem('novithon_registrations', JSON.stringify(currentRegs));
      } catch (err) {
        console.error('Failed to save registration:', err);
      }

      // Move to success step
      currentStep = 'success';
      document.querySelectorAll('.modal-form-step').forEach(step => {
        step.classList.remove('active');
      });
      document.querySelector('.modal-form-step[data-step="success"]').classList.add('active');
      
      // Update boarding pass values
      document.getElementById('ticket-name').textContent = name;
      document.getElementById('ticket-college').textContent = college;
      document.getElementById('ticket-pass').textContent = teamType;
      document.getElementById('ticket-id').textContent = ticketId;

      // Hide actions
      actionsContainer.style.display = 'none';
      closeModalBtn.style.display = 'none'; // Lock until dismissed by user action (reloading or custom close btn inside success card if any)
      
      // Add dynamic dismiss button inside success view
      const successStep = document.querySelector('.modal-form-step[data-step="success"]');
      const finishBtn = document.createElement('button');
      finishBtn.className = 'btn-primary';
      finishBtn.style.marginTop = '20px';
      finishBtn.style.width = '100%';
      finishBtn.style.justifyContent = 'center';
      finishBtn.innerHTML = '<span>Finish & Close</span><i class="fa-solid fa-rocket"></i>';
      finishBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
      successStep.appendChild(finishBtn);
    }, 2000);
  }

  function resetFormWizard() {
    currentStep = 1;
    regForm.reset();
    actionsContainer.style.display = 'flex';
    closeModalBtn.style.display = 'flex';
    
    // Remove dynamic finish button if it exists
    const successStep = document.querySelector('.modal-form-step[data-step="success"]');
    const existingFinish = successStep.querySelector('button');
    if (existingFinish) {
      existingFinish.remove();
    }
    
    updateStepUI();
  }
});

// CSS Shake Animation Definition added dynamically if missing
const style = document.createElement('style');
style.innerHTML = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
`;
document.head.appendChild(style);
