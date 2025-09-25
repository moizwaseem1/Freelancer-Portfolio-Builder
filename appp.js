const form = document.getElementById('portfolio-form');
const makePortfolioBtn = document.getElementById('make-portfolio');
const themeSwitcher = document.getElementById('theme-switcher');
const colorButtons = document.querySelectorAll('.color-btn');
let selectedColors = [];

// --- Feature 1: Collapsible Sections ---
const collapsibleSections = document.querySelectorAll('.collapsible h3');
collapsibleSections.forEach(header => {
    header.addEventListener('click', () => {
        const section = header.parentElement;
        section.classList.toggle('active');
    });
});

// --- Feature 2 & 7: Dynamic Add/Remove Buttons & New Sections ---
document.querySelectorAll('.add-item-btn').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.dataset.type;
        const container = document.getElementById(`${type}-container`);
        const itemCount = container.querySelectorAll(`.${type}-item`).length + 1;
        const newItem = document.createElement('div');
        newItem.className = `${type}-item`;
        newItem.innerHTML = getItemTemplate(type, itemCount);
        container.appendChild(newItem);
    });
    document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        e.target.closest('.experience-item, .projects-item, .certificates-item, .volunteer-item').remove();
    }
});
});

function getItemTemplate(type, index) {
    switch (type) {
        case 'experience':
            return `
                <div class="input-item-header">
                    
                    <button type="button" class="remove-item-btn">✕</button>
                <div class="input-group">
                    <label for="experience-title-${index}">Job Title:</label>
                     <input type="text" id="experience-title-${index}" name="experience-title-${index}" placeholder="Lead Developer">
                </div>
                <div class="input-group">
                    <label for="experience-company-${index}">Company:</label>
                    <input type="text" id="experience-company-${index}" name="experience-company-${index}" placeholder="Tech Solutions Inc.">
                </div>
                <div class="input-group">
                     <label for="experience-duration-${index}">Duration:</label>
                    <input type="text" id="experience-duration-${index}" name="experience-duration-${index}" placeholder="Jan 2020 - Dec 2022">
                </div>
                <div class="input-group">
                    <label for="experience-desc-${index}">Description:</label>
                    <textarea id="experience-desc-${index}" name="experience-desc-${index}" rows="2" placeholder="Briefly describe your responsibilities."></textarea>
                </div>
    `;
        case 'projects':
            return `
                <div class="input-item-header">
                    
                    <button type="button" class="remove-item-btn">✕</button>
                </div>
                <div class="input-group">
                    <label for="project-title-${index}">Project Title:</label>
                    <input type="text" id="project-title-${index}" name="project-title-${index}" placeholder="My First Project">
                </div>
                <div class="input-group">
                    <label for="project-desc-${index}">Project Description:</label>
                    <textarea id="project-desc-${index}" name="project-desc-${index}" rows="2" placeholder="A brief description of the project."></textarea>
                </div>
                <div class="input-group">
                    <label for="project-image-${index}">Project Image:</label>
                    <input type="file" id="project-image-${index}" name="project-image-${index}" accept="image/*">
                </div>
            `;
        case 'certificates':
            return `
                <div class="input-item-header">
                   
                   <button type="button" class="remove-item-btn">✕</button>
                </div>
                <div class="input-group">
                    <label for="certificate-name-${index}">Certificate Name:</label>
                    <input type="text" id="certificate-name-${index}" name="certificate-name-${index}" placeholder="Certified Scrum Master">
                </div>
                <div class="input-group">
                    <label for="certificate-image-${index}">Certificate Image:</label>
                    <input type="file" id="certificate-image-${index}" name="certificate-image-${index}" accept="image/*">
                </div>
            `;
        case 'volunteer':
            return `
                <div class="input-item-header">
                    
                    <button type="button" class="remove-item-btn">✕</button>
                </div>
                <div class="input-group">
                    <label for="volunteer-role-${index}">Role:</label>
                    <input type="text" id="volunteer-role-${index}" name="volunteer-role-${index}" placeholder="Volunteer Tutor">
                </div>
                <div class="input-group">
                    <label for="volunteer-organization-${index}">Organization:</label>
                    <input type="text" id="volunteer-organization-${index}" name="volunteer-organization-${index}" placeholder="Community Outreach">
                </div>
            `;
        default:
            return '';
    }
}

// --- Feature 3: Color Theme Options ---
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
        if (selectedColors.includes(color)) {
            // Deselect color
            selectedColors = selectedColors.filter(c => c !== color);
            button.classList.remove('active');
        } else if (selectedColors.length < 3) {
            // Select color
            selectedColors.push(color);
            button.classList.add('active');
        } else {
            // Limit to 3 colors, deselect oldest
            const oldestColor = selectedColors.shift();
            document.querySelector(`.color-btn[data-color="${oldestColor}"]`).classList.remove('active');
            selectedColors.push(color);
            button.classList.add('active');
        }
    });
});

// --- Feature 4: Form Validation ---
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const urlInputs = document.querySelectorAll('input[type="url"]');

