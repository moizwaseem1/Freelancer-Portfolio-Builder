const form = document.getElementById('portfolio-form');
const preview = document.getElementById('portfolio-preview');
const nameInput = document.getElementById('name');
const bioInput = document.getElementById('bio');
const skillsInput = document.getElementById('skills');
const projectsContainer = document.getElementById('projects-container');
const addProjectBtn = document.getElementById('add-project-btn');
const emailInput = document.getElementById('email');
const linkedinInput = document.getElementById('linkedin');
const githubInput = document.getElementById('github');
const themeSwitcher = document.getElementById('theme-switcher');
const exportBtn = document.getElementById('export-html');
const designThemeSelect = document.getElementById('design-theme');
const navToggleBtn = document.getElementById('nav-toggle');
const slidingNav = document.getElementById('sliding-nav');

const sections = {
    'about': {
        input: document.getElementById('about-section'),
        preview: document.getElementById('preview-home'),
        nav: document.querySelector('li a[href="#preview-home"]').parentElement,
    },
    'skills': {
        input: document.getElementById('skills-section'),
        preview: document.getElementById('preview-skills'),
        nav: document.getElementById('nav-skills-link'),
    },
    'projects': {
        input: document.getElementById('projects-section'),
        preview: document.getElementById('preview-projects'),
        nav: document.getElementById('nav-projects-link'),
    },
    'contact': {
        input: document.getElementById('contact-section'),
        preview: document.getElementById('preview-contact'),
        nav: document.getElementById('nav-contact-link'),
    },
};

const closeNavBtn = document.getElementById('close-nav-btn');


closeNavBtn.addEventListener('click', () => {
    slidingNav.classList.remove('open');
});

slidingNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        slidingNav.classList.remove('open');
    });
});

function updatePreview() {
    const nameValue = nameInput.value.trim();
    const bioValue = bioInput.value.trim();
    const isAboutValid = nameValue.length > 0 || bioValue.length > 0;
    
    sections['about'].preview.style.display = isAboutValid ? 'block' : 'none';
    sections['about'].nav.style.display = isAboutValid ? 'block' : 'none';
    document.getElementById('preview-name').textContent = nameValue || 'Your Name';
    document.getElementById('preview-bio').textContent = bioValue || 'Your Bio Goes Here';
    
    const skillsList = document.getElementById('skills-list');
    const skillsArray = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    const isSkillsValid = skillsArray.length > 0;
    
    sections['skills'].preview.style.display = isSkillsValid ? 'block' : 'none';
    sections['skills'].nav.style.display = isSkillsValid ? 'block' : 'none';
    skillsList.innerHTML = '';
    if (isSkillsValid) {
        skillsArray.forEach(skill => {
            const li = document.createElement('li');
            li.className = 'skill-pill';
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    }
    
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    const projectInputs = projectsContainer.querySelectorAll('.project-item');
    let hasProjects = false;
    projectInputs.forEach(item => {
        const title = item.querySelector('input[type="text"]').value.trim();
        const description = item.querySelector('textarea').value.trim();
        if (title || description) {
            hasProjects = true;
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${title || 'Project Title'}</h3>
                <p>${description || 'Project description goes here.'}</p>
            `;
            projectsList.appendChild(projectCard);
        }
    });
    sections['projects'].preview.style.display = hasProjects ? 'block' : 'none';
    sections['projects'].nav.style.display = hasProjects ? 'block' : 'none';
    
    const emailValue = emailInput.value.trim();
    const linkedinValue = linkedinInput.value.trim();
    const githubValue = githubInput.value.trim();
    const isContactValid = emailValue.length > 0 || linkedinValue.length > 0 || githubValue.length > 0;
    
    sections['contact'].preview.style.display = isContactValid ? 'block' : 'none';
    sections['contact'].nav.style.display = isContactValid ? 'block' : 'none';
    document.getElementById('preview-email').textContent = emailValue || '';
    document.getElementById('preview-linkedin').href = linkedinValue || '#';
    document.getElementById('preview-linkedin').textContent = linkedinValue ? 'LinkedIn Profile' : '';
    document.getElementById('preview-github').href = githubValue || '#';
    document.getElementById('preview-github').textContent = githubValue ? 'GitHub Profile' : '';
}

function getFullHtml() {
    let previewContent = '';
    for (const key in sections) {
        if (sections[key].preview.style.display !== 'none') {
            previewContent += sections[key].preview.outerHTML;
        }
    }
    
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
    
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${nameInput.value || 'Portfolio'}</title>
    <style>
        ${allStyles}
    </style>
</head>
<body class="${document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme'}">
    <div class="portfolio-preview ${preview.className.split(' ').slice(1).join(' ')}">
        <div class="nav-container">
            <nav>
                <ul>
                    ${Object.keys(sections).filter(key => sections[key].nav.style.display !== 'none').map(key => `<li><a href="#preview-${key}">${sections[key].nav.textContent.trim()}</a></li>`).join('')}
                </ul>
            </nav>
        </div>
        ${previewContent}
    </div>
</body>
</html>
    `;
    return fullHtml;
}

form.addEventListener('input', updatePreview);

addProjectBtn.addEventListener('click', () => {
    const projectCount = projectsContainer.querySelectorAll('.project-item').length + 1;
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    projectItem.innerHTML = `
        <label>Project Title:</label>
        <input type="text" placeholder="Another Project">
        <label>Project Description:</label>
        <textarea rows="2" placeholder="Description of another project."></textarea>
    `;
    projectsContainer.appendChild(projectItem);
    projectItem.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', updatePreview));
    updatePreview();
});

themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

exportBtn.addEventListener('click', () => {
    const fullHtml = getFullHtml();
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

designThemeSelect.addEventListener('change', () => {
    const selectedTheme = designThemeSelect.value;
    preview.classList.remove('modern', 'minimalist', 'creative', 'professional');
    preview.classList.add(selectedTheme);
});

navToggleBtn.addEventListener('click', () => {
    slidingNav.classList.toggle('open');
});

slidingNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        slidingNav.classList.remove('open');
    });
});

updatePreview();
const themes = ['modern', 'minimalist', 'creative', 'professional'];
const randomTheme = themes[Math.floor(Math.random() * themes.length)];
preview.classList.add(randomTheme);
designThemeSelect.value = randomTheme;
