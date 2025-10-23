function loadProjects(targetId) {
    var username = 'batty93';
    var url = 'https://api.github.com/users/' + username + '/repos';
    var container = document.getElementById(targetId);
    if (!container) return;

    container.innerHTML = '<p>Loading projects...</p>';

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok. Status: ' + response.status);
            }
            return response.json();
        })
        .then(function (repos) {
            repos.sort(function (a, b) {
                return new Date(b.updated_at) - new Date(a.updated_at);
            });

            if (repos.length === 0) {
                container.innerHTML = '<p>No projects found.</p>';
                return;
            }

            container.innerHTML = '';
            repos.forEach(function (repo) {
                var article = document.createElement('article');
                article.className = 'project-card';

                var title = document.createElement('h3');
                var link = document.createElement('a');
                link.href = repo.html_url;
                link.target = '_blank';
                link.textContent = repo.name;
                title.appendChild(link);

                var desc = document.createElement('p');
                desc.textContent = repo.description || 'No description provided.';

                var details = document.createElement('div');
                details.className = 'repo-details';
                var lang = document.createElement('span');
                lang.className = 'language';
                lang.textContent = repo.language || 'N/A';
                var updated = document.createElement('span');
                updated.className = 'updated';
                updated.textContent = 'Last Updated: ' + new Date(repo.updated_at).toLocaleDateString();

                details.appendChild(lang);
                details.appendChild(updated);

                article.appendChild(title);
                article.appendChild(desc);
                article.appendChild(details);

                container.appendChild(article);
            });
        })
        .catch(function (error) {
            console.error('Fetch error:', error);
            container.innerHTML = '<p class="error">Could not load projects. Try again later.</p>';
        });
}