emailInput.addEventListener('input', () => {
    if (emailInput.value === '' || isValidEmail(emailInput.value)) {
        emailInput.classList.remove('error');
    } else {
        emailInput.classList.add('error');
    }
});

phoneInput.addEventListener('input', () => {
    if (phoneInput.value === '' || isValidPhone(phoneInput.value)) {
        phoneInput.classList.remove('error');
    } else {
        phoneInput.classList.add('error');
    }
});

urlInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value === '' || isValidUrl(input.value)) {
            input.classList.remove('error');
        } else {
            input.classList.add('error');
        }
    });
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhone(phone) {
    const regex = /^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return regex.test(phone);
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (e) {
        return false;
    }
}

makePortfolioBtn.addEventListener('click', async () => {
    if (!validateForm()) {
        alert('Please fix the validation errors before generating your portfolio.');
        return;
    }

    const htmlContent = await getFullHtml();
    const portfolioWindow = window.open('', '_blank');
    if (portfolioWindow) {
        portfolioWindow.document.open();
        portfolioWindow.document.write(htmlContent);
        portfolioWindow.document.close();
    } else {
        alert('Please allow pop-ups for this website to view your portfolio.');
    }
});

function validateForm() {
    let isValid = true;
    if (emailInput.value !== '' && !isValidEmail(emailInput.value)) {
        emailInput.classList.add('error');
        isValid = false;
    }
    if (phoneInput.value !== '' && !isValidPhone(phoneInput.value)) {
        phoneInput.classList.add('error');
        isValid = false;
    }
    urlInputs.forEach(input => {
        if (input.value !== '' && !isValidUrl(input.value)) {
            input.classList.add('error');
            isValid = false;
        }
    });
    return isValid;
}

