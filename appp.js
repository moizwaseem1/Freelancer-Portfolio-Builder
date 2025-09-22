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

function updatePreview() {
    document.getElementById('preview-name').textContent = nameInput.value || 'Your Name';
    document.getElementById('preview-bio').textContent = bioInput.value || 'Your Bio Goes Here';
    
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    const skillsArray = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    if (skillsArray.length > 0) {
        skillsArray.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    } else {
        skillsList.innerHTML = '<li>Add your skills here.</li>';
    }
    
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    const projectInputs = projectsContainer.querySelectorAll('.project-item');
    projectInputs.forEach(item => {
        const title = item.querySelector('input[type="text"]').value;
        const description = item.querySelector('textarea').value;
        if (title || description) {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${title || 'Project Title'}</h3>
                <p>${description || 'Project description goes here.'}</p>
            `;
            projectsList.appendChild(projectCard);
        }
    });
    
    document.getElementById('preview-email').textContent = emailInput.value || 'your.email@example.com';
    document.getElementById('preview-linkedin').href = linkedinInput.value || '#';
    document.getElementById('preview-linkedin').textContent = linkedinInput.value ? 'LinkedIn Profile' : '';
    document.getElementById('preview-github').href = githubInput.value || '#';
    document.getElementById('preview-github').textContent = githubInput.value ? 'GitHub Profile' : '';
}

function getFullHtml() {
    const previewContent = preview.innerHTML;
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
    <div class="portfolio-preview ${preview.className.split(' ').slice(1).join(' ')}">${previewContent}</div>
</body>
</html>
    `;
    return fullHtml;
}

form.addEventListener('input', updatePreview);
addProjectBtn.addEventListener('click', () => {
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
    preview.classList.remove('modern', 'minimalist', 'creative');
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
const themes = ['modern', 'minimalist', 'creative'];
const randomTheme = themes[Math.floor(Math.random() * themes.length)];
preview.classList.add(randomTheme);
designThemeSelect.value = randomTheme;