async function getFullHtml() {
    // [Your existing code to collect form data goes here]
    const data = {
        name: document.getElementById('name').value,
        bio: document.getElementById('bio').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s.length > 0),
        profilePicture: document.getElementById('profile-picture').files[0] ? await getBase64Image(document.getElementById('profile-picture').files[0]) : null,
        isDarkTheme: document.body.classList.contains('dark-theme'),
        sections: {
            about: document.getElementById('about-section').classList.contains('active'),
            skills: document.getElementById('skills-section').classList.contains('active'),
            experience: document.getElementById('experience-section').classList.contains('active'),
            projects: document.getElementById('projects-section').classList.contains('active'),
            certificates: document.getElementById('certificates-section').classList.contains('active'),
            volunteer: document.getElementById('volunteer-section').classList.contains('active'),
            contact: document.getElementById('contact-section').classList.contains('active'),
        },
    };

    const colorHexes = selectedColors.map(colorName => {
        const button = document.querySelector(`.color-btn[data-color="${colorName}"]`);
        return button ? button.style.backgroundColor : null;
    }).filter(color => color !== null);

    data.primaryColor = colorHexes[0] || '#4A90E2';
    data.secondaryColor = colorHexes[1] || '#2D58A0';
    data.tertiaryColor = colorHexes[2] || '#8B5CF6';

    data.projects = await getSectionData('projects', 'project');
    data.certificates = await getSectionData('certificates', 'certificate');
    data.experience = await getSectionData('experience', 'experience');
    data.volunteer = await getSectionData('volunteer', 'volunteer');

    // Get all CSS rules from the main stylesheet
    const allStyles = Array.from(document.styleSheets)
        .map(sheet => {
            try {
                return Array.from(sheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\n');
            } catch (e) {
                console.warn('Could not read rules from stylesheet:', sheet.href, e);
                return '';
            }
        })
        .join('\n');

    const dynamicStyles = `
        :root {
            --primary-blue: ${data.primaryColor};
            --secondary-blue: ${data.secondaryColor};
            --tertiary-color: ${data.tertiaryColor};
        }
        .portfolio-header h1, .portfolio-section h2 {
            color: var(--primary-blue);
        }
        .profile-img-container {
            border-color: var(--primary-blue);
        }
        .skill-pill {
            background-color: var(--secondary-blue);
            color: white;
            border: none;
        }
        .portfolio-section h2 {
            border-bottom: 2px solid var(--secondary-blue);
        }
        .experience-item-preview, .project-card, .certificate-item-preview, .volunteer-item-preview {
            border-left: 3px solid var(--primary-blue);
        }
        .download-btn {
            background-color: var(--primary-blue);
            color: #fff;
        }
        .download-btn:hover {
            background-color: var(--secondary-blue);
        }
        /* --- New Mobile Responsiveness Styles --- */
        body.portfolio-page-body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .portfolio-header,
        .portfolio-content {
            width: 100%;
            margin: 0 auto;
            max-width: 900px; /* Limits the max width for large screens */
        }

        .portfolio-header {
            text-align: center;
            padding-bottom: 20px;
        }

        .portfolio-header .profile-img-container {
            width: 120px;
            height: 120px;
            margin: 0 auto 10px;
        }

        .portfolio-section {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    
    @media (max-width: 600px) {
            .portfolio-header h1 {
                font-size: 1.8em;
        }
        .portfolio-section h2 {
            font-size: 1.4em;
        }
        .contact-info p,
        .contact-info a {
            font-size: 0.9em;
        }
    }
        /* --- New Fix for button text visibility in dark theme --- */
        body.dark-theme .download-btn {
            color: black;
        }
    `;

    // [Your existing code to generate portfolio sections goes here]
    let portfolioSections = '';
    
    // ... (rest of your portfolioSections generation)

    if (data.sections.about) {
        portfolioSections += `
            <section class="portfolio-section" id="preview-about">
                <h2>About Me</h2>
                <p>${data.bio || 'Your Bio Goes Here'}</p>
            </section>
        `;
    }

    if (data.sections.skills && data.skills.length > 0) {
        portfolioSections += `
            <section class="portfolio-section" id="preview-skills">
                <h2>Skills</h2>
                <div id="skills-list">${data.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}</div>
            </section>
        `;
    }

    if (data.sections.experience && data.experience.length > 0) {
        portfolioSections += `
            <section class="portfolio-section" id="preview-experience">
                <h2>Experience</h2>
                ${data.experience.map(item => `
                    <div class="experience-item-preview">
                        <h3>${item.title || 'Job Title'}</h3>
                        <h4>${item.company || 'Company'} | ${item.duration || 'Duration'}</h4>
                        <p>${item.description || 'Description'}</p>
                    </div>
                `).join('')}
            </section>
        `;
    }

    if (data.sections.projects && data.projects.length > 0) {
        portfolioSections += `
            <section class="portfolio-section" id="preview-projects">
                <h2>Projects</h2>
                ${data.projects.map(item => `
                    <div class="project-card">
                        <h3>${item.title || 'Project Title'}</h3>
                        <p>${item.description || 'Project description goes here.'}</p>
                        ${item.image ? `<img src="${item.image}" alt="Project Image">` : ''}
                    </div>
                `).join('')}
            </section>
        `;
    }

    if (data.sections.certificates && data.certificates.length > 0) {
        portfolioSections += `
            <section class="portfolio-section" id="preview-certificates">
                <h2>Certificates</h2>
                ${data.certificates.map(item => `
                    <div class="certificate-item-preview">
                        <h3>${item.title || 'Certificate Name'}</h3>
                        ${item.image ? `<img src="${item.image}" class="certificate-img" alt="Certificate Image">` : ''}
                    </div>
                `).join('')}
            </section>
        `;
    }

    if (data.sections.volunteer && data.volunteer.length > 0) {
        portfolioSections += `
            <section class="portfolio-section" id="preview-volunteer">
                <h2>Volunteer Experience</h2>
                ${data.volunteer.map(item => `
                    <div class="volunteer-item-preview">
                        <h3>${item.role || 'Role'}</h3>
                        <h4>${item.organization || 'Organization'}</h4>
                    </div>
                `).join('')}
            </section>
        `;
    }

    if (data.sections.contact && (data.email || data.phone || data.linkedin || data.github)) {
        portfolioSections += `
            <section class="portfolio-section" id="preview-contact">
                <h2>Contact</h2>
                <div class="contact-info">
                    ${data.email ? `<p>Email: <span>${data.email}</span></p>` : ''}
                    ${data.phone ? `<p>Phone: <span>${data.phone}</span></p>` : ''}
                    ${data.linkedin ? `<p>LinkedIn: <a href="${data.linkedin}" target="_blank">LinkedIn Profile</a></p>` : ''}
                    ${data.github ? `<p>GitHub: <a href="${data.github}" target="_blank">GitHub Profile</a></p>` : ''}
                </div>
            </section>
        `;
    }


    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name || 'Portfolio'}</title>
    <style>
        ${allStyles}
        ${dynamicStyles}
    </style>
</head>
<body class="${data.isDarkTheme ? 'dark-theme' : ''} portfolio-page-body">
    <div class="portfolio-header">
        <h1>${data.name || 'Your Name'}</h1>
        <p>${data.bio || 'Your Bio Goes Here'}</p>
        ${data.profilePicture ? `<div class="profile-img-container"><img class="profile-img" src="${data.profilePicture}" alt="Profile Picture"></div>` : ''}
    </div>
    
    <div class="portfolio-content">
        ${portfolioSections}
    </div>

    <div class="download-btn-container">
        <button class="download-btn" onclick="downloadPage()">Download HTML</button>
    </div>

    <script>
        function downloadPage() {
            const htmlContent = document.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'portfolio.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>
    `;
    return fullHtml;
}


// Re-factored getSectionData to handle multiple fields dynamically
async function getSectionData(type) {
    const items = document.querySelectorAll(`#${type}-container .${type}-item`);
    const data = [];
    for (const item of items) {
        const itemData = {};
        const inputs = item.querySelectorAll('input, textarea');
        for (const input of inputs) {
            const nameParts = input.name.split('-');
            const key = nameParts[nameParts.length - 2];
            if (input.type === 'file') {
                itemData[key] = input.files[0] ? await getBase64Image(input.files[0]) : null;
            } else {
                itemData[key] = input.value;
            }
        }
        data.push(itemData);
    }
    return data.filter(item => Object.values(item).some(val => val));
}

function getBase64Image(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// --- Light/Dark Theme Toggle ---
themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
